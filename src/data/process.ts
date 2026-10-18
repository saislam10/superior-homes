/**
 * Proposed home-building process.
 *
 * This is a general outline of how custom home projects typically run. It is
 * NOT yet a verified description of Superior Homes's exact workflow. The owner
 * should edit stage names, descriptions and "what you'll do" items to match
 * how the company actually works, then set `processReviewedByOwner` to true
 * to remove the draft notice on /our-process.
 */

export const processReviewedByOwner = false;

export type ProcessStage = {
  slug: string;
  title: string;
  /** One-line summary used on the homepage. */
  summary: string;
  /** Longer description used on /our-process. */
  description: string;
  /** What the homeowner is typically involved in during this stage. */
  yourRole: string[];
};

export const processStages: ProcessStage[] = [
  {
    slug: "consultation",
    title: "Initial consultation",
    summary: "Talk through how you live, what you want, and what you want to spend.",
    description:
      "Every custom home starts with a conversation. We talk about how your household lives day to day, what isn't working in your current home, the features you care about most, where you hope to build, and a realistic budget range. It's an opportunity for both sides to decide whether the project is a good fit.",
    yourRole: [
      "Share your must-haves, nice-to-haves and deal-breakers",
      "Bring photos, sketches or saved ideas if you have them",
      "Discuss a working budget range and timeline",
    ],
  },
  {
    slug: "planning",
    title: "Planning & feasibility",
    summary: "Confirm the lot, the scope and the constraints before design begins.",
    description:
      "Before anything is drawn in detail, the project needs a solid footing. This stage looks at the lot (or lot options), utilities, setbacks, neighborhood covenants, and local permitting requirements, so the design that follows is buildable and realistic.",
    yourRole: [
      "Share lot details, or discuss options if you don't have one yet",
      "Review any HOA or subdivision requirements",
      "Confirm priorities so design time is spent where it matters",
    ],
  },
  {
    slug: "design",
    title: "Design",
    summary: "Shape a floor plan and exterior around your life — not a catalog.",
    description:
      "Floor plans, elevations and key details are developed and refined with you. This is where room sizes, flow, natural light, storage and the look of the exterior come together. Expect a few rounds of revision; it's far easier to move a wall on paper than on site.",
    yourRole: [
      "Review plan drafts and give candid feedback",
      "Walk through how each room will be used",
      "Approve the final plan set",
    ],
  },
  {
    slug: "budgeting",
    title: "Budgeting & selections",
    summary: "Turn the design into a detailed budget and choose your finishes.",
    description:
      "With a plan in hand, the project can be priced in detail. Selections — cabinets, countertops, flooring, fixtures, lighting, exterior materials — have a large effect on cost, so they're made with the budget in view. The goal is a clear, written scope before construction begins.",
    yourRole: [
      "Make finish and fixture selections",
      "Weigh trade-offs between features and budget",
      "Review and sign the construction agreement",
    ],
  },
  {
    slug: "site-preparation",
    title: "Permits & site preparation",
    summary: "Secure permits, prepare the lot and set the foundation.",
    description:
      "Permits are obtained from the appropriate city or county, the lot is surveyed and staked, and site work begins: clearing, grading, utility connections and the foundation. Kansas soils and drainage are considered carefully at this stage.",
    yourRole: [
      "Sign any documents needed for permitting",
      "Visit the site as the foundation is set, if you'd like",
    ],
  },
  {
    slug: "construction",
    title: "Construction",
    summary: "Framing through finishes, with regular updates along the way.",
    description:
      "Framing, roofing, windows, mechanical systems, insulation, drywall, and finally the interior and exterior finishes. Inspections happen at the required milestones. You should expect regular communication about progress, decisions that need your input, and any changes to schedule.",
    yourRole: [
      "Attend scheduled walkthroughs at key milestones",
      "Respond promptly to decisions that need your input",
      "Discuss any change requests before work proceeds",
    ],
  },
  {
    slug: "walkthrough",
    title: "Final walkthrough & move-in",
    summary: "Walk the finished home together, then get your keys.",
    description:
      "Before move-in, we walk the completed home together to review the work, explain systems and maintenance, and note anything that needs attention. Once final inspections are complete and any items are addressed, the home is yours.",
    yourRole: [
      "Walk the home and note anything that needs attention",
      "Review warranty and maintenance information",
      "Move in",
    ],
  },
];
