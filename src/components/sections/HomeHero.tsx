import Image from "next/image";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HomeHero() {
  const hero = images.heroExterior;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/85 via-brand-900/55 to-brand-900/10"
      />
      <Container className="flex min-h-[38rem] flex-col justify-end pb-16 pt-28 sm:min-h-[42rem] sm:pb-24 lg:min-h-[calc(100dvh-4.5rem)] lg:max-h-[56rem] lg:pb-28">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-300">
            Custom homes · {siteConfig.primaryMarket.city}, {siteConfig.primaryMarket.region}
          </p>
          <h1 id="hero-heading" className="text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-7xl">
            Your home. Your vision. Your budget.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            We design and build custom homes around the way you live — not around a catalog of floor plans. Tell us
            what matters, and we’ll help you shape a home that fits your family, your lot, and what you want to spend.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="light" withArrow>
              Start a Conversation
            </ButtonLink>
            <ButtonLink href="/our-process" variant="outline-light">
              See How It Works
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
