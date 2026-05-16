# Services & Integrations

A reference for every external service connected to Sugar Land Bike Fest.

---

## Domain
- **Provider:** Squarespace
- **Domain:** sugarlandbikefest.com
- **DNS:** Managed in Squarespace → Domains → DNS Settings
- **Email Forwarding:** hello@, questions@, sponsors@ all forward to kirirotha@gmail.com

## Hosting
- **Provider:** Vercel
- **Repo:** github.com/kirirotha/sugarland-bikefest
- **Auto-deploy:** Every push to `master` deploys automatically
- **Environment Variables:** RESEND_API_KEY, BREVO_API_KEY

## Code Repository
- **Provider:** GitHub
- **Repo:** kirirotha/sugarland-bikefest
- **Branch:** master

## Transactional Email (Form Submissions)
- **Provider:** Resend (resend.com)
- **Domain verified:** sugarlandbikefest.com
- **From address:** hello@sugarlandbikefest.com
- **Delivers to:** kirirotha@gmail.com
- **Used for:** Volunteer form, Sponsor form, Subscribe notifications
- **API Key:** stored in Vercel as RESEND_API_KEY

## Mailing List
- **Provider:** Brevo (brevo.com)
- **Used for:** "Get Updates" subscriber list
- **API Key:** stored in Vercel as BREVO_API_KEY
- **Status:** Connected (wiring in progress)

## Map
- **Provider:** Google My Maps
- **Map ID:** 104oqvGK7ZZElXx2hbiRUMQV7RUix2PE
- **Pins:** Sugar Land Pump Track (Sat) + South Meadow at Sugar Land Memorial Park (Sun)

## Analytics
- None configured yet

## Social
- Instagram: placeholder (not yet linked)
- Facebook: placeholder (not yet linked)
