"use client";

import styles from "./AboutCard.module.css";

interface AboutCardProps {
  bio?: string;
}

export default function AboutCard({ 
  bio = "Développeuse full-stack depuis 2020, spécialisée en JavaScript et solutions sur-mesure. Passionnée par les outils internes et l'e-commerce. Basée à Mâcon, disponible en remote pour donner vie à vos projets."
}: AboutCardProps) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.glitchCard}>
        {/* Header visuel */}
        <div className={styles.cardHeaderVisual}></div>

        {/* Avatar avec initiales MD */}
        <div className={styles.profileAvatar}>
          <div className={styles.initials}>MD</div>
        </div>

        {/* Body */}
        <div className={styles.cardBody}>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName} data-text="DOUNIA MANHOULI">
              DOUNIA MANHOULI
            </h2>
            <p className={styles.profileTitle}>DÉVELOPPEUSE FULL-STACK</p>
          </div>

          {/* Section Bio */}
          <div className={styles.bioSection}>
            <p className={styles.bioText}>{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}