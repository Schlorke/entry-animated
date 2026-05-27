import Image from "next/image";
import styles from "../styles/header.module.css";

type HeaderBackgroundProps = {
  imageSrc: string;
};

export function HeaderBackground({ imageSrc }: HeaderBackgroundProps) {
  return (
    <Image
      src={imageSrc}
      alt=""
      fill
      priority
      sizes="100vw"
      className={styles.backgroundImage}
    />
  );
}
