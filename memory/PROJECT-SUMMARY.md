# Sugar Land Bike Fest — Project Summary

## What This Is
A marketing website for **Sugar Land Bike Fest**, a community cycling festival hosted by
**Fort Bend Mountain Bike Association (FBMBA)** on **Oct 24–25, 2026** at
**The Crown Festival Park, Sugar Land, TX**.

Year-1 goal: info-only promo site (no registration/payments yet) that drives attendance,
attracts sponsors/vendors, and recruits volunteers.

---

## Stack
- **Next.js 16** (App Router) + TypeScript — see [[nextjs-16-breaking-changes]] for renamed
  APIs vs. what training data expects (middleware→proxy, Prisma-style datasource changes, etc.)
- **Tailwind CSS v4** + CSS variables
- **Framer Motion** — hero scatter animation, countdown, scroll reveals
- **lucide-react** icons
- **Fonts:** Fraunces (display) + Inter (body) via `next/font`
- **Prisma 7** (`@prisma/client` + `@prisma/adapter-pg`) — waiver storage only, see
  [[waiver-system]]
- **Hosting:** Vercel — repo at `C:\Users\K\AIprojects\sugarland-bikefest`

---

## Visual System
| Token | Value | Use |
|---|---|---|
| `sunset` | #F26C3A | Primary CTA, highlights |
| `sunset-deep` | #C44A18 | Hover states |
| `golden` | #E8A230 | Accent |
| `forest` | #1E3528 | Secondary, outdoor tone |
| `cream` | #F0E8D8 | Body text, light elements |
| `ink` | #0E0C0A | Dark backgrounds |

Background: aerial photo with Ken Burns pan animation, dark tint overlay.
Hero: fixed multi-layer logo that scatters apart on scroll.

---

