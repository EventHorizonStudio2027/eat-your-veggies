(() => {
 const $=selector=>document.querySelector(selector);
 const photoPrompt=$('#explorer-photo');
 const photoPlay=$('#explorer-photo-play');
 const startButton=$('#start-adventure');
 const photoInput=$('#explorer-photo-input');
 const gameStatus=$('#explorer-game-status');
 const setup=$('#parent-setup');
 startButton.addEventListener('click',()=>{
  if(!setup.querySelector('input[type=checkbox]:checked')){
   $('#parent-error').textContent='Choose at least one veggie to begin.';
   setup.querySelector('input[type=checkbox]').focus({preventScroll:true});
   return;
  }
  $('#parent-error').textContent='';
  gameStatus.hidden=true;
  if(!photoPrompt.open)photoPrompt.showModal();
 });
 function startGame(usePhoto){
  if(!photoPrompt.open)return;
  if(!$('#loading').classList.contains('hidden')){
   gameStatus.textContent=$('#retry').hidden
    ? 'The garden is still loading. Try Play again in a moment.'
    : 'The 3D garden could not start. Reopen the game to try again.';
   gameStatus.hidden=false;
   return;
  }
  if(!usePhoto)removePhoto();
  photoPrompt.close();
  window.dispatchEvent(new CustomEvent('veggie-start-request',{detail:photoUrl}));
 }
 $('#explorer-photo-skip').addEventListener('click',()=>startGame(false));
 photoPlay.addEventListener('click',()=>{
  if(photoUrl&&!photoPlay.disabled)startGame(true);
 });
 photoPrompt.addEventListener('cancel',()=>{
  photoSelection++;
  photoPlay.disabled=false;
  photoInput.value='';
 });
 const photoPreview=$('#explorer-photo-preview');
 const photoSelected=$('#explorer-photo-selected');
 const photoError=$('#explorer-photo-error');
 let photoUrl='';
 let photoSelection=0;
 function removePhoto(){
  photoSelection++;
  if(photoUrl)URL.revokeObjectURL(photoUrl);
  photoUrl='';
  photoPreview.removeAttribute('src');
  photoSelected.hidden=true;
  photoPlay.hidden=true;
  photoPlay.disabled=false;
  photoInput.value='';
  photoError.textContent='';
 }
 $('#explorer-photo-remove').addEventListener('click',()=>{
  removePhoto();
  photoInput.focus();
 });
 photoInput.addEventListener('change',async()=>{
  const file=photoInput.files[0];
  if(!file)return;
  const selection=++photoSelection;
  photoPlay.disabled=true;
  photoError.textContent='';
  const candidate=URL.createObjectURL(file);
  const image=new Image();
  image.src=candidate;
  try{
   await image.decode();
   if(selection!==photoSelection)return;
   removePhoto();
   photoUrl=candidate;
   photoPreview.src=photoUrl;
   photoSelected.hidden=false;
   photoPlay.hidden=false;
  }catch{
   if(selection===photoSelection){
    photoInput.value='';
    photoError.textContent='This photo could not be opened. Try a JPEG, PNG, or WebP.';
   }
  }finally{
   if(selection===photoSelection)photoPlay.disabled=false;
   if(candidate!==photoUrl)URL.revokeObjectURL(candidate);
  }
 });
})();
