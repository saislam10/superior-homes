import Script from "next/script";

/**
 * Optional Google Analytics 4.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so no
 * third-party script loads by default. Before enabling, update the privacy
 * policy and decide whether a consent banner is required for your audience.
 * See README.md → "Analytics and search monitoring".
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
