-- CreateTable
CREATE TABLE "Waiver" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventLabel" TEXT NOT NULL DEFAULT 'Sugar Land Bike Fest — Oct 24-25, 2026',
    "participantName" TEXT NOT NULL,
    "participantEmail" TEXT NOT NULL,
    "participantPhone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "isMinor" BOOLEAN NOT NULL,
    "guardianName" TEXT,
    "guardianEmail" TEXT,
    "guardianPhone" TEXT,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "signatureName" TEXT NOT NULL,
    "signedBy" TEXT NOT NULL,
    "agreedToTerms" BOOLEAN NOT NULL,
    "waiverVersion" TEXT NOT NULL,
    "waiverText" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "confirmationCode" TEXT NOT NULL,

    CONSTRAINT "Waiver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waiver_confirmationCode_key" ON "Waiver"("confirmationCode");

-- CreateIndex
CREATE INDEX "Waiver_participantName_idx" ON "Waiver"("participantName");

-- CreateIndex
CREATE INDEX "Waiver_participantEmail_idx" ON "Waiver"("participantEmail");

-- CreateIndex
CREATE INDEX "Waiver_confirmationCode_idx" ON "Waiver"("confirmationCode");
