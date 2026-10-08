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
          Tu entrenamiento.
          <br />
          Nuestra comunidad.
        </h2>
        <p>
          Somos un servicio de entrenamiento individualizado y una comunidad de
          atletas. Queremos conocerte, acompañarte y compartir el camino
          contigo, también con entrenamientos presenciales.
        </p>
        <a className="text-link" href="#barcelona">
          Conoce el trabajo presencial <Arrow diagonal />
        </a>
      </div>
      <div className="community-invitation">
        <span className="community-badge">SOCIAL ICARO · GRATIS</span>
        <h3>Únete a nuestro grupo.</h3>
        <p>
          Un espacio en Instagram para conectar con la comunidad ICARO y
          compartir tu interés por entrenar. Puedes empezar por aquí, estés
          donde estés en tu camino deportivo.
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
