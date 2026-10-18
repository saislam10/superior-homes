import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "block w-full rounded-[3px] border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-subtle/70 transition-colors focus:border-brand-700 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/40";

function controlClasses(error?: string) {
  return cn(controlBase, error ? "border-danger" : "border-mist-300 hover:border-mist-500");
}

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + hint + error, wired together for assistive tech. */
function FieldShell({ id, label, required, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-ink-subtle">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type CommonProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextField({
  id,
  label,
  hint,
  error,
  className,
  required,
  ...props
}: CommonProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        name={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses(error)}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  className,
  required,
  ...props
}: CommonProps & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        name={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses(error), "min-h-40 resize-y")}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  className,
  required,
  options,
  ...props
}: CommonProps & Omit<ComponentProps<"select">, "id"> & { options: readonly string[] }) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <select
        id={id}
        name={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          controlClasses(error),
          "select-chevron",
        )}
        {...props}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
