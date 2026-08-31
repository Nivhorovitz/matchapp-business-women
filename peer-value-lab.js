const NEED_TAGS=['תמחור','לקוחות חדשים','שיווק','מכירות','AI לעסק','שיתופי פעולה','מיקוד עסקי','הצעת ערך','פיננסים','ניהול זמן'];
const VALUE_TYPES=['רעיון שימושי','עצה מעשית','משוב','חיבור / הפניה','שותפה אפשרית','ידע מקצועי','החלטה שהתחדדה'];
const DEMO_MEMBERS=[
  {id:'m1',name:'מיה רוזן',role:'יועצת פיננסית לעסקים',offers:['תמחור','פיננסים','תזרים','רווחיות'],need:'להגדיל את צינור הלקוחות',initials:'מר'},
  {id:'m2',name:'יעל לביא',role:'יועצת מכירות B2B',offers:['מכירות','שיחת מכירה','לקוחות חדשים','סגירה'],need:'להכניס AI לתהליך המכירה',initials:'יל'},
  {id:'m3',name:'דנה ברק',role:'אסטרטגית מותג',offers:['הצעת ערך','מיתוג','פיץ׳','מסרים'],need:'לייצר שיתופי פעולה קבועים',initials:'דב'},
  {id:'m4',name:'לירון שלו',role:'מנהלת שיווק ו-AI',offers:['שיווק','תוכן','AI לעסק','אוטומציה'],need:'לדייק תמחור לשירות חדש',initials:'לש'},
  {id:'m5',name:'עדי מור',role:'פיתוח עסקי ושותפויות',offers:['שיתופי פעולה','נטוורקינג','הפניות','לקוחות חדשים'],need:'לחדד את ההצעה החדשה',initials:'עמ'},
  {id:'m6',name:'נועה קדם',role:'מנטורית לעצמאיות',offers:['מיקוד עסקי','ניהול זמן','הצעת ערך','אחריות'],need:'להרחיב מוצר קבוצתי',initials:'נק'},
  {id:'m7',name:'רוני דיין',role:'יועצת מוצר ושירות',offers:['פיתוח מוצר','מחקר לקוחות','הצעת ערך','תמחור'],need:'להגדיל נראות ושיווק',initials:'רד'},
  {id:'m8',name:'שירה גפן',role:'מומחית קהילה ונטוורקינג',offers:['בניית קהילה','נטוורקינג','שיתופי פעולה','אירועים'],need:'לסגור יותר לקוחות ארגוניים',initials:'שג'}
];
const CLINIC_STAGES=[
  {label:'שלב 1 מתוך 4',time:'3 דקות',icon:'◎',title:'מה אני מנסה לקדם?',instruction:'כל אחת מקבלת עד 45 שניות: מה הדבר העסקי שהכי יעזור לה להזיז קדימה עכשיו?',prompt:'משפט פתיחה: “אם הייתי יוצאת מהשיחה הזאת עם דבר אחד שימושי, הייתי רוצה שזה יהיה…”'},
  {label:'שלב 2 מתוך 4',time:'7 דקות',icon:'?',title:'מבינות לפני שמציעות',instruction:'בחרו צורך אחד. שאר החברות שואלות רק שאלות שמחדדות את הבעיה. עדיין לא נותנות עצות.',prompt:'שאלו: מה כבר ניסית? מה הופך את זה לקשה? מה ייחשב הצלחה? מה חסר לך כדי להתקדם?'},
  {label:'שלב 3 מתוך 4',time:'10 דקות',icon:'✦',title:'הופכות ניסיון לעזרה',instruction:'עכשיו כל אחת מביאה משהו שימושי: ניסיון, רעיון, דוגמה, contact, משוב או שאלה שמסיטה את החשיבה.',prompt:'העדיפו משהו שאפשר להשתמש בו השבוע. אם יש לכן אדם שכדאי לחבר אליו — אמרו זאת במפורש.'},
  {label:'שלב 4 מתוך 4',time:'5 דקות',icon:'→',title:'מה יוצא מכאן?',instruction:'כל אחת אומרת מה היא לוקחת ומה הצעד הבא שלה. אם נוצר חיבור להמשך, קובעים אותו עכשיו.',prompt:'סיימו במשפט: “הדבר שאני לוקחת מהשיחה הוא…” ואז “הצעד הבא שלי הוא…”'}
];
const BASE_EVENTS=[
  {recipient:'אורית',provider:'מיכל',type:'חיבור / הפניה',note:'חיבור למנהלת רכש בחברת הייטק',followup:true},
  {recipient:'גלית',provider:'ענת',type:'משוב',note:'דיוק הצעת מחיר ללקוח חדש',followup:false},
  {recipient:'רוני',provider:'שירה',type:'עצה מעשית',note:'שינוי מבנה שיחת המכירה',followup:true},
  {recipient:'מיכל',provider:'דנה',type:'החלטה שהתחדדה',note:'בחירת קהל יעד למוצר החדש',followup:false},
  {recipient:'נועה',provider:'יעל',type:'ידע מקצועי',note:'דרך להשתמש ב-AI לסיכום לידים',followup:true}
];
const BASE_VALUE_COUNTS={'עצה מעשית':14,'חיבור / הפניה':11,'משוב':9,'רעיון שימושי':8,'ידע מקצועי':6,'החלטה שהתחדדה':4,'שותפה אפשרית':2};
const BASE_NEEDS=[['לקוחות חדשים',12],['תמחור',9],['שיווק',8],['שיתופי פעולה',7],['מיקוד עסקי',6]];
const ATTENTION=[['הילה', '2 מפגשים בלי Value Event'],['קרן','חיבור אחד בלבד החודש'],['נועה ש׳','טרם נוצר follow-up'],['אפרת','צורך פתוח: לקוחות חדשים']];

