import { NextResponse } from "next/server";

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

  // v1 stub — log to server. Wire up Resend / Mailchimp later.
  console.log("[subscribe]", email, new Date().toISOString());

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/?subscribed=1", req.url), 303);
}
