import { mainNav, primaryCta } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-mist-200/80 bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="relative whitespace-nowrap py-2 text-[0.94rem] text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-brand-800 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-px aria-[current=page]:after:bg-brand-800"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <NavLink href={primaryCta.href} className={buttonClasses("primary", "px-5")}>
              {primaryCta.label}
            </NavLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
