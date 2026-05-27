"use client";

import { useCallback, useEffect, useState } from "react";

import { useBodyScrollLock } from "@/hooks";

export function useMobileMenu(scrolled: boolean) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!scrolled) {
      setMenuOpen(false);
    }
  }, [scrolled]);

  useBodyScrollLock(menuOpen);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return { menuOpen, toggleMenu, closeMenu };
}
