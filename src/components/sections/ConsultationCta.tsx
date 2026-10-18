import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type ConsultationCtaProps = {
  title?: string;
  body?: string;
};

export function ConsultationCta({
  title = "Let’s talk about the home you have in mind.",
  body = "Share a few details about your plans — where you’d like to build, roughly what you want to spend, and when. We’ll follow up to talk it through. There’s no obligation.",
}: ConsultationCtaProps) {
  const { phone, email } = siteConfig.contact;

  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Image src={images.planReview.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cta-heading" className="text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="light" withArrow>
              Start a Conversation
            </ButtonLink>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={buttonClasses("outline-light")}>
                <Phone aria-hidden="true" className="size-4" />
                Call us
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className={buttonClasses("outline-light")}>
                <Mail aria-hidden="true" className="size-4" />
                Email us
              </a>
            )}
          </div>
          {siteConfig.contact.visitingHours && (
            <p className="mt-8 text-white/75">Visit us: {siteConfig.contact.visitingHours}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
