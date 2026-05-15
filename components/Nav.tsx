"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#activities", label: "Activities" },
  { href: "#schedule", label: "Schedule" },
  { href: "#results", label: "Results" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#volunteer", label: "Volunteer" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "backdrop-blur-md bg-[#0e0c0a]/85 border-white/10 shadow-lg shadow-black/30" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 min-w-0">
          <a href="https://fbmba.org/" target="_blank" rel="noreferrer" className="relative shrink-0 group/fbmba" aria-label="Fort Bend Mountain Bike Association">
            <Image
              src="/images/FBMBA-logo.png"
              alt="FBMBA logo"
              width={40}
              height={40}
              className="rounded-full hover:scale-110 transition-transform duration-200"
            />
            <span className="pointer-events-none absolute left-0 top-full mt-2 w-max rounded-lg bg-[#0e0c0a]/90 px-3 py-1.5 text-xs text-cream shadow-lg opacity-0 group-hover/fbmba:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Fort Bend Mountain Bike Association ↗
            </span>
          </a>
          <Link href="/" className="font-display text-sm sm:text-base lg:text-lg font-semibold text-cream truncate hover:text-golden transition-colors">
            Sugar Land Bike Fest
          </Link>
        </div>

        <ul className="hidden xl:flex items-center gap-5 text-sm font-medium text-cream/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-sunset transition-colors whitespace-nowrap">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#hero"
          className="hidden xl:inline-flex rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sunset/30 hover:bg-sunset-deep transition whitespace-nowrap"
        >
          Get Updates
        </a>


        <button
          aria-label="Toggle menu"
          className="xl:hidden p-3 text-cream min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="xl:hidden border-t border-white/10 bg-[#0e0c0a]/95 backdrop-blur">
          <ul className="flex flex-col px-4 sm:px-6 py-3 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-3 text-base text-cream/80 hover:text-golden min-h-[44px] flex items-center"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a
                href="#hero"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-full bg-sunset px-5 py-3 text-sm font-semibold text-white"
              >
                Get Updates
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
