/**
 * Service areas.
 *
 * `confirmed`  — the owner has confirmed the company builds here. Shown
 *                normally and included in `areaServed` structured data.
 * `proposed`   — a reasonable guess for a Wichita-area builder that has NOT
 *                been confirmed. Shown with a visible "needs confirmation"
 *                marker and excluded from structured data.
 *
 * Before launch: confirm or delete every `proposed` entry.
 *
 * `hasPage` is reserved for future, genuinely useful location pages
 * (unique content per community). Do not create thin city pages.
 */

export type ServiceAreaStatus = "confirmed" | "proposed";

export type ServiceArea = {
  name: string;
  county: string;
  status: ServiceAreaStatus;
  /** Optional unique, owner-provided notes about building in this community. */
  notes?: string;
  /** Set true only when a dedicated page with unique content exists. */
  hasPage?: boolean;
};

export const serviceAreas: ServiceArea[] = [
  // Wichita is the primary market named in the project brief.
  { name: "Wichita", county: "Sedgwick County", status: "confirmed" },

  // Everything below is PROPOSED and must be confirmed by the owner.
  { name: "Andover", county: "Butler County", status: "proposed" },
  { name: "Bel Aire", county: "Sedgwick County", status: "proposed" },
  { name: "Derby", county: "Sedgwick County", status: "proposed" },
  { name: "Goddard", county: "Sedgwick County", status: "proposed" },
  { name: "Haysville", county: "Sedgwick County", status: "proposed" },
  { name: "Maize", county: "Sedgwick County", status: "proposed" },
  { name: "Park City", county: "Sedgwick County", status: "proposed" },
  { name: "Valley Center", county: "Sedgwick County", status: "proposed" },
  { name: "Rose Hill", county: "Butler County", status: "proposed" },
  { name: "Augusta", county: "Butler County", status: "proposed" },
  { name: "Mulvane", county: "Sedgwick & Sumner Counties", status: "proposed" },
];

export const confirmedServiceAreas = serviceAreas.filter((a) => a.status === "confirmed");
export const proposedServiceAreas = serviceAreas.filter((a) => a.status === "proposed");