const state={selectedNeed:'',selectedValues:[],group:[],clinicIndex:0,latest:null};
const $=id=>document.getElementById(id);
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

function renderTags(){
  $('needTags').innerHTML=NEED_TAGS.map(t=>`<button class="tag ${state.selectedNeed===t?'active':''}" data-need="${esc(t)}">${esc(t)}</button>`).join('');
  document.querySelectorAll('[data-need]').forEach(b=>b.onclick=()=>{state.selectedNeed=b.dataset.need;renderTags()});
  $('valueTypes').innerHTML=VALUE_TYPES.map(t=>`<button class="value-type ${state.selectedValues.includes(t)?'active':''}" data-value="${esc(t)}">${esc(t)}</button>`).join('');
  document.querySelectorAll('[data-value]').forEach(b=>b.onclick=()=>{const t=b.dataset.value;state.selectedValues=state.selectedValues.includes(t)?state.selectedValues.filter(x=>x!==t):[...state.selectedValues,t];renderTags()});
}
function showView(name){$('memberView').classList.toggle('active',name==='member');$('adminView').classList.toggle('active',name==='admin');if(name==='admin')renderDashboard()}
function showStep(id){document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function tokens(s){return String(s||'').toLowerCase().split(/[^א-תa-z0-9]+/i).filter(x=>x.length>1)}
function scoreMember(m,needText,needTag){let score=0;const hay=m.offers.join(' ').toLowerCase();if(needTag&&hay.includes(needTag.toLowerCase()))score+=50;tokens(needText).forEach(t=>{if(hay.includes(t))score+=12});if(m.offers.some(o=>needText.toLowerCase().includes(o.toLowerCase())))score+=24;score+=Math.random()*3;return score}
function buildGroup(){
  const name=$('memberName').value.trim();const need=$('needText').value.trim();const offer=$('offerText').value.trim();
  if(!name||(!need&&!state.selectedNeed)){alert('כדי לבנות חיבור, כתבי שם וצורך עסקי אחד.');return}
  const ranked=[...DEMO_MEMBERS].map(m=>({...m,score:scoreMember(m,need,state.selectedNeed)})).sort((a,b)=>b.score-a.score).slice(0,3);
  state.group=[{id:'self',name,role:'את',offers:[offer||'ניסיון עסקי אישי'],need:need||state.selectedNeed,initials:name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''),you:true},...ranked];
  renderGroup();showStep('stepGroup');
}
function renderGroup(){
  const userNeed=$('needText').value.trim()||state.selectedNeed;
  $('groupReason').textContent=`הצורך שהכנסת: “${userNeed}”. חיפשנו שילוב של ניסיון רלוונטי, יכולת משלימה ופוטנציאל לעזרה הדדית.`;
  $('groupCards').innerHTML=state.group.map((m,i)=>`<article class="member-card ${m.you?'you':''}"><div class="avatar">${esc(m.initials||'•')}</div><h3>${esc(m.name)}</h3><p class="role">${esc(m.role)}</p><small>${m.you?'הצורך שלך':'יכולה לעזור ב'}</small><p>${esc(m.you?m.need:m.offers.slice(0,3).join(' · '))}</p>${m.you?'<span class="match-pill">נקודת המוצא</span>':`<span class="match-pill">Match ${Math.max(72,94-i*6)}%</span>`}</article>`).join('');
  const helpers=state.group.slice(1).map(x=>x.name.split(' ')[0]).join(', ');
  $('orchestrationWhy').textContent=`${helpers} מביאות שילוב של יכולות שקשורות לצורך שהוגדר. המטרה איננה רק התאמה אישית, אלא ליצור קבוצה שבה לכל אחת יש סיכוי גם לקבל וגם לתת משהו שימושי.`;
}
function renderClinic(){
  const s=CLINIC_STAGES[state.clinicIndex];$('clinicStageLabel').textContent=s.label;$('clinicTime').textContent=s.time;$('clinicIcon').textContent=s.icon;$('clinicTitle').textContent=s.title;$('clinicInstruction').textContent=s.instruction;$('clinicPrompt').textContent=s.prompt;$('clinicProgress').style.width=`${(state.clinicIndex+1)*25}%`;
  $('clinicPrevBtn').style.visibility=state.clinicIndex===0?'hidden':'visible';$('clinicNextBtn').textContent=state.clinicIndex===CLINIC_STAGES.length-1?'לסיכום Value Event':'השלב הבא';
  $('clinicParticipants').innerHTML=state.group.map(m=>`<div class="mini-person"><i>${esc((m.initials||'•').slice(0,2))}</i><span>${esc(m.name)}</span></div>`).join('');
}
function openOutcome(){
  const others=state.group.filter(m=>!m.you);$('helpedBy').innerHTML='<option value="">בחרי חברה</option>'+others.map(m=>`<option value="${esc(m.name)}">${esc(m.name)} · ${esc(m.role)}</option>`).join('');state.selectedValues=[];renderTags();showStep('stepOutcome')
}
function saveOutcome(){
  const provider=$('helpedBy').value;const note=$('outcomeNote').value.trim();if(!provider||!state.selectedValues.length){alert('בחרי מי עזרה לך ולפחות סוג ערך אחד.');return}
  const event={recipient:$('memberName').value.trim(),provider,type:state.selectedValues[0],types:[...state.selectedValues],note:note||'ערך שימושי שנוצר בשיחה',followup:$('followupCheck').checked,createdAt:new Date().toISOString()};
  state.latest=event;const stored=JSON.parse(localStorage.getItem('pvLabDemoEvents')||'[]');stored.unshift(event);localStorage.setItem('pvLabDemoEvents',JSON.stringify(stored.slice(0,20)));
  $('doneSummary').textContent=`${event.recipient} קיבלה מ־${event.provider}: ${event.types.join(', ')}${event.followup?' · ונקבע גם המשך.':'.'}`;showStep('stepDone')
}
function storedEvents(){try{return JSON.parse(localStorage.getItem('pvLabDemoEvents')||'[]')}catch(e){return[]}}
function renderDashboard(){
  const added=storedEvents();const events=[...added,...BASE_EVENTS];const baseMembers=36;const valueCovered=27+Math.min(added.length,5);const members=baseMembers+Math.min(added.length,5);const totalEvents=54+added.length;const followups=17+added.filter(e=>e.followup).length;const coverage=Math.round(valueCovered/members*100);
  const metrics=[['Peer Value Coverage',`${coverage}%`,'חברות שקיבלו ערך מחברה אחרת',true],['Value Events',totalEvents,'אירועי ערך ב־30 ימים'],['Follow-ups',followups,'המשכים שנקבעו'],['Host Independence','82%','אירועי הערך ללא מובילת המועדון']];
  $('metricCards').innerHTML=metrics.map(m=>`<article class="metric-card ${m[3]?'highlight':''}"><small>${m[0]}</small><b>${m[1]}</b><span>${m[2]}</span></article>`).join('');
  const counts={...BASE_VALUE_COUNTS};added.forEach(e=>(e.types||[e.type]).forEach(t=>counts[t]=(counts[t]||0)+1));const max=Math.max(...Object.values(counts));$('valueBars').innerHTML=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="bar-row"><span>${esc(k)}</span><div class="bar-track"><i style="width:${Math.round(v/max*100)}%"></i></div><b>${v}</b></div>`).join('');
  $('needsList').innerHTML=BASE_NEEDS.map(([n,c])=>`<div class="signal-item"><b>${esc(n)}</b><span>${c} חברות</span></div>`).join('');
  $('attentionList').innerHTML=ATTENTION.map(([n,s],i)=>`<div class="attention-item ${i<2?'warn':''}"><b>${esc(n)}</b><span>${esc(s)}</span></div>`).join('');
  $('eventCountChip').textContent=`${events.length} מוצגים`;$('eventsTable').innerHTML=`<div class="event-row header"><span>קיבלה ערך</span><span>ממי</span><span>מה קרה</span><span>Outcome</span></div>`+events.slice(0,8).map(e=>`<div class="event-row"><strong>${esc(e.recipient)}</strong><span>${esc(e.provider)}</span><span>${esc(e.note)}</span><span class="event-type">${esc(e.type)}${e.followup?' · המשך':''}</span></div>`).join('');
}
function resetDemo(){localStorage.removeItem('pvLabDemoEvents');state.selectedNeed='';state.selectedValues=[];state.group=[];state.clinicIndex=0;state.latest=null;$('memberName').value='';$('needText').value='';$('offerText').value='';$('outcomeNote').value='';$('followupCheck').checked=false;renderTags();showView('member');showStep('stepIntro')}

$('memberViewBtn').onclick=()=>showView('member');$('adminViewBtn').onclick=()=>showView('admin');$('resetBtn').onclick=resetDemo;
$('fillDemoBtn').onclick=()=>{$('memberName').value='נועה לוי';$('needText').value='אני רוצה להעלות מחירים אבל לא בטוחה איך להציג את המחיר החדש ללקוחות קיימות';$('offerText').value='שיווק אורגני, בניית קהילה וחיבורים';state.selectedNeed='תמחור';renderTags()};
$('buildGroupBtn').onclick=buildGroup;$('backToIntroBtn').onclick=()=>showStep('stepIntro');$('startClinicBtn').onclick=()=>{state.clinicIndex=0;renderClinic();showStep('stepClinic')};
$('clinicPrevBtn').onclick=()=>{if(state.clinicIndex>0){state.clinicIndex--;renderClinic()}};$('clinicNextBtn').onclick=()=>{if(state.clinicIndex<CLINIC_STAGES.length-1){state.clinicIndex++;renderClinic()}else openOutcome()};
$('saveOutcomeBtn').onclick=saveOutcome;$('newRunBtn').onclick=()=>showStep('stepIntro');$('showDashboardBtn').onclick=()=>showView('admin');
renderTags();renderDashboard();
