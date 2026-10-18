import Image from "next/image";
import { images } from "@/config/images";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Button";

const pillars = [
  {
    title: "Your plan",
    body: "Rooms sized and arranged for how you live, from the mudroom to the primary suite.",
  },
  {
    title: "Your finishes",
    body: "Materials and selections you choose, not a builder’s upgrade package.",
  },
  {
    title: "Your priorities",
    body: "Spend where it matters most to you, and save where it doesn’t.",
  },
];

export function ValueProposition() {
  return (
    <Section tone="canvas" labelledBy="value-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="value-heading"
            eyebrow="Built around you"
            title="A home that fits your life — not a subdivision template."
            intro={
              <>
                <p>
                  Production homes ask you to choose from a short list of plans and options. A custom home starts
                  somewhere else: with your household, your routines, and the way you want your home to feel.
                </p>
                <p className="mt-4">
                  The result is a home planned for you from the start, with the budget in the conversation from the
                  first meeting.
                </p>
              </>
            }
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border-t border-brand-800 pt-4">
                <dt className="font-display text-xl text-ink">{p.title}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
          <TextLink href="/custom-homes" className="mt-10">
            More about building a custom home
          </TextLink>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mist-200 sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src={images.openLiving.src}
            alt={images.openLiving.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
