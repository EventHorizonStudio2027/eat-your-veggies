import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { decorateForest } from './storybook-world.js';
import { createVeggieAdventure } from './veggie-adventure.js';
import { createDiscoveryWorld } from './discovery-world.js';
const canvas=document.querySelector('#world'),scene=new THREE.Scene();scene.background=new THREE.Color('#b9e6d2');scene.fog=new THREE.FogExp2('#b9e6d2',.016);
const camera=new THREE.PerspectiveCamera(48,1,.1,150);camera.position.set(0,7,19);camera.lookAt(0,2,0);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=window.innerWidth>780;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;
scene.add(new THREE.HemisphereLight(0xf0ffe4,0x365b48,2.2));const sun=new THREE.DirectionalLight(0xffe5aa,3.2);sun.position.set(-8,16,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-24;sun.shadow.camera.right=24;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;scene.add(sun);
const mat=(color,roughness=1)=>new THREE.MeshStandardMaterial({color,roughness});const green=mat('#78bc79'),dark=mat('#4f9c70'),light=mat('#b0dc93'),bark=mat('#b38865'),cream=mat('#ffe2b3'),gold=new THREE.MeshStandardMaterial({color:'#ffe59a',emissive:'#f7b841',emissiveIntensity:2,roughness:.2});
const sphere=new THREE.SphereGeometry(1,16,12),cylinder=new THREE.CylinderGeometry(1,1,1,9);
function mesh(geo,material,x,y,z,sx=1,sy=1,sz=1,parent=scene){const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
mesh(new THREE.CylinderGeometry(32,32,1.2,48),green,0,-.65,0);mesh(new THREE.CylinderGeometry(9,9.4,.25,48),light,0,.02,0);
const rng=(i)=>{const n=Math.sin(i*127.1+23.4)*43758.5453;return n-Math.floor(n)};
for(let i=0;i<24;i++){const a=i*Math.PI*2/24,r=10+rng(i)*9,x=Math.cos(a)*r,z=Math.sin(a)*r;mesh(cylinder,bark,x,2,z,.42,4,.42);const crown=mesh(sphere,i%3?dark:green,x,5.3,z,2.1+rng(i+4)*.6,2.3,2.1);mesh(sphere,light,x-1,5.6,z+.6,.8,.85,.8);if(i%2===0)mesh(sphere,dark,x+1,6,z-.4,1.1,1.1,1.1)}
const storybook=decorateForest(THREE,scene);
const hero=new THREE.Group();scene.add(hero);hero.position.set(-1.7,0,1);mesh(sphere,cream,0,1.1,0,.55,.78,.46,hero);mesh(sphere,cream,0,2.05,0,.56,.6,.52,hero);mesh(sphere,mat('#423d32'),-.2,2.12,.48,.055,.07,.05,hero);mesh(sphere,mat('#423d32'),.2,2.12,.48,.055,.07,.05,hero);mesh(sphere,mat('#e5a477'),0,1.91,.53,.13,.08,.06,hero);mesh(sphere,mat('#b6d69d'),0,2.63,0,.59,.2,.54,hero);
// Oversized storybook eyes, rosy cheeks and a little leaf-shaped hat.
for(const x of [-.23,.23]){mesh(sphere,mat('#fffaf2'),x,2.14,.46,.13,.17,.075,hero);mesh(sphere,mat('#333d36'),x,2.14,.53,.067,.095,.055,hero);mesh(sphere,mat('#ffffff'),x-.022,2.19,.57,.022,.029,.016,hero);mesh(sphere,mat('#f4b2a0'),x*1.65,1.93,.42,.15,.085,.06,hero)}
mesh(sphere,mat('#8cbe76'),-.27,2.77,0,.33,.13,.18,hero).rotation.z=.35;
mesh(sphere,mat('#8cbe76'),.25,2.78,0,.33,.13,.18,hero).rotation.z=-.35;
for(const x of [-.3,.3])mesh(sphere,mat('#f4b68b'),x,.32,.1,.26,.22,.34,hero);
// Expressive little sleeves and waving hands, with an easy-to-read walking silhouette.
const heroArms=[];for(const side of [-1,1]){const arm=new THREE.Group();arm.position.set(side*.52,1.5,0);hero.add(arm);mesh(sphere,mat('#a4d8a0'),side*.14,-.22,0,.22,.35,.25,arm);mesh(sphere,cream,side*.18,-.52,.02,.19,.19,.19,arm);heroArms.push(arm)}
const sprig=new THREE.Group();scene.add(sprig);sprig.position.set(1.8,.15,1.1);mesh(sphere,light,0,.9,0,.53,.7,.5,sprig);for(let i=-1;i<=1;i++)mesh(sphere,i===0?green:dark,i*.49,1.55+(i===0?.28:0),0,.63,.58,.62,sprig);for(const x of [-.19,.19])mesh(sphere,mat('#253b2c'),x,1,.46,.065,.09,.06,sprig);mesh(sphere,mat('#e8a7a0'),0,.78,.49,.17,.075,.06,sprig);
// Give Sprig a readable friendly face and rounded little feet.
for(const x of [-.2,.2]){mesh(sphere,mat('#fffdf4'),x,1.06,.46,.14,.16,.07,sprig);mesh(sphere,mat('#263e32'),x,1.05,.52,.075,.09,.04,sprig);mesh(sphere,mat('#ffffff'),x-.02,1.1,.55,.023,.028,.014,sprig);mesh(sphere,mat('#f4b3ad'),x*1.75,.83,.42,.12,.07,.05,sprig);mesh(sphere,dark,x,.24,.08,.25,.19,.32,sprig)}
for(const x of [-.55,.55])mesh(sphere,light,x,.86,0,.25,.16,.2,sprig);
const adventure=createVeggieAdventure(THREE,scene,hero,sprig,canvas);
const discoveries=createDiscoveryWorld(THREE,scene,hero,(message)=>{const status=document.querySelector('#play-status');if(status)status.textContent=message});window.__veggieCamera=camera;window.addEventListener('veggie-restoration',e=>discoveries.setStage(e.detail.type,e.detail.progress));window.addEventListener('veggie-garden-complete',e=>{discoveries.finishStage(e.detail.type);if(!reducedMotion.matches)discoveries.celebrate()});
const wonders=[];for(let i=0;i<8;i++){const a=i*Math.PI*2/8+.25,r=3.8+(i%3)*.8;const w=new THREE.Group();w.position.set(Math.cos(a)*r,1.7+(i%3)*.3,Math.sin(a)*r);const orb=mesh(sphere,gold,0,0,0,.33,.33,.33,w);const halo=mesh(sphere,new THREE.MeshBasicMaterial({color:'#fff5bb',transparent:true,opacity:.13,depthWrite:false}),0,0,0,.7,.7,.7,w);for(let j=0;j<4;j++){const angle=j*Math.PI/2;mesh(sphere,mat('#fff4ca'),Math.cos(angle)*.53,Math.sin(angle)*.53,0,.085,.085,.085,w)}w.userData={wonder:i,baseY:w.position.y};scene.add(w);wonders.push(w)}
const steps=[{speaker:'SPRIG SAYS',text:'Welcome, Little Explorer! Our forest is waiting for its sparkle. Tap a golden light to help us!'},{speaker:'SPRIG SAYS',text:'Every little light brings joy to the forest. Look around and explore with me!'},{speaker:'A GENTLE DISCOVERY',text:'Broccoli grows in little green trees! You can look, imagine, or simply keep exploring. No tasting needed.'},{speaker:'SPRIG SAYS',text:'You made our forest feel magical. There are so many more adventures waiting for us!'}];
const STORAGE_KEY='eyv.broccoli-forest.v1';
function readSave(){try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(!data||data.version!==1||!Array.isArray(data.lights))return null;return {step:Number.isInteger(data.step)?Math.max(0,Math.min(3,data.step)):0,lights:data.lights.filter(n=>Number.isInteger(n)&&n>=0&&n<8)};}catch{return null}}
function saveProgress(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,step,lights:wonders.filter(w=>!w.visible).map(w=>w.userData.wonder)}));}catch{/* Storage can be unavailable in private browsing. */}}
const saved=readSave();if(saved)for(const i of new Set(saved.lights))wonders[i].visible=false;
let step=saved?.step??0,collected=wonders.filter(w=>!w.visible).length,celebrateUntil=0,soundOn=false,audioCtx;
const $=s=>document.querySelector(s),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.remove('show'),1700)}
function chime(){if(!soundOn)return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.setValueAtTime(620,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(930,audioCtx.currentTime+.18);g.gain.setValueAtTime(.035,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.32);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.33)}catch{}}
function speakStory(force=false){
  if((!soundOn&&!force)||!('speechSynthesis' in window))return;
  try{
    window.speechSynthesis.cancel();
    const voice=new SpeechSynthesisUtterance(steps[step].text);
    voice.lang='en-US';voice.rate=.86;voice.pitch=1.12;voice.volume=.9;
    window.speechSynthesis.speak(voice);
  }catch{/* Narration is optional; text always remains available. */}
}
const bursts=[];
const burstMaterials=['#fff6b8','#ffd18f','#f8a9b8','#c8f2ac'].map(color=>mat(color));
function sparkleBurst(w){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  for(let i=0;i<12;i++){
    const a=i*Math.PI*2/12;
    const particle=mesh(sphere,burstMaterials[i%burstMaterials.length],w.position.x,w.position.y,w.position.z,.11,.11,.11);
    particle.castShadow=false;
    bursts.push({particle,velocity:new THREE.Vector3(Math.cos(a)*(.7+i%3*.2),.8+(i%4)*.22,Math.sin(a)*(.7+i%3*.2)),life:0});
  }
}
function collect(w){if(!w||!w.visible)return;sparkleBurst(w);w.visible=false;collected++;saveProgress();celebrateUntil=performance.now()+1200;$('#count').textContent=collected+' / 8';$('#progress').style.width=(collected/8*100)+'%';showToast(collected===8?'The forest is glowing again! ✦':'Wonderful discovery! ✦');chime();if(collected===8){$('#find').textContent='♥ Forest complete!';document.querySelector('.quest')?.classList.add('complete');document.querySelector('.companion')?.classList.add('happy')}}
// Legacy sparkle quest is intentionally inactive during the toddler roaming adventure.

