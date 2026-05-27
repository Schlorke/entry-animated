import { cn } from "@/lib";
import styles from "../styles/header.module.css";

type MenuToggleButtonProps = {
  isVisible: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

export function MenuToggleButton({
  isVisible,
  isOpen,
  onToggle,
}: MenuToggleButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.menuToggle,
        isVisible && styles.menuToggleVisible,
        isOpen && styles.menuToggleOpen,
      )}
      aria-expanded={isOpen}
      aria-controls="header-nav"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      onClick={onToggle}
    >
      <span className={styles.menuBar} />
      <span className={styles.menuBar} />
      <span className={styles.menuBar} />
    </button>
  );
}
