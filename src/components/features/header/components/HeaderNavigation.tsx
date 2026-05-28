import Link from "next/link";
import { cn } from "@/lib";

import styles from "../styles/header.module.css";
import type { HeaderNavItem } from "../types";

type HeaderNavigationProps = {
  id: string;
  ariaLabel: string;
  navItems: readonly HeaderNavItem[];
  isVisible: boolean;
  isMenuOpen: boolean;
  onNavItemClick: () => void;
};

export function HeaderNavigation({
  id,
  ariaLabel,
  navItems,
  isVisible,
  isMenuOpen,
  onNavItemClick,
}: HeaderNavigationProps) {
  return (
    <nav
      id={id}
      className={cn(
        styles.navigation,
        isVisible && styles.navigationVisible,
        isMenuOpen && styles.navigationOpen,
      )}
      aria-label={ariaLabel}
    >
      <ul className={styles.navigationList}>
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={styles.navigationLink}
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
