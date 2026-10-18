import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Inline marker for information the owner still needs to provide.
 * Visually distinct on purpose so it can't be mistaken for real content.
 */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-sm border border-dashed border-draft-border bg-draft-bg px-1.5 py-0.5 text-[0.9em] text-draft-ink",
        className,
      )}
    >
      [{children}]
    </span>
  );
}

/** Returns the value, or a Placeholder when it is null/empty. */
export function ValueOrPlaceholder({ value, label }: { value: string | null | undefined; label: string }) {
  return value ? <>{value}</> : <Placeholder>{label} — to be provided</Placeholder>;
}

/** Block-level notice for draft or illustrative content. */
export function DraftNotice({
  title = "Draft content",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      role="note"
      className={cn(
        "flex gap-3 rounded-card border border-draft-border bg-draft-bg p-4 text-sm leading-relaxed text-draft-ink",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </aside>
  );
}