## Site Sections (single-page scroll)
1. **Hero** — logo scatter, countdown to Oct 24 2026, "Get Updates" email modal, "What's Happening" anchor
2. **About** — narrative + 4 value tiles (Race, Ride, Community, Family)
3. **Activities** — visual grid: Race, Pump Track, Kids Area, Group Rides, Vendors
4. **Schedule** — Sat/Sun tabbed timeline
5. **Sponsors** — tier cards + "Become a Sponsor" modal with inquiry form
6. **Volunteer** — CTA + modal with roles grid and inquiry form
7. **Location** — map embed + directions (Google Maps: https://maps.app.goo.gl/bEKWwyC7MWatYk5AA)
8. **FAQ** — accordion
9. **Footer** — FBMBA branding, social links, newsletter

Plus standalone pages outside the scroll: `/waiver` (race liability waiver signing — see
[[waiver-system]]), `/staff/login` + `/staff/verify` (volunteer check-in tools), `/privacy`.

---

## Key Components
| File | Purpose |
|---|---|
| `components/Hero.tsx` | Fixed logo layers, scatter animation, hero content panel |
| `components/Countdown.tsx` | Animated countdown to Oct 24 2026 08:00 CT |
| `components/Nav.tsx` | Sticky nav, hamburger menu, "Get Updates" button |
| `components/ui/TiltPanel.tsx` | 3D tilt card used in About, Activities, Schedule, Sponsors, Volunteer, FAQ |
| `components/ui/Modal.tsx` | Shared modal shell — portal-based, fade/spring animation, scroll lock |
| `components/ui/SubscribeModal.tsx` | Email capture modal (posts to `/api/subscribe`) |
| `components/ui/SponsorModal.tsx` | Sponsor tier cards + inquiry form |
| `components/ui/VolunteerModal.tsx` | Volunteer roles + inquiry form |
| `content/*.ts` | Typed data files for schedule, activities, sponsors, FAQ |
| `app/waiver/page.tsx` | Public liability waiver signing form (guardian flow for minors) |
| `app/staff/verify/page.tsx` | Password-gated day-of check-in search by name/confirmation code |
| `app/staff/login/page.tsx` | Staff shared-password login (sets signed session cookie) |
| `lib/prisma.ts`, `lib/db-url.ts` | Prisma client — pinned to isolated `waivers` Postgres schema |
| `lib/staffAuth.ts` | Signed-cookie session for `/staff/*` — see [[waiver-system]] |
| `proxy.ts` | Gates `/staff/*` routes (Next 16 renamed `middleware.ts` → `proxy.ts`) |

---

## Sponsor Tiers
| Tier | Price |
|---|---|
| Title Sponsor | $2,500+ |
| MTB Time Trial Sponsor | $1,000 – $2,499 |
| Pump Track Sponsor | $1,000 – $2,499 |
| Awards Sponsor | $500 – $999 |
| Bicycle Clubs | FREE |
| Bicycle Shops & Vendors | $100 |
| In-Kind Sponsorship | Contact Us |

Tiers are official (from published sponsorship package). Prices and perks are no longer blurred.

---

## API Routes
- `POST /api/subscribe` — email capture stub
- `POST /api/inquiry` — sponsor/volunteer inquiry stub
- `POST /api/waiver` — saves a signed liability waiver + emails confirmation code
- `POST /api/staff/login` — staff shared-password login
- `GET /api/staff/search` — waiver lookup by name/code (staff-only)
- `GET /api/staff/export` — full waiver CSV export (staff-only)

---

## Waiver System
See [[waiver-system]] for full details. Short version: `/waiver` collects a signed liability
waiver (guardian flow auto-triggers for participants under 18 as of event day) and stores it
in Postgres via Prisma, isolated in its own `waivers` schema in a Neon database that is
**shared with an unrelated app** (its `public` schema has pre-existing `User`/`SiteContent`/
`AuditLog` tables — do not touch those, do not run `prisma migrate reset`). Staff can look up
and export signed waivers at `/staff/verify` behind a shared-password gate.

`content/waiver.ts` now holds FBMBA's actual official waiver wording (not placeholder — see
Known Issues above for two open questions on it). Before launch: set a real `STAFF_PASSWORD`
and `RESEND_API_KEY` in Vercel env vars (not just `.env.local`) — neither was set anywhere
before this feature, so `/api/inquiry` and `/api/subscribe` emails have likely never actually
sent.

---

## Known Issues & Pending Work
- ~~**Mobile rendering on Android Chrome (Samsung S24)**~~ — **fixed.** Removed
  `transformStyle: preserve-3d` and `translateZ(12px)` from `TiltPanel.tsx` (kept
  `backdrop-blur-md`). Still worth a real-device retest on the Samsung S24 to confirm.
- Real photography, final logo, and sponsor logos not yet received from FBMBA
- Exact park address TBD — currently using Crown Festival Park name only
- Email provider not chosen (Resend recommended) — `resend` is already a dependency and wired
  into `/api/subscribe`, `/api/inquiry`, `/api/waiver`, but no `RESEND_API_KEY` is set anywhere
- Domain not yet connected in Vercel
- Waiver text in `content/waiver.ts` is FBMBA's actual official wording (from
  "FBMBA ACTIVITIES WAIVER_04-2025.txt", supplied Sep 2026) — no longer placeholder. Flagged
  two gaps vs. the paper form (clause 6's volunteering/background-check line applying to all
  signers; digital form omitting mailing address + secondary emergency contact) — user
  confirmed both are fine as-is, no changes needed.

---

## Viewport / Mobile Notes
- Background uses `height: 100lvh` — stays stable when mobile toolbar shows/hides
- Hero logo container uses `height: 100svh` — anchored to small viewport, no jump on toolbar hide
- `html { overflow-y: scroll; scrollbar-gutter: stable; }` — preserves scrollbar space
- Modal scroll lock targets `document.body` overflow only (not html) to keep scrollbar visible
- Modals use `createPortal` to render in `document.body` — avoids Framer Motion ancestor transform issues
