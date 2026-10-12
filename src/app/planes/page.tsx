import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryLink } from "@/components/enquiry-link";
import { Pricing } from "@/components/pricing";
import { Arrow } from "@/components/ui";
import { WeeklySchedule } from "@/sections/value";
import { site } from "@/config/site";
import styles from "./plans.module.css";

const canonical = `${site.url}/planes`;
const description =
  "Compara Individual, Seguimiento y Rendimiento: planificación individual, revisión semanal, consultas y llamadas. Encuentra tu acompañamiento en ICARO.";

export const metadata: Metadata = {
  title: "Planes de entrenamiento individualizado · ICARO PROJECT",
  description,
  alternates: { canonical },
  openGraph: {
    title: "Tu preparación. Tu nivel de acompañamiento. · ICARO PROJECT",
    description,
    url: canonical,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ICARO PROJECT. Entrena con criterio. Comparte el camino.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planes de entrenamiento · ICARO PROJECT",
    description,
    images: ["/opengraph-image"],
  },
};

export default function PlansPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="plans-page-title">
        <div>
          <p className="eyebrow">
            ICARO PERFORMANCE / ACOMPAÑAMIENTO INDIVIDUAL
          </p>
          <h1 id="plans-page-title">
            TU PREPARACIÓN.
            <br />
            TU NIVEL DE
            <br />
            ACOMPAÑAMIENTO.
          </h1>
        </div>
        <div className={styles.intro}>
          <p>
            La individualización está en los tres planes. La diferencia es cómo
            revisamos tu evolución, la profundidad del análisis y el contacto
            que quieres tener con tu entrenador.
          </p>
          <p>
            Empezamos por entender tu objetivo, tu experiencia y el tiempo del
            que dispones. Después elegimos contigo el seguimiento que tenga
            sentido.
          </p>
          <EnquiryLink
            className="button accent"
            interest="coaching"
            source="pagina-planes-hero"
            plan="Seguimiento"
          >
            Solicitar valoración inicial <Arrow diagonal />
          </EnquiryLink>
          <a className="text-link" href="#planes">
            Comparar los tres planes <Arrow />
          </a>
        </div>
      </section>

      <section
        className={styles.week}
        aria-label="Organización de la semana en todos los planes"
      >
        <WeeklySchedule />
      </section>

      <section
        className={styles.plans}
        id="planes"
        aria-labelledby="plans-comparison-title"
      >
        <div className={styles.heading}>
          <div>
            <span className="micro">
              EL PLAN ES PERSONAL. EL CONTACTO LO ELIGES TÚ.
            </span>
            <h2 id="plans-comparison-title">
              TRES FORMAS DE
              <br />
              TRABAJAR JUNTOS.
            </h2>
          </div>
          <p>
            Consulta qué incluye cada modalidad, sus horarios de comunicación y
            la frecuencia de llamadas. Te explicamos la cuota y las condiciones
            antes de empezar.
          </p>
        </div>
        <Pricing source="pagina-planes" />
      </section>

      <section className={styles.next} aria-labelledby="plans-next-title">
        <div>
          <span className="micro">ANTES DE DECIDIR</span>
          <h2 id="plans-next-title">
            HABLEMOS DE
            <br />
            LO QUE NECESITAS.
          </h2>
        </div>
        <div>
          <p>
            No tienes que saber de antemano qué seguimiento elegir. Cuéntanos
            qué quieres preparar y cómo encaja el entrenamiento en tu vida.
          </p>
          <EnquiryLink
            className="button accent"
            interest="coaching"
            source="pagina-planes-final"
          >
            Contar mi objetivo <Arrow diagonal />
          </EnquiryLink>
          <Link className="text-link" href="/#metodo">
            Conocer el método de ICARO <Arrow diagonal />
          </Link>
        </div>
      </section>
    </main>
  );
}
