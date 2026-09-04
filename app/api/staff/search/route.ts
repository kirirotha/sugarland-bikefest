import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { STAFF_COOKIE, verifyStaffSession } from "@/lib/staffAuth";

export async function GET(req: NextRequest) {
  // Defense in depth — proxy.ts already gates this route, but re-check here
  // in case the route is ever reached another way.
  const token = (await cookies()).get(STAFF_COOKIE)?.value;
  if (!verifyStaffSession(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  if (q.length < 2) {
    return NextResponse.json({ ok: true, results: [] });
  }

  const results = await prisma.waiver.findMany({
    where: {
      OR: [
        { participantName: { contains: q, mode: "insensitive" } },
        { confirmationCode: { equals: q.toUpperCase() } },
      ],
    },
    select: {
      id: true,
      participantName: true,
      dob: true,
      isMinor: true,
      guardianName: true,
      signedBy: true,
      confirmationCode: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ ok: true, results });
}
