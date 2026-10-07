"use client";

import { useId, useState } from "react";
import { Arrow } from "@/components/ui";
import { technicalDecisions } from "@/data/technical-method";

export function TechnicalDecisions() {
  const [selected, setSelected] = useState(0);
  const contentId = useId();
  const decision = technicalDecisions[selected];

  return (
    <div className="tm-decisions">
      <div
        className="tm-topics"
        role="group"
        aria-label="Elige el criterio de entrenamiento"
      >
        {technicalDecisions.map((topic, index) => (
          <button
            className="tm-topic"
            key={topic.id}
            type="button"
            aria-pressed={index === selected}
            aria-controls={contentId}
            onClick={() => setSelected(index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {topic.label}
            <Arrow />
          </button>
        ))}
      </div>

      <div
        id={contentId}
        className="tm-decision-content"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="tm-signals" aria-label="Información que valoramos">
          {decision.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>

        <div className="tm-decision-grid">
          <div className="tm-decision-step">
            <span className="tm-step-label">01 / OBSERVAMOS</span>
            <h4>Qué nos dicen tus datos.</h4>
            <p>{decision.observation}</p>
          </div>
          <div className="tm-decision-step">
            <span className="tm-step-label">02 / DECIDIMOS</span>
            <h4>Qué ajusta tu entrenador.</h4>
            <p>{decision.decision}</p>
          </div>
          <div className="tm-decision-step tm-athlete-result">
            <span className="tm-step-label">03 / PARA TI</span>
            <h4>Qué significa al entrenar.</h4>
            <p>{decision.athlete}</p>
          </div>
        </div>
      </div>

      <details className="tm-technical-detail" key={decision.id}>
        <summary>
          <span>Un poco más de detalle técnico</span>
          <span className="tm-detail-plus" aria-hidden="true">
            +
          </span>
        </summary>
        <div>
          <h4>{decision.technicalTitle}</h4>
          <p>{decision.technicalExplanation}</p>
        </div>
      </details>
    </div>
  );
}
