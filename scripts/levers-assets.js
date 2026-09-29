import * as THREE from 'three';
import { createApparatus } from '../packs/levers-load-effort-distance/source/src/apparatus.js';
import { LeverScene } from '../packs/levers-load-effort-distance/source/src/scene.js';
import { DEFAULT, OBJECTS, POINTER, massKey, arm } from '../packs/levers-load-effort-distance/source/src/model.js';

const assets = new Map();
function add(name, objects, normalize = true) {
  const root = new THREE.Group();
  root.name = name;
  for (const object of objects) root.add(object.clone(true));
  if (normalize) {
    const bounds = new THREE.Box3().setFromObject(root);
    const center = bounds.getCenter(new THREE.Vector3());
    for (const child of root.children) child.position.sub(new THREE.Vector3(center.x, bounds.min.y, center.z));
  }
  root.updateMatrixWorld(true);
  assets.set(name, root);
  return root;
}

const apparatus = createApparatus();
apparatus.update(DEFAULT, 0);
add('lever-assembly', [apparatus.moving, apparatus.base], false);
apparatus.update({ ...DEFAULT, loadMass: 100, effortMass: 100 }, 0);
add('lever-beam', [apparatus.beam]);
add('fulcrum-support', [apparatus.base]);
add('load-crate-100g', [apparatus.weights.load]);
add('effort-weight-100g', [apparatus.weights.effort]);
add('effort-hanger-100g', [apparatus.attachments.effort]);
add('balance-pointer', [apparatus.pointer]);

const workshop = new LeverScene(null);
workshop.scene = new THREE.Scene();
workshop.makeRoom();
const room = workshop.scene.children;
if (room.length !== 12) throw new Error('Workshop structure changed; update the named asset mapping.');
['floor', 'workbench', 'cutting-mat', 'mat-grid', 'paper-stack', 'paper-top', 'pencil', 'cactus', 'wall', 'board-frame', 'chalkboard', 'chalk-tray'].forEach((name, i) => room[i].name = name);
add('workshop-environment', room, false);
add('classroom-and-lever', [...room, ...assets.get('lever-assembly').children], false);
add('workbench', [room[1]]);
add('cutting-mat', [room[2], room[3]]);
add('paper-and-pencil', [room[4], room[5], room[6]]);
add('potted-cactus', [room[7]]);
add('classroom-backdrop', room.slice(8));
add('floor', [room[0]]);

export { assets };
export const woodTexture = room[1].material.map.image;
