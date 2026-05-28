import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Header } from "./Header";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Solicitar orçamento", href: "/#orcamento" },
  { label: "Contato", href: "/#contato" },
];

describe("Header", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders brand, background, and navigation items", () => {
    const { container } = render(<Header navItems={navItems} />);

    expect(screen.getByRole("link", { name: /ok gás/i })).toHaveAttribute(
      "href",
      "/#inicio",
    );
    const logo = screen.getByRole("img", { name: /ok gás engenharia/i });
    expect(logo.tagName.toLowerCase()).toBe("svg");
    expect(logo.querySelector("#ok-shine-layer")).toBeInTheDocument();
    expect(
      container.querySelector('img[src="/img/okgas-header-background.jpg"]'),
    ).toHaveAttribute("alt", "");
    expect(
      screen.getByText(
        /projetos, instalações e manutenções de sistemas de gás/i,
      ),
    ).toBeInTheDocument();
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
    expect(menuButton).not.toBeDisabled();

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
