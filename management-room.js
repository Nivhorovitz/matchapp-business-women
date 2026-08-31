const SUPABASE_URL='https://cmtbwohbktirmplieeeq.supabase.co';
const SUPABASE_KEY='sb_publishable_tk18F8g4AS7oQF9eV9qGQw_nONj_xiX';
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=id=>document.getElementById(id);
const embedded=window.self!==window.top||new URLSearchParams(location.search).get('embed')==='1';if(embedded)document.body.classList.add('embed');
const recipeNames={problem:'Business Problem Clinic',referral:'Referral Exchange',feedback:'Feedback Lab',collaboration:'Collaboration Builder'};
let state={cycle:null,requests:[],rooms:[],sessions:[],unmatched:[],demo:true};
const demoRequests=[
{name:'נועה',recipe:'feedback',need:'דיוק חבילת ליווי חדשה',slots:['tuesday']},{name:'דנה',recipe:'feedback',need:'משוב על פיץ׳ לארגונים',slots:['tuesday']},{name:'רוני',recipe:'feedback',need:'בדיקת מסר לשירות חדש',slots:['tuesday']},{name:'לירון',recipe:'feedback',need:'משוב על דף מסר',slots:['tuesday']},{name:'עדי',recipe:'referral',need:'חיבור למנהלות HR',slots:['thursday']},{name:'שירה',recipe:'referral',need:'מנהלות קהילה בארגונים',slots:['thursday']},{name:'אורית',recipe:'referral',need:'בעלות עסקים בתחום הבריאות',slots:['thursday']}];
const demoSessions=[
{recipe:'feedback',slot:'tuesday',members:[{name:'נועה'},{name:'דנה'},{name:'רוני'},{name:'לירון'}],reason:'נבחר שילוב של מומחיות בשיווק, מסרים ומוצר שמאפשר משוב מזוויות שונות.',score:78},
{recipe:'referral',slot:'thursday',members:[{name:'עדי'},{name:'שירה'},{name:'אורית'}],reason:'נבחר שילוב של רשתות וגישה לקהלים משלימים עם פוטנציאל להפניות הדדיות.',score:71}
];
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function metric(label,value){return`<div class="metric"><small>${esc(label)}</small><strong>${esc(value)}</strong></div>`}
function render(){
 const ready=state.sessions.filter(s=>!s.attention),att=state.sessions.filter(s=>s.attention),un=state.unmatched;
 $('modeChip').textContent=state.demo?'מצב הדגמה':'LIVE';
 $('metrics').innerHTML=[metric('Requests',state.requests.length),metric('Ready',ready.length),metric('Needs attention',att.length),metric('Unmatched',un.length),metric('Rooms',state.rooms.length)].join('');
 $('roomCount').textContent=`${state.rooms.length} חדרים`;$('readyCount').textContent=ready.length;$('attentionCount').textContent=att.length;$('unmatchedCount').textContent=un.length;
 $('readyList').innerHTML=ready.length?ready.map(sessionCard).join(''):'<div class="empty">אין כרגע קבוצות מוכנות.</div>';
 $('attentionList').innerHTML=att.length?att.map(sessionCard).join(''):'<div class="empty">אין חריגים שדורשים החלטה.</div>';
 $('unmatchedList').innerHTML=un.length?un.map(x=>`<div class="unmatched-item"><b>${esc(x.name||'חברה')}</b><span>${esc(recipeNames[x.recipe]||x.recipe)} · ${esc((x.slots||[]).join(' / '))}</span></div>`).join(''):'<div class="empty">כל הבקשות שובצו.</div>';
 $('authNotice').classList.toggle('hidden',!state.demo);
}
function sessionCard(s){return`<article class="session"><div class="session-top"><span class="recipe">${esc(recipeNames[s.recipe]||s.recipe)}</span><span class="slot">${s.slot==='tuesday'?'שלישי · 20:00':'חמישי · 20:00'}</span></div><div class="people">${(s.members||[]).map(p=>`<span class="person">${esc(p.name||'חברה')}</span>`).join('')}</div><div class="reason"><b>למה החיבור הזה?</b><br>${esc(s.reason||'התאמה לפי הצורך השבועי והפרופילים המקצועיים.')}</div><div class="card-actions"><button class="approve" onclick="approveDemo(this)">אישור</button><button class="preview" onclick="previewRecipe('${esc(s.recipe)}')">Preview</button></div></article>`}
window.approveDemo=btn=>{btn.textContent='מאושר ✓';btn.disabled=true};
window.previewRecipe=recipe=>window.open(`peer-value-lab.html?embed=true&recipe=${encodeURIComponent(recipe)}`,'_blank');
async function loadLive(){
 const {data:{session}}=await sb.auth.getSession();if(!session)return false;
 const {data:mgr}=await sb.from('pv_managers').select('id,community_key').eq('auth_user_id',session.user.id).maybeSingle();if(!mgr)return false;
 const {data:cycles}=await sb.from('pv_cycles').select('*').eq('community_key',mgr.community_key).order('week_start',{ascending:false}).limit(1);if(!cycles?.[0])return false;
 state.cycle=cycles[0];state.demo=false;
 const {data:rooms}=await sb.from('pv_rooms').select('id,name,room_url').eq('community_key',mgr.community_key).eq('active',true);state.rooms=rooms||[];
 const {data:orch,error}=await sb.functions.invoke('pv-orchestrate',{body:{cycle_id:state.cycle.id}});
 if(error)throw error;
 state.sessions=(orch.sessions||[]).map(s=>({...s,attention:false}));state.unmatched=orch.unmatched||[];
 const matchedCount=state.sessions.reduce((n,s)=>n+(s.members||[]).length,0);state.requests=Array.from({length:matchedCount+state.unmatched.length},(_,i)=>({id:i}));
 return true;
}
function loadDemo(){state={cycle:null,requests:demoRequests,rooms:Array.from({length:6},(_,i)=>({name:`Spark Room ${i+1}`})),sessions:demoSessions,unmatched:[{name:'מיכל',recipe:'problem',slots:['thursday']}],demo:true};render()}
$('buildBtn').onclick=async()=>{if(state.demo){state.sessions=demoSessions;render();return}try{await loadLive();render()}catch(e){console.error(e);alert('לא הצלחנו ליצור הצעות כרגע.')}};
$('refreshBtn').onclick=async()=>{try{if(await loadLive())render();else loadDemo()}catch(e){console.error(e);loadDemo()}};
$('importRoomsBtn').onclick=()=>$('roomCsv').click();
$('roomCsv').onchange=async e=>{const f=e.target.files?.[0];if(!f)return;const text=await f.text();const rows=parseCsv(text);if(state.demo){state.rooms=rows;render();return}alert('טעינת חדרים ל־DB תופעל לאחר הרשאת המנהלות; הקובץ נקרא תקין עם '+rows.length+' חדרים.')};
function parseCsv(text){const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean);if(lines.length<2)return[];const h=lines[0].split(',').map(x=>x.trim().toLowerCase());const ni=h.findIndex(x=>/room|name|title|חדר|שם/.test(x)),ui=h.findIndex(x=>/url|link|href|קישור/.test(x));if(ui<0)return[];return lines.slice(1).map((l,i)=>{const c=l.split(',');return{name:c[ni]||`Room ${i+1}`,room_url:c[ui]}}).filter(x=>/^https?:\/\//.test(x.room_url))}
(async()=>{try{if(await loadLive())render();else loadDemo()}catch(e){console.error(e);loadDemo()}})();