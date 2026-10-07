import Image from "next/image";
import { site, whatsappUrl } from "@/config/site";
import { copy, sharedFeatures, faqs, sports } from "@/data/content";
import { Arrow, LoopArrow, RouteArt, SectionLabel } from "@/components/ui";
import { Curve } from "@/components/curve";
import { Pricing } from "@/components/pricing";
import { ContactForm } from "@/components/contact";
import { LactatePricing } from "@/components/lactate-pricing";
import { BarcelonaSection } from "./product";
import { ValueSection } from "./value";
import { JourneySection } from "./journey";
import "./triathlon.css";
import "./coaching.css";
export function Landing() {
  return (
    <>
      <section className="hero triathlon-hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            {copy.hero.eyebrow}
          </div>
          <h1>
            {copy.hero.title.map((line, i) => (
              <span key={line} className={i === 1 ? "accent-text" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p>{copy.hero.description}</p>
          <div className="hero-performance-note">
            <strong>Rigor en el entrenamiento.</strong>
            <span>Cercanía en cada etapa.</span>
          </div>
          <div className="hero-delivery">
            <span>100 % INDIVIDUALIZADO</span>
            <span>FEEDBACK SEMANAL</span>
            <span>TRAININGPEAKS</span>
          </div>
          <div className="hero-actions">
            <a className="button accent" href="#contacto">
              {copy.hero.primary}
              <Arrow diagonal />
            </a>
            <a className="text-link" href="#planes">
              {copy.hero.secondary}
              <Arrow />
            </a>
          </div>
          <p className="hero-price">
            Triatlón desde{" "}
            <strong>{site.prices.individual.triathlon} € / mes</strong>
            <span>
              Precio provisional. También puedes entrenar una sola disciplina.
            </span>
          </p>
        </div>
        <div className="hero-visual">
          {site.images.hero ? (
            <Image
              src={site.images.hero}
              alt="Grupo de corredores y sus sombras vistos desde arriba en una pista"
              fill
              preload
              sizes="(max-width: 760px) 100vw, 48vw"
            />
          ) : (
            <RouteArt />
          )}
          <div className="visual-coordinate">
            <span>NATACIÓN / CICLISMO / CARRERA</span>
            <span>TRES DISCIPLINAS. UN PLAN PARA TI.</span>
          </div>
          <span className="visual-index">I / P</span>
        </div>
        <div className="hero-bottom">
          <span>
            SWIM <i /> BIKE <i /> RUN <i /> ICARO PROJECT
          </span>
          <a href="#como-funciona" title="Ver cómo funciona">
            HECHO PARA TI <span>↓</span>
          </a>
        </div>
      </section>
      <div className="method-strip" aria-label="Nuestro método">
        {[
          "Medir",
          "Entender",
          "Entrenar",
          "Observar",
          "Adaptar",
          "Volver a medir",
        ].map((word, i) => (
          <span key={word}>
            {word}
            <span aria-hidden="true">
              {i === 5 ? <LoopArrow /> : <Arrow diagonal />}
            </span>
          </span>
        ))}
      </div>
      <section className="sports-section triathlon-sports">
        <div className="section sports-heading" data-reveal>
          <SectionLabel number="01">SWIM. BIKE. RUN.</SectionLabel>
          <h2>
            Tres disciplinas.
            <br />
            Un mismo atleta.
          </h2>
          <p className="sports-intro">
            Nadar, pedalear y correr forman parte del mismo plan. Organizamos
            las tres disciplinas para que la carga encaje contigo. También
            puedes elegir una sola.
          </p>
        </div>
        <div className="sports-grid">
          {sports.map((s) => (
            <article className={`sport sport-${s.key}`} key={s.key}>
              {site.images[s.key] ? (
                <Image
                  src={site.images[s.key]}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              ) : (
                <div className="sport-art" aria-hidden="true">
                  {s.key === "running" ? (
                    <svg viewBox="0 0 300 350">
                      <path d="M-30 350 125 0M35 350 160 0M100 350 195 0M165 350 230 0M230 350 265 0M295 350 300 0" />
                    </svg>
                  ) : s.key === "cycling" ? (
                    <svg viewBox="0 0 300 350">
                      <circle cx="150" cy="175" r="115" />
                      <circle cx="150" cy="175" r="105" />
                      {Array.from({ length: 16 }, (_, i) => (
                        <line
                          key={i}
                          x1="150"
                          y1="175"
                          x2={150 + 104 * Math.cos((i * Math.PI) / 8)}
                          y2={175 + 104 * Math.sin((i * Math.PI) / 8)}
                        />
                      ))}
                      <circle cx="150" cy="175" r="12" />
                    </svg>
                  ) : s.key === "swimming" ? (
                    <svg viewBox="0 0 300 350">
                      {Array.from({ length: 10 }, (_, i) => (
                        <path
                          key={i}
                          d={`M-20 ${50 + i * 28}Q55 ${10 + i * 28} 130 ${50 + i * 28}T320 ${50 + i * 28}`}
                        />
                      ))}
                    </svg>
                  ) : null}
                </div>
              )}
              <span className="sport-number">{s.symbol} /</span>
              <div className="sport-caption">
                <h3>{s.name}</h3>
                <p>{s.caption}</p>
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
            <SectionLabel number="03">ELIGE TU SEGUIMIENTO</SectionLabel>
            <h2>
              La planificación
              <br />
              siempre es individual.
            </h2>
          </div>
          <p className="heading-copy">
            Lo que cambia es cuánto seguimiento necesitas. Frecuencia de
            contacto, rapidez de ajustes y profundidad del análisis.
          </p>
        </div>
        <Pricing />
        <div className="shared-features" data-reveal>
          <span className="micro">EN TODOS LOS PLANES</span>
          <ul>
            {sharedFeatures.map((f) => (
              <li key={f}>
                <span aria-hidden="true">
                  <Arrow diagonal />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BarcelonaSection />
      <section className="section philosophy" id="metodo">
        <div data-reveal>
          <SectionLabel number="05">EL PUNTO DE PARTIDA</SectionLabel>
          <h2>
            {copy.philosophy.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="philosophy-copy" data-reveal>
          <p className="lead">{copy.philosophy.description}</p>
          <p>
            Puede que tengas buena resistencia y poca velocidad. O mucha
            potencia y poca durabilidad. Incluso con el mismo deporte y
            objetivo, lo que necesitas trabajar puede ser distinto.
          </p>
          <div className="athlete-equation">
            MISMO DEPORTE <span>≠</span> MISMO ATLETA <span>≠</span> MISMO
            ENTRENAMIENTO
          </div>
        </div>
      </section>
      <section className="section profile dark-section" id="perfil">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="06">EL PERFIL FISIOLÓGICO</SectionLabel>
            <h2>
              Tu mapa
              <br />
              como atleta<span className="accent-text">.</span>
            </h2>
          </div>
          <div className="heading-copy">
            <p>
              Tu perfil nos ayuda a elegir qué trabajar ahora, tanto si preparas
              tu primer triatlón como si buscas un objetivo exigente.
            </p>
            <p className="muted">
              Tests de campo, ritmo, potencia, frecuencia cardiaca, sensaciones
              y competición. Lactato cuando aporta una decisión mejor.
            </p>
          </div>
        </div>
        <div data-reveal>
          <Curve />
        </div>
        <div className="profile-bottom">
          <p>
            Medimos para decidir.
            <br />
            <strong>No para acumular números.</strong>
          </p>
          <div>
            <span className="micro">LO QUE QUEREMOS QUE ENTIENDAS</span>
            <p>
              Dónde estás. Qué vemos. Qué queremos mejorar. Cómo lo vamos a
              entrenar. Y cómo comprobaremos si ha funcionado.
            </p>
          </div>
        </div>
      </section>
      <section className="section lactate" id="lactato">
        <div className="lactate-visual" data-reveal>
          {site.images.lactate ? (
            <Image
              src={site.images.lactate}
              alt="Valoración del atleta con un test de lactato"
              fill
              sizes="(max-width:760px) 100vw, 45vw"
            />
          ) : (
            <>
              <div className="sample-art" aria-hidden="true">
                <span>INFORMACIÓN</span>
                <svg viewBox="0 0 450 300" fill="none">
                  <path
                    d="M35 245H420M35 245V30"
                    stroke="currentColor"
                    opacity=".25"
                  />
                  <path
                    d="M40 228C145 228 210 218 261 187S345 103 405 40"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {[
                    [70, 227],
                    [150, 223],
                    [228, 203],
                    [292, 162],
                    [354, 100],
                    [405, 40],
                  ].map(([x, y]) => (
                    <g key={x}>
                      <circle cx={x} cy={y} r="6" fill="currentColor" />
                      <line
                        x1={x}
                        y1={y + 15}
                        x2={x}
                        y2="245"
                        stroke="currentColor"
                        opacity=".2"
                        strokeDasharray="3 7"
                      />
                    </g>
                  ))}
                </svg>
                <span>PARA DECIDIR MEJOR.</span>
              </div>
              <small>Esquema conceptual, sin valores clínicos.</small>
            </>
          )}
        </div>
        <div className="lactate-copy" data-reveal>
          <SectionLabel number="07">LACTATO, CUANDO APORTA</SectionLabel>
          <h2>
            Una herramienta más.
            <br />
            No un requisito.
          </h2>
          <p className="lead">
            El lactato no es el entrenamiento. Es información.
          </p>
          <p>
            Puede ayudar a estimar el primer umbral, analizar la zona del
            segundo, individualizar intensidades y comparar la respuesta
            metabólica entre valoraciones.
          </p>
          <div className="lactate-note">
            <span className="micro">TESTS OPCIONALES</span>
            <h3>Volver a medir. Entender la evolución.</h3>
            <p>
              Medimos cuando la información ayuda a decidir tu entrenamiento.
              Puedes contratar el test en pista por separado o aprovechar las
              condiciones de tu plan. Performance incluye un test cada seis
              meses.
            </p>
          </div>
        </div>
        <LactatePricing />
      </section>
      <section className="section audience">
        <div data-reveal>
          <span className="micro">ENTRENAR CON INTENCIÓN</span>
          <h2>
            Para empezar.
            <br />
            Para progresar.
            <br />
            Para competir.
          </h2>
          <p className="audience-subtitle">El rigor se adapta a tu nivel.</p>
        </div>
        <div data-reveal>
          <p>
            Si empiezas, construimos una base que puedas sostener. Si ya
            compites, afinamos lo que necesitas mejorar. Tu experiencia, tu
            objetivo y tu disponibilidad orientan cada decisión.
          </p>
          <a className="text-link" href="#contacto">
            Vamos a conocerte
            <Arrow diagonal />
          </a>
        </div>
      </section>
      {site.testimonials.length > 0 && (
        <section className="section testimonials">
          <SectionLabel number="—">EN PRIMERA PERSONA</SectionLabel>
          {site.testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.name} · {t.sport}
              </figcaption>
            </figure>
          ))}
        </section>
      )}
      <section className="section faq-section" id="faq">
        <div data-reveal>
          <SectionLabel number="08">SIN DUDAS EN LA SALIDA</SectionLabel>
          <h2>
            Lo que quizá
            <br />
            te estás preguntando.
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section contact-section dark-section" id="contacto">
        <div className="contact-copy" data-reveal>
          <SectionLabel number="09">
            EMPEZAMOS POR UNA CONVERSACIÓN
          </SectionLabel>
          <h2>
            Tienes un objetivo.
            <br />
            <span className="accent-text">
              Construyamos
              <br />
              el camino.
            </span>
          </h2>
          <p>
            Cuéntanos tu objetivo, el tiempo que tienes y lo que hoy te cuesta
            resolver. Empezamos escuchándote para encontrar el acompañamiento
            que encaja contigo.
          </p>
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
            ENTENDER AL ATLETA.
            <br />
            PRESCRIBIR CON SENTIDO.
            <br />
            MEDIR LA RESPUESTA.
            <br />
            ADAPTAR EL ENTRENAMIENTO.
          </span>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
