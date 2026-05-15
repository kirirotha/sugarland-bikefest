import Link from "next/link";
import { Camera, Users as FbIcon, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 bg-forest-deep text-cream">
      <div className="absolute inset-x-0 -top-1 h-2 bg-gradient-to-r from-golden via-sunset to-sunset-deep" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-white font-display font-bold">
                SL
              </span>
              <span className="font-display text-lg font-semibold">Sugar Land Bike Fest</span>
            </div>
            <p className="mt-4 max-w-md text-cream/70 text-sm leading-relaxed">
              A community cycling festival hosted by Fort Bend Mountain Bike Association.
              Growing cycling in Sugar Land — one ride at a time.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-golden mb-3">Event</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><a href="#about" className="hover:text-sunset transition">About</a></li>
              <li><a href="#schedule" className="hover:text-sunset transition">Schedule</a></li>
              <li><a href="#activities" className="hover:text-sunset transition">Activities</a></li>
              <li><a href="#location" className="hover:text-sunset transition">Location</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-golden mb-3">Get Involved</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><a href="#sponsors" className="hover:text-sunset transition">Sponsor</a></li>
              <li><a href="#volunteer" className="hover:text-sunset transition">Volunteer</a></li>
              <li><a href="#faq" className="hover:text-sunset transition">FAQ</a></li>
              <li>
                <a href="https://fbmba.org" target="_blank" rel="noreferrer" className="hover:text-sunset transition">
                  FBMBA.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-cream/15 pt-6">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} Sugar Land Bike Fest · Hosted by FBMBA. All rights reserved.
            {" "}·{" "}
            <Link href="/privacy" className="hover:text-sunset transition underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <div className="flex gap-3">
            <a aria-label="Instagram" href="#" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:bg-sunset hover:border-sunset transition min-h-[44px] min-w-[44px]">
              <Camera size={16} />
            </a>
            <a aria-label="Facebook" href="#" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:bg-sunset hover:border-sunset transition min-h-[44px] min-w-[44px]">
              <FbIcon size={16} />
            </a>
            <a aria-label="Email" href="mailto:hello@sugarlandbikefest.com" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:bg-sunset hover:border-sunset transition min-h-[44px] min-w-[44px]">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
