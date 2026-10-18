import type { Metadata } from "next";
import { mainNav } from "@/config/navigation";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="section-y">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf-700">404</p>
        <h1 className="mt-4 text-4xl text-ink sm:text-5xl">We couldn’t find that page.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          The page may have moved, or the address may be mistyped. If you followed a link from our previous website,
          the page you’re looking for may now live somewhere new.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" withArrow>
            Go to the homepage
          </ButtonLink>
        </div>
        <h2 className="mt-14 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
          Popular pages
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <TextLink href={item.href}>{item.label}</TextLink>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
