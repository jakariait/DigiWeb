"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";

const GTM_ID = "GTM-K8RP3DB6";

function pushToDataLayer(data) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}

export default function GoogleTagManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  const trackPageView = useCallback(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pushToDataLayer({
      event: "page_view",
      page: url,
      pagePath: pathname,
      pageTitle: document?.title || "",
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      pushToDataLayer({ event: "gtm.js", "gtm.start": Date.now(), "gtm.uniqueEventId": 0 });
    }
    trackPageView();
  }, [trackPageView]);

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}