"use client";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      speed: 500,
      trickleSpeed: 200,
    });

    NProgress.start();

    // Force complete the progress bar after a short delay
    const timer = setTimeout(() => {
      NProgress.done(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      NProgress.done(true);
    };
  }, [pathname, searchParams]);

  return null;
}
