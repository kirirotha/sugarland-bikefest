import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let email = "";
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    email = body?.email ?? "";
  } else {
    const form = await req.formData();
    email = String(form.get("email") ?? "");
  }

  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Sugar Land Bike Fest <hello@sugarlandbikefest.com>",
      to: "kirirotha@gmail.com",
      replyTo: email,
      subject: `New subscriber: ${email}`,
      text: `New mailing list sign-up:\n\nEmail: ${email}`,
    });
  } catch (err) {
    console.error("[subscribe] email failed", err);
  }

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/?subscribed=1", req.url), 303);
}
