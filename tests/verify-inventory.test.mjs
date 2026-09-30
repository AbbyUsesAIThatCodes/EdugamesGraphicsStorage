import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';

// Exercise the actual procedural verification block with a small filesystem
// fixture and Node's real Windows/POSIX path semantics, on either host OS.
const source=await readFile(new URL('../scripts/verify.mjs',import.meta.url),'utf8');
const marker='// Procedural source packs carry snapshots rather than manufactured mesh exports.';
assert(source.includes(marker),'Procedural verifier block must remain testable');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const verify=new AsyncFunction('readdir','json','readFile','files','path','assert','createHash','console',source.slice(source.indexOf(marker)));
const hash=b=>createHash('sha256').update(b).digest('hex');

async function fixture(paths,{extra=false,corrupt=false,portablePaths=false}={}){
  const dir='packs/example',file='source-current/nested/scene.mjs',bytes=Buffer.from('export const size=1;\n');
  const record={snapshotFiles:[{path:file,sourceCommit:'a'.repeat(40),sha256:hash(bytes),bytes:bytes.length}]};
  const data=new Map([[`${dir}/${file}`,bytes],[`${dir}/provenance.json`,Buffer.from(JSON.stringify(record))]]);
  const inventory=[...data].map(([name,value])=>`${hash(value)}  ${name.slice(dir.length+1)}`).join('\n')+'\n';
  data.set(`${dir}/checksums.sha256`,Buffer.from(inventory));
  if(corrupt)data.set(`${dir}/${file}`,Buffer.from('changed source\n'));
  if(extra)data.set(`${dir}/source-current/untracked.txt`,Buffer.from('not inventoried'));
  const entries=[...data.keys()].map(p=>(portablePaths?path.posix:paths).join(...p.split('/')));
  await verify(async()=>['levers-load-effort-distance','example'],async()=>record,
    async (p,encoding)=>{assert(data.has(p),p);return encoding?data.get(p).toString(encoding):data.get(p)},async()=>entries,
    {...path,...paths},assert,createHash,{log(){}});
}

for(const [name,paths] of [['Windows',path.win32],['POSIX',path.posix]]){
  test(`${name}: nested source paths match portable checksum entries`,()=>fixture(paths));
  test(`${name}: unlisted files still fail the inventory check`,()=>assert.rejects(fixture(paths,{extra:true}),/Complete procedural pack inventory/));
  test(`${name}: changed source bytes still fail hash validation`,()=>assert.rejects(fixture(paths,{corrupt:true}),{code:'ERR_ASSERTION'}));
}
test('Windows: portable directory enumeration also passes',()=>fixture(path.win32,{portablePaths:true}));
