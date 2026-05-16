# Services & Integrations

A reference for every external service connected to Sugar Land Bike Fest.

---

## Domain
- **Provider:** Squarespace
- **Domain:** sugarlandbikefest.com
- **DNS:** Managed in Squarespace → Domains → DNS Settings
- **Email Forwarding:** hello@, questions@, sponsors@ → kirirotha@gmail.com

## Hosting
- **Provider:** Vercel (signed in with GitHub)
- **Auto-deploy:** Every push to `master`
- **Environment Variables:** RESEND_API_KEY, BREVO_API_KEY

## Code Repository
- **Provider:** GitHub
- **Repo:** kirirotha/sugarland-bikefest
- **Branch:** master

## Transactional Email
- **Provider:** Resend (resend.com, signed in with Google)
- **Domain verified:** sugarlandbikefest.com
- **From:** hello@sugarlandbikefest.com
- **Delivers to:** kirirotha@gmail.com
- **API Key:** stored in Vercel as `RESEND_API_KEY`
- **Used for:** Volunteer form, Sponsor form, Subscribe notifications

## Mailing List
- **Provider:** Brevo (brevo.com, signed in with Google)
- **List:** "Your first list" — List ID #2
- **API Key:** stored in Vercel as `BREVO_API_KEY`
- **Used for:** "Get Updates" subscriber list

## Map
- **Provider:** Google My Maps (Kiri's Google account)
- **Map ID:** 104oqvGK7ZZElXx2hbiRUMQV7RUix2PE
- **Pins:** Sugar Land Pump Track (Sat) + South Meadow at Sugar Land Memorial Park (Sun)
- **Saturday directions:** maps.app.goo.gl/bEKWwyC7MWatYk5AA
- **Sunday directions:** maps.app.goo.gl/HXVgFRz3cVD1oBAA8

## Social (Pending)
- Instagram: not created yet — footer link is placeholder
- Facebook: not created yet — footer link is placeholder

## Analytics
- None configured yet
