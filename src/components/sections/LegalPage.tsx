import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftNotice, Placeholder } from "@/components/ui/Placeholder";

/** Shared shell for placeholder legal pages. */
export function LegalPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} breadcrumbs={[{ name: title, path }]}>
        <p className="text-sm text-ink-subtle">
          Last updated: <Placeholder>Date — to be set at publication</Placeholder>
        </p>
      </PageHero>
      <Section tone="white">
        <DraftNotice title="Template — legal review required" className="mb-12 max-w-3xl">
          This page is an editable starting point, not legal advice. The business should have it reviewed by a
          qualified attorney and update it to reflect actual practices before publication.
        </DraftNotice>
        <div className="prose-site">{children}</div>
      </Section>
    </>
  );
}
