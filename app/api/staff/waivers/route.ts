import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { STAFF_COOKIE, verifyStaffSession } from "@/lib/staffAuth";

// Full waiver list for the admin table — separate from /api/staff/search
// (which is the fast, race-day "does this one person have a signed waiver"
// lookup). Sorting/filtering happens client-side against this full set.
export async function GET() {
  const token = (await cookies()).get(STAFF_COOKIE)?.value;
  if (!verifyStaffSession(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const waivers = await prisma.waiver.findMany({
    orderBy: { createdAt: "desc" },
    take: 2000,
    select: {
      id: true,
      confirmationCode: true,
      participantName: true,
      participantEmail: true,
      participantPhone: true,
      dob: true,
      isMinor: true,
      guardianName: true,
      emergencyContactName: true,
      emergencyContactPhone: true,
      signedBy: true,
      waiverVersion: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ ok: true, waivers });
}
