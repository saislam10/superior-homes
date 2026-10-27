import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice, Placeholder } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";
import { previousSiteReview } from "@/data/previous-site-review";

const path = "/finance";

export const metadata = buildMetadata({
  title: "Financing a New Home",
  description:
    "An overview of financing a custom or new-construction home in the Wichita area: construction loans, mortgages for completed homes, pre-approval and budgeting.",
  path,
  image: images.planReview,
});

const paths = [
  {
    title: "Building a custom home",
    body: "Custom builds are commonly financed with a construction loan that pays out in stages as work is completed, then converts to (or is refinanced into) a permanent mortgage. Lenders typically review your plans, budget and builder agreement.",
  },
  {
    title: "Buying an available home",
    body: "A move-in-ready or nearly finished home is usually financed with a conventional, FHA, VA or USDA mortgage, much like buying any other home. Timing your approval to the expected completion date matters.",
  },
  {
    title: "Using land you own",
    body: "If you already own your lot, the equity in it may count toward your down payment on a construction loan. Ask your lender how they treat land equity.",
  },
];

const steps = [
  "Talk with a lender early to understand what you can comfortably afford.",
  "Get pre-approved before finalizing plans or committing to a home.",
  "Budget for the full picture: lot, site work, selections, closing costs and a contingency.",
  "Keep your finances steady during the build — avoid new debt or big purchases until closing.",
];

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Finance"
        title="Financing your new home."
        intro="Understanding your financing options early makes every later decision — from plan to finishes — easier."
        breadcrumbs={[{ name: "Finance", path }]}
      />

      <Section labelledBy="finance-paths-heading">
        <DraftNotice title="General information" className="mb-12 max-w-3xl">
          This page is general education, not financial advice, and Superior Homes is not a lender. Loan programs,
          requirements and rates vary — talk with a licensed lender about your situation.
        </DraftNotice>
        <DraftNotice title="Previous financing claims — owner to confirm" className="mb-10 max-w-3xl">
          The former website stated that no construction loan was required, a small deposit could start a project, and
          Superior Homes financed construction until closing. Confirm the current policy and have the language
          reviewed before publishing any of these claims.
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {previousSiteReview.financingClaims.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
        </DraftNotice>
        <SectionHeading id="finance-paths-heading" eyebrow="Your options" title="Common ways to finance." />
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {paths.map((p) => (
            <li key={p.title} className="border-t border-mist-300 pt-6">
              <h3 className="text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="finance-steps-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="finance-steps-heading" eyebrow="Getting ready" title="Steps to take before you build." />
          </div>
          <ol className="space-y-5 lg:col-span-7">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <span className="pt-1 text-lg leading-relaxed text-ink-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="lender-heading">
        <h2 id="lender-heading" className="text-3xl text-ink">
          Lenders we work with
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          <Placeholder>
            Preferred lender(s), contact details and any disclosures — only if Superior Homes has these relationships
          </Placeholder>
        </p>
        <p className="mt-4 max-w-2xl text-ink-muted">You’re always free to work with the lender of your choice.</p>
        <TextLink href="/cost-to-build" className="mt-8">
          Understand what drives the cost of building
        </TextLink>
      </Section>

      <ConsultationCta />
    </>
  );
}
