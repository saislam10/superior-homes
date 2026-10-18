import type { Metadata, Viewport } from "next";
import { Geist, Marcellus } from "next/font/google";
import { allowIndexing, siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Flared display serif chosen to echo the Superior Homes logo lettering.
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Custom Home Builder in Wichita, KS`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  alternates: { canonical: "/" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#151340",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${marcellus.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-sm bg-brand-800 px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Analytics />
      </body>
    </html>
  );
}
