import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-sunset text-white hover:bg-sunset-deep shadow-lg shadow-sunset/30 hover:shadow-sunset/50",
  secondary:
    "bg-forest text-cream hover:bg-forest-deep shadow-lg shadow-forest/20",
  ghost:
    "bg-cream-warm/60 backdrop-blur text-ink hover:bg-cream-warm border border-ink/10",
};

type Props = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({ href, variant = "primary", children, className = "", type }: Props) {
  const cls = `inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls}>
      {children}
    </button>
  );
}
