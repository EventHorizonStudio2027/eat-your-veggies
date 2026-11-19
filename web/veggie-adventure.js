// Free-roaming, no-pressure toddler play. No food consumption is required in real life.
export function createVeggieAdventure(THREE,scene,hero,sprig,canvas){
 const sphere=new THREE.SphereGeometry(1,16,12),stem=new THREE.CylinderGeometry(.11,.15,.7,10),cone=new THREE.ConeGeometry(.32,.9,12);
 const material=color=>new THREE.MeshStandardMaterial({color,roughness:.8});
 const orange=material('#ff9d42'),green=material('#66b96b'),dark=material('#3e985d'),red=material('#f57874'),cream=material('#fff1c8'),black=material('#31443c'),pink=material('#f7b2b8');
 const veggies=[],bag=[];let target=null,walking=false,munching=0,stepTime=0,celebration=0;
 const $=s=>document.querySelector(s);
 function part(parent,geometry,mat,x,y,z,sx=1,sy=1,sz=1){const o=new THREE.Mesh(geometry,mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);parent.add(o);return o}
 function makeVeggie(type,x,z){
  const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  if(type==='Carrot'){part(g,cone,orange,0,.57,0,.9,1,.9).rotation.z=Math.PI;for(let i=-1;i<=1;i++)part(g,sphere,green,i*.16,1.13,0,.13,.35,.13).rotation.z=i*.4}
  if(type==='Broccoli'){part(g,stem,cream,0,.4,0);for(const [a,b,c] of [[0,1.02,0],[-.34,.88,0],[.34,.88,0],[0,.9,-.28]])part(g,sphere,green,a,b,c,.39,.35,.38)}
  if(type==='Tomato'){part(g,sphere,red,0,.57,0,.53,.49,.5);for(let i=0;i<5;i++){const leaf=part(g,sphere,dark,Math.cos(i*1.257)*.18,1.03,Math.sin(i*1.257)*.18,.21,.07,.13);leaf.rotation.y=i*1.257}}
  if(type==='Pea'){for(let i=-1;i<=1;i++)part(g,sphere,green,i*.31,.51,0,.32,.34,.32);part(g,sphere,dark,0,.3,-.19,.91,.2,.26)}
  for(const ex of [-.15,.15]){part(g,sphere,black,ex,.62,.42,.052,.072,.045);part(g,sphere,pink,ex*1.75,.45,.42,.09,.06,.04)}
  g.userData={type};veggies.push(g);return g;
 }
 const types=['Carrot','Broccoli','Tomato','Pea'];
 const levels=[{name:'CARROT PATCH',type:'Carrot',need:2,color:'#f7cf9b'},{name:'BROCCOLI GROVE',type:'Broccoli',need:3,color:'#b9e7a5'},{name:'TOMATO TOWN',type:'Tomato',need:3,color:'#ffc0b4'},{name:'PEA PARTY',type:'Pea',need:4,color:'#c7eeb6'}];
 let level=0,levelMunched=0;const stageMat=new THREE.MeshStandardMaterial({color:levels[0].color,roughness:1});
 const gardenMarker=part(scene,new THREE.CylinderGeometry(1.25,1.25,.14,32),stageMat,0,.12,-2,1,1,1);gardenMarker.receiveShadow=true;
 function activeLevel(){return levels[level]}
 function refreshLevel(){const l=activeLevel();$('#level-label').textContent='LEVEL '+(level+1)+' · '+l.name;$('#level-goal').textContent='Munch '+l.need+' '+l.type.toLowerCase()+(l.need>1?'s':'')+' to unlock the next garden!';$('#level-count').textContent=levelMunched+' / '+l.need+' munched';$('#level-fill').style.width=(levelMunched/l.need*100)+'%';stageMat.color.set(l.color)}
 function restock(){for(const v of veggies){v.visible=true;v.userData.type=types[(level+veggies.indexOf(v))%types.length]}bag.length=0;counter.textContent='0';munch.textContent='🥕 Find veggies';updateHud()}
 function advance(){level=(level+1)%levels.length;levelMunched=0;restock();refreshLevel();say('🌟 New garden unlocked! '+activeLevel().name+'!');hero.position.set(0,0,1);target=null;celebration=2.5}

 for(let i=0;i<16;i++){const a=i*2.39996,r=3.2+(i%4)*1.35;makeVeggie(types[i%4],Math.cos(a)*r,Math.sin(a)*r)}
 const state={collected:0,eaten:0};
 const move={x:0,z:0};
 const keys=new Set();
 const joystick=$('#joystick'),nub=$('#joystick-nub');
 let pointerId=null;
 function setStick(clientX,clientY){const b=joystick.getBoundingClientRect(),dx=clientX-(b.left+b.width/2),dy=clientY-(b.top+b.height/2),length=Math.hypot(dx,dy)||1,limit=b.width*.33,amount=Math.min(length,limit);move.x=dx/length*amount/limit;move.z=dy/length*amount/limit;nub.style.transform='translate('+move.x*limit+'px,'+move.z*limit+'px)'}
 function release(){move.x=move.z=0;pointerId=null;nub.style.transform='translate(0,0)'}
 joystick.addEventListener('pointerdown',e=>{e.preventDefault();pointerId=e.pointerId;joystick.setPointerCapture(e.pointerId);setStick(e.clientX,e.clientY)});
 joystick.addEventListener('pointermove',e=>{if(pointerId===e.pointerId)setStick(e.clientX,e.clientY)});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(event,release);
 window.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','Space'].includes(e.code)){if(e.target===document.body)e.preventDefault();keys.add(e.code)}});
 window.addEventListener('keyup',e=>keys.delete(e.code));
 const munch=$('#munch'),counter=$('#veggie-count'),status=$('#play-status');
 const say=text=>{status.textContent=text;clearTimeout(say.timer);say.timer=setTimeout(()=>{status.textContent='Explore and find yummy veggies!'},2600)};
 function collect(v){if(!v||!v.visible)return;v.visible=false;bag.push(v.userData.type);state.collected++;counter.textContent=String(bag.length);munch.disabled=false;munch.textContent='😋 Munch!';say(v.userData.type===activeLevel().type?'Great! Munch this '+v.userData.type.toLowerCase()+' to grow!':'A '+v.userData.type.toLowerCase()+'! Look for '+activeLevel().type.toLowerCase()+'s too!');celebration=1.2;updateHud()}
 function updateHud(){munch.disabled=bag.length===0;$('#veggie-found').textContent=String(state.collected);$('#veggie-eaten').textContent=String(state.eaten)}
 munch.addEventListener('click',()=>{if(!bag.length)return;const type=bag.shift();state.eaten++;munching=.75;celebration=1.4;counter.textContent=String(bag.length);munch.textContent=bag.length?'😋 Munch!':'🥕 Find veggies';if(type===activeLevel().type){levelMunched++;refreshLevel();if(levelMunched>=activeLevel().need){advance()}else say('Nom nom! '+(activeLevel().need-levelMunched)+' more '+activeLevel().type.toLowerCase()+' to go!')}else say('Yum! Find a '+activeLevel().type.toLowerCase()+' to unlock the next garden!');updateHud();});
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 canvas.addEventListener('pointerdown',e=>{const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);const cam=window.__veggieCamera;if(!cam)return;raycaster.setFromCamera(pointer,cam);const ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();if(raycaster.ray.intersectPlane(ground,hit)){target=new THREE.Vector3(Math.max(-8,Math.min(8,hit.x)),0,Math.max(-8,Math.min(8,hit.z)));say('Here we go!')}})
 const shadow=part(hero,new THREE.CircleGeometry(.6,24),new THREE.MeshBasicMaterial({color:'#326c43',transparent:true,opacity:.14,depthWrite:false}),0,.04,0,1,1,1);shadow.rotation.x=-Math.PI/2;
 function update(dt,time,reduced){
  let dx=move.x,dz=move.z;
  if(keys.has('ArrowLeft')||keys.has('KeyA'))dx-=1;if(keys.has('ArrowRight')||keys.has('KeyD'))dx+=1;
  if(keys.has('ArrowUp')||keys.has('KeyW'))dz-=1;if(keys.has('ArrowDown')||keys.has('KeyS'))dz+=1;
  if(dx||dz)target=null;
  if(!dx&&!dz&&target){dx=target.x-hero.position.x;dz=target.z-hero.position.z;if(Math.hypot(dx,dz)<.2){target=null;dx=dz=0}}
  const length=Math.hypot(dx,dz);walking=length>.03;
  if(walking){const speed=3.5;hero.position.x+=dx/length*speed*dt;hero.position.z+=dz/length*speed*dt;hero.position.x=Math.max(-8,Math.min(8,hero.position.x));hero.position.z=Math.max(-8,Math.min(8,hero.position.z));hero.rotation.y=Math.atan2(dx,dz);stepTime+=dt*11}
  // Keep the little companion nearby, without requiring player control.
  sprig.position.x+=(hero.position.x+1.5-sprig.position.x)*Math.min(1,dt*2);
  sprig.position.z+=(hero.position.z+.8-sprig.position.z)*Math.min(1,dt*2);
  for(const v of veggies){if(!v.visible)continue;if(!reduced)v.rotation.y+=dt*.25;if(Math.hypot(v.position.x-hero.position.x,v.position.z-hero.position.z)<1.05)collect(v)}
  munching=Math.max(0,munching-dt);celebration=Math.max(0,celebration-dt);
  hero.scale.y=1+(munching?Math.sin(time*25)*.09:walking&&!reduced?Math.abs(Math.sin(stepTime))*.055:0);
  if(celebration>0&&!reduced)hero.rotation.z=Math.sin(time*16)*.06;else hero.rotation.z=0;
 }
 refreshLevel();updateHud();
 return {update,state};
}
