"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page: window.location.pathname + window.location.search,
      pagePath: pathname,
      pageTitle: document.title,
    });
  }, [pathname]);

  return null;
}
