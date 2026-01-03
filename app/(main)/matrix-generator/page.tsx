"use client";

import { useMemo, useState } from "react";
import MatrixRain from "@/components/MatrixRain";

type Config = {
  message: string;
  foregroundHex: string;
  backgroundHex: string;

  speedRowsPerSec: number;
  cell: number;

  startDelayMs: number;
  columnSpawnMs: number;
  messageHopMs: number;

  messageBoost: number;

  baseAlpha: number;
  headAlpha: number;
  trailAlpha: number;
  trailDecay: number;
};

const DEFAULT: Config = {
  message: "MDSDIGITAL",
  foregroundHex: "#0F0", // Vert Matrix
  backgroundHex: "#000000", // Fond noir

  speedRowsPerSec: 18,
  cell: 18,

  startDelayMs: 120,
  columnSpawnMs: 55,
  messageHopMs: 1200,

  messageBoost: 0.08,

  baseAlpha: 0.10,
  headAlpha: 0.85,
  trailAlpha: 0.55,
  trailDecay: 0.93,
};

export default function MatrixGeneratorPage() {
  const [cfg, setCfg] = useState<Config>(DEFAULT);
  const [isOpen, setIsOpen] = useState(true);

  const cleanedMessage = useMemo(() => {
    return cfg.message
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, "")
      .slice(0, 30)
      .replaceAll(" ", "");
  }, [cfg.message]);

  return (
    <main style={{ minHeight: "100vh", position: "relative", background: cfg.backgroundHex, color: "white" }}>
      {/* Aperçu en plein écran derrière */}
      <MatrixRain
        fullscreen
        zIndex={0}
        message={cleanedMessage}
        foregroundHex={cfg.foregroundHex}
        backgroundHex={cfg.backgroundHex}
        speedRowsPerSec={cfg.speedRowsPerSec}
        cell={cfg.cell}
        startDelayMs={cfg.startDelayMs}
        columnSpawnMs={cfg.columnSpawnMs}
        messageHopMs={cfg.messageHopMs}
        messageBoost={cfg.messageBoost}
        baseAlpha={cfg.baseAlpha}
        headAlpha={cfg.headAlpha}
        trailAlpha={cfg.trailAlpha}
        trailDecay={cfg.trailDecay}
      />

      {/* BOUTON TOGGLE - RESPONSIVE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="matrix-toggle-btn"
        style={{
          position: "fixed",
          top: 120,
          zIndex: 3,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(0,255,0,0.5)",
          background: "rgba(0,0,0,0.9)",
          color: "#0F0",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(0,255,0,0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {isOpen ? "❌" : "⚙️"}
      </button>

      {/* UI - Panneau RESPONSIVE */}
      <div 
        className="matrix-panel"
        style={{ 
          position: "fixed",
          top: 100,
          bottom: 0,
          zIndex: 2, 
          padding: 16,
          transition: "left 0.3s ease, transform 0.3s ease",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Panel title="Générateur Matrix" subtitle="Amusez-vous à configurer la Matrice">
          <Row>
            <label style={label()}>
              Texte (max 30)
              <input
                value={cfg.message}
                onChange={(e) => setCfg((s) => ({ ...s, message: e.target.value }))}
                style={input()}
              />
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                Nettoyé : <span style={{ opacity: 0.95 }}>{cleanedMessage || "(vide)"}</span>
              </div>
            </label>
          </Row>

          <Row>
            <ColorPick
              title="Couleur visible"
              value={cfg.foregroundHex}
              onChange={(v) => setCfg((s) => ({ ...s, foregroundHex: v }))}
            />
            <ColorPick
              title="Couleur de fond"
              value={cfg.backgroundHex}
              onChange={(v) => setCfg((s) => ({ ...s, backgroundHex: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Vitesse (rows/s): ${cfg.speedRowsPerSec}`}
              min={6}
              max={40}
              step={1}
              value={cfg.speedRowsPerSec}
              onChange={(v) => setCfg((s) => ({ ...s, speedRowsPerSec: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Densité (cell): ${cfg.cell}`}
              min={12}
              max={28}
              step={1}
              value={cfg.cell}
              onChange={(v) => setCfg((s) => ({ ...s, cell: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Visibilité du texte: ${cfg.messageBoost.toFixed(2)} (0 = ultra caché)`}
              min={0}
              max={0.25}
              step={0.01}
              value={cfg.messageBoost}
              onChange={(v) => setCfg((s) => ({ ...s, messageBoost: v }))}
            />
          </Row>

          <Row>
            <button onClick={() => setCfg(DEFAULT)} style={btnGhost()}>
              Réinitialiser
            </button>
          </Row>

        </Panel>
      </div>

      {/* CSS RESPONSIVE */}
      <style jsx>{`
        /* Desktop */
        .matrix-toggle-btn {
          left: ${isOpen ? '700px' : '20px'};
        }

        .matrix-panel {
          left: ${isOpen ? '0' : '-700px'};
          width: 680px;
          max-width: 680px;
        }

        /* Tablette */
        @media (max-width: 1024px) {
          .matrix-toggle-btn {
            left: ${isOpen ? 'calc(100vw - 64px)' : '20px'} !important;
          }

          .matrix-panel {
            left: ${isOpen ? '0' : '-100vw'} !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .matrix-toggle-btn {
            top: 80px !important;
            left: ${isOpen ? 'calc(100vw - 64px)' : '10px'} !important;
          }

          .matrix-panel {
            top: 70px !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </main>
  );
}

/* UI helpers */
function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(0,0,0,.35)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontSize: 14, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 800 }}>
        {title}
        <p>{subtitle}</p>
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{children}</div>;
}

function ColorPick({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label style={{ ...label(), minWidth: 260 }}>
      {title}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <span style={{ opacity: 0.85 }}>{value}</span>
      </div>
    </label>
  );
}

function Slider(props: {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label style={{ ...label(), width: "100%" }}>
      {props.title}
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 6 }}
      />
    </label>
  );
}

function label(): React.CSSProperties {
  return {
    display: "block",
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(255,255,255,.06)",
    fontSize: 12,
    letterSpacing: ".06em",
  };
}

function input(): React.CSSProperties {
  return {
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(0,0,0,.20)",
    color: "white",
    outline: "none",
  };
}

function btnGhost(): React.CSSProperties {
  return {
    background: "transparent",
    border: "1px solid rgba(255,255,255,.18)",
    color: "rgba(235,245,255,.82)",
    padding: "10px 12px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
  };
}