import { Container } from "@/components/ui/Container";

/** Supplies the Suspense boundary required before reading route params. */
export default function FloorPlanLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <p role="status" className="text-ink-muted">Loading floor plan…</p>
      <div aria-hidden="true" className="mt-8 space-y-8 motion-safe:animate-pulse">
        <div className="h-12 w-3/4 max-w-xl rounded-sm bg-mist-200" />
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="h-64 rounded-card bg-mist-200" />
          <div className="h-64 rounded-card bg-mist-200" />
        </div>
      </div>
    </Container>
  );
}
