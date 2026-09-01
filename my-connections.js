const SUPABASE_URL='https://cmtbwohbktirmplieeeq.supabase.co';
const SUPABASE_KEY='sb_publishable_tk18F8g4AS7oQF9eV9qGQw_nONj_xiX';
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=id=>document.getElementById(id);
const params=new URLSearchParams(location.search);
const embedded=window.self!==window.top||params.get('embed')==='1';
if(embedded)document.body.classList.add('embed');
const recipeNames={problem:'Business Problem Clinic',referral:'Referral Exchange',feedback:'Feedback Lab',collaboration:'Collaboration Builder'};
const demo={member:{name:'נועה לוי'},profile:{title:'יועצת שיווק וצמיחה',bio:'עוזרת לעסקים מבוססי מומחיות לחדד הצעה ולבנות מנוע צמיחה.',expertise:['שיווק אורגני','בניית קהילה','הצעת ערך'],offers:['משוב על מסרים','חיבור לקהילות'],current_focus:'להיכנס יותר לעבודה עם חברות וארגונים',profile_completeness:82},request:{recipe:'feedback',need_text:'אני רוצה משוב על חבילת ליווי חדשה לפני שאני יוצאת איתה לשוק.',offer_text:'שיווק אורגני, תוכן ובניית קהילה',slots:['tuesday','thursday'],status:'submitted'},session:{recipe:'feedback',starts_at:new Date(Date.now()+86400000*2).toISOString(),duration_minutes:20,status:'confirmed',room_url:'#'},values:[{value_type:'feedback',note:'קיבלתי דיוק משמעותי במסר ובתמחור'},{value_type:'referral',note:'נוצר חיבור ללקוחה פוטנציאלית'},{value_type:'followup',note:'נקבעה שיחת המשך עם חברה מהקבוצה'}]};
function fmtDate(iso){try{return new Intl.DateTimeFormat('he-IL',{weekday:'long',day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso))}catch{return''}}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function render(data,isDemo=false){
  const m=data.member||{},p=data.profile||{},r=data.request||null,s=data.session||null,vals=data.values||[];
  $('modeChip').textContent=isDemo?'מצב הדגמה':'מחובר';
  $('helloTitle').textContent=m.name?`היי ${String(m.name).split(/\s+/)[0]}, מה יכול לקדם אותך השבוע?`:'הקהילה עובדת בשבילך גם בין המפגשים.';
  $('valueCount').textContent=vals.length;
  $('profilePct').textContent=(p.profile_completeness||0)+'%';
  $('profileContent').innerHTML=`<p class="profile-summary">${esc(p.title||p.bio||'ככל שהפרופיל עשיר יותר, Sparkco יכולה לבנות חיבורים מדויקים יותר.')}</p><div class="profile-tags">${[...(p.expertise||[]),...(p.offers||[])].slice(0,6).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>${p.current_focus?`<div class="request-box" style="margin-top:12px"><b>המיקוד שלי עכשיו</b><p>${esc(p.current_focus)}</p></div>`:''}`;
  if(r){$('requestStatus').textContent=r.status==='matched'?'שובצתי':'נשלח';$('weeklyContent').innerHTML=`<div class="request-box"><b>${esc(recipeNames[r.recipe]||r.recipe)}</b><p>${esc(r.need_text)}</p></div><div class="meta-row">${(r.slots||[]).map(x=>`<span class="meta">${x==='tuesday'?'שלישי 20:00':'חמישי 20:00'}</span>`).join('')}<span class="meta">אני יכולה לתת: ${esc(r.offer_text)}</span></div>`;$('weeklyAction').textContent='עדכון הבקשה השבועית'}else{$('weeklyContent').innerHTML='<div class="empty">עדיין לא שלחת בקשה למחזור השבועי. זה המקום להגיד לקהילה מה באמת יעזור לך עכשיו.</div>'}
  if(s){$('sessionContent').innerHTML=`<div class="session-main"><div class="recipe">${esc(recipeNames[s.recipe]||s.recipe)}</div><div class="time">${esc(fmtDate(s.starts_at))}</div><p>${s.duration_minutes||20} דקות · Spark Session</p>${s.reason?`<div class="request-box"><b>למה החיבור הזה?</b><p>${esc(s.reason)}</p></div>`:''}</div>${s.room_url&&s.room_url!=='#'?`<a class="primary full" href="${esc(s.room_url)}" target="_top">כניסה לחדר</a>`:''}`}else{$('sessionContent').innerHTML='<div class="empty">אין כרגע Spark Session מאושר. ברגע שהקבוצה תיבנה, כל הפרטים יופיעו כאן.</div>'}
  $('historyContent').innerHTML=vals.length?`<div class="history-list">${vals.slice(0,5).map(v=>`<div class="history-item"><div class="history-icon">✓</div><div><b>${esc(labelValue(v.value_type))}</b><span>${esc(v.note||'נוצר ערך במפגש')}</span></div></div>`).join('')}</div>`:'<div class="empty">אחרי Spark Sessions, ההפניות, המשובים, שיתופי הפעולה וה־follow-ups שלך ייאספו כאן.</div>';
  $('authNotice').classList.toggle('hidden',!isDemo);
}
function renderLoggedOut(){
  $('modeChip').textContent='נדרשת כניסה';
  $('helloTitle').textContent='החיבורים האישיים שלך יופיעו כאן.';
  $('valueCount').textContent='—';
  $('profilePct').textContent='—';
  $('requestStatus').textContent='';
  $('weeklyContent').innerHTML='<div class="empty">אחרי הכניסה יוצגו כאן הצורך או הבקשה השבועית שלך.</div>';
  $('sessionContent').innerHTML='<div class="empty">אחרי הכניסה יוצג כאן החיבור הבא שנקבע עבורך.</div>';
  $('profileContent').innerHTML='<div class="empty">כאן יוצג ההקשר האישי שמשמש לבניית התאמות עבורך.</div>';
  $('historyContent').innerHTML='<div class="empty">כאן תישמר היסטוריית הערך והחיבורים שנוצרו עבורך.</div>';
  $('authNotice').classList.remove('hidden');
}
function labelValue(t){return({feedback:'משוב שימושי',referral:'הפניה / חיבור',followup:'שיחת המשך',collaboration:'שיתוף פעולה',advice:'עצה פרקטית'}[t]||'Value Event')}
async function loadReal(){
  const {data:{session}}=await sb.auth.getSession();
  if(!session)return null;
  const uid=session.user.id;
  const {data:member}=await sb.from('pv_members').select('*').eq('auth_user_id',uid).maybeSingle();
  if(!member)return null;
  const [{data:profile},{data:cycles}]=await Promise.all([
    sb.from('pv_member_profiles').select('*').eq('member_id',member.id).maybeSingle(),
    sb.from('pv_cycles').select('id,week_start,status').order('week_start',{ascending:false}).limit(1)
  ]);
  let request=null;
  if(cycles?.[0]){
    const {data:req}=await sb.from('pv_requests').select('*,pv_request_slots(slot_key)').eq('cycle_id',cycles[0].id).eq('member_id',member.id).maybeSingle();
    if(req)request={...req,slots:(req.pv_request_slots||[]).map(x=>x.slot_key)};
  }
  const {data:mine}=await sb.from('pv_session_members').select('session_id,attendance_status,pv_sessions(id,recipe,starts_at,duration_minutes,status,room_id)').eq('member_id',member.id);
  let nextSession=null,values=[];
  if(mine?.length){
    const future=mine.map(x=>x.pv_sessions).filter(Boolean).filter(x=>new Date(x.starts_at)>=new Date()).sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at));
    nextSession=future[0]||null;
    const ids=mine.map(x=>x.session_id);
    const {data:ve}=await sb.from('pv_value_events').select('value_type,note,created_at').in('session_id',ids).order('created_at',{ascending:false}).limit(10);
    values=ve||[];
  }
  return{member,profile,request,session:nextSession,values};
}
(async()=>{
  if(params.get('demo')==='1'){render(demo,true);return}
  try{const real=await loadReal();real?render(real,false):renderLoggedOut()}catch(e){console.error(e);renderLoggedOut()}
})();