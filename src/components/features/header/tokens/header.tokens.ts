export const HEADER_CSS_VARIABLES = {
  colorSurface: "--header-color-surface",
  colorSurfaceElevated: "--header-color-surface-elevated",
  colorTextInverse: "--header-color-text-inverse",
  colorTextOnLight: "--header-color-text-on-light",
  focusColor: "--header-focus-color",
  zIndex: "--header-z-index",
  heightCollapsed: "--header-height-collapsed",
  logoWidthExpanded: "--header-logo-width-expanded",
  logoWidthCollapsed: "--header-logo-width-collapsed",
  logoWidthMobile: "--header-logo-width-mobile",
  logoWidthMobileCollapsed: "--header-logo-width-mobile-collapsed",
  brandCollapsedInlineStart: "--header-brand-collapsed-inline-start",
  navInlineEnd: "--header-nav-inline-end",
  menuBarWidth: "--header-menu-bar-width",
  menuBarHeight: "--header-menu-bar-height",
  menuBarGap: "--header-menu-bar-gap",
  menuBarTransformOffset: "--header-menu-bar-transform-offset",
  mobileMenuOffset: "--header-mobile-menu-offset",
  transitionDurationSlow: "--header-transition-duration-slow",
  transitionDurationFast: "--header-transition-duration-fast",
  transitionEase: "--header-transition-ease",
} as const;

export type HeaderCssVariable =
  (typeof HEADER_CSS_VARIABLES)[keyof typeof HEADER_CSS_VARIABLES];
