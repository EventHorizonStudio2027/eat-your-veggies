// Storybook 2.5D discovery garden: layered 3D diorama viewed from a fixed tilted camera.
export function createDiscoveryWorld(THREE,scene,hero,notify){
 const sphere=new THREE.SphereGeometry(1,12,9),box=new THREE.BoxGeometry(1,1,1),cone=new THREE.ConeGeometry(1,1,8);
 const mat=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.95});
 const colors={pink:mat('#f5a5ba'),peach:mat('#ffc69e'),mint:mat('#9cdbb0'),violet:mat('#b5a4e4'),yellow:mat('#ffe49a'),wood:mat('#b88468'),cream:mat('#fff6da'),blue:mat('#9ed8e5')};
 function obj(geo,m,x,y,z,sx,sy,sz,parent=scene){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);parent.add(o);return o}
 const discoveries=[];const locations=[[-6,-5],[5,-5],[-5,5],[5,5],[0,-7],[7,1]];
 const names=['a singing mushroom','a sleepy cloud','a wishing well','a rainbow butterfly','a tiny treasure chest','a friendly flower'];
 locations.forEach(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  if(i===0){obj(cone,colors.pink,0,1.1,0,.95,.55,.95,g);obj(box,colors.cream,0,.48,0,.32,.9,.32,g);for(const a of [-.3,.3])obj(sphere,colors.cream,a,1.2,.35,.12,.1,.07,g)}
  if(i===1){for(let j=0;j<4;j++)obj(sphere,colors.cream,(j-1.5)*.4,1.4+Math.sin(j)*.12,0,.52,.35,.42,g)}
  if(i===2){obj(box,colors.wood,0,.35,0,1.2,.6,1.1,g);obj(sphere,colors.blue,0,.68,0,.53,.08,.47,g);obj(box,colors.wood,-.55,1,0,.14,1.5,.14,g);obj(box,colors.wood,.55,1,0,.14,1.5,.14,g);obj(cone,colors.peach,0,1.9,0,.95,.6,.85,g)}
  if(i===3){for(const a of [-1,1]){obj(sphere,colors.violet,a*.35,1.2,0,.42,.58,.14,g);obj(sphere,colors.pink,a*.35,.7,0,.34,.4,.12,g)}obj(box,colors.wood,0,1,0,.1,.8,.12,g)}
  if(i===4){obj(box,colors.wood,0,.4,0,.9,.7,.7,g);obj(box,colors.yellow,0,.75,0,1,.18,.8,g);obj(sphere,colors.yellow,0,1.1,0,.22,.22,.22,g)}
  if(i===5){obj(box,colors.mint,0,.5,0,.14,.95,.14,g);for(let a=0;a<6;a++){const t=a*Math.PI/3;obj(sphere,colors.pink,Math.cos(t)*.38,1.32+Math.sin(t)*.38,0,.27,.28,.15,g)}obj(sphere,colors.yellow,0,1.32,.12,.29,.29,.2,g)}
  obj(sphere,colors.yellow,0,2.4,0,.12,.12,.12,g);discoveries.push({g,name:names[i],seen:false});
 });
 // Decorative layered pastel hills and stepping stones create an illustrated depth effect.
 for(let i=0;i<13;i++){const a=i*2.4,r=9+(i%3)*1.8;obj(sphere,i%2?colors.mint:colors.blue,Math.cos(a)*r,-.7,Math.sin(a)*r,2.8,1.4,2.4)}
 for(let i=0;i<15;i++){const z=-6+i*.8;obj(sphere,colors.cream,Math.sin(i*.7)*.5,.045,z,.36,.07,.3)}
 let count=0;
 const restoreObjects=[];const petals=[];
 for(let i=0;i<9;i++){const a=i*Math.PI*2/9;const x=Math.cos(a)*3.4,z=Math.sin(a)*3.4;const stem=obj(box,colors.mint,x,.38,z,.12,.72,.12);const bloom=new THREE.Group();bloom.position.set(x,.8,z);scene.add(bloom);for(let j=0;j<5;j++){const t=j*Math.PI*2/5;obj(sphere,colors.pink,Math.cos(t)*.26,Math.sin(t)*.26,0,.24,.24,.16,bloom)}obj(sphere,colors.yellow,0,0,.14,.24,.24,.18,bloom);bloom.scale.setScalar(.1);petals.push(bloom);restoreObjects.push(stem)}
 const restoration={progress:0,target:0};
 function setRestoration(progress){restoration.target=Math.max(0,Math.min(1,progress))}

 function update(dt,t,reduced){restoration.progress+=(restoration.target-restoration.progress)*Math.min(1,dt*2.5);for(const bloom of petals){const scale=.12+restoration.progress*.88;bloom.scale.setScalar(scale);if(!reduced)bloom.rotation.y=Math.sin(t+bloom.position.x)*.13}for(const d of discoveries){if(!d.seen&&Math.hypot(d.g.position.x-hero.position.x,d.g.position.z-hero.position.z)<1.4){d.seen=true;count++;notify('✨ You found '+d.name+'! ('+count+'/6 surprises)')}if(!reduced)d.g.rotation.y=Math.sin(t*.6+d.g.position.x)*.06}}
 return {update,setRestoration};
}
