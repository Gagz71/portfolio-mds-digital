"use client"; // ✅ composant client (canvas + window + requestAnimationFrame)

import { useEffect, useMemo, useRef } from "react"; // ✅ hooks React

type MatrixRainProps = {
  className?: string; // classe CSS optionnelle
  message?: string; // ex: "MDSDIGITAL"  // Message caché (vertical, dans une colonne)

  // Couleurs
  foregroundHex?: string; // couleur visible (digits + message)
  backgroundHex?: string; // couleur du fond

  // Visuel
  cell?: number; // taille des “cases” (densité)
  baseAlpha?: number; // alpha minimum partout (évite trous)
  headAlpha?: number; // alpha de la tête (très lumineuse)
  trailAlpha?: number; // alpha ajouté par l’intensité (traînée)
  trailDecay?: number; // 0..1 (plus proche de 1 = traînée plus longue)

  // Animation
  speedRowsPerSec?: number; // vitesse en lignes/seconde
  startDelayMs?: number; // délai avant démarrage
  columnSpawnMs?: number; // colonnes activées 1 par 1 (espacement)
  spawnAfterRows?: number; // ex: 10 => la colonne suivante démarre quand la précédente a atteint la ligne 10
  messageHopMs?: number; // le message change de colonne toutes X ms
  messageBoost?: number; // micro boost (même couleur) pour “deviner” le message

  // Placement
  fullscreen?: boolean; // canvas plein écran
  zIndex?: number; // z-index du canvas en fullscreen
}; // fin type props

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim(); // retire "#"
  const isShort = clean.length === 3; // format court "#0af" ?
  const full = isShort
    ? clean
        .split("")
        .map((c) => c + c)
        .join("") // "#0af" -> "00aaff"
    : clean.padEnd(6, "0").slice(0, 6); // sécurité (6 chars)
  const r = parseInt(full.slice(0, 2), 16); // RR
  const g = parseInt(full.slice(2, 4), 16); // GG
  const b = parseInt(full.slice(4, 6), 16); // BB
  return [r, g, b]; // retourne [R,G,B]
} // fin hexToRgb

