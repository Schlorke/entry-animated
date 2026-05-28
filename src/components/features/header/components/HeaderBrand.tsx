import Image from "next/image";
import Link from "next/link";

import styles from "../styles/header.module.css";

type HeaderBrandProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: () => void;
};

export function HeaderBrand({
  href,
  imageSrc,
  imageAlt,
  onClick,
}: HeaderBrandProps) {
  return (
    <Link href={href} className={styles.brand} onClick={onClick}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={180}
        height={120}
        sizes="(max-width: 640px) 100px, 130px"
        priority
        className={styles.brandImage}
      />
    </Link>
  );
}
