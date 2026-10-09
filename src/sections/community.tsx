import { site } from "@/config/site";
import { Arrow, SectionLabel } from "@/components/ui";
import "./community.css";

export function CommunitySection() {
  const groupUrl = site.community.instagramGroupUrl;
  return (
    <section
      className="section community-section"
      id="comunidad"
      aria-labelledby="community-title"
    >
      <div className="community-intro">
        <SectionLabel number="02">
          MÁS QUE UN PLAN DE ENTRENAMIENTO
        </SectionLabel>
        <h2 id="community-title">
          Tu reto es personal.
          <br />
          El camino, compartido.
        </h2>
        <p>
          Hay días en los que entrenar sale solo y otros en los que cuesta
          empezar. En ICARO queremos conocerte más allá de tus ritmos: qué te
          ilusiona, qué te frena y qué lugar ocupa el deporte en tu vida. Somos
          entrenamiento personalizado y una comunidad con la que compartirlo,
          también en los entrenamientos presenciales.
        </p>
        <a className="text-link" href="#barcelona">
          Conoce el trabajo presencial <Arrow diagonal />
        </a>
      </div>
      <div className="community-invitation">
        <span className="community-badge">SOCIAL ICARO · GRATIS</span>
        <h3>Únete a nuestro grupo.</h3>
        <p>
          Tu primera carrera, un triatlón o combinar resistencia y fuerza: cada
          persona llega con una historia. En nuestro grupo de Instagram puedes
          compartir la tuya, conectar con otras personas y sentirte parte de
          ICARO. No necesitas un dorsal ni un ritmo concreto para empezar.
        </p>
        {groupUrl ? (
          <a
            className="button accent"
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Únete a Social ICARO en Instagram (abre en una pestaña nueva)"
          >
            Únete al grupo <Arrow diagonal />
          </a>
        ) : (
          <p className="community-link-pending">
            El enlace directo al grupo estará disponible próximamente.
          </p>
        )}
        <small>
          El grupo Social ICARO es gratuito. Los planes de entrenamiento y las
          sesiones presenciales se consultan por separado.
        </small>
      </div>
      <div className="community-reasons">
        <h3>¿Por qué Ícaro?</h3>
        <div className="community-reasons-grid">
          <article>
            <span className="micro">01 · CRITERIO</span>
            <h4>Un plan que parte de ti.</h4>
            <p>
              Tu disponibilidad, tu perfil y tu respuesta al entrenamiento guían
              las decisiones. Cada semana te explicamos qué buscamos y por qué.
            </p>
          </article>
          <article>
            <span className="micro">02 · CERCANÍA</span>
            <h4>Un entrenador y un equipo.</h4>
            <p>
              Feedback semanal para avanzar con contexto y una comunidad para
              compartir el proceso. Queremos que te sientas parte de ICARO.
            </p>
          </article>
          <article>
            <span className="micro">03 · ENCUENTRO</span>
            <h4>También a pie de atleta.</h4>
            <p>
              Entrenamientos presenciales y trabajo de técnica en dos centros de
              Barcelona. El acompañamiento continúa más allá del calendario.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
