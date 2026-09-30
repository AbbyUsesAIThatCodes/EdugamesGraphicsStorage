// Integrity checks for procedural packs without modifying their source snapshots.
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=`${dir}/${e.name}`;result.push(...e.isDirectory()?await files(p):[p])}return result}
for(const name of await readdir('packs')){
  if(name==='levers-load-effort-distance')continue;
  const dir=`packs/${name}`,record=await json(`${dir}/provenance.json`);
  for(const entry of [...record.snapshotFiles,...record.dependencyAssets||[]]){
    const data=await readFile(`${dir}/${entry.path}`);assert.equal(hash(data),entry.sha256,entry.path);assert.equal(data.length,entry.bytes,entry.path);
    if(entry.sourceCommit)assert.match(entry.sourceCommit,/^[a-f0-9]{40}$/);
  }
  const inventory=(await readFile(`${dir}/checksums.sha256`,'utf8')).trim().split('\n');
  for(const line of inventory){const m=/^([a-f0-9]{64})  (.+)$/.exec(line);assert(m,line);assert.equal(hash(await readFile(`${dir}/${m[2]}`)),m[1],m[2])}
  assert.deepEqual(inventory.map(l=>l.slice(66)).sort(),(await files(dir)).map(p=>path.posix.relative(dir,p)).filter(p=>p!=='checksums.sha256').sort(),`${name}: complete inventory`);
  if(record.upstreamBuild){const b=record.upstreamBuild,bytes=await readFile(`${dir}/${b.manifest}`),manifest=JSON.parse(bytes);assert.equal(hash(bytes),b.sha256);assert.equal(bytes.length,b.bytes);assert(['id','fullId'].includes(b.idField||'id'));assert.equal(manifest[b.idField||'id'],b.id);assert.equal(manifest.sourceRevision,record.source.commit)}
  console.log(`Verified ${name}: ${record.snapshotFiles.length} preserved source files and ${inventory.length} inventory entries.`);
}
