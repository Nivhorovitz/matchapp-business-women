-- Sparkco Weekly Peer Value Cycle — proposed shared-data schema.
-- IMPORTANT: This file is intentionally NOT applied yet. The current Supabase management
-- connection is failing DB password authentication. Apply only after access is restored.
-- Security model: browser clients should NOT receive service-role credentials. Use an
-- authenticated backend / Edge Function for writes and manager operations.

create extension if not exists pgcrypto;

create table if not exists public.pv_members (
  id uuid primary key default gen_random_uuid(),
  community_key text not null default 'business_women',
  name text not null,
  email text not null,
  auth_user_id uuid null references auth.users(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (community_key, email)
);

create table if not exists public.pv_cycles (
  id uuid primary key default gen_random_uuid(),
  community_key text not null default 'business_women',
  week_start date not null,
  request_deadline timestamptz,
  status text not null default 'collecting' check (status in ('collecting','orchestrating','scheduled','closed')),
  created_at timestamptz not null default now(),
  unique (community_key, week_start)
);

create table if not exists public.pv_requests (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.pv_cycles(id) on delete cascade,
  member_id uuid not null references public.pv_members(id) on delete cascade,
  recipe text not null check (recipe in ('problem','referral','feedback','collaboration')),
  need_text text not null,
  offer_text text not null,
  committed boolean not null default false,
  status text not null default 'submitted' check (status in ('submitted','matched','unmatched','withdrawn')),
  created_at timestamptz not null default now(),
  unique (cycle_id, member_id)
);

create table if not exists public.pv_request_slots (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.pv_requests(id) on delete cascade,
  slot_key text not null,
  starts_at timestamptz not null,
  committed boolean not null default true,
  unique (request_id, starts_at)
);

create table if not exists public.pv_rooms (
  id uuid primary key default gen_random_uuid(),
  community_key text not null default 'business_women',
  room_key text,
  name text not null,
  room_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (community_key, room_url)
);

create table if not exists public.pv_sessions (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.pv_cycles(id) on delete cascade,
  recipe text not null check (recipe in ('problem','referral','feedback','collaboration')),
  starts_at timestamptz not null,
  duration_minutes integer not null check (duration_minutes between 5 and 180),
  room_id uuid references public.pv_rooms(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','ready','invite_sent','confirmed','cancelled','completed')),
  calendar_event_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.pv_session_members (
  session_id uuid not null references public.pv_sessions(id) on delete cascade,
  member_id uuid not null references public.pv_members(id) on delete cascade,
  request_id uuid references public.pv_requests(id) on delete set null,
  attendance_status text not null default 'invited' check (attendance_status in ('invited','accepted','declined','attended','no_show')),
  primary key (session_id, member_id)
);

create table if not exists public.pv_invites (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pv_sessions(id) on delete cascade,
  provider text not null default 'google_calendar',
  provider_event_id text,
  sent_at timestamptz,
  status text not null default 'pending' check (status in ('pending','sent','failed','cancelled')),
  last_error text,
  unique (session_id, provider)
);

create table if not exists public.pv_value_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.pv_sessions(id) on delete cascade,
  provider_member_id uuid references public.pv_members(id) on delete set null,
  recipient_member_id uuid references public.pv_members(id) on delete set null,
  value_type text not null,
  note text,
  mutual boolean not null default false,
  followup_created boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.pv_members enable row level security;
alter table public.pv_cycles enable row level security;
alter table public.pv_requests enable row level security;
alter table public.pv_request_slots enable row level security;
alter table public.pv_rooms enable row level security;
alter table public.pv_sessions enable row level security;
alter table public.pv_session_members enable row level security;
alter table public.pv_invites enable row level security;
alter table public.pv_value_events enable row level security;

-- No permissive browser policies are created here on purpose.
-- Recommended MVP: authenticated server/Edge Function performs writes; manager UI uses a
-- manager role checked server-side. If direct client access is later introduced, add narrow
-- ownership/community-membership policies only after identity is finalized.
