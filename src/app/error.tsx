"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="section-y">
      <div className="max-w-2xl">
        <h1 className="text-4xl text-ink sm:text-5xl">Something went wrong.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Go to the homepage
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
