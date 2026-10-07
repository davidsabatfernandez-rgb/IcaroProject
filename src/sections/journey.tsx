import { Arrow, LoopArrow, SectionLabel } from "@/components/ui";
import { TrainingCalendar } from "@/components/training-calendar";
import { journeyCopy, journeyStages } from "@/data/journey";
import { productCopy } from "@/data/product";
import { WeeklySchedule } from "./value";
import "./journey.css";

export function JourneySection() {
  return (
    <section
      className="section journey-section"
      id="como-funciona"
      aria-labelledby="journey-title"
    >
      <div className="journey-heading" data-reveal>
        <div>
          <SectionLabel number="02">{journeyCopy.label}</SectionLabel>
          <h2 id="journey-title">
            {journeyCopy.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="journey-intro">
          <p>{journeyCopy.description}</p>
          <a className="text-link" href="#contacto">
            {journeyCopy.action}
            <Arrow diagonal />
          </a>
        </div>
      </div>

      <div className="journey-phases" aria-hidden="true">
        <span>
          <b>01–04</b> Nos conocemos
        </span>
        <Arrow />
        <span>
          <b>05–07</b> Entrenamos y ajustamos
        </span>
        <Arrow />
        <span>
          <b>08</b> Tu objetivo
        </span>
      </div>
      <ol className="journey-stages" aria-label="Tu recorrido con ICARO">
        {journeyStages.map((stage) => (
          <li
            className={`journey-step ${stage.phase === "CICLO SEMANAL" ? "journey-recurring" : ""} ${stage.phase === "OBJETIVO" ? "journey-goal" : ""}`}
            key={stage.number}
            data-reveal
          >
            <div className="journey-step-top">
              <span className="journey-number" aria-hidden="true">
                {stage.number}
              </span>
              <span className="journey-phase">{stage.phase}</span>
              <Arrow />
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
            <strong>{stage.detail}</strong>
          </li>
        ))}
      </ol>
      <div className="journey-loop">
        <div aria-hidden="true">
          <span>05</span>
          <Arrow />
          <span>06</span>
          <Arrow />
          <span>07</span>
          <LoopArrow />
        </div>
        <p>{journeyCopy.cycleDescription}</p>
      </div>

      <div className="journey-calendar-preview" id="tu-semana">
        <div className="journey-calendar-copy" data-reveal>
          <span className="micro">DE TU PERFIL A LAS SESIONES</span>
          <h3>
            Tu próxima semana,
            <br />a un vistazo.
          </h3>
          <p>
            Duración, objetivo y estructura: sabes qué hacer y qué buscamos en
            cada sesión. Prueba el calendario: selecciona un entrenamiento y
            descubre qué hay detrás.
          </p>
          <div className="journey-platform">
            <span className="micro">PLANIFICACIÓN EN</span>
            <strong>TrainingPeaks</strong>
            <p>{productCopy.platformDescription}</p>
          </div>
          <p className="journey-watch">
            Las sesiones estructuradas admitidas llegan a tu reloj compatible.
          </p>
          <small>{productCopy.compatibility}</small>
          <a className="text-link" href="#contacto">
            Quiero mi propia planificación
            <Arrow diagonal />
          </a>
        </div>
        <TrainingCalendar />
      </div>
      <WeeklySchedule />
    </section>
  );
}
