import Image from "next/image";
import { site } from "@/config/site";
import { EnquiryLink } from "@/components/enquiry-link";
import { Arrow, SectionLabel } from "@/components/ui";
import {
  coachFollowUp,
  coachTeam,
  collectiveDetails,
  contextualComparisons,
  philosophyStages,
} from "@/data/editorial";
import "./editorial.css";

export function PhilosophySection() {
  return (
    <section
      className="section en-philosophy"
      id="filosofia"
      aria-labelledby="en-philosophy-title"
    >
      <div className="en-philosophy-intro">
        <SectionLabel number="02">
          <span lang="en">THE PHILOSOPHY</span>
        </SectionLabel>
        <h2 id="en-philosophy-title" lang="en">
          MORE THAN
          <br />
          A TRAINING
          <br />
          PLAN.
        </h2>
        <p className="en-lead">
          Completar un calendario es una parte. Entender qué necesitas y cómo
          respondes da sentido a la preparación.
        </p>
        <p>
          Partimos de tu objetivo, elegimos el trabajo y ajustamos su dosis.
          Después observamos tu respuesta para decidir el siguiente paso. El
          método tiene una lógica. Su aplicación tiene tu nombre.
        </p>
        <div className="en-philosophy-standard">
          <span className="micro" lang="en">
            THE STANDARD IS THE SAME.
          </span>
          <strong lang="en">THE APPROACH IS INDIVIDUAL.</strong>
          <p>El mismo rigor. Una preparación propia.</p>
        </div>
      </div>
      <div className="en-philosophy-path">
        <span className="micro en-path-caption">
          DEL OBJETIVO A LA SIGUIENTE DECISIÓN
        </span>
        <ol className="en-sequence">
          {philosophyStages.map((stage, index) => (
            <li key={stage.name}>
              <span className="en-stage-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{stage.name}</h3>
                <strong>{stage.question}</strong>
                <p>{stage.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="en-sequence-loop">
          <span aria-hidden="true">↺</span>
          Cada revisión vuelve a abrir el ciclo.
        </p>
      </div>
    </section>
  );
}

function ContextVisual({ type }: { type: string }) {
  if (type === "power") {
    return (
      <div className="en-context-visual en-power-example">
        <div>
          <span className="micro">SITUACIÓN A</span>
          <strong>
            200<span>W</span>
          </strong>
          <p>
            Esfuerzo percibido <b>3/10</b>
          </p>
          <span className="en-effort-track" aria-hidden="true">
            <span style={{ width: "30%" }} />
          </span>
        </div>
        <div>
          <span className="micro">SITUACIÓN B</span>
          <strong>
            200<span>W</span>
          </strong>
          <p>
            Esfuerzo percibido <b>6/10</b>
          </p>
          <span className="en-effort-track" aria-hidden="true">
            <span style={{ width: "60%" }} />
          </span>
        </div>
        <small>Ejemplo sintético · dos respuestas posibles</small>
      </div>
    );
  }
  if (type === "availability") {
    return (
      <div className="en-context-visual en-availability-example">
        <div>
          <span className="micro">SEMANA PREVISTA</span>
          <div className="en-time-windows" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((window) => (
              <span key={window} />
            ))}
          </div>
          <p>
            <strong>5</strong> ventanas de entrenamiento
          </p>
        </div>
        <div>
          <span className="micro">NUEVA DISPONIBILIDAD</span>
          <div
            className="en-time-windows en-time-windows-adjusted"
            aria-hidden="true"
          >
            {[1, 2, 3, 4, 5].map((window) => (
              <span
                key={window}
                className={window > 3 ? "en-unavailable" : ""}
              />
            ))}
          </div>
          <p>
            <strong>3</strong> ventanas: revisamos prioridades
          </p>
        </div>
        <small>Ejemplo de disponibilidad · sin prescripción automática</small>
      </div>
    );
  }
  return (
    <div className="en-context-visual en-fatigue-example">
      <span className="micro">SEÑALES QUE CONTRASTAMOS</span>
      <div className="en-context-signals">
        <span>
          <b>01</b> Sensaciones
        </span>
        <span>
          <b>02</b> Recuperación
        </span>
        <span>
          <b>03</b> Evolución
        </span>
      </div>
      <div className="en-context-interpretation">
        <span aria-hidden="true">↓</span>
        <strong>Una conversación antes de una conclusión.</strong>
      </div>
      <small>Interpretación contextual · sin diagnósticos automáticos</small>
    </div>
  );
}

export function BeyondNumbersSection() {
  return (
    <section
      className="section en-beyond"
      id="criterio"
      aria-labelledby="en-beyond-title"
    >
      <div className="en-editorial-heading">
        <div>
          <SectionLabel number="04">
            <span lang="en">BEYOND THE NUMBERS</span>
          </SectionLabel>
          <h2 id="en-beyond-title">
            UN DATO.
            <br />
            TODO UN CONTEXTO.
          </h2>
        </div>
        <p>
          Medir abre una pregunta. Interpretar permite tomar una decisión. Tu
          entrenamiento se construye con datos y con lo que está ocurriendo
          fuera de la gráfica.
        </p>
      </div>
      <div className="en-context-grid">
        {contextualComparisons.map((comparison) => (
          <article className="en-context-item" key={comparison.key}>
            <span className="micro en-context-kicker">
              {comparison.number} / {comparison.label}
            </span>
            <ContextVisual type={comparison.key} />
            <h3>{comparison.title}</h3>
            <p>{comparison.description}</p>
            <details className="en-context-detail">
              <summary>
                Explora el criterio <span aria-hidden="true">+</span>
              </summary>
              <p>{comparison.detail}</p>
            </details>
          </article>
        ))}
      </div>
      <div className="en-beyond-note">
        <span className="micro">
          EJEMPLOS ILUSTRATIVOS. NO SON RESULTADOS DE ATLETAS.
        </span>
        <p>La herramienta registra. El entrenador interpreta contigo.</p>
      </div>
    </section>
  );
}

export type CoachProfile = {
  name: string;
  photo: string;
  qualifications: readonly string[];
  experience: string;
  philosophy: string;
};

export function CoachSection({ coach }: { coach?: CoachProfile }) {
  const hasIdentity = Boolean(coach?.name && coach?.photo);
  return (
    <section
      className="section en-coach"
      id="entrenador"
      aria-labelledby="en-coach-title"
    >
      <div className="en-coach-intro">
        <SectionLabel number="07">
          <span lang="en">THE COACHING TEAM</span>
        </SectionLabel>
        <h2 id="en-coach-title">
          {coachTeam.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="en-lead">{coachTeam.lead}</p>
        <p>{coachTeam.introduction}</p>
        <p>{coachTeam.method}</p>
        <EnquiryLink
          interest="coaching"
          source="entrenador"
          className="text-link"
        >
          {coachTeam.contact} <Arrow diagonal />
        </EnquiryLink>
      </div>
      <div className="en-coach-follow-up">
        {hasIdentity && coach ? (
          <div className="en-coach-profile">
            <div className="en-coach-photo">
              <Image
                src={coach.photo}
                alt={coach.name}
                fill
                sizes="(max-width: 760px) 90vw, 40vw"
              />
            </div>
            <h3>{coach.name}</h3>
            {coach.experience && <p>{coach.experience}</p>}
            {coach.qualifications.length > 0 && (
              <ul>
                {coach.qualifications.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>
            )}
            {coach.philosophy && <p>{coach.philosophy}</p>}
          </div>
        ) : null}
        <div className="en-follow-up-heading">
          <span className="micro">ASÍ ESTAMOS PRESENTES</span>
          <p>Una relación que continúa después de la llamada inicial.</p>
        </div>
        <ol className="en-coach-timeline">
          {coachFollowUp.map((step) => (
            <li key={step.number}>
              <span className="en-coach-step" aria-hidden="true">
                {step.number}
              </span>
              <div>
                <span className="micro">{step.timing}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <a className="text-link en-coach-plans" href="#planes">
          Consulta las formas de acompañamiento <Arrow />
        </a>
      </div>
    </section>
  );
}

export function CommunityAtelierSection() {
  const groupUrl = site.community.instagramGroupUrl;
  return (
    <section
      className="en-collective"
      id="comunidad"
      aria-labelledby="en-collective-title"
    >
      <div className="en-collective-photo">
        <Image
          src={site.images.running}
          alt="Silueta de un corredor junto al mar al atardecer"
          fill
          sizes="(max-width: 900px) 100vw, 46vw"
        />
        <span className="en-collective-photo-label micro" lang="en">
          ICARO / ENDURANCE COLLECTIVE
        </span>
        <small>Fotografía editorial de resistencia</small>
      </div>
      <div className="en-collective-copy">
        <SectionLabel number="08">
          <span lang="en">ICARO COLLECTIVE</span>
        </SectionLabel>
        <h2 id="en-collective-title" lang="en">
          INDIVIDUAL
          <br />
          BY DESIGN.
          <br />
          <span>
            COLLECTIVE
            <br />
            BY NATURE.
          </span>
        </h2>
        <p className="en-lead">
          Objetivos individuales. Kilómetros compartidos.
        </p>
        <p>
          En ICARO cada preparación tiene su propio camino, pero el deporte
          también se construye compartiendo experiencias. Entrenamos
          presencialmente cada semana, organizando ritmos y distancias según los
          participantes y las características de cada sesión.
        </p>
        <dl className="en-collective-facts">
          {collectiveDetails.map((detail) => (
            <div key={detail.label}>
              <dt className="micro">{detail.label}</dt>
              <dd>{detail.text}</dd>
            </div>
          ))}
        </dl>
        <EnquiryLink
          interest="collective"
          source="comunidad"
          className="button accent"
        >
          Conoce el colectivo <Arrow diagonal />
        </EnquiryLink>
        <p className="en-collective-conditions">
          Consulta la organización y las condiciones de las sesiones
          presenciales. El colectivo complementa tu experiencia deportiva; el
          coaching individual tiene su propio seguimiento.
        </p>
        <div className="en-social-group">
          <span className="micro">SOCIAL ICARO / GRUPO GRATUITO</span>
          <p>
            Comparte experiencias con la comunidad en nuestro grupo de
            Instagram.
          </p>
          {groupUrl && (
            <a
              className="text-link"
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Únete a Social ICARO en Instagram (abre en una pestaña nueva)"
            >
              Únete a Social ICARO <Arrow diagonal />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
