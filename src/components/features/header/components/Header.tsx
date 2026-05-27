"use client";

import { cn } from "@/lib";

import { DEFAULT_NAV_ITEMS, HEADER_DEFAULTS } from "../constants";
import { useHeaderScroll, useMobileMenu } from "../hooks";
import styles from "../styles/header.module.css";
import type { HeaderProps } from "../types";
import { HeaderBackground } from "./HeaderBackground";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { MenuToggleButton } from "./MenuToggleButton";

export function Header({
  logoHref = HEADER_DEFAULTS.logoHref,
  backgroundImageSrc = HEADER_DEFAULTS.backgroundImageSrc,
  logoImageSrc = HEADER_DEFAULTS.logoImageSrc,
  navItems = DEFAULT_NAV_ITEMS,
  scrollDelayMs = HEADER_DEFAULTS.scrollDelayMs,
}: HeaderProps) {
  const scrolled = useHeaderScroll(scrollDelayMs);
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu(scrolled);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <HeaderBackground imageSrc={backgroundImageSrc} />
      <HeaderLogo href={logoHref} imageSrc={logoImageSrc} />
      <MenuToggleButton
        isVisible={scrolled}
        isOpen={menuOpen}
        onToggle={toggleMenu}
      />
      <HeaderNav
        navItems={navItems}
        isVisible={scrolled}
        isMenuOpen={menuOpen}
        onNavItemClick={closeMenu}
      />
    </header>
  );
}
