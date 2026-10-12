import { Arrow, SectionLabel } from "@/components/ui";
import { EnquiryLink } from "@/components/enquiry-link";
import "./method-overview.css";

const differences = [
  {
    title: "Conocemos tu punto de partida.",
    text: "Tu experiencia, tu objetivo y el tiempo que tienes. La primera conversación nos ayuda a entender qué preparación tiene sentido para ti.",
  },
  {
    title: "Adaptamos según tu respuesta.",
    text: "Revisamos las sesiones con tus sensaciones y tu contexto. La siguiente semana responde a lo que has podido asimilar y a tu disponibilidad.",
  },
  {
    title: "Entrenas con un equipo cerca.",
    text: "Un entrenador que explica las decisiones y una comunidad con la que compartir entrenamientos. El contacto y las llamadas dependen del plan.",
  },
] as const;

const methodStages = [
  {
    name: "Evaluar",
    prompt: "Tu objetivo y tu punto de partida.",
    detail:
      "Hablamos de tu experiencia, disponibilidad y limitaciones. Elegimos pruebas cuando pueden aportar información útil; una prueba de lactato no es obligatoria para empezar.",
  },
  {
    name: "Interpretar",
    prompt: "Qué necesita atención ahora.",
    detail:
      "Contrastamos datos, sensaciones e historial para elegir prioridades. Las zonas y los umbrales se contextualizan cuando existen referencias suficientes, sin decidir a partir de una cifra aislada.",
  },
  {
    name: "Planificar",
    prompt: "Una semana que encaje contigo.",
    detail:
      "Distribuimos las sesiones de resistencia, fuerza y recuperación según el objetivo y tu agenda. Cada entrenamiento tiene un propósito, una duración y un esfuerzo que puedas entender.",
  },
  {
    name: "Entrenar",
    prompt: "La intención llega a tu sesión.",
    detail:
      "Consultas tu planificación en TrainingPeaks y recibes las sesiones estructuradas admitidas por tu reloj compatible. El formato de comunicación y las consultas se ajustan al plan contratado.",
  },
  {
    name: "Medir",
    prompt: "Cómo has respondido al trabajo.",
    detail:
      "Observamos ejecución, evolución del esfuerzo y recuperación. Tus comentarios sobre sueño, fatiga y sensaciones añaden información que el registro del reloj no puede explicar por sí solo.",
  },
  {
    name: "Ajustar",
    prompt: "El siguiente paso se decide contigo.",
    detail:
      "Revisamos la semana y tu nueva disponibilidad. Mantenemos, progresamos o reducimos el trabajo según tu respuesta; la preparación continúa con decisiones revisables, no con una plantilla fija.",
  },
] as const;

export function WhyIcaroSection() {
  return (
    <section
      className="section method-why"
      id="por-que-icaro"
      aria-labelledby="method-why-title"
    >
      <div className="section-heading">
        <div>
          <SectionLabel number="02">POR QUÉ ICARO</SectionLabel>
          <h2 id="method-why-title">
            TU PREPARACIÓN.
            <br />
            <em>CON CRITERIO Y COMPAÑÍA.</em>
          </h2>
        </div>
        <p className="heading-copy">
          Para quien empieza y para quien quiere mejorar una preparación que ya
          está en marcha. Cambia tu experiencia; la atención a tu contexto sigue
          siendo individual.
        </p>
      </div>
      <ol className="method-differences">
        {differences.map((difference, index) => (
          <li key={difference.title}>
            <span className="micro" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{difference.title}</h3>
            <p>{difference.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MethodOverviewSection() {
  return (
    <section
      className="section method-overview"
      id="metodo"
      aria-labelledby="method-overview-title"
    >
      <div className="section-heading">
        <div>
          <SectionLabel number="03">
            EL MÉTODO / DE LA INFORMACIÓN A LA DECISIÓN
          </SectionLabel>
          <h2 id="method-overview-title">
            UN PLAN QUE
            <br />
            <em>EVOLUCIONA CONTIGO.</em>
          </h2>
        </div>
        <p className="heading-copy">
          Entenderte, elegir el trabajo y comprobar cómo respondes. Este ciclo
          convierte lo que sabemos de ti en sesiones y ajustes concretos.
          Explora cada paso.
        </p>
      </div>
      <ol className="method-cycle">
        {methodStages.map((stage, index) => (
          <li key={stage.name}>
            <details>
              <summary>
                <span className="method-step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="method-step-name">{stage.name}</span>
                <span className="method-step-prompt">{stage.prompt}</span>
                <span className="method-step-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{stage.detail}</p>
            </details>
          </li>
        ))}
      </ol>
      <div className="method-cycle-return">
        <span aria-hidden="true">↺</span>
        <p>
          Con cada revisión, volvemos a valorar qué necesita tu preparación.
        </p>
      </div>
      <div className="method-overview-actions">
        <EnquiryLink
          className="text-link"
          interest="coaching"
          source="metodo-resumen"
        >
          Solicitar valoración inicial <Arrow diagonal />
        </EnquiryLink>
        <a className="text-link method-laboratory-link" href="#laboratorio">
          Explorar cómo interpretamos los datos <Arrow />
        </a>
      </div>
    </section>
  );
}
