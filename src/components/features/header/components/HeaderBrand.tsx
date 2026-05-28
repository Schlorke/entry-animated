import Link from "next/link";

import styles from "../styles/header.module.css";
import { OkGasLogoSvg } from "./OkGasLogoSvg";

type HeaderBrandProps = {
  href: string;
  imageAlt: string;
  onClick?: () => void;
};

export function HeaderBrand({ href, imageAlt, onClick }: HeaderBrandProps) {
  return (
    <Link href={href} className={styles.brand} onClick={onClick}>
      <OkGasLogoSvg aria-label={imageAlt} className={styles.brandImage} />
    </Link>
  );
}
