import { NextResponse } from "next/server";
import { STAFF_COOKIE } from "@/lib/staffAuth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Clear the session cookie by re-setting it expired.
  res.cookies.set(STAFF_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
