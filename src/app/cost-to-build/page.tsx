import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { costFactors } from "@/data/cost-factors";
import { costFaqs } from "@/data/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/FaqList";
import { TextLink } from "@/components/ui/Button";

const path = "/cost-to-build";

export const metadata = buildMetadata({
  title: "Cost to Build a Custom Home in Wichita",
  description:
    "What affects the cost of building a custom home in the Wichita area? Size, design, finishes, site conditions, materials and more — explained without the guesswork.",
  path,
  image: images.whiteKitchen,
});

export default function CostToBuildPage() {
  return (
    <>
      <PageHero
        eyebrow="Cost to build"
        title="What does a custom home cost in the Wichita area?"
        intro="The honest answer is: it depends on your plans. This guide explains what drives the cost of a custom home, so you can set priorities and have a more productive budget conversation."
        breadcrumbs={[{ name: "Cost to Build", path }]}
      />

      <Section labelledBy="why-depends-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="why-depends-heading"
              eyebrow="Why there’s no single number"
              title="Two homes the same size can cost very different amounts."
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted lg:col-span-7">
            <p>
              You’ll find price-per-square-foot figures online, but they hide most of what matters. A simple
              rectangular plan with modest finishes on a flat city lot and a complex plan with premium finishes on a
              sloped rural site might share a square footage and little else.
            </p>
            <p>
              An accurate estimate depends on your specific plan, selections and lot. The factors below are the ones
              that usually make the biggest difference. Understanding them up front helps you decide where to invest
              and where you’re comfortable keeping things simple.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="factors-heading">
        <SectionHeading id="factors-heading" eyebrow="Cost factors" title="What drives the cost of a custom home." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-mist-200 bg-mist-200 md:grid-cols-2">
          {costFactors.map((factor, i) => (
            <article key={factor.title} className="bg-surface p-7 sm:p-9">
              <p aria-hidden="true" className="font-display text-2xl text-leaf-700">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl text-ink">{factor.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{factor.body}</p>
              <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-800">
                Questions to ask
              </h4>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-muted">
                {factor.askAbout.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-700">
                      →
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="estimate-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="estimate-heading" className="text-3xl leading-tight text-ink sm:text-4xl">
            Getting a realistic estimate
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            The most useful next step is a conversation about your plans: approximate size, the features you care
            about, where you want to build, and the budget you’re working with. From there, we can talk about what’s
            realistic and how to get the most from your investment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <TextLink href="/our-process">How budgeting fits into the process</TextLink>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="cost-faq-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="cost-faq-heading" eyebrow="FAQ" title="Questions about cost." />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={costFaqs} />
          </div>
        </div>
      </Section>

      <ConsultationCta
        title="Let’s talk about your budget and your plans."
        body="Share a few details about the home you have in mind and the range you’re comfortable with. We’ll follow up to talk through what’s realistic."
      />
    </>
  );
}
