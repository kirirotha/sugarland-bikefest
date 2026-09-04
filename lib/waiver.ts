import { z } from "zod";

// The event date used to determine minor status (participant's age as of
// the event, not as of signing). Keep in sync with layout.tsx eventJsonLd.
export const EVENT_DATE = new Date("2026-10-24T08:00:00-05:00");

// Uses UTC getters throughout so the result doesn't depend on the server's
// local timezone: `dob` comes from an HTML date input (parsed as UTC
// midnight), and EVENT_DATE is a fixed instant — comparing local calendar
// fields on either could shift the perceived date by one depending on where
// the process happens to run, which matters here since it decides whether a
// guardian signature is legally required.
export function isMinorOnEventDate(dob: Date, eventDate: Date = EVENT_DATE): boolean {
  let age = eventDate.getUTCFullYear() - dob.getUTCFullYear();
  const monthDiff = eventDate.getUTCMonth() - dob.getUTCMonth();
  if (monthDiff < 0 || (monthDiff === 0 && eventDate.getUTCDate() < dob.getUTCDate())) {
    age--;
  }
  return age < 18;
}

const phoneRegex = /^[\d\s()+-]{7,20}$/;

export const waiverSchema = z
  .object({
    participantName: z.string().trim().min(2, "Enter the participant's full name"),
    participantEmail: z.string().trim().email("Enter a valid email"),
    participantPhone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
    dob: z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date of birth"),

    guardianName: z.string().trim().optional().or(z.literal("")),
    guardianEmail: z.string().trim().optional().or(z.literal("")),
    guardianPhone: z.string().trim().optional().or(z.literal("")),

    emergencyContactName: z.string().trim().min(2, "Enter an emergency contact name"),
    emergencyContactPhone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),

    signatureName: z.string().trim().min(2, "Type your full legal name to sign"),
    agreedToTerms: z.literal(true, {
      error: "You must agree to the waiver terms",
    }),
  })
  .superRefine((data, ctx) => {
    const dob = new Date(data.dob);
    if (Number.isNaN(dob.getTime())) return;
    const minor = isMinorOnEventDate(dob);
    if (minor) {
      if (!data.guardianName || data.guardianName.trim().length < 2) {
        ctx.addIssue({ code: "custom", path: ["guardianName"], message: "Parent/guardian name is required for participants under 18" });
      }
      if (!data.guardianEmail || !z.string().email().safeParse(data.guardianEmail).success) {
        ctx.addIssue({ code: "custom", path: ["guardianEmail"], message: "Enter a valid guardian email" });
      }
      if (!data.guardianPhone || !phoneRegex.test(data.guardianPhone)) {
        ctx.addIssue({ code: "custom", path: ["guardianPhone"], message: "Enter a valid guardian phone number" });
      }
    }
  });

export type WaiverInput = z.infer<typeof waiverSchema>;

// DOB is a date-only value (midnight UTC). Formatting it with the browser's
// local timezone can roll it back a day for anyone west of UTC — pin the
// display to UTC so it always matches what was entered.
export function formatDateOnly(iso: string | Date): string {
  return new Date(iso).toLocaleDateString(undefined, { timeZone: "UTC" });
}
