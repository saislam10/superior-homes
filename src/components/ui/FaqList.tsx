import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { faqSchema, graph } from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible,
 * crawlable, and requires no client-side JavaScript.
 */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  const schema = withSchema ? faqSchema(faqs) : null;

  return (
    <>
      <div className="divide-y divide-mist-200 border-y border-mist-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-1">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-lg text-ink hover:text-brand-800">
              <span className="font-display text-xl leading-snug">
                {faq.question}
                {faq.needsOwnerReview && (
                  <span className="ml-2 inline-block translate-y-[-2px] rounded-sm border border-dashed border-draft-border bg-draft-bg px-1.5 py-0.5 align-middle font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-draft-ink">
                    Draft — owner to confirm
                  </span>
                )}
              </span>
              <Plus
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-brand-700 transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-3xl pb-6 leading-relaxed text-ink-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={graph(schema)} />}
    </>
  );
}
