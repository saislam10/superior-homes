/**
 * FAQ content.
 *
 * `needsOwnerReview: true` marks answers that describe company policy and
 * must be confirmed (or rewritten) by the owner. Those entries show a small
 * "Draft" marker on the page and are EXCLUDED from FAQPage structured data
 * until the flag is removed.
 */

export type Faq = {
  question: string;
  answer: string;
  needsOwnerReview?: boolean;
};

export const customHomeFaqs: Faq[] = [
  {
    question: "What makes a custom home different from a production or subdivision home?",
    answer:
      "A production home starts from a limited set of floor plans and options chosen by the builder. A custom home starts from you: how you live, what you need, and what you want to spend. The plan, layout, materials and finishes are developed for your household and your lot rather than adapted from a catalog.",
  },
  {
    question: "Do I need to own a lot before we talk?",
    answer:
      "No. Many people start the conversation before they have land. Lot choice affects cost, design and timeline, so it helps to discuss options early, whether you already own property or are still looking.",
  },
  {
    question: "Can I bring my own floor plan or architect?",
    answer:
      "Bring whatever you have — sketches, saved photos, a plan you found online, or drawings from an architect. We'll talk through how to adapt it to your lot and budget.",
    needsOwnerReview: true,
  },
  {
    question: "How long does it take to build a custom home?",
    answer:
      "It depends on the size and complexity of the home, how quickly design decisions are made, permitting, weather and material lead times. A realistic schedule can be discussed once the scope of your project is clear.",
  },
  {
    question: "How much does a custom home cost?",
    answer:
      "Cost depends on size, design complexity, finishes, site conditions and material choices, so there is no honest one-size-fits-all number. Our cost-to-build guide explains the main factors, and we're happy to talk through a realistic range for your plans.",
  },
  {
    question: "Will I be able to see the home during construction?",
    answer:
      "Yes. We encourage scheduled walkthroughs at key milestones so you can see progress and make sure the home is coming together as planned. For safety, site visits are arranged in advance.",
    needsOwnerReview: true,
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "[Warranty details to be provided by the owner — describe coverage, duration and how service requests are handled.]",
    needsOwnerReview: true,
  },
];

export const costFaqs: Faq[] = [
  {
    question: "Can you give me a price per square foot?",
    answer:
      "Price per square foot is a rough comparison tool, not an estimate. Two homes of the same size can differ significantly in cost depending on layout, roof complexity, finishes and site work. We prefer to talk through your plans and give you a range grounded in your actual project.",
  },
  {
    question: "What costs are often overlooked?",
    answer:
      "Lot preparation, utility connections, driveways, landscaping, window coverings, appliances and any special assessments tied to a development are commonly underestimated. A good budget conversation accounts for them up front.",
  },
  {
    question: "How can I keep a custom home within budget?",
    answer:
      "Set priorities early, keep the footprint and roofline efficient, make selections before construction starts, and limit changes once work is underway. Spending where it matters most to you — and saving where it doesn't — is the heart of building within a budget.",
  },
];
