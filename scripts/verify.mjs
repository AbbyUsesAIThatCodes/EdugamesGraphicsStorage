import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const pack = 'packs/levers-load-effort-distance';
const json = async p => JSON.parse(await readFile(p, 'utf8'));
const provenance = await json(`${pack}/provenance.json`);
let checked = 0;
for (const entry of [...provenance.snapshotFiles, ...provenance.dependencyAssets]) {
  const content = await readFile(`${pack}/${entry.path}`);
  assert.equal(createHash('sha256').update(content).digest('hex'), entry.sha256, entry.path);
  assert.equal(content.length, entry.bytes, entry.path);
  checked++;
}
const current = await json(`${pack}/current-export.json`);
const manifest = await json(`${pack}/${current.manifest}`);
assert.equal(manifest.id, current.id);
assert.equal(path.basename(current.directory), current.id);
assert.equal(manifest.source.commit, provenance.source.commit);
assert.equal(manifest.status, 'verified');
assert.equal(manifest.assets.length, 15);
for (const asset of manifest.assets) {
  const data = await readFile(`${pack}/${current.directory}/${asset.model}`);
  assert.equal(data.toString('ascii', 0, 4), 'glTF');
  assert.equal(data.readUInt32LE(4), 2);
  assert.equal(data.readUInt32LE(8), data.length);
  const gltf = JSON.parse(data.toString('utf8', 20, 20 + data.readUInt32LE(12)));
  const identity = gltf.nodes.find(node => node.extras?.buildId)?.extras;
  assert.equal(identity?.buildId, current.id);
  assert.equal(identity.sourceCommit, provenance.source.commit);
  assert.equal(asset.roundTrip, 'passed');
  assert(gltf.meshes.length > 0);
}
const inventory = (await readFile(`${pack}/checksums.sha256`, 'utf8')).trim().split('\n');
for (const line of inventory) {
  const [, checksum, file] = /^(\w{64})  (.+)$/.exec(line) || [];
  assert(checksum && file, line);
  assert.equal(createHash('sha256').update(await readFile(`${pack}/${file}`)).digest('hex'), checksum, file);
}
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const p = path.join(dir, entry.name);
    result.push(...(entry.isDirectory() ? await files(p) : [p]));
  }
  return result;
}
const packFiles = (await files(pack)).map(p => path.relative(pack, p)).filter(p => p !== 'checksums.sha256').sort();
assert.deepEqual(inventory.map(line => line.slice(66)).sort(), packFiles, 'Inventory must cover every pack file');
// Authored catalog/docs links must resolve; archival upstream docs are unchanged.
for (const file of (await files('.')).filter(p => p.endsWith('.md') && !p.includes('/source/') && !p.includes('/reference-screenshots/'))) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(https?:|#)/.test(target)) continue;
    await readFile(path.resolve(path.dirname(file), target.split('#')[0]));
  }
}
console.log(`Verified ${checked} preserved files, ${manifest.assets.length} GLBs, ${inventory.length} inventory entries, export identity, and authored documentation links.`);

// Procedural source packs carry snapshots rather than manufactured mesh exports.
for (const name of await readdir('packs')) {
  if (name === 'levers-load-effort-distance') continue;
  const dir = `packs/${name}`;
  const record = await json(`${dir}/provenance.json`);
  for (const entry of record.snapshotFiles) {
    const data = await readFile(`${dir}/${entry.path}`);
    assert.equal(createHash('sha256').update(data).digest('hex'), entry.sha256, entry.path);
    assert.equal(data.length, entry.bytes, entry.path);
    assert(/^[a-f0-9]{40}$/.test(entry.sourceCommit), 'Full source revision required');
  }
  const lines = (await readFile(`${dir}/checksums.sha256`, 'utf8')).trim().split('\n');
  for (const line of lines) {
    const [, hash, file] = /^(\w{64})  (.+)$/.exec(line) || [];
    assert(hash && file, line);
    assert.equal(createHash('sha256').update(await readFile(`${dir}/${file}`)).digest('hex'), hash, file);
  }
  const all = (await files(dir)).map(p => path.relative(dir,p).split(path.sep).join('/')).filter(p => p !== 'checksums.sha256').sort();
  assert.deepEqual(lines.map(l => l.slice(66)).sort(), all, 'Complete procedural pack inventory');
  console.log(`Verified ${name}: ${record.snapshotFiles.length} original source files and ${lines.length} inventory entries.`);
}
