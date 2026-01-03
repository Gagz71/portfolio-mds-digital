"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error500() {
  const [glitch, setGlitch] = useState(false);
  const [typeLineIdx, setTypeLineIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);

  const terminalLines = [
    "root@mds:~$ systemctl status server",
    "[CRITICAL] Internal server error detected",
    "[CRITICAL] Service temporarily unavailable",
    "[WARNING] System recovery in progress...",
    "[INFO] Please try again in a few moments",
    "root@mds:~$ ",
  ];

  useEffect(() => {
    // Glitch très fréquent pour erreur critique
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }, Math.random() * 1000 + 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Effet typewriter sur le terminal
    if (typeLineIdx >= terminalLines.length) return;

    const currentLine = terminalLines[typeLineIdx];
    
    if (typeCharIdx < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypeCharIdx(typeCharIdx + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
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
          {/* Code erreur */}
          <div className={styles.errorCode} data-text="500">
            500
          </div>

          {/* Terminal style */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} style={{ background: '#ff4444' }} />
              <span className={styles.terminalTitle}>CRITICAL ERROR</span>
              <span className={styles.terminalCode}>ERR://500</span>
            </div>
            <div className={styles.terminalBody}>
              {/* Lignes déjà complètes */}
              {terminalLines.slice(0, typeLineIdx).map((line, i) => (
                <p key={i} className={styles.terminalLine}>
                  {line.startsWith("[CRITICAL]") && (
                    <span className={styles.error}>[CRITICAL]</span>
                  )}
                  {line.startsWith("[WARNING]") && (
                    <span className={styles.warning}>[WARNING]</span>
                  )}
                  {line.startsWith("[INFO]") && (
                    <span className={styles.info}>[INFO]</span>
                  )}
                  {line.startsWith("root@mds") && (
                    <span className={styles.prompt}>root@mds:~$</span>
                  )}
                  {line
                    .replace(/^\[CRITICAL\]\s*/, "")
                    .replace(/^\[WARNING\]\s*/, "")
                    .replace(/^\[INFO\]\s*/, "")
                    .replace(/^root@mds:~\$\s*/, "")}
                </p>
              ))}

              {/* Ligne en cours de frappe */}
              {typeLineIdx < terminalLines.length && (
                <p className={styles.terminalLine}>
                  {terminalLines[typeLineIdx].startsWith("[CRITICAL]") && (
                    <span className={styles.error}>[CRITICAL]</span>
                  )}
                  {terminalLines[typeLineIdx].startsWith("[WARNING]") && (
                    <span className={styles.warning}>[WARNING]</span>
                  )}
                  {terminalLines[typeLineIdx].startsWith("[INFO]") && (
                    <span className={styles.info}>[INFO]</span>
                  )}
                  {terminalLines[typeLineIdx].startsWith("root@mds") && (
                    <span className={styles.prompt}>root@mds:~$</span>
                  )}
                  {terminalLines[typeLineIdx]
                    .replace(/^\[CRITICAL\]\s*/, "")
                    .replace(/^\[WARNING\]\s*/, "")
                    .replace(/^\[INFO\]\s*/, "")
                    .replace(/^root@mds:~\$\s*/, "")
                    .slice(0, typeCharIdx)}
                  <span className={styles.cursor}>_</span>
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <h1 className={styles.title}>ERREUR SERVEUR</h1>
          <p className={styles.message}>
            Une erreur interne s&apos;est produite. Nos systèmes travaillent à la résolution du problème.
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/accueil" className={styles.btnPrimary}>
              ← RETOUR À L&apos;ACCUEIL
            </Link>
            <Link href="/accueil#contact" className={styles.btnGhost}>
              SIGNALER L&apos;ERREUR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}