import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Ligne 1 - (Logo + Tagline) à gauche, Icônes sociales à droite */}
        <div className={styles.footerTop}>
          <div className={styles.brandSection}>
            <Link href="/accueil#top" className={styles.logoLink}>
              <Image
                src="/brand/logo-mds-panel.svg"
                alt="MDS Digital"
                width={180}
                height={54}
              />
            </Link>
            <p className={styles.footerTagline}>
              Solutions web sur-mesure · Basée à Mâcon · Disponible en remote
            </p>
          </div>

          <div className={styles.socialIcons}>
            <a
              href="https://github.com/Gagz71"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/manhouli-dounia/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <a
              href="https://www.malt.fr/profile/[VOTRE_PROFIL]"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.inactiveIcon}`}
              aria-label="Malt"
              title="Malt (profil en cours)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10-4h2v6h-2z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/[VOTRE_PROFIL]/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.inactiveIcon}`}
              aria-label="Instagram"
              title="Instagram (profil en cours)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@[VOTRE_PROFIL]"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.inactiveIcon}`}
              aria-label="TikTok"
              title="TikTok (profil en cours)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/[VOTRE_PROFIL]"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.inactiveIcon}`}
              aria-label="Facebook"
              title="Facebook (profil en cours)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="mailto:contact@mds-digital.fr"
              className={styles.socialIcon}
              aria-label="Email"
              title="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Séparateur */}
        <div className={styles.footerDivider}></div>

        {/* Ligne 2 - Navigation + Légal */}
        <div className={styles.footerBottom}>
          <nav className={styles.footerNav}>
            <Link href="#hero" className={styles.navLink}>Accueil</Link>
            <span className={styles.navSeparator}>·</span>
            <Link href="#services" className={styles.navLink}>Services</Link>
            <span className={styles.navSeparator}>·</span>
            <Link href="#technos" className={styles.navLink}>Technos</Link>
            <span className={styles.navSeparator}>·</span>
            <Link href="#projets" className={styles.navLink}>Projets</Link>
            <span className={styles.navSeparator}>·</span>
            <Link href="#about" className={styles.navLink}>À Propos</Link>
            <span className={styles.navSeparator}>·</span>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
          </nav>

          <div className={styles.legalSection}>
            <p className={styles.copyright}>
              © {currentYear} MDS Digital
            </p>
            <span className={styles.navSeparator}>·</span>
            <nav className={styles.legalNav}>
              <Link href="/mentions-legales" className={styles.legalLink}>
                Mentions Légales
              </Link>
              <span className={styles.legalSeparator}>·</span>
              <Link href="/cgv" className={styles.legalLink}>
                CGV
              </Link>
              <span className={styles.legalSeparator}>·</span>
              <Link href="/politique-confidentialite" className={styles.legalLink}>
                Confidentialité
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}