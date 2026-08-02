const SUPABASE_URL='https://cmtbwohbktirmplieeeq.supabase.co';
const SUPABASE_KEY='sb_publishable_tk18F8g4AS7oQF9eV9qGQw_nONj_xiX';
const DEFAULT_TAXONOMY={"offers":["שיווק אורגני","מכירות","נטוורקינג","בניית הצעה","תמחור","ניהול זמן","סטוריטלינג","שימור לקוחות","פיננסים לעסק","AI לעסק","תכנון אסטרטגי","גיוס לקוחות","שיתופי פעולה","בניית קהילה","פיתוח מוצר","פרזנטציה","ניהול עסק עצמאי","מיתוג אישי"],"needs":["לקוחות חדשים","דיוק הצעת ערך","תרגול שיחת מכירה","שגרת עשייה","העלאת מחירים","נראות ברשת","שותפה לחשיבה","משוב על פיץ׳","התמודדות עם חסמים","ניהול זמן","בניית תוכן","הצעד הבא בעסק","שותפת אחריות","מנטורית מנוסה","שיפור סגירה","תכנית חודשית"],"rooms":["שולחן תרגול מכירות","מעגל מנטוריות","שולחן אחריות","פינת פיץ׳","שולחן שיתופי פעולה","מעגל תמחור והצעה","קפה נטוורקינג","חדר חשיבה עסקית","שולחן תוכן ושיווק","מעגל צמיחה"]};
let sb=null;const $=id=>document.getElementById(id);const state={communityName:'Spark Match - מועדון נשות עסקים',communityId:null,userKey:key(),myProfileId:null,currentType:'',currentTypeLabel:'',selectedTags:[],me:{name:'',title:'',bio:'',photo_url:'',offers:[],needs:[],current_focus:'',braindate_offer:'',ideal_match:'',meeting_style:'',availability:'',openness:'',email:'',phone:''},people:[],saved:[],taxonomy:DEFAULT_TAXONOMY};
function key(){let k=localStorage.getItem('sparkMatchBusinessWomenHeUserKey');if(!k){k=crypto.randomUUID?crypto.randomUUID():Date.now()+Math.random().toString(16);localStorage.setItem('sparkMatchBusinessWomenHeUserKey',k)}return k}
function status(t,c=''){const e=$('dbStatus');if(e){e.textContent=t;e.className='status '+c}}
function arr(v){if(Array.isArray(v))return v.filter(Boolean);if(!v)return[];if(typeof v==='string'){try{const p=JSON.parse(v);if(Array.isArray(p))return p}catch(e){}return v.split(',').map(x=>x.trim()).filter(Boolean)}return[]}
function prof(r){return{id:r.id,user_key:r.user_key,name:r.name||'',title:r.title||'',bio:r.bio||'',photo_url:r.photo_url||r.photo||'',offers:arr(r.offers),needs:arr(r.needs),current_focus:r.current_focus||'',braindate_offer:r.braindate_offer||'',ideal_match:r.ideal_match||'',meeting_style:r.meeting_style||'',availability:r.availability||'',openness:r.openness||'',email:r.email||'',phone:r.phone||''}}
async function init(){try{sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);status('מתחבר...');const {data:c,error:ce}=await sb.from('communities').select('*').eq('name',state.communityName).limit(1).maybeSingle();if(ce)throw ce;if(!c){status('נדרש חיבור קהילה','error');return}state.communityId=c.id;const {data:t}=await sb.from('community_taxonomy').select('*').eq('community_id',state.communityId).limit(1).maybeSingle();if(t)state.taxonomy={offers:arr(t.offers).length?arr(t.offers):DEFAULT_TAXONOMY.offers,needs:arr(t.needs).length?arr(t.needs):DEFAULT_TAXONOMY.needs,rooms:arr(t.rooms).length?arr(t.rooms):DEFAULT_TAXONOMY.rooms};const {data:p}=await sb.from('profiles').select('*').eq('community_id',state.communityId).eq('user_key',state.userKey).limit(1).maybeSingle();if(p){Object.assign(state.me,prof(p));state.myProfileId=p.id;hydrate()}await loadPeople();await loadנשמר();status('מחובר','ok');renderTags();renderAll()}catch(e){console.error(e);status('שגיאת חיבור','error')}}
async function loadPeople(){if(!sb||!state.communityId)return;const {data,error}=await sb.from('profiles').select('*').eq('community_id',state.communityId).order('updated_at',{ascending:false});if(error){console.error(error);return}state.people=(data||[]).map(prof).filter(p=>p.user_key!==state.userKey)}
async function loadנשמר(){if(!sb||!state.myProfileId)return;const {data,error}=await sb.from('saved_connections').select('*').eq('saver_profile_id',state.myProfileId);if(!error)state.saved=data||[]}
function hydrate(){if($('quickName')){$('quickName').value=state.me.name||'';$('quickTitle').value=state.me.title||'';$('quickGoal').value=state.me.current_focus||'';$('quickNeed').value=(state.me.needs||[]).slice(0,3).join(', ');$('quickOffer').value=(state.me.offers||[]).slice(0,3).join(', ')}}
function split(s){return(s||'').split(/,|\n/).map(x=>x.trim()).filter(Boolean)}function uniq(a){return[...new Set((a||[]).filter(Boolean))]}
function collectQuick(){state.me.name=$('quickName').value.trim();state.me.title=$('quickTitle').value.trim();state.me.current_focus=$('quickGoal').value.trim();state.me.bio=state.me.current_focus||state.me.bio;state.me.needs=uniq([state.currentTypeLabel,...state.selectedTags,...split($('quickNeed').value)]);state.me.offers=uniq(split($('quickOffer').value));state.me.braindate_offer=state.me.offers.join(', ');state.me.meeting_style=state.currentType==='practice'?'תרגול של 30 דקות':state.currentType==='accountability'?'שיחת אחריות קצרה':state.currentType==='mentor'?'שיחת עומק עם מנטורית':''}
function collectFull(){if(!$('profileName'))return;const has=$('profileName').value||$('profileTitle').value||$('profileBio').value||$('profileGoal').value||$('profileOffer').value||$('profileNeed').value;if(!has)return;state.me.name=$('profileName').value.trim();state.me.title=$('profileTitle').value.trim();state.me.bio=$('profileBio').value.trim();state.me.current_focus=$('profileGoal').value.trim();state.me.offers=split($('profileOffer').value);state.me.needs=split($('profileNeed').value);state.me.email=$('profileEmail').value.trim();state.me.phone=$('profilePhone').value.trim()}
async function saveProfile(){
  if(!sb||!state.communityId){status('שגיאת חיבור','error');return null}
  collectFull();
  status('שומר...');
  const minimal={
    community_id:state.communityId,
    user_key:state.userKey,
    name:state.me.name||'Guest',
    title:state.me.title||'',
    bio:state.me.bio||state.me.current_focus||'',
    offers:state.me.offers||[],
    needs:state.me.needs||[],
    current_focus:state.me.current_focus||'',
    braindate_offer:state.me.braindate_offer||'',
    updated_at:new Date().toISOString()
  };
  let res = await sb.from('profiles').upsert(minimal,{onConflict:'community_id,user_key'}).select('*').single();
  if(res.error){
    console.warn('Minimal upsert failed, trying select/update fallback',res.error);
    const found = await sb.from('profiles').select('id').eq('community_id',state.communityId).eq('user_key',state.userKey).limit(1).maybeSingle();
    if(found.data && found.data.id){
      res = await sb.from('profiles').update(minimal).eq('id',found.data.id).select('*').single();
    }else{
      res = await sb.from('profiles').insert(minimal).select('*').single();
    }
  }
  if(res.error){
    console.error('Save profile failed:',res.error);
    status('שגיאת שמירה','error');
    alert('Save failed: '+(res.error.message||'שגיאת מבנה ב־Supabase'));
    return null;
  }
  Object.assign(state.me,prof(res.data));
  state.myProfileId=res.data.id;
  await loadPeople();
  await loadנשמר();
  status('נשמר','ok');
  return state.me;
}
function score(p){const need=(state.me.needs||[]).join(' ').toLowerCase(),goal=(state.me.current_focus||'').toLowerCase();let s=10;const c=[p.offers.join(' '),p.needs.join(' '),p.current_focus,p.bio,p.braindate_offer].join(' ').toLowerCase();(state.me.needs||[]).forEach(n=>{if(c.includes(String(n).toLowerCase()))s+=18});(p.offers||[]).forEach(o=>{o=String(o).toLowerCase();if(need.includes(o)||goal.includes(o.split(' ')[0]))s+=14});if(state.currentType==='practice'&&c.includes('practice'))s+=18;if(state.currentType==='practice'&&c.includes('role'))s+=12;if(state.currentType==='accountability'&&c.includes('accountability'))s+=22;if(state.currentType==='mentor'&&(c.includes('mentor')||c.includes('coach')||c.includes('founder')))s+=18;if(p.photo_url)s+=4;if(p.current_focus)s+=5;return Math.min(99,s)}
function rec(n=3){return[...state.people].map(p=>({...p,score:score(p)})).sort((a,b)=>b.score-a.score).slice(0,n)}function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}function initls(n){return(n||'SM').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}function first(n){return(n||'').trim().split(/\s+/)[0]}
function why(p){
const o=(p.offers||[]).slice(0,2).join(', ');
if(state.currentType==='practice')return`${p.name||'החברה הזו'} יכולה להתאים לתרגול ממוקד ולקבלת משוב, במיוחד סביב ${o||'שיחה עסקית'}.`;
if(state.currentType==='accountability')return`${p.name||'החברה הזו'} יכולה לעזור לך לשמור על קצב, מחויבות ותנועה קדימה סביב המטרה העסקית שלך.`;
if(state.currentType==='mentor')return`${p.name||'החברה הזו'} יכולה לעזור לך לראות את הצעד הבא בעסק בבהירות ובביטחון.`;
return`${p.name||'החברה הזו'} נראית רלוונטית למה שאת צריכה עכשיו.`;
}
function card(p){const img=p.photo_url?`<img src="${esc(p.photo_url)}">`:initls(p.name);const offers=(p.offers||[]).slice(0,3).join(', ')||'שיחה עסקית';const goal=p.current_focus||p.bio||'פתוחה לשיחה עסקית ממוקדת.';return`<article class="match"><div class="mhead"><div class="avatar">${img}</div><div><h3>${esc(first(p.name)||'Member')}</h3><p class="role">${esc(p.title||'חברת קהילה')}</p></div></div><p class="section"><strong>מטרה נוכחית:</strong><br>${esc(goal)}</p><p class="section"><strong>יכולה לעזור ב:</strong><br>${esc(offers)}</p><div class="why">${esc(why(p))}</div><div class="cardactions"><button class="primary" onclick="openMeetingModal('${p.id}')">קביעת מפגש</button><button class="soft" onclick="savePerson('${p.id}')">שמירה</button></div></article>`}
function render(target='resultsList',n=3){const el=$(target);if(!el)return;const list=rec(n);el.innerHTML=list.length?list.map(card).join(''):`<div class="empty">עדיין אין מספיק פרופילים בקהילה. שמרי פרופיל והוסיפי כמה חברות, ואז Spark Match יתחיל להציע התאמות.</div>`}
function renderAll(){render('allMatchesList',6)}function renderנשמר(){const el=$('savedList');if(!el)return;const ids=state.saved.map(s=>s.saved_profile_id);const people=state.people.filter(p=>ids.includes(p.id));el.innerHTML=people.length?people.map(card).join(''):`<div class="empty">עדיין אין חיבורים שמורים. מצאי התאמה ולחצי שמירה.</div>`}
function renderProfile(){['Name','Title','Bio','Goal','Offer','Need','Email','Phone'].forEach(()=>{});$('profileName').value=state.me.name||'';$('profileTitle').value=state.me.title||'';$('profileBio').value=state.me.bio||'';$('profileGoal').value=state.me.current_focus||'';$('profileOffer').value=(state.me.offers||[]).join(', ');$('profileNeed').value=(state.me.needs||[]).join(', ');$('profileEmail').value=state.me.email||'';$('profilePhone').value=state.me.phone||''}
function counts(a){const m={};(a||[]).forEach(x=>{if(x)m[x]=(m[x]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])}function renderAdmin(){const el=$('adminSignals');if(!el)return;const needs=counts(state.people.flatMap(p=>p.needs)),offers=counts(state.people.flatMap(p=>p.offers));el.innerHTML=`<div class="signal"><strong>${state.people.length+(state.myProfileId?1:0)}</strong><p>Profiles in this community</p></div><div class="signal"><strong>${esc(needs[0]?.[0]||'—')}</strong><p>Top need</p></div><div class="signal"><strong>${esc(offers[0]?.[0]||'—')}</strong><p>Top strength</p></div>`}
async function ensure(){collectQuick();return await saveProfile()}async function savePerson(id){const me=await ensure();if(!me)return;const {error}=await sb.from('saved_connections').upsert({saver_profile_id:state.myProfileId,saved_profile_id:id,status:'saved'});if(error){console.error(error);alert('Could not save match.');return}await loadנשמר();status('נשמר match','ok')}async function invitePerson(id){const me=await ensure();if(!me)return;const p=state.people.find(x=>x.id===id);const {error}=await sb.from('invites').insert({community_id:state.communityId,sender_profile_id:state.myProfileId,receiver_profile_id:id,title:`${first(state.me.name)||'מישהי'} הזמינה אותך ל־Spark Match`,message:`I'd love to meet for a focused sales practice conversation.`,proposed_times:'',status:'sent'});if(error){console.error(error);alert('Could not create invite.');return}status('ההזמנה נשלחה','ok');alert(`Invite created for ${first(p?.name)||'this member'}.`)}
function showView(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));$('view-'+v)?.classList.add('active');document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===v));if(v==='matches')renderAll();if(v==='saved')renderנשמר();if(v==='profile')renderProfile();if(v==='admin')renderAdmin()}function showStep(id){['welcome','choose','questions','results'].forEach(x=>$(x)?.classList.add('hidden'));$(id)?.classList.remove('hidden')}
function renderTags(){const row=$('quickTags');if(!row)return;const set=state.currentType==='practice'?['שותפת תרגול','התמודדות עם התנגדות מחיר','שאלות גילוי טובות יותר','שיחת סגירה','תרגול פיץ׳']:state.currentType==='accountability'?['שותפת אחריות','מעקב עקבי','בדיקת הזדמנויות','סדר ומעקב לקוחות','שיטת פולואפ']:['מנטורית','ביטחון בתמחור','מכירה כבעלת עסק','דיוק הצעת ערך','מכירת הצעת פרימיום'];row.innerHTML=set.map(t=>`<button class="tag ${state.selectedTags.includes(t)?'selected':''}" data-tag="${esc(t)}">${esc(t)}</button>`).join('');row.querySelectorAll('.tag').forEach(b=>b.onclick=()=>{const t=b.dataset.tag;state.selectedTags=state.selectedTags.includes(t)?state.selectedTags.filter(x=>x!==t):[...state.selectedTags,t];renderTags()})}
function choose(type){state.currentType=type;state.currentTypeLabel=type==='practice'?'שותפת תרגול':type==='accountability'?'שותפת אחריות':'מנטורית';$('questionTitle').textContent=type==='practice'?'מה תרצי לתרגל?':type==='accountability'?'איפה יעזור לך לשמור על קצב?':'איזו הכוונה תעזור לך עכשיו?';renderTags();hydrate();showStep('questions')}
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>showView(b.dataset.view));$('start').onclick=()=>showStep('choose');$('goMatches').onclick=()=>showView('matches');$('back').onclick=()=>showStep('choose');$('again').onclick=()=>showStep('welcome');$('saveQuick').onclick=async()=>{collectQuick();await saveProfile()};$('saveFull').onclick=async()=>{collectFull();await saveProfile()};$('find').onclick=async()=>{collectQuick();await saveProfile();render('resultsList',3);showStep('results')};document.querySelectorAll('.choices article').forEach(c=>c.onclick=()=>choose(c.dataset.type));if(new URLSearchParams(location.search).get('admin')==='true'){const b=document.createElement('button');b.className='nav secondary';b.dataset.view='admin';b.textContent='Coach';b.onclick=()=>showView('admin');document.querySelector('nav')?.appendChild(b)}
let pendingInvitePersonId=null;
const DEMO_PROFILES=[{"name":"נועה","title":"יועצת שיווק לבעלות עסקים","bio":"אני עוזרת לעצמאיות לבנות מסר ברור ולהביא לקוחות דרך תוכן פשוט ועקבי.","offers":["שיווק אורגני","בניית תוכן","מיתוג אישי"],"needs":["שותפת אחריות","תכנית חודשית"],"current_focus":"לבנות שגרת תוכן חודשית שמביאה פניות איכותיות.","braindate_offer":"אני יכולה לעזור לדייק מסר, נראות ותוכן."},{"name":"יעל","title":"מאמנת עסקית לעצמאיות","bio":"אני מלווה נשים שמרגישות שיש להן עסק טוב אבל חסר להן סדר, ביטחון וקצב.","offers":["ניהול זמן","שגרת עשייה","התמודדות עם חסמים"],"needs":["לקוחות חדשים","נטוורקינג"],"current_focus":"להגדיל מעגל לקוחות בלי להעמיס על עצמי.","braindate_offer":"אני יכולה להחזיק שיחת אחריות קצרה וממוקדת."},{"name":"דנה","title":"מומחית מכירות ושיחות ייעוץ","bio":"אני עוזרת לבעלות עסקים להציג ערך, לדבר על מחיר ולסגור שיחה בביטחון.","offers":["מכירות","תמחור","שיפור סגירה"],"needs":["שיתופי פעולה","נראות ברשת"],"current_focus":"לדייק את שיחת המכירה שלי ולשפר אחוזי סגירה.","braindate_offer":"אני יכולה לתרגל שיחת מכירה ולתת משוב פרקטי."},{"name":"מיכל","title":"בעלת סטודיו לעיצוב ומיתוג","bio":"אני עובדת עם עסקים קטנים על זהות ויזואלית, חוויית מותג והצגת ערך.","offers":["מיתוג אישי","פרזנטציה","סטוריטלינג"],"needs":["דיוק הצעת ערך","העלאת מחירים"],"current_focus":"להפוך שירותים לפרמיום ולהסביר טוב יותר את הערך.","braindate_offer":"אני יכולה לתת משוב על נראות, מסר ופיץ׳."},{"name":"ליאת","title":"יזמת ומובילת קהילה","bio":"אני בונה קהילות ותהליכים שמייצרים חיבור, ערך ושותפויות בין נשים.","offers":["בניית קהילה","שיתופי פעולה","תכנון אסטרטגי"],"needs":["AI לעסק","פיתוח מוצר"],"current_focus":"לפתח הצעה חדשה למועדון ולייצר יותר מעורבות.","braindate_offer":"אני יכולה לעזור לחשוב על שיתופי פעולה וקהילה."}];
function openMeetingModal(id){pendingInvitePersonId=id;const p=state.people.find(x=>x.id===id);const n=typeof first==='function'?first(p?.name):((p?.name||'').split(/\s+/)[0]);if($('meetingPersonName'))$('meetingPersonName').textContent=p?`להזמין את ${n} לחיבור`:'שליחת הזמנה';$('meetingModal')?.classList.remove('hidden')}
function closeMeetingModal(){pendingInvitePersonId=null;$('meetingModal')?.classList.add('hidden')}
function mtimes(){return [$('meetingTime1')?.value,$('meetingTime2')?.value,$('meetingTime3')?.value].map(x=>(x||'').trim()).filter(Boolean).join(' | ')}
async function sendScheduledInvite(){
  if(!pendingInvitePersonId)return;
  const me=await ensure();
  if(!me||!state.myProfileId){alert('Could not save your profile before creating the invite.');return}
  const p=state.people.find(x=>x.id===pendingInvitePersonId);
  const times=mtimes();
  const msg=($('meetingMessage') && $('meetingMessage').value ? $('meetingMessage').value : '').trim()||'רוצה להיפגש לשיחה ממוקדת סביב העסק, תרגול או חשיבה משותפת?';
  const full=`${msg}\n\nמקום המפגש: בתוך החדר · שולחן Spark Match${times?'\nזמנים מוצעים: '+times:''}`;
  let payload={community_id:state.communityId,sender_profile_id:state.myProfileId,receiver_profile_id:pendingInvitePersonId,title:`${first(state.me.name)||'מישהי'} הזמינה אותך ל־Spark Match`,message:full,proposed_times:times,status:'sent'};
  let res=await sb.from('invites').insert(payload);
  if(res.error){
    console.warn('Full invite insert failed, trying minimal invite',res.error);
    payload={community_id:state.communityId,sender_profile_id:state.myProfileId,receiver_profile_id:pendingInvitePersonId,title:`${first(state.me.name)||'מישהי'} הזמינה אותך ל־Spark Match`,message:full,status:'sent'};
    res=await sb.from('invites').insert(payload);
  }
  if(res.error){console.error('Invite failed:',res.error);alert('לא הצלחתי ליצור הזמנה: '+(res.error.message||'שגיאת מבנה ב־Supabase'));return}
  status('ההזמנה נשלחה','ok');
  alert(`נוצרה הזמנה עבור ${first(p&&p.name)||'החברה הזו'}. היפגשו בתוך החדר סביב שולחן Spark Match.`);
  closeMeetingModal();
}
async function meetNow(){
  if(!pendingInvitePersonId)return;
  const me=await ensure();
  if(!me||!state.myProfileId){alert('Could not save your profile before creating the invite.');return}
  const p=state.people.find(x=>x.id===pendingInvitePersonId);
  let payload={community_id:state.communityId,sender_profile_id:state.myProfileId,receiver_profile_id:pendingInvitePersonId,title:'קביעת מפגש at the Spark Match table',message:'אני בחדר עכשיו. רוצה להיפגש סביב שולחן Spark Match לשיחה עסקית ממוקדת?',proposed_times:'Now · Spark Match table',status:'sent'};
  let res=await sb.from('invites').insert(payload);
  if(res.error){
    console.warn('Full meet-now insert failed, trying minimal invite',res.error);
    payload={community_id:state.communityId,sender_profile_id:state.myProfileId,receiver_profile_id:pendingInvitePersonId,title:'קביעת מפגש at the Spark Match table',message:'אני בחדר עכשיו. רוצה להיפגש סביב שולחן Spark Match לשיחה עסקית ממוקדת?',status:'sent'};
    res=await sb.from('invites').insert(payload);
  }
  if(res.error){console.error('קביעת מפגש failed:',res.error);alert('לא הצלחתי ליצור הזמנה: '+(res.error.message||'שגיאת מבנה ב־Supabase'));return}
  status('הזמנה מיידית נשלחה','ok');
  alert(`קביעת מפגש invite created for ${first(p&&p.name)||'this member'}. Go to the Spark Match table in this room.`);
  closeMeetingModal();
}
async function seedDemoProfiles(){if(!sb||!state.communityId){alert('Supabase is not connected yet.');return}status('יוצר פרופילי דמו...');const rows=DEMO_PROFILES.map((p,i)=>({community_id:state.communityId,user_key:`demo-bw-he-${i+1}`,name:p.name,title:p.title,bio:p.bio,photo_url:'',offers:p.offers,needs:p.needs,current_focus:p.current_focus,braindate_offer:p.braindate_offer,ideal_match:'',meeting_style:i%2===0?'תרגול של 30 דקות':'שיחת אחריות קצרה',availability:'זמינות דמו',openness:'פתוחה לחיבורים בקהילה',updated_at:new Date().toISOString()}));const {error}=await sb.from('profiles').upsert(rows,{onConflict:'community_id,user_key'});if(error){console.error(error);status('שגיאת דמו','error');alert('לא הצלחתי ליצור פרופילי דמו.');return}await loadPeople();renderAll();status('פרופילי דמו נוצרו','ok');alert('פרופילי דמו נוצרו. You can now test Spark Match recommendations.')}
function initMeetingAndDemoControls(){$('closeMeetingModal')?.addEventListener('click',closeMeetingModal);$('sendScheduledInvite')?.addEventListener('click',sendScheduledInvite);$('meetNowBtn')?.addEventListener('click',meetNow);$('meetingModal')?.addEventListener('click',e=>{if(e.target.id==='meetingModal')closeMeetingModal()});$('seedDemoProfiles')?.addEventListener('click',seedDemoProfiles);if(new URLSearchParams(location.search).get('demo')==='true')document.querySelectorAll('.demo-only').forEach(el=>el.classList.remove('hidden'))}
initMeetingAndDemoControls();init();


function initDemoVisibilityV23(){
  const isDemo = new URLSearchParams(location.search).get('demo') === 'true';
  if(isDemo){
    document.querySelectorAll('.demo-only').forEach(el => el.classList.remove('hidden'));
  }
  document.getElementById('seedDemoProfiles')?.addEventListener('click', seedDemoProfiles);
  document.getElementById('seedDemoProfilesTop')?.addEventListener('click', seedDemoProfiles);
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initDemoVisibilityV23);
}else{
  initDemoVisibilityV23();
}
