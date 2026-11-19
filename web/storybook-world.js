// Decorative procedural scenery. Kept separate from the adventure rules.
export function decorateForest(THREE, scene) {
  const ball=new THREE.SphereGeometry(1,12,10);
  const stemGeo=new THREE.CylinderGeometry(.12,.2,1,7);
  const leafGeo=new THREE.SphereGeometry(1,10,8);
  const mats={pink:new THREE.MeshStandardMaterial({color:'#ffb3bc',roughness:.9}),ivory:new THREE.MeshStandardMaterial({color:'#fff5db'}),lavender:new THREE.MeshStandardMaterial({color:'#c9b5f5'}),yellow:new THREE.MeshStandardMaterial({color:'#ffdf88'}),mint:new THREE.MeshStandardMaterial({color:'#93d9a5'}),wood:new THREE.MeshStandardMaterial({color:'#b78a68'}),path:new THREE.MeshStandardMaterial({color:'#f2d9ae',roughness:1}),white:new THREE.MeshBasicMaterial({color:'#fffaf1'})};
  function item(g,m,p,s,parent=scene){const o=new THREE.Mesh(g,m);o.position.set(...p);o.scale.set(...s);parent.add(o);o.castShadow=true;return o}
  // Soft stepping-stone path curves toward the center clearing.
  for(let i=0;i<17;i++){const z=11-i*.78;const x=Math.sin(i*.31)*.5;item(ball,mats.path,[x,.035,z],[.65,.09,.49]);}
  // Friendly, rounded mushroom clusters around the clearing.
  for(let i=0;i<20;i++){const a=i*2.39996,r=5.5+(i%5)*1.05,x=Math.cos(a)*r,z=Math.sin(a)*r;const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);const scale=.65+(i%4)*.16;group.scale.setScalar(scale);item(stemGeo,mats.ivory,[0,.33,0],[1,.64,1],group);item(ball,i%3===0?mats.lavender:i%3===1?mats.pink:mats.yellow,[0,.72,0],[.56,.28,.52],group);for(let d=0;d<3;d++){const t=d*Math.PI*2/3;item(ball,mats.ivory,[Math.cos(t)*.28,.89,Math.sin(t)*.25],[.09,.045,.08],group)}}
  // Flower clusters with individual petals, not simple scattered spheres.
  for(let i=0;i<40;i++){const a=i*2.39996,r=3.5+(i%7)*.85,x=Math.cos(a)*r,z=Math.sin(a)*r;const g=new THREE.Group();g.position.set(x,.1,z);g.rotation.y=i*.7;scene.add(g);const petal=i%3===0?mats.pink:i%3===1?mats.lavender:mats.ivory;for(let j=0;j<5;j++){const t=j*Math.PI*2/5;item(ball,petal,[Math.cos(t)*.16,.12,Math.sin(t)*.16],[.15,.08,.15],g)}item(ball,mats.yellow,[0,.18,0],[.12,.1,.12],g)}
  // Floating puffy cloud shapes, anchored far behind the forest.
  for(let i=0;i<6;i++){const g=new THREE.Group();g.position.set(-22+i*9,15+(i%3)*2,-24-(i%2)*7);scene.add(g);item(ball,mats.white,[0,0,0],[2.4,1,1],g);item(ball,mats.white,[-1.5,-.3,0],[1.3,.8,.9],g);item(ball,mats.white,[1.5,-.25,0],[1.5,.85,.9],g)}
  // Pastel butterflies bob slowly; they are decorative and not collectibles.
  const butterflies=[];for(let i=0;i<7;i++){const g=new THREE.Group();g.position.set(Math.cos(i*2.2)*4.8,2.6+i%3,Math.sin(i*2.2)*4.6);scene.add(g);const wing=i%2?mats.pink:mats.lavender;for(const sign of [-1,1]){const w=item(leafGeo,wing,[sign*.22,.12,0],[.26,.38,.08],g);w.rotation.z=sign*.4}item(ball,mats.wood,[0,0,0],[.07,.3,.09],g);butterflies.push({group:g,y:g.position.y,offset:i})}
  return {update(time,reduced){for(const b of butterflies){b.group.position.y=b.y+(reduced?0:Math.sin(time*1.5+b.offset)*.3);b.group.rotation.y=reduced?0:Math.sin(time+b.offset)*.3}}};
}
