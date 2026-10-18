import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/config/images";
import type { Crumb } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  image?: SiteImage;
  children?: ReactNode;
};

/** Header block for interior pages. Holds the page's single <h1>. */
export function PageHero({ eyebrow, title, intro, breadcrumbs, image, children }: PageHeroProps) {
  if (image) {
    return (
      <header className="relative isolate overflow-hidden bg-brand-900 text-white">
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-45"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-brand-900/20" />
        <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28">
          <Breadcrumbs items={breadcrumbs} inverted />
          <div className="mt-16 max-w-3xl sm:mt-24">
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-leaf-300">{eyebrow}</p>
            )}
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</div>}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className="border-b border-mist-200 bg-canvas">
      <Container className="pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-12 max-w-3xl sm:mt-16">
          {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-leaf-700">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
