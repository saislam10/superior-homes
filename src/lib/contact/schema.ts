/**
 * Contact form field definitions and validation.
 *
 * Shared by the client (instant feedback) and the server action
 * (authoritative validation). Keep this file free of server-only imports.
 */

export const budgetOptions = [
  "Not sure yet",
  "Under $400k",
  "$400k – $600k",
  "$600k – $800k",
  "$800k – $1M",
  "$1M+",
] as const;

export const timelineOptions = [
  "Just exploring",
  "Within 6 months",
  "6 – 12 months",
  "12 – 24 months",
  "More than 2 years",
] as const;

export const lotOptions = [
  "I own a lot",
  "I'm looking for a lot",
  "Not sure yet",
] as const;

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  location: string;
  lot: string;
  budget: string;
  timeline: string;
  details: string;
};

export type ContactFieldName = keyof ContactFields;
export type FieldErrors = Partial<Record<ContactFieldName, string>>;

export const limits = {
  name: 100,
  email: 254,
  phone: 30,
  location: 120,
  details: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts common US formats; requires 10–15 digits overall.
const PHONE_DIGITS_RE = /^\+?[\d\s().-]+$/;

export function validateContact(input: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const details = input.details.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_DIGITS_RE.test(phone) || digits.length < 10 || digits.length > 15)
      errors.phone = "Please enter a valid phone number, including area code.";
  }

  if (input.location.trim().length > limits.location)
    errors.location = `Please keep this under ${limits.location} characters.`;

  if (input.lot && !(lotOptions as readonly string[]).includes(input.lot))
    errors.lot = "Please choose an option from the list.";
  if (input.budget && !(budgetOptions as readonly string[]).includes(input.budget))
    errors.budget = "Please choose an option from the list.";
  if (input.timeline && !(timelineOptions as readonly string[]).includes(input.timeline))
    errors.timeline = "Please choose an option from the list.";

  if (!details) errors.details = "Please tell us a little about your project.";
  else if (details.length < 20) errors.details = "Please add a bit more detail (at least 20 characters).";
  else if (details.length > limits.details)
    errors.details = `Please keep this under ${limits.details} characters.`;

  return errors;
}

/** Reads and normalizes contact fields from FormData. */
export function readContactFields(formData: FormData): ContactFields {
  const get = (key: ContactFieldName) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    location: get("location"),
    lot: get("lot"),
    budget: get("budget"),
    timeline: get("timeline"),
    details: get("details"),
  };
}
