import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getResend } from "@/lib/resend";
import { waiverSchema, isMinorOnEventDate } from "@/lib/waiver";
import { WAIVER_VERSION, WAIVER_TEXT, WAIVER_TITLE } from "@/content/waiver";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = waiverSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const dob = new Date(data.dob);
  const minor = isMinorOnEventDate(dob);
  const signedBy = minor ? "guardian" : "participant";

  const h = await headers();
  const ipAddress =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
  const userAgent = h.get("user-agent");

  // confirmationCode is assigned after insert (derived from the id), so
  // insert first with a placeholder then update — simplest with Prisma's
  // cuid ids, which aren't known until creation.
  let waiver;
  try {
    waiver = await prisma.waiver.create({
      data: {
        participantName: data.participantName,
        participantEmail: data.participantEmail,
        participantPhone: data.participantPhone,
        dob,
        isMinor: minor,
        guardianName: minor ? data.guardianName : null,
        guardianEmail: minor ? data.guardianEmail : null,
        guardianPhone: minor ? data.guardianPhone : null,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        signatureName: data.signatureName,
        signedBy,
        agreedToTerms: data.agreedToTerms,
        waiverVersion: WAIVER_VERSION,
        waiverText: WAIVER_TEXT,
        ipAddress,
        userAgent,
        confirmationCode: "PENDING",
      },
    });
    const confirmationCode = waiver.id.slice(-8).toUpperCase();
    waiver = await prisma.waiver.update({
      where: { id: waiver.id },
      data: { confirmationCode },
    });
  } catch (err) {
    console.error("[waiver] db write failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not save waiver. Please try again." },
      { status: 500 }
    );
  }

  const recipientEmail = minor ? data.guardianEmail : data.participantEmail;
  try {
    await getResend().emails.send({
      from: "Sugar Land Bike Fest <hello@sugarlandbikefest.com>",
      to: recipientEmail || data.participantEmail,
      subject: "Your Sugar Land Bike Fest waiver — confirmation",
      text: [
        `Thanks for signing! Confirmation code: ${waiver.confirmationCode}`,
        `Bring this code (or just your name) to check-in on race day.`,
        ``,
        `Participant: ${data.participantName}`,
        minor ? `Signed by guardian: ${data.signatureName}` : `Signed by: ${data.signatureName}`,
        `Signed: ${waiver.createdAt.toISOString()}`,
        ``,
        `--- ${WAIVER_TITLE} (v${WAIVER_VERSION}) ---`,
        WAIVER_TEXT,
      ].join("\n"),
    });
  } catch (err) {
    // Don't fail the request over email — the record is already saved.
    console.error("[waiver] confirmation email failed", err);
  }

  return NextResponse.json({ ok: true, confirmationCode: waiver.confirmationCode });
}
