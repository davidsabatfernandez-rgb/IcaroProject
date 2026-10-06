import { Arrow, SectionLabel } from "@/components/ui";
import { barcelonaCopy, productCopy, trainingFlow } from "@/data/product";
import "./product.css";

type FlowIconName = (typeof trainingFlow)[number]["icon"];

function FlowIcon({ name }: { name: FlowIconName }) {
  return (
    <svg
      className="product-flow-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "plan" && (
        <>
          <path d="M11 10h26v29H11zM11 18h26M17 7v6M31 7v6" />
          <path d="M17 25h4M27 25h4M17 32h4M27 32h4" />
        </>
      )}
      {name === "watch" && (
        <>
          <rect x="14" y="14" width="20" height="20" rx="4" />
          <path d="m18 14 1-7h10l1 7M18 34l1 7h10l1-7M24 19v6l4 2M34 21h3" />
        </>
      )}
      {name === "review" && (
        <>
          <path d="M9 12h30v23H21l-9 6v-6H9z" />
          <path d="m15 25 6 4 7-10 5 5" />
        </>
      )}
    </svg>
  );
}

export function ProductSection() {
  return (
    <section
      className="section product-section"
      id="como-funciona"
      aria-labelledby="product-title"
    >
      <div className="product-heading" data-reveal>
        <div>
          <SectionLabel number="01">{productCopy.label}</SectionLabel>
          <h2 id="product-title">
            {productCopy.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="product-intro">
          <p>{productCopy.description}</p>
          <a className="text-link" href="#planes">
            {productCopy.primaryAction}
            <Arrow />
          </a>
        </div>
      </div>

      <ol className="product-flow" aria-label="Cómo entrenas con ICARO">
        {trainingFlow.map((step, index) => (
          <li className="product-step" key={step.number} data-reveal>
            <div className="product-step-top">
              <span className="product-step-number">{step.number}</span>
              <FlowIcon name={step.icon} />
              {index < trainingFlow.length - 1 && (
                <span className="product-next" aria-hidden="true">
                  <Arrow />
                </span>
              )}
            </div>
            <span className="micro product-step-label">{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <span className="product-step-detail">{step.detail}</span>
          </li>
        ))}
      </ol>

      <div className="product-platform" data-reveal>
        <div className="product-platform-name">
          <span className="micro">NUESTRA PLATAFORMA DE TRABAJO</span>
          <p>
            TrainingPeaks
            <span aria-hidden="true">
              <Arrow diagonal />
            </span>
          </p>
        </div>
        <div className="product-platform-copy">
          <p>{productCopy.platformDescription}</p>
          <small>{productCopy.compatibility}</small>
        </div>
      </div>
    </section>
  );
}

export function BarcelonaSection() {
  return (
    <section
      className="barcelona-section"
      id="barcelona"
      aria-labelledby="barcelona-title"
    >
      <div className="barcelona-inner">
        <div className="barcelona-marker" aria-hidden="true">
          <span>BCN</span>
          <span>02</span>
          <span>CENTROS · TÉCNICA · CONTIGO</span>
        </div>
        <div className="barcelona-copy" data-reveal>
          <SectionLabel number="04">{barcelonaCopy.label}</SectionLabel>
          <h2 id="barcelona-title">{barcelonaCopy.title}</h2>
          <p className="barcelona-subtitle">{barcelonaCopy.subtitle}</p>
          <p>{barcelonaCopy.description}</p>
          <a className="button accent" href="#contacto">
            {barcelonaCopy.action}
            <Arrow diagonal />
          </a>
          <small>{barcelonaCopy.details}</small>
        </div>
      </div>
    </section>
  );
}
