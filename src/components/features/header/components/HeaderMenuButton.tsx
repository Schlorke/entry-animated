import { cn } from "@/lib";
import styles from "../styles/header.module.css";

type HeaderMenuButtonProps = {
  controlsId: string;
  isVisible: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

export function HeaderMenuButton({
  controlsId,
  isVisible,
  isOpen,
  onToggle,
}: HeaderMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.menuButton,
        isVisible && styles.menuButtonVisible,
        isOpen && styles.menuButtonOpen,
      )}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      onClick={onToggle}
    >
      <span className={styles.menuButtonBar} />
      <span className={styles.menuButtonBar} />
      <span className={styles.menuButtonBar} />
    </button>
  );
}
