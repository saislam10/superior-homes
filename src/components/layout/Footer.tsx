import Link from "next/link";
import { footerNav, legalNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { confirmedServiceAreas, proposedServiceAreas } from "@/config/service-areas";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Logo } from "./Logo";

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="bg-brand-900 text-white/80">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo inverted />
            <p className="mt-5 max-w-sm leading-relaxed">
              Personalized custom homes in {siteConfig.primaryMarket.city}, {siteConfig.primaryMarket.region}, and
              surrounding communities.
            </p>
            <ButtonLink href={primaryCta.href} variant="light" className="mt-7">
              {primaryCta.label}
            </ButtonLink>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading}`} className="lg:col-span-2">
              <h2
                id={`footer-${group.heading}`}
                className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-leaf-300"
              >
                {group.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white hover:underline hover:underline-offset-4">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-leaf-300">Contact</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p>
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                    {contact.phone}
                  </a>
                ) : (
                  <Placeholder>Phone number — to be provided</Placeholder>
                )}
              </p>
              <p>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="hover:text-white">
                    {contact.email}
                  </a>
                ) : (
                  <Placeholder>Email address — to be provided</Placeholder>
                )}
              </p>
              {contact.address && (
                <p>
                  {contact.address.streetAddress}
                  <br />
                  {contact.address.addressLocality}, {contact.address.addressRegion} {contact.address.postalCode}
                </p>
              )}
            </address>

            <h2 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-leaf-300">
              Service area
            </h2>
            <p className="mt-4 leading-relaxed">
              {confirmedServiceAreas.map((a) => a.name).join(", ")} and surrounding communities.{" "}
              {proposedServiceAreas.length > 0 && (
                <Link href="/service-areas" className="underline underline-offset-4 hover:text-white">
                  See service areas
                </Link>
              )}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.name} · {siteConfig.siteName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
