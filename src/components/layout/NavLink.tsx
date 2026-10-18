"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Navigation link that sets aria-current on the active route. */
export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
