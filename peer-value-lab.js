const NEED_TAGS=['תמחור','לקוחות חדשים','שיווק','מכירות','AI לעסק','שיתופי פעולה','מיקוד עסקי','הצעת ערך','פיננסים','ניהול זמן'];

const RECIPES={
  problem:{
    id:'problem',icon:'◎',name:'Business Problem Clinic',short:'פתרון בעיה',
    promise:'לפתור בעיה עסקית בעזרת ניסיון של חברות אחרות.',best:'כשיש בעיה, חסם או החלטה שצריך להזיז',groupSize:4,
    flow:['מנסחות את הבעיה','שואלות לפני שמייעצות','מביאות ניסיון ורעיונות','יוצאות עם צעד הבא'],
    engine:'Sparkco מחפשת חברות עם ניסיון רלוונטי לצורך, ובונה רביעייה שמסוגלת גם להבין את הבעיה וגם להציע כיוונים מעשיים.',
    formTitle:'מה את רוצה לפתור?',needLabel:'מה הבעיה או ההחלטה שהכי יעזור לך לקדם כרגע?',needPlaceholder:'לדוגמה: אני רוצה לדייק את התמחור שלי ולדעת איך להציג אותו בביטחון.',offerLabel:'באיזה ניסיון עסקי את יכולה לעזור לאחרות?',offerPlaceholder:'לדוגמה: שיווק, מכירות, תמחור, ניהול עסק...',
    prefer:['תמחור','מכירות','מיקוד עסקי','הצעת ערך','פיננסים','ניהול זמן'],
    stages:[
      ['שלב 1 מתוך 4','3 דקות','◎','מה אני מנסה לקדם?','כל אחת מקבלת עד 45 שניות: מה הדבר העסקי שהכי יעזור לה להזיז קדימה עכשיו?','“אם הייתי יוצאת מהשיחה הזאת עם דבר אחד שימושי, הייתי רוצה שזה יהיה…”'],
      ['שלב 2 מתוך 4','7 דקות','?','מבינות לפני שמציעות','בחרו צורך אחד. שאר החברות שואלות רק שאלות שמחדדות את הבעיה. עדיין לא נותנות עצות.','מה כבר ניסית? מה הופך את זה לקשה? מה ייחשב הצלחה?'],
      ['שלב 3 מתוך 4','10 דקות','✦','הופכות ניסיון לעזרה','כל אחת מביאה ניסיון, רעיון, דוגמה, משוב או contact שעשויים לעזור.','העדיפו משהו שאפשר להשתמש בו כבר השבוע.'],
      ['שלב 4 מתוך 4','5 דקות','→','מה יוצא מכאן?','כל אחת אומרת מה היא לוקחת ומה הצעד הבא שלה.','“הדבר שאני לוקחת הוא…” ואז “הצעד הבא שלי הוא…”']
    ],
    values:['עצה מעשית','רעיון שימושי','החלטה שהתחדדה','ידע מקצועי','חיבור / הפניה'],
    outcome:'ב־Problem Clinic אנחנו רוצים לדעת אם הבעיה זזה: נוצרה החלטה, עצה, ידע או צעד מעשי.',
    demo:{name:'נועה לוי',need:'אני רוצה להעלות מחיר לשירות הדגל שלי אבל לא בטוחה איך להציג את השינוי ללקוחות קיימות.',offer:'שיווק אורגני ובניית תוכן',tag:'תמחור'}
  },
  referral:{
    id:'referral',icon:'↗',name:'Referral Exchange',short:'חיבור / הפניה',
    promise:'להגיע לאדם, לקוח או הזדמנות דרך הרשת שכבר נמצאת בחדר.',best:'כשברור למי רוצים להגיע, אבל אין דרך ישירה',groupSize:4,
    flow:['מגדירות יעד מדויק','מחדדות מי האדם הנכון','סורקות את הרשת','מתחייבות ל־intro'],
    engine:'Sparkco מחפשת חברות בעלות רשתות, תחומים וקשרים משלימים, ומארגנת שיחה שמסתיימת בהתחייבות קונקרטית ולא רק ב״אולי אני מכירה מישהי״.',
    formTitle:'למי את רוצה להגיע?',needLabel:'איזה אדם, לקוח, ארגון או סוג הזדמנות את מחפשת?',needPlaceholder:'לדוגמה: אני רוצה להגיע למנהלות משאבי אנוש בחברות של 100+ עובדים.',offerLabel:'לאילו אנשים או עולמות את יכולה לפתוח דלת לאחרות?',offerPlaceholder:'לדוגמה: מנהלות שיווק, יזמיות, ארגוני חינוך, ספקיות...',
    prefer:['שיתופי פעולה','נטוורקינג','הפניות','לקוחות חדשים','בניית קהילה','אירועים'],
    stages:[
      ['שלב 1 מתוך 4','3 דקות','⌖','למי בדיוק אני רוצה להגיע?','כל אחת מנסחת יעד מספיק מדויק כדי שאחרות יוכלו לחפש אדם אמיתי ברשת שלהן.','תפקיד + סוג ארגון + סיבה לחיבור. לא “אני מחפשת לקוחות”.'],
      ['שלב 2 מתוך 4','4 דקות','?','מחדדות את ה־ask','האחרות שואלות מה יהפוך את החיבור לרלוונטי ומה כדאי לומר לאדם שמקבל את ההיכרות.','מה הערך שאת מביאה לו? למה עכשיו? מה תהיה בקשת הפתיחה?'],
      ['שלב 3 מתוך 4','4 דקות','◉','סורקות את הרשת','כל אחת חושבת על אנשים שהיא מכירה ומסמנת: יש לי חיבור, אולי יש לי, או אין כרגע.','לא צריך לשלוח כלום עדיין. קודם מזהים את החיבור הנכון.'],
      ['שלב 4 מתוך 4','3 דקות','↗','סוגרות Intro','אם נמצא חיבור, מנסחות מי פונה למי ומה הצעד הבא.','“אני אחבר ביניכן עד יום ___, עם המשפט ___.”']
    ],
    values:['חיבור / הפניה','הזדמנות עסקית','לקוחה פוטנציאלית','שותפה אפשרית','contact רלוונטי'],
    outcome:'ב־Referral Exchange התוצאה איננה “הכרנו”. אנחנו מודדים אם נוצרה דלת ממשית: intro, lead או הזדמנות.',
    demo:{name:'נועה לוי',need:'אני רוצה להגיע למנהלות משאבי אנוש בחברות של יותר מ־100 עובדים כדי להציע סדנת מנהלות.',offer:'יש לי קשרים עם עצמאיות, קהילות וארגוני חינוך',tag:'לקוחות חדשים'}
  },
  feedback:{
    id:'feedback',icon:'◇',name:'Feedback Lab',short:'משוב',
    promise:'לקבל משוב חד על הצעה, מסר, רעיון או מוצר לפני שיוצאים איתו לעולם.',best:'כשיש משהו קונקרטי שרוצים לשפר',groupSize:4,
    flow:['מציגות בלי להסביר יתר על המידה','מה עובד?','מה לא ברור?','מה הייתי משנה?'],
    engine:'Sparkco בונה קבוצת משוב מגוונת ולא רק “נשים דומות לך”, ומפרידה בין תגובה, בלבול והצעה כדי למנוע שיחה שמיד מתפזרת לעצות.',
    formTitle:'על מה את רוצה משוב?',needLabel:'איזה רעיון, הצעה, מסר, פיץ׳ או מוצר את רוצה לבדוק?',needPlaceholder:'לדוגמה: בניתי חבילת ליווי חדשה ואני רוצה לדעת אם ברור למה היא שווה את המחיר.',offerLabel:'באילו תחומים את טובה בלתת משוב לאחרות?',offerPlaceholder:'לדוגמה: מסרים, מיתוג, מוצר, חוויית לקוח, מכירות...',
    prefer:['הצעת ערך','מיתוג','פיץ׳','מסרים','פיתוח מוצר','מחקר לקוחות','מכירות','שיווק'],
    stages:[
      ['שלב 1 מתוך 4','3 דקות','▣','מציגה את הדבר עצמו','המציגה נותנת עד 2 דקות של הצגה. האחרות מקשיבות בלי לפתור עדיין.','מה אני מציעה, למי, ומה אני רוצה שיקרה בעקבות זה?'],
      ['שלב 2 מתוך 4','4 דקות','✓','מה עובד?','כל אחת אומרת דבר אחד שעובר חזק, ברור או מושך.','רק מה שעובד. בלי “אבל”.'],
      ['שלב 3 מתוך 4','5 דקות','?','מה לא ברור?','כל אחת מסמנת נקודה שבה היא איבדה בהירות, אמון או עניין.','נסחו כתגובה אמיתית: “כאן לא הבנתי…”'],
      ['שלב 4 מתוך 4','5 דקות','◇','מה הייתי משנה?','עכשיו מציעות שינוי אחד בלבד עם leverage גבוה. המציגה מסכמת מה היא לוקחת.','שינוי אחד, לא רשימת שיפורים.']
    ],
    values:['משוב','בהירות במסר','רעיון לשיפור','הצעת ערך שהתחדדה','זווית לקוח חדשה'],
    outcome:'ב־Feedback Lab אנחנו מודדים האם משהו השתפר בעקבות עיניים של חברות אחרות: מסר, הצעה, מוצר או החלטת עיצוב.',
    demo:{name:'נועה לוי',need:'בניתי תוכנית ליווי חדשה לעצמאיות ואני רוצה לבדוק אם ההבטחה והמחיר שלה מרגישים ברורים ומשכנעים.',offer:'אני טובה במשוב על תוכן וחוויית לקוח',tag:'הצעת ערך'}
  },
  collaboration:{
    id:'collaboration',icon:'⇄',name:'Collaboration Builder',short:'שיתוף פעולה',
    promise:'לזהות חיבור משלים ולהפוך “אולי נעשה משהו יחד” לניסוי קטן שאפשר לבדוק.',best:'כשיש נכסים ויכולות משלימים בין חברות',groupSize:3,
    flow:['ממפות מה כל אחת מביאה','מחפשות השלמה','בונות רעיון קטן','מגדירות ניסוי'],
    engine:'Sparkco מחפשת complementarity: קהל + יכולת, מוצר + הפצה, צורך + נכס. כאן דווקא דמיון נמוך יכול להיות יתרון.',
    formTitle:'איזה שיתוף פעולה יכול לקדם אותך?',needLabel:'מה היית רוצה להשיג דרך שותפות עם חברה אחרת?',needPlaceholder:'לדוגמה: אני רוצה לבנות וובינר משותף שיחשוף אותי לקהל חדש.',offerLabel:'איזה נכס, קהל או יכולת את מביאה לשיתוף פעולה?',offerPlaceholder:'לדוגמה: קהילה של 800 נשים, מומחיות בפיננסים, יכולת הפקה...',
    prefer:['שיתופי פעולה','נטוורקינג','בניית קהילה','שיווק','פיתוח מוצר','אירועים','הצעת ערך'],
    stages:[
      ['שלב 1 מתוך 4','4 דקות','◆','מה כל אחת מביאה?', 'כל אחת מציגה שלושה נכסים: יכולת, קהל/גישה ומשאב שהיא מוכנה להביא.','לא רק expertise. גם distribution, relationships, במה, מקום או מוצר.'],
      ['שלב 2 מתוך 4','5 דקות','⇄','איפה יש השלמה?', 'מחפשות חיבור שבו מה שחסר לאחת נמצא אצל האחרת.','מה נהיה אפשרי ביחד שלא היה כדאי לעשות לבד?'],
      ['שלב 3 מתוך 4','6 דקות','✦','בונות Collaboration Hypothesis','מנסחות רעיון אחד קטן ומוגדר, במקום “בואי נעשה משהו”.','למי? מה ניצור? מה כל אחת מביאה? למה זה טוב לשתינו?'],
      ['שלב 4 מתוך 4','4 דקות','→','מגדירות ניסוי','קובעות צעד קטן שאפשר לבדוק תוך שבועיים בלי מחויבות גדולה.','פגישה אחת, דף אחד, וובינר אחד, introduction אחד או prototype קטן.']
    ],
    values:['שותפה אפשרית','רעיון לשיתוף פעולה','ניסוי משותף','גישה לקהל חדש','הזדמנות עסקית'],
    outcome:'ב־Collaboration Builder אנחנו מודדים אם complementarity הפכה לניסוי ממשי, ולא נשארה בשיחת נטוורקינג נעימה.',
    demo:{name:'נועה לוי',need:'אני רוצה לבנות וובינר משותף שיחבר בין שיווק לפיננסים ויביא לכל אחת מאיתנו קהל חדש.',offer:'יש לי קהילה פעילה של עצמאיות ויכולת לבנות תוכן ושיווק',tag:'שיתופי פעולה'}
  }
};

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

