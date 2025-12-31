"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);
  const [typeLineIdx, setTypeLineIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);

  const terminalLines = [
    "root@mds:~$ locate page",
    "[ERROR] Page not found in database",
    "[ERROR] Requested resource does not exist",
    "[INFO] Redirecting to safe zone recommended",
    "root@mds:~$ ",
  ];

  useEffect(() => {
    // Glitch fréquent sur toute la page
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 400);
    }, Math.random() * 1500 + 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Effet typewriter sur le terminal
    if (typeLineIdx >= terminalLines.length) return;

    const currentLine = terminalLines[typeLineIdx];
    
    if (typeCharIdx < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypeCharIdx(typeCharIdx + 1);
      }, 30); // Vitesse de frappe
      return () => clearTimeout(timeout);
    } else {
      // Ligne terminée, passer à la suivante après pause
      const timeout = setTimeout(() => {
        setTypeLineIdx(typeLineIdx + 1);
        setTypeCharIdx(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [typeLineIdx, typeCharIdx, terminalLines]);

  return (
    <div className={`${styles.errorPage} ${glitch ? styles.pageGlitch : ""}`}>
      {/* Fragments Cyberpunk */}
      <div className={styles.fragments} aria-hidden="true">
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        <div className={styles.cornerBottomRight} />
      </div>

      {/* Scanlines */}
      <div className={styles.scanlines} aria-hidden="true" />

      {/* Contenu */}
      <div className={styles.container}>
        <div className={styles.errorBox}>
          {/* Code erreur avec glitch */}
          <div className={styles.errorCode} data-text="404">
            404
          </div>

          {/* Terminal style */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} />
              <span className={styles.terminalTitle}>SYSTEM ERROR</span>
              <span className={styles.terminalCode}>ERR://404</span>
            </div>
            <div className={styles.terminalBody}>
              {/* Lignes déjà complètes */}
              {terminalLines.slice(0, typeLineIdx).map((line, i) => (
                <p key={i} className={styles.terminalLine}>
                  {line.startsWith("[ERROR]") && (
                    <span className={styles.error}>[ERROR]</span>
                  )}
                  {line.startsWith("[INFO]") && (
                    <span className={styles.info}>[INFO]</span>
                  )}
                  {line.startsWith("root@mds") && (
                    <span className={styles.prompt}>root@mds:~$</span>
                  )}
                  {line.replace(/^\[ERROR\]\s*/, "").replace(/^\[INFO\]\s*/, "").replace(/^root@mds:~\$\s*/, "")}
                </p>
              ))}

              {/* Ligne en cours de frappe */}
              {typeLineIdx < terminalLines.length && (
                <p className={styles.terminalLine}>
                  {terminalLines[typeLineIdx].startsWith("[ERROR]") && (
                    <span className={styles.error}>[ERROR]</span>
                  )}
                  {terminalLines[typeLineIdx].startsWith("[INFO]") && (
                    <span className={styles.info}>[INFO]</span>
                  )}
                  {terminalLines[typeLineIdx].startsWith("root@mds") && (
                    <span className={styles.prompt}>root@mds:~$</span>
                  )}
                  {terminalLines[typeLineIdx]
                    .replace(/^\[ERROR\]\s*/, "")
                    .replace(/^\[INFO\]\s*/, "")
                    .replace(/^root@mds:~\$\s*/, "")
                    .slice(0, typeCharIdx)}
                  <span className={styles.cursor}>_</span>
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <h1 className={styles.title}>PAGE NON TROUVÉE</h1>
          <p className={styles.message}>
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/accueil#top" className={styles.btnPrimary}>
              ← RETOUR À L'ACCUEIL
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}