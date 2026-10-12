import Image from "next/image";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/ui";
import { site } from "@/config/site";
import { socialActivities } from "@/data/social";
import "./social-club.css";

export function SocialClubSection() {
  return (
    <section
      className="section social-club"
      id="comunidad"
      aria-labelledby="social-club-title"
    >
      <div className="social-club-heading">
        <div>
          <SectionLabel number="03">ICARO COMMUNITY</SectionLabel>
          <h2 id="social-club-title">ICARO SOCIAL CLUB</h2>
        </div>
        <div>
          <p className="social-club-statement">
            TU PLAN ES INDIVIDUAL. EL CAMINO NO TIENE POR QUÉ SERLO.
          </p>
          <p>
            Entrena con criterio. Comparte el camino. Encuentros de resistencia
            con grupos y recorridos para distintas experiencias y objetivos.
          </p>
        </div>
      </div>
      <div className="social-club-activities">
        {socialActivities.map((activity) => (
          <article className="social-club-activity" key={activity.id}>
            <div className="social-club-photo">
              <Image
                src={site.images[activity.image]}
                alt={activity.imageAlt}
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
              />
              <span className="social-club-photo-label">{activity.name}</span>
            </div>
            <div className="social-club-copy">
              <h3>{activity.title}</h3>
              <p>{activity.shortDescription}</p>
              <Link
                className="text-link"
                href={`/social#${activity.id}`}
                data-track="cta_click"
                data-track-interest={activity.interest}
                data-track-source={`home-${activity.source}`}
                data-track-sport={activity.sport}
              >
                {activity.cta} <Arrow diagonal />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="social-club-bottom">
        <p>
          Entrenamientos presenciales semanales cuando estén programados.
          Consulta la agenda, los grupos y las condiciones de cada encuentro.
        </p>
        <Link className="text-link" href="/social#agenda">
          Ver próximas quedadas <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
