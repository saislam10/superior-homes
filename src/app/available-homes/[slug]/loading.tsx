import { Container } from "@/components/ui/Container";

export default function PropertyLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <p role="status" className="text-ink-muted">Loading property…</p>
      <div aria-hidden="true" className="mt-8 space-y-8 motion-safe:animate-pulse">
        <div className="h-12 w-3/4 max-w-xl rounded-sm bg-mist-200" />
        <div className="aspect-[16/9] rounded-card bg-mist-200" />
      </div>
    </Container>
  );
}
