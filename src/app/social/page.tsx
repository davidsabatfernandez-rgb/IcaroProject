import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact";
import { EnquiryLink } from "@/components/enquiry-link";
import { Arrow } from "@/components/ui";
import { site } from "@/config/site";
import {
  socialActivities,
  socialLinks,
  upcomingSocialEvents,
  verifiedSocialUrl,
} from "@/data/social";
import { SocialAgenda } from "./social-agenda";
import "./social.css";

const description =
  "ICARO Social Club: Social Runs y Social Rides con grupos y recorridos para diferentes niveles. Consulta próximas quedadas, organización y condiciones de participación.";

export const metadata: Metadata = {
  title: "ICARO Social Club · Social Runs y Social Rides",
  description,
  alternates: { canonical: `${site.url}/social` },
  openGraph: {
    title: "ICARO Social Club · Comparte el camino",
    description,
    url: `${site.url}/social`,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ICARO PROJECT. Rendimiento y comunidad.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ICARO Social Club · Comparte el camino",
    description,
    images: ["/opengraph-image"],
  },
};

export default async function SocialPage() {
  // Recheck the current time on each request so expired events leave the agenda.
  await connection();
  const events = upcomingSocialEvents();
  const instagramUrl = verifiedSocialUrl(socialLinks.instagram, [
    "instagram.com",
    "www.instagram.com",
  ]);
  const stravaUrl = verifiedSocialUrl(socialLinks.strava, [
    "strava.com",
    "www.strava.com",
  ]);

  return (
    <>
      <Header />
      <main id="contenido" className="social-page">
        <section className="social-hero" aria-labelledby="social-title">
          <div className="social-hero-copy">
            <p className="eyebrow">ICARO COMMUNITY / DEPORTES DE RESISTENCIA</p>
            <h1 id="social-title">
              ICARO
              <br />
              SOCIAL CLUB.
            </h1>
            <p className="social-hero-statement">
              TU PLAN ES INDIVIDUAL.
              <br />
              EL CAMINO NO TIENE POR QUÉ SERLO.
            </p>
            <p>
              Objetivos propios. Experiencias compartidas. Social Runs y Social
              Rides organizados por grupos y recorridos, con espacio para
              distintos niveles y ambiciones deportivas.
            </p>
            <div className="social-actions">
              <Link className="button accent" href="#runs">
                Social Runs <Arrow diagonal />
              </Link>
              <Link className="button outline" href="#rides">
                Social Rides <Arrow diagonal />
              </Link>
            </div>
            <Link className="social-agenda-link text-link" href="#agenda">
              Ver próximas quedadas <Arrow diagonal />
            </Link>
          </div>
          <figure className="social-hero-photo">
            <Image
              src={site.images.running}
              alt="Corredor junto al mar al atardecer"
              fill
              preload
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <figcaption>Fotografía editorial de resistencia</figcaption>
          </figure>
        </section>

        <section
          className="social-introduction"
          aria-labelledby="social-intro-title"
        >
          <p className="micro">ENTRENA CON CRITERIO. COMPARTE EL CAMINO.</p>
          <h2 id="social-intro-title">
            DIFERENTES OBJETIVOS.
            <br />
            LA MISMA COMUNIDAD.
          </h2>
          <div>
            <p>
              La exigencia del entrenamiento y el placer de compartirlo pueden
              ir juntos. La organización por grupos, ritmos y recorridos permite
              que cada participante encuentre una salida acorde a su experiencia
              y preparación.
            </p>
            <p>
              Puedes consultar las quedadas sin contratar un plan. Los
              entrenamientos presenciales semanales se realizan cuando están
              programados, con condiciones específicas para cada encuentro.
            </p>
          </div>
        </section>

        <div className="social-activities">
          {socialActivities.map((activity) => (
            <section
              className={`social-activity social-activity-${activity.id}`}
              id={activity.id}
              aria-labelledby={`social-${activity.id}-title`}
              key={activity.id}
            >
              <figure className="social-activity-photo">
                <Image
                  src={site.images[activity.image]}
                  alt={activity.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 43vw"
                />
                <figcaption>
                  Fotografía editorial de {activity.sport.toLowerCase()}
                </figcaption>
              </figure>
              <div className="social-activity-copy">
                <p className="eyebrow">{activity.name}</p>
                <h2 id={`social-${activity.id}-title`}>{activity.title}</h2>
                <p className="social-activity-description">
                  {activity.description}
                </p>
                <div className="social-activity-advice">
                  {activity.advice.map((advice) => (
                    <div key={advice.title}>
                      <h3>{advice.title}</h3>
                      <p>{advice.text}</p>
                    </div>
                  ))}
                </div>
                <EnquiryLink
                  className="button accent"
                  href="#participar"
                  interest={activity.interest}
                  sport={activity.sport}
                  source={activity.source}
                >
                  Consultar próximo Social{" "}
                  {activity.type === "run" ? "Run" : "Ride"}
                  <Arrow diagonal />
                </EnquiryLink>
              </div>
            </section>
          ))}
        </div>

        <section
          className="social-agenda"
          id="agenda"
          aria-labelledby="social-agenda-title"
        >
          <div className="social-section-heading">
            <div>
              <p className="eyebrow">AGENDA DE LA COMUNIDAD</p>
              <h2 id="social-agenda-title">PRÓXIMAS QUEDADAS.</h2>
            </div>
            <p>
              Lugar, fecha, recorrido y grupos: toda la información para decidir
              qué encuentro encaja contigo. Consulta los requisitos y las
              condiciones antes de participar.
            </p>
          </div>
          <SocialAgenda events={events} />
        </section>

        <section
          className="social-organization"
          aria-labelledby="social-organization-title"
        >
          <div>
            <p className="eyebrow">ANTES DE SALIR</p>
            <h2 id="social-organization-title">COMPARTIR TAMBIÉN ES CUIDAR.</h2>
          </div>
          <ol>
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h3>Elige con información.</h3>
                <p>
                  Revisa el recorrido, la distancia, los grupos y los
                  requisitos. Si tienes dudas sobre tu experiencia o
                  preparación, consulta antes de participar.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h3>Prepara el encuentro.</h3>
                <p>
                  Comprueba los detalles de la convocatoria y el material
                  recomendado. Ten en cuenta la meteorología, la hidratación y
                  las características de la ruta.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h3>Respeta el recorrido y al grupo.</h3>
                <p>
                  Sigue las indicaciones de organización, las normas de
                  circulación y los espacios compartidos. Comunica cualquier
                  incidencia y evita asumir riesgos para mantener un ritmo.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className="social-connections"
          aria-labelledby="social-connections-title"
        >
          <div>
            <p className="eyebrow">DENTRO Y FUERA DEL ENTRENAMIENTO</p>
            <h2 id="social-connections-title">EL CAMINO CONTINÚA.</h2>
          </div>
          <div>
            <h3>Social ICARO, nuestro grupo gratuito en Instagram.</h3>
            <p>
              Un espacio para conectar con otros atletas y compartir
              experiencias. El grupo es gratuito; cada actividad presencial
              tiene sus propias condiciones de participación.
            </p>
            {instagramUrl ? (
              <a
                className="text-link"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Únete a Social ICARO en Instagram <Arrow diagonal />
              </a>
            ) : (
              <p className="social-small">
                Publicaremos el enlace directo al grupo cuando esté disponible.
                Mientras tanto, puedes consultar cómo participar en la
                comunidad.
              </p>
            )}
            {stravaUrl && (
              <a
                className="text-link"
                href={stravaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conoce el club en Strava <Arrow diagonal />
              </a>
            )}
          </div>
        </section>

        <section
          className="social-participation"
          id="participar"
          aria-labelledby="social-participation-title"
        >
          <div className="social-participation-copy">
            <p className="eyebrow">TU PRÓXIMO PUNTO DE ENCUENTRO</p>
            <h2 id="social-participation-title">¿CORREMOS O RODAMOS?</h2>
            <p>
              Cuéntanos qué actividad te interesa y tu experiencia. Te
              explicaremos cómo se organizan las próximas salidas y dónde
              consultar sus condiciones.
            </p>
            <p className="social-small">
              Esta consulta es sobre la comunidad. No necesitas elegir un plan
              de entrenamiento y el envío no confirma una inscripción.
            </p>
            <Link className="text-link" href="/#planes">
              Si buscas entrenamiento individual, conoce los planes{" "}
              <Arrow diagonal />
            </Link>
          </div>
          <div className="social-participation-form">
            <ContactForm
              initialInterest="collective"
              initialSource="social-form"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
