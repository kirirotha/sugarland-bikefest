"use client";
import Link from "next/link";
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-[#0e0c0a]/85 border-b border-white/10 shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2 group min-w-0">
          <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-sunset text-white font-display font-bold text-sm transition-transform group-hover:rotate-12">
            SL
          </span>
          <span className="font-display text-sm sm:text-base lg:text-lg font-semibold text-cream truncate">
            Sugar Land Bike Fest
          </span>
        </Link>

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
