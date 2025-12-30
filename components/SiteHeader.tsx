"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";
import Image from "next/image";

const NAV = [
  { label: "Accueil", href: "/accueil#top" },
  { label: "Projets", href: "/accueil#projets" },
  { label: "Contact", href: "/accueil#contact" },
  { label: "Matrix-gen", href: "/matrix-generator" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/accueil" className={styles.brand}>
          <Image
            src="/brand/logo-256_2.svg"
            alt="MDS Digital"
            width={200}
            height={60}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles["header-menu"]}>
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className={styles.item}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}