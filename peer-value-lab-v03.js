// Peer Value Lab v0.3 — Multi-Value Sessions
// Loaded after peer-value-lab.js so the v0.2 demo remains intact and this layer only extends it.

(function(){
  const BASE_SESSION_COUNT=22;
  const BASE_VALUE_EVENT_COUNT=54;
  const BASE_FOLLOWUP_COUNT=18;

  state.pendingEvents=[];

  function addStyles(){
    if(document.getElementById('pv-v03-styles')) return;
    const style=document.createElement('style');
    style.id='pv-v03-styles';
    style.textContent=`
      .multi-intro{margin:0 0 20px;padding-bottom:16px;border-bottom:1px solid #e5ebe6}.multi-intro h3{font-size:22px;margin:0 0 6px}.multi-intro p{margin:0;color:#6a776f;line-height:1.55;font-size:14px}
      .extra-value-section{margin-top:22px;padding-top:22px;border-top:1px solid #e3e9e4}.extra-value-head{display:flex;justify-content:space-between;gap:15px;align-items:flex-start;margin-bottom:13px}.extra-value-head h3{font-size:19px;margin:0 0 5px}.extra-value-head p{margin:0;color:#718078;font-size:13px;line-height:1.5}.demo-extra-btn{white-space:nowrap}
      .extra-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:12px 0}.extra-action{background:#f8faf8;border:1px solid #dce5de;border-radius:13px;padding:12px;text-align:right;color:#314038;font-weight:800}.extra-action span{display:block;font-size:11px;color:#77847d;font-weight:500;margin-top:4px}.extra-action.active{border-color:#6da181;background:#eef7f1;color:#205f40}
      .extra-form{background:#f5f8f5;border:1px solid #dfe7e1;border-radius:15px;padding:15px;margin-top:12px}.extra-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.extra-form label{margin-bottom:10px}.extra-form .wide{grid-column:1/-1}.extra-form-actions{display:flex;justify-content:flex-end;gap:8px}
      .session-preview{margin-top:18px;background:#203c2f;color:#fff;border-radius:17px;padding:17px}.session-preview-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:11px}.session-preview-head h3{margin:0;font-size:17px}.session-count{padding:6px 9px;border-radius:999px;background:#355a48;color:#e8f3ec;font-size:11px;font-weight:800}.preview-list{display:grid;gap:7px}.preview-event{display:grid;grid-template-columns:1fr auto;gap:10px;padding:9px 10px;background:rgba(255,255,255,.07);border-radius:11px;font-size:12px}.preview-event b{display:block;margin-bottom:2px}.preview-event span{color:#d5e2da}.preview-remove{background:transparent;color:#cfe0d5;padding:4px 6px;font-weight:800}.preview-empty{font-size:12px;color:#c9d9cf;margin:0}.session-save-row{display:flex;gap:9px;margin-top:15px}.session-save-row .primary{flex:1}.session-save-row .ghost{flex:0 0 auto}
      .done-session-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin:24px 0 4px}.done-session-metric{background:#f4f8f5;border:1px solid #dce7df;border-radius:14px;padding:12px}.done-session-metric b{display:block;font-size:24px;color:#226b47}.done-session-metric span{font-size:11px;color:#6c7a71}
      .metrics.v03{grid-template-columns:repeat(6,minmax(0,1fr))}.value-yield-note{margin-top:12px;padding:12px 14px;background:#f4f8f5;border:1px solid #dfe7e1;border-radius:12px;font-size:13px;color:#526158}.value-yield-note b{color:#245f41}
      @media(max-width:1000px){.metrics.v03{grid-template-columns:repeat(3,1fr)}}
      @media(max-width:700px){.extra-actions,.extra-form-grid,.done-session-metrics{grid-template-columns:1fr}.metrics.v03{grid-template-columns:repeat(2,1fr)}.extra-value-head{flex-direction:column}.session-save-row{flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

  function participantOptions(includeSelf=true){
    const list=(state.group||[]).filter(m=>includeSelf||!m.you);
    return list.map(m=>`<option value="${esc(m.name)}">${esc(m.name)}</option>`).join('');
  }

  function selectedActionLabel(kind){
    return ({referral:'חיבור / הפניה',followup:'המשך שנקבע',collaboration:'שיתוף פעולה פוטנציאלי',other:'ערך נוסף'})[kind]||'ערך נוסף';
  }

  function setupOutcomeUI(){
    const card=document.querySelector('#stepOutcome .outcome-card');
    if(!card) return;

    // Turn the existing card into the personal layer of a multi-value session summary.
    const outcomeTitle=document.querySelector('#stepOutcome h2');
    if(outcomeTitle) outcomeTitle.textContent='מה נוצר במפגש הזה?';
    const explanation=$('outcomeExplanation');
    if(explanation) explanation.textContent='סמני קודם מה את קיבלת. אם נוצר ערך נוסף בין חברות אחרות בקבוצה, אפשר להוסיף גם אותו בכמה שניות.';

    if(!document.getElementById('personalValueIntro')){
      const intro=document.createElement('div');
      intro.id='personalValueIntro';
      intro.className='multi-intro';
      intro.innerHTML='<h3>הערך שאני קיבלתי</h3><p>מי עזרה לך ומה יצא לך מהאינטראקציה?</p>';
      card.prepend(intro);
    }

    const oldSave=$('saveOutcomeBtn');
    if(oldSave) oldSave.style.display='none';

    if(!document.getElementById('extraValueSection')){
      const section=document.createElement('div');
      section.id='extraValueSection';
      section.className='extra-value-section';
      section.innerHTML=`
        <div class="extra-value-head">
          <div><h3>ראית עוד ערך שנוצר בקבוצה?</h3><p>לא חובה. אפשר לתעד חיבור, המשך, שיתוף פעולה או ערך אחר בין חברות נוספות.</p></div>
          <button class="ghost small demo-extra-btn" id="seedExtraValuesBtn">טעינת 2 ערכים לדוגמה</button>
        </div>
        <div class="extra-actions">
          <button class="extra-action" data-extra-kind="referral">↗ נוצר חיבור / הפניה<span>מי פתחה דלת למי</span></button>
          <button class="extra-action" data-extra-kind="followup">→ נקבע המשך<span>מי קבעו לדבר או לפעול שוב</span></button>
          <button class="extra-action" data-extra-kind="collaboration">⇄ נולד שיתוף פעולה<span>רעיון או ניסוי משותף</span></button>
          <button class="extra-action" data-extra-kind="other">＋ נוצר ערך אחר<span>תוצאה משמעותית נוספת</span></button>
        </div>
        <div id="extraValueForm" class="extra-form hidden"></div>
        <div id="sessionPreview" class="session-preview">
          <div class="session-preview-head"><h3>במפגש הזה נוצרו עד עכשיו</h3><span class="session-count" id="sessionCount">0 Value Events</span></div>
          <div id="sessionPreviewList" class="preview-list"></div>
        </div>
        <div class="session-save-row">
          <button class="ghost" id="skipExtraBtn">דלגי על ערכים נוספים</button>
          <button class="primary" id="saveSessionBtn">שמירת תוצאות המפגש</button>
        </div>`;
      card.appendChild(section);

      document.querySelectorAll('[data-extra-kind]').forEach(btn=>btn.addEventListener('click',()=>openExtraForm(btn.dataset.extraKind)));
      $('seedExtraValuesBtn').onclick=seedExtraValues;
      $('saveSessionBtn').onclick=saveMultiOutcome;
      $('skipExtraBtn').onclick=saveMultiOutcome;
    }

    ['helpedBy','outcomeNote','followupCheck'].forEach(id=>{
      const el=$(id); if(el) ['change','input'].forEach(evt=>el.addEventListener(evt,renderSessionPreview));
    });
    document.addEventListener('click',e=>{if(e.target.closest && e.target.closest('[data-value]')) setTimeout(renderSessionPreview,0)});
    renderSessionPreview();
  }

  function openExtraForm(kind){
    document.querySelectorAll('[data-extra-kind]').forEach(x=>x.classList.toggle('active',x.dataset.extraKind===kind));
    const form=$('extraValueForm');
    form.classList.remove('hidden');
    const label=selectedActionLabel(kind);
    const descriptionPlaceholder=kind==='referral'?'לדוגמה: חיבור למנהלת משאבי אנוש בחברת הייטק':kind==='followup'?'לדוגמה: קבענו שיחת המשך ביום חמישי':kind==='collaboration'?'לדוגמה: החלטנו לבדוק וובינר משותף':'מה קרה שהיה בעל ערך?';
    form.innerHTML=`
      <div class="extra-form-grid">
        <label>מי יצרה את הערך?<select id="extraProvider">${participantOptions(true)}</select></label>
        <label>עבור מי?<select id="extraRecipient">${participantOptions(true)}</select></label>
        <label class="wide">מה נוצר?<input id="extraDescription" placeholder="${descriptionPlaceholder}"></label>
      </div>
      <div class="extra-form-actions"><button class="ghost small" id="cancelExtraBtn">ביטול</button><button class="primary small" id="addExtraBtn">+ הוספת Value Event</button></div>`;
    form.dataset.kind=kind;
    if(state.group && state.group.length>1){
      $('extraProvider').value=state.group[1].name;
      $('extraRecipient').value=state.group[0].name;
    }
    $('cancelExtraBtn').onclick=()=>{form.classList.add('hidden');document.querySelectorAll('[data-extra-kind]').forEach(x=>x.classList.remove('active'))};
    $('addExtraBtn').onclick=()=>{
      const provider=$('extraProvider').value,recipient=$('extraRecipient').value,note=$('extraDescription').value.trim();
      if(!provider||!recipient||provider===recipient){alert('בחרי שתי חברות שונות.');return}
      state.pendingEvents.push({provider,recipient,type:label,note:note||label,followup:kind==='followup'||kind==='collaboration',kind});
      form.classList.add('hidden');document.querySelectorAll('[data-extra-kind]').forEach(x=>x.classList.remove('active'));renderSessionPreview();
    };
  }

  function seedExtraValues(){
    const others=(state.group||[]).filter(m=>!m.you);
    if(others.length<2) return;
    const self=(state.group||[]).find(m=>m.you)?.name||$('memberName').value.trim()||'את';
    const r=recipe().id;
    const samples={
      problem:[
        {provider:others[1].name,recipient:self,type:'חיבור / הפניה',note:'חיבור ללקוחה פוטנציאלית שרלוונטית לצורך שעלה',followup:true,kind:'referral'},
        {provider:others[0].name,recipient:others[1].name,type:'שיתוף פעולה פוטנציאלי',note:'רעיון למפגש משותף סביב קהל יעד משלים',followup:true,kind:'collaboration'}],
      referral:[
        {provider:others[0].name,recipient:self,type:'חיבור / הפניה',note:'התחייבות ל־intro לאשת קשר רלוונטית',followup:true,kind:'referral'},
        {provider:others[1].name,recipient:others[0].name,type:'המשך שנקבע',note:'קבעו לבדוק יחד שתי הזדמנויות נוספות',followup:true,kind:'followup'}],
      feedback:[
        {provider:others[0].name,recipient:self,type:'משוב',note:'זוהה משפט במסר שלא היה ברור מספיק',followup:false,kind:'other'},
        {provider:others[1].name,recipient:self,type:'המשך שנקבע',note:'נקבעה בדיקה חוזרת אחרי עדכון ההצעה',followup:true,kind:'followup'}],
      collaboration:[
        {provider:others[0].name,recipient:others[1].name,type:'שיתוף פעולה פוטנציאלי',note:'ניסוי קטן של וובינר משותף לקהלים של שתיהן',followup:true,kind:'collaboration'},
        {provider:others[1].name,recipient:self,type:'חיבור / הפניה',note:'חיבור לשותפה אפשרית שיכולה להשלים את המוצר',followup:true,kind:'referral'}]
    };
    state.pendingEvents=[...(samples[r]||samples.problem)];
    renderSessionPreview();
  }

  function personalPreviewEvent(){
    const provider=$('helpedBy')?.value||'';
    const recipient=$('memberName')?.value.trim()||'';
    if(!provider||!recipient||!state.selectedValues.length) return null;
    return {provider,recipient,type:state.selectedValues.join(' + '),note:$('outcomeNote')?.value.trim()||'',followup:!!$('followupCheck')?.checked,kind:'personal'};
  }

  function renderSessionPreview(){
    const list=$('sessionPreviewList'); if(!list) return;
    const personal=personalPreviewEvent();
    const events=[...(personal?[personal]:[]),...(state.pendingEvents||[])];
    $('sessionCount').textContent=`${events.length} Value Event${events.length===1?'':'s'}`;
    if(!events.length){list.innerHTML='<p class="preview-empty">כשתסמני תוצאה, היא תופיע כאן. אפשר להוסיף יותר מאירוע ערך אחד מאותו מפגש.</p>';return}
    list.innerHTML=events.map((e,i)=>`<div class="preview-event"><div><b>${esc(e.recipient)} ← ${esc(e.provider)}</b><span>${esc(e.type)}${e.note?' · '+esc(e.note):''}</span></div>${e.kind!=='personal'?`<button class="preview-remove" data-remove-extra="${i-(personal?1:0)}">×</button>`:'<span>הערך שלך</span>'}</div>`).join('');
    document.querySelectorAll('[data-remove-extra]').forEach(b=>b.onclick=()=>{state.pendingEvents.splice(Number(b.dataset.removeExtra),1);renderSessionPreview()});
  }

  function saveMultiOutcome(){
    const personal=personalPreviewEvent();
    if(!personal){alert('בחרי מי עזרה לך ולפחות תוצאה אחת שקיבלת.');return}
    const sessionId='pvl-'+Date.now();
    const createdAt=new Date().toISOString();
    const all=[personal,...(state.pendingEvents||[])].map(e=>({...e,recipe:state.recipeId,sessionId,createdAt}));

    const saved=JSON.parse(localStorage.getItem('peerValueLabEvents')||'[]');
    localStorage.setItem('peerValueLabEvents',JSON.stringify([...all,...saved].slice(0,80)));
    const sessions=JSON.parse(localStorage.getItem('peerValueLabSessions')||'[]');
    sessions.unshift({id:sessionId,recipe:state.recipeId,participants:(state.group||[]).map(m=>m.name),eventCount:all.length,followupCount:all.filter(e=>e.followup).length,createdAt});
    localStorage.setItem('peerValueLabSessions',JSON.stringify(sessions.slice(0,40)));

    state.latest={sessionId,events:all,recipe:state.recipeId};
    renderDoneSession(all);
    showStep('stepDone');
  }

  function renderDoneSession(events){
    const done=document.querySelector('#stepDone .done-card');
    if(!done) return;
    const eyebrow=done.querySelector('.eyebrow'); if(eyebrow) eyebrow.textContent='המפגש הסתיים';
    const title=done.querySelector('h2'); if(title) title.textContent=`במפגש אחד נוצרו ${events.length} ערכים בין חברות המועדון.`;
    const followups=events.filter(e=>e.followup).length;
    const referrals=events.filter(e=>String(e.type).includes('חיבור')||String(e.type).includes('הפניה')).length;
    const collaborations=events.filter(e=>String(e.type).includes('שיתוף פעולה')).length;
    $('doneSummary').textContent='כשהדבר הזה קורה שוב ושוב, החברות עצמן הופכות לחלק מהערך של המועדון.';
    let metrics=document.getElementById('doneSessionMetrics');
    if(!metrics){metrics=document.createElement('div');metrics.id='doneSessionMetrics';metrics.className='done-session-metrics';$('doneSummary').after(metrics)}
    metrics.innerHTML=`<div class="done-session-metric"><b>${events.length}</b><span>Value Events</span></div><div class="done-session-metric"><b>${followups}</b><span>Follow-ups</span></div><div class="done-session-metric"><b>${referrals}</b><span>Referrals</span></div><div class="done-session-metric"><b>${collaborations}</b><span>Collaboration</span></div>`;
  }

  // Wrap v0.2 outcome opening so each interaction starts with a clean session basket.
  const originalOpenOutcome=openOutcome;
  openOutcome=function(){
    state.pendingEvents=[];
    originalOpenOutcome();
    setupOutcomeUI();
    renderSessionPreview();
  };

  const originalRenderDashboard=renderDashboard;
  renderDashboard=function(){
    originalRenderDashboard();
    const localEvents=JSON.parse(localStorage.getItem('peerValueLabEvents')||'[]');
    const localSessions=JSON.parse(localStorage.getItem('peerValueLabSessions')||'[]');
    const sessions=BASE_SESSION_COUNT+localSessions.length;
    const valueEvents=BASE_VALUE_EVENT_COUNT+localEvents.length;
    const followups=BASE_FOLLOWUP_COUNT+localEvents.filter(e=>e.followup).length;
    const yieldValue=(valueEvents/sessions).toFixed(1);
    const coverage=Math.min(88,74+localSessions.length*2);
    const cards=$('metricCards');
    cards.classList.add('v03');
    cards.innerHTML=`
      <div class="metric-card highlight"><small>Peer Value Coverage</small><b>${coverage}%</b><span>חברות שקיבלו ערך מחברה אחרת</span></div>
      <div class="metric-card"><small>Sessions</small><b>${sessions}</b><span>אינטראקציות מובנות החודש</span></div>
      <div class="metric-card"><small>Value Events</small><b>${valueEvents}</b><span>תוצאות שנוצרו בתוך המפגשים</span></div>
      <div class="metric-card"><small>Value Yield</small><b>${yieldValue}</b><span>Value Events לכל Session</span></div>
      <div class="metric-card"><small>Follow-ups</small><b>${followups}</b><span>תוצאות שהמשיכו הלאה</span></div>
      <div class="metric-card"><small>Host Independence</small><b>81%</b><span>ערך שנוצר בלי שהמובילות היו המקור</span></div>`;

    const recipeBox=$('recipeBars');
    if(recipeBox && !document.getElementById('valueYieldNote')){
      const note=document.createElement('div');note.id='valueYieldNote';note.className='value-yield-note';
      note.innerHTML='<b>מה נוכל ללמוד בהמשך:</b> לא רק כמה פעמים כל Recipe הופעל, אלא כמה ערך הוא מייצר בממוצע לכל אינטראקציה — וכך לשפר את ה־orchestration לאורך זמן.';
      recipeBox.after(note);
    }
  };

  function resetV03Run(){
    state.pendingEvents=[];
    resetRun();
    const metrics=document.getElementById('doneSessionMetrics');if(metrics) metrics.remove();
  }

  addStyles();
  const build=$('buildGroupBtn');if(build) build.textContent='צרי חיבור';
  const chip=document.querySelector('.pilot-chip');if(chip) chip.textContent='Pilot v0.3 · Multi-Value';
  const oldSave=$('saveOutcomeBtn');if(oldSave) oldSave.textContent='שמירת תוצאות המפגש';
  $('newRunBtn').onclick=resetV03Run;
  $('resetBtn').onclick=()=>{localStorage.removeItem('peerValueLabEvents');localStorage.removeItem('peerValueLabSessions');resetV03Run()};
})();