"use client";
import { useId, useState } from "react";
import { plans } from "@/data/content";
import { Arrow } from "./ui";
import { EnquiryLink } from "./enquiry-link";
import "./pricing-conversion.css";

export function Pricing() {
  const [mode, setMode] = useState<"single" | "triathlon">("triathlon");
  const [singleSport, setSingleSport] = useState("Carrera");
  const disciplineId = useId();
  return (
    <div className="pricing-conversion">
      <div className="pricing-selector">
        <div
          className="segmented"
          role="group"
          aria-label="Modalidad de entrenamiento"
        >
          <button
            type="button"
            aria-pressed={mode === "single"}
            onClick={() => setMode("single")}
          >
            Una disciplina
          </button>
          <button
            type="button"
            aria-pressed={mode === "triathlon"}
            onClick={() => setMode("triathlon")}
          >
            Triatlón
          </button>
        </div>
        <p>
          {mode === "single"
            ? "Carrera, carrera por montaña, ciclismo o natación, con fuerza adaptada a tu objetivo."
            : "Natación, ciclismo, carrera y fuerza. Planificadas en conjunto."}
        </p>
      </div>
      {mode === "single" && (
        <div className="pricing-discipline">
          <label htmlFor={disciplineId}>
            ¿Qué disciplina quieres preparar?
          </label>
          <select
            id={disciplineId}
            value={singleSport}
            onChange={(event) => setSingleSport(event.target.value)}
          >
            {["Carrera", "Carrera por montaña", "Ciclismo", "Natación"].map(
              (sport) => (
                <option key={sport}>{sport}</option>
              ),
            )}
          </select>
        </div>
      )}
      <div className="pricing-included">
        <span className="micro">UNA BASE COMPLETA EN LOS TRES PLANES</span>
        <p>
          Llamada inicial, planificación individualizada en TrainingPeaks y
          revisión semanal. Nos envías tu disponibilidad el viernes; entre
          sábado y domingo recibes el plan, la explicación de la semana anterior
          y los objetivos de la siguiente.
        </p>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            className={`plan ${plan.id === "coaching" ? "recommended" : ""}`}
            key={plan.id}
            aria-labelledby={`plan-${plan.id}-title`}
          >
            <div className="plan-eyebrow">
              <span className="plan-index">{plan.number} /</span>
              {plan.id === "coaching" && (
                <span className="recommendation">PLAN DESTACADO</span>
              )}
            </div>
            <div className="plan-top">
              <span className="micro">{plan.label}</span>
              <h3 id={`plan-${plan.id}-title`}>{plan.name}</h3>
              <p className="plan-benefit">{plan.value}</p>
              <p>{plan.description}</p>
            </div>
            <div className="plan-contact">
              <strong>{plan.contact}</strong>
              <span className="call">{plan.call}</span>
            </div>
            <p className="plan-modality" aria-live="polite">
              {mode === "triathlon"
                ? "Plan de triatlón"
                : "Plan de una disciplina"}
            </p>
            <EnquiryLink
              className={`button ${plan.id === "coaching" ? "accent" : "outline"}`}
              interest="coaching"
              source="planes"
              plan={plan.name}
              sport={mode === "triathlon" ? "Triatlón" : singleSport}
              aria-label={`Consultar este plan: ${plan.name}`}
            >
              Consultar este plan
              <Arrow diagonal />
            </EnquiryLink>
            <details className="plan-details">
              <summary>
                Detalle del acompañamiento
                <span aria-hidden="true">+</span>
              </summary>
              <div className="plan-details-content">
                <p>{plan.detail}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="plan-lactate">
                  <span className="micro">TU PRUEBA DE LACTATO</span>
                  <strong>{plan.lactate.headline}</strong>
                  <p>{plan.lactate.detail}</p>
                </div>
              </div>
            </details>
          </article>
        ))}
      </div>
      <div className="plan-comparison">
        <div className="plan-comparison-intro">
          <h3>Elige cómo quieres trabajar con tu entrenador.</h3>
          <p>
            La preparación es personal en todos. Estas son las diferencias de
            comunicación, revisiones y evaluación.
          </p>
        </div>
        <div
          className="plan-comparison-scroll"
          role="region"
          aria-label="Comparación de comunicación, llamadas y pruebas entre planes"
          tabIndex={0}
        >
          <table>
            <caption className="visually-hidden">
              Comparación de Individual, Seguimiento y Rendimiento
            </caption>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Comunicación y análisis</th>
                <th scope="col">Llamadas</th>
                <th scope="col">Prueba de lactato</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <th scope="row">{plan.name}</th>
                  <td>{plan.comparison.communication}</td>
                  <td>{plan.comparison.calls}</td>
                  <td>{plan.comparison.lactate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="plan-comparison-hint">En móvil, desliza para comparar.</p>
      </div>
      <p className="prices-note plans-note">
        ¿No sabes qué nivel de seguimiento elegir? En la valoración inicial
        hablamos de tu objetivo y tu disponibilidad; te explicamos qué plan
        encaja y sus condiciones antes de empezar. Las pruebas de lactato son
        opcionales y no necesitas realizarlas para contratar un plan.
      </p>
    </div>
  );
}
