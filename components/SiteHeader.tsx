"use client";

import { useState, useEffect } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ferme le menu quand on change de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (pathname === "/") return null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/accueil" className={styles.brand}>
          <Image
            src="/brand/logo-mds-panel.svg"
            alt="MDS Digital"
            width={240}
            height={72}
            priority
            className={styles.logo}
          />
        </Link>

        {/* Burger Button */}
        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav 
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          aria-label="Navigation principale"
        >
          <ul className={styles["header-menu"]}>
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className={styles.item}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    onClick={() => setIsMenuOpen(false)}
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