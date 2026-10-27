import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { PhotoSlideshow } from "@/components/ui/PhotoSlideshow";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/portfolio/${project.slug}`;

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-card">
        <PhotoSlideshow images={project.gallery} label={`${project.title} photos`} compact fit="cover" />
        {project.isSample && (
          <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-sm bg-white/95 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink">
            Illustrative sample
          </span>
        )}
      </div>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-700">{project.style}</p>
        <Heading className="mt-2 font-display text-2xl leading-snug text-ink">
          {/* Stretched link: the whole card is clickable, but only one link is announced. */}
          <Link href={href} className="after:absolute after:inset-0 hover:text-brand-800">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-2 leading-relaxed text-ink-muted">{project.summary}</p>
      </div>
    </article>
  );
}
