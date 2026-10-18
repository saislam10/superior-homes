import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { projects, realProjects } from "@/data/portfolio";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { DraftNotice } from "@/components/ui/Placeholder";

const path = "/portfolio";

export const metadata = buildMetadata({
  title: "Custom Home Portfolio",
  description:
    "Explore custom homes by Superior Homes in Wichita and surrounding communities. Project photography and details are being added.",
  path,
  image: images.modernExterior,
});

export default function PortfolioPage() {
  const onlySamples = realProjects.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Homes designed around the people who live in them."
        intro="Every custom home tells the story of its owners — their priorities, their lot, and the choices they made along the way. Project write-ups and photography will be added here as homes are completed and documented."
        breadcrumbs={[{ name: "Portfolio", path }]}
      />

      <Section labelledBy="projects-heading">
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>

        {onlySamples && (
          <DraftNotice title="Portfolio coming soon" className="mb-12 max-w-3xl">
            Real Superior Homes projects are being photographed and documented. Until then, the entries below are
            illustrative samples using licensed stock photography. They show how projects will be presented and are
            not homes built by Superior Homes.
          </DraftNotice>
        )}

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <ConsultationCta
        title="Have a home in mind?"
        body="Bring your ideas, photos and must-haves. We’ll talk through what it would take to build them."
      />
    </>
  );
}
