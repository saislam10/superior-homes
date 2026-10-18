"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, primaryCta, secondaryNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { NavLink } from "./NavLink";

/** Mobile navigation disclosure. Closes on Escape, link click, or resize to desktop. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-mist-100"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-mist-200 bg-canvas"
      >
        <nav aria-label="Mobile" className="px-5 py-6 sm:px-8">
          <ul className="divide-y divide-mist-200">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={close}
                  className="block py-4 font-display text-2xl text-ink aria-[current=page]:text-brand-700"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                href="/contact"
                onClick={close}
                className="block py-4 font-display text-2xl text-ink aria-[current=page]:text-brand-700"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={close}
                  className="text-ink-muted hover:text-ink aria-[current=page]:text-brand-700"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink href={primaryCta.href} onClick={close} className={buttonClasses("primary", "mt-8 w-full")}>
            {primaryCta.label}
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
