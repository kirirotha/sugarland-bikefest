import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO: Record<string, string> = {
  sponsor: "sponsors@sugarlandbikefest.com",
  volunteer: "hello@sugarlandbikefest.com",
  subscribe: "hello@sugarlandbikefest.com",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { source = "inquiry", name, email, interest, notes, message } = body;

  const to = TO[source] ?? "hello@sugarlandbikefest.com";
  const subject = source === "sponsor"
    ? `Sponsor inquiry from ${name}`
    : source === "volunteer"
    ? `Volunteer sign-up from ${name}`
    : `New inquiry from ${name}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    interest ? `Interest: ${interest}` : null,
    notes ? `Notes: ${notes}` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean).join("\n");

  try {
    await resend.emails.send({
      from: "Sugar Land Bike Fest <hello@sugarlandbikefest.com>",
      to,
      replyTo: email,
      subject,
      text,
    });
  } catch (err) {
    console.error("[inquiry] email failed", err);
  }

  return NextResponse.json({ ok: true });
}
