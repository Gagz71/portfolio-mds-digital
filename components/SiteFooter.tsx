"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteFooter.module.css";

const NAV = [
  { label: "Accueil", href: "/accueil" },
  { label: "Projets", href: "/projets" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SiteFooter() {
  const pathname = usePathname();

  // ✅ On cache le footer sur la landing "/" (Matrix + bouton)
  if (pathname === "/") return null;

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* ✅ Bloc marque */}
        <div className={styles.brand}>
          <div className={styles.brandTitle}>MDS Digital</div>
          <div className={styles.brandTag}>
            Du concept au déploiement
          </div>
        </div>

        {/* ✅ Navigation */}
        <nav className={styles.nav} aria-label="Navigation pied de page">
          <ul className={styles.ul}>
            {NAV.map((item) => (
              <li key={item.href} className={styles.li}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ Infos */}
        <div className={styles.meta}>
          <div className={styles.metaLine}>© {year} MDS Digital</div>
          <div className={styles.metaLine}>
            Web • Mobile • Performance
          </div>
        </div>
      </div>
    </footer>
  );
}
