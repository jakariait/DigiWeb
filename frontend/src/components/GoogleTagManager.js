"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

function pushToDataLayer(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export default function GoogleTagManager() {
  const pathname = usePathname();

  const trackPageView = useCallback((path) => {
    pushToDataLayer({
      event: "page_view",
      page: path,
    });
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname, trackPageView]);

  return (
    <>
      {/* GTM script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K8RP3DB6');
        `}
      </Script>

      {/* Noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K8RP3DB6"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}