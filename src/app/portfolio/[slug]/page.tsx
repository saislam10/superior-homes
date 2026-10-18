import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getProject, projects } from "@/data/portfolio";
import { graph, projectSchema } from "@/lib/structured-data";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

/**
 * Project detail template.
 *
 * Note: with Cache Components enabled, generateStaticParams must return at
 * least one entry, so keep at least one project in src/data/portfolio.ts.
 * Unknown slugs fall through to notFound().
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    image: project.coverImage,
    // Illustrative samples must never be indexed.
    noIndex: project.isSample,
  });
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/portfolio/${project.slug}`;
  const schema = projectSchema(project, path);
  const [, ...gallery] = project.gallery;

  return (
    <>
      <PageHero
        eyebrow={project.style}
        title={project.title}
        intro={project.summary}
        breadcrumbs={[
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path },
        ]}
        image={project.coverImage}
      />

      <Section labelledBy="overview-heading">
        {project.isSample && (
          <DraftNotice title="Illustrative sample" className="mb-12 max-w-3xl">
            This page demonstrates the project template. The photos are licensed stock images and do not show a home
            built by Superior Homes. It is hidden from search engines.
          </DraftNotice>
        )}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="overview-heading" className="text-3xl text-ink sm:text-4xl">
              About this home
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              {project.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <h3 className="mt-10 text-2xl text-ink">Highlights</h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-700" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-label="Project details" className="lg:col-span-5">
            <dl className="divide-y divide-mist-200 rounded-card border border-mist-200 bg-surface px-6">
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-ink-subtle">Location</dt>
                <dd className="text-right text-ink">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-ink-subtle">Style</dt>
                <dd className="text-right text-ink">{project.style}</dd>
              </div>
              {project.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-4">
                  <dt className="text-ink-subtle">{spec.label}</dt>
                  <dd className="text-right text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {gallery.length > 0 && (
        <Section tone="white" labelledBy="gallery-heading">
          <h2 id="gallery-heading" className="text-3xl text-ink">
            Gallery
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {gallery.map((img, i) => (
              <li
                key={img.src}
                className={
                  i === 0
                    ? "relative aspect-[16/9] overflow-hidden rounded-card bg-mist-200 sm:col-span-2"
                    : "relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200"
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
          <TextLink href="/portfolio" className="mt-12">
            Back to the portfolio
          </TextLink>
        </Section>
      )}

      {schema && <JsonLd data={graph(schema)} />}

      <ConsultationCta />
    </>
  );
}
