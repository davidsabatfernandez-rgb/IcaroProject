import { Arrow, SectionLabel } from "@/components/ui";
import { TechnicalDecisions } from "@/components/technical-decisions";
import {
  technicalMethodCopy,
  technicalMethodSteps,
  technicalStrengths,
} from "@/data/technical-method";
import "./technical-method.css";

export function TechnicalMethodSection() {
  return (
    <section
      className="section technical-method"
      id="metodo"
      aria-labelledby="technical-method-title"
    >
      <div className="tm-heading" data-reveal>
        <div>
          <SectionLabel number="02">{technicalMethodCopy.label}</SectionLabel>
          <h2 id="technical-method-title">
            {technicalMethodCopy.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="tm-intro">
          <p>{technicalMethodCopy.intro}</p>
          <a className="text-link" href="#contacto">
            {technicalMethodCopy.action}
            <Arrow diagonal />
          </a>
        </div>
      </div>

      <ol className="tm-workflow" aria-label="Nuestro criterio de trabajo">
        {technicalMethodSteps.map((step, index) => (
          <li key={step.title}>
            <div>
              <span className="tm-workflow-number" aria-hidden="true">
                0{index + 1}
              </span>
              <Arrow />
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="tm-panel">
        <div className="tm-panel-heading">
          <div>
            <span className="micro">DEL DATO A LA DECISIÓN</span>
            <h3>{technicalMethodCopy.panelTitle}</h3>
          </div>
          <p>{technicalMethodCopy.panelIntro}</p>
        </div>
        <TechnicalDecisions />
      </div>

      <div className="tm-strengths-heading">
        <h3>Por qué entrenar con ICARO.</h3>
        <p>El criterio técnico y el seguimiento, unidos en tu preparación.</p>
      </div>
      <div className="tm-strengths">
        {technicalStrengths.map((strength) => (
          <article key={strength.title}>
            <span className="tm-strength-mark" aria-hidden="true">
              <Arrow diagonal />
            </span>
            <div>
              <h3>{strength.title}</h3>
              <p>{strength.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
