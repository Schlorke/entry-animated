"use client";

import { useEffect, useState } from "react";

export function useHeaderScroll(scrollDelayMs: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setScrolled(true), scrollDelayMs);
    return () => window.clearTimeout(timer);
  }, [scrollDelayMs]);

  return scrolled;
}
