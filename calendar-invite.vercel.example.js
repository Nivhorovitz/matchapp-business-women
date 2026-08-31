// Vercel serverless function example for one-click Google Calendar invitations.
// Deploy in a server-side Vercel project, NOT on GitHub Pages.
// Required env vars:
// GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID
// The organizer authorizes once with offline access. The refresh token stays server-side.

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const {summary,start,end,timeZone='Asia/Jerusalem',attendees=[],roomUrl='',description=''}=req.body||{};
    if(!summary||!start||!end||!Array.isArray(attendees)||attendees.length<2) return res.status(400).json({error:'Missing session fields'});
    const required=['GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET','GOOGLE_REFRESH_TOKEN','GOOGLE_CALENDAR_ID'];
    const missing=required.filter(k=>!process.env[k]);
    if(missing.length) return res.status(503).json({error:'Calendar OAuth is not configured',missing});

    const tokenBody=new URLSearchParams({
      client_id:process.env.GOOGLE_CLIENT_ID,
      client_secret:process.env.GOOGLE_CLIENT_SECRET,
      refresh_token:process.env.GOOGLE_REFRESH_TOKEN,
      grant_type:'refresh_token'
    });
    const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:tokenBody});
    if(!tokenResponse.ok) throw new Error(`Google token refresh failed: ${tokenResponse.status}`);
    const token=await tokenResponse.json();

    const event={
      summary,
      description,
      location:roomUrl,
      start:{dateTime:start,timeZone},
      end:{dateTime:end,timeZone},
      attendees:attendees.map(email=>({email})),
      reminders:{useDefault:true}
    };
    const calendarId=encodeURIComponent(process.env.GOOGLE_CALENDAR_ID);
    const createResponse=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=all`,{
      method:'POST',headers:{authorization:`Bearer ${token.access_token}`,'content-type':'application/json'},body:JSON.stringify(event)
    });
    const created=await createResponse.json();
    if(!createResponse.ok) throw new Error(created?.error?.message||`Calendar insert failed: ${createResponse.status}`);
    return res.status(200).json({eventId:created.id,htmlLink:created.htmlLink,status:created.status});
  }catch(err){
    console.error(err);
    return res.status(500).json({error:'Could not create calendar invitation'});
  }
}
