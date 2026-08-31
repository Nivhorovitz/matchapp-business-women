const RECIPES={
  problem:{id:'problem',icon:'◎',name:'Business Problem Clinic',short:'פתרון בעיה',description:'בעיה, חסם או החלטה שצריך להזיז',need:'מה הבעיה או ההחלטה שהכי יעזור לך לקדם השבוע?',ideal:4,min:3,duration:25},
  referral:{id:'referral',icon:'↗',name:'Referral Exchange',short:'חיבור / הפניה',description:'להגיע לאדם, לקוח או הזדמנות',need:'למי או לאיזו הזדמנות את רוצה להגיע השבוע?',ideal:4,min:3,duration:15},
  feedback:{id:'feedback',icon:'◇',name:'Feedback Lab',short:'משוב',description:'לבדוק הצעה, מסר, רעיון או מוצר',need:'על מה את רוצה לקבל משוב השבוע?',ideal:4,min:3,duration:20},
  collaboration:{id:'collaboration',icon:'⇄',name:'Collaboration Builder',short:'שיתוף פעולה',description:'לבדוק השלמה או ניסוי משותף',need:'איזה סוג שיתוף פעולה או יכולת משלימה את מחפשת?',ideal:3,min:2,duration:25}
};
const STORE={requests:'pvWeeklyRequestsV01',rooms:'pvWeeklyRoomsV01',sessions:'pvWeeklySessionsV01'};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#039;'}[m]));
const state={recipe:'problem',requests:read(STORE.requests,[]),rooms:read(STORE.rooms,[]),sessions:read(STORE.sessions,[])};

