import { describe, expect, expectTypeOf, it } from "vitest";

import { Header, HEADER_CSS_VARIABLES } from ".";
import type { HeaderCssVariable, HeaderNavItem, HeaderProps } from ".";

describe("public API", () => {
  it("exports the reusable header contract from the root entry point", () => {
    expect(Header).toBeTypeOf("function");
    expect(HEADER_CSS_VARIABLES.colorSurface).toBe("--header-color-surface");

    const cssVariable: HeaderCssVariable = HEADER_CSS_VARIABLES.colorSurface;

    expect(cssVariable).toBe("--header-color-surface");
    expectTypeOf<HeaderNavItem>().toMatchTypeOf<{
      label: string;
      href: string;
    }>();
    expectTypeOf<HeaderProps>().toMatchTypeOf<{
      className?: string;
      navItems?: readonly HeaderNavItem[];
    }>();
  });
});
