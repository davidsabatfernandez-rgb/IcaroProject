import Image from "next/image";
import { site, whatsappUrl } from "@/config/site";
import { copy, sharedFeatures, faqs, sports } from "@/data/content";
import { Arrow, RouteArt, SectionLabel } from "@/components/ui";
import { Pricing } from "@/components/pricing";
import { ContactForm } from "@/components/contact";
import { LactatePricing } from "@/components/lactate-pricing";
import { BarcelonaSection } from "./product";
import { TechnicalMethodSection } from "./technical-method";
import { JourneySection } from "./journey";
import { CommunitySection } from "./community";
import "./whatsapp.css";

export function Landing() {
  const whatsapp = whatsappUrl();

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
            <a className="hero-community-link" href="#comunidad">
              Un mismo propósito. Una comunidad contigo. <Arrow diagonal />
            </a>
            <div className="hero-actions">
              <a className="button accent" href="#contacto">
                {copy.hero.primary}
                <Arrow diagonal />
              </a>
              {whatsapp && (
                <a
                  className="button whatsapp-cta"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contáctanos por WhatsApp al ${site.contact.whatsapp} (abre en una pestaña nueva)`}
                >
                  Contáctanos por WhatsApp
                  <Arrow diagonal />
                </a>
              )}
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
            <strong>Tu perfil guía el plan.</strong>
            <span>Tests de campo y zonas de entrenamiento revisables.</span>
          </div>
          <div>
            <strong>Tu respuesta cuenta.</strong>
            <span>Datos y sensaciones con una explicación semanal.</span>
          </div>
          <div>
            <strong>
              <a
                className="hero-platform-link"
                href={site.trainingPeaksUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TrainingPeaks (abre en una pestaña nueva)"
              >
                TrainingPeaks
                <Arrow diagonal />
              </a>{" "}
              + tu reloj.
            </strong>
            <span>Sesiones estructuradas en dispositivos compatibles.</span>
          </div>
        </div>
      </section>

      <section className="section plans-section" id="planes">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="01">ENCUENTRA TU ACOMPAÑAMIENTO</SectionLabel>
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

      <CommunitySection />

      <section className="section sports-section triathlon-sports">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="03">ENTRENAMIENTO PARA TU VIDA</SectionLabel>
            <h2>
              Resistencia y fuerza.
              <br />
              Un mismo propósito.
            </h2>
          </div>
          <p className="heading-copy">
            Triatlón y running son nuestro punto de partida. También acompañamos
            al atleta híbrido que quiere desarrollar resistencia y fuerza.
            Coordinamos las sesiones, su intensidad y la recuperación según tu
            nivel, tu tiempo y lo que quieres conseguir.
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
      <section
        className="section hybrid-section"
        id="atleta-hibrido"
        aria-labelledby="hybrid-title"
      >
        <div>
          <span className="micro">ATLETA HÍBRIDO · RESISTENCIA + FUERZA</span>
          <h2 id="hybrid-title">
            Más de una capacidad.
            <br />
            Un plan que las conecta.
          </h2>
          <p>
            Quieres correr, pedalear o nadar y seguir trabajando tu fuerza. Te
            ayudamos a dar un propósito a cada sesión y a encajar ambas partes
            en tu vida.
          </p>
          <a className="text-link" href="#contacto">
            Hablemos de tu enfoque híbrido <Arrow diagonal />
          </a>
        </div>
        <ol>
          <li>
            <strong>Partimos de tu realidad.</strong>
            <p>
              Experiencia, objetivo, tiempo y material disponible. El equilibrio
              empieza por conocerte.
            </p>
          </li>
          <li>
            <strong>Coordinamos los estímulos.</strong>
            <p>
              Distribuimos resistencia y fuerza considerando la fatiga y la
              recuperación, en una misma planificación en TrainingPeaks.
            </p>
          </li>
          <li>
            <strong>Escuchamos tu respuesta.</strong>
            <p>
              Datos, sensaciones y feedback semanal para decidir qué mantener y
              qué ajustar. Tu plan evoluciona contigo.
            </p>
          </li>
        </ol>
      </section>
      <TechnicalMethodSection />
      <JourneySection />

      <div className="support-services">
        <BarcelonaSection />
        <section
          className="section lactate"
          id="lactato"
          aria-labelledby="lactate-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <SectionLabel number="07">TESTS OPCIONALES</SectionLabel>
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
          <SectionLabel number="08">ANTES DE DAR EL PRIMER PASO</SectionLabel>
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
              {whatsapp && (
                <div className="whatsapp-contact">
                  <a
                    className="button accent"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contáctanos por WhatsApp al ${site.contact.whatsapp} (abre en una pestaña nueva)`}
                  >
                    Contáctanos por WhatsApp
                    <Arrow diagonal />
                  </a>
                  <span className="whatsapp-number">
                    {site.contact.whatsapp}
                  </span>
                </div>
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