const BASE_EVENTS=[
 {recipient:'אורית',provider:'מיכל',recipe:'referral',type:'חיבור / הפניה',note:'חיבור למנהלת רכש בחברת הייטק',followup:true},
 {recipient:'גלית',provider:'ענת',recipe:'feedback',type:'משוב',note:'דיוק הצעת מחיר ללקוח חדש',followup:false},
 {recipient:'רוני',provider:'שירה',recipe:'problem',type:'עצה מעשית',note:'שינוי מבנה שיחת המכירה',followup:true},
 {recipient:'מיכל',provider:'דנה',recipe:'problem',type:'החלטה שהתחדדה',note:'בחירת קהל יעד למוצר החדש',followup:false},
 {recipient:'נועה',provider:'יעל',recipe:'collaboration',type:'ניסוי משותף',note:'וובינר משותף ללקוחות של שתיהן',followup:true}
];
const BASE_VALUE_COUNTS={'עצה מעשית':14,'חיבור / הפניה':11,'משוב':9,'רעיון שימושי':8,'ידע מקצועי':6,'החלטה שהתחדדה':4,'שותפה אפשרית':3};
const BASE_RECIPE_COUNTS={problem:19,referral:14,feedback:12,collaboration:9};
const BASE_NEEDS=[['לקוחות חדשים',12],['תמחור',9],['שיווק',8],['שיתופי פעולה',7],['מיקוד עסקי',6]];
const ATTENTION=[['הילה','2 מפגשים בלי Value Event'],['קרן','חיבור אחד בלבד החודש'],['נועה ש׳','טרם נוצר follow-up'],['אפרת','צורך פתוח: לקוחות חדשים']];

