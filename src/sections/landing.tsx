import Image from "next/image";
import { site, whatsappUrl } from "@/config/site";
import { faqs } from "@/data/content";
import { journeyStages } from "@/data/journey";
import { Arrow, SectionLabel } from "@/components/ui";
import { EnquiryLink } from "@/components/enquiry-link";
import { LactateLab } from "@/components/lactate-lab";
import { TrainingCalendar } from "@/components/training-calendar";
import { Pricing } from "@/components/pricing";
import { ContactForm } from "@/components/contact";
import { LactatePricing } from "@/components/lactate-pricing";
import { WeeklySchedule } from "./value";
import { DisciplinesSection } from "./disciplines";
import {
  PhilosophySection,
  BeyondNumbersSection,
  CommunityAtelierSection,
  CoachSection,
} from "./editorial";
import { atelierCopy, assessments } from "@/data/atelier";
import { ExploreSection } from "./explore";
import { MethodOverviewSection, WhyIcaroSection } from "./method-overview";
import { TrainingDecision } from "@/components/training-decision";
import { trainingDecisionCase } from "@/data/training-decision";

export function Landing() {
  return (
    <div className="atelier">
      <section
        className="atelier-hero atelier-hero-conversion"
        id="inicio"
        aria-labelledby="hero-title"
      >
        <div className="atelier-hero-copy">
          <p className="eyebrow">
            ENTRENAMIENTO DE TRIATLÓN · CARRERA · CICLISMO
          </p>
          <h1 id="hero-title">
            <span>TU OBJETIVO.</span>
            <span>EL ENTRENAMIENTO</span>
            <span>ADECUADO.</span>
          </h1>
          <p className="atelier-hero-description">
            {atelierCopy.hero.description}
          </p>
          <p className="hero-audience">
            <strong>Desde iniciación hasta atletas con experiencia.</strong>{" "}
            Empezamos por conocerte en una llamada inicial, incluida en todos
            los planes.
          </p>
          <div className="hero-actions">
            <EnquiryLink
              className="button accent"
              interest="coaching"
              source="hero"
            >
              Solicitar valoración inicial <Arrow diagonal />
            </EnquiryLink>
            <a className="text-link" href="#metodo">
              Descubrir el método <Arrow />
            </a>
          </div>
          <div className="atelier-hero-signature">
            <span>CIENCIA.</span>
            <span>INDIVIDUALIZACIÓN.</span>
            <span>RENDIMIENTO.</span>
            <span>COMUNIDAD.</span>
          </div>
        </div>
        <div className="atelier-hero-image">
          <Image
            src={site.images.hero}
            alt="Triatletas saliendo del agua durante una competición, entre salpicaduras y público"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 90vw, 75vw"
          />
          <div className="atelier-photo-caption">
            <span>01 / RESISTENCIA EN MOVIMIENTO</span>
            <span>NATACIÓN · CICLISMO · CARRERA</span>
          </div>
        </div>
      </section>
      <WhyIcaroSection />
      <MethodOverviewSection />

      <section
        className="section atelier-inside"
        id="como-funciona"
        aria-labelledby="inside-title"
      >
        <div className="section-heading">
          <div>
            <SectionLabel number="04">
              TU SEMANA EN ICARO / PLANIFICACIÓN
            </SectionLabel>
            <h2 id="inside-title">
              TU ENTRENAMIENTO.
              <br />
              <em>SIEMPRE A TU MEDIDA.</em>
            </h2>
          </div>
          <div className="heading-copy">
            <p>
              La individualización continúa después de la primera llamada.
              Organizamos resistencia, fuerza y recuperación; tus sensaciones y
              tu disponibilidad orientan cada semana.
            </p>
            <a
              className="platform-link"
              href={site.trainingPeaksUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Planificación en TrainingPeaks (abre en una pestaña nueva)"
            >
              Planificación en TrainingPeaks <Arrow diagonal />
            </a>
            <p className="compatibility-note">
              Sesiones estructuradas en tu reloj compatible. La sincronización
              depende del modelo, la disciplina y el tipo de sesión.
            </p>
          </div>
        </div>
        <div id="tu-semana">
          <TrainingCalendar />
        </div>
        <WeeklySchedule />
        <details className="atelier-onboarding">
          <summary>
            De la primera conversación a tu objetivo{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <ol>
            {journeyStages.map((stage) => (
              <li key={stage.number}>
                <span className="micro">
                  {stage.number} / {stage.phase}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <small>{stage.detail}</small>
              </li>
            ))}
          </ol>
        </details>
      </section>
      <TrainingDecision trainingCase={trainingDecisionCase} />

      <section
        className="section atelier-services plans-section"
        id="planes"
        aria-labelledby="services-title"
      >
        <div className="section-heading">
          <div>
            <SectionLabel number="05">PLANES DE ENTRENAMIENTO</SectionLabel>
            <h2 id="services-title">
              UN MISMO MÉTODO.
              <br />
              <em>TRES FORMAS DE ACOMPAÑARTE.</em>
            </h2>
          </div>
          <p className="heading-copy">
            La base de tu preparación es individual en los tres planes. Lo que
            cambia es la frecuencia de contacto, las llamadas de seguimiento y
            la profundidad del análisis.
          </p>
        </div>
        <Pricing />
      </section>

      <CommunityAtelierSection />
      <CoachSection coach={site.coach} />
      <DisciplinesSection />

      <section
        className="section atelier-method"
        id="laboratorio"
        aria-labelledby="method-title"
      >
        <div className="section-heading">
          <div>
            <SectionLabel number="09">
              EL LABORATORIO / FISIOLOGÍA APLICADA
            </SectionLabel>
            <h2 id="method-title">
              LOS DATOS
              <br />
              <em>NECESITAN CRITERIO.</em>
            </h2>
          </div>
          <p className="heading-copy">
            Los datos describen una respuesta. El entrenador interpreta qué
            significa, qué limita tu preparación y qué decisión puede ayudarte a
            avanzar. Explora un ejemplo ilustrativo de evaluación; no representa
            resultados de un atleta.
          </p>
        </div>
        <LactateLab />
      </section>
      <BeyondNumbersSection />

      <details className="atelier-scientific-detail">
        <summary>
          El criterio detrás de cada sesión <span aria-hidden="true">+</span>
        </summary>
        <PhilosophySection />
      </details>

      <section
        className="section atelier-testing"
        id="lactato"
        aria-labelledby="testing-title"
      >
        <div className="section-heading">
          <div>
            <SectionLabel number="11">PRUEBAS Y EVALUACIÓN</SectionLabel>
            <h2 id="testing-title">
              MEDIR CON UN PROPÓSITO.
              <br />
              <em>DECIDIR CON CONTEXTO.</em>
            </h2>
          </div>
          <p className="heading-copy">
            Elegimos pruebas cuando pueden orientar una decisión. Las pruebas de
            campo forman parte del método; la prueba de lactato es opcional y
            tiene condiciones específicas según el plan.
          </p>
        </div>
        <div className="assessment-list">
          {assessments.map((item, index) => (
            <article key={item.title}>
              <span className="micro">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <LactatePricing />
        <div className="atelier-barcelona" id="barcelona">
          <div>
            <span className="micro">EVALUACIÓN TÉCNICA / BARCELONA</span>
            <h3>También, a pie de atleta.</h3>
          </div>
          <p>
            Trabajo de técnica en dos centros de Barcelona. Observamos el gesto,
            proponemos correcciones y hablamos de cómo llevarlas al
            entrenamiento. Consulta opciones, disponibilidad y condiciones.
          </p>
          <EnquiryLink
            className="text-link"
            interest="tests"
            source="barcelona"
          >
            Consultar sesiones de técnica <Arrow diagonal />
          </EnquiryLink>
        </div>
      </section>

      <ExploreSection />

      <section
        className="section faq-section"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div>
          <SectionLabel number="12">
            PREGUNTAS FRECUENTES / INFORMACIÓN PARA DECIDIR
          </SectionLabel>
          <h2 id="faq-title">
            ANTES DE
            <br />
            <em>EMPEZAR.</em>
          </h2>
          <p className="heading-copy">
            Hablamos de tu caso antes de elegir un seguimiento.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className="contact-section"
        id="contacto"
        aria-labelledby="contact-title"
      >
        <div className="contact-inner">
          <div className="contact-copy">
            <SectionLabel number="13">
              VALORACIÓN INICIAL / TU PREPARACIÓN EMPIEZA AQUÍ
            </SectionLabel>
            <h2 id="contact-title">
              HABLEMOS DE TU
              <br />
              <em>PRÓXIMO OBJETIVO.</em>
            </h2>
            <p>
              Cuéntanos tu objetivo. Hablamos de tu contexto, de lo que
              necesitas y de cómo podemos trabajar contigo.
            </p>
            <ol className="contact-expectations">
              <li>Una primera conversación para entender tu preparación.</li>
              <li>Opciones y condiciones claras antes de contratar.</li>
              <li>
                Entrenamiento, comunidad o evaluación: elige qué te interesa.
              </li>
            </ol>
            <a
              className="button light"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contáctanos por WhatsApp al ${site.contact.whatsapp} (abre en una pestaña nueva)`}
            >
              Contáctanos por WhatsApp <Arrow diagonal />
            </a>
            <a className="contact-email" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <span className="contact-signature">
              CIENCIA. INDIVIDUALIZACIÓN. RENDIMIENTO. COMUNIDAD.
            </span>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
