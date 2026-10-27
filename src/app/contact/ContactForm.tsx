"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import {
  budgetOptions,
  limits,
  lotOptions,
  readContactFields,
  timelineOptions,
  validateContact,
  type ContactFieldName,
  type FieldErrors,
} from "@/lib/contact/schema";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

/** Field order, used to focus the first invalid field. */
const fieldOrder: ContactFieldName[] = ["mlsNumber", "name", "email", "phone", "location", "lot", "budget", "timeline", "details"];

function focusFirstError(form: HTMLFormElement | null, errs: FieldErrors) {
  const first = fieldOrder.find((f) => errs[f]);
  if (first) form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

type DirectContact = { phone: string | null; email: string | null };
type PropertyInquiry = { mlsNumber: string; address: string; city: string | null };

export function ContactForm({ direct, property }: { direct: DirectContact; property?: PropertyInquiry }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Time-trap timestamp for basic bot detection (see actions.ts).
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  // Move focus to the result message so screen reader users hear it.
  useEffect(() => {
    if (state.status !== "idle" && state.status !== "invalid") statusRef.current?.focus();
    if (state.status === "invalid" && state.errors) focusFirstError(formRef.current, state.errors);
  }, [state]);

  const errors: FieldErrors = clientErrors ?? state.errors ?? {};
  const values = state.values;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const errs = validateContact(readContactFields(new FormData(event.currentTarget)));
    if (Object.keys(errs).length > 0) {
      event.preventDefault();
      setClientErrors(errs);
      focusFirstError(formRef.current, errs);
      return;
    }
    setClientErrors(null);
  }

  /**
   * Re-validate a field as the user edits it once it has shown an error, so
   * fixes clear the message. (Done on input rather than blur: clearing on
   * blur shifts the layout mid-click and can make the submit click miss.)
   */
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target: EventTarget = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const name = target.name as ContactFieldName;
    if (!errors[name] || !formRef.current) return;
    const errs = validateContact(readContactFields(new FormData(formRef.current)));
    setClientErrors({ ...errors, [name]: errs[name] });
  }

  if (state.status === "delivered") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-card border border-brand-200 bg-brand-50 p-8 text-center focus:outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-success" />
        <h2 className="mt-4 text-3xl text-ink">Thank you — we received your message.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-muted">
          We’ll review the details and follow up using the contact information you provided.
        </p>
      </div>
    );
  }

  const fallbackContact = (
    <>
      {direct.phone || direct.email ? (
        <>
          Please reach us directly
          {direct.phone && (
            <>
              {" "}
              at <a href={`tel:${direct.phone.replace(/[^\d+]/g, "")}`} className="font-semibold underline">{direct.phone}</a>
            </>
          )}
          {direct.email && (
            <>
              {direct.phone ? " or " : " at "}
              <a href={`mailto:${direct.email}${property ? `?subject=${encodeURIComponent(`Property inquiry — MLS #${property.mlsNumber} — ${property.address}`)}&body=${encodeURIComponent(values?.details ?? `I’m interested in ${property.address} (MLS #${property.mlsNumber}).`)}` : ""}`} className="font-semibold underline">
                {direct.email}
              </a>
            </>
          )}
          .
        </>
      ) : (
        <>Please try again later.</>
      )}
    </>
  );

  const statusMessage = (() => {
    switch (state.status) {
      case "not_configured":
        return (
          <>
            <strong>Your message was not sent.</strong> Online form delivery hasn’t been set up yet. {fallbackContact}
            {process.env.NODE_ENV !== "production" && (
              <span className="mt-2 block text-xs opacity-80">
                Developer note: set CONTACT_DELIVERY_PROVIDER and its related variables (see README → Contact form).
              </span>
            )}
          </>
        );
      case "failed":
        return (
          <>
            <strong>Something went wrong and your message was not sent.</strong> Please try again in a moment.{" "}
            {fallbackContact}
          </>
        );
      case "rejected":
        return (
          <>
            <strong>We couldn’t send your message.</strong> Please wait a moment and try again. {fallbackContact}
          </>
        );
      default:
        return null;
    }
  })();

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      className="space-y-6"
      aria-describedby="form-required-note"
    >
      {statusMessage && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-card border border-danger/30 bg-red-50 p-4 text-sm leading-relaxed text-danger focus:outline-none"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>{statusMessage}</p>
        </div>
      )}

      {errorCount > 0 && (
        <p role="alert" className="text-sm font-medium text-danger">
          Please correct {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below.
        </p>
      )}

      <p id="form-required-note" className="text-sm text-ink-subtle">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      {property && (
        <aside aria-label="Property inquiry" className="rounded-card border border-brand-200 bg-brand-50 p-4 text-ink">
          <p className="font-medium">Inquiry about {property.address}</p>
          {property.city && <p className="mt-1 text-sm text-ink-muted">{property.city}</p>}
          <p className="mt-2 text-sm text-ink-muted">The MLS number and property address will be included with your message.</p>
          <Link href="/contact#form-heading" className="mt-3 inline-block text-sm text-brand-800 underline underline-offset-4">Ask about a different property</Link>
        </aside>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="mlsNumber"
          label="MLS number"
          hint={property ? "Selected property" : "For a listed property, enter its MLS number. Leave blank for a general inquiry."}
          inputMode="numeric"
          maxLength={10}
          readOnly={Boolean(property)}
          defaultValue={values?.mlsNumber ?? property?.mlsNumber ?? ""}
          error={errors.mlsNumber}
          className="sm:col-span-2"
        />
        <TextField
          id="name"
          label="Name"
          required
          autoComplete="name"
          maxLength={limits.name}
          defaultValue={values?.name}
          error={errors.name}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={limits.email}
          defaultValue={values?.email}
          error={errors.email}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={limits.phone}
          defaultValue={values?.phone}
          error={errors.phone}
        />
        <TextField
          id="location"
          label={property ? "Location" : "Where do you hope to build?"}
          hint="A city, neighborhood or general area is fine."
          maxLength={limits.location}
          defaultValue={values?.location ?? property?.city ?? undefined}
          error={errors.location}
        />
        <SelectField id="lot" label="Do you have a lot?" options={lotOptions} defaultValue={values?.lot ?? ""} error={errors.lot} />
        <SelectField
          id="budget"
          label="Approximate budget"
          hint="A rough range helps us prepare."
          options={budgetOptions}
          defaultValue={values?.budget ?? ""}
          error={errors.budget}
        />
        <SelectField
          id="timeline"
          label="Desired timeline"
          options={timelineOptions}
          defaultValue={values?.timeline ?? ""}
          error={errors.timeline}
          className="sm:col-span-2"
        />
        <TextAreaField
          id="details"
          label={property ? "Your question about this property" : "Tell us about your project"}
          required
          hint="Size, style, must-haves, questions — whatever is on your mind."
          maxLength={limits.details}
          defaultValue={values?.details ?? (property ? `I’m interested in ${property.address} (MLS #${property.mlsNumber}). Please contact me with more information.` : undefined)}
          error={errors.details}
          className="sm:col-span-2"
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots often fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="flex flex-col gap-4 border-t border-mist-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-subtle sm:max-w-sm">
          We’ll only use your information to respond to your inquiry. See our{" "}
          <Link href="/privacy" className="text-brand-800 underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" disabled={pending} aria-disabled={pending} className="sm:min-w-48">
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
