/**
 * Specs & finishes.
 *
 * `items: null` renders a placeholder — the owner must list what is actually
 * included as standard in each category. Do not fill these with guesses:
 * buyers rely on this page to compare builders.
 */

export type SpecCategory = {
  title: string;
  /** Short description of what the category covers. */
  covers: string;
  items: string[] | null;
};

export const specCategories: SpecCategory[] = [
  { title: "Structure & foundation", covers: "Foundation type, framing, sheathing, roof structure.", items: null },
  { title: "Exterior", covers: "Siding, stone or brick, roofing, windows, garage doors, gutters.", items: null },
  { title: "Energy & mechanical", covers: "Insulation, HVAC, water heater, ventilation.", items: null },
  { title: "Kitchen", covers: "Cabinets, countertops, appliances, sink and faucet, lighting.", items: null },
  { title: "Bathrooms", covers: "Vanities, tops, tile, showers and tubs, fixtures.", items: null },
  { title: "Interior finishes", covers: "Flooring, trim, doors, paint, lighting, hardware.", items: null },
  { title: "Outdoor & site", covers: "Driveway, patio, landscaping, sod, irrigation.", items: null },
  { title: "Safety & storm readiness", covers: "Smoke/CO detection, storm shelter or safe room options.", items: null },
];

/** How design selections work — general guidance; owner to confirm specifics. */
export const selectionSteps = [
  {
    title: "Start with what’s included",
    body: "Every home starts with a standard package of materials and finishes, so you know the baseline before making changes.",
  },
  {
    title: "Choose with the budget in view",
    body: "Selections are made against allowances for each category. Upgrades are priced as you go, so you can decide where they’re worth it.",
  },
  {
    title: "Finalize before construction",
    body: "Locking in selections early keeps the schedule and budget predictable — changes after work begins usually cost more.",
  },
];
