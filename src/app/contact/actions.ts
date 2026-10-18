"use server";

import { deliverContact } from "@/lib/contact/delivery";
import { readContactFields, validateContact, type ContactFields, type FieldErrors } from "@/lib/contact/schema";

export type ContactState = {
  status: "idle" | "invalid" | "delivered" | "not_configured" | "failed" | "rejected";
  errors?: FieldErrors;
  /** Echoed back (to this user only) so they don't lose what they typed. */
  values?: ContactFields;
};

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 3_000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // --- Basic anti-spam -----------------------------------------------------
  // 1. Honeypot: a hidden field humans never see. Bots tend to fill it.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "rejected" };
  }
  // 2. Time trap: set by client JS when the form mounts. Empty when JS is
  //    disabled, in which case we skip this check rather than block people.
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "rejected" };
  }
  // For stronger protection, add Cloudflare Turnstile or hCaptcha and
  // rate limiting at the edge. See README → "Contact form".

  // --- Validation (authoritative) -----------------------------------------
  const raw = readContactFields(formData);
  const errors = validateContact(raw);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values: raw };
  }

  const fields: ContactFields = {
    name: raw.name.trim(),
    email: raw.email.trim(),
    phone: raw.phone.trim(),
    location: raw.location.trim(),
    lot: raw.lot,
    budget: raw.budget,
    timeline: raw.timeline,
    details: raw.details.trim(),
  };

  // --- Delivery ------------------------------------------------------------
  const result = await deliverContact(fields);
  if (result.status === "delivered") return { status: "delivered" };
  return { status: result.status, values: raw };
}
