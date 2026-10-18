import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import logo from "../../../public/brand/superior-homes-logo-horizontal.png";
import logoLight from "../../../public/brand/superior-homes-logo-horizontal-light.png";

/**
 * Superior Homes logo (horizontal lockup generated from the original
 * artwork in brand-source/). `inverted` uses the white-wordmark variant
 * for dark backgrounds.
 */
export function Logo({
  inverted = false,
  priority = false,
  className,
}: {
  inverted?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={inverted ? logoLight : logo}
        alt={`${siteConfig.name} — home`}
        priority={priority}
        sizes="200px"
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
