export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  logoHref?: string;
  logoImageSrc?: string;
  logoAlt?: string;
  backgroundImageSrc?: string;
  backgroundAlt?: string;
  navItems?: readonly HeaderNavItem[];
  scrollDelayMs?: number;
  className?: string;
  navigationAriaLabel?: string;
};
