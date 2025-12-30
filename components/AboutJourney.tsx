"use client";

import styles from "./AboutJourney.module.css";

export default function AboutJourney() {
  return (
    <div className={styles.journeyWrapper}>
      <div className={styles.journeyCard}>
        {/* Header */}
        <div className={styles.journeyHeader}>
          <h3 className={styles.journeyTitle}>
            <span className={styles.titleIcon}>{'</>'}</span>
            MON PARCOURS
          </h3>
        </div>

        {/* Content */}
        <div className={styles.journeyContent}>
          <p className={styles.paragraph}>
            Reconvertie dans le développement après une période qui m&apos;a permis de réfléchir à ce que je voulais vraiment faire : <strong>créer</strong>. Formée intensivement avec 2 titres RNCP (Développeur Web & Mobile + Concepteur Développeur d'Applications), j'ai rapidement acquis de l'expérience concrète.
          </p>

          <p className={styles.paragraph}>
            J'ai débuté en <strong>ESN</strong> où j'ai développé des sites vitrines et une application mobile iOS connectée à un CRM. Puis j&apos;ai rejoint un <strong>laboratoire de recherche contre le cancer (CRO)</strong> pour maintenir et créer des applications scientifiques complexes, gérer des bases de données et développer des outils métier. Une expérience qui m'a appris la rigueur et l'adaptabilité.
          </p>

          <p className={styles.paragraph}>
            Aujourd&apos;hui freelance sous <strong>MDS Digital</strong>, je me concentre sur ce que j'aime : le JavaScript moderne (React, Next.js, Node.js) et les solutions 100% sur-mesure. Je refuse les CRM restrictifs pour offrir à mes clients une liberté totale dans leurs projets.
          </p>
        </div>

        {/* Footer decorative element */}
        <div className={styles.journeyFooter}>
          <div className={styles.footerLine}></div>
          <span className={styles.footerText}>2020 → Aujourd&apos;hui</span>
          <div className={styles.footerLine}></div>
        </div>
      </div>
    </div>
  );
}