import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Ruler } from "lucide-react";
import type { FloorPlan } from "@/data/floor-plans";
import type { Community } from "@/data/communities";
import { formatPrice, statusLabels, type AvailableHome, type HomeStatus } from "@/data/available-homes";
import { cn } from "@/lib/cn";

/** Beds / baths / square feet row used on plan and home cards. */
export function SpecRow({
  beds,
  baths,
  sqft,
  className,
}: {
  beds: number;
  baths: number;
  sqft: number;
  className?: string;
}) {
  const items = [
    { icon: BedDouble, value: beds, label: beds === 1 ? "Bed" : "Beds" },
    { icon: Bath, value: baths, label: baths === 1 ? "Bath" : "Baths" },
    { icon: Ruler, value: sqft.toLocaleString("en-US"), label: "Sq ft" },
  ];
  return (
    <dl className={cn("grid grid-cols-3 divide-x divide-mist-200 border-y border-mist-200 py-4", className)}>
      {items.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1 text-center">
          <Icon aria-hidden="true" className="order-1 size-5 text-brand-600" strokeWidth={1.5} />
          <dt className="order-3 text-xs uppercase tracking-wider text-ink-subtle">{label}</dt>
          <dd className="order-2 font-display text-xl text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-sm bg-white/95 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink",
        className,
      )}
    >
      Illustrative sample
    </span>
  );
}

const statusStyles: Record<HomeStatus, string> = {
  available: "bg-leaf-700 text-white",
  "under-construction": "bg-brand-800 text-white",
  pending: "bg-white text-ink",
  sold: "bg-ink text-white",
};

export function StatusBadge({ status, className }: { status: HomeStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wide",
        statusStyles[status],
        className,
      )}
    >
      {status === "available" && <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf-300" />}
      {statusLabels[status]}
    </span>
  );
}

const cardImageSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function FloorPlanCard({ plan }: { plan: FloorPlan }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-mist-200 bg-surface">
      <div className="relative aspect-[3/2] overflow-hidden bg-mist-200">
        <Image
          src={plan.image.src}
          alt={plan.image.alt}
          fill
          sizes={cardImageSizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {plan.isSample && <SampleBadge className="absolute left-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-700">Floor plan</p>
        <h3 className="mt-2 text-2xl leading-snug text-ink">
          <Link href={`/floor-plans/${plan.slug}`} className="after:absolute after:inset-0 hover:text-brand-800">
            {plan.name}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{plan.summary}</p>
        <SpecRow beds={plan.beds} baths={plan.baths} sqft={plan.sqft} className="mt-auto pt-4" />
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-800">
          Explore &amp; customize
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}

export function HomeCard({ home, communityName, planName }: { home: AvailableHome; communityName?: string; planName?: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-mist-200 bg-surface">
      <div className="relative aspect-[3/2] overflow-hidden bg-mist-200">
        <Image
          src={home.image.src}
          alt={home.image.alt}
          fill
          sizes={cardImageSizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge status={home.status} />
          {home.isSample && <SampleBadge />}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug text-ink">
          <Link href={`/available-homes/${home.slug}`} className="after:absolute after:inset-0 hover:text-brand-800">
            {home.address}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-subtle">{home.city}</p>
        {(communityName || planName) && (
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {communityName && (
              <div>
                <dt className="text-ink-subtle">Community</dt>
                <dd className="text-ink">{communityName}</dd>
              </div>
            )}
            {planName && (
              <div>
                <dt className="text-ink-subtle">Floor plan</dt>
                <dd className="text-ink">{planName}</dd>
              </div>
            )}
          </dl>
        )}
        <SpecRow beds={home.beds} baths={home.baths} sqft={home.sqft} className="mt-auto pt-4" />
        <div className="mt-4 flex items-end justify-between gap-4">
          <p>
            <span className="block text-xs uppercase tracking-wider text-ink-subtle">
              {home.price === null ? "Price" : "Listed at"}
            </span>
            <span className="font-display text-xl text-ink">{formatPrice(home.price)}</span>
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-800">
            View home
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-mist-200 bg-surface">
      <div className="relative aspect-[16/9] overflow-hidden bg-mist-200">
        <Image
          src={community.image.src}
          alt={community.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/10 to-transparent" />
        {community.isSample && <SampleBadge className="absolute left-3 top-3" />}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="text-2xl leading-tight sm:text-3xl">
            <Link href={`/communities/${community.slug}`} className="after:absolute after:inset-0">
              {community.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-white/85">{community.city}</p>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-6 p-6">
        <p className="leading-relaxed text-ink-muted">{community.summary}</p>
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-mist-300 text-brand-800 transition-colors group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
