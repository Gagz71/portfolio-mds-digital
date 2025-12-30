"use client";

import Link from "next/link";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  link?: {
    label: string;
    href: string;
  };
  number?: string; // "01", "02", etc.
};

export default function SectionHeader({
  title,
  subtitle,
  link,
  number,
}: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 
          className={styles.title}
          data-number={number}
        >
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {link && (
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
      )}
    </div>
  );
}