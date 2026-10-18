import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/cn";

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * Pass the trail *excluding* Home; Home is prepended automatically.
 */
export function Breadcrumbs({
  items,
  inverted = false,
  className,
}: {
  items: Crumb[];
  inverted?: boolean;
  className?: string;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className={inverted ? "text-white" : "text-ink"}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className={cn(
                        "underline-offset-4 hover:underline",
                        inverted ? "text-white/75 hover:text-white" : "text-ink-subtle hover:text-ink",
                      )}
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight
                      aria-hidden="true"
                      className={cn("size-3.5", inverted ? "text-white/50" : "text-ink-subtle")}
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
    </>
  );
}
