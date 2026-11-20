/* Cache the game shell and any successfully fetched 3D engine modules.
   First visit still needs internet; subsequent visits may work offline. */
const CACHE='veggieverse-v8';
const ENGINE='https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const SHELL=['./','./index.html','./web/styles.css','./web/main.js','./web/storybook-world.js','./web/veggie-adventure.js','./web/discovery-world.js','./web/icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{await cache.addAll(SHELL);try{await cache.add(ENGINE)}catch(error){console.warn('3D engine offline prefetch unavailable',error)}}).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.protocol!=='https:'&&url.protocol!=='http:')return;
  // Don't cache arbitrary websites; only our app, the Three.js module and font assets.
  if(url.origin!==self.location.origin&&!['cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname))return;
  event.respondWith(caches.match(event.request).then(cached=>{
    const request=fetch(event.request).then(response=>{
      if(response.ok||response.type==='opaque'){
        const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
      }
      // Preserve a previously working game if a deploy temporarily serves 404/500.
      if(!response.ok&&response.type!=='opaque'&&cached)return cached;
      return response;
    }).catch(()=>cached||Response.error());
    // Navigation and game code prefer fresh responses, but a slow connection must not hang an installed game.
    if(url.origin!==self.location.origin)return cached||request;
    if(!cached)return request;
    return Promise.race([request,new Promise(resolve=>setTimeout(()=>resolve(cached),2500))]);
  }));
});
