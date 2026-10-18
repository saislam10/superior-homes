export type NavItem = {
  label: string;
  href: string;
};

/** Primary header navigation. Order matters. Keep to ~6 items. */
export const mainNav: NavItem[] = [
  { label: "Custom Homes", href: "/custom-homes" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Available Homes", href: "/available-homes" },
  { label: "Communities", href: "/communities" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

/** Secondary pages, listed in the mobile menu and footer. */
export const secondaryNav: NavItem[] = [
  { label: "Our Process", href: "/our-process" },
  { label: "Specs & Finishes", href: "/specs-and-finishes" },
  { label: "Cost to Build", href: "/cost-to-build" },
  { label: "Finance", href: "/finance" },
  { label: "Warranty", href: "/warranty" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "For Agents", href: "/agents" },
];

/** Primary call to action shown in the header and on most pages. */
export const primaryCta: NavItem = {
  label: "Start a Conversation",
  href: "/contact",
};

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Homes",
    items: [
      { label: "Custom Homes", href: "/custom-homes" },
      { label: "Floor Plans", href: "/floor-plans" },
      { label: "Available Homes", href: "/available-homes" },
      { label: "Communities", href: "/communities" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    heading: "Building",
    items: [
      { label: "Our Process", href: "/our-process" },
      { label: "Specs & Finishes", href: "/specs-and-finishes" },
      { label: "Cost to Build", href: "/cost-to-build" },
      { label: "Finance", href: "/finance" },
      { label: "Warranty", href: "/warranty" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "For Agents", href: "/agents" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
