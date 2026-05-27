export type NavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  logoHref?: string;
  backgroundImageSrc?: string;
  logoImageSrc?: string;
  navItems?: NavItem[];
  scrollDelayMs?: number;
};
