import styles from './CyberFragments.module.css';

export default function CyberFragments() {
  return (
    <div className={styles.fragments} aria-hidden="true">
      {/* Coin supérieur gauche */}
      <div className={styles.cornerTopLeft}>
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.dot} />
      </div>

      {/* Coin supérieur droit */}
      <div className={styles.cornerTopRight}>
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.dot} />
      </div>

      {/* Coin inférieur gauche */}
      <div className={styles.cornerBottomLeft}>
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.dot} />
      </div>

      {/* Coin inférieur droit */}
      <div className={styles.cornerBottomRight}>
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.dot} />
      </div>

      {/* Fragments haut (milieu) */}
      <div className={styles.topCenter}>
        <div className={styles.smallLine} />
        <div className={styles.bracket} />
      </div>

      {/* Fragments bas (milieu) */}
      <div className={styles.bottomCenter}>
        <div className={styles.smallLine} />
        <div className={styles.bracket} />
      </div>

      {/* Fragments gauche (milieu) */}
      <div className={styles.leftCenter}>
        <div className={styles.verticalLine} />
        <div className={styles.smallDot} />
      </div>

      {/* Fragments droite (milieu) */}
      <div className={styles.rightCenter}>
        <div className={styles.verticalLine} />
        <div className={styles.smallDot} />
      </div>

      {/* Petits détails supplémentaires */}
      <div className={styles.detail1} />
      <div className={styles.detail2} />
      <div className={styles.detail3} />
      <div className={styles.detail4} />
    </div>
  );
}