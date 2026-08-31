# Sparkco Peer Value Lab — Women in Business v0.1

## Purpose

Test one thesis:

> Can the club systematically create measurable business value between members, without the club leaders needing to be the source of value every time?

The atomic unit is a **Value Event**: one member arrives with a real need and leaves with something useful because another member was there.

## Wednesday demo

Open `peer-value-lab.html` through the existing GitHub Pages deployment for this repository.

The demo is deliberately separate from the existing Spark Match app, so it cannot break the current experience.

Demo flow:

1. Member enters a current business need and what she can offer.
2. Sparkco creates a suggested quartet.
3. The quartet receives a structured 25-minute Business Problem Clinic.
4. The member records who helped her and what value was created.
5. A manager dashboard updates with the new Value Event.

The current demo uses seeded members + browser localStorage. It is a proof-of-experience, not yet a multi-user production pilot.

## Existing assets we can reuse

From the current `matchapp-business-women` app:

- Hebrew RTL interface
- existing community taxonomy
- `profiles` with current focus, needs and offers
- persistent browser `user_key`
- matching logic
- existing Supabase project and publishable client key
- hidden manager view

This means the live Peer Value Lab is an evolution of Spark Match, not a new product from zero.

## Live pilot data model

Minimum entities:

### members
Reuse existing `profiles` initially. Before real use, add a secure authenticated identity mapping.

### sessions
One club meeting / event.

Suggested fields:
- `id`
- `community_id`
- `event_key`
- `title`
- `starts_at`
- `status`

### session_needs
What a member needs and can offer in this specific session.

Suggested fields:
- `session_id`
- `profile_id`
- `need_text`
- `need_tags[]`
- `offer_text`
- `offer_tags[]`
- `created_at`

### interactions
A 1:1, trio or quartet created by the orchestration layer.

Suggested fields:
- `session_id`
- `format`
- `purpose`
- `status`
- `started_at`
- `ended_at`

### interaction_members
Membership of an interaction.

Suggested fields:
- `interaction_id`
- `profile_id`

### value_events
The core measurement object.

Suggested fields:
- `session_id`
- `interaction_id`
- `recipient_profile_id`
- `provider_profile_id`
- `value_types[]`
- `note`
- `followup_planned`
- `created_at`

Initial value types:
- useful idea
- practical advice
- feedback
- introduction / referral
- potential partner
- professional knowledge
- clearer decision

### followups
Closes the loop after the interaction.

Suggested fields:
- `value_event_id`
- `recipient_profile_id`
- `provider_profile_id`
- `status` (`planned`, `happened`, `did_not_happen`, `pending`)
- `outcome_type`
- `outcome_note`
- `updated_at`

## Metrics for the first pilot

### Peer Value Coverage
Percentage of active members who received at least one Value Event from another member during the measurement period.

Initial success target: **70%+ monthly**.

### Follow-up Rate
Percentage of useful interactions that continue beyond the original club session.

Initial success target: **30%+**.

### Host Independence
Percentage of Value Events in which neither club leader was the source of the value.

### Connection Yield
Suggested matches that become completed interactions.

### Value Exchange Rate
Completed interactions that produce at least one reported Value Event.

## Technology readiness gates

### Gate A — Wednesday demo
Status: **built**

- full member flow
- quartet suggestion
- structured clinic
- Value Event capture
- dashboard
- demo reset

### Gate B — Shared live pilot
Status: **not yet complete**

Required before real member data is collected:

1. Decide persistent identity approach.
2. Add Supabase Auth or another secure member identity mapping.
3. Add new pilot tables.
4. Enable RLS on every exposed table.
5. Add explicit Data API grants where required by current Supabase defaults.
6. Verify allow/deny behavior for member and manager roles.
7. Replace local demo storage with Supabase writes and reads.
8. Add an `event_id` / `session_id` to every live interaction.

Do not solve the security gate by exposing a service-role/secret key in the browser.

## Recommended identity approach for pilot

Keep member friction low but do not rely long term on the current random localStorage `user_key` alone.

Recommended progression:

1. Demo: local identity only.
2. Closed pilot: authenticated member identity with a very lightweight entry flow.
3. Production: persistent account / invite identity that can survive device changes and support longitudinal measurement.

## What we deliberately do NOT build yet

- billing
- community feed
- course platform
- full CRM
- autonomous AI matching
- autonomous Sparki facilitation
- gamification
- mobile app
- replacement for WhatsApp

The purpose of v0.1 is learning, not feature completeness.

## Pilot question after three club sessions

Do not ask only whether members liked Sparkco.

Ask:

1. Did at least 70% of active members receive useful value from another member?
2. Did at least 30% of useful connections continue after the session?
3. Can the leaders identify members who are not receiving value and intervene?
4. Do members describe the other members as a material reason the club is worth belonging to?

If those answers are strong, the Peer Value Engine thesis has evidence worth taking to larger professional memberships.
