"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WindowTransition.module.css";

type Phase = "idle" | "opening" | "open" | "closing";

type Action = {
  label: string;
  href?: string; // ✅ si présent => navigation après fermeture
  variant?: "primary" | "ghost";
};

type Props = {
  open: boolean;
  trigger: number;
  durationMs?: number;

  title?: string;
  code?: string;
  text?: string;

  lines?: string[]; // ✅ lignes terminal (optionnel)
  actions?: Action[];

  onResolve: (href: string | null) => void; // ✅ appelé après fermeture
};

export default function WindowTransition({
  open,
  trigger,
  durationMs = 900,
  title = "CONNECTING",
  code = "NET://MDS",
  text = "establishing secure channel…",
  lines = [],
  actions = [],
  onResolve,
}: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [glitchOn, setGlitchOn] = useState(false);

  // ✅ index ligne + index caractère (pour affichage)
  const [typeLineIdx, setTypeLineIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);

  const timers = useRef<number[]>([]);
  const nextHrefRef = useRef<string | null>(null);

  // ✅ refs "source de vérité" pour éviter les soucis de valeurs capturées
  const typeLineRef = useRef(0);
  const typeCharRef = useRef(0);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // ✅ petite astuce: éviter que l’effet se relance juste parce que l’array a une nouvelle référence
  const linesKey = lines.join("\n");

  // ===========================
  // OUVERTURE : phase + glitch + typing
  // ===========================
  useEffect(() => {
    if (!open) return;

    clearTimers();
    setPhase("opening");

    // ✅ reset typing à chaque ouverture
    typeLineRef.current = 0;
    typeCharRef.current = 0;
    setTypeLineIdx(0);
    setTypeCharIdx(0);

    // ✅ réglages vitesse terminal
    const firstLineDelay = 300; // tu m'as dit que ce délai est bon
    const charDelay = 18; // vitesse de frappe (plus grand = plus lent)
    const linePause = 420; // pause entre deux lignes

    // ✅ fonction qui tape lettre par lettre (et garde les lignes précédentes affichées)
    const tick = () => {
      if (!lines || lines.length === 0) return;

      const li = typeLineRef.current;
      const ci = typeCharRef.current;

      // fin : toutes les lignes tapées
      if (li >= lines.length) return;

      const current = lines[li];

      // tape la ligne courante
      if (ci < current.length) {
        typeCharRef.current = ci + 1;
        setTypeCharIdx(ci + 1);

        timers.current.push(window.setTimeout(tick, charDelay));
        return;
      }

      // ligne finie -> pause -> ligne suivante
      timers.current.push(
        window.setTimeout(() => {
          typeLineRef.current = li + 1;
          typeCharRef.current = 0;
          setTypeLineIdx(li + 1);
          setTypeCharIdx(0);

          timers.current.push(window.setTimeout(tick, 40));
        }, linePause)
      );
    };

    // ✅ démarre la frappe après un petit délai
    timers.current.push(window.setTimeout(tick, firstLineDelay));

    // ✅ glitch au début
    timers.current.push(
      window.setTimeout(() => {
        setGlitchOn(true);
        timers.current.push(window.setTimeout(() => setGlitchOn(false), 420));
      }, 120)
    );

    // ✅ fin ouverture -> état stable "open"
    timers.current.push(window.setTimeout(() => setPhase("open"), durationMs));

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, trigger, durationMs, linesKey]); // ✅ on dépend de linesKey (contenu), pas de la référence du tableau

  // ===========================
  // SI open repasse à false "brutalement"
  // ⚠️ On ne reset PAS si on est en closing, sinon ça casse l'anim CRT
  // ===========================
  useEffect(() => {
    if (!open && phase !== "closing") {
      clearTimers();
      setPhase("idle");
      setGlitchOn(false);
      nextHrefRef.current = null;

      // reset typing
      typeLineRef.current = 0;
      typeCharRef.current = 0;
      setTypeLineIdx(0);
      setTypeCharIdx(0);
    }
  }, [open, phase]);

  // ===========================
  // FERMETURE : garde l’anim puis renvoie href au parent
  // ===========================
  const requestClose = () => {
    if (phase === "closing" || phase === "idle") return;

    clearTimers(); // stop typing + stop tout
    setGlitchOn(false);
    setPhase("closing");

    timers.current.push(
      window.setTimeout(() => {
        const href = nextHrefRef.current; // "/accueil" ou null
        nextHrefRef.current = null;
        setPhase("idle");
        onResolve(href); // ✅ le parent navigue si href != null
      }, durationMs)
    );
  };

  // ✅ rester rendu pendant closing (important pour éviter "vide")
  const visible = open || phase === "closing";
  if (!visible) return null;

  return (
    <div
      className={[
        styles.overlay,
        phase === "opening" ? styles.opening : "",
        phase === "open" ? styles.open : "",
        phase === "closing" ? styles.closing : "",
      ].join(" ")}
      data-phase={phase}
      data-glitch={glitchOn ? "on" : "off"}
      aria-hidden="true"
    >
      <div className={styles.windowWrap}>
        <div className={styles.windowStack}>
          <div className={styles.window}>
            <div className={styles.scanlines} />
            <div className={styles.scanBeam} />

            <div className={styles.header}>
              <span className={styles.dot} />
              <span className={styles.title}>{title}</span>
              <span className={styles.code}>{code}</span>

              {/* ✅ FERMER = annuler (pas de navigation) */}
              <button
                type="button"
                onClick={() => {
                  nextHrefRef.current = null;
                  requestClose();
                }}
                className={styles.closeBtn}
              >
                FERMER
              </button>
            </div>

            <div className={styles.body}>
              <div className={styles.bar} />

              <div className={styles.text}>
                {lines.length > 0 ? (
                  <div className={styles.terminal}>
                    {/* ✅ lignes complètes déjà tapées */}
                    {lines.slice(0, typeLineIdx).map((l, i) => (
                      <div key={i} className={styles.line}>
                        {l}
                      </div>
                    ))}

                    {/* ✅ ligne en cours (lettre par lettre) */}
                    {/* ✅ ligne en cours (lettre par lettre) */}
                    {typeLineIdx < lines.length ? (
                      <div className={styles.line}>
                        {lines[typeLineIdx].slice(0, typeCharIdx)}
                        <span className={styles.cursor} aria-hidden="true" />
                      </div>
                    ) : (
                      // ✅ toutes les lignes sont tapées => curseur en dessous (clignote en attente)
                      <div className={styles.line}>
                        <span className={styles.prompt}>MDS@node:~$ </span>
                        <span className={styles.cursor} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ) : (
                  text
                )}
              </div>

              {/* ✅ actions (ex: ENTRER) */}
              {actions.length > 0 && (
                <div className={styles.actions}>
                  {actions.map((a, i) => (
                    <button
                      key={`${a.label}-${i}`}
                      type="button"
                      onClick={() => {
                        nextHrefRef.current = a.href ?? null; // ex "/accueil"
                        requestClose(); // ferme puis onResolve(href)
                      }}
                      className={
                        a.variant === "ghost"
                          ? styles.btnGhost
                          : styles.btnPrimary
                      }
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ glitch au-dessus */}
            <div className={styles.glitchLayer} />
          </div>
        </div>
      </div>
    </div>
  );
}
