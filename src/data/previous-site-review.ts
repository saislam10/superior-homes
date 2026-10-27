/**
 * Content found on the former public website, retained as owner-review leads.
 * These are historical claims, not confirmed current company facts. Keep
 * them out of siteConfig, structured data, and approved listing data until
 * the owner confirms they are accurate and still apply.
 */
export const previousSiteReview = {
  status: "needsOwnerReview" as const,
  sources: {
    home: "https://superiorhomesks.com/",
    about: "https://superiorhomesks.com/about-us/",
    process: "https://superiorhomesks.com/build-process/",
    contact: "https://superiorhomesks.com/contact-us-316-440-6000/",
    homes: "https://superiorhomesks.com/our-homes/",
  },
  contact: {
    phoneOnHomeAndContact: "+1 (316) 350-5556",
    conflictingPhoneOnAbout: "+1 (316) 440-6000",
    email: "kansashomes1@gmail.com",
    officeAddress: "3500 N Rock Rd, Building 1600, Wichita, KS 67226",
    hours: "Monday–Friday, 8am–5pm; weekends by appointment",
  },
  serviceAreaSignals: ["Wichita", "Derby", "Bel Aire", "Haysville"],
  featureClaims: [
    "Energy-efficient windows",
    "Granite countertops throughout the home",
    "LED lighting",
    "Energy-conscious and smart-home features",
  ],
  financingClaims: [
    "No construction loan required",
    "A small deposit to begin",
    "Superior Homes finances construction until closing",
  ],
  processReview: {
    stageNames: [
      "Get in Touch",
      "Secure Financing",
      "Select Your Floor Plan",
      "Design Meeting",
      "Agreement Day",
      "Construction Overview",
      "Frame Tour",
      "Orientation",
      "Walk-Through",
    ],
    caution:
      "The page also refers to New Home Centers, Flat Branch Home Loans, and Schuber Mitchell homeowners. Treat its descriptions as contaminated and do not copy them as Superior Homes policy.",
  },
  homeArchive: {
    summary:
      "The former Our Homes page lists more than 100 completed-home entries with locations, square footage, development names, build years from 2016–2024, and links to third-party virtual tours.",
    reviewNote:
      "Confirm which projects may be republished and obtain homeowner permission before using identifying details, exact addresses, or photography.",
  },
  serviceScope: ["new home construction", "remodeling", "painting", "roofing"],
} as const;
