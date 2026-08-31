// Peer Value Lab — Embed Mode
// Activate with ?embed=true. Keeps the full demo untouched when opened normally.
(function(){
  const params=new URLSearchParams(window.location.search);
  const embed=['true','1','yes'].includes((params.get('embed')||'').toLowerCase());
  if(!embed) return;

  document.documentElement.classList.add('embed-mode');
  document.body.classList.add('embed-mode');
  document.title='Peer Value Lab | Sparkco';

  const style=document.createElement('style');
  style.id='peer-value-embed-styles';
  style.textContent=`
    html.embed-mode,body.embed-mode{background:#f7f8f5;overflow-x:hidden}
    body.embed-mode .topbar{display:none!important}
    body.embed-mode .app-shell{min-height:100vh}
    body.embed-mode .step{max-width:100%;padding:20px 18px 34px}
    body.embed-mode .intro-head{margin-bottom:16px}
    body.embed-mode .intro-head .eyebrow{display:none}
    body.embed-mode h1{font-size:clamp(30px,5vw,44px);margin-bottom:10px}
    body.embed-mode .lead{font-size:15px;line-height:1.55}

    body.embed-mode .recipe-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-bottom:14px}
    body.embed-mode .recipe-card{min-height:0;padding:12px 13px;border-radius:15px}
    body.embed-mode .recipe-card .recipe-icon{width:34px;height:34px;border-radius:11px;font-size:17px;margin-bottom:9px}
    body.embed-mode .recipe-card h3{font-size:15px;margin-bottom:4px}
    body.embed-mode .recipe-card p{font-size:12px;line-height:1.45}
    body.embed-mode .recipe-card .best-for{font-size:10px;margin-top:7px}

    body.embed-mode .hero-grid,body.embed-mode .outcome-grid{grid-template-columns:1fr;gap:12px}
    body.embed-mode .selected-recipe-panel{padding:15px 17px;border-radius:17px}
    body.embed-mode .selected-recipe-panel>small{margin-bottom:8px;font-size:10px}
    body.embed-mode .selected-recipe-title{align-items:center}
    body.embed-mode .selected-recipe-title>span{width:38px;height:38px;border-radius:12px;font-size:19px}
    body.embed-mode .selected-recipe-title b{font-size:18px;margin-bottom:2px}
    body.embed-mode .selected-recipe-title p{font-size:12px;margin:0}
    body.embed-mode .recipe-flow{display:none}
    body.embed-mode .engine-note{margin-top:10px;padding-top:10px}
    body.embed-mode .engine-note span{font-size:11px;line-height:1.45}

    body.embed-mode .hero-card,body.embed-mode .outcome-card{padding:17px;border-radius:17px}
    body.embed-mode .hero-card h2{font-size:20px;margin-bottom:14px}
    body.embed-mode label{margin-bottom:11px;font-size:12px}
    body.embed-mode input,body.embed-mode textarea,body.embed-mode select{padding:10px 11px;margin-top:5px;border-radius:10px}
    body.embed-mode .tags,body.embed-mode .value-types{gap:6px;margin:7px 0 12px}
    body.embed-mode .tag,body.embed-mode .value-type{font-size:11px;padding:7px 9px}
    body.embed-mode .button-row{gap:7px}
    body.embed-mode .ghost,body.embed-mode .primary{padding:10px 13px;border-radius:10px}

    body.embed-mode .section-head{margin-bottom:15px}
    body.embed-mode .section-head h2{font-size:27px}
    body.embed-mode .member-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
    body.embed-mode .member-card{padding:12px;min-height:0;border-radius:15px}
    body.embed-mode .avatar{width:40px;height:40px;border-radius:12px;margin-bottom:9px;font-size:14px}
    body.embed-mode .member-card h3{font-size:15px}
    body.embed-mode .member-card .role{font-size:11px;margin-bottom:9px}
    body.embed-mode .member-card p{font-size:12px;line-height:1.4}
    body.embed-mode .insight-card{padding:13px 14px;border-radius:14px;margin-top:12px}
    body.embed-mode .insight-card p{font-size:12px}
    body.embed-mode .button-row.centered{margin-top:16px}

    body.embed-mode .clinic-layout{grid-template-columns:1fr;gap:10px}
    body.embed-mode .clinic-side{padding:0;display:grid;grid-template-columns:1fr auto;gap:5px 10px;align-items:center}
    body.embed-mode .clinic-side .recipe-badge,body.embed-mode .clinic-side .eyebrow{display:none}
    body.embed-mode .clinic-side h2{font-size:22px;margin:0}
    body.embed-mode .clinic-side>p:not(.eyebrow){font-size:12px;margin:0;grid-column:1/-1}
    body.embed-mode .mini-people{grid-column:1/-1;margin-top:5px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
    body.embed-mode .mini-person{padding:6px 8px;font-size:11px}
    body.embed-mode .clinic-card{padding:17px;min-height:390px;border-radius:17px}
    body.embed-mode .progress{margin:9px 0 20px}
    body.embed-mode .clinic-icon{width:52px;height:52px;border-radius:16px;font-size:23px;margin-bottom:11px}
    body.embed-mode .clinic-content h3{font-size:24px}
    body.embed-mode .clinic-content>p{font-size:14px;line-height:1.55}
    body.embed-mode .prompt-box{padding:12px 13px;font-size:12px}

    body.embed-mode .metric-explainer{margin-top:14px;gap:5px}
    body.embed-mode .metric-explainer span{padding:7px 9px;font-size:11px}
    body.embed-mode .done-card{margin:8px auto;padding:28px 18px;border-radius:18px}
    body.embed-mode .done-card h2{font-size:25px}

    body.embed-mode .extra-value-section{margin-top:15px;padding-top:15px}
    body.embed-mode .extra-actions{gap:6px}
    body.embed-mode .extra-action{padding:9px;font-size:11px}
    body.embed-mode .session-preview{padding:13px;border-radius:14px}
    body.embed-mode .done-session-metrics{grid-template-columns:repeat(2,1fr)}

    body.embed-mode .dashboard-head{padding:22px 18px 12px;grid-template-columns:1fr}
    body.embed-mode .dashboard-head h1{font-size:32px}
    body.embed-mode .definition-card{display:none}
    body.embed-mode .metrics{padding:0 18px;grid-template-columns:repeat(2,1fr)!important}
    body.embed-mode .dashboard-grid{padding:0 18px 25px;grid-template-columns:1fr}
    body.embed-mode .recipe-dashboard{grid-template-columns:repeat(2,1fr)}
    body.embed-mode .thesis-card{margin:0 18px 28px;grid-template-columns:1fr}

    @media(max-width:560px){
      body.embed-mode .step{padding:15px 12px 26px}
      body.embed-mode .recipe-grid{grid-template-columns:1fr}
      body.embed-mode .recipe-card{display:grid;grid-template-columns:36px 1fr;gap:2px 9px;align-items:center}
      body.embed-mode .recipe-card .recipe-icon{grid-row:1/4;margin:0}
      body.embed-mode .recipe-card h3,body.embed-mode .recipe-card p,body.embed-mode .recipe-card .best-for{grid-column:2;margin-top:0}
      body.embed-mode .member-grid,body.embed-mode .mini-people{grid-template-columns:1fr}
      body.embed-mode .button-row{flex-direction:column}
      body.embed-mode .button-row button{width:100%}
      body.embed-mode .metrics{grid-template-columns:1fr!important}
    }
  `;
  document.head.appendChild(style);

  // Participant embed should stay focused on the activity, not demo/admin controls.
  const adminBtn=document.getElementById('adminViewBtn');
  if(adminBtn) adminBtn.style.display='none';
  const resetBtn=document.getElementById('resetBtn');
  if(resetBtn) resetBtn.style.display='none';

  // Notify a host page if it wants to react to the embed mode.
  try{window.parent.postMessage({type:'sparkco-peer-value-lab',mode:'embed',ready:true},'*')}catch(e){}
})();
