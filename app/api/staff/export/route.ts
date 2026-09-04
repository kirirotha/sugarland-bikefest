import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { STAFF_COOKIE, verifyStaffSession } from "@/lib/staffAuth";

function csvEscape(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  const token = (await cookies()).get(STAFF_COOKIE)?.value;
  if (!verifyStaffSession(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const waivers = await prisma.waiver.findMany({ orderBy: { createdAt: "desc" } });

  const headerRow = [
    "Confirmation Code",
    "Signed At",
    "Participant Name",
    "Participant Email",
    "Participant Phone",
    "DOB",
    "Is Minor",
    "Guardian Name",
    "Guardian Email",
    "Guardian Phone",
    "Emergency Contact Name",
    "Emergency Contact Phone",
    "Signature Name",
    "Signed By",
    "Waiver Version",
    "IP Address",
  ];

  const rows = waivers.map((w) => [
    w.confirmationCode,
    w.createdAt.toISOString(),
    w.participantName,
    w.participantEmail,
    w.participantPhone,
    w.dob.toISOString().slice(0, 10),
    w.isMinor ? "Yes" : "No",
    w.guardianName ?? "",
    w.guardianEmail ?? "",
    w.guardianPhone ?? "",
    w.emergencyContactName,
    w.emergencyContactPhone,
    w.signatureName,
    w.signedBy,
    w.waiverVersion,
    w.ipAddress ?? "",
  ]);

  const csv = [headerRow, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="waivers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
