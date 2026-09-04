// Pins the Postgres connection to a dedicated "waivers" schema instead of
// the default "public" schema, which this Neon database already uses for
// an unrelated app (User/SiteContent/AuditLog tables). Keeps our tables
// fully isolated — Prisma creates the schema automatically on first
// migrate/push if it doesn't exist yet.
export const WAIVER_SCHEMA = "waivers";

export function withWaiverSchema(databaseUrl: string): string {
  const url = new URL(databaseUrl);
  url.searchParams.set("schema", WAIVER_SCHEMA);
  return url.toString();
}
