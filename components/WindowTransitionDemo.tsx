"use client";
// ✅ composant client

import { useState } from "react";
// ✅ state local

import WindowTransition from "./WindowTransition";
// ✅ import overlay

export default function WindowTransitionDemo() {
  const [open, setOpen] = useState(false);
  // ✅ open = affiche l'overlay ou non

  const [trigger, setTrigger] = useState(0);
  // ✅ trigger = compteur qui change à chaque clic OPEN (pour rejouer l'anim)

  const openAnim = () => {
    setOpen(true);            // ✅ montre l'overlay
    setTrigger((t) => t + 1); // ✅ déclenche une nouvelle ouverture
  };

  return (
    <>
      {/* ✅ bouton de test (open) */}
      <button
        type="button"
        onClick={openAnim}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 99999,
          padding: "10px 14px",
          background: "rgba(2,9,26,0.85)",
          color: "white",
          border: "1px solid rgba(0,255,210,0.35)",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        OPEN WINDOW
      </button>

      {/* ✅ overlay animé */}
      <WindowTransition
        open={open}                 // ✅ affichage contrôlé par le parent
        trigger={trigger}           // ✅ relance l'ouverture
        durationMs={1100}           // ✅ doit matcher le CSS (1100ms)
        onClosed={() => setOpen(false)} // ✅ quand fini de fermer => cacher
      />
    </>
  );
}
