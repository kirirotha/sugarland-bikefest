import { Resend } from "resend";

// Lazy singleton — constructing Resend eagerly at module scope throws when
// RESEND_API_KEY is unset, which breaks `next build`'s page-data collection
// (it evaluates route modules even though the key is only needed at
// request time).
let client: Resend | null = null;

export function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}
