import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { images, type SiteImage } from "@/config/images";
import { siteConfig } from "@/config/site";
import { approachPoints } from "@/data/approach";
import { previousSiteReview } from "@/data/previous-site-review";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice, Placeholder, ValueOrPlaceholder } from "@/components/ui/Placeholder";

const path = "/about";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Meet Superior Homes, a Wichita-area custom home builder focused on homes designed around the people who live in them.",
  path,
  image: images.porchHome,
});

type TeamMember = {
  name: string | null;
  role: string | null;
  bio: string | null;
  photo: SiteImage | null;
};

/**
 * Team members. `null` renders a visible placeholder. Fill in only with
 * owner-supplied facts; add or remove entries as needed.
 */
const team: TeamMember[] = [
  { name: null, role: null, bio: null, photo: null },
  { name: null, role: null, bio: null, photo: null },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Wichita-area builder focused on homes made for you."
        intro={`${siteConfig.name} builds custom homes for people who want more than a choice of floor plans. Our focus is simple: a home shaped around your life, your lot and your budget.`}
        breadcrumbs={[{ name: "About", path }]}
      />

      <Section labelledBy="story-heading">
        <DraftNotice title="Owner input needed" className="mb-12 max-w-3xl">
          This page contains placeholders for the company story, team and experience. Each bracketed item must be
          replaced with confirmed information from the owner before launch. The previous site emphasized{" "}
          {previousSiteReview.featureClaims[3].toLowerCase()}; confirm whether those remain part of the company’s
          positioning. Avoid promises of lower utility bills unless they can be substantiated.
        </DraftNotice>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="story-heading" eyebrow="Our story" title="Where we come from." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                {siteConfig.name} is a Wichita-area home builder focused on personalized custom homes — homes
                designed around the people who live in them, in Wichita and the communities around it.
              </p>
              <p>
                <Placeholder>
                  Company story — when and why the business started, how it has grown, and what led to the shift
                  toward custom homes
                </Placeholder>
              </p>
              <p>
                <Placeholder>Experience — years building, types of homes built, areas served (confirmed facts only)</Placeholder>
              </p>
              <p>
                <Placeholder>Licensing, insurance and memberships — only those that can be verified</Placeholder>
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200 lg:mt-12">
            <Image
              src={images.porchHome.src}
              alt={images.porchHome.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="values-heading">
        <SectionHeading
          id="values-heading"
          eyebrow="What we value"
          title="How we approach every home."
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2">
          {approachPoints.map((point) => (
            <li key={point.title} className="border-t border-mist-300 pt-6">
              <h3 className="text-2xl text-ink">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="team-heading">
        <SectionHeading id="team-heading" eyebrow="The team" title="The people behind your home." />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person, i) => (
            <li key={person.name ?? i}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mist-200">
                {person.photo ? (
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center border border-dashed border-draft-border bg-draft-bg text-sm text-draft-ink">
                    [Photo — to be provided]
                  </div>
                )}
              </div>
              <h3 className="mt-5 text-2xl text-ink">
                <ValueOrPlaceholder value={person.name} label={i === 0 ? "Owner name" : "Team member name"} />
              </h3>
              <p className="mt-1 text-sm text-ink-subtle">
                <ValueOrPlaceholder value={person.role} label="Role" />
              </p>
              <p className="mt-3 leading-relaxed text-ink-muted">
                <ValueOrPlaceholder value={person.bio} label="Short bio" />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <ConsultationCta />
    </>
  );
}
