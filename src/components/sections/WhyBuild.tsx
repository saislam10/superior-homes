import { Compass, MapPin, MessagesSquare, Wallet, type LucideIcon } from "lucide-react";
import { approachPoints, type ApproachPoint } from "@/data/approach";
import { Section, SectionHeading } from "@/components/ui/Section";

const icons: Record<ApproachPoint["icon"], LucideIcon> = {
  compass: Compass,
  wallet: Wallet,
  messages: MessagesSquare,
  "map-pin": MapPin,
};

export function WhyBuild() {
  return (
    <Section tone="navy" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why Superior Homes"
        title="What you should expect from your builder."
        intro="A custom home is a big decision and a long collaboration. These are the commitments we bring to every project."
        inverted
      />
      <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {approachPoints.map((point) => {
          const Icon = icons[point.icon];
          return (
            <li key={point.title} className="border-t border-white/20 pt-6">
              <Icon aria-hidden="true" className="size-6 text-leaf-300" strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl leading-snug text-white">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-white/75">{point.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
