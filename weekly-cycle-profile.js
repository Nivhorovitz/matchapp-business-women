const PV_SUPABASE_URL='https://cmtbwohbktirmplieeeq.supabase.co';
const PV_SUPABASE_KEY='sb_publishable_tk18F8g4AS7oQF9eV9qGQw_nONj_xiX';
const pvSb=window.supabase?window.supabase.createClient(PV_SUPABASE_URL,PV_SUPABASE_KEY):null;
let pvUser=null,pvMember=null,pvProfile=null,pvCycle=null;

async function pvInit(){
  if(!pvSb)return;
  const {data:{session}}=await pvSb.auth.getSession();pvUser=session?.user||null;
  const profileLink=document.getElementById('profileLink');
  const profileHint=document.getElementById('profileContextHint');
  if(!pvUser){if(profileHint){profileHint.innerHTML='כדי שהמערכת תכיר אותך לאורך זמן, <a href="member-profile.html">צרי או התחברי לפרופיל האישי</a>. אפשר להמשיך בדמו גם בלי login.'}return}
  const {data:m}=await pvSb.from('pv_members').select('*').eq('auth_user_id',pvUser.id).maybeSingle();
  pvMember=m||null;
  if(pvMember){const {data:p}=await pvSb.from('pv_member_profiles').select('*').eq('member_id',pvMember.id).maybeSingle();pvProfile=p||null}
  const {data:c}=await pvSb.from('pv_cycles').select('*').eq('community_key','business_women').eq('status','collecting').order('week_start',{ascending:false}).limit(1).maybeSingle();pvCycle=c||null;
  if(pvMember){
    const n=document.getElementById('memberName'),e=document.getElementById('memberEmail'),o=document.getElementById('offerText');
    if(n){n.value=pvMember.name||'';n.readOnly=true}if(e){e.value=pvMember.email||pvUser.email||'';e.readOnly=true}
    if(o&&!o.value&&pvProfile?.offers?.length)o.value=pvProfile.offers.slice(0,4).join(', ');
    if(profileHint){const pct=pvProfile?.profile_completeness||0;profileHint.innerHTML=`מחוברת כ־<b>${pvMember.name}</b> · פרופיל ${pct}% מלא. <a href="member-profile.html">עדכון פרופיל</a>`}
    if(profileLink)profileLink.textContent='הפרופיל שלי';
  }
}

async function pvSaveRequest(){
  if(!pvSb||!pvUser||!pvMember||!pvCycle)return {saved:false,reason:'demo'};
  const slots=[...document.querySelectorAll('input[name="slot"]:checked')].map(x=>x.value);
  const payload={cycle_id:pvCycle.id,member_id:pvMember.id,recipe:state.recipe,need_text:document.getElementById('needText').value.trim(),offer_text:document.getElementById('offerText').value.trim(),committed:document.getElementById('commitmentCheck').checked,status:'submitted'};
  const {data:req,error}=await pvSb.from('pv_requests').upsert(payload,{onConflict:'cycle_id,member_id'}).select('*').single();
  if(error)throw error;
  await pvSb.from('pv_request_slots').delete().eq('request_id',req.id);
  const rows=slots.map(slot=>({request_id:req.id,slot_key:slot,starts_at:slotDate(slot).toISOString(),committed:true}));
  if(rows.length){const {error:se}=await pvSb.from('pv_request_slots').insert(rows);if(se)throw se}
  return {saved:true,request:req};
}

const form=document.getElementById('requestForm');
if(form){form.addEventListener('submit',async e=>{
  if(!pvUser||!pvMember||!pvCycle)return;
  e.preventDefault();e.stopImmediatePropagation();
  const slots=[...document.querySelectorAll('input[name="slot"]:checked')].map(x=>x.value);
  if(!slots.length){alert('סמני לפחות מועד אחד שאת מתחייבת להגיע אליו.');return}
  if(!document.getElementById('commitmentCheck').checked){alert('כדי לשלוח בקשה צריך לאשר commitment.');return}
  try{
    const result=await pvSaveRequest();
    document.getElementById('requestSuccessText').textContent=`הבקשה נשמרה בפרופיל שלך ובמחזור השבועי. סימנת ${slots.map(slotLabel).join(' או ')}. אם תיבנה קבוצה תקינה, תקבלי Session מאושר עם המשתתפות והחדר.`;
    document.getElementById('requestSuccess').classList.remove('hidden');
  }catch(err){console.error(err);alert('לא הצלחנו לשמור את הבקשה המשותפת: '+(err.message||'שגיאה'))}
},true)}

pvSb?.auth.onAuthStateChange(()=>setTimeout(pvInit,0));
pvInit();