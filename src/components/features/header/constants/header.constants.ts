import type { HeaderNavItem } from "../types";

export const HEADER_NAVIGATION_ID = "header-navigation";

export const DEFAULT_HEADER_NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Time", href: "/#time" },
  { label: "Contato", href: "/#contato" },
] as const satisfies readonly HeaderNavItem[];

export const HEADER_DEFAULTS = {
  logoHref: "/",
  backgroundImageSrc: "/img/law.jpg",
  backgroundAlt: "",
  logoImageSrc: "/img/Logo.png",
  logoAlt: "Logo",
  scrollDelayMs: 1500,
  navigationAriaLabel: "Navegação principal",
} as const;
