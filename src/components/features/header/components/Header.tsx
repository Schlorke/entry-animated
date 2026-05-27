"use client";

import { cn } from "@/lib";

import {
  DEFAULT_HEADER_NAV_ITEMS,
  HEADER_DEFAULTS,
  HEADER_NAVIGATION_ID,
} from "../constants";
import { useHeaderScroll, useMobileMenu } from "../hooks";
import styles from "../styles/header.module.css";
import tokenStyles from "../tokens/header.tokens.module.css";
import type { HeaderProps } from "../types";
import { HeaderBackground } from "./HeaderBackground";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { HeaderNavigation } from "./HeaderNavigation";

export function Header({
  logoHref = HEADER_DEFAULTS.logoHref,
  logoImageSrc = HEADER_DEFAULTS.logoImageSrc,
  logoAlt = HEADER_DEFAULTS.logoAlt,
  backgroundImageSrc = HEADER_DEFAULTS.backgroundImageSrc,
  backgroundAlt = HEADER_DEFAULTS.backgroundAlt,
  navItems = DEFAULT_HEADER_NAV_ITEMS,
  scrollDelayMs = HEADER_DEFAULTS.scrollDelayMs,
  className,
  navigationAriaLabel = HEADER_DEFAULTS.navigationAriaLabel,
}: HeaderProps) {
  const scrolled = useHeaderScroll(scrollDelayMs);
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu(scrolled);

  return (
    <header
      className={cn(
        tokenStyles.headerTokens,
        styles.header,
        scrolled && styles.scrolled,
        className,
      )}
      data-state={scrolled ? "collapsed" : "expanded"}
    >
      <HeaderBackground
        imageSrc={backgroundImageSrc}
        imageAlt={backgroundAlt}
      />
      <HeaderBrand href={logoHref} imageSrc={logoImageSrc} imageAlt={logoAlt} />
      <HeaderMenuButton
        controlsId={HEADER_NAVIGATION_ID}
        isVisible={scrolled}
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
      />
      <HeaderNavigation
        id={HEADER_NAVIGATION_ID}
        ariaLabel={navigationAriaLabel}
        navItems={navItems}
        isVisible={scrolled}
        isMenuOpen={isMenuOpen}
        onNavItemClick={closeMenu}
      />
    </header>
  );
}
