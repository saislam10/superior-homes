import { Container } from "@/components/ui/Container";

/** Next.js wraps this segment in Suspense before the page reads params. */
export default function ProjectLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <p role="status" className="text-ink-muted">
        Loading project…
      </p>
      <div aria-hidden="true" className="mt-8 space-y-8 motion-safe:animate-pulse">
        <div className="h-12 w-3/4 max-w-xl rounded-sm bg-mist-200" />
        <div className="aspect-[16/9] rounded-card bg-mist-200" />
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="h-32 rounded-card bg-mist-200" />
          <div className="h-32 rounded-card bg-mist-200" />
        </div>
      </div>
    </Container>
  );
}
