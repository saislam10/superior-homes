import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas",
  white: "bg-surface",
  mist: "bg-mist-100",
  navy: "bg-brand-900 text-white",
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  /** id of the heading that labels this section. */
  labelledBy?: string;
};

export function Section({ children, tone = "canvas", className, id, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("section-y", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Use light text when placed on a dark background. */
  inverted?: boolean;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  inverted = false,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
            inverted ? "text-leaf-300" : "text-leaf-700",
          )}
        >
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-leaf-500" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <div className={cn("mt-5 text-lg leading-relaxed", inverted ? "text-white/80" : "text-ink-muted")}>
          {intro}
        </div>
      )}
    </div>
  );
}
