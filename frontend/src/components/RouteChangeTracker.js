"use client";

import { useEffect } from "react";

export default function RouteChangeTracker() {
  useEffect(() => {
    function pushPageView() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page: window.location.pathname + window.location.search,
        pagePath: window.location.pathname,
        pageTitle: document.title,
      });
    }

    // Fire on initial page load
    pushPageView();

    // Patch history.pushState — used by Next.js <Link> for client navigation
    const originalPushState = history.pushState.bind(history);
    history.pushState = function (...args) {
      originalPushState(...args);
      pushPageView();
    };

    // Patch history.replaceState
    const originalReplaceState = history.replaceState.bind(history);
    history.replaceState = function (...args) {
      originalReplaceState(...args);
      pushPageView();
    };

    // Handle browser back/forward
    window.addEventListener("popstate", pushPageView);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", pushPageView);
    };
  }, []);

  return null;
}
