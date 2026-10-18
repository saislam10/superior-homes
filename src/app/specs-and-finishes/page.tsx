import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { selectionSteps, specCategories } from "@/data/specs";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice, Placeholder } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

const path = "/specs-and-finishes";

export const metadata = buildMetadata({
  title: "Specs, Finishes & Design Selections",
  description:
    "What’s included in a Superior Homes build, and how design selections work — choose finishes that fit your style and your budget.",
  path,
  image: images.whiteKitchen,
});

export default function SpecsPage() {
  return (
    <>
      <PageHero
        eyebrow="Specs & finishes"
        title="What goes into every home — and what you choose."
        intro="A clear baseline of included features, plus the freedom to choose the finishes that make the home yours."
        breadcrumbs={[{ name: "Specs & Finishes", path }]}
        image={images.whiteKitchen}
      />

      <Section labelledBy="included-heading">
        <SectionHeading
          id="included-heading"
          eyebrow="Included features"
          title="Standard specifications"
          intro="Here’s what comes standard, category by category. Anything can be upgraded or changed during selections."
        />
        <DraftNotice title="Owner input needed" className="mt-8 max-w-3xl">
          Each category needs the list of features Superior Homes includes as standard. These must come from the
          company’s actual specifications.
        </DraftNotice>
        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-4">
          {specCategories.map((cat) => (
            <div key={cat.title} className="bg-surface p-6">
              <h3 className="text-xl text-ink">{cat.title}</h3>
              <p className="mt-2 text-sm text-ink-subtle">{cat.covers}</p>
              {cat.items ? (
                <ul className="mt-4 space-y-1.5 text-[0.95rem] text-ink-muted">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm">
                  <Placeholder>Standard features — to be provided</Placeholder>
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="selections-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="selections-heading"
              eyebrow="Design selections"
              title="Choosing your finishes."
              intro="Selections are where a home starts to feel like yours — cabinetry, counters, flooring, tile, fixtures, lighting and exterior colors."
            />
            <ol className="mt-8 space-y-6">
              {selectionSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl text-ink">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm">
              <Placeholder>Selection process details — showroom/design center, number of appointments, vendors</Placeholder>
            </p>
            <TextLink href="/cost-to-build" className="mt-8">
              How finishes affect cost
            </TextLink>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mist-200">
            <Image
              src={images.islandKitchen.src}
              alt={images.islandKitchen.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <ConsultationCta
        title="Questions about what’s included?"
        body="Ask about specifications, allowances and upgrades for the plan or home you’re considering."
      />
    </>
  );
}
