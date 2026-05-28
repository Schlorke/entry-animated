import Image from "next/image";
import styles from "../styles/header.module.css";
import { SquareWaveBackground } from "./SquareWaveBackground";

type HeaderBackgroundProps = {
  imageSrc: string;
  imageAlt: string;
};

export function HeaderBackground({
  imageSrc,
  imageAlt,
}: HeaderBackgroundProps) {
  if (!imageSrc.trim()) {
    return <SquareWaveBackground />;
  }

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      priority
      sizes="100vw"
      className={styles.backgroundImage}
    />
  );
}
