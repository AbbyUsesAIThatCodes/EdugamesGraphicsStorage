import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
const record=await(await fetch('../provenance.json')).json(),rev=record.source.commit,base=`../source/${rev}/src/`;
const [{createClassroom,addClassroomLighting},{LeverScene},{PRESETS},{EXAMPLES,exampleGraphic}]=await Promise.all([import(base+'classroom/classroom.js'),import(base+'scene.js'),import(base+'model.js'),import(base+'examples.js')]);
const host=document.querySelector('#room'),renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;host.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','Procedural classroom asset; drag to orbit');
const scene=new THREE.Scene();scene.background=new THREE.Color('#e8e3d2');addClassroomLighting(scene);
const camera=new THREE.PerspectiveCamera(45,1,.01,100),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;
const room=createClassroom();room.groups.Ceiling.visible=false;scene.add(room.root);
let component=null,view='room',lever;
const render=()=>renderer.render(scene,camera);
const size=()=>{if(host.hidden)return;renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();render()};
new ResizeObserver(size).observe(host);controls.addEventListener('change',render);
function fit(object,direction){scene.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(object),center=box.getCenter(new THREE.Vector3()),extent=box.getSize(new THREE.Vector3()),distance=extent.length()/Math.sin(THREE.MathUtils.degToRad(22.5))*.58;controls.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(...direction).normalize().multiplyScalar(distance));controls.minDistance=.05;controls.maxDistance=40;controls.update();render()}
async function show(next){
 view=next;document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
 host.hidden=view==='lever';document.querySelector('#lever').hidden=view!=='lever';document.querySelector('#roles').hidden=view!=='lever';
 if(view==='lever'){
  if(!lever){lever=new LeverScene(document.querySelector('#lever'),{onChange:s=>lever.setState(s),onSelect:role=>{document.querySelector('#caption').textContent=role?`${role[0].toUpperCase()+role.slice(1)} Selected — Green Interaction Glow`:'No Part Selected'}});await lever.init();lever.setState(PRESETS[1]);lever.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;}
  lever.active=true;lever.resize();lever.resetCamera();document.querySelector('#caption').textContent='Original Procedural Lever — Select A Part To Inspect Its Glow';
 }else{
  if(lever)lever.active=false;if(component){scene.remove(component);component=null}room.root.visible=view==='room';
  if(view==='room'){controls.target.set(0,1,-1.1);camera.position.set(0,3,6.4);controls.minDistance=.1;controls.maxDistance=22;controls.update()}
  else {component=new THREE.Group();const objects=view==='desks'?room.groups.Furniture.children.filter(o=>o.name.startsWith('Desk_Pair_')):[room.root.getObjectByName(view==='door'?'FrontExitDoor':'FireExtinguisher')];for(const object of objects){const clone=object.clone(true);object.updateWorldMatrix(true,false);clone.applyMatrix4(object.parent.matrixWorld);component.add(clone)}scene.add(component);fit(component,view==='extinguisher'?[-3,1,2]:[2,1.7,3]);}
  const captions={room:'Photo-Informed Classroom — Procedural Textures; Approximate Metres',desks:'Four Separate Desks Arranged As Two Pairs',door:'Exit Door With Two Push-Bar Mounts And A Horizontal Bar',extinguisher:'Extinguisher With Bracket, Gauge, Handle And Curved Hose'};document.querySelector('#caption').textContent=captions[view];size();
 }
 window.demoReady=true;
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
document.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{lever.select(b.dataset.role||null);lever.highlight(null);lever.draw()}));
let reveal=true;function examples(){document.querySelector('#examples').innerHTML=EXAMPLES.map(e=>`<article><h2>${e.title}</h2>${exampleGraphic(e,reveal)}<p>${reveal?e.text:'Use the marked A, B and C locations to identify the roles.'}</p></article>`).join('')};examples();document.querySelector('#reveal').addEventListener('click',e=>{reveal=!reveal;e.target.textContent=reveal?'Hide Role Names':'Reveal Role Names';e.target.setAttribute('aria-pressed',String(reveal));examples()});
document.querySelector('#identity').textContent=`Live Source Asset Demo — Not A New Game Build Or GLB Export. Source: ${record.source.repository}@${rev}. Upstream build reference: ${record.upstreamBuild.id}. ClassroomVirtualization ancestry: 1f25638e64861424a52f8bf381cea2a247cfe74e. See ../provenance.json and ../README.md for licenses and limitations.`;
window.assetDemo={get view(){return view},room,renderer,show,get lever(){return lever},EXAMPLES,sourceRevision:rev,buildId:record.upstreamBuild.id};await show('room');
