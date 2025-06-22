// src/components/AnalyticsListener.tsx
"use client";

import { usePathname } from "next/navigation"; // 이건 여전히 괜찮습니다
import { useEffect, useRef } from "react";
import { analyticsPromise } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function AnalyticsListener() {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    }

    analyticsPromise.then((analytics) => {
      if (analytics) {
        logEvent(analytics, "page_view", {
          page_location: window.location.href,
          page_path: pathname,
          page_query: window.location.search,
        });
      }
    });
  }, [pathname]);

  return null;
}
