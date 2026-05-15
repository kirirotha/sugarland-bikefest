import { ReactNode } from "react";
import TiltPanel from "./TiltPanel";

type Accent = "sunset" | "golden" | "forest";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  className?: string;
  accent?: Accent;
  children: ReactNode;
};

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  className = "",
  accent = "sunset",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-4 sm:scroll-mt-6 px-3 sm:px-6 py-6 sm:py-10 md:py-14 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <TiltPanel accent={accent} className="px-4 sm:px-8 md:px-10 py-7 sm:py-10 md:py-14">
          {(eyebrow || title || intro) && (
            <header className="mb-7 sm:mb-10 md:mb-12 max-w-2xl">
              {eyebrow && (
                <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-golden">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-cream leading-tight">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-3 text-sm sm:text-base md:text-lg text-cream/65 leading-relaxed">{intro}</p>}
            </header>
          )}
          {children}
        </TiltPanel>
      </div>
    </section>
  );
}
