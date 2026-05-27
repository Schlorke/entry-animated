import Link from "next/link";
import { cn } from "@/lib";

import styles from "../styles/header.module.css";
import type { NavItem } from "../types";

type HeaderNavProps = {
  navItems: NavItem[];
  isVisible: boolean;
  isMenuOpen: boolean;
  onNavItemClick: () => void;
};

export function HeaderNav({
  navItems,
  isVisible,
  isMenuOpen,
  onNavItemClick,
}: HeaderNavProps) {
  return (
    <nav id="header-nav" className={styles.nav} aria-label="Navegação principal">
      <ul
        className={cn(
          styles.navList,
          isVisible && styles.navListVisible,
          isMenuOpen && styles.navListOpen,
        )}
      >
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={styles.navLink}
              onClick={onNavItemClick}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