const state={recipeId:'problem',selectedNeed:'',selectedValues:[],group:[],stageIndex:0,latest:null};
const $=id=>document.getElementById(id);
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const recipe=()=>RECIPES[state.recipeId];

function renderRecipeChoices(){
  $('recipeChoices').innerHTML=Object.values(RECIPES).map(r=>`<button class="recipe-card ${r.id===state.recipeId?'active':''}" data-recipe="${r.id}"><span class="recipe-icon">${r.icon}</span><h3>${r.name}</h3><p>${r.promise}</p><span class="best-for">מתאים במיוחד: ${r.best}</span></button>`).join('');
  document.querySelectorAll('[data-recipe]').forEach(b=>b.onclick=()=>selectRecipe(b.dataset.recipe));
}
function selectRecipe(id){state.recipeId=id;state.selectedNeed='';state.selectedValues=[];renderRecipeChoices();renderRecipePanel();renderTags();}
function renderRecipePanel(){
  const r=recipe();$('selectedRecipeIcon').textContent=r.icon;$('selectedRecipeName').textContent=r.name;$('selectedRecipePromise').textContent=r.promise;
  $('recipeFlow').innerHTML=r.flow.map((x,i)=>`<div class="flow-row"><b>${i+1}</b><span>${esc(x)}</span></div>`).join('');$('engineNote').textContent=r.engine;
  $('formTitle').textContent=r.formTitle;$('needLabel').firstChild.textContent=r.needLabel;$('needText').placeholder=r.needPlaceholder;$('offerLabel').firstChild.textContent=r.offerLabel;$('offerText').placeholder=r.offerPlaceholder;
}
function renderTags(){
  $('needTags').innerHTML=NEED_TAGS.map(t=>`<button class="tag ${state.selectedNeed===t?'active':''}" data-need="${esc(t)}">${esc(t)}</button>`).join('');
  document.querySelectorAll('[data-need]').forEach(b=>b.onclick=()=>{state.selectedNeed=b.dataset.need;renderTags()});
  const box=$('valueTypes');if(!box)return;box.innerHTML=recipe().values.map(t=>`<button class="value-type ${state.selectedValues.includes(t)?'active':''}" data-value="${esc(t)}">${esc(t)}</button>`).join('');
  document.querySelectorAll('[data-value]').forEach(b=>b.onclick=()=>{const t=b.dataset.value;state.selectedValues=state.selectedValues.includes(t)?state.selectedValues.filter(x=>x!==t):[...state.selectedValues,t];renderTags()});
}
function showView(name){$('memberView').classList.toggle('active',name==='member');$('adminView').classList.toggle('active',name==='admin');if(name==='admin')renderDashboard()}
function showStep(id){document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function tokens(s){return String(s||'').toLowerCase().split(/[^א-תa-z0-9]+/i).filter(x=>x.length>1)}
function scoreMember(m,needText,needTag,index){const r=recipe();const hay=m.offers.join(' ').toLowerCase();let score=10-index*.01;r.prefer.forEach(p=>{if(hay.includes(p.toLowerCase()))score+=13});if(needTag&&hay.includes(needTag.toLowerCase()))score+=40;tokens(needText).forEach(t=>{if(hay.includes(t))score+=9});if(r.id==='collaboration'&&m.offers.some(o=>['שיתופי פעולה','בניית קהילה','שיווק','פיתוח מוצר'].includes(o)))score+=18;if(r.id==='referral'&&m.offers.some(o=>['נטוורקינג','הפניות','לקוחות חדשים','שיתופי פעולה'].includes(o)))score+=22;return score}
function buildGroup(){
  const name=$('memberName').value.trim(),need=$('needText').value.trim(),offer=$('offerText').value.trim();if(!name||!need){alert('כדי לבנות חיבור, כתבי שם ומה את מחפשת כרגע.');return}
  const r=recipe();const ranked=DEMO_MEMBERS.map((m,i)=>({...m,score:scoreMember(m,need,state.selectedNeed,i)})).sort((a,b)=>b.score-a.score).slice(0,r.groupSize-1);
  state.group=[{id:'self',name,role:'את',offers:[offer||'ניסיון עסקי אישי'],need,initials:name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''),you:true},...ranked];renderGroup();showStep('stepGroup');
}
function recipeBadge(r){return `${r.icon} ${r.name}`}
function renderGroup(){
  const r=recipe(),userNeed=$('needText').value.trim();$('groupRecipeBadge').textContent=recipeBadge(r);$('groupTitle').textContent=r.id==='collaboration'?'בנינו שלישייה עם פוטנציאל להשלמה':'בנינו רביעייה שמתאימה לסוג הערך שביקשת';
  $('groupReason').textContent=`חיפשנו לא רק אנשים “מתאימים”, אלא אנשים שמתאימים ל־${r.name}: ${r.best}.`;
  $('groupCards').innerHTML=state.group.map((m,i)=>`<article class="member-card ${m.you?'you':''}"><div class="avatar">${esc(m.initials||'•')}</div><h3>${esc(m.name)}</h3><p class="role">${esc(m.role)}</p><small>${m.you?'מה את מחפשת עכשיו':'מה היא מביאה לאינטראקציה'}</small><p>${esc(m.you?m.need:m.offers.slice(0,3).join(' · '))}</p>${m.you?'<span class="match-pill">נקודת המוצא</span>':`<span class="match-pill">Recipe fit ${Math.max(76,96-i*6)}%</span>`}</article>`).join('');
  $('orchestrationWhy').textContent=`${r.engine} במקרה הזה בחרנו ${r.groupSize===3?'שלישייה':'רביעייה'} כי המבנה עצמו הוא חלק מה־recipe, לא רק זהות המשתתפות.`;
}
function renderClinic(){
  const r=recipe(),s=r.stages[state.stageIndex];$('clinicRecipeBadge').textContent=recipeBadge(r);$('clinicRecipeTitle').textContent=r.name;$('clinicRecipeDescription').textContent=r.promise;
  $('clinicStageLabel').textContent=s[0];$('clinicTime').textContent=s[1];$('clinicIcon').textContent=s[2];$('clinicTitle').textContent=s[3];$('clinicInstruction').textContent=s[4];$('clinicPrompt').textContent=s[5];$('clinicProgress').style.width=`${((state.stageIndex+1)/r.stages.length)*100}%`;
  $('clinicPrevBtn').style.visibility=state.stageIndex===0?'hidden':'visible';$('clinicNextBtn').textContent=state.stageIndex===r.stages.length-1?'לסיכום התוצאה':'השלב הבא';
  $('clinicParticipants').innerHTML=state.group.map(m=>`<div class="mini-person"><i>${esc((m.initials||'•').slice(0,2))}</i><span>${esc(m.name)}</span></div>`).join('');
}
function openOutcome(){const r=recipe();$('outcomeRecipeBadge').textContent=recipeBadge(r);$('outcomeExplanation').textContent=r.outcome;$('helpedBy').innerHTML='<option value="">בחרי חברה</option>'+state.group.filter(m=>!m.you).map(m=>`<option>${esc(m.name)}</option>`).join('');$('outcomeNote').placeholder=r.id==='referral'?'לדוגמה: עדי תחבר אותי למנהלת משאבי אנוש שהיא מכירה.':r.id==='feedback'?'לדוגמה: הבנתי שההבטחה שלי לא מספיק ברורה ושיניתי את משפט הפתיחה.':r.id==='collaboration'?'לדוגמה: החלטנו לבדוק וובינר משותף לקהלים של שתינו.':'לדוגמה: יצאתי עם דרך חדשה להציג את המחיר ועם צעד שאני יכולה לנסות השבוע.';renderTags();showStep('stepOutcome')}
function saveOutcome(){const provider=$('helpedBy').value,note=$('outcomeNote').value.trim();if(!provider||!state.selectedValues.length){alert('בחרי מי עזרה לך ולפחות תוצאה אחת שנוצרה.');return}const ev={recipient:$('memberName').value.trim(),provider,recipe:state.recipeId,type:state.selectedValues.join(' + '),note:note||recipe().promise,followup:$('followupCheck').checked,createdAt:new Date().toISOString()};const saved=JSON.parse(localStorage.getItem('peerValueLabEvents')||'[]');saved.unshift(ev);localStorage.setItem('peerValueLabEvents',JSON.stringify(saved.slice(0,30)));state.latest=ev;$('doneSummary').textContent=`${provider} יצרה עבורך: ${ev.type}.${ev.followup?' בנוסף נוצרה פעולה להמשך.':''}`;showStep('stepDone')}
function fillDemo(){const d=recipe().demo;$('memberName').value=d.name;$('needText').value=d.need;$('offerText').value=d.offer;state.selectedNeed=d.tag;renderTags()}
function resetRun(){state.selectedNeed='';state.selectedValues=[];state.group=[];state.stageIndex=0;state.latest=null;$('memberName').value='';$('needText').value='';$('offerText').value='';$('outcomeNote').value='';$('followupCheck').checked=false;renderRecipeChoices();renderRecipePanel();renderTags();showView('member');showStep('stepIntro')}
function loadEvents(){return [...JSON.parse(localStorage.getItem('peerValueLabEvents')||'[]'),...BASE_EVENTS]}
function renderDashboard(){
  const events=loadEvents(),newCount=Math.max(0,events.length-BASE_EVENTS.length),followups=events.filter(e=>e.followup).length;const coverage=Math.min(88,74+newCount*2);
  $('metricCards').innerHTML=`<div class="metric-card highlight"><small>Peer Value Coverage</small><b>${coverage}%</b><span>חברות שקיבלו ערך מחברה אחרת</span></div><div class="metric-card"><small>Value Events</small><b>${54+newCount}</b><span>תוצאות שזוהו החודש</span></div><div class="metric-card"><small>Follow-ups</small><b>${18+newCount}</b><span>חיבורים שהמשיכו הלאה</span></div><div class="metric-card"><small>Host Independence</small><b>81%</b><span>ערך שנוצר בלי שהמובילות היו המקור</span></div>`;
  const recipeCounts={...BASE_RECIPE_COUNTS};events.slice(0,newCount).forEach(e=>recipeCounts[e.recipe]=(recipeCounts[e.recipe]||0)+1);$('recipeBars').innerHTML=Object.values(RECIPES).map(r=>`<div class="recipe-stat"><i>${r.icon}</i><b>${r.name}</b><strong>${recipeCounts[r.id]||0}</strong><span>אינטראקציות / outcomes</span></div>`).join('');
  const counts={...BASE_VALUE_COUNTS};events.slice(0,newCount).forEach(e=>String(e.type).split(' + ').forEach(t=>counts[t]=(counts[t]||0)+1));const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,7),max=Math.max(...rows.map(x=>x[1]));$('valueBars').innerHTML=rows.map(([k,v])=>`<div class="bar-row"><span>${esc(k)}</span><div class="bar-track"><i style="width:${Math.round(v/max*100)}%"></i></div><b>${v}</b></div>`).join('');
  $('needsList').innerHTML=BASE_NEEDS.map(([n,c])=>`<div class="signal-item"><b>${esc(n)}</b><span>${c} חברות</span></div>`).join('');$('attentionList').innerHTML=ATTENTION.map(([n,s])=>`<div class="attention-item warn"><b>${esc(n)}</b><span>${esc(s)}</span></div>`).join('');
  $('eventCountChip').textContent=`${events.length} shown`;$('eventsTable').innerHTML=`<div class="event-row header"><span>מקבלת</span><span>ממי</span><span>Recipe</span><span>Outcome</span><span>המשך</span></div>`+events.slice(0,7).map(e=>`<div class="event-row"><strong>${esc(e.recipient)}</strong><span>${esc(e.provider)}</span><span class="event-type">${esc(RECIPES[e.recipe]?.short||e.recipe)}</span><span>${esc(e.type)}${e.note?` · ${esc(e.note)}`:''}</span><span>${e.followup?'✓ כן':'—'}</span></div>`).join('');
}

$('memberViewBtn').onclick=()=>showView('member');$('adminViewBtn').onclick=()=>showView('admin');$('resetBtn').onclick=()=>{localStorage.removeItem('peerValueLabEvents');resetRun()};$('fillDemoBtn').onclick=fillDemo;$('buildGroupBtn').onclick=buildGroup;$('backToIntroBtn').onclick=()=>showStep('stepIntro');$('startClinicBtn').onclick=()=>{state.stageIndex=0;renderClinic();showStep('stepClinic')};$('clinicPrevBtn').onclick=()=>{if(state.stageIndex>0){state.stageIndex--;renderClinic()}};$('clinicNextBtn').onclick=()=>{if(state.stageIndex<recipe().stages.length-1){state.stageIndex++;renderClinic()}else openOutcome()};$('saveOutcomeBtn').onclick=saveOutcome;$('newRunBtn').onclick=resetRun;$('showDashboardBtn').onclick=()=>showView('admin');
renderRecipeChoices();renderRecipePanel();renderTags();
