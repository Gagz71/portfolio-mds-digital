"use client";

import Link from "next/link";
import styles from "./CyberpunkBtn.module.css";

type Props = {
  label?: string;
  href?: string;              // ✅ optionnel
  onClick?: () => void;        // ✅ optionnel
  className?: string;
};

export default function CyberpunkBtn({
  label = "ENTRER",
  href,
  onClick,
  className,
}: Props) {
  const classes = `${styles.btn} ${styles.btnOutline} ${className ?? ""}`;

  // ✅ Si href existe => Link (navigation)
  if (href) {
    return (
      <div className={styles.wrap}>
        <Link href={href} className={classes}>
          {label}
        </Link>
      </div>
    );
  }

  // ✅ Sinon => button normal (ouvre ta WindowTransition)
  return (
    <div className={styles.wrap}>
      <button type="button" onClick={onClick} className={classes}>
        {label}
      </button>
    </div>
  );
}

