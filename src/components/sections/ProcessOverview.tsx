import { processStages } from "@/data/process";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export function ProcessOverview() {
  return (
    <Section tone="white" labelledBy="process-heading">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          id="process-heading"
          eyebrow="The process"
          title="From first conversation to final walkthrough."
          intro="Building a custom home is a series of clear steps, each with decisions you make together with your builder. Here’s the general shape of the journey."
        />
        <ButtonLink href="/our-process" variant="secondary" withArrow className="self-start lg:self-auto">
          Explore the process
        </ButtonLink>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-4">
        {processStages.map((stage, i) => (
          <li key={stage.slug} className="flex flex-col bg-surface p-7">
            <span aria-hidden="true" className="font-display text-3xl text-leaf-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl text-ink">{stage.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{stage.summary}</p>
          </li>
        ))}
        <li className="flex flex-col justify-center bg-brand-800 p-7 text-white">
          <p className="font-display text-2xl leading-snug">Ready for step one?</p>
          <p className="mt-2 text-[0.95rem] text-white/80">It starts with a conversation — no commitment.</p>
          <ButtonLink href="/contact" variant="light" className="mt-5 self-start">
            Get in touch
          </ButtonLink>
        </li>
      </ol>
    </Section>
  );
}