$('#find').addEventListener('click',()=>{const next=wonders.find(w=>w.visible);if(next)collect(next);else showToast('All eight lights discovered! ✦')});$('#next').addEventListener('click',()=>{if(step<steps.length-1)step++;else{step=0;showToast('Adventure starts again! ✦')}saveProgress();renderStory();speakStory()});function renderStory(){const s=steps[step];$('#speaker').textContent=s.speaker;$('#narration').textContent=s.text;$('#step').textContent=String(step+1).padStart(2,'0')+' / 04';$('#next').innerHTML=step===3?'Again! <span>↺</span>':step===0?`Let's go! <span>➜</span>`:'Next! <span>➜</span>'}let restartArmedUntil=0;
$('#restart').addEventListener('click',()=>{
  const now=performance.now();
  if(now>restartArmedUntil){restartArmedUntil=now+5000;showToast('Tap restart again to start over');return}
  restartArmedUntil=0;try{localStorage.removeItem('veggieverse-adventure-v1');localStorage.removeItem(STORAGE_KEY)}catch{}location.reload();
});
$('#read').addEventListener('click',()=>{if(!('speechSynthesis' in window)){showToast('Read aloud is not available here');return} speakStory(true)});
$('#sound').addEventListener('click',()=>{soundOn=!soundOn;$('#sound').setAttribute('aria-pressed',String(soundOn));$('#sound').setAttribute('aria-label',soundOn?'Turn sound off':'Turn sound on');$('#sound').textContent=soundOn?'♫':'♪';if(soundOn){chime();speakStory()}else if('speechSynthesis' in window)window.speechSynthesis.cancel()});
$('#count').textContent=collected+' / 8';$('#progress').style.width=(collected/8*100)+'%';if(collected===8){$('#find').textContent='♥ Forest complete!';document.querySelector('.quest')?.classList.add('complete');document.querySelector('.companion')?.classList.add('happy')}renderStory();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function resize(){const w=innerWidth,h=innerHeight;camera.aspect=w/h;camera.fov=w<700?57:48;camera.position.set(0,w<700?7.2:6.5,w<700?20:16.5);camera.lookAt(0,2,0);camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,w<700?1.35:2));renderer.shadowMap.enabled=w>780;renderer.setSize(w,h,false)}addEventListener('resize',resize);resize();const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;adventure.update(dt,t,reducedMotion.matches);discoveries.update(dt,t,reducedMotion.matches);storybook.update(t,reducedMotion.matches);const follow=new THREE.Vector3(hero.position.x,hero.position.y+13,hero.position.z+16);camera.position.lerp(follow,Math.min(1,dt*3));camera.lookAt(hero.position.x,0.7,hero.position.z);for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.life+=dt;b.particle.position.addScaledVector(b.velocity,dt);b.velocity.y-=dt*1.7;b.particle.scale.setScalar(Math.max(.001,.11*(1-b.life/1.1)));if(b.life>1.1){scene.remove(b.particle);bursts.splice(i,1)}}for(const w of wonders){w.position.y=w.userData.baseY+(reducedMotion.matches?0:Math.sin(t*1.6+w.userData.wonder)*.17);w.rotation.y=reducedMotion.matches?0:t*.5}sprig.position.y=.15+(reducedMotion.matches?0:Math.sin(t*2.2)*.14+(performance.now()<celebrateUntil?Math.abs(Math.sin(t*15))*.38:0));sprig.rotation.y=reducedMotion.matches?0:Math.sin(t*.7)*.15;for(let i=0;i<heroArms.length;i++){heroArms[i].rotation.x=reducedMotion.matches?0:Math.sin(t*8+i*Math.PI)*.16;heroArms[i].rotation.z=reducedMotion.matches?0:Math.sin(t*2+i*Math.PI)*.07}hero.position.y=reducedMotion.matches?0:Math.sin(t*1.2)*.025;renderer.render(scene,camera)}animate();document.querySelector('#loading')?.classList.add('hidden');
