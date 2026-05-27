import Image from "next/image";
import Link from "next/link";

import styles from "../styles/header.module.css";

type HeaderBrandProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export function HeaderBrand({ href, imageSrc, imageAlt }: HeaderBrandProps) {
  return (
    <Link href={href} className={styles.brand}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={500}
        height={200}
        priority
        className={styles.brandImage}
      />
    </Link>
  );
}
