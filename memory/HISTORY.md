# Sugar Land Bike Fest — Session History

_Update this file at the end of every session with a summary of what changed._

---

## Session 1–2 — Initial Build (Phase A–B)
- Scaffolded Next.js 15 + Tailwind v4 + Framer Motion project
- Wired fonts (Fraunces + Inter), CSS token system, layout.tsx
- Built: Nav, Hero, Countdown, About, Activities, Schedule, Sponsors, Volunteer, Location, FAQ, Footer
- Added Ken Burns aerial background in layout
- Deployed to Vercel

## Session 3 — Hero Rework + Visual Polish
- Replaced opaque gradient hero overlay with photo-forward dark vignette
- Added fixed multi-layer logo (pink/cyan/dark/yellow PNGs) with scroll-scatter animation
- Logo layers use `useScroll()` + Framer Motion transforms to fly to corners on scroll
- Added FBMBA banner overlay on logo
- Built `TiltPanel.tsx` — 3D tilt card with `preserve-3d`, `translateZ`, `backdrop-blur-md`
- Applied TiltPanel across About, Activities, Schedule, Sponsors, Volunteer, FAQ sections

## Session 4 — Modals + Forms
- Built `Modal.tsx` — shared portal-based modal shell with spring/fade animation
- Built `SubscribeModal.tsx` — email capture with success state
- Built `SponsorModal.tsx` — tier cards (blurred) + "I'm Interested" inquiry form
- Built `VolunteerModal.tsx` — roles grid + inquiry form with dark-themed inputs
- Fixed nested `<a>` hydration error in Nav (FBMBA logo + Link tag conflict)
- Wired "Get Updates" buttons in Nav (desktop + mobile) and Hero to SubscribeModal
- Fixed modal scroll lock: `overflow:hidden` on `body` only, `scrollbar-gutter:stable` on `html`
- Fixed modal centering: switched to `createPortal(content, document.body)`

## Session 5 — Mobile Compatibility Investigation
- Added `svh` units for hero logo container — prevents jump when mobile toolbar hides
- Changed background container to `100lvh` — stable regardless of toolbar state
- Fixed hamburger menu (was broken due to nav link missing from mobile dropdown)
- Diagnosed Samsung S24 Chrome mobile issue:
  - Panels show only headers, content body invisible
  - Hamburger menu unresponsive
  - Logo does not scatter on scroll
  - **Root cause:** `transformStyle: preserve-3d` + `translateZ(12px)` in TiltPanel
    creates a GPU compositor layer that collapses under mobile viewport scaling
  - Confirmed: "Desktop site" mode on Chrome fixes everything (bypasses mobile viewport scaling)
  - **Approved fix (not yet applied):** Remove `transformStyle: preserve-3d` and
    `translateZ(12px)` from TiltPanel — keep `backdrop-blur-md`
  - Nav `backdrop-blur-md` removal was tested separately and did NOT fix the issue

---

## Session 6 — Liability Waiver System
- Added Prisma 7 (`@prisma/client` + `@prisma/adapter-pg`) for waiver storage on the existing
  Neon Postgres DB (`DATABASE_URL` was already in `.env.local`, previously unused)
- **Discovered the Neon DB is shared with an unrelated app** — its `public` schema already had
  populated `User`/`SiteContent`/`AuditLog` tables not mentioned anywhere in project docs.
  Prisma's first migration attempt offered to reset the whole DB to resolve "drift"; did NOT
  run that. Confirmed with the user, then isolated all waiver tables in their own `waivers`
  Postgres schema (`lib/db-url.ts`, `prisma.config.ts`, adapter `schema` option in
  `lib/prisma.ts`) so nothing touches the pre-existing data. Verified row counts before/after.
- Built `prisma/schema.prisma` (`Waiver` model) + ran the migration against the `waivers` schema
- Note for future Prisma CLI work: Prisma 7 moved the connection URL out of `schema.prisma`
  into `prisma.config.ts`; the CLI doesn't read `.env.local` automatically like `next dev` does,
  so `prisma.config.ts` loads it explicitly via `dotenv`
- Built `/waiver` — public signing form (react-hook-form + zod), auto-shows a parent/guardian
  section when DOB indicates the participant is under 18 as of event day (Oct 24, 2026); saves
  a full snapshot of the waiver text + version signed, IP, user agent; emails a confirmation
  code via Resend
- Built `/staff/login` + `/staff/verify` — shared-password gate (`STAFF_PASSWORD` env var,
  HMAC-signed cookie via `AUTH_SECRET`) for day-of check-in search by name/confirmation code,
  plus a CSV export endpoint. Confirmed via `proxy.ts` — Next 16 renamed `middleware.ts` to
  `proxy.ts` (`export function proxy` instead of `middleware`), function/behavior unchanged
- Fixed a pre-existing bug (not caused by this session, but blocked `npm run build`): all three
  Resend-using API routes constructed `new Resend(...)` at module scope, which throws when
  `RESEND_API_KEY` is unset and crashes Next's build-time page-data collection. Centralized into
  a lazy `lib/resend.ts` singleton, fixing `/api/subscribe` and `/api/inquiry` too
- Fixed a DOB display bug: `toLocaleDateString()` on a date-only UTC value rolled it back a day
  for local timezones behind UTC — added `formatDateOnly()` helper pinned to `timeZone: "UTC"`
- Full QA pass in-browser: adult + minor/guardian submission, staff login, name + confirmation-
  code search, CSV export, and confirmed `/staff/*` genuinely 307-redirects when unauthenticated
  (verified with `curl`, not just the browser tab, since the browser's `fetch` didn't reliably
  respect `credentials: 'omit'` in this tool). Test rows deleted from the DB afterward.

---

_Next session: get the waiver legal text (`content/waiver.ts`, placeholder currently) reviewed
by FBMBA's insurer/attorney before `/waiver` goes live; set real `STAFF_PASSWORD` and
`RESEND_API_KEY` in Vercel env vars (currently only in local `.env.local`, and `RESEND_API_KEY`
isn't set anywhere yet — subscribe/inquiry/waiver confirmation emails have likely never sent).
Also still pending: TiltPanel preserve-3d mobile fix retest on a real Samsung S24._
