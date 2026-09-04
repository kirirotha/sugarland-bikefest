import { createHmac, timingSafeEqual } from "crypto";

// Minimal shared-password session for the staff/admin waiver tools.
// Not a full user-account system — FBMBA is a small volunteer org and these
// pages just need to keep the public from browsing signed waivers. One
// shared password (STAFF_PASSWORD env var), signed cookie so it can't be
// forged without AUTH_SECRET, 12-hour expiry.

export const STAFF_COOKIE = "slbf_staff";
const SESSION_MS = 12 * 60 * 60 * 1000;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createStaffSession(): string {
  const expires = Date.now() + SESSION_MS;
  const payload = `${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyStaffSession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}
