"use client";

import Link from "next/link";
import styles from "./CtaBtn.module.css";

interface CtaBtnProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  tone?: "cyan" | "violet";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "none";
  onClick?: () => void;
}

export default function CtaBtn({
  label,
  href,
  variant = "primary",
  tone = "cyan",
  size = "md",
  icon = "arrow",
  onClick,
}: CtaBtnProps) {
  // Construction des classes CSS
  const buttonClasses = [
    styles.ctaBtn,
    styles[variant],
    styles[tone],
    styles[size],
    icon === "arrow" ? styles.withArrow : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Si c'est un lien interne, on utilise Next Link
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick}>
        <span className={styles.label}>{label}</span>
         {icon === "arrow" && variant === "primary" && (
          <span className={styles.arrow}>»</span>
        )}
        {icon === "arrow" && variant === "secondary" && (
          <span className={styles.arrow}>_</span>
        )}
      </Link>
    );
  }

  // Sinon lien externe
  return (
    <a
      href={href}
      className={buttonClasses}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.label}>{label}</span>
      {icon === "arrow" && variant === "primary" && (
        <span className={styles.arrow}>»</span>
      )}
      {icon === "arrow" && variant === "secondary" && (
        <span className={styles.arrow}>_</span>
      )}
    </a>
  );
}