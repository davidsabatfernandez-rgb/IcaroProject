import Image from "next/image";
import { site, whatsappUrl } from "@/config/site";
import { copy, process, sharedFeatures, faqs, sports } from "@/data/content";
import { Arrow, LoopArrow, RouteArt, SectionLabel } from "@/components/ui";
import { Curve } from "@/components/curve";
import { Pricing } from "@/components/pricing";
import { ContactForm } from "@/components/contact";
export function Landing() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            {copy.hero.eyebrow}
          </div>
          <h1>
            {copy.hero.title.map((line, i) => (
              <span key={line} className={i === 2 ? "accent-text" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button accent" href="#contacto">
              {copy.hero.primary}
              <Arrow diagonal />
            </a>
            <a className="text-link" href="#metodo">
              {copy.hero.secondary}
              <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          {site.images.hero ? (
            <Image
              src={site.images.hero}
              alt="Atleta de endurance durante un entrenamiento"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          ) : (
            <RouteArt />
          )}
          <div className="visual-coordinate">
            <span>NO HAY DOS ATLETAS IGUALES.</span>
            <span>TAMPOCO DOS CAMINOS.</span>
          </div>
          <span className="visual-index">I / P</span>
        </div>
        <div className="hero-bottom">
          <span>
            RUNNING <i /> CICLISMO <i /> NATACIÓN <i /> TRIATLÓN
          </span>
          <a href="#metodo" title="Explorar el método">
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
      <section className="section philosophy" id="metodo">
        <div data-reveal>
          <SectionLabel number="01">EL PUNTO DE PARTIDA</SectionLabel>
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
            <SectionLabel number="02">EL PERFIL FISIOLÓGICO</SectionLabel>
            <h2>
              Tu mapa
              <br />
              como atleta<span className="accent-text">.</span>
            </h2>
          </div>
          <div className="heading-copy">
            <p>
              No buscamos únicamente que entrenes más. Buscamos entender qué
              limita tu rendimiento y qué adaptación necesitas.
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
      <section className="section process-section">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="03">
              DEL CONTEXTO AL ENTRENAMIENTO
            </SectionLabel>
            <h2>
              Un método.
              <br />
              Tu recorrido.
            </h2>
          </div>
          <p className="heading-copy">
            Cada ciclo tiene una razón. Primero definimos la adaptación que
            buscamos; después elegimos el estímulo y la dosis que puedes
            tolerar.
          </p>
        </div>
        <div className="process-grid">
          {process.map((step, i) => (
            <article key={step.title} data-reveal>
              <span className="process-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <span className="process-arrow" aria-hidden="true">
                {i === 6 ? <LoopArrow /> : <Arrow diagonal />}
              </span>
            </article>
          ))}
        </div>
        <div className="cycle-line">
          <span>OBJETIVO</span>
          <Arrow />
          <span>ADAPTACIÓN</span>
          <Arrow />
          <span>ESTÍMULO + DOSIS</span>
          <Arrow />
          <span>RESPUESTA</span>
          <Arrow />
          <span>SIGUIENTE DECISIÓN</span>
        </div>
        <div className="evolution">
          <span className="micro">EL PERFIL SE ACTUALIZA CONTIGO</span>
          <p>
            Inicio <span>→</span> Primer bloque <span>→</span> Retest{" "}
            <span>→</span> Segundo bloque <span>→</span> Fase específica{" "}
            <span>→</span> Competición
          </p>
          <small>
            ¿Qué ha mejorado? ¿Qué sigue igual? ¿Qué limita ahora? ¿Qué
            entrenamos después?
          </small>
        </div>
      </section>
      <section className="section weekly">
        <div data-reveal>
          <SectionLabel number="04">ASÍ ES TU SEMANA</SectionLabel>
          <h2>
            Un plan vivo.
            <br />
            Una semana real.
          </h2>
        </div>
        <div className="weekly-timeline">
          {[
            {
              day: "VIERNES",
              title: "La próxima semana, con sentido.",
              text: "Recibes tu planificación. Revisamos lo realizado, tu respuesta, el ciclo, la fatiga, la disponibilidad y las competiciones.",
            },
            {
              day: "DURANTE LA SEMANA",
              title: "Entrenas. Nos cuentas.",
              text: "Registras datos, sensaciones y comentarios. La frecuencia de seguimiento y los ajustes dependen del plan elegido.",
            },
            {
              day: "DOMINGO",
              title: "Observar antes de seguir.",
              text: "Feedback semanal: qué ha funcionado, qué vigilamos y cómo estás respondiendo. Si el fin de semana cambia el contexto, adaptamos la programación.",
            },
          ].map((item, i) => (
            <article key={item.day} data-reveal>
              <div className="timeline-marker">0{i + 1}</div>
              <div>
                <span className="micro">{item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section plans-section" id="planes">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="05">ELIGE TU SEGUIMIENTO</SectionLabel>
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
        <Pricing />
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
          <SectionLabel number="06">LACTATO, CUANDO APORTA</SectionLabel>
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
              Aproximadamente un test cada tres meses, cuando sea útil. Se
              contrata aparte y los atletas activos tienen precio especial.
              Consúltanos las condiciones.
            </p>
          </div>
        </div>
      </section>
      <section className="sports-section">
        <div className="section sports-heading" data-reveal>
          <SectionLabel number="07">
            CUATRO DISCIPLINAS. EL MISMO CRITERIO.
          </SectionLabel>
          <h2>
            Tu deporte.
            <br />
            Nuestra forma de trabajar.
          </h2>
        </div>
        <div className="sports-grid">
          {sports.map((s) => (
            <article className={`sport sport-${s.key}`} key={s.key}>
              {site.images[s.key] ? (
                <Image
                  src={site.images[s.key]}
                  alt={`Entrenamiento de ${s.name.toLowerCase()}`}
                  fill
                  sizes="(max-width:600px) 50vw, 25vw"
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
                  ) : (
                    <svg viewBox="0 0 300 350">
                      <path d="m150 50 120 220H30Z" />
                      <path d="m150 83 93 170H57Z" />
                      <path d="m150 116 65 120H85Z" />
                    </svg>
                  )}
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
      <section className="section audience">
        <div data-reveal>
          <span className="micro">ENTRENAR CON INTENCIÓN</span>
          <h2>
            No necesitas
            <br />
            ser profesional.
          </h2>
          <p className="audience-subtitle">
            Pero sí querer entender tu entrenamiento.
          </p>
        </div>
        <div data-reveal>
          <p>
            Un objetivo deportivo. Una vida con horarios. Ganas de mejorar con
            estructura, feedback y un plan que evolucione contigo.
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
            Cuéntanos dónde estás y qué te gustaría conseguir. El primer paso es
            entenderte.
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
