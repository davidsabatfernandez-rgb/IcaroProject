"use client";
import { useState } from "react";
export function Curve() {
  const [stage, setStage] = useState<"start" | "block">("start");
  const [focus, setFocus] = useState<"lt1" | "lt2" | "zones">("lt1");
  const descriptions = {
    lt1: "El primer umbral orienta hasta qué intensidad el esfuerzo es principalmente aeróbico y sostenible. Ayuda a ajustar el trabajo largo y observar la evolución de tu resistencia.",
    lt2: "El segundo umbral orienta una intensidad exigente, a partir de la cual sostener el esfuerzo resulta progresivamente más difícil. Es una referencia para sesiones específicas y competición.",
    zones:
      "Tus zonas deberían describirte a ti, no a una tabla. Cruzamos ritmo, potencia, frecuencia cardiaca y sensaciones con tests e historial. Las revisamos cuando tu respuesta cambia.",
  };
  return (
    <div className="curve-module">
      <div className="curve-toolbar">
        <span className="micro">TU PERFIL CAMBIA.</span>
        <div
          className="segmented"
          role="group"
          aria-label="Etapa del perfil conceptual"
        >
          <button
            aria-pressed={stage === "start"}
            onClick={() => setStage("start")}
          >
            Inicio de temporada
          </button>
          <button
            aria-pressed={stage === "block"}
            onClick={() => setStage("block")}
          >
            Después de un bloque
          </button>
        </div>
      </div>
      <div className="chart-wrap">
        <svg
          viewBox="0 0 800 390"
          className="curve-chart"
          role="img"
          aria-label={`Curva conceptual ${stage === "start" ? "al inicio de temporada" : "después de un bloque"}, sin datos reales. Marcadores de primer y segundo umbral.`}
        >
          <text x="23" y="24" className="axis-label">
            RESPUESTA ↑
          </text>
          {[90, 155, 220, 285].map((y) => (
            <line
              key={y}
              x1="55"
              x2="760"
              y1={y}
              y2={y}
              className="chart-grid"
            />
          ))}
          <rect x="55" y="50" width="225" height="270" className="zone-fill" />
          <rect
            x="280"
            y="50"
            width="225"
            height="270"
            className="zone-fill mid"
          />
          <path d="M55 45v275h710" className="chart-axis" />
          <line
            x1={stage === "start" ? 280 : 330}
            y1="52"
            x2={stage === "start" ? 280 : 330}
            y2="320"
            className={`threshold ${focus === "lt1" ? "selected" : ""}`}
          />
          <line
            x1={stage === "start" ? 505 : 550}
            y1="52"
            x2={stage === "start" ? 505 : 550}
            y2="320"
            className={`threshold ${focus === "lt2" ? "selected" : ""}`}
          />
          <path
            d="M55 302 C175 299 238 279 280 263 S445 214 505 172 S650 89 740 51"
            className="base-curve"
          />
          <path
            d="M55 306 C195 306 283 291 330 276 S484 237 550 196 S667 103 740 71"
            className={`evolution-curve ${stage === "block" ? "active" : ""}`}
          />
          <circle
            cx={stage === "start" ? 280 : 330}
            cy={stage === "start" ? 263 : 276}
            r="6"
            className="curve-point"
          />
          <circle
            cx={stage === "start" ? 505 : 550}
            cy={stage === "start" ? 172 : 196}
            r="6"
            className="curve-point"
          />
          <text
            x={stage === "start" ? 264 : 314}
            y="44"
            className="threshold-label"
          >
            LT1
          </text>
          <text
            x={stage === "start" ? 489 : 534}
            y="44"
            className="threshold-label"
          >
            LT2
          </text>
          <text x="125" y="350" className="axis-label">
            SOSTENIBLE
          </text>
          <text x="345" y="350" className="axis-label">
            EXIGENTE
          </text>
          <text x="595" y="350" className="axis-label">
            INTENSIDAD ALTA
          </text>
          <text x="650" y="381" className="axis-label">
            INTENSIDAD →
          </text>
        </svg>
      </div>
      <div className="chart-caption">
        <span>
          <i />{" "}
          {stage === "start" ? "Punto de partida" : "Evolución conceptual"}
        </span>
        <span>Representación ilustrativa · Sin datos reales</span>
      </div>
      <div
        className="threshold-tabs"
        role="group"
        aria-label="Conceptos del perfil"
      >
        {(
          [
            ["lt1", "01", "Primer umbral"],
            ["lt2", "02", "Segundo umbral"],
            ["zones", "03", "Tus zonas"],
          ] as const
        ).map(([id, n, label]) => (
          <button
            key={id}
            aria-pressed={focus === id}
            onClick={() => setFocus(id)}
          >
            <span>{n}</span>
            {label}
            <span>{focus === id ? "−" : "+"}</span>
          </button>
        ))}
      </div>
      <p className="threshold-description" aria-live="polite">
        {descriptions[focus]} No son cifras exactas ni inmutables.
      </p>
    </div>
  );
}
