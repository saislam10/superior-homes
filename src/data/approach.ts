/**
 * "Why build with us" / approach content.
 *
 * These describe intended commitments, not proven results. The owner should
 * confirm each point reflects how the company actually works (or edit it)
 * before launch. Do not add awards, ratings, years in business or
 * testimonials unless they are verified and documented.
 */

export type ApproachPoint = {
  title: string;
  body: string;
  icon: "compass" | "wallet" | "messages" | "map-pin";
};

export const approachPoints: ApproachPoint[] = [
  {
    title: "Designed around your life",
    body:
      "Plans start from how your household actually lives — mornings, holidays, hobbies, guests, the future — rather than a fixed menu of models.",
    icon: "compass",
  },
  {
    title: "Budget in the conversation from day one",
    body:
      "We talk honestly about cost early and keep it in view through design and selections, so there are fewer surprises later.",
    icon: "wallet",
  },
  {
    title: "Clear, regular communication",
    body:
      "You should always know what's happening on your home, what's coming next, and which decisions need your input.",
    icon: "messages",
  },
  {
    title: "Rooted in the Wichita area",
    body:
      "We build here. That means familiarity with local lots, permitting, Kansas weather and the trades who do the work.",
    icon: "map-pin",
  },
];
