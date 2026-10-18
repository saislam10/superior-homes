import { serviceAreas } from "@/config/service-areas";
import { cn } from "@/lib/cn";

/**
 * Lists service areas. Proposed (unconfirmed) areas are visibly marked
 * and announced to assistive tech as needing confirmation.
 */
export function ServiceAreaList({ className }: { className?: string }) {
  const hasProposed = serviceAreas.some((a) => a.status === "proposed");

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2">
        {serviceAreas.map((area) => (
          <li
            key={area.name}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm",
              area.status === "confirmed"
                ? "bg-brand-800 text-white"
                : "border border-dashed border-draft-border bg-draft-bg text-draft-ink",
            )}
          >
            {area.name}
            {area.status === "proposed" && (
              <>
                <span aria-hidden="true">*</span>
                <span className="sr-only"> (proposed, pending confirmation)</span>
              </>
            )}
          </li>
        ))}
      </ul>
      {hasProposed && (
        <p className="mt-3 text-sm text-draft-ink">
          * Proposed service area — to be confirmed by the owner before publication.
        </p>
      )}
    </div>
  );
}
