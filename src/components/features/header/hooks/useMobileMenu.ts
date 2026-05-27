"use client";

import { useCallback, useState } from "react";

import { useBodyScrollLock } from "@/hooks";

export function useMobileMenu(isHeaderCollapsed: boolean) {
  const [menuRequestedOpen, setMenuRequestedOpen] = useState(false);
  const isMenuOpen = isHeaderCollapsed && menuRequestedOpen;

  useBodyScrollLock(isMenuOpen);

  const toggleMenu = useCallback(() => {
    if (!isHeaderCollapsed) {
      setMenuRequestedOpen(false);
      return;
    }

    setMenuRequestedOpen((open) => !open);
  }, [isHeaderCollapsed]);

  const closeMenu = useCallback(() => {
    setMenuRequestedOpen(false);
  }, []);

  return { isMenuOpen, toggleMenu, closeMenu };
}
