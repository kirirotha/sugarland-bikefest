import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { WAIVER_SCHEMA } from "./db-url";

// Standard Next.js dev-mode singleton — prevents exhausting DB connections
// from hot-reload creating a new PrismaClient on every edit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma 7+ requires a driver adapter at runtime instead of a schema-level
// datasource url (see prisma.config.ts for the CLI-side equivalent). Pinned
// to the "waivers" schema — this Neon database's "public" schema belongs to
// an unrelated app (User/SiteContent/AuditLog tables). Note: unlike the
// Prisma CLI, the raw `pg` driver doesn't honor a `?schema=` query param —
// it has to be passed as an explicit adapter option instead.
const adapter = new PrismaPg(
  { connectionString: process.env.DATABASE_URL },
  { schema: WAIVER_SCHEMA }
);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
