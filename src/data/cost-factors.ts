/**
 * Educational content for /cost-to-build.
 *
 * Deliberately contains NO prices, price ranges or per-square-foot figures.
 * Any numbers added here must come from the owner and be kept current.
 */

export type CostFactor = {
  title: string;
  body: string;
  /** Questions a homeowner can ask to understand how this factor affects their project. */
  askAbout: string[];
};

export const costFactors: CostFactor[] = [
  {
    title: "Size and footprint",
    body:
      "Square footage is the most obvious driver, but shape matters too. A compact, efficient footprint usually costs less per finished foot than a sprawling one with many corners, because it uses less foundation, framing and roofing for the same living space.",
    askAbout: [
      "Where could a smaller footprint still meet our needs?",
      "Would a second story or a basement be more efficient than a larger single level?",
    ],
  },
  {
    title: "Design complexity",
    body:
      "Vaulted ceilings, complex rooflines, large spans, custom stairs and many exterior corners all add labor and materials. None of them are wrong — they just need to be weighed against the rest of the budget.",
    askAbout: [
      "Which design features have the biggest impact on cost?",
      "Are there simpler ways to achieve the same look or feel?",
    ],
  },
  {
    title: "Finishes and selections",
    body:
      "Cabinets, countertops, flooring, tile, plumbing fixtures, lighting and appliances can swing a budget significantly. Deciding early where to invest and where to economize keeps the project predictable.",
    askAbout: [
      "What allowances are included for each selection category?",
      "When do selections need to be finalized?",
    ],
  },
  {
    title: "Site conditions",
    body:
      "Every lot is different. Slope, drainage, soil conditions, trees, and access for equipment all affect site work and foundation design. Lots outside city utility service may need a well, a septic system or longer utility runs.",
    askAbout: [
      "What site work does this lot need before the foundation?",
      "Are city water and sewer available, or will we need a well and septic?",
    ],
  },
  {
    title: "Materials and systems",
    body:
      "Exterior materials, window packages, insulation, HVAC systems and roofing all come in a wide range of quality and efficiency. Some choices cost more up front and less to operate over time.",
    askAbout: [
      "Which upgrades are most likely to pay back in comfort or energy costs?",
      "What are the lead times for the materials we're considering?",
    ],
  },
  {
    title: "Foundation and storm protection",
    body:
      "Foundation type — slab, crawlspace or basement — affects cost and how you use the home. In Kansas, many homeowners also consider a storm shelter or safe room, which is far easier to plan in from the start than to add later.",
    askAbout: [
      "Which foundation type makes sense for this lot?",
      "What are our options for a storm shelter or safe room?",
    ],
  },
  {
    title: "Lot, development and permitting costs",
    body:
      "Beyond the build itself, budgets should account for the lot, permits and inspections, utility connection fees, and — in some new developments — special assessments for streets and infrastructure. These vary by location and are worth asking about before you buy land.",
    askAbout: [
      "Does this lot carry special assessments, and for how long?",
      "Which permit and utility fees should we budget for?",
    ],
  },
  {
    title: "Changes during construction",
    body:
      "Changes made after construction starts tend to cost more than the same change made on paper, and can affect the schedule. Thorough planning up front is one of the best ways to protect the budget.",
    askAbout: [
      "How are change requests priced and approved?",
      "Which decisions are hardest to change later?",
    ],
  },
];
