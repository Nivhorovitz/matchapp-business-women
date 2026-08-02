-- Spark Match Hebrew Business Women Club setup
-- Run once in Supabase SQL Editor.
-- Uses the current schema where offers and needs are text[].

alter table public.community_taxonomy
add column if not exists rooms jsonb default '[]'::jsonb;

insert into public.communities (name)
values ('Spark Match - מועדון נשות עסקים')
on conflict (name) do nothing;

with c as (
  select id from public.communities where name = 'Spark Match - מועדון נשות עסקים' limit 1
)
insert into public.community_taxonomy (community_id, offers, needs, rooms)
select
  c.id,
  array['שיווק אורגני','מכירות','נטוורקינג','בניית הצעה','תמחור','ניהול זמן','סטוריטלינג','שימור לקוחות','פיננסים לעסק','AI לעסק','תכנון אסטרטגי','גיוס לקוחות','שיתופי פעולה','בניית קהילה','פיתוח מוצר','פרזנטציה','ניהול עסק עצמאי','מיתוג אישי']::text[],
  array['לקוחות חדשים','דיוק הצעת ערך','תרגול שיחת מכירה','שגרת עשייה','העלאת מחירים','נראות ברשת','שותפה לחשיבה','משוב על פיץ׳','התמודדות עם חסמים','ניהול זמן','בניית תוכן','הצעד הבא בעסק','שותפת אחריות','מנטורית מנוסה','שיפור סגירה','תכנית חודשית']::text[],
  '["שולחן תרגול מכירות", "מעגל מנטוריות", "שולחן אחריות", "פינת פיץ׳", "שולחן שיתופי פעולה", "מעגל תמחור והצעה", "קפה נטוורקינג", "חדר חשיבה עסקית", "שולחן תוכן ושיווק", "מעגל צמיחה"]'::jsonb
from c
where not exists (
  select 1 from public.community_taxonomy t where t.community_id = c.id
);

with c as (
  select id from public.communities where name = 'Spark Match - מועדון נשות עסקים' limit 1
)
update public.community_taxonomy t
set
  offers = array['שיווק אורגני','מכירות','נטוורקינג','בניית הצעה','תמחור','ניהול זמן','סטוריטלינג','שימור לקוחות','פיננסים לעסק','AI לעסק','תכנון אסטרטגי','גיוס לקוחות','שיתופי פעולה','בניית קהילה','פיתוח מוצר','פרזנטציה','ניהול עסק עצמאי','מיתוג אישי']::text[],
  needs = array['לקוחות חדשים','דיוק הצעת ערך','תרגול שיחת מכירה','שגרת עשייה','העלאת מחירים','נראות ברשת','שותפה לחשיבה','משוב על פיץ׳','התמודדות עם חסמים','ניהול זמן','בניית תוכן','הצעד הבא בעסק','שותפת אחריות','מנטורית מנוסה','שיפור סגירה','תכנית חודשית']::text[],
  rooms = '["שולחן תרגול מכירות", "מעגל מנטוריות", "שולחן אחריות", "פינת פיץ׳", "שולחן שיתופי פעולה", "מעגל תמחור והצעה", "קפה נטוורקינג", "חדר חשיבה עסקית", "שולחן תוכן ושיווק", "מעגל צמיחה"]'::jsonb
from c
where t.community_id = c.id;

-- Make invites compatible with the current app and legacy schema.
alter table public.invites
add column if not exists sender_profile_id uuid references public.profiles(id) on delete cascade;

alter table public.invites
add column if not exists receiver_profile_id uuid references public.profiles(id) on delete cascade;

alter table public.invites
add column if not exists title text;

alter table public.invites
add column if not exists message text;

alter table public.invites
add column if not exists proposed_times text;

alter table public.invites
add column if not exists status text default 'sent';

alter table public.invites
add column if not exists created_at timestamptz default now();

alter table public.invites
add column if not exists community_id uuid references public.communities(id) on delete cascade;

alter table public.invites
add column if not exists sender_key text;

alter table public.invites
add column if not exists receiver_key text;

alter table public.invites
alter column sender_key drop not null;

alter table public.invites
alter column receiver_key drop not null;

alter table public.invites
alter column sender_key set default '';

alter table public.invites
alter column receiver_key set default '';

notify pgrst, 'reload schema';
