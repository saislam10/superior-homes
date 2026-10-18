import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] px-6 py-3 text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-700 focus-visible:outline-brand-600",
  secondary: "border border-ink/25 bg-transparent text-ink hover:border-brand-800 hover:bg-brand-50",
  light: "bg-canvas text-brand-900 hover:bg-white focus-visible:outline-white",
  "outline-light": "border border-white/60 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
};

export function ButtonLink({ href, variant = "primary", children, className, withArrow }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
      {withArrow && <ArrowRight aria-hidden="true" className="size-4" />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}

/** Inline text link with an arrow, for secondary navigation inside sections. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium text-brand-800 underline decoration-brand-800/30 underline-offset-4 hover:decoration-brand-800",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
