// Route the original archived Node geometry tests to this demo's pinned engine.
export async function resolve(specifier,context,nextResolve){
 if(specifier==='three')return {url:new URL('./node_modules/three/build/three.module.js',import.meta.url).href,shortCircuit:true};
 if(specifier.startsWith('three/addons/'))return {url:new URL('./node_modules/three/examples/jsm/'+specifier.slice('three/addons/'.length),import.meta.url).href,shortCircuit:true};
 return nextResolve(specifier,context);
}
