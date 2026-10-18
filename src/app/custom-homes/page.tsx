import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { customHomeFaqs } from "@/data/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";

const path = "/custom-homes";

export const metadata = buildMetadata({
  title: "Custom Home Building in Wichita, KS",
  description:
    "Build a home designed around your life. Learn how custom home building works with Superior Homes in Wichita and surrounding communities — and what to expect.",
  path,
  image: images.timberExterior,
});

const benefits = [
  {
    title: "A floor plan that fits",
    body: "Room sizes, flow and storage designed for your household — a kitchen sized for how you cook, a mudroom where the kids actually come in, an office that isn’t a spare bedroom.",
  },
  {
    title: "Choices that reflect you",
    body: "Exterior style, materials, cabinetry, fixtures and finishes selected by you, rather than limited to a builder’s standard package.",
  },
  {
    title: "Designed for your lot",
    body: "A home planned for its site: orientation for light and views, a layout that works with slope and drainage, and a garage and driveway that make sense on the lot.",
  },
  {
    title: "Budget you control",
    body: "You decide where to invest and where to economize. Because cost is part of every design conversation, trade-offs are made deliberately.",
  },
  {
    title: "Room to grow",
    body: "Plan ahead for what’s next — a future basement finish, an aging-in-place bedroom on the main level, or space for a workshop.",
  },
  {
    title: "A collaborative process",
    body: "You’re involved in the decisions that matter, with a clear sense of what happens next at each stage.",
  },
];

const comparison = [
  { aspect: "Floor plan", production: "Choose from a set list of plans", custom: "Designed around your household" },
  { aspect: "Lot", production: "Builder-selected lots in a subdivision", custom: "Your lot, or one chosen with your plans in mind" },
  { aspect: "Finishes", production: "Standard package plus priced upgrades", custom: "Selected by you to fit your budget" },
  { aspect: "Changes", production: "Limited structural changes", custom: "Layout and features shaped from the start" },
];

const nextSteps = [
  "Get in touch through the contact form with a few details about your plans.",
  "We’ll follow up to schedule an initial conversation.",
  "Together we’ll talk through your goals, lot, budget and timeline, and outline the next steps if it’s a good fit.",
];

export default function CustomHomesPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom homes"
        title="Custom homes built around you."
        intro="A custom home starts with your life — your routines, your priorities, your lot and your budget — and is designed from there. Here’s what that means, and what working together looks like."
        breadcrumbs={[{ name: "Custom Homes", path }]}
        image={images.timberExterior}
      >
        <ButtonLink href="/contact" variant="light" withArrow>
          Talk about your plans
        </ButtonLink>
      </PageHero>

      <Section labelledBy="what-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="what-heading"
              eyebrow="What custom means"
              title="Not a model home with upgrades."
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted lg:col-span-7">
            <p>
              Many new homes in the Wichita area are production homes: a builder offers a handful of floor plans in a
              subdivision, and buyers choose a plan, a lot and a set of upgrades. It’s an efficient model, but it
              asks you to fit your life to a plan someone else drew.
            </p>
            <p>
              A custom home works the other way around. The design starts from how you live and what you want, and
              every major decision — the layout, the look, the materials, the features — is made with you. The budget
              is part of the conversation from the beginning, so the home you design is one you can actually build.
            </p>
          </div>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">Production homes compared with custom homes</caption>
            <thead>
              <tr className="border-b-2 border-brand-800">
                <th scope="col" className="py-4 pr-6 text-sm font-semibold uppercase tracking-wider text-ink-subtle">
                  <span className="sr-only">Aspect</span>
                </th>
                <th scope="col" className="py-4 pr-6 text-sm font-semibold uppercase tracking-wider text-ink-subtle">
                  Production home
                </th>
                <th scope="col" className="py-4 text-sm font-semibold uppercase tracking-wider text-brand-800">
                  Custom home
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.aspect} className="border-b border-mist-200">
                  <th scope="row" className="py-5 pr-6 font-display text-lg font-normal text-ink">
                    {row.aspect}
                  </th>
                  <td className="py-5 pr-6 text-ink-muted">{row.production}</td>
                  <td className="py-5 text-ink">{row.custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="white" labelledBy="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="The benefits"
          title="What a personalized building experience gives you."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="border-t border-mist-300 pt-6">
              <h3 className="text-2xl text-ink">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="next-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200">
            <Image
              src={images.planReview.src}
              alt={images.planReview.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading id="next-heading" eyebrow="Next steps" title="How to get started." />
            <ol className="mt-8 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed text-ink-muted">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href="/contact" withArrow>
                Start a conversation
              </ButtonLink>
              <TextLink href="/our-process">See the full process</TextLink>
            </div>
            <p className="mt-6 text-sm text-ink-subtle">
              Curious about cost first? Read our{" "}
              <Link href="/cost-to-build" className="text-brand-800 underline underline-offset-4">
                guide to custom home costs
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-heading" eyebrow="FAQ" title="Common questions about building custom." />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={customHomeFaqs} />
          </div>
        </div>
      </Section>

      <ConsultationCta />
    </>
  );
}
