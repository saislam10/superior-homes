import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/portfolio/${project.slug}`;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {project.isSample && (
          <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink">
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
