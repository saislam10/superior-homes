/**
 * Renders JSON-LD structured data.
 *
 * Data passed here must come from trusted, developer-controlled sources
 * (src/config, src/data) — never from user input. `<` is escaped so the
 * payload cannot terminate the script element. This is the pattern
 * recommended by the Next.js docs for JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
