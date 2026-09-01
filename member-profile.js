const SUPABASE_URL='https://cmtbwohbktirmplieeeq.supabase.co';
const SUPABASE_KEY='sb_publishable_tk18F8g4AS7oQF9eV9qGQw_nONj_xiX';
const PROFILE_URL=new URL('member-profile.html',location.href).href.split('#')[0];
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=id=>document.getElementById(id);
let currentUser=null,currentMember=null,currentProfile=null;
const split=s=>String(s||'').split(/,|\n/).map(x=>x.trim()).filter(Boolean);
const join=a=>Array.isArray(a)?a.join(', '):'';
function setAuthStatus(t){$('authStatus').textContent=t||''}
function completeness(v){
  const checks=[v.name,v.title,v.bio,v.expertise?.length,v.offers?.length,v.network_access?.length,v.current_focus,v.ideal_connections,v.collaboration_interests?.length,v.industries?.length];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}
function updateCompletion(v){const c=completeness(v);$('completionValue').textContent=c+'%';$('completionBar').style.width=c+'%';$('completionHint').textContent=c>=80?'יש מספיק הקשר ל־matching עשיר.':c>=50?'כבר אפשר להתחיל. עוד כמה פרטים ישפרו את החיבורים.':'כדאי להוסיף עוד הקשר כדי שההתאמות לא יהיו שטחיות.'}
function collect(){
  return {
    name:$('name').value.trim(),phone:$('phone').value.trim(),title:$('title').value.trim(),business_name:$('businessName').value.trim(),bio:$('bio').value.trim(),website:$('website').value.trim(),location:$('location').value.trim(),
    industries:split($('industries').value),expertise:split($('expertise').value),offers:split($('offers').value),recurring_needs:split($('recurringNeeds').value),current_focus:$('currentFocus').value.trim(),ideal_connections:$('idealConnections').value.trim(),collaboration_interests:split($('collaborationInterests').value),network_access:split($('networkAccess').value),audience_types:split($('audienceTypes').value),years_experience:$('yearsExperience').value?Number($('yearsExperience').value):null
  };
}
function hydrate(){
  const m=currentMember||{},p=currentProfile||{};
  $('name').value=m.name||'';$('email').value=m.email||currentUser?.email||'';$('phone').value=m.phone||'';$('title').value=p.title||'';$('businessName').value=p.business_name||'';$('bio').value=p.bio||'';$('website').value=p.website||'';$('location').value=p.location||'';$('industries').value=join(p.industries);$('expertise').value=join(p.expertise);$('offers').value=join(p.offers);$('recurringNeeds').value=join(p.recurring_needs);$('currentFocus').value=p.current_focus||'';$('idealConnections').value=p.ideal_connections||'';$('collaborationInterests').value=join(p.collaboration_interests);$('networkAccess').value=join(p.network_access);$('audienceTypes').value=join(p.audience_types);$('yearsExperience').value=p.years_experience??'';updateCompletion({...m,...p});
}
async function loadProfile(){
  const {data:m,error:me}=await sb.from('pv_members').select('*').eq('auth_user_id',currentUser.id).maybeSingle();
  if(me) throw me;
  if(!m){
    const {data:newM,error}=await sb.from('pv_members').insert({community_key:'business_women',name:currentUser.user_metadata?.name||currentUser.email.split('@')[0],email:currentUser.email,auth_user_id:currentUser.id}).select('*').single();
    if(error) throw error;currentMember=newM;
  }else currentMember=m;
  const {data:p,error:pe}=await sb.from('pv_member_profiles').select('*').eq('member_id',currentMember.id).maybeSingle();
  if(pe) throw pe;currentProfile=p||null;hydrate();
}
async function init(){
  const {data:{session}}=await sb.auth.getSession();
  currentUser=session?.user||null;
  if(!currentUser){$('authPanel').classList.remove('hidden');$('profilePanel').classList.add('hidden');$('signOutBtn').classList.add('hidden');return}
  if(location.hash.includes('access_token=')){history.replaceState({},document.title,location.pathname+location.search)}
  $('authPanel').classList.add('hidden');$('profilePanel').classList.remove('hidden');$('signOutBtn').classList.remove('hidden');
  try{await loadProfile()}catch(e){console.error(e);$('saveState').textContent='לא הצלחנו לטעון את הפרופיל: '+(e.message||'שגיאה')}
}
$('magicLinkForm').addEventListener('submit',async e=>{
  e.preventDefault();const email=$('loginEmail').value.trim();setAuthStatus('שולחת קישור...');
  const {error}=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:PROFILE_URL}});
  setAuthStatus(error?'שגיאה: '+error.message:'שלחנו קישור כניסה למייל. פתחי אותו באותו מכשיר או בכל מכשיר אחר.');
});
$('signOutBtn').onclick=async()=>{await sb.auth.signOut();location.reload()};
$('profileForm').addEventListener('input',()=>{try{updateCompletion(collect())}catch(e){}});
$('profileForm').addEventListener('submit',async e=>{
  e.preventDefault();if(!currentUser||!currentMember)return;
  const v=collect();if(!v.name){alert('הוסיפי שם מלא.');return}
  $('saveState').textContent='שומרת...';
  const {data:m,error:me}=await sb.from('pv_members').update({name:v.name,phone:v.phone,updated_at:new Date().toISOString()}).eq('id',currentMember.id).select('*').single();
  if(me){$('saveState').textContent='שגיאת שמירה';alert(me.message);return}
  const profilePayload={member_id:currentMember.id,title:v.title,business_name:v.business_name,bio:v.bio,website:v.website,location:v.location,industries:v.industries,expertise:v.expertise,offers:v.offers,recurring_needs:v.recurring_needs,current_focus:v.current_focus,ideal_connections:v.ideal_connections,collaboration_interests:v.collaboration_interests,network_access:v.network_access,audience_types:v.audience_types,years_experience:v.years_experience,profile_completeness:completeness(v),updated_at:new Date().toISOString()};
  const {data:p,error:pe}=await sb.from('pv_member_profiles').upsert(profilePayload,{onConflict:'member_id'}).select('*').single();
  if(pe){$('saveState').textContent='שגיאת שמירה';alert(pe.message);return}
  currentMember=m;currentProfile=p;hydrate();$('saveState').textContent='הפרופיל נשמר ✓';
});
$('fillDemoBtn').onclick=()=>{
  $('name').value='נועה לוי';$('title').value='יועצת שיווק וצמיחה לעסקים';$('businessName').value='Noya Growth';$('bio').value='עוזרת לעסקים מבוססי מומחיות לחדד הצעה, לבנות מנוע תוכן ולהפוך קהל ללקוחות.';$('location').value='תל אביב / אונליין';$('website').value='https://example.com';$('yearsExperience').value='9';$('industries').value='ייעוץ, קהילות, שירותים מקצועיים';$('expertise').value='שיווק אורגני, תוכן, בניית קהילה, הצעת ערך';$('offers').value='משוב על מסרים, חשיבה על שיווק אורגני, חיבור לקהילות עצמאיות';$('networkAccess').value='עצמאיות, מנהלות קהילה, ארגוני חינוך';$('currentFocus').value='להיכנס יותר לעבודה עם חברות וארגונים';$('recurringNeeds').value='לקוחות ארגוניים, תמחור, שותפויות';$('idealConnections').value='מנהלות HR, מובילות L&D, נשים שכבר מוכרות שירותים לארגונים';$('collaborationInterests').value='וובינרים משותפים, הפניות, תוכן משותף';$('audienceTypes').value='מנהלות, צוותי HR, עצמאיות';updateCompletion(collect());
};
sb.auth.onAuthStateChange(()=>setTimeout(init,0));
init();