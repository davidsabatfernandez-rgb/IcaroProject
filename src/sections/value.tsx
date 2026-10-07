import { Arrow } from "@/components/ui";
import { athleteNeeds, valueCopy, weeklySchedule } from "@/data/value";

export function ValueSection() {
  return (
    <section
      className="section value-section"
      id="contigo"
      aria-labelledby="value-title"
    >
      <div className="value-heading" data-reveal>
        <span className="micro">{valueCopy.label}</span>
        <h2 id="value-title">
          {valueCopy.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{valueCopy.intro}</p>
        <a className="text-link" href="#contacto">
          {valueCopy.action}
          <Arrow diagonal />
        </a>
      </div>
      <div className="athlete-needs">
        {athleteNeeds.map((need, index) => (
          <article key={need.title} data-reveal>
            <span className="need-index" aria-hidden="true">
              0{index + 1}
            </span>
            <div>
              <h3>{need.title}</h3>
              <p className="need-concern">{need.concern}</p>
              <p>{need.answer}</p>
              <strong>{need.outcome}</strong>
            </div>
          </article>
        ))}
      </div>
      <p className="value-closeness" data-reveal>
        {valueCopy.closeness}
      </p>
    </section>
  );
}

export function WeeklySchedule() {
  return (
    <div className="shared-schedule" aria-labelledby="shared-schedule-title">
      <span className="micro" id="shared-schedule-title">
        ASÍ EMPEZAMOS CADA SEMANA · EN LOS TRES PLANES
      </span>
      <div className="schedule-days">
        {weeklySchedule.map((step) => (
          <div key={step.day}>
            <span className="schedule-day">{step.day}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <p className="schedule-feedback">
        Individual: audios de WhatsApp, sin llamadas de seguimiento. Coaching:
        consultas diarias y llamada mensual. Performance: consultas diarias y
        llamada semanal.
      </p>
    </div>
  );
}
