export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  logoHref?: string;
  /**
   * @deprecated The default brand renders an inline OK Gás SVG. This prop is
   * kept for source compatibility with earlier consumers.
   */
  logoImageSrc?: string;
  logoAlt?: string;
  /**
   * Empty string renders the built-in decorative square-wave canvas background.
   * Passing a URL renders that image as the decorative background instead.
   */
  backgroundImageSrc?: string;
  backgroundAlt?: string;
  navItems?: readonly HeaderNavItem[];
  scrollDelayMs?: number;
  className?: string;
  navigationAriaLabel?: string;
};
