"use client";

import { Roboto } from "next/font/google";

import { cn } from "@/lib";

import {
  DEFAULT_HEADER_NAV_ITEMS,
  HEADER_DEFAULTS,
  HEADER_NAVIGATION_ID,
  HEADER_TOP_BAR_TEXT,
} from "../constants";
import { useHeaderScroll, useMobileMenu } from "../hooks";
import styles from "../styles/header.module.css";
import tokenStyles from "../tokens/header.tokens.module.css";
import type { HeaderProps } from "../types";
import { HeaderBackground } from "./HeaderBackground";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { HeaderNavigation } from "./HeaderNavigation";

const headerNavFont = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--header-font-roboto",
  display: "swap",
});

export function Header({
  logoHref = HEADER_DEFAULTS.logoHref,
  logoImageSrc: _logoImageSrc = HEADER_DEFAULTS.logoImageSrc,
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
        headerNavFont.variable,
        tokenStyles.headerTokens,
        styles.header,
        scrolled && styles.scrolled,
        className,
      )}
      data-background={backgroundImageSrc.trim() ? "image" : "square-wave"}
      data-state={scrolled ? "collapsed" : "expanded"}
    >
      <HeaderBackground
        imageSrc={backgroundImageSrc}
        imageAlt={backgroundAlt}
      />
      <div className={styles.topBar}>
        <p className={styles.topBarText}>{HEADER_TOP_BAR_TEXT}</p>
      </div>
      <div className={styles.mainBar}>
        <div className={styles.inner}>
          <HeaderBrand href={logoHref} imageAlt={logoAlt} onClick={closeMenu} />
          <HeaderNavigation
            id={HEADER_NAVIGATION_ID}
            ariaLabel={navigationAriaLabel}
            navItems={navItems}
            isVisible={scrolled}
            isMenuOpen={isMenuOpen}
            onNavItemClick={closeMenu}
          />
          <HeaderMenuButton
            controlsId={HEADER_NAVIGATION_ID}
            isVisible={scrolled}
            isOpen={isMenuOpen}
            onToggle={toggleMenu}
          />
        </div>
      </div>
    </header>
  );
}
