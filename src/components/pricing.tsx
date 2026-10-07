"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { plans } from "@/data/content";
import { Arrow } from "./ui";
export function Pricing() {
  const [mode, setMode] = useState<"single" | "triathlon">("triathlon");
  return (
    <>
      <div className="pricing-selector">
        <div
          className="segmented"
          role="group"
          aria-label="Modalidad de entrenamiento"
        >
          <button
            aria-pressed={mode === "single"}
            onClick={() => setMode("single")}
          >
            Una disciplina
          </button>
          <button
            aria-pressed={mode === "triathlon"}
            onClick={() => setMode("triathlon")}
          >
            Triatlón
          </button>
        </div>
        <p>
          {mode === "single"
            ? "Running, ciclismo o natación. Elige tu disciplina."
            : "Natación, ciclismo y carrera. Planificadas en conjunto."}
        </p>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            className={`plan ${plan.id === "coaching" ? "recommended" : ""}`}
            key={plan.id}
          >
            {plan.id === "coaching" && (
              <div className="recommendation">
                RECOMENDADO{" "}
                <span>
                  <Arrow diagonal />
                </span>
              </div>
            )}
            <div className="plan-top">
              <span className="micro">{plan.label}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <div className="price" aria-live="polite">
              <strong>
                {site.prices[plan.id][mode]}
                <span> €</span>
              </strong>
              <span>/ mes</span>
            </div>
            <a
              className={`button ${plan.id === "coaching" ? "accent" : "outline"}`}
              href={`#contacto`}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("icaro-plan", { detail: plan.name }),
                )
              }
            >
              Elegir {plan.name}
              <Arrow diagonal />
            </a>
            <p className="plan-common">
              Llamada inicial y plan semanal en TrainingPeaks incluidos.
            </p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="plan-contact">
              <strong>{plan.contact}</strong>
              <p>{plan.detail}</p>
              <span className="call">{plan.call}</span>
            </div>
            <div className="plan-lactate">
              <span className="micro">TU TEST DE LACTATO</span>
              {plan.id === "performance" ? (
                <>
                  <strong>
                    1 test incluido cada{" "}
                    {site.lactate.performanceIncludedMonths} meses
                  </strong>
                  <p>
                    Opción de test trimestral:{" "}
                    {site.lactate.performanceQuarterly} €.
                  </p>
                </>
              ) : (
                <>
                  <strong>
                    {site.lactate[plan.id]} € <span>/ test</span>
                  </strong>
                  <p>
                    {plan.id === "coaching"
                      ? "Promoción trimestral."
                      : "Tarifa para atletas de Individual."}
                  </p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="prices-note">
        Precios mensuales del entrenamiento provisionales. Tests de lactato
        opcionales: Performance incluye uno semestral; el resto se contrata a la
        tarifa indicada. Desplazamiento presupuestado antes de reservar.
        Condiciones de contratación pendientes de confirmación.
      </p>
    </>
  );
}
