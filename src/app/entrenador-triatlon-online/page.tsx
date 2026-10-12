import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact";
import { EnquiryLink } from "@/components/enquiry-link";
import { Arrow, Wordmark } from "@/components/ui";
import { site } from "@/config/site";
import { plans } from "@/data/content";
import "./triatlon-landing.css";

const canonical = `${site.url}/entrenador-triatlon-online`;
const description =
  "Entrenador de triatlón online con planificación individual en TrainingPeaks, revisión semanal y contacto directo. Conoce Seguimiento y Rendimiento y solicita tu valoración inicial en ICARO.";

export const metadata: Metadata = {
  title:
    "Entrenador de triatlón online y seguimiento individual · ICARO PROJECT",
  description,
  alternates: { canonical },
  openGraph: {
    title: "Entrenador de triatlón online · ICARO PROJECT",
    description,
    url: canonical,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ICARO PROJECT. Entrena con propósito.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenador de triatlón online · ICARO PROJECT",
    description,
    images: ["/opengraph-image"],
  },
};

const method = [
  {
    title: "Evaluar",
    copy: "Hablamos de tu experiencia, tus objetivos y el tiempo que puedes dedicar. El punto de partida lo marcas tú.",
  },
  {
    title: "Interpretar",
    copy: "Unimos datos y sensaciones para entender qué necesitas. Revisamos zonas y umbrales cuando la información permite hacerlo.",
  },
  {
    title: "Planificar",
    copy: "Coordinamos natación, bicicleta, carrera y fuerza en TrainingPeaks. Cada sesión tiene duración, intensidad y propósito.",
  },
  {
    title: "Entrenar",
    copy: "Sigues una semana que encaja con tu disponibilidad. Puedes consultar tus dudas según el seguimiento que elijas.",
  },
  {
    title: "Medir",
    copy: "Revisamos lo que hiciste y cómo respondiste: carga, fatiga, sensaciones y evolución de las sesiones.",
  },
  {
    title: "Ajustar",
    copy: "La información vuelve al plan. Explicamos la semana anterior y qué buscamos en la siguiente, sin repetir una plantilla.",
  },
];

const faqs = [
  {
    question:
      "¿Necesito tener experiencia en triatlón para contratar un entrenador?",
    answer:
      "No necesitas haber completado un triatlón. La llamada inicial sirve para valorar tu experiencia en cada disciplina, tu objetivo y qué preparación puedes sostener. Si necesitas aprender una habilidad, como nadar con autonomía, lo tenemos en cuenta antes de elegir una prueba.",
  },
  {
    question: "¿Qué diferencia hay entre Seguimiento y Rendimiento?",
    answer:
      "Ambos incluyen planificación individual, revisión semanal y consultas diarias. Seguimiento añade una llamada mensual. Rendimiento ofrece una llamada semanal, análisis de mayor profundidad y contacto más cercano; también incluye una prueba de lactato cada 6 meses. Te explicamos las condiciones de cada opción antes de empezar.",
  },
  {
    question: "¿Cada cuánto recibo el plan y qué sucede si cambia mi semana?",
    answer:
      "El viernes nos envías tu disponibilidad. Entre sábado y domingo recibes la programación de la siguiente semana, con una explicación de la anterior y sus nuevos objetivos. En Seguimiento y Rendimiento puedes comunicar cambios y dudas durante la semana para revisar los ajustes necesarios.",
  },
  {
    question: "¿Los entrenamientos llegan a mi reloj?",
    answer:
      "Trabajamos con TrainingPeaks. Puedes conectar un reloj compatible para recibir los entrenamientos estructurados que admita tu modelo y fabricante. Te ayudamos con la configuración inicial; la sincronización depende del dispositivo, la disciplina y el tipo de sesión.",
  },
  {
    question: "¿Las pruebas de lactato son obligatorias?",
    answer:
      "No. Son una herramienta opcional cuando la información puede ayudar a decidir mejor tu entrenamiento. No necesitas un test para empezar. Seguimiento dispone de condiciones específicas con una promoción trimestral; Rendimiento incluye una prueba cada 6 meses y permite consultar una opción trimestral adicional.",
  },
  {
    question: "¿Puedo preparar un Ironman o una prueba de larga distancia?",
    answer:
      "Sí, la preparación se plantea a partir de tu experiencia, tu disponibilidad y la exigencia del objetivo. Primero revisamos si el reto y el calendario encajan contigo. El seguimiento no garantiza un resultado ni sustituye el tiempo necesario para construir las capacidades de cada disciplina.",
  },
  {
    question: "¿Cuánto cuesta y qué compromiso tiene el servicio?",
    answer:
      "Te explicamos la cuota y las condiciones del plan que encaje con tu objetivo antes de empezar. Solicitar una valoración permite hablar de tu preparación y conocer esas condiciones; no supone contratar automáticamente un plan.",
  },
];

