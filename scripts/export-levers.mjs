import { readFile, writeFile, mkdir, readdir, stat, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, CanvasElement, ImageData, loadImage } from '@napi-rs/canvas';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { DEFAULT, OBJECTS, POINTER, massKey, arm } from '../packs/levers-load-effort-distance/source/src/model.js';

// Canvas and file APIs for exporting the unchanged browser-authored geometry.
// No WebGL context or browser binary is required.
globalThis.self = globalThis;
globalThis.HTMLCanvasElement = CanvasElement;
globalThis.ImageData = ImageData;
globalThis.document = { createElement: tag => {
  if (tag !== 'canvas') throw new Error(`Unexpected DOM element: ${tag}`);
  const canvas = createCanvas(1, 1);
  // Native canvas exposes data() while the exporter reserves image.data for
  // pixel arrays. Match the browser Canvas API so it uses drawImage instead.
  Object.defineProperty(canvas, 'data', { value: undefined });
  return canvas;
} };
globalThis.ProgressEvent = class { constructor(type, values) { this.type = type; Object.assign(this, values); } };
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(buffer => { this.result = buffer; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(buffer => { this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString('base64')}`; this.onloadend?.(); }); }
};
globalThis.createImageBitmap = async blob => {
  const img = await loadImage(Buffer.from(await blob.arrayBuffer()));
  const canvas = createCanvas(img.width, img.height);
  canvas.getContext('2d').drawImage(img, 0, 0);
  return canvas;
};
if (!CanvasElement.prototype.toBlob) CanvasElement.prototype.toBlob = function(callback, mimeType = 'image/png') { callback(new Blob([this.toBuffer(mimeType)], { type: mimeType })); };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const pack = 'packs/levers-load-effort-distance';
const readJSON = async p => JSON.parse(await readFile(p, 'utf8'));
const provenance = await readJSON(`${pack}/provenance.json`);
const release = await readJSON(`${pack}/source/release.json`);
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const ledgerDir = path.resolve(git('rev-parse', '--git-dir'), 'graphics-export');
await mkdir(ledgerDir, { recursive: true });
// An exclusive directory prevents overlapping local reservations. Interrupted
// reservations are retained; never clear a lock while another export is active.
await mkdir(`${ledgerDir}/lock`);
let allocation;
try {
  try { allocation = await readJSON(`${ledgerDir}/ledger.json`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; allocation = { scope: `local-${randomUUID().slice(0, 8)}`, ordinal: 0 }; }
  allocation.ordinal++;
  await writeFile(`${ledgerDir}/ledger.json`, JSON.stringify(allocation, null, 2) + '\n');
} finally { await rm(`${ledgerDir}/lock`, { recursive: true }); }
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${entry.name}`;
    result.push(...(entry.isDirectory() ? await files(p) : [p]));
  }
  return result;
}
const inputs = [...await files('scripts'), ...await files(`${pack}/source`), `${pack}/provenance.json`, 'package.json', 'package-lock.json'].sort();
const digest = createHash('sha256');
for (const p of inputs) digest.update(p + '\0').update(await readFile(p));
const fingerprint = digest.digest('hex');
const builtAt = new Date().toISOString();
const stamp = builtAt.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const revision = git('rev-parse', 'HEAD');
const dirty = !!git('status', '--porcelain');
const id = `${release.version}_${release.codenameSlug}_${allocation.scope}_build-${String(allocation.ordinal).padStart(3, '0')}_${stamp}_g${revision.slice(0, 12)}${dirty ? '-dirty-' + fingerprint.slice(0, 8) : ''}_graphics`;
const out = `${pack}/exports/${id}`;
await mkdir(`${pack}/exports`, { recursive: true });
await mkdir(out);
console.log(`EXPORT START ${id}`);
const manifest = { id, version: release.version, codename: release.codename, ...allocation, builtAt, target: 'graphics', storageRevision: revision, dirty, inputSHA256: fingerprint, source: provenance.source, pose: 'Default game state at zero tilt; isolated weights are 100 g', millimetersPerUnit: 25, assets: [] };
await writeFile(`${out}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
try {
  const { assets, woodTexture } = await import('./levers-assets.js');
  for (const [name, object] of assets) {
    object.userData = { buildId: id, sourceRepository: provenance.source.repository, sourceCommit: provenance.source.commit, units: 'game unit', millimetersPerUnit: 25, upAxis: 'Y', staticPose: true };
    const binary = await new GLTFExporter().parseAsync(object, { binary: true, onlyVisible: true });
    const loaded = await new GLTFLoader().parseAsync(binary, '');
    const a = new THREE.Box3().setFromObject(object), b = new THREE.Box3().setFromObject(loaded.scene);
    if (a.min.distanceTo(b.min) > 0.0001 || a.max.distanceTo(b.max) > 0.0001) throw new Error(`Bounds changed during GLB round trip: ${name}`);
    const stats = obj => {
      const counts = { meshes: 0, lines: 0, textures: 0, vertices: 0 };
      obj.traverse(o => {
        if (o.isMesh) counts.meshes++;
        if (o.isLine) counts.lines++;
        if (o.geometry) counts.vertices += o.geometry.attributes.position.count;
        if (o.material?.map) counts.textures++;
      });
      return counts;
    };
    const original = stats(object), imported = stats(loaded.scene);
    if (JSON.stringify(original) !== JSON.stringify(imported)) throw new Error(`Objects changed during GLB round trip: ${name}`);
    await writeFile(`${out}/${name}.glb`, Buffer.from(binary));
    manifest.assets.push({ name, model: `${name}.glb`, ...imported, bounds: { min: b.min.toArray(), max: b.max.toArray() }, roundTrip: 'passed' });
    console.log(`Exported and reloaded ${name}: ${imported.meshes} meshes, ${imported.lines} lines, ${imported.textures} textures`);
  }
  await writeFile(`${out}/wood-grain.png`, woodTexture.toBuffer('image/png'));
  const appSource = await readFile(`${pack}/source/src/app.js`, 'utf8');
  const start = appSource.indexOf('function drawFallback() {');
  const end = appSource.indexOf('\nfunction fallbackFrame', start);
  if (start < 0 || end < 0) throw new Error('Cannot locate the source SVG renderer.');
  const svg = { innerHTML: '' }, app = { dataset: {} };
  const draw = new Function('state', 'fallbackMotion', 'POINTER', 'OBJECTS', 'massKey', 'arm', 'colors', 'cap', '$', 'updateStatus', appSource.slice(start, end) + '\nreturn drawFallback;');
  draw(DEFAULT, { angle: 0 }, POINTER, OBJECTS, massKey, arm, { effort: '#176b61', fulcrum: '#714896', load: '#89500b' }, s => s[0].toUpperCase() + s.slice(1), s => s === '#fallback-svg' ? svg : app, () => {})();
  await writeFile(`${out}/lever-diagram.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" font-family="Comic Sans MS, Comic Sans, Comic Neue, cursive"><title>Levers: Load, Effort, and Distance — Default Diagram</title>${svg.innerHTML}</svg>\n`);
  manifest.status = 'verified';
  await writeFile(`${out}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(`${pack}/current-export.json`, JSON.stringify({ id, directory: `exports/${id}`, manifest: `exports/${id}/manifest.json` }, null, 2) + '\n');
  console.log(`EXPORT SUCCESS ${id}`);
} catch (error) {
  manifest.status = 'failed';
  await writeFile(`${out}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
  console.error(`EXPORT FAILED ${id}`);
  throw error;
}
