import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "./Header";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

describe("Header", () => {
  it("renders brand, background, and navigation items", () => {
    const { container } = render(<Header navItems={navItems} />);

    expect(screen.getByRole("link", { name: /logo/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(container.querySelector('img[src="/img/law.jpg"]')).toHaveAttribute(
      "alt",
      "",
    );
    expect(
      screen.getByRole("navigation", { name: /navegação principal/i }),
    ).toBeInTheDocument();

    for (const item of navItems) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("applies collapsed state after the configured delay", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Header navItems={navItems} scrollDelayMs={500} />,
    );

    const header = container.querySelector("header");

    expect(header).toHaveAttribute("data-state", "expanded");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(header).toHaveAttribute("data-state", "collapsed");
  });

  it("opens and closes the mobile menu from the menu button", () => {
    vi.useFakeTimers();

    render(<Header navItems={navItems} scrollDelayMs={0} />);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const menuButton = screen.getByRole("button", { name: /abrir menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    expect(
      screen.getByRole("button", { name: /fechar menu/i }),
    ).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: /fechar menu/i }));

    expect(screen.getByRole("button", { name: /abrir menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("locks body scroll while the mobile menu is open", () => {
    vi.useFakeTimers();

    render(<Header navItems={navItems} scrollDelayMs={0} />);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));

    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("link", { name: /contato/i }));

    expect(document.body.style.overflow).toBe("");
  });
});
