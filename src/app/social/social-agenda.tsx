import { Arrow } from "@/components/ui";
import { EnquiryLink } from "@/components/enquiry-link";
import {
  socialEventDate,
  socialEventTime,
  verifiedSocialUrl,
  type SocialEvent,
} from "@/data/social";

export function SocialAgenda({ events }: { events: readonly SocialEvent[] }) {
  if (!events.length) {
    return (
      <div className="social-agenda-empty">
        <p className="micro">LA PRÓXIMA SALIDA EMPIEZA AQUÍ</p>
        <h3>Próximas quedadas en preparación.</h3>
        <p>
          Publicaremos cada encuentro cuando estén confirmados la fecha, el
          punto de salida, el recorrido y los grupos. Mientras tanto, cuéntanos
          si te interesan los Social Runs o los Social Rides.
        </p>
        <div className="social-actions">
          <EnquiryLink
            href="#participar"
            className="button accent"
            interest="social_run"
            sport="Carrera"
            source="social-agenda-runs"
          >
            Consultar próximo Social Run <Arrow diagonal />
          </EnquiryLink>
          <EnquiryLink
            href="#participar"
            className="button outline"
            interest="social_ride"
            sport="Ciclismo"
            source="social-agenda-rides"
          >
            Consultar próximo Social Ride <Arrow diagonal />
          </EnquiryLink>
        </div>
        <p className="social-small">
          Enviar una consulta no reserva una plaza ni contrata un plan.
        </p>
      </div>
    );
  }

  return (
    <div className="social-agenda-events">
      {events.map((event) => {
        const registrationUrl = verifiedSocialUrl(event.registration);
        return (
          <article className="social-event" key={event.id}>
            <div className="social-event-heading">
              <div>
                <p className="micro">
                  {event.type === "run" ? "SOCIAL RUN" : "SOCIAL RIDE"}
                </p>
                <h3>{event.title}</h3>
              </div>
              <time dateTime={event.startsAt}>
                {socialEventDate(event)}
                <span>{socialEventTime(event)} · hora de Madrid</span>
              </time>
            </div>
            <dl className="social-event-details">
              <div>
                <dt>Punto de encuentro</dt>
                <dd>{event.meetingPoint}</dd>
              </div>
              <div>
                <dt>Recorrido previsto</dt>
                <dd>{event.route.description}</dd>
              </div>
              <div>
                <dt>Distancias</dt>
                <dd>
                  {event.route.distancesKm
                    .map((distance) => `${distance.toLocaleString("es-ES")} km`)
                    .join(" / ")}
                </dd>
              </div>
              <div>
                <dt>Grupos disponibles</dt>
                <dd>
                  <ul>
                    {event.groups.map((group) => (
                      <li key={group.name}>
                        <strong>{group.name}.</strong> {group.description}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Requisitos</dt>
                <dd>
                  <ul>
                    {event.requirements.map((requirement) => (
                      <li key={requirement}>{requirement}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Condiciones de participación</dt>
                <dd>{event.conditions}</dd>
              </div>
              <div>
                <dt>Recomendaciones de seguridad</dt>
                <dd>
                  <ul>
                    {event.safetyRecommendations.map((recommendation) => (
                      <li key={recommendation}>{recommendation}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            {registrationUrl ? (
              <a
                className="text-link"
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Consultar e inscribirse en ${event.title} (abre en otra pestaña)`}
                data-track="cta_click"
                data-track-source={`social-event-${event.id}`}
                data-track-interest={
                  event.type === "run" ? "social_run" : "social_ride"
                }
              >
                Consultar e inscribirme <Arrow diagonal />
              </a>
            ) : (
              <EnquiryLink
                href="#participar"
                className="text-link"
                interest={event.type === "run" ? "social_run" : "social_ride"}
                sport={event.type === "run" ? "Carrera" : "Ciclismo"}
                source={`social-event-${event.id}`}
              >
                Consultar esta salida <Arrow diagonal />
              </EnquiryLink>
            )}
          </article>
        );
      })}
    </div>
  );
}
