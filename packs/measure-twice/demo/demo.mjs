// Static asset adapter. Archived generators remain byte-identical to upstream.
import {createWorkshop} from '../source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/workshop.js';
import {comparisonPlacement} from '../source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/model.js';
const [house,palette,provenance]=await Promise.all([
  fetch('../source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/data/house.json').then(r=>r.json()),
  fetch('../palette.json').then(r=>r.json()),fetch('../provenance.json').then(r=>r.json())
]);
const w=createWorkshop(document.querySelector('#stage'));
const {THREE,scene,camera,look,render,box,plank,line,mat,wood,woodLight,woodDark}=w;
const feedback=palette.feedback,group=new THREE.Group();scene.add(group);
const origin=new THREE.Vector3(3.35,2.76,-.9);
let view='workshop';
const descriptions={
  workshop:['Sunny Woodshop','Recovered workshop, saw and guard, timber bench, window, plant, tool cup, and procedural wood grain.'],
  house:['17-Piece House','Eight 1¼ in pieces, four 2 in pieces, and five 1 in pieces. Every timber retains its original length and constant profile.'],
  rack:['Aligned Comparison Rack','Nine pieces show eight side-by-side positions and the next raised layer. Every start is aligned; wood width 0.63 plus gap 0.09 world units.'],
  neutral:['Your Cut Piece','A 1¼ in piece without a target. Natural wood has no correctness glow.'],
  short:['⅛ in Too Short','Your piece: 1⅛ in. Needed: 1¼ in. The red ghost shows the missing wood.'],
  long:['⅛ in Too Long','Your piece: 1⅜ in. Needed: 1¼ in. The red overlay shows extra wood; the solid line marks the target cut.'],
  correct:['A Perfect Fit','Your piece and requested length both equal 1¼ in. Green glow, equal endpoints, and a checkmark communicate the match.'],
  selected:['Selected: Wooden Piece','Cyan identifies the selected object. It is an interaction cue, not a correct-answer signal.']
};
function own(object){group.add(object);return object}
function clear(){group.traverse(o=>{o.geometry?.dispose();if(o.material&&![wood,woodLight,woodDark].includes(o.material))o.material.dispose?.()});group.clear()}
function material(role){const {cue,behavior,...values}=feedback[role];return mat(values.color,{...values})}
function dimension(parent,start,end,y,color){line([[start,y,0],[end,y,0]],color,parent);line([[start,y-.1,0],[start,y+.1,0]],color,parent);line([[end,y-.1,0],[end,y+.1,0]],color,parent)}
function inspection(kind){
  const actual=kind==='short'?18:kind==='long'?22:20,target=20;
  const a=actual/8,n=target/8,left=-n/2;
  const g=own(new THREE.Group());g.name='inspection';g.position.set(0,3.72,3.7);
  const m=wood.clone();
  if(kind!=='neutral'){const role=feedback[kind==='selected'?'selected':kind==='correct'?'correct':'incorrect'];m.emissive.set(role.emissive);m.emissiveIntensity=role.emissiveIntensity}
  const timber=box(a,.22,.63,m,left+a/2,0,0,g);timber.name='actual-piece';
  if(!['neutral','selected'].includes(kind)){
    const f=feedback.targetOutline;
    const outline=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(n,.245,.67)),new THREE.LineBasicMaterial({color:f.color,transparent:f.transparent,opacity:f.opacity}));g.add(outline);
    dimension(g,left,n/2,.5,feedback.dimensions.target);
    if(actual<target){const ghost=box(n-a,.225,.645,material('shortGhost'),left+a+(n-a)/2,0,0,g);ghost.name='missing-wood'}
    if(actual>target){const extra=box(a-n,.24,.65,material('longOverlay'),n/2+(a-n)/2,0,0,g);extra.name='extra-wood';box(.035,.255,.7,material('targetCut'),n/2,.01,0,g).name='target-cut'}
  }
  dimension(g,left,left+a,-.39,feedback.dimensions[kind==='correct'?'correct':['short','long'].includes(kind)?'incorrect':'neutral']);
  camera.position.set(0,5.1,10.8);look.set(0,3.72,3.7);
}
function show(next){
  clear();view=next;camera.position.copy(w.homePos);look.copy(w.homeLook);
  if(next==='house'){
    for(const family of house.families)for(const placement of family.placements){
      const from=new THREE.Vector3(...placement.from.map(n=>n/8)).add(origin),to=new THREE.Vector3(...placement.to.map(n=>n/8)).add(origin);
      const q=own(plank(family.length/8));q.name='house-piece';q.userData={length:family.length};q.position.copy(from.clone().add(to).multiplyScalar(.5));q.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),to.sub(from).normalize());
    }
    camera.position.set(9,7,10);look.set(2.7,3.9,-.9);
  }else if(next==='rack'){
    box(6.6,.16,5.8,woodLight,3.6,2.7,-.5,group);
    for(const x of [.5,6.7])for(const z of [-3.1,2.1])box(.18,2.5,.18,woodDark,x,1.3,z,group);
    [7,26,48,16,20,12,32,18,24].forEach((length,i)=>{const q=own(plank(length/8)),p=comparisonPlacement(i,length);q.position.set(p.x,p.y,p.z);q.name='rack-piece';q.userData={length,index:i}});
    camera.position.set(10,10,10);look.set(2.6,2.9,-.7);
  }else if(next!=='workshop')inspection(next);
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===next)));
  document.querySelector('#title').textContent=descriptions[next][0];document.querySelector('#detail').textContent=descriptions[next][1];document.querySelector('#checkmark').hidden=next!=='correct';render();
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.view)));
let drag=null;const canvas=w.renderer.domElement;
canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointerup',()=>drag=null);
canvas.addEventListener('pointermove',e=>{if(!drag)return;const p=new THREE.Spherical().setFromVector3(camera.position.clone().sub(look));p.theta-=(e.clientX-drag.x)*.006;p.phi=Math.max(.2,Math.min(1.5,p.phi+(e.clientY-drag.y)*.006));camera.position.copy(look).add(new THREE.Vector3().setFromSpherical(p));drag={x:e.clientX,y:e.clientY};render()});
document.querySelector('#identity').textContent=`Source ${provenance.demonstration.sourceSnapshot} · Preserved Upstream Build ${provenance.upstreamBuild.id}`;
console.info(`LIVE ASSET DEMO ${provenance.demonstration.sourceSnapshot}; upstream ${provenance.upstreamBuild.id}`);
window.assetReview={show,snapshot:()=>({view,source:provenance.demonstration.sourceSnapshot,upstreamBuild:provenance.upstreamBuild.id,objects:group.children.filter(o=>o.name).map(o=>({name:o.name,length:o.userData.length,index:o.userData.index,position:o.position.toArray(),scale:o.scale.toArray(),meshWidth:o.children[0]?.geometry?.parameters.width})),inspection:group.getObjectByName('inspection')?.children.filter(o=>o.name).map(o=>({name:o.name,dimensions:o.geometry.parameters,position:o.position.toArray(),color:o.material.color.getHexString(),emissive:o.material.emissive?.getHexString(),emissiveIntensity:o.material.emissiveIntensity,opacity:o.material.opacity,depthWrite:o.material.depthWrite})),camera:camera.position.toArray()})};
show('workshop');w.resize();
