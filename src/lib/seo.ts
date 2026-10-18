import type { Metadata } from "next";
import { allowIndexing, siteConfig } from "@/config/site";
import { images } from "@/config/images";

type PageMetadataInput = {
  /** Page title without the brand suffix. Omit on the homepage. */
  title?: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  /** Social share image; defaults to the hero image. */
  image?: { src: string; alt: string; width?: number; height?: number };
  /** Force noindex for this page (e.g. sample/placeholder content). */
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Builds consistent per-page metadata: title, description, canonical URL,
 * Open Graph and Twitter cards. Relative URLs resolve against
 * `metadataBase` set in the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = images.heroExterior,
  noIndex = false,
  type = "website",
}: PageMetadataInput): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — Custom Home Builder in Wichita, KS`;
  const ogImage = {
    url: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };

  return {
    // `absolute` is used on the homepage so the template isn't applied.
    title: title ?? { absolute: ogTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      title: ogTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.url],
    },
    robots: noIndex || !allowIndexing ? { index: false, follow: true } : undefined,
  };
}
