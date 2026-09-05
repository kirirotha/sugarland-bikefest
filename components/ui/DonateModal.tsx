"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import Modal from "./Modal";

type Props = { open: boolean; onClose: () => void };

export default function DonateModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Support Bike Fest via Zelle"
      subtitle="Scan the code below with your banking app to send a contribution."
      maxWidth="max-w-md"
      fadeIn
    >
      <div className="flex flex-col items-center px-5 sm:px-8 py-8 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sunset/10 text-sunset mb-4">
          <Heart size={22} />
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
          <Image
            src="/images/FBMBA_Zelle QR.png"
            alt="Zelle QR code to donate to Fort Bend Mountain Bike Association"
            width={280}
            height={280}
            className="h-56 w-56 sm:h-64 sm:w-64 object-contain"
          />
        </div>

        <p className="mt-5 font-display text-lg font-semibold text-forest-deep">
          Fort Bend Mountain Bike Association
        </p>
        <p className="text-sm text-ink/60">Zelle: 288-644-9041</p>

        <p className="mt-4 text-xs text-ink/50 max-w-xs leading-relaxed">
          Every contribution — big or small — goes directly toward putting on Sugar Land Bike Fest
          and building a stronger cycling community in Fort Bend.
        </p>

        <button
          onClick={onClose}
          className="mt-6 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white hover:bg-sunset-deep transition min-h-[44px]"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
