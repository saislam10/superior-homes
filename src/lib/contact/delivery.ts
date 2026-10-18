import "server-only";
import { siteConfig } from "@/config/site";
import type { ContactFields } from "./schema";

/**
 * Contact delivery integration point.
 *
 * Select a provider with CONTACT_DELIVERY_PROVIDER:
 *   - "webhook": POSTs JSON to CONTACT_WEBHOOK_URL (works with most CRMs,
 *                Zapier/Make, or your own endpoint). Optional
 *                CONTACT_WEBHOOK_SECRET is sent as a bearer token.
 *   - "resend":  Sends an email via the Resend HTTP API using
 *                RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
 *   - unset:     Nothing is sent. The user is told plainly that their
 *                message was NOT delivered.
 *
 * To add another provider (HubSpot, SendGrid, Postmark…), add a case below
 * that returns a DeliveryResult. Secrets must only be read here (server-only).
 *
 * Submitted data is passed straight to the provider and is not stored or
 * logged by this application.
 */

export type DeliveryResult =
  | { status: "delivered" }
  | { status: "not_configured" }
  | { status: "failed" };

const TIMEOUT_MS = 10_000;

export async function deliverContact(fields: ContactFields): Promise<DeliveryResult> {
  const provider = process.env.CONTACT_DELIVERY_PROVIDER?.trim().toLowerCase();

  try {
    switch (provider) {
      case "webhook":
        return await sendWebhook(fields);
      case "resend":
        return await sendResend(fields);
      default:
        return { status: "not_configured" };
    }
  } catch {
    // Never log submitted personal data.
    console.error(`[contact] Delivery via "${provider}" failed.`);
    return { status: "failed" };
  }
}

async function sendWebhook(fields: ContactFields): Promise<DeliveryResult> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return { status: "not_configured" };

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.CONTACT_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: siteConfig.url,
      submittedAt: new Date().toISOString(),
      ...fields,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    console.error(`[contact] Webhook responded with HTTP ${res.status}.`);
    return { status: "failed" };
  }
  return { status: "delivered" };
}

async function sendResend(fields: ContactFields): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { status: "not_configured" };

  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "—"}`,
    `Intended location: ${fields.location || "—"}`,
    `Lot: ${fields.lot || "—"}`,
    `Approximate budget: ${fields.budget || "—"}`,
    `Desired timeline: ${fields.timeline || "—"}`,
    "",
    "Project details:",
    fields.details,
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: fields.email,
      subject: `New custom home inquiry from ${fields.name}`,
      // Plain text only — no user input is ever rendered as HTML.
      text: lines.join("\n"),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    console.error(`[contact] Resend responded with HTTP ${res.status}.`);
    return { status: "failed" };
  }
  return { status: "delivered" };
}
