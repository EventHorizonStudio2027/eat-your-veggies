const fs=require('node:fs');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const html=read('index.html'),main=read('web/main.js'),sw=read('sw.js');
const assets=['index.html','web/styles.css','web/main.js','web/explorer-photo.js','web/storybook-world.js','web/veggie-adventure.js','web/discovery-world.js','web/brand/app-icon-192.png','apple-touch-icon.png','web/brand/eat-your-veggies-app-icon.png','web/brand/favicon.png','web/brand/header.webp','web/brand/mascot.webp','web/brand/title.webp','manifest.webmanifest','sw.js'];
for(const file of assets)assert.ok(fs.statSync(file).size>0,'Missing or empty: '+file);
assert.match(html,/<canvas[^>]+id=["']world["']/i,'3D canvas must exist');
assert.match(html,/type=["']module["']\s+src=["']\.\/web\/main\.js\?v=20["']/i,'Main module must load');
assert.match(main,/new THREE\.WebGLRenderer/,'3D renderer must initialize');
assert.match(sw,/addEventListener\(['"]install['"]/,'Offline install handler missing');
assert.match(sw,/addEventListener\(['"]fetch['"]/,'Offline fetch handler missing');
for(const file of assets.filter(x=>x.startsWith('web/')||x==='manifest.webmanifest'))assert.ok(html.includes(file)||main.includes(file)||sw.includes(file),'Unreferenced asset: '+file);
const manifest=JSON.parse(read('manifest.webmanifest'));
assert.equal(manifest.start_url,'./','Manifest must use project-relative start URL');
console.log('PASS: 3D entry, required assets, service worker and relative manifest paths');

const models=read('web/veggie-adventure.js'),styles=read('web/styles.css');
for(const vegetable of ['Carrot','Broccoli','Tomato','Pea','Corn','Cucumber','Eggplant','Bell Pepper'])assert.ok(models.includes("type==='"+vegetable+"'"),'Missing 3D model for '+vegetable);
assert.match(styles,/Gameplay-first HUD/,'Compact gameplay HUD styles missing');
assert.match(models,/broccoliFloret/,'Broccoli crown geometry missing');
assert.match(models,/tomatoLeaf/,'Tomato calyx geometry missing');
console.log('PASS: all eight veggie types have dedicated 3D geometry and gameplay HUD override exists');

assert.match(models,/addEventListener\('pagehide'/,'Adventure must save on page exit');
assert.match(models,/visibilitychange/,'Adventure must save when app is backgrounded');
assert.match(models,/Math\.min\(9999/,'Restored counters must be bounded');
assert.match(styles,/max-height:600px/,'Short landscape screens need a compact HUD');
console.log('PASS: exit persistence, bounded restore and small-screen HUD safeguards');

assert.match(models,/if\(!started\|\|finished\|\|pointerId!==null\)return;e\.preventDefault\(\);pointerId=e\.pointerId/,'Joystick must ignore inactive game state');
assert.match(models,/e\.pointerId===pointerId\)release\(\)/,'Only active joystick pointer may release movement');
assert.match(models,/if\(started&&!finished\)status\.textContent=/,'Delayed gameplay prompts must respect play state');
console.log('PASS: joystick ownership and inactive-state feedback guards');

assert.match(models,/pointerId!==null\)return/,'Second finger must not steal joystick');
assert.match(models,/target=null;destinationMarker\.visible=false;dx=dz=0/,'Destination marker must disappear on arrival');
console.log('PASS: multi-touch ownership and arrival marker cleanup guards');

assert.match(styles,/Gameplay unobstructed:/,'Nonblocking notification layout missing');
assert.match(styles,/\.playing \.play-status\{top:auto/,'Gameplay status must leave the central screen');
assert.match(styles,/\.garden-celebration:not\(\[hidden\]\)/,'Garden celebration must be compact and edge-aligned');
console.log('PASS: nonblocking gameplay notification layout guards');

assert.match(sw,/veggieverse-v20/,'Updated offline cache version required');
assert.match(models,/status\.classList\.add\('notice-active'\)/,'Feedback must explicitly activate');
assert.match(models,/status\.classList\.remove\('notice-active'\)/,'Feedback must dismiss');
assert.match(styles,/\.playing \.play-status:not\(\.notice-active\)/,'Idle feedback must not obstruct game');
console.log('PASS: v20 cache and auto-dismissing feedback checks');

assert.match(models,/if\(!started\|\|finished\|\|!e\.isPrimary\|\|e\.button>0\|\|pointerId!==null\)return/,'Secondary touches and auxiliary clicks must not issue movement commands');
assert.match(models,/if\(!rect\.width\|\|!rect\.height\)return/,'Zero-sized canvas must not create invalid raycasts');
assert.match(models,/function applyChoices\(\)\{clearTimeout\(say\.timer\)/,'Starting play must clear old notices');
assert.match(styles,/reserve the playable center/,'Mobile center-clearing HUD refinement missing');
console.log('PASS: primary pointer, canvas bounds, notice reset and mobile HUD guards');

assert.match(models,/e\.button>0\|\|pointerId!==null\)return/,'Auxiliary mouse clicks must not navigate');
assert.match(models,/try\{joystick\.setPointerCapture\(e\.pointerId\)\}catch/,'Pointer capture failures must not strand joystick input');
assert.match(styles,/Correct conflicting top\/bottom anchors/,'Mobile score anchors must be explicitly corrected');
assert.match(styles,/\.playing \.play-score\{top:auto;bottom:/,'Mobile score must use bottom positioning');
console.log('PASS: auxiliary-click safety, pointer capture recovery, and score positioning');

assert.match(models,/pointerId!==null\)return;const rect=canvas/,'Canvas tap must not override an active joystick gesture');
assert.match(styles,/\.playing \.play-score\{display:none\}/,'Compact phone layout must not obscure Munch controls');
console.log('PASS: joystick/canvas gesture isolation and compact-phone controls');

assert.doesNotMatch(models, /say\('Here we go!'\)/, 'Ground movement must not open a notice');
assert.match(models, /intersectPlane\(ground,hit\).*dismissNotice\(\)/, 'Ground movement must dismiss active notices');

assert.match(html, /<link rel="apple-touch-icon" sizes="180x180" href="\.\/apple-touch-icon\.png">/);
const appleIcon = fs.readFileSync('apple-touch-icon.png');
assert.equal(appleIcon.subarray(12, 16).toString(), 'IHDR');
assert.deepEqual([appleIcon.readUInt32BE(16), appleIcon.readUInt32BE(20)], [180, 180]);
assert.equal(manifest.display, 'standalone');

assert.equal([...html.matchAll(/type="checkbox" value="[^"]+"/g)].length,8);
const nodes=new Map();
function node(id){
 if(!nodes.has(id))nodes.set(id,{
  handlers:{}, files:[], hidden:true,
  addEventListener(name,callback){this.handlers[name]=callback},
  showModal(){this.open=true}, close(){this.open=false}, removeAttribute(){},
  classList:{contains:()=>gameReady}, querySelector:()=>({focus(){}})
 });
 return nodes.get(id);
}
let gameReady=false;
const starts=[];
const gameEvents={};
require('node:vm').runInNewContext(read('web/explorer-photo.js'),{
 document:{querySelector:node},
 window:{dispatchEvent:event=>starts.push(event),addEventListener:(name,fn)=>{gameEvents[name]=fn}},
 CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}}
});
node('#start-adventure').handlers.click();
assert.equal(node('#explorer-photo').open,true,'Photo prompt must open even before WebGL initializes');
node('#explorer-photo-skip').handlers.click();
assert.equal(starts.length,0,'The game cannot start before the renderer is ready');
assert.equal(node('#explorer-game-status').hidden,false);
node('#retry').hidden=false;
gameEvents['veggie-load-stalled']();
assert.equal(node('#explorer-game-retry').hidden,false);
gameReady=true;
gameEvents['veggie-game-ready']();
assert.equal(node('#explorer-photo').open,false);
assert.equal(starts[0].type,'veggie-start-request');
assert.equal(starts[0].detail,'');
console.log('PASS: photo prompt opens independently and skip starts the ready game');
