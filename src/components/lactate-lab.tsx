"use client";

import { useId, useState } from "react";
import {
  lactateDisciplines,
  lactateInterpretations,
  type LabAssessmentId,
  type LabSample,
} from "@/data/lactate-lab";
import "./lactate-lab.css";

const number = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});
const graph = { width: 620, height: 280, inset: 24, ceiling: 10 };

export function LactateLab() {
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [assessmentId, setAssessmentId] = useState<LabAssessmentId>("b");
  const [showComparison, setShowComparison] = useState(true);
  const [sampleIndex, setSampleIndex] = useState(3);
  const id = useId();
  const discipline = lactateDisciplines[disciplineIndex];
  const assessment = discipline.assessment[assessmentId];
  const otherId = assessmentId === "a" ? "b" : "a";
  const otherAssessment = discipline.assessment[otherId];
  const selected = assessment.samples[sampleIndex];
  const first = assessment.samples[0].intensity;
  const last = assessment.samples[assessment.samples.length - 1].intensity;
  const zone =
    selected.intensity < assessment.lt1.intensity
      ? 0
      : selected.intensity <= assessment.lt2.intensity
        ? 1
        : 2;
  const interpretation = lactateInterpretations[zone];
  const sampleA = discipline.assessment.a.samples[sampleIndex];
  const sampleB = discipline.assessment.b.samples[sampleIndex];
  const lactateDifference = sampleB.lactate - sampleA.lactate;
  const hasHeartRate = selected.heartRate !== null;

  const x = (intensity: number) =>
    graph.inset +
    ((intensity - first) / (last - first)) * (graph.width - graph.inset * 2);
  const y = (lactate: number) =>
    14 + (1 - lactate / graph.ceiling) * (graph.height - 28);
  const path = (samples: readonly LabSample[]) =>
    samples
      .map(
        (sample, index) =>
          `${index === 0 ? "M" : "L"} ${x(sample.intensity)} ${y(sample.lactate)}`,
      )
      .join(" ");
  const lt1 = x(assessment.lt1.intensity);
  const lt2 = x(assessment.lt2.intensity);

  return (
    <div className="lactate-lab">
      <div className="ll-masthead">
        <div>
          <p className="ll-kicker">ICARO / PERFORMANCE LAB</p>
          <h3>Una curva. Más de una decisión.</h3>
        </div>
        <p className="ll-demo" id={`${id}-disclaimer`}>
          Ejemplo interactivo con <strong>datos sintéticos.</strong>
          <br />
          No son resultados de un atleta ni tus zonas de entrenamiento.
        </p>
      </div>

      <div className="ll-toolbar">
        <div
          className="ll-disciplines"
          role="group"
          aria-label="Disciplina del ejemplo de lactato"
        >
          {lactateDisciplines.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === disciplineIndex}
              aria-controls={`${id}-panel`}
              onClick={() => setDisciplineIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="ll-assessment-controls">
          <div
            className="ll-assessments"
            role="group"
            aria-label="Evaluación ilustrativa seleccionada"
          >
            {(["a", "b"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={item === assessmentId}
                aria-controls={`${id}-panel`}
                onClick={() => setAssessmentId(item)}
              >
                Evaluación {item.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="ll-compare"
            aria-pressed={showComparison}
            aria-controls={`${id}-panel`}
            onClick={() => setShowComparison(!showComparison)}
          >
            <span className="ll-compare-check" aria-hidden="true">
              {showComparison ? "✓" : "+"}
            </span>
            Comparar A / B
          </button>
        </div>
      </div>

      <div className="ll-workspace" id={`${id}-panel`}>
        <div className="ll-chart-side">
          <div className="ll-chart-topline">
            <p>
              Lactato sanguíneo <span>mmol/L</span>
            </p>
            <div className="ll-legend" aria-label="Series representadas">
              <span>
                <i className="ll-line-key" />
                {assessment.label}
              </span>
              {showComparison && (
                <span>
                  <i className="ll-line-key ll-line-key-other" />
                  {otherAssessment.label}
                </span>
              )}
            </div>
          </div>

          <figure
            className="ll-figure"
            aria-labelledby={`${id}-chart-caption`}
            aria-describedby={`${id}-disclaimer`}
          >
            <div className="ll-plot">
              <svg
                viewBox={`0 0 ${graph.width} ${graph.height}`}
                preserveAspectRatio="none"
                aria-hidden="true"
                className="ll-svg"
              >
                <rect
                  x="0"
                  y="0"
                  width={lt1}
                  height={graph.height}
                  className="ll-zone-low"
                />
                <rect
                  x={lt1}
                  y="0"
                  width={lt2 - lt1}
                  height={graph.height}
                  className="ll-zone-middle"
                />
                <rect
                  x={lt2}
                  y="0"
                  width={graph.width - lt2}
                  height={graph.height}
                  className="ll-zone-high"
                />
                {[0, 2, 4, 6, 8, 10].map((value) => (
                  <line
                    key={value}
                    x1="0"
                    x2={graph.width}
                    y1={y(value)}
                    y2={y(value)}
                    className="ll-gridline"
                  />
                ))}
                {[assessment.lt1, assessment.lt2].map((threshold, index) => (
                  <g key={index}>
                    <rect
                      x={x(threshold.range[0])}
                      y="0"
                      width={x(threshold.range[1]) - x(threshold.range[0])}
                      height={graph.height}
                      className="ll-threshold-window"
                    />
                    <line
                      x1={x(threshold.intensity)}
                      x2={x(threshold.intensity)}
                      y1="0"
                      y2={graph.height}
                      className="ll-threshold-line"
                    />
                  </g>
                ))}
                {showComparison && (
                  <path
                    d={path(otherAssessment.samples)}
                    className="ll-curve ll-curve-other"
                  />
                )}
                <path d={path(assessment.samples)} className="ll-curve" />
                <line
                  x1={x(selected.intensity)}
                  x2={x(selected.intensity)}
                  y1={y(selected.lactate)}
                  y2={y(0)}
                  className="ll-selected-line"
                />
              </svg>

              {assessment.samples.map((sample, index) => (
                <button
                  key={index}
                  type="button"
                  className="ll-plot-point"
                  style={{
                    left: `${(x(sample.intensity) / graph.width) * 100}%`,
                    top: `${(y(sample.lactate) / graph.height) * 100}%`,
                  }}
                  aria-pressed={index === sampleIndex}
                  aria-controls={`${id}-reading`}
                  aria-label={`Punto 0${index + 1} de la curva: ${discipline.formatIntensity(sample.intensity)}, lactato ${number.format(sample.lactate)} mmol/L`}
                  onClick={() => setSampleIndex(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}

              {[0, 2, 4, 6, 8, 10].map((value) => (
                <span
                  key={value}
                  className="ll-y-tick"
                  style={{ top: `${(y(value) / graph.height) * 100}%` }}
                  aria-hidden="true"
                >
                  {value}
                </span>
              ))}
              <span
                className="ll-threshold-tag"
                style={{ left: `${(lt1 / graph.width) * 100}%` }}
              >
                LT1
              </span>
              <span
                className="ll-threshold-tag"
                style={{ left: `${(lt2 / graph.width) * 100}%` }}
              >
                LT2
              </span>
              <div className="ll-x-ticks" aria-hidden="true">
                {assessment.samples.map((sample, index) => (
                  <span
                    key={index}
                    style={{
                      left: `${(x(sample.intensity) / graph.width) * 100}%`,
                    }}
                  >
                    {discipline.formatIntensity(sample.intensity).split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
            <figcaption className="ll-chart-caption" id={`${id}-chart-caption`}>
              <span>{discipline.axisLabel}</span>
              <span>LT1 / LT2: referencias estimadas de esta demo.</span>
            </figcaption>
          </figure>

          <div
            className="ll-zone-key"
            aria-label="Franjas orientativas de intensidad de la demo"
          >
            <span>
              <i />
              Por debajo de LT1
            </span>
            <span>
              <i />
              Entre LT1 y LT2
            </span>
            <span>
              <i />
              Por encima de LT2
            </span>
          </div>

          <div className="ll-samples-heading">
            <p id={`${id}-sample-instructions`}>
              Selecciona un escalón para interpretarlo.
            </p>
            <span>07 MUESTRAS / EJEMPLO</span>
          </div>
          <div
            className="ll-sample-buttons"
            role="group"
            aria-label="Seleccionar escalón del test ilustrativo"
            aria-describedby={`${id}-sample-instructions`}
          >
            {assessment.samples.map((sample, index) => (
              <button
                key={index}
                type="button"
                aria-pressed={index === sampleIndex}
                aria-controls={`${id}-reading`}
                onClick={() => setSampleIndex(index)}
              >
                <span className="ll-sr-only">Escalón </span>
                <span>0{index + 1}</span>
                <strong>{discipline.formatIntensity(sample.intensity)}</strong>
                <span className="ll-sr-only">
                  {`, lactato ${number.format(sample.lactate)} mmol/L${sample.heartRate === null ? "" : `, frecuencia cardiaca ${sample.heartRate} latidos por minuto`}`}
                </span>
              </button>
            ))}
          </div>
          <p className="ll-context">{discipline.context}</p>
        </div>

        <div className="ll-reading" id={`${id}-reading`}>
          <div className="ll-reading-heading">
            <p className="ll-kicker">LECTURA DEL ESCALÓN 0{sampleIndex + 1}</p>
            <span>{assessment.label}</span>
          </div>
          <div className="ll-main-reading">
            <span className="ll-measure-type">Observación simulada</span>
            <p className="ll-lactate-number">
              {number.format(selected.lactate)}
              <span>mmol/L</span>
            </p>
            <p>Lactato sanguíneo</p>
          </div>
          <dl className="ll-reading-metrics">
            <div>
              <dt>{discipline.intensityLabel}</dt>
              <dd>{discipline.formatIntensity(selected.intensity)}</dd>
            </div>
            <div>
              <dt>Frecuencia cardiaca</dt>
              <dd>
                {hasHeartRate ? (
                  <>
                    {selected.heartRate}
                    <span> lpm</span>
                  </>
                ) : (
                  <span className="ll-unmeasured">No registrada</span>
                )}
              </dd>
            </div>
          </dl>
          <div className="ll-reading-interpretation">
            <span className="ll-measure-type">Interpretación del ejemplo</span>
            <h4>{interpretation.label}</h4>
            <p>{interpretation.observation}</p>
            <span className="ll-measure-type ll-next-label">
              Posible decisión de entrenamiento
            </span>
            <p>{interpretation.decision}</p>
          </div>
        </div>
      </div>

      <p className="ll-sr-only" role="status" aria-atomic="true">
        {discipline.label}, {assessment.label}, escalón {sampleIndex + 1}.
        {discipline.intensityLabel}:{" "}
        {discipline.formatIntensity(selected.intensity)}. Lactato simulado:{" "}
        {number.format(selected.lactate)} mmol/L.
        {hasHeartRate
          ? `Frecuencia cardiaca simulada: ${selected.heartRate} latidos por minuto.`
          : "Frecuencia cardiaca no registrada."}
        {interpretation.label}.
      </p>

      <div
        className="ll-thresholds"
        aria-label="Referencias de intensidad estimadas del ejemplo"
      >
        <div className="ll-reference-intro">
          <span className="ll-kicker">ESTIMACIONES / NO PRESCRIPCIÓN</span>
          <h4>Referencias, no fronteras exactas.</h4>
          <p>
            Las bandas marcan un rango ilustrativo de lectura. Las zonas reales
            dependen del atleta, del protocolo y del criterio utilizado.
          </p>
        </div>
        {(["lt1", "lt2"] as const).map((thresholdId) => {
          const threshold = assessment[thresholdId];
          return (
            <div className="ll-reference" key={thresholdId}>
              <span>
                {thresholdId.toUpperCase()} · {assessment.label}
              </span>
              <strong>{discipline.formatIntensity(threshold.intensity)}</strong>
              <p>
                Rango ilustrativo:{" "}
                {discipline.formatIntensity(threshold.range[0])} —{" "}
                {discipline.formatIntensity(threshold.range[1])}
              </p>
            </div>
          );
        })}
      </div>

      {showComparison && (
        <div className="ll-longitudinal">
          <div>
            <span className="ll-kicker">A → B / MISMA INTENSIDAD</span>
            <h4>Observar el cambio. Comprobar el contexto.</h4>
            <p>
              En este escalón, B presenta{" "}
              {number.format(Math.abs(lactateDifference))} mmol/L{" "}
              {lactateDifference <= 0 ? "menos" : "más"} que A a{" "}
              {discipline.formatIntensity(selected.intensity)}. Una respuesta
              distinta puede sugerir cambios, pero no demuestra por sí sola una
              mejora.
            </p>
          </div>
          <p className="ll-comparison-context">
            Para comparar evaluaciones necesitamos condiciones comparables:
            protocolo, medición, alimentación, fatiga y entorno. El siguiente
            paso es contrastar la lectura con el rendimiento y la respuesta del
            atleta.
          </p>
        </div>
      )}

      <div className="ll-detail-row">
        <details className="ll-data-table" key={discipline.id}>
          <summary>
            Explorar los datos del ejemplo <span aria-hidden="true">+</span>
          </summary>
          <div
            className="ll-table-scroll"
            tabIndex={0}
            aria-label="Tabla de datos sintéticos; desplazamiento horizontal si es necesario"
          >
            <table>
              <caption>
                Valores inventados para explicar la interpretación de un test.{" "}
                {discipline.label}. Lactato en mmol/L
                {hasHeartRate
                  ? "; frecuencia cardiaca (FC) en lpm"
                  : "; frecuencia cardiaca no registrada"}
                .
              </caption>
              <thead>
                <tr>
                  <th scope="col">{discipline.intensityLabel}</th>
                  <th scope="col">Lactato A</th>
                  {hasHeartRate && <th scope="col">FC A</th>}
                  <th scope="col">Lactato B</th>
                  {hasHeartRate && <th scope="col">FC B</th>}
                </tr>
              </thead>
              <tbody>
                {discipline.assessment.a.samples.map((sample, index) => (
                  <tr
                    key={index}
                    className={
                      index === sampleIndex ? "ll-table-selected" : undefined
                    }
                  >
                    <th scope="row">
                      {discipline.formatIntensity(sample.intensity)}
                    </th>
                    <td>{number.format(sample.lactate)}</td>
                    {hasHeartRate && <td>{sample.heartRate}</td>}
                    <td>
                      {number.format(
                        discipline.assessment.b.samples[index].lactate,
                      )}
                    </td>
                    {hasHeartRate && (
                      <td>
                        {discipline.assessment.b.samples[index].heartRate}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className="ll-method-notes">
          <summary>
            Cómo interpretar esta demo <span aria-hidden="true">+</span>
          </summary>
          <div>
            <p>
              <strong>
                Observación, estimación e interpretación son cosas distintas.
              </strong>{" "}
              Los puntos representan muestras inventadas. Las líneas unen esos
              puntos; no predicen valores intermedios. LT1, LT2 y sus bandas se
              han asignado al ejemplo para mostrar una lectura posible.
            </p>
            <p>
              No calculamos los umbrales aplicando una concentración universal
              de 2 o 4 mmol/L. Su identificación depende del protocolo y del
              método de análisis; las referencias pueden requerir confirmación
              con otras evaluaciones.
            </p>
            <p>
              Las franjas de intensidad son orientativas. No describen zonas
              personales ni garantizan una adaptación. La duración de cada
              escalón, las pausas y el momento de tomar la muestra también
              influyen en la curva.
            </p>
            <p>
              La natación se incluye para explicar diferencias entre
              disciplinas. Esta demostración no implica que ICARO ofrezca tests
              de lactato en piscina: la oferta confirmada es el test en pista.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
