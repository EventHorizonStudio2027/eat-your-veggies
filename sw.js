/* Cache the game shell and any successfully fetched 3D engine modules.
   First visit still needs internet; subsequent visits may work offline. */
const CACHE='veggieverse-v4';
const SHELL=['./','./index.html','./web/styles.css','./web/main.js','./web/storybook-world.js','./web/veggie-adventure.js','./web/discovery-world.js','./web/icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
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
      return response;
    }).catch(()=>cached||Response.error());
    // Fresh game code takes priority; cached copy is only an offline fallback.
    return url.origin===self.location.origin ? request : (cached||request);
  }));
});
