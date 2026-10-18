import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { processReviewedByOwner, processStages } from "@/data/process";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

const path = "/our-process";

export const metadata = buildMetadata({
  title: "Our Custom Home Building Process",
  description:
    "What to expect when you build a custom home in the Wichita area: consultation, planning, design, budgeting, site preparation, construction and final walkthrough.",
  path,
  image: images.planReview,
});

export default function OurProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="How a custom home comes together."
        intro="Building a custom home is a collaboration that unfolds in stages. Knowing what to expect at each one — and where your input matters most — makes the whole experience calmer and more predictable."
        breadcrumbs={[{ name: "Our Process", path }]}
        image={images.planReview}
      />

      <Section labelledBy="stages-heading">
        <h2 id="stages-heading" className="sr-only">
          Stages of the building process
        </h2>

        {!processReviewedByOwner && (
          <DraftNotice title="General outline — to be confirmed" className="mb-14 max-w-3xl">
            This describes a typical custom home process. The exact steps, order and timing for Superior Homes projects
            will be confirmed by the owner, and every project’s schedule depends on its scope.
          </DraftNotice>
        )}

        <ol className="relative space-y-0">
          {processStages.map((stage, i) => (
            <li
              key={stage.slug}
              id={stage.slug}
              className="grid gap-6 border-t border-mist-200 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <p aria-hidden="true" className="font-display text-5xl text-leaf-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-3xl text-ink">
                  <span className="sr-only">Stage {i + 1}: </span>
                  {stage.title}
                </h3>
              </div>
              <div className="lg:col-span-5">
                <p className="text-lg leading-relaxed text-ink-muted">{stage.description}</p>
              </div>
              <div className="lg:col-span-3">
                <div className="rounded-card bg-mist-100 p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-800">Your role</h4>
                  <ul className="mt-3 space-y-2 text-[0.95rem] leading-snug text-ink-muted">
                    {stage.yourRole.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="related-heading">
        <h2 id="related-heading" className="text-3xl text-ink">
          Before you begin
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="leading-relaxed text-ink-muted">
              Budget shapes every stage. Our guide explains the main factors that influence what a custom home costs
              in the Wichita area.
            </p>
            <TextLink href="/cost-to-build" className="mt-4">
              Understand custom home costs
            </TextLink>
          </div>
          <div>
            <p className="leading-relaxed text-ink-muted">
              Wondering how custom building compares with buying a production home? Start with the basics.
            </p>
            <TextLink href="/custom-homes" className="mt-4">
              Learn about custom homes
            </TextLink>
          </div>
        </div>
      </Section>

      <ConsultationCta title="Ready to start with a conversation?" />
    </>
  );
}