function read(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
function uid(prefix='id'){return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}
function pad(n){return String(n).padStart(2,'0')}
function nextWeekday(day){const d=new Date();d.setHours(20,0,0,0);let delta=(day-d.getDay()+7)%7;if(delta===0&&new Date().getHours()>=20)delta=7;d.setDate(d.getDate()+delta);return d}
function formatHebDate(d){return new Intl.DateTimeFormat('he-IL',{weekday:'long',day:'numeric',month:'numeric'}).format(d)}
function slotDate(slot){return slot==='tuesday'?nextWeekday(2):nextWeekday(4)}
function slotLabel(slot){return `${formatHebDate(slotDate(slot))} · 20:00`}
function showView(name){$('memberView').classList.toggle('active',name==='member');$('managerView').classList.toggle('active',name==='manager');if(name==='manager')renderManager()}

function initDates(){const tue=slotDate('tuesday'),thu=slotDate('thursday');$('tuesdaySlotText').textContent=formatHebDate(tue);$('thursdaySlotText').textContent=formatHebDate(thu);$('slotOneLabel').textContent=`שלישי · ${formatHebDate(tue)} · 20:00`;$('slotTwoLabel').textContent=`חמישי · ${formatHebDate(thu)} · 20:00`;const s=new Date(Math.min(tue,thu));s.setDate(s.getDate()-((s.getDay()+6)%7));const e=new Date(s);e.setDate(e.getDate()+6);$('cycleTitle').textContent=`${s.getDate()}.${s.getMonth()+1}–${e.getDate()}.${e.getMonth()+1}`}
function renderRecipes(){$('recipeChoices').innerHTML=Object.values(RECIPES).map(r=>`<button type="button" class="recipe-choice ${state.recipe===r.id?'active':''}" data-recipe="${r.id}"><i>${r.icon}</i><b>${r.name}</b><span>${r.description}</span></button>`).join('');document.querySelectorAll('[data-recipe]').forEach(b=>b.onclick=()=>{state.recipe=b.dataset.recipe;renderRecipes();$('needLabel').childNodes[0].nodeValue=RECIPES[state.recipe].need})}
function selectedSlots(){return [...document.querySelectorAll('input[name="slot"]:checked')].map(x=>x.value)}
function submitRequest(e){e.preventDefault();const name=$('memberName').value.trim(),email=$('memberEmail').value.trim(),need=$('needText').value.trim(),offer=$('offerText').value.trim(),slots=selectedSlots();if(!slots.length){alert('סמני לפחות מועד אחד שאת מתחייבת להגיע אליו.');return}if(!$('commitmentCheck').checked){alert('כדי לשלוח בקשה צריך לאשר commitment לאחד המועדים שסימנת.');return}const existing=state.requests.findIndex(r=>r.email.toLowerCase()===email.toLowerCase());const request={id:existing>=0?state.requests[existing].id:uid('req'),name,email,recipe:state.recipe,need,offer,slots,committed:true,status:'submitted',createdAt:new Date().toISOString()};if(existing>=0)state.requests[existing]=request;else state.requests.push(request);write(STORE.requests,state.requests);$('requestSuccessText').textContent=`סימנת ${slots.map(slotLabel).join(' או ')}. ביום שני, אם נוצרה קבוצה תקינה, תקבלי Session מאושר עם המשתתפות והחדר.`;$('requestSuccess').classList.remove('hidden')}
function fillDemoRequest(){state.recipe='feedback';renderRecipes();$('needLabel').childNodes[0].nodeValue=RECIPES.feedback.need;$('memberName').value='נועה לוי';$('memberEmail').value='noa@example.com';$('needText').value='בניתי חבילת ליווי חדשה ואני רוצה לדעת אם ברור למה היא שווה את המחיר.';$('offerText').value='שיווק אורגני, תוכן ובניית קהילה';document.querySelectorAll('input[name="slot"]').forEach(x=>x.checked=true);$('commitmentCheck').checked=true}

function loadDemoRequests(){const demos=[
['נועה לוי','noa@example.com','feedback','חבילת ליווי חדשה: האם ההבטחה והמחיר ברורים?','שיווק, תוכן, קהילה',['tuesday','thursday']],
['דנה ברק','dana@example.com','feedback','אני רוצה משוב על הפיץ׳ החדש שלי לארגונים','מיתוג, מסרים, הצעת ערך',['tuesday']],
['רוני דיין','roni@example.com','feedback','רוצה לבדוק האם השירות החדש מובן ללקוחה','מוצר, מחקר לקוחות, תמחור',['tuesday','thursday']],
['לירון שלו','liron@example.com','feedback','רוצה לבדוק דף מסר קצר לסדנת AI','AI, שיווק, אוטומציה',['tuesday']],
['מיה רוזן','maya@example.com','problem','מתלבטת איך להעלות מחירים ללקוחות קיימים','פיננסים, תמחור, רווחיות',['tuesday','thursday']],
['יעל לביא','yael@example.com','problem','צינור המכירות לא מספיק יציב ואני צריכה כיוון','מכירות B2B, סגירה, לידים',['tuesday']],
['נועה קדם','noak@example.com','problem','אני מפוזרת בין כמה מוצרים ורוצה לבחור במה להתמקד','מיקוד, ניהול זמן, מנטורינג',['tuesday','thursday']],
['גלית שלו','galit@example.com','problem','רוצה להחליט אם להכניס מוצר קבוצתי','הנחיה, קורסים, קהילה',['tuesday']],
['עדי מור','adi@example.com','referral','רוצה להגיע למנהלות משאבי אנוש בחברות 100+ עובדים','פיתוח עסקי, שותפויות, הפניות',['thursday']],
['שירה גפן','shira@example.com','referral','מחפשת חיבור למנהלות קהילה בארגונים גדולים','קהילה, נטוורקינג, אירועים',['thursday']],
['אורית לוי','orit@example.com','referral','רוצה להגיע לבעלות עסקים בתחום הבריאות','קשרים עם ספקיות ויזמיות',['tuesday','thursday']],
['מיכל הדר','michal@example.com','referral','מחפשת לקוחות מתחום החינוך וההדרכה','קשרים בחינוך, יזמות',['thursday']],
['קרן בר','keren@example.com','collaboration','מחפשת שותפה לסדנה שמשלבת מכירות ומיתוג','מכירות, הדרכה',['tuesday','thursday']],
['ענת רז','anat@example.com','collaboration','רוצה לבנות וובינר משותף לקהלים משלימים','עיצוב, מיתוג, קריאייטיב',['thursday']],
['הילה מור','hila@example.com','collaboration','מחפשת מישהי עם קהל עצמאי לשיתוף פעולה קטן','תוכן, הרצאות, שיווק',['thursday']],
['אפרת גל','efrat@example.com','feedback','רוצה משוב על הצעת מחיר לפני שליחה','פיננסים, שירות לקוחות',['thursday']],
['תמר רם','tamar@example.com','problem','צריכה לקבל החלטה לגבי גיוס עובדת ראשונה','HR, ניהול, תהליכים',['thursday']]
];state.requests=demos.map((d,i)=>({id:`demo_req_${i+1}`,name:d[0],email:d[1],recipe:d[2],need:d[3],offer:d[4],slots:d[5],committed:true,status:'submitted',createdAt:new Date().toISOString()}));write(STORE.requests,state.requests);state.sessions=[];write(STORE.sessions,state.sessions);renderManager()}
function loadDemoRooms(){state.rooms=Array.from({length:8},(_,i)=>({id:`room_${i+1}`,name:`Spark Room ${i+1}`,url:`https://example.com/spark-room-${i+1}`,demo:true}));write(STORE.rooms,state.rooms);renderManager()}
function parseCsv(text){const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(x=>x.trim());if(lines.length<2)return[];const split=line=>{const out=[];let cur='',q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(c===','&&!q){out.push(cur.trim());cur=''}else cur+=c}out.push(cur.trim());return out};const headers=split(lines[0]).map(h=>h.toLowerCase());const nameIdx=headers.findIndex(h=>/room|name|title|חדר|שם/.test(h));const urlIdx=headers.findIndex(h=>/url|link|href|כתובת|קישור/.test(h));if(urlIdx<0)return[];return lines.slice(1).map((line,i)=>{const cols=split(line);const url=cols[urlIdx]||'';if(!/^https?:\/\//i.test(url))return null;return{id:uid('room'),name:(nameIdx>=0?cols[nameIdx]:'')||`Room ${i+1}`,url}}).filter(Boolean)}

function tokenize(s){return String(s||'').toLowerCase().split(/[^א-תa-z0-9]+/i).filter(x=>x.length>2)}
function complement(a,b){const need=tokenize(a.need),offer=tokenize(b.offer);let score=0;need.forEach(n=>offer.forEach(o=>{if(n===o||n.includes(o)||o.includes(n))score+=3}));return score}
function orderGroup(candidates){if(candidates.length<2)return candidates;const anchor=candidates[0],rest=candidates.slice(1).sort((a,b)=>(complement(anchor,b)+complement(b,anchor))-(complement(anchor,a)+complement(a,anchor)));return[anchor,...rest]}
function buildSessions(){
  const unassigned=new Map(state.requests.map(r=>[r.id,r]));const sessions=[];const slots=['tuesday','thursday'];
  Object.values(RECIPES).forEach(recipe=>{
    const eligible=()=>[...unassigned.values()].filter(r=>r.recipe===recipe.id);
    while(eligible().length>=recipe.min){
      const options=slots.map(slot=>({slot,cands:eligible().filter(r=>r.slots.includes(slot))})).filter(x=>x.cands.length>=recipe.min).sort((a,b)=>b.cands.length-a.cands.length);
      if(!options.length)break;const chosen=options[0];const size=Math.min(recipe.ideal,chosen.cands.length);let group=orderGroup(chosen.cands.slice(0,size));
      group.forEach(r=>unassigned.delete(r.id));sessions.push({id:uid('session'),recipe:recipe.id,slot:chosen.slot,startsAt:slotDate(chosen.slot).toISOString(),participants:group.map(r=>r.id),roomId:null,status:'draft',inviteStatus:'not_sent'});
    }
  });
  const occupancy={};sessions.forEach(s=>{const key=s.slot;occupancy[key]=(occupancy[key]||0);const room=state.rooms[occupancy[key] % Math.max(1,state.rooms.length)];if(room){s.roomId=room.id;s.status='ready'}else{s.status='needs_room'}occupancy[key]++});
  state.sessions=sessions;write(STORE.sessions,state.sessions);renderManager();
}
function requestById(id){return state.requests.find(r=>r.id===id)}
function roomById(id){return state.rooms.find(r=>r.id===id)}
function unmatched(){const used=new Set(state.sessions.flatMap(s=>s.participants));return state.requests.filter(r=>!used.has(r.id))}
function readiness(s){const recipe=RECIPES[s.recipe];if(s.participants.length<recipe.min)return'attention';if(!s.roomId)return'attention';return'ready'}

function renderManager(){
  const ready=state.sessions.filter(s=>readiness(s)==='ready'),attention=state.sessions.filter(s=>readiness(s)==='attention'),missed=unmatched();
  $('managerMetrics').innerHTML=`<div class="metric-card highlight"><small>Requests</small><b>${state.requests.length}</b><span>בקשות מחויבות</span></div><div class="metric-card"><small>Ready sessions</small><b>${ready.length}</b><span>קבוצות מוכנות</span></div><div class="metric-card"><small>Needs attention</small><b>${attention.length}</b><span>דורשות החלטה</span></div><div class="metric-card"><small>Unmatched</small><b>${missed.length}</b><span>טרם שובצו</span></div><div class="metric-card"><small>Rooms</small><b>${state.rooms.length}</b><span>חדרים זמינים</span></div>`;
  $('roomCountLabel').textContent=`${state.rooms.length} חדרים נטענו`;$('readyCount').textContent=ready.length;$('attentionCount').textContent=attention.length;$('unmatchedCount').textContent=missed.length;
  $('readySessions').classList.toggle('empty-state',!ready.length);$('attentionSessions').classList.toggle('empty-state',!attention.length);$('unmatchedRequests').classList.toggle('empty-state',!missed.length);
  $('readySessions').innerHTML=ready.length?ready.map(s=>sessionCard(s,'ready')).join(''):'עוד לא נוצרו קבוצות.';
  $('attentionSessions').innerHTML=attention.length?attention.map(s=>sessionCard(s,'attention')).join(''):'אין כרגע חריגים.';
  $('unmatchedRequests').innerHTML=missed.length?missed.map(r=>`<div class="request-mini"><b>${esc(r.name)} · ${RECIPES[r.recipe].short}</b><span>${esc(r.need)}</span><span>${r.slots.map(slotLabel).join(' · ')}</span></div>`).join(''):'כל הבקשות שובצו.';
  document.querySelectorAll('[data-calendar]').forEach(b=>b.onclick=()=>openCalendar(b.dataset.calendar));document.querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>openInteraction(b.dataset.preview));
}
function sessionCard(s,kind){const r=RECIPES[s.recipe],participants=s.participants.map(requestById).filter(Boolean),room=roomById(s.roomId);return`<article class="session-card ${kind}"><div class="session-top"><span class="recipe-pill">${r.icon} ${r.name}</span><span class="status-pill">${kind==='ready'?'✓ מוכן':'דורש טיפול'}</span></div><h3>${slotLabel(s.slot)} · ${r.duration} דק׳</h3><div class="session-meta">${participants.length} משתתפות · ${r.short}</div><div class="participants">${participants.map(p=>`<div class="participant-row"><b>${esc(p.name)}</b><span>${esc(p.email)}</span></div>`).join('')}</div><div class="room-row"><span>חדר</span><b class="${room?'':'room-missing'}">${room?esc(room.name):'חסר URL לחדר'}</b></div><div class="session-actions">${kind==='ready'?`<button class="send-ready" data-calendar="${s.id}">פתיחת זימון מוכן</button>`:''}<button data-preview="${s.id}">Preview interaction</button></div></article>`}
function dateForCalendar(d){return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`}
function openCalendar(sessionId){const s=state.sessions.find(x=>x.id===sessionId);if(!s)return;const r=RECIPES[s.recipe],people=s.participants.map(requestById).filter(Boolean),room=roomById(s.roomId);const start=slotDate(s.slot),end=new Date(start.getTime()+r.duration*60000);const title=`Spark Session · ${r.name}`;const details=`מועדון נשות עסקים × Sparkco\n\n${r.description}\n\nמשתתפות: ${people.map(p=>p.name).join(', ')}\n\nכניסה לחדר: ${room?.url||''}`;const q=new URLSearchParams({action:'TEMPLATE',text:title,dates:`${dateForCalendar(start)}/${dateForCalendar(end)}`,details,location:room?.url||''});people.forEach(p=>q.append('add',p.email));window.open(`https://calendar.google.com/calendar/render?${q.toString()}`,'_blank','noopener,noreferrer')}
function openInteraction(sessionId){const s=state.sessions.find(x=>x.id===sessionId);if(!s)return;window.open(`peer-value-lab.html?embed=true&recipe=${encodeURIComponent(s.recipe)}&session=${encodeURIComponent(s.id)}`,'_blank','noopener,noreferrer')}

$('memberViewBtn').onclick=()=>showView('member');$('managerViewBtn').onclick=()=>showView('manager');$('requestForm').addEventListener('submit',submitRequest);$('fillDemoRequestBtn').onclick=fillDemoRequest;$('closeSuccessBtn').onclick=()=>$('requestSuccess').classList.add('hidden');$('loadDemoBtn').onclick=loadDemoRequests;$('buildSessionsBtn').onclick=buildSessions;$('loadDemoRoomsBtn').onclick=loadDemoRooms;$('importRoomsBtn').onclick=()=>$('roomsCsvInput').click();$('roomsCsvInput').onchange=e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{const rooms=parseCsv(String(reader.result||''));if(!rooms.length){alert('לא מצאתי עמודת URL תקינה בקובץ. נסי CSV עם עמודות room/name ו־url.');return}state.rooms=rooms;write(STORE.rooms,state.rooms);renderManager();};reader.readAsText(file)};

initDates();renderRecipes();renderManager();