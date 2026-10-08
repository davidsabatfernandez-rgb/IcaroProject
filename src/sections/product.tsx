import { Arrow, SectionLabel } from "@/components/ui";
import { barcelonaCopy } from "@/data/product";
import "./product.css";

export function BarcelonaSection() {
  return (
    <section
      className="barcelona-section"
      id="barcelona"
      aria-labelledby="barcelona-title"
    >
      <div className="barcelona-inner">
        <div className="barcelona-copy" data-reveal>
          <SectionLabel number="06">{barcelonaCopy.label}</SectionLabel>
          <h2 id="barcelona-title">
            También,
            <br />a pie de atleta.
          </h2>
          <p className="barcelona-subtitle">{barcelonaCopy.subtitle}</p>
          <p>{barcelonaCopy.description}</p>
          <a className="button ink" href="#contacto">
            {barcelonaCopy.action}
            <Arrow diagonal />
          </a>
          <small>{barcelonaCopy.details}</small>
        </div>
        <div
          className="barcelona-marker"
          aria-label="Técnica en dos centros de Barcelona"
        >
          <span className="micro">BARCELONA · TÉCNICA PRESENCIAL</span>
          <strong>
            Online.
            <br />Y cerca de ti.
          </strong>
          <div className="barcelona-steps">
            <span>
              <i aria-hidden="true">01</i>Observamos cómo te mueves.
            </span>
            <span>
              <i aria-hidden="true">02</i>Trabajamos las correcciones contigo.
            </span>
            <span>
              <i aria-hidden="true">03</i>Lo llevamos a tu entrenamiento.
            </span>
          </div>
          <span className="barcelona-tag">
            Dos centros en Barcelona
            <Arrow diagonal />
          </span>
        </div>
      </div>
    </section>
  );
}
