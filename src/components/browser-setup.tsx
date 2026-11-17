"use client";
import { useEffect } from "react";

export function BrowserSetup() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("contextmenu", preventContextMenu);
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker
        .register("/service-worker.js")
        .catch(() => undefined);
    }
    if (
      /iphone|ipad|ipod/iu.test(navigator.userAgent) &&
      !("standalone" in navigator && navigator.standalone)
    ) {
      try {
        const now = Date.now();
        const next = localStorage.getItem("ios-pwa-popup");
        if (next && Number(next) < now) {
          localStorage.setItem("ios-pwa-popup", String(now + 604_800_000));
          window.alert(
            "하단 공유 버튼을 누르면📱\n'홈 화면에 추가'할 수 있습니다!",
          );
        } else if (!next) {
          localStorage.setItem("ios-pwa-popup", String(now + 3_600_000));
        }
      } catch {
        /* Installation hints are optional when storage is unavailable. */
      }
    }
    return () => window.removeEventListener("contextmenu", preventContextMenu);
  }, []);
  return null;
}
