"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    window.dataLayer.push({
      event: "page_view",
      page: url,
      pagePath: pathname,
      pageTitle: document?.title || "",
    });
  }, [pathname, searchParams]);

  return null;
}
