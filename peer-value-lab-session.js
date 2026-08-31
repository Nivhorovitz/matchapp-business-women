// Bridge Weekly Peer Value Cycle sessions into the embedded Peer Value Lab.
(function(){
  const params=new URLSearchParams(window.location.search);
  const requestedRecipe=params.get('recipe');
  const sessionId=params.get('session');
  const validRecipe=typeof RECIPES!=='undefined' && requestedRecipe && RECIPES[requestedRecipe];
  if(validRecipe && typeof selectRecipe==='function') selectRecipe(requestedRecipe);
  if(!sessionId) return;

  try{
    const sessions=JSON.parse(localStorage.getItem('pvWeeklySessionsV01')||'[]');
    const requests=JSON.parse(localStorage.getItem('pvWeeklyRequestsV01')||'[]');
    const session=sessions.find(s=>s.id===sessionId);
    if(!session) return;
    if(RECIPES[session.recipe] && typeof selectRecipe==='function') selectRecipe(session.recipe);
    const members=session.participants.map(id=>requests.find(r=>r.id===id)).filter(Boolean);
    if(!members.length) return;
    state.group=members.map(m=>({
      id:m.id,
      name:m.name,
      role:'חברת המועדון',
      offers:[m.offer||'ניסיון עסקי'],
      need:m.need||'',
      initials:String(m.name||'').split(/\s+/).slice(0,2).map(x=>x[0]).join('')
    }));
    state.stageIndex=0;
    if(typeof renderClinic==='function') renderClinic();
    if(typeof showStep==='function') showStep('stepClinic');
    const side=document.querySelector('.clinic-side');
    if(side && !document.getElementById('sessionContextChip')){
      const chip=document.createElement('div');
      chip.id='sessionContextChip';
      chip.className='recipe-badge';
      chip.textContent=`Session · ${members.length} משתתפות`;
      side.prepend(chip);
    }
  }catch(e){console.warn('Could not hydrate weekly session',e)}
})();
