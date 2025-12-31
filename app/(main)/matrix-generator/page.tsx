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
  foregroundHex: "#50d2ff",
  backgroundHex: "#07080c",

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
  // 🔥 pas de localStorage : un refresh remettra DEFAULT automatiquement
  const [cfg, setCfg] = useState<Config>(DEFAULT);

  // On nettoie le message (pour éviter caractères chelous)
  const cleanedMessage = useMemo(() => {
    return cfg.message
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, "")
      .slice(0, 30)
      .replaceAll(" ", ""); // vertical plus propre
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

      {/* UI */}
      <div style={{ position: "relative", zIndex: 1, padding: 16, maxWidth: 680 }}>
        <Panel title="Matrix Generator (live)">
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
              title="Couleur fond"
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
              title={`Délai start (ms): ${cfg.startDelayMs}`}
              min={0}
              max={1000}
              step={20}
              value={cfg.startDelayMs}
              onChange={(v) => setCfg((s) => ({ ...s, startDelayMs: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Colonnes progressives (ms): ${cfg.columnSpawnMs}`}
              min={15}
              max={150}
              step={5}
              value={cfg.columnSpawnMs}
              onChange={(v) => setCfg((s) => ({ ...s, columnSpawnMs: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Message hop (ms): ${cfg.messageHopMs}`}
              min={200}
              max={3000}
              step={100}
              value={cfg.messageHopMs}
              onChange={(v) => setCfg((s) => ({ ...s, messageHopMs: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Message boost: ${cfg.messageBoost.toFixed(2)} (0 = ultra caché)`}
              min={0}
              max={0.25}
              step={0.01}
              value={cfg.messageBoost}
              onChange={(v) => setCfg((s) => ({ ...s, messageBoost: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Base alpha: ${cfg.baseAlpha.toFixed(2)} (évite trous)`}
              min={0}
              max={0.22}
              step={0.01}
              value={cfg.baseAlpha}
              onChange={(v) => setCfg((s) => ({ ...s, baseAlpha: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Head alpha: ${cfg.headAlpha.toFixed(2)}`}
              min={0.2}
              max={1}
              step={0.01}
              value={cfg.headAlpha}
              onChange={(v) => setCfg((s) => ({ ...s, headAlpha: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Trail alpha: ${cfg.trailAlpha.toFixed(2)}`}
              min={0.1}
              max={0.9}
              step={0.01}
              value={cfg.trailAlpha}
              onChange={(v) => setCfg((s) => ({ ...s, trailAlpha: v }))}
            />
          </Row>

          <Row>
            <Slider
              title={`Trail decay: ${cfg.trailDecay.toFixed(2)} (plus proche de 1 = plus long)`}
              min={0.85}
              max={0.97}
              step={0.01}
              value={cfg.trailDecay}
              onChange={(v) => setCfg((s) => ({ ...s, trailDecay: v }))}
            />
          </Row>

          <Row>
            <button onClick={() => setCfg(DEFAULT)} style={btnGhost()}>
              Reset (DEFAULT)
            </button>
          </Row>

          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
            ✅ Un refresh remet tout par défaut (pas de sauvegarde).
          </div>
        </Panel>
      </div>
    </main>
  );
}

/* UI helpers */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
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
