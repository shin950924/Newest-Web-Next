"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { analyticsPromise } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";
import { PopupDialog } from "../component/common/PopupDialog";

export default function AnalyticsListener() {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [showPopup, setShowPopup] = useState(false);

  // Analytics: 페이지뷰 로깅
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

  // 모바일 첫 방문 시 팝업 1회 실행
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const seen = sessionStorage.getItem("hasSeenPopup");
    if (isMobile && !seen) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleStart = () => {
    window.location.href = "https://bngjt.app.link/HvHwIruAoUb";
  };

  return (
    <>
      {showPopup && <PopupDialog onClose={handleClose} onStart={handleStart} />}
    </>
  );
}
