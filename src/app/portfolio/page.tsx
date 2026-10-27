import { buildMetadata } from "@/lib/seo";
import { remingtonGallery } from "@/config/images";
import { projects, realProjects } from "@/data/portfolio";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { DraftNotice } from "@/components/ui/Placeholder";
import { previousSiteReview } from "@/data/previous-site-review";

const path = "/portfolio";

export const metadata = buildMetadata({
  title: "Custom Home Portfolio",
  description:
    "Explore Superior Homes project galleries from Wichita and surrounding communities, including kitchens, living spaces, interior details and outdoor areas.",
  path,
  image: remingtonGallery[0],
});

export default function PortfolioPage() {
  const onlySamples = realProjects.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Homes designed around the people who live in them."
        intro="Explore Superior Homes project photography, including open living spaces, kitchens, interior details and outdoor areas."
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
            not homes built by Superior Homes. The former site has a substantial archive: {previousSiteReview.homeArchive.summary}{" "}
            {previousSiteReview.homeArchive.reviewNote}
          </DraftNotice>
        )}

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {(onlySamples ? projects : realProjects).map((project) => (
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
