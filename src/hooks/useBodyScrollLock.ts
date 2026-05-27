"use client";

import { useEffect } from "react";

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
}
