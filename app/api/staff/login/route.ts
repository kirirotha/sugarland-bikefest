import { NextResponse } from "next/server";
import { createStaffSession, STAFF_COOKIE } from "@/lib/staffAuth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const expected = process.env.STAFF_PASSWORD;
  if (!expected) {
    console.error("[staff/login] STAFF_PASSWORD is not set");
    return NextResponse.json({ ok: false, error: "Staff login is not configured" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, createStaffSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
