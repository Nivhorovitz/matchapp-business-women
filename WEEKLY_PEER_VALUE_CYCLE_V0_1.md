# Weekly Peer Value Cycle v0.1

## Product thesis
Sparkco should not wait for members to be simultaneously present in the spatial environment. The weekly cycle operates outside and inside the space:

1. **Outside Sparkco:** capture needs, commitment and availability; orchestrate groups; send confirmed invitations.
2. **Inside Sparkco:** run the selected Interaction Recipe in the assigned room; capture multiple Value Events.

## Weekly ritual
- **Sunday:** members submit one current need, what they can offer, and commit to Tuesday and/or Thursday 20:00.
- **Monday:** managers open the Monday Orchestration Board. Sparkco generates groups, flags exceptions, and assigns rooms.
- **Tuesday / Thursday:** each confirmed group enters its assigned Sparkco room. The room contains the Peer Value Lab in `?embed=true` mode.
- **After session:** multiple Value Events and follow-ups are captured and aggregated into the manager dashboard.

## Commitment model
The slot selection is not soft availability. The UI explicitly says: “If Sparkco assigns me to a slot I selected, I commit to attend.” Therefore a valid group can move directly to `ready` / invitation without a second RSVP step. Calendar still gives attendees the normal accept/decline controls.

## Interaction Recipes in v0.1
- Business Problem Clinic: ideal 4, minimum 3, 25 min.
- Referral Exchange: ideal 4, minimum 3, 15 min.
- Feedback Lab: ideal 4, minimum 3, 20 min.
- Collaboration Builder: ideal 3, minimum 2, 25 min.

## Monday Orchestration Board
Three queues:
- **Ready to schedule:** valid group + committed common slot + assigned room.
- **Needs attention:** valid group but missing room or another operational issue.
- **Unmatched:** requests that cannot yet form a minimum viable group.

The current demo uses a deterministic browser-side greedy grouping algorithm. Production should move orchestration server-side and record why each grouping was made.

## Sparkco room CSV
`weekly-cycle.html` can import a CSV exported from Sparkco. It attempts to detect a room/name column and a URL/link column. Rooms are allocated independently per time slot, so the same room can be reused Tuesday and Thursday.

## Calendar layer
Current demo button: **פתיחת זימון מוכן**. It opens a Google Calendar create-event URL with:
- recipe/session name
- start/end time
- all attendee email addresses
- assigned room URL as location/details

Production adapter is included as `calendar-invite.vercel.example.js`. After one organizer account authorizes Google Calendar with offline access and the refresh token is stored server-side, the backend can call `events.insert` with `sendUpdates=all` and send attendee invitations without manual copying.

## Shared database
Proposed schema: `pv_weekly_cycle_schema.sql`.

Tables:
- `pv_members`
- `pv_cycles`
- `pv_requests`
- `pv_request_slots`
- `pv_rooms`
- `pv_sessions`
- `pv_session_members`
- `pv_invites`
- `pv_value_events`

All tables enable RLS. No permissive browser policies are included. Browser clients must never receive a service-role key.

## Current technical blocker
The existing Supabase project `sparkco-braindates` reports `ACTIVE_HEALTHY`, but management SQL/type-generation calls currently fail with database password authentication errors. Therefore the schema has **not** been applied and the live shared-data layer is not being falsely represented as complete.

## Next production step
1. Restore Supabase management DB access.
2. Apply `pv_weekly_cycle_schema.sql` as a migration.
3. Add authenticated server/Edge endpoints for weekly request submission and manager board reads/writes.
4. Import real Sparkco room CSV.
5. Connect one club Google Calendar organizer account through OAuth offline access.
6. Switch calendar button from prefilled event review to server-side `Create & Send`.
7. Pass `session` + `recipe` into the embedded Peer Value Lab.
