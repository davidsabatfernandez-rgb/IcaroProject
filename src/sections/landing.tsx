import Image from "next/image";
import { site, whatsappUrl } from "@/config/site";
import { copy, sharedFeatures, faqs, sports } from "@/data/content";
import { Arrow, RouteArt, SectionLabel } from "@/components/ui";
import { Pricing } from "@/components/pricing";
import { ContactForm } from "@/components/contact";
import { LactatePricing } from "@/components/lactate-pricing";
import { BarcelonaSection } from "./product";
import { ValueSection } from "./value";
import { JourneySection } from "./journey";

export function Landing() {
  return (
    <>
      <section className="hero triathlon-hero" id="inicio">
        <div className="hero-visual">
          {site.images.hero ? (
            <Image
              src={site.images.hero}
              alt="Corredores y sus sombras vistos desde arriba en una pista"
              fill
              preload
              sizes="(max-width: 760px) 1600px, 100vw"
            />
          ) : (
            <RouteArt />
          )}
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.title.map((line, index) => (
                <span key={line} className={index === 1 ? "accent-text" : ""}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-description">{copy.hero.description}</p>
            <div className="hero-actions">
              <a className="button accent" href="#contacto">
                {copy.hero.primary}
                <Arrow diagonal />
              </a>
              <a className="text-link" href="#como-funciona">
                {copy.hero.secondary}
                <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-sport-label" aria-hidden="true">
            <span>SWIM</span>
            <span>BIKE</span>
            <span>RUN</span>
          </div>
        </div>
        <div className="hero-bottom">
          <div>
            <strong>Tu plan, de verdad.</strong>
            <span>Individualizado para tu vida y tu objetivo.</span>
          </div>
          <div>
            <strong>Cerca, cada semana.</strong>
            <span>Revisión y feedback de tu entrenador.</span>
          </div>
          <div>
            <strong>TrainingPeaks + tu reloj.</strong>
            <span>Sesiones estructuradas en dispositivos compatibles.</span>
          </div>
        </div>
      </section>

      <section className="section sports-section triathlon-sports">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="01">ENTRENAMIENTO PARA TU VIDA</SectionLabel>
            <h2>
              Tres disciplinas.
              <br />
              Un plan para ti.
            </h2>
          </div>
          <p className="heading-copy">
            Natación, ciclismo y carrera se planifican en conjunto. Tu nivel, tu
            tiempo y tu objetivo marcan el punto de partida. También puedes
            entrenar una sola disciplina.
          </p>
        </div>
        <div className="sports-grid">
          {sports.map((sport) => (
            <article className={`sport sport-${sport.key}`} key={sport.key}>
              {site.images[sport.key] && (
                <Image
                  src={site.images[sport.key]}
                  alt={sport.alt}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 48px), 29vw"
                />
              )}
              <div className="sport-caption">
                <span className="micro">{sport.symbol}</span>
                <h3>{sport.name}</h3>
                <p>{sport.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ValueSection />
      <JourneySection />

      <section className="section plans-section" id="planes">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="03">ENCUENTRA TU ACOMPAÑAMIENTO</SectionLabel>
            <h2>
              Tu plan es individual.
              <br />
              El seguimiento lo eliges tú.
            </h2>
          </div>
          <p className="heading-copy">
            Tres formas de estar cerca de tu entrenador. Cuéntanos lo que
            necesitas y te ayudamos a elegir antes de empezar.
          </p>
        </div>
        <Pricing />
        <div className="shared-features" data-reveal>
          <div>
            <span className="micro">LA BASE ES LA MISMA</span>
            <h3>Incluido en todos.</h3>
          </div>
          <ul>
            {sharedFeatures.map((feature) => (
              <li key={feature}>
                <Arrow diagonal />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="support-services">
        <BarcelonaSection />
        <section
          className="section lactate"
          id="lactato"
          aria-labelledby="lactate-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <SectionLabel number="05">TESTS OPCIONALES</SectionLabel>
              <h2 id="lactate-title">
                Medir para decidir.
                <br />
                Entrenar con más contexto.
              </h2>
            </div>
            <p className="heading-copy">
              Un test de lactato puede ayudarnos a orientar las intensidades y
              comparar tu respuesta. Lo proponemos cuando la información aporta
              una decisión útil para tu entrenamiento.
            </p>
          </div>
          <LactatePricing />
        </section>
      </div>

      <section className="section faq-section" id="faq">
        <div data-reveal>
          <SectionLabel number="06">ANTES DE DAR EL PRIMER PASO</SectionLabel>
          <h2>
            Resolvemos
            <br />
            tus dudas.
          </h2>
          <p className="heading-copy">
            Si tu caso necesita más detalle, hablamos contigo.
          </p>
          <a className="text-link" href="#contacto">
            Consultar mi caso
            <Arrow diagonal />
          </a>
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

      <section className="contact-section" id="contacto">
        <div className="section contact-inner">
          <div className="contact-copy" data-reveal>
            <SectionLabel number="07">TU PRIMER PASO EN ICARO</SectionLabel>
            <h2>
              Empieza con
              <br />
              una conversación.
            </h2>
            <p>
              Cuéntanos qué quieres preparar y cuánto tiempo tienes. Te
              explicamos cómo podemos ayudarte, el seguimiento que encaja
              contigo y sus condiciones.
            </p>
            <ul className="contact-expectations">
              <li>
                <Arrow />
                Hablamos de tu objetivo y tu disponibilidad.
              </li>
              <li>
                <Arrow />
                Resolvemos tus dudas sobre el acompañamiento.
              </li>
              <li>
                <Arrow />
                La llamada inicial está incluida en los tres planes.
              </li>
            </ul>
            <div className="contact-links">
              {whatsappUrl() && (
                <a
                  className="text-link"
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar por WhatsApp
                  <Arrow diagonal />
                </a>
              )}
              {site.contact.email && (
                <a className="text-link" href={`mailto:${site.contact.email}`}>
                  Escribir un email
                  <Arrow diagonal />
                </a>
              )}
            </div>
            <span className="contact-signature">
              TU OBJETIVO. TU VIDA. TU EQUIPO.
            </span>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
