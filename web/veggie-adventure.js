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
  // Distinct botanical silhouettes, not generic colored spheres with cartoon faces.
  const carrotSkin=material('#e87924'),carrotLines=material('#b85b1c'),broccoliStem=material('#91b65b'),broccoliFloret=material('#347e3b'),tomatoSkin=material('#d94332'),tomatoLeaf=material('#347a37'),podSkin=material('#6ca84c'),peaSkin=material('#89c75c');
  if(type==='Carrot'){
   // Broad shoulder at the crown, tapered point at the soil.
   const root=part(g,new THREE.ConeGeometry(.39,1.28,14,5),carrotSkin,0,.68,0);
   root.rotation.z=Math.PI;
   for(let i=0;i<7;i++){
    const y=.3+i*.12,r=.39*(1-Math.abs(y-.7)/.75);
    const mark=part(g,new THREE.CylinderGeometry(.012,.012,.08,5),carrotLines,Math.sin(i*2.4)*r,y,Math.cos(i*2.4)*r,.65,1,1);
    mark.rotation.z=.9;
   }
   for(let i=0;i<6;i++){
    const leaf=part(g,new THREE.SphereGeometry(1,10,8),i%2?green:dark,Math.sin(i*2.399)*.13,1.47,Math.cos(i*2.399)*.13,.065,.37,.085);
    leaf.rotation.z=Math.sin(i*2.399)*.48;leaf.rotation.x=Math.cos(i*2.399)*.48;
   }
  }
  if(type==='Broccoli'){
   part(g,new THREE.CylinderGeometry(.19,.25,.8,10),broccoliStem,0,.41,0);
   for(const [x,y,z,r] of [[0,1.14,0,.34],[-.32,1.04,0,.3],[.32,1.04,0,.3],[0,1.05,-.3,.29],[0,1.05,.3,.29],[-.23,1.26,-.2,.25],[.24,1.27,.2,.25]]){
    part(g,sphere,broccoliFloret,x,y,z,r,r*.85,r);
    for(let j=0;j<8;j++){const angle=j*Math.PI*.75;part(g,sphere,j%3?green:dark,x+Math.cos(angle)*r*.63,y+r*.53,z+Math.sin(angle)*r*.63,.105,.095,.105)}
   }
  }
  if(type==='Tomato'){
   part(g,new THREE.SphereGeometry(1,24,16),tomatoSkin,0,.57,0,.53,.47,.52);
   for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const leaf=part(g,sphere,tomatoLeaf,Math.cos(a)*.2,1.03,Math.sin(a)*.2,.24,.055,.075);leaf.rotation.y=-a;leaf.rotation.z=Math.cos(a)*.24;leaf.rotation.x=-Math.sin(a)*.24}
   part(g,new THREE.CylinderGeometry(.045,.065,.21,7),dark,0,1.12,0);
  }
  if(type==='Pea'){
   // A recognizable green pod with a seam and small rounded peas inside.
   const pod=part(g,new THREE.SphereGeometry(1,20,12),podSkin,0,.54,0,.91,.28,.3);
   pod.rotation.z=-.1;
   for(let i=-2;i<=2;i++)part(g,sphere,peaSkin,i*.28,.69,.15,.15,.155,.15);
   part(g,new THREE.CylinderGeometry(.025,.035,.3,7),dark,.91,.59,0).rotation.z=-.9;
  }
  if(type==='Corn'){
   const kernel=material('#ffd354');
   part(g,sphere,material('#e5a52d'),0,.76,0,.30,.67,.30);
   for(let row=0;row<5;row++)for(let col=0;col<7;col++){
    const angle=col*Math.PI*2/7;
    part(g,sphere,kernel,Math.cos(angle)*.25,.38+row*.18,Math.sin(angle)*.25,.095,.11,.095);
   }
   for(const side of [-1,1])part(g,sphere,green,side*.24,.45,0,.14,.48,.16).rotation.z=side*-.38;
  }
  if(type==='Cucumber'){
   part(g,sphere,material('#42854b'),0,.34,0,.83,.28,.3).rotation.z=.12;
   for(let i=0;i<7;i++)part(g,sphere,green,(i-3)*.2,.57+Math.cos(i)*.035,.07,.043,.038,.043);
   part(g,sphere,dark,.78,.43,0,.12,.08,.08);
  }
  if(type==='Eggplant'){
   part(g,sphere,material('#78428c'),0,.59,0,.46,.54,.43);
   part(g,sphere,material('#86519c'),.15,.86,0,.33,.43,.33).rotation.z=-.26;
   for(let i=0;i<4;i++){
    const angle=i*Math.PI/2;
    part(g,sphere,green,.23+Math.cos(angle)*.13,1.19,Math.sin(angle)*.13,.18,.06,.12).rotation.y=-angle;
   }
   part(g,sphere,dark,.23,1.29,0,.07,.16,.07).rotation.z=-.3;
  }
  if(type==='Bell Pepper'){
   const pepper=material('#e65033');
   for(let i=0;i<4;i++){
    const angle=i*Math.PI/2;
    part(g,sphere,pepper,Math.cos(angle)*.18,.54,Math.sin(angle)*.18,.3,.45,.3);
   }
   part(g,sphere,green,0,.99,0,.16,.10,.16);
   part(g,sphere,dark,.03,1.12,0,.07,.17,.07).rotation.z=-.26;
  }
  g.visible=false;
  g.userData={type,baseScale:g.scale.clone()};veggies.push(g);return g;
 }
 const types=['Carrot','Broccoli','Tomato','Pea','Corn','Cucumber','Eggplant','Bell Pepper'];
 let chosenTypes=[...types];let started=false;let finished=false;let completedGardens=0;let saveTimer=0;const SAVE_KEY='veggieverse-adventure-v1';const setup=$('#parent-setup');
 function saveAdventure(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({chosenTypes,level,levelMunched,completedGardens,found:state.collected,eaten:state.eaten,hero:[hero.position.x,hero.position.z],remaining:veggies.map((v,i)=>v.visible?i:null).filter(i=>i!==null),bag:[...bag]}))}catch{}}
 function selectedVeggies(){const selected=[...setup.querySelectorAll('input[type=checkbox]:checked')].map(el=>el.value).filter(v=>types.includes(v));if(!selected.length){$('#parent-error').textContent='Choose at least one veggie to begin.';setup.querySelector('input[type=checkbox]')?.focus({preventScroll:true});return []}$('#parent-error').textContent='';return selected;}
 function applyChoices(){clearTimeout(say.timer);status.classList.remove('notice-active');const selected=selectedVeggies();if(!selected.length)return;let previousChoice=null;try{previousChoice=JSON.parse(localStorage.getItem(SAVE_KEY)||'null')}catch{}if(previousChoice&&Array.isArray(previousChoice.chosenTypes)&&previousChoice.chosenTypes.join('|')!==selected.join('|'))window.dispatchEvent(new CustomEvent('veggie-discoveries-reset'));chosenTypes=selected;sprig.visible=chosenTypes.includes('Broccoli');demonstratedVeggies.clear();finished=false;completedGardens=0;stopMovement();hero.position.set(-1.7,0,1);clearTimeout(celebrationTimer);const celebrationBanner=$('#garden-celebration');if(celebrationBanner)celebrationBanner.hidden=true;window.dispatchEvent(new CustomEvent('veggie-world-reset'));level=0;levelMunched=0;bag.length=0;state.collected=0;state.eaten=0;counter.textContent='0';for(const v of veggies)v.visible=chosenTypes.includes(v.userData.type);started=true;setup.hidden=true;let resumed=false;try{const previous=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(previous&&Array.isArray(previous.chosenTypes)&&previous.chosenTypes.join('|')===chosenTypes.join('|')&&Number.isInteger(previous.level)&&previous.level>=0&&previous.level<chosenTypes.length){level=previous.level;levelMunched=Number.isFinite(Number(previous.levelMunched))?Math.max(0,Math.min(activeLevel().need-1,Math.floor(Number(previous.levelMunched)))):0;completedGardens=level;state.collected=Number.isFinite(Number(previous.found))?Math.max(0,Math.min(9999,Math.floor(Number(previous.found)))):0;state.eaten=Number.isFinite(Number(previous.eaten))?Math.max(0,Math.min(9999,Math.floor(Number(previous.eaten)))):0;if(Array.isArray(previous.remaining)){const remaining=new Set(previous.remaining.filter(i=>Number.isInteger(i)&&i>=0&&i<veggies.length));for(let i=0;i<veggies.length;i++)veggies[i].visible=chosenTypes.includes(veggies[i].userData.type)&&remaining.has(i)}if(Array.isArray(previous.bag)){bag.push(...previous.bag.filter(v=>typeof v==='string'&&chosenTypes.includes(v)).slice(0,veggies.length));counter.textContent=String(bag.length);munch.textContent=bag.length?'😋 Munch!':'🥕 Find veggies'}if(Array.isArray(previous.bag)&&bag.length===0){munch.disabled=true}if(Array.isArray(previous.hero)&&previous.hero.length===2){const px=Number(previous.hero[0]),pz=Number(previous.hero[1]);if(Number.isFinite(px))hero.position.x=Math.max(-8,Math.min(8,px));if(Number.isFinite(pz))hero.position.z=Math.max(-8,Math.min(8,pz))}resumed=true;for(let i=0;i<completedGardens;i++)window.dispatchEvent(new CustomEvent('veggie-garden-complete',{detail:{type:chosenTypes[i],restored:true}}))}}catch{}saveAdventure();$('#victory')?.setAttribute('hidden','');document.body.classList.add('playing');window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:true}}));refreshLevel();updateHud();ensureGoalAvailable();document.querySelector('#world')?.focus({preventScroll:true});say(resumed?'Welcome back!':'Tap a veggie!');try{localStorage.setItem('veggieverse-parent-choices',JSON.stringify(chosenTypes))}catch{}}
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!finished)saveAdventure()});
 window.addEventListener('pagehide',()=>{if(started&&!finished)saveAdventure()});
 $('#play-again')?.addEventListener('click',()=>{clearTimeout(say.timer);status.classList.remove('notice-active');try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem('veggieverse-discoveries-v1')}catch{}finished=false;stopMovement();$('#victory').hidden=true;setup.hidden=false;setup.querySelector('input[type=checkbox]')?.focus({preventScroll:true});document.body.classList.remove('playing');window.dispatchEvent(new CustomEvent('veggie-discoveries-reset'));window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:false}}))});
 const parentGate=$('#parent-gate'),gateHold=$('#parent-gate-hold'),gateProgress=$('#parent-gate-progress');let gateTimer=null,gateStart=0,gateFrame=null,wasPlayingBeforeGate=false;function stopGateHold(){if(gateTimer){clearTimeout(gateTimer);gateTimer=null}if(gateFrame){cancelAnimationFrame(gateFrame);gateFrame=null}gateHold?.classList.remove('holding');gateHold?.style.setProperty('--hold-progress','0%');if(gateProgress)gateProgress.textContent='Parent check ready'}function openParentSettings(){clearTimeout(say.timer);status.classList.remove('notice-active');stopGateHold();if(parentGate)parentGate.hidden=true;if(started)saveAdventure();started=false;setup.hidden=false;document.body.classList.remove('playing');window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:false}}));stopMovement();setup.querySelector('input[type=checkbox]')?.focus({preventScroll:true})}function beginGateHold(){if(!parentGate||parentGate.hidden||gateTimer)return;gateStart=performance.now();gateHold.classList.add('holding');const tick=()=>{const remaining=Math.max(0,3000-(performance.now()-gateStart));const message=remaining?'Keep holding… '+Math.ceil(remaining/1000)+' seconds':'Parent settings unlocked';if(gateProgress.textContent!==message)gateProgress.textContent=message;gateHold.style.setProperty('--hold-progress',String(Math.max(0,Math.min(100,(1-remaining/3000)*100)))+'%');if(remaining&&gateTimer)gateFrame=requestAnimationFrame(tick)};gateTimer=setTimeout(()=>{gateTimer=null;openParentSettings()},3000);tick()}gateHold?.addEventListener('pointerdown',e=>{e.preventDefault();gateHold.setPointerCapture?.(e.pointerId);beginGateHold()});['pointerup','pointercancel','lostpointercapture'].forEach(name=>gateHold?.addEventListener(name,stopGateHold));gateHold?.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!gateTimer)beginGateHold()}});gateHold?.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')stopGateHold()});gateHold?.addEventListener('blur',stopGateHold);window.addEventListener('blur',stopGateHold);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopGateHold()});parentGate?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();$('#parent-gate-cancel')?.click();return}if(e.key==='Tab'){const first=gateHold,last=$('#parent-gate-cancel');if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});$('#parent-gate-cancel')?.addEventListener('click',()=>{stopGateHold();parentGate.hidden=true;if(wasPlayingBeforeGate){started=true;document.body.classList.add('playing');window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:true}}));document.querySelector('#world')?.focus({preventScroll:true})}else $('#parent-settings')?.focus()});$('#parent-settings').addEventListener('click',()=>{status.classList.remove('notice-active');clearTimeout(say.timer);wasPlayingBeforeGate=started;if(started)saveAdventure();started=false;document.body.classList.remove('playing');window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:false}}));stopMovement();if(parentGate){parentGate.hidden=false;gateHold?.focus({preventScroll:true})}else openParentSettings()});
 try{const saved=JSON.parse(localStorage.getItem('veggieverse-parent-choices')||'null');if(Array.isArray(saved)&&saved.some(type=>types.includes(type))){for(const input of setup.querySelectorAll('input[type=checkbox]'))input.checked=saved.includes(input.value)}}catch{}

 const levels=[{name:'CARROT PATCH',type:'Carrot',need:2,color:'#f7cf9b',problem:'The sleepy flowers need sunshine!'},{name:'BROCCOLI GROVE',type:'Broccoli',need:3,color:'#b9e7a5',problem:'The little bridge has lost its sparkle!'},{name:'TOMATO TOWN',type:'Tomato',need:3,color:'#ffc0b4',problem:'The rainbow fountain needs color!'},{name:'PEA PARTY',type:'Pea',need:4,color:'#c7eeb6',problem:'The garden party needs its music!'},{name:'CORNFIELD',type:'Corn',need:2,color:'#f9e2a4'},{name:'CUCUMBER VINES',type:'Cucumber',need:2,color:'#c9edbd'},{name:'EGGPLANT HOLLOW',type:'Eggplant',need:2,color:'#dfcbea'},{name:'PEPPER PATCH',type:'Bell Pepper',need:2,color:'#ffd7ac'}];
 let level=0,levelMunched=0;const stageMat=new THREE.MeshStandardMaterial({color:levels[0].color,roughness:1});
 const gardenMarker=part(scene,new THREE.CylinderGeometry(1.25,1.25,.14,32),stageMat,0,.12,-2,1,1,1);gardenMarker.receiveShadow=true;
 function activeLevel(){return levels[types.indexOf(chosenTypes[level%chosenTypes.length])]}
 function refreshLevel(){const l=activeLevel();const journey=$('#garden-journey');journey.replaceChildren(...chosenTypes.map((type,i)=>{const marker=document.createElement('span');marker.className='garden-step'+(i<completedGardens?' done':i===level?' current':'');marker.textContent=i<completedGardens?'✓':veggieIcons[type];marker.setAttribute('aria-label',type+' garden '+(i<completedGardens?'complete':i===level?'current':'upcoming'));return marker}));$('#level-label').textContent=veggieIcons[l.type]+' LEVEL '+(level+1)+' · '+l.name;$('#level-goal').textContent='Munch '+l.need+' '+l.type.toLowerCase()+(l.need>1?(l.type==='Corn'?'':l.type==='Tomato'?'es':'s'):'')+'!';$('#level-count').textContent=levelMunched+' / '+l.need;$('#level-fill').style.width=(levelMunched/l.need*100)+'%';$('#level-fill').setAttribute('aria-valuenow',String(levelMunched));$('#level-fill').setAttribute('aria-valuemax',String(l.need));const progressTrack=$('.level-track');progressTrack?.setAttribute('aria-valuemax',String(l.need));progressTrack?.setAttribute('aria-valuenow',String(levelMunched));progressTrack?.setAttribute('aria-valuetext',levelMunched+' of '+l.need+' vegetables munched');stageMat.color.set(l.color);window.dispatchEvent(new CustomEvent('veggie-restoration',{detail:{progress:levelMunched/l.need,type:l.type}}));scene.background.set(l.color);scene.fog?.color.set(l.color)}
 function restock(){for(const v of veggies){v.visible=chosenTypes.includes(v.userData.type)}bag.length=0;counter.textContent='0';munch.textContent='🥕 Find veggies';updateHud()}function ensureGoalAvailable(){if(!started||finished)return;const type=activeLevel().type;const needed=Math.max(0,activeLevel().need-levelMunched);const available=bag.filter(item=>item===type).length+veggies.filter(v=>v.visible&&chosenTypes.includes(v.userData.type)&&v.userData.type===type).length;if(available>=needed)return;let restored=0;for(const v of veggies){if(v.userData.type===type&&!v.visible&&restored<needed-available){v.visible=true;restored++}}if(restored){say('🌱 More '+type.toLowerCase()+'s have sprouted!');saveAdventure()}}
 let celebrationTimer=null;function announceGardenRepair(type){const message=({Carrot:'🌼 The sleepy flowers are blooming!',Broccoli:'🌉 The woodland bridge is fixed!',Tomato:'⛲ The rainbow fountain is flowing!',Pea:'🎈 The garden party is glowing!'})[type]||'✨ You helped the garden!';const banner=$('#garden-celebration');if(!banner)return;clearTimeout(celebrationTimer);banner.textContent=message;banner.dataset.garden=type.toLowerCase();banner.hidden=false;celebrationTimer=setTimeout(()=>{banner.hidden=true},3300)}function advance(){announceGardenRepair(activeLevel().type);completedGardens++;celebration=2.5;window.dispatchEvent(new CustomEvent('veggie-garden-complete',{detail:{type:activeLevel().type}}));document.querySelector('.level-banner')?.classList.remove('level-unlock');void document.querySelector('.level-banner')?.offsetWidth;document.querySelector('.level-banner')?.classList.add('level-unlock');if(completedGardens>=chosenTypes.length){clearTimeout(say.timer);status.classList.remove('notice-active');clearTimeout(celebrationTimer);const finalBanner=$('#garden-celebration');if(finalBanner)finalBanner.hidden=true;try{localStorage.removeItem(SAVE_KEY)}catch{}finished=true;started=false;stopMovement();document.body.classList.remove('playing');window.dispatchEvent(new CustomEvent('veggie-play-state',{detail:{playing:false}}));$('#victory').hidden=false;$('#victory-title').textContent='You saved the Veggieverse!';$('#victory-title').setAttribute('tabindex','-1');$('#victory-title').focus({preventScroll:true});$('#victory-description').textContent='You helped '+completedGardens+' magical garden'+(completedGardens===1?'':'s')+' bloom. What a wonderful adventure!';say('🌈 All gardens are glowing!');return}level++;levelMunched=0;restock();refreshLevel();say('🌟 You fixed it! Welcome to '+activeLevel().name+'!');stopMovement();hero.position.set(-1.7,0,1);ensureGoalAvailable();saveAdventure()}

 for(let i=0;i<16;i++){const a=i*2.39996,r=3.2+(i%4)*1.35;makeVeggie(types[i%4],Math.cos(a)*r,Math.sin(a)*r)}
 // Keep the original sixteen slots stable for saved gardens.
 for(let i=16;i<32;i++){const a=i*2.39996,r=3.55+(i%4)*1.35;makeVeggie(types[4+i%4],Math.cos(a)*r,Math.sin(a)*r)}
 const state={collected:0,eaten:0};
 const move={x:0,z:0};
 const keys=new Set();
 const joystick=$('#joystick'),nub=$('#joystick-nub');
 let pointerId=null;
 function setStick(clientX,clientY){const b=joystick.getBoundingClientRect(),dx=clientX-(b.left+b.width/2),dy=clientY-(b.top+b.height/2),length=Math.hypot(dx,dy)||1,limit=b.width*.33,amount=Math.min(length,limit);move.x=dx/length*amount/limit;move.z=dy/length*amount/limit;nub.style.transform='translate('+move.x*limit+'px,'+move.z*limit+'px)'}
 function release(){move.x=move.z=0;pointerId=null;nub.style.transform='translate(0,0)'}function stopMovement(){release();keys.clear();target=null;if(typeof destinationMarker!=='undefined')destinationMarker.visible=false}
 joystick.addEventListener('pointerdown',e=>{if(!started||finished||pointerId!==null)return;e.preventDefault();pointerId=e.pointerId;try{joystick.setPointerCapture(e.pointerId)}catch{pointerId=null;return}setStick(e.clientX,e.clientY)});
 joystick.addEventListener('pointermove',e=>{if(started&&!finished&&pointerId===e.pointerId)setStick(e.clientX,e.clientY)});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(event,e=>{if(e.pointerId===pointerId)release()});
 window.addEventListener('blur',()=>{stopMovement();if(started)saveAdventure()});document.addEventListener('visibilitychange',()=>{if(document.hidden){stopMovement();if(started)saveAdventure()}});
 window.addEventListener('keydown',e=>{const gameplayFocus=e.target===document.body||e.target===canvas;if(!started||finished||!gameplayFocus)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','Space'].includes(e.code)){e.preventDefault();if(e.code==='Space'){if(!e.repeat)munch.click()}else keys.add(e.code)}});
 window.addEventListener('keyup',e=>keys.delete(e.code));
 canvas.addEventListener('blur',stopMovement);
 const munch=$('#munch'),counter=$('#veggie-count'),status=$('#play-status');
 function dismissNotice(){
  clearTimeout(say.timer);
  status.classList.remove('notice-active');
 }
 const say=text=>{status.textContent=text;status.classList.add('notice-active');clearTimeout(say.timer);say.timer=setTimeout(()=>{status.classList.remove('notice-active');if(started&&!finished)status.textContent='Explore and find yummy veggies!'},2600)};
 function collect(v){if(!started||finished||!v||!v.visible||!chosenTypes.includes(v.userData.type))return;v.visible=false;window.dispatchEvent(new CustomEvent('veggie-collected',{detail:{type:v.userData.type,goal:v.userData.type===activeLevel().type}}));bag.push(v.userData.type);state.collected++;counter.textContent=String(bag.length);munch.disabled=false;munch.textContent='😋 Munch!';say(v.userData.type===activeLevel().type?'Great! Munch this '+v.userData.type.toLowerCase()+' to grow!':'A '+v.userData.type.toLowerCase()+'! Look for '+activeLevel().type.toLowerCase()+'s too!');celebration=1.2;updateHud();saveAdventure()}
 function updateHud(){munch.disabled=bag.length===0;const preferred=bag.includes(activeLevel().type);munch.textContent=bag.length?(preferred?'😋 Munch '+activeLevel().type+'!':'😋 Munch!'):'🥕 Find veggies';$('#veggie-found').textContent=String(state.collected);$('#veggie-eaten').textContent=String(state.eaten)}
 const demo=$('#veggie-demo');
 const demoPhoto=$('#veggie-demo-photo');
 const demoSnack=$('#veggie-demo-snack');
 const demonstratedVeggies=new Set();
 const veggieIcons={Carrot:'🥕',Broccoli:'🥦',Tomato:'🍅',Pea:'🫛',Corn:'🌽',Cucumber:'🥒',Eggplant:'🍆','Bell Pepper':'🫑'};
 let photoUrl='';
 window.addEventListener('veggie-start-request',event=>{
  photoUrl=event.detail;
  demoPhoto.removeAttribute('src');
  applyChoices();
 });
 function replayDemo(){
  demoSnack.classList.remove('demo-bite');
  void demoSnack.offsetWidth;
  demoSnack.classList.add('demo-bite');
 }
 $('#veggie-demo-repeat').addEventListener('click',replayDemo);
 $('#veggie-demo-continue').addEventListener('click',()=>{
  if(!demo.open)return;
  demonstratedVeggies.add(activeLevel().type);
  demo.close();
  munchVegetable();
  if(started&&!finished)(munch.disabled?canvas:munch).focus({preventScroll:true});
 });
 munch.addEventListener('click',()=>{
  if(!started||finished||!bag.length||demo.open)return;
  const type=activeLevel().type;
  if(!photoUrl||!bag.includes(type)||demonstratedVeggies.has(type)){
   munchVegetable();
   return;
  }
  stopMovement();
  dismissNotice();
  demoPhoto.src=photoUrl;
  demoSnack.textContent=veggieIcons[type];
  const veggie=type.toLowerCase();
  $('#veggie-demo-title').textContent='Watch Sprig try '+(type==='Corn'?'some ':'a ')+veggie+'!';
  $('#veggie-demo-note').textContent='If you want, try a bite with your grown-up. You can keep playing either way.';
  demo.showModal();
  replayDemo();
 });
 function munchVegetable(){if(!started||finished||!bag.length)return;const desired=activeLevel().type;const matchingIndex=bag.indexOf(desired);const type=matchingIndex>=0?bag.splice(matchingIndex,1)[0]:bag.shift();if(!chosenTypes.includes(type)){updateHud();saveAdventure();return}state.eaten++;window.dispatchEvent(new CustomEvent('veggie-munched',{detail:{type,correct:type===activeLevel().type}}));munching=.75;snack.material=({Carrot:orange,Broccoli:green,Tomato:red,Pea:green})[type]||orange;snack.visible=true;celebration=1.4;counter.textContent=String(bag.length);munch.textContent=bag.length?'😋 Munch!':'🥕 Find veggies';if(type===activeLevel().type){levelMunched++;refreshLevel();if(levelMunched>=activeLevel().need){advance()}else say('✨ The garden is waking up! '+(activeLevel().need-levelMunched)+' more '+activeLevel().type.toLowerCase()+' to go!')}else say('Yum! Find a '+activeLevel().type.toLowerCase()+' to unlock the next garden!');updateHud();if(!finished){ensureGoalAvailable();saveAdventure()}}
 // Tap a veggie directly to walk toward it, or tap the ground to explore.
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 canvas.addEventListener('pointerdown',e=>{if(!started||finished||!e.isPrimary||e.button>0||pointerId!==null)return;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);const cam=window.__veggieCamera;if(!cam||!started||finished)return;raycaster.setFromCamera(pointer,cam);const veggieHits=raycaster.intersectObjects(veggies.filter(v=>v.visible&&chosenTypes.includes(v.userData.type)),true);if(veggieHits.length){let veggie=veggieHits[0].object;while(veggie.parent&&!veggies.includes(veggie))veggie=veggie.parent;if(veggies.includes(veggie)){keys.clear();release();target=new THREE.Vector3(veggie.position.x,0,veggie.position.z);say('Let’s find that '+veggie.userData.type.toLowerCase()+'!');return}}const ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();if(raycaster.ray.intersectPlane(ground,hit)){keys.clear();release();target=new THREE.Vector3(Math.max(-8,Math.min(8,hit.x)),0,Math.max(-8,Math.min(8,hit.z)));dismissNotice()}})
 const snack=part(hero,sphere,orange,0,1.65,.78,1,1,1);snack.visible=false;
 const shadow=part(hero,new THREE.CircleGeometry(.6,24),new THREE.MeshBasicMaterial({color:'#326c43',transparent:true,opacity:.14,depthWrite:false}),0,.04,0,1,1,1);shadow.rotation.x=-Math.PI/2;
 // A gentle destination marker shows little explorers where their tap will take them.
 const destinationMarker=new THREE.Mesh(new THREE.RingGeometry(.3,.47,32),new THREE.MeshBasicMaterial({color:'#fff3b3',transparent:true,opacity:.8,depthWrite:false,side:THREE.DoubleSide}));destinationMarker.rotation.x=-Math.PI/2;destinationMarker.position.y=.08;destinationMarker.visible=false;scene.add(destinationMarker);
 function update(dt,time,reduced){if(!started||finished)return;
  let dx=move.x,dz=move.z;
  if(keys.has('ArrowLeft')||keys.has('KeyA'))dx-=1;if(keys.has('ArrowRight')||keys.has('KeyD'))dx+=1;
  if(keys.has('ArrowUp')||keys.has('KeyW'))dz-=1;if(keys.has('ArrowDown')||keys.has('KeyS'))dz+=1;
  if(dx||dz){target=null;destinationMarker.visible=false}destinationMarker.visible=Boolean(target);if(target){destinationMarker.position.x=target.x;destinationMarker.position.z=target.z;destinationMarker.scale.setScalar(reduced?1:1+Math.sin(time*4)*.12)}
  if(!dx&&!dz&&target){dx=target.x-hero.position.x;dz=target.z-hero.position.z;if(Math.hypot(dx,dz)<.2){target=null;destinationMarker.visible=false;dx=dz=0}}
  const length=Math.hypot(dx,dz);walking=length>.03;
  if(walking){const speed=3.5;const travel=Math.min(speed*Math.min(dt,.05),target?length:Infinity);hero.position.x+=dx/length*travel;hero.position.z+=dz/length*travel;hero.position.x=Math.max(-8,Math.min(8,hero.position.x));hero.position.z=Math.max(-8,Math.min(8,hero.position.z));hero.rotation.y=Math.atan2(dx,dz);stepTime+=dt*11;saveTimer+=dt;if(saveTimer>2){saveTimer=0;saveAdventure()}}
  // Keep the little companion nearby, without requiring player control.
  sprig.position.x+=(hero.position.x+1.5-sprig.position.x)*Math.min(1,dt*2);
  sprig.position.z+=(hero.position.z+.8-sprig.position.z)*Math.min(1,dt*2);
  for(const v of veggies){if(!v.visible||!chosenTypes.includes(v.userData.type))continue;const isGoal=v.userData.type===activeLevel().type;v.scale.copy(v.userData.baseScale).multiplyScalar(isGoal&&!reduced?1+Math.sin(time*3+v.position.x)*.075:1);if(!reduced){v.rotation.y+=dt*.25;v.position.y=Math.sin(time*2+v.position.x)*.075}else v.position.y=0;if(Math.hypot(v.position.x-hero.position.x,v.position.z-hero.position.z)<1.35)collect(v)}
  munching=Math.max(0,munching-dt);snack.visible=munching>0;snack.scale.setScalar(Math.max(.01,munching/.75*.24));celebration=Math.max(0,celebration-dt);
  hero.scale.y=1+(munching?Math.sin(time*25)*.09:walking&&!reduced?Math.abs(Math.sin(stepTime))*.055:0);
  if(celebration>0&&!reduced)hero.rotation.z=Math.sin(time*16)*.06;else hero.rotation.z=0;
 }
 refreshLevel();updateHud();
 return {update,state};
}
