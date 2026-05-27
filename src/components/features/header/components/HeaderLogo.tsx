import Image from "next/image";import Link from "next/link";

import styles from "../styles/header.module.css";

type HeaderLogoProps = {
  href: string;
  imageSrc: string;
};

export function HeaderLogo({ href, imageSrc }: HeaderLogoProps) {
  return (
    <Link href={href} className={styles.logo}>
      <Image
        src={imageSrc}
        alt="Logo"
        width={500}
        height={200}
        priority
        className={styles.logoImage}
      />
    </Link>
  );
}
