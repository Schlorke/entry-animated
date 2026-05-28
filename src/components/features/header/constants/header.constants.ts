import type { HeaderNavItem } from "../types";

export const HEADER_NAVIGATION_ID = "header-navigation";

export const HEADER_TOP_BAR_TEXT =
  "Projetos, instalações e manutenções de sistemas de gás no Sul do Brasil";

export const DEFAULT_HEADER_NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Solicitar orçamento", href: "/#orcamento" },
  { label: "Contato", href: "/#contato" },
] as const satisfies readonly HeaderNavItem[];

export const HEADER_DEFAULTS = {
  logoHref: "/#inicio",
  backgroundImageSrc: "",
  backgroundAlt: "",
  logoImageSrc: "/img/okgas-logo-abreviado.png",
  logoAlt: "OK Gás Engenharia",
  scrollDelayMs: 6000,
  navigationAriaLabel: "Navegação principal",
} as const;
