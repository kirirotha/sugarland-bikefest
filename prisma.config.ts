import { config as loadEnv } from "dotenv";
import { defineConfig } from "@prisma/config";
import { withWaiverSchema } from "./lib/db-url";

// Prisma 7+ moved the connection URL out of schema.prisma. This config is
// used by the Prisma CLI (migrate, studio, etc.) — the app's runtime client
// in lib/prisma.ts gets its own copy of the URL via a driver adapter.
//
// Unlike `next dev`/`next build`, the standalone Prisma CLI doesn't know
// about Next.js's .env.local convention, so load it explicitly.
// quiet: true suppresses dotenv's promotional console tips on every load.
loadEnv({ path: ".env.local", quiet: true });

// This Neon database is shared with an unrelated app (its "public" schema
// already holds User/SiteContent/AuditLog tables) — see lib/db-url.ts.
// Everything Prisma-managed here lives in its own "waivers" schema instead.
//
// `prisma generate` (unlike `migrate`/`studio`) doesn't need a live DB
// connection — just the schema — so don't hard-crash config loading (and
// therefore `npm install`'s postinstall step) when DATABASE_URL isn't set
// yet, e.g. a fresh clone before `.env.local` exists, or a CI/build step
// that only needs the generated client.
const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl ? withWaiverSchema(databaseUrl) : undefined,
  },
});
