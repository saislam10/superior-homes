import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";
import { proposedServiceAreas, serviceAreas } from "@/config/service-areas";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";
import { previousSiteReview } from "@/data/previous-site-review";

const path = "/service-areas";

export const metadata = buildMetadata({
  title: "Service Areas Around Wichita, KS",
  description:
    "Superior Homes builds custom homes in Wichita, Kansas, and nearby communities. Learn where we build and what to consider when choosing a location.",
  path,
  image: images.acreageHome,
});

const considerations = [
  {
    title: "City lots",
    body: "Established neighborhoods and infill lots in Wichita offer existing utilities and shorter commutes, but can come with tighter setbacks, older surrounding infrastructure and neighborhood design expectations.",
  },
  {
    title: "Newer developments",
    body: "Lots in growing communities around Wichita often have utilities in place and modern street layouts. Ask about covenants, architectural review requirements and any special assessments attached to the lot.",
  },
  {
    title: "Acreage and rural sites",
    body: "Building outside city limits can mean more space and privacy, along with practical questions about well water, septic systems, driveway length, utility runs and county permitting.",
  },
];

export default function ServiceAreasPage() {
  const byCounty = serviceAreas.reduce<Record<string, typeof serviceAreas>>((acc, area) => {
    (acc[area.county] ??= []).push(area);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={`Custom homes in ${siteConfig.primaryMarket.city} and surrounding communities.`}
        intro="We build in and around Wichita, Kansas. Where you build shapes your home as much as its floor plan does — from utilities and soils to covenants and permits."
        breadcrumbs={[{ name: "Service Areas", path }]}
        image={images.acreageHome}
      />

      <Section labelledBy="areas-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="areas-heading"
              eyebrow="Where we build"
              title="Our service area"
              intro="Not sure whether your location is in range? Ask — we’re glad to talk about any lot in the Wichita area."
            />
          </div>
          <div className="lg:col-span-7">
            {proposedServiceAreas.length > 0 && (
              <DraftNotice title="Service area pending confirmation" className="mb-8">
                Communities marked “proposed” are reasonable candidates for a Wichita-area builder but have not yet
                been confirmed by the owner. The former site lists homes or developments associated with{" "}
                {previousSiteReview.serviceAreaSignals.join(", ")}; this is evidence of past activity, not confirmation
                of current service coverage. Confirm or remove proposed locations before publication.
              </DraftNotice>
            )}
            <div className="space-y-8">
              {Object.entries(byCounty).map(([county, areas]) => (
                <div key={county}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">{county}</h3>
                  <ul className="mt-3 divide-y divide-mist-200 border-y border-mist-200">
                    {areas.map((area) => (
                      <li key={area.name} className="flex items-center justify-between gap-4 py-4">
                        <span className="font-display text-2xl text-ink">
                          {area.name}, {siteConfig.primaryMarket.regionCode}
                        </span>
                        {area.status === "proposed" ? (
                          <span className="rounded-sm border border-dashed border-draft-border bg-draft-bg px-2 py-1 text-xs font-semibold uppercase tracking-wide text-draft-ink">
                            Proposed — needs confirmation
                          </span>
                        ) : (
                          <span className="text-sm text-brand-700">Service area</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="location-heading">
        <SectionHeading
          id="location-heading"
          eyebrow="Choosing a location"
          title="What to consider about where you build."
          intro="Each kind of site comes with its own trade-offs. These are worth talking through before you buy land."
        />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {considerations.map((c) => (
            <li key={c.title} className="border-t border-mist-300 pt-6">
              <h3 className="text-2xl text-ink">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <TextLink href="/cost-to-build">How your site affects cost</TextLink>
          <TextLink href="/our-process">Where lot planning fits in the process</TextLink>
        </div>
      </Section>

      <ConsultationCta
        title="Have a lot in mind — or still looking?"
        body="Tell us where you’re hoping to build. We can talk through the location and what it means for your home."
      />
    </>
  );
}
