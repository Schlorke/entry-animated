import type { NavItem } from "../types";

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#" },
  { label: "Sobre", href: "#" },
  { label: "Serviços", href: "#" },
  { label: "Portfólio", href: "#" },
  { label: "Time", href: "#" },
  { label: "Contato", href: "#" },
];

export const HEADER_DEFAULTS = {
  logoHref: "/",
  backgroundImageSrc: "/img/law.jpg",
  logoImageSrc: "/img/Logo.png",
  scrollDelayMs: 1500,
} as const;
