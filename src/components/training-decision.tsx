import { SectionLabel } from "@/components/ui";
import type { TrainingDecisionCase } from "@/data/training-decision";
import "./training-decision.css";

/** No public placeholder and no simulated athlete outcome when data is absent. */
export function TrainingDecision({
  trainingCase,
}: {
  trainingCase: TrainingDecisionCase | null;
}) {
  if (
    !trainingCase ||
    !trainingCase.publication.authorized ||
    !trainingCase.publication.anonymized ||
    !trainingCase.publication.sourceChecked ||
    !trainingCase.publication.reviewedAt ||
    trainingCase.observations.length === 0
  ) {
    return null;
  }

  const stages = [
    { title: "Situación inicial", text: trainingCase.situation },
    { title: "Hipótesis de trabajo", text: trainingCase.hypothesis },
    { title: "Decisión de entrenamiento", text: trainingCase.decision },
    { title: "Adaptación buscada", text: trainingCase.adaptation },
  ];
  const outcome = trainingCase.verifiedOutcome;

  return (
    <section
      className="section training-decision"
      id="decision-de-entrenamiento"
      aria-labelledby="training-decision-title"
    >
      <div className="section-heading">
        <div>
          <SectionLabel number="04.1">
            UNA DECISIÓN DE ENTRENAMIENTO / {trainingCase.discipline}
          </SectionLabel>
          <h2 id="training-decision-title">{trainingCase.title}</h2>
        </div>
        <p className="heading-copy">
          Un análisis individual: lo observado, el criterio aplicado y la
          decisión tomada. Caso anonimizado, publicado con autorización.
        </p>
      </div>
      <dl className="training-decision-observations">
        {trainingCase.observations.map((observation) => (
          <div key={observation.label}>
            <dt>{observation.label}</dt>
            <dd>{observation.value}</dd>
            {observation.context && (
              <dd className="training-decision-context">
                {observation.context}
              </dd>
            )}
          </div>
        ))}
      </dl>
      <ol className="training-decision-stages">
        {stages.map((stage, index) => (
          <li key={stage.title}>
            <span className="micro" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
      {outcome?.sourceChecked && outcome.measuredAt && (
        <div className="training-decision-outcome">
          <span className="micro">
            RESULTADO OBSERVADO / {outcome.measuredAt}
          </span>
          <p>{outcome.description}</p>
        </div>
      )}
    </section>
  );
}
