"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MatrixRain from "@/components/MatrixRain";
import CyberpunkBtn from "@/components/CyberpunkBtn";
import WindowTransition from "@/components/WindowTransition";

export default function Home() {
  const router = useRouter(); // ✅ permet router.push("/accueil")

  const [showEnter, setShowEnter] = useState(false); // ✅ délai d’apparition du bouton
  const [winOpen, setWinOpen] = useState(false); // ✅ fenêtre ouverte ?
  const [trigger, setTrigger] = useState(0); // ✅ rejoue l’anim à chaque ouverture

  // ✅ affiche le bouton après 1s (comme avant)
  useEffect(() => {
    const t = window.setTimeout(() => setShowEnter(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  // ✅ clic sur le bouton => ouvre la fenêtre (pas de navigation directe)
  const openWindow = () => {
    setWinOpen(true);
    setTrigger((t) => t + 1);
  };

  return (
    <main
      className="fullscreen"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <MatrixRain
        fullscreen
        zIndex={0}
        message="MDSDIGITAL"
        foregroundHex="#50d2ff"
        backgroundHex="#07080c"
        speedRowsPerSec={18}
        cell={18}
        startDelayMs={120}
        columnSpawnMs={55}
        spawnAfterRows={5}
        messageHopMs={1200}
        messageBoost={0.08}
        baseAlpha={0.1}
        headAlpha={0.85}
        trailAlpha={0.55}
        trailDecay={0.93}
      />

      {/* ✅ Ton bouton (inchangé), il DISPARAÎT quand winOpen = true */}
      {!winOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            opacity: showEnter ? 1 : 0,
            pointerEvents: showEnter ? "auto" : "none",
            transition: "opacity 500ms ease",
          }}
        >
          <CyberpunkBtn label="ACCEDER" onClick={openWindow} />
        </div>
      )}

      {/* ✅ La fenêtre : ENTRER => /accueil, FERMER => rien */}
      <WindowTransition
        open={winOpen}
        trigger={trigger}
        durationMs={900}
        title="ACCESS: REQUEST"
        code="MDS://NODE-01"
        lines={[
          "[INIT] Booting secure tunnel…",
          "[OK]  Channel encrypted.",
          "[OK]  Identity verified.",
          "[READY] Click ENTRER to continue.",
        ]}
        actions={[
          { label: "ENTRER", href: "/accueil", variant: "primary" }, // ✅ navigation ICI
        ]}
        onResolve={(href) => {
          setWinOpen(false); // ✅ ferme l’overlay côté page
          if (href) router.push(href); // ✅ navigue seulement si href non null
        }}
      />
    </main>
  );
}
