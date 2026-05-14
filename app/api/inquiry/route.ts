import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  console.log("[inquiry]", { ...body, ts: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