export default function MatrixRain({
  // valeur par défaut du composant
  className,
  message = "MDSDIGITAL",
  foregroundHex = "#50d2ff", // bleu matrix
  backgroundHex = "#07080c", // fond sombre
  cell = 18, // densité
  baseAlpha = 0.1, // alpha minimum (évite trous)
  headAlpha = 0.85, // tête brillante
  trailAlpha = 0.55, // intensité->alpha
  trailDecay = 0.92, // longueur de traînée
  speedRowsPerSec = 22, // vitesse chute
  startDelayMs = 120, // délai start
  columnSpawnMs = 50, // “espacement” colonne par colonne au début
  spawnAfterRows = 5,
  messageHopMs = 1200, // changement colonne message
  messageBoost = 0.0, // 0 = ultra caché
  fullscreen = true, // plein écran
  zIndex = -1, // derrière ton UI
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // ref canvas
  const rafRef = useRef<number | null>(null); // id requestAnimationFrame
  const startedRef = useRef(false); // éviter double start

  const fgRgb = useMemo(() => hexToRgb(foregroundHex), [foregroundHex]); // calc RGB du texte
  const bgRgb = useMemo(() => hexToRgb(backgroundHex), [backgroundHex]); // calc RGB du fond

  useEffect(() => {
    const canvas = canvasRef.current; // récup canvas
    if (!canvas) return; // si pas encore monté -> stop

    const ctx = canvas.getContext("2d"); // contexte 2D
    if (!ctx) return; // si pas dispo -> stop

    let dpr = 1; // device pixel ratio
    let width = 0; // largeur en px CSS
    let height = 0; // hauteur en px CSS

    let cols = 0; // nb colonnes
    let rows = 0; // nb lignes

    let grid: string[][] = []; // grid[col][row] = char affiché
    let inten: number[][] = []; // inten[col][row] = 0..1 (traînée)

    let drop: number[] = []; // drop[col] = position float en “rows”
    let activeCols = 0; // nb colonnes actives (au début augmente 1 par 1)

    let order: number[] = []; // ordre aléatoire des colonnes (pour la 1ère apparition)
    let msgActiveIdx = 0; // index du message dans la liste des colonnes actives

    let firstFallDone: boolean[] = []; // ✅ NEW: true si la colonne a déjà fait sa 1ère chute top->bottom

    const msg = (message || "") // texte brut
      .toUpperCase() // uppercase
      .replace(/[^A-Z0-9]/g, "") // garde lettres/chiffres
      .slice(0, 30) // limite longueur
      .split(""); // tableau de chars

    let msgCol = 0; // colonne actuelle du message
    let msgStartRow = 0; // ligne de départ du message
    let lastMsgHop = 0; // dernier “hop” du message (timestamp)

    let lastT = 0; // timestamp frame précédente
    let startTimer: number | null = null; // timer de départ

    const [fr, fg, fb] = fgRgb; // RGB foreground
    const [br, bg, bb] = bgRgb; // RGB background

    function randDigit() {
      return String(Math.floor(Math.random() * 10)); // "0".."9"
    } // fin randDigit

    function shuffledOrder(n: number) {
      const arr = Array.from({ length: n }, (_, i) => i);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function resize() {
      if (!canvas) return; // check null
      if (!ctx) return; // check null
      dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1)); // dpr retina

      width = fullscreen
        ? window.innerWidth
        : canvas?.clientWidth || window.innerWidth; // largeur
      height = fullscreen
        ? window.innerHeight
        : canvas?.clientHeight || window.innerHeight; // hauteur

      canvas.width = Math.floor(width * dpr); // résolution réelle
      canvas.height = Math.floor(height * dpr); // résolution réelle

      canvas.style.width = `${width}px`; // taille CSS
      canvas.style.height = `${height}px`; // taille CSS

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // dessiner en px CSS

      cols = Math.max(1, Math.floor(width / cell)); // calc colonnes
      rows = Math.max(1, Math.floor(height / cell)); // calc lignes

      grid = Array.from(
        { length: cols },
        () =>
          // init grid
          Array.from({ length: rows }, () => randDigit()) // remplit de digits
      );

      inten = Array.from(
        { length: cols },
        () =>
          // init intensité
          Array.from({ length: rows }, () => 0) // tout à 0 au départ
      );

      // ✅ AU DÉBUT : toutes les colonnes commencent en haut (0)
      //   drop = Array.from({ length: cols }, () => 0);

      //   // ✅ AU DÉBUT : aucune colonne n’a encore fait sa 1ère chute
      //   firstFallDone = Array.from({ length: cols }, () => false);

      //   activeCols = 0; // au début : 0 colonne active (pour apparition progressive)

      //   msgCol = Math.floor(cols * 0.5); // message au milieu
      //   msgStartRow = Math.max(2, Math.floor(rows * 0.18)); // start message
      //   lastMsgHop = performance.now(); // init hop timer

      drop = Array.from({ length: cols }, () => 0);
      firstFallDone = Array.from({ length: cols }, () => false); // si tu l'as déjà ajouté auparavant
      order = shuffledOrder(cols); // ✅ ordre random pour la 1ère apparition

      activeCols = 0; // 0 actives au début
      msgActiveIdx = 0; // message repart au début
      msgCol = order[0] ?? 0; // au cas où
    } // fin resize

    function injectMessage() {
      if (!msg.length) return; // si pas de message -> stop

      for (let i = 0; i < msg.length; i++) {
        const r = msgStartRow + i; // ligne de la ième lettre

        if (r >= 0 && r < rows && msgCol >= 0 && msgCol < cols) {
          grid[msgCol][r] = msg[i]; // remplace digit par lettre

          // micro boost (même couleur) pour le “deviner”
          if (messageBoost > 0) {
            inten[msgCol][r] = Math.max(
              inten[msgCol][r],
              Math.min(1, 0.25 * messageBoost)
            );
          }
        }
      }
    } // fin injectMessage

    function draw() {
      if (!ctx) return; // check null
      ctx.fillStyle = `rgb(${br},${bg},${bb})`; // fond
      ctx.fillRect(0, 0, width, height); // rempli fond

      const fontSize = Math.max(10, Math.floor(cell * 0.8)); // taille police
      ctx.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`; // font mono
      ctx.textAlign = "center"; // centre horizontal
      ctx.textBaseline = "middle"; // centre vertical

      for (let c = 0; c < cols; c++) {
        const x = c * cell + cell / 2; // centre X de la colonne

        for (let r = 0; r < rows; r++) {
          const y = r * cell + cell / 2; // centre Y de la ligne

          const a = clamp01(baseAlpha + inten[c][r] * trailAlpha); // alpha final
          const isHead = inten[c][r] > 0.92; // tête si intensité élevée
          const alpha = isHead ? Math.max(a, headAlpha) : a; // tête plus lumineuse

          ctx.fillStyle = `rgba(${fr},${fg},${fb},${alpha})`; // même couleur digits+lettres
          ctx.shadowBlur = 0; // pas de glow (évite chevauchements)
          ctx.fillText(grid[c][r], x, y); // dessine le char
        }
      }

      ctx.save(); // sauvegarde état
      ctx.globalAlpha = 0.06; // opacité scanlines
      ctx.fillStyle = "rgba(255,255,255,0.10)"; // couleur scanlines
      for (let y = 0; y < height; y += 4) ctx.fillRect(0, y, width, 1); // 1 ligne sur 4px
      ctx.restore(); // restaure état
    } // fin draw

    function step(t: number) {
      if (!startedRef.current) return; // si pas démarré -> stop

      if (!lastT) lastT = t; // init lastT au 1er frame
      const dt = Math.min(0.05, (t - lastT) / 1000); // delta en secondes (cap)
      lastT = t; // update lastT

      // 1) decay intensité -> traînée qui s’efface progressivement
      const decay = Math.pow(trailDecay, dt * 60); // stable vs FPS
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          inten[c][r] *= decay; // baisse intensité
        }
      }

      // 2) message saute de colonne toutes les messageHopMs
      if (t - lastMsgHop > messageHopMs) {
        lastMsgHop = t; // update timer

        if (activeCols > 0) {
          msgActiveIdx = (msgActiveIdx + 1) % activeCols;
          msgCol = order[msgActiveIdx];

          msgStartRow = Math.max(
            2,
            Math.floor(rows * (0.12 + Math.random() * 0.25))
          ); // ligne start aléatoire
        }
      }

      // 3) update pluie (colonnes actives)
      for (let i = 0; i < activeCols; i++) {
        const c = order[i]; // ✅ la vraie colonne à animer (random)

        drop[c] += speedRowsPerSec * dt;

        if (drop[c] >= rows) {
          if (!firstFallDone[c]) firstFallDone[c] = true;
          drop[c] = Math.random() * rows; // après le début => redémarrage aléatoire
        }

        const head = Math.floor(drop[c]);
        if (head < 0) continue; // si la tête n'est pas encore entrée à l'écran

        grid[c][head] = randDigit();
        const back1 = (head - 1 + rows) % rows;
        const back2 = (head - 2 + rows) % rows;
        if (Math.random() > 0.35) grid[c][back1] = randDigit();
        if (Math.random() > 0.7) grid[c][back2] = randDigit();

        inten[c][head] = 1.0;
        inten[c][back1] = Math.max(inten[c][back1], 0.65);
        inten[c][back2] = Math.max(inten[c][back2], 0.35);
      }

      // ✅ Spawn par progression : active la colonne suivante quand la précédente a atteint spawnAfterRows
      if (activeCols > 0 && activeCols < cols) {
        const prevCol = order[activeCols - 1]; // la dernière colonne activée
        if (drop[prevCol] >= spawnAfterRows) {
          const newCol = order[activeCols]; // prochaine colonne random

          drop[newCol] = -3; // démarre en haut
          firstFallDone[newCol] = false; // 1ère chute complète

          activeCols += 1; // on active une colonne de plus
        }
      }

      injectMessage(); // réinjecte le message après update (pour éviter d’être écrasé)
      draw(); // dessine la frame

      rafRef.current = requestAnimationFrame(step); // prochaine frame
    } // fin step

    function start() {
      if (startedRef.current) return;
      startedRef.current = true;

      activeCols = Math.min(1, cols);

      // ✅ on active d'abord la colonne order[0]
      const c0 = order[0] ?? 0;
      drop[c0] = -3; // démarre au-dessus du haut
      firstFallDone[c0] = false; // 1ère chute = top->bottom

      msgActiveIdx = 0;
      msgCol = c0;

      rafRef.current = requestAnimationFrame(step);
    }

    function stop() {
      startedRef.current = false; // stop animation

      if (startTimer) clearTimeout(startTimer); // stop délai start

      startTimer = null; // cleanup

      if (rafRef.current) cancelAnimationFrame(rafRef.current); // stop RAF
      rafRef.current = null; // cleanup
    } // fin stop

    resize(); // init tailles + arrays
    window.addEventListener("resize", resize); // resize dynamique

    // dessine le fond immédiatement (avant démarrage)
    ctx.fillStyle = `rgb(${br},${bg},${bb})`; // fond
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight); // fill

    startTimer = window.setTimeout(() => start(), startDelayMs); // start après délai

    return () => {
      stop(); // stop animation
      window.removeEventListener("resize", resize); // cleanup listener
    }; // cleanup useEffect
  }, [
    foregroundHex,
    backgroundHex,
    cell,
    baseAlpha,
    headAlpha,
    trailAlpha,
    trailDecay,
    speedRowsPerSec,
    startDelayMs,
    columnSpawnMs,
    messageHopMs,
    message,
    messageBoost,
    fullscreen,
    fgRgb,
    bgRgb,
    spawnAfterRows,
  ]); // fin useEffect deps

  return (
    <canvas
      ref={canvasRef} // connect ref
      className={className} // classe optionnelle
      style={
        fullscreen
          ? {
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              display: "block",
              zIndex,
            } // plein écran
          : { width: "100%", height: "100%", display: "block" } // taille conteneur
      }
    />
  ); // fin return JSX
} // fin composant

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v)); // clamp 0..1
} // fin clamp01