export default function TriathlonCoachingPage() {
  const featuredPlans = plans.filter(
    (plan) => plan.id === "coaching" || plan.id === "performance",
  );
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Entrenamiento individualizado de triatlón online",
    description,
    url: canonical,
    serviceType: "Planificación y seguimiento de entrenamiento de triatlón",
    provider: { "@type": "Organization", name: site.brandName, url: site.url },
  };

  return (
    <>
      <header className="ads-header">
        <Link className="ads-logo" href="/" title="Volver a ICARO PROJECT">
          <Wordmark />
        </Link>
        <nav aria-label="Preparación de triatlón">
          <a href="#metodo">Método</a>
          <a href="#planes">Planes</a>
          <EnquiryLink
            href="#valoracion"
            interest="coaching"
            source="ads-nav"
            sport="Triatlón"
            plan="Seguimiento"
          >
            Valoración <Arrow diagonal />
          </EnquiryLink>
        </nav>
      </header>
      <main id="contenido" className="ads-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceData).replace(/</g, "\\u003c"),
          }}
        />
        <section className="ads-hero" aria-labelledby="ads-title">
          <div className="ads-hero-copy">
            <p className="eyebrow">ICARO / NATACIÓN · CICLISMO · CARRERA</p>
            <h1 id="ads-title">
              <span>ENTRENADOR DE TRIATLÓN ONLINE.</span>
              <span>PLANIFICACIÓN INDIVIDUAL Y SEGUIMIENTO REAL.</span>
            </h1>
            <p className="ads-hero-description">
              Tu preparación necesita encajar con tu vida y evolucionar contigo.
              Planificamos en TrainingPeaks, revisamos cómo respondes y te
              acompañamos en las decisiones de cada semana.
            </p>
            <div className="ads-hero-actions">
              <EnquiryLink
                className="button accent"
                href="#valoracion"
                interest="coaching"
                source="ads-hero"
                sport="Triatlón"
                plan="Seguimiento"
              >
                Solicitar valoración inicial <Arrow diagonal />
              </EnquiryLink>
              <a className="text-link" href="#metodo">
                Descubrir el método <Arrow />
              </a>
            </div>
            <p className="ads-hero-note">
              Desde tu primer triatlón hasta la larga distancia. El rigor es el
              mismo; tu preparación es individual.
            </p>
          </div>
          <figure className="ads-hero-photo">
            <div className="ads-photo-frame">
              <Image
                src={site.images.hero}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 760px) 100vw, 48vw"
                alt="Triatletas saliendo del agua durante una competición"
              />
            </div>
            <figcaption>
              UNA PREPARACIÓN. TRES DISCIPLINAS. TU CONTEXTO.
            </figcaption>
          </figure>
        </section>
        <section className="ads-benefits" aria-labelledby="ads-benefits-title">
          <div className="ads-section-intro">
            <p className="eyebrow">Qué cambia cuando hay seguimiento</p>
            <h2 id="ads-benefits-title">
              TU SEMANA NO ES
              <br />
              UNA PLANTILLA.
            </h2>
          </div>
          <div className="ads-benefit-list">
            <article>
              <span>01 /</span>
              <h3>Un plan que puedes sostener.</h3>
              <p>
                Tu disponibilidad, experiencia y objetivo deciden la
                distribución de sesiones. Coordinamos resistencia y fuerza para
                dar sentido al tiempo que dedicas.
              </p>
            </article>
            <article>
              <span>02 /</span>
              <h3>Sabes por qué entrenas así.</h3>
              <p>
                Recibes una explicación de la semana anterior y los objetivos de
                la siguiente. Una sesión tiene valor por lo que busca y por cómo
                respondes.
              </p>
            </article>
            <article>
              <span>03 /</span>
              <h3>Un entrenador al otro lado.</h3>
              <p>
                En Seguimiento y Rendimiento puedes plantear dudas cada día.
                Revisamos contigo los cambios de horario, las sensaciones y los
                ajustes necesarios.
              </p>
            </article>
          </div>
        </section>
        <section className="ads-team" aria-labelledby="ads-team-title">
          <div>
            <p className="eyebrow">Entrenadores y atletas en activo</p>
            <h2 id="ads-team-title">
              CONOCEMOS
              <br />
              EL PROCESO.
            </h2>
          </div>
          <div>
            <p>
              ICARO reúne entrenadores con experiencia previa, pruebas Ironman
              completadas y triatletas actuales de alto nivel. La experiencia
              deportiva acompaña el criterio con el que revisamos tu
              preparación.
            </p>
            <p>
              No necesitas competir al mismo nivel para recibir atención
              individual. Necesitamos conocer tu punto de partida y trabajar
              sobre él.
            </p>
            <Link className="text-link" href="/#entrenador">
              Conoce nuestro enfoque <Arrow diagonal />
            </Link>
          </div>
        </section>
        <section
          id="metodo"
          className="ads-method"
          aria-labelledby="ads-method-title"
        >
          <div className="ads-section-heading">
            <div>
              <p className="eyebrow">De la información a las decisiones</p>
              <h2 id="ads-method-title">
                UN MÉTODO.
                <br />
                TU APLICACIÓN.
              </h2>
            </div>
            <p>
              Los datos nos ayudan a decidir cuánto entrenar, qué priorizar y
              cuándo ajustar. La fisiología sirve a tu preparación: no necesitas
              dominarla para entender tu semana.
            </p>
          </div>
          <ol className="ads-method-steps">
            {method.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")} /</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="ads-week">
            <p className="eyebrow">El ritmo de cada semana</p>
            <div>
              <p>
                <strong>Viernes.</strong> Nos envías tu disponibilidad.
              </p>
              <p>
                <strong>Sábado y domingo.</strong> Recibes el plan, la revisión
                de lo anterior y el propósito de lo siguiente.
              </p>
              <p>
                <strong>Durante la semana.</strong> Entrenas, registras tus
                sensaciones y consultas tus dudas.
              </p>
            </div>
          </div>
          <p className="ads-platform">
            Tu calendario en{" "}
            <a
              href={site.trainingPeaksUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              TrainingPeaks <Arrow diagonal />
            </a>
            . Sesiones estructuradas al reloj cuando tu dispositivo y fabricante
            lo permiten.
          </p>
        </section>
        <section
          id="planes"
          className="ads-plans"
          aria-labelledby="ads-plans-title"
        >
          <div className="ads-section-heading">
            <div>
              <p className="eyebrow">Elige cómo trabajamos juntos</p>
              <h2 id="ads-plans-title">
                EL PLAN ES INDIVIDUAL.
                <br />
                EL CONTACTO LO ELIGES TÚ.
              </h2>
            </div>
            <p>
              Las dos opciones incluyen llamada inicial, planificación en
              TrainingPeaks y revisión semanal. La diferencia está en la
              frecuencia de las conversaciones y la profundidad del
              acompañamiento.
            </p>
          </div>
          <div className="ads-plan-grid">
            {featuredPlans.map((plan) => (
              <article
                className={`ads-plan ${plan.id === "coaching" ? "ads-plan-featured" : ""}`}
                key={plan.id}
              >
                <p className="ads-plan-tag">
                  {plan.id === "coaching"
                    ? "PLAN DESTACADO"
                    : "ACOMPAÑAMIENTO MÁS CERCANO"}
                </p>
                <h3>{plan.name}</h3>
                <p className="ads-plan-position">
                  {plan.id === "coaching"
                    ? "Tu entrenamiento, en constante evolución."
                    : "Una colaboración más profunda con tu rendimiento."}
                </p>
                <p className="ads-plan-description">{plan.description}</p>
                <dl>
                  <div>
                    <dt>Revisión del entrenamiento</dt>
                    <dd>
                      Semanal, con explicación de la evolución y de los próximos
                      objetivos.
                    </dd>
                  </div>
                  <div>
                    <dt>Comunicación</dt>
                    <dd>{plan.contact}</dd>
                  </div>
                  <div>
                    <dt>Conversación por llamada</dt>
                    <dd>{plan.call}.</dd>
                  </div>
                  <div>
                    <dt>Análisis y ajustes</dt>
                    <dd>
                      {plan.id === "coaching"
                        ? "Seguimiento frecuente de sesiones, fatiga y respuesta. Ajustes durante la semana."
                        : "Análisis en profundidad, comparación de ciclos y preparación detallada de competición."}
                    </dd>
                  </div>
                  <div>
                    <dt>Pruebas de lactato</dt>
                    <dd>
                      {plan.id === "coaching"
                        ? "Opcionales. Condiciones para atletas del plan y promoción trimestral bajo consulta."
                        : "1 prueba incluida cada 6 meses. Opción trimestral adicional bajo consulta."}
                    </dd>
                  </div>
                </dl>
                <EnquiryLink
                  className={`button ${plan.id === "coaching" ? "accent" : "outline"}`}
                  href="#valoracion"
                  interest="coaching"
                  source={`ads-plan-${plan.id}`}
                  plan={plan.name}
                  sport="Triatlón"
                >
                  Solicitar valoración de {plan.name} <Arrow diagonal />
                </EnquiryLink>
                <p className="ads-plan-conditions">
                  Te explicamos la cuota y las condiciones antes de empezar.
                </p>
              </article>
            ))}
          </div>
          <p className="ads-individual">
            ¿Prefieres organizarte con más autonomía?{" "}
            <Link href="/#planes">
              Individual incluye plan personalizado y revisión semanal por
              audios de WhatsApp.
            </Link>{" "}
            Consulta las tres opciones.
          </p>
        </section>
        <section
          id="valoracion"
          className="ads-valuation"
          aria-labelledby="ads-valuation-title"
        >
          <div className="ads-valuation-copy">
            <p className="eyebrow">Empezamos por conocerte</p>
            <h2 id="ads-valuation-title">
              HABLEMOS DE
              <br />
              TU PREPARACIÓN.
            </h2>
            <p>
              Cuéntanos tu objetivo y el tiempo que puedes dedicar. Revisaremos
              tu solicitud y hablaremos de qué seguimiento encaja contigo y de
              sus condiciones.
            </p>
            <ul>
              <li>Tu experiencia y el reto que quieres preparar.</li>
              <li>Cómo encaja el entrenamiento en tu semana.</li>
              <li>Qué contacto necesitas con tu entrenador.</li>
            </ul>
            <p className="ads-valuation-note">
              Enviar la solicitud no contrata un plan. La llamada inicial está
              incluida en las tres modalidades de entrenamiento.
            </p>
          </div>
          <div className="ads-valuation-form">
            <ContactForm
              initialSource="landing-triatlon"
              initialSport="Triatlón"
              initialPlan="Seguimiento"
            />
          </div>
        </section>
        <section className="ads-faq" aria-labelledby="ads-faq-title">
          <div>
            <p className="eyebrow">Antes de decidir</p>
            <h2 id="ads-faq-title">
              DUDAS CONCRETAS.
              <br />
              RESPUESTAS CLARAS.
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="ads-final" aria-labelledby="ads-final-title">
          <div>
            <p className="eyebrow">Tu siguiente paso</p>
            <h2 id="ads-final-title">
              TU OBJETIVO.
              <br />
              UNA PREPARACIÓN
              <br />
              QUE ENCAJE CONTIGO.
            </h2>
          </div>
          <div>
            <p>
              Si buscas un entrenador que revise tu respuesta y trabaje contigo
              de forma continua, empecemos por entender tu situación.
            </p>
            <EnquiryLink
              className="button accent"
              href="#valoracion"
              interest="coaching"
              source="ads-final"
              sport="Triatlón"
              plan="Seguimiento"
            >
              Solicitar valoración inicial <Arrow diagonal />
            </EnquiryLink>
          </div>
        </section>
      </main>
      <footer className="ads-footer">
        <Link href="/" title="Volver a ICARO PROJECT">
          <Wordmark />
        </Link>
        <div>
          <Link href="/">Conocer ICARO</Link>
          <Link href={site.legal.privacy}>Privacidad</Link>
          <a href={`mailto:${site.contact.email}`}>Contactar por correo</a>
        </div>
        <p>
          © {new Date().getFullYear()} {site.brandName}
        </p>
      </footer>
    </>
  );
}
