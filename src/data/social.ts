/** Public community configuration. Publish only details confirmed by ICARO. */
export type SocialActivity = "run" | "ride";

export type VerifiedSocialLink = {
  url: string;
  /** Set true only after opening the URL and checking its destination. */
  verified: boolean;
  /** Exact hostname checked by the editor, without protocol or path. */
  host: string;
};

export type SocialEvent = {
  id: string;
  type: SocialActivity;
  title: string;
  status: "draft" | "published" | "cancelled";
  confirmed: boolean;
  /** ISO date and time with an explicit +01:00 or +02:00 Madrid offset. */
  startsAt: string;
  timeZone: "Europe/Madrid";
  meetingPoint: string;
  route: { description: string; distancesKm: number[] };
  groups: { name: string; description: string }[];
  requirements: string[];
  conditions: string;
  safetyRecommendations: string[];
  registration?: VerifiedSocialLink;
};

/** No dates, meeting places or registration destinations have been confirmed. */
export const socialEvents: SocialEvent[] = [];

/** Keep empty until the official destinations have been checked. */
export const socialLinks: {
  instagram: VerifiedSocialLink;
  strava: VerifiedSocialLink;
} = {
  instagram: { url: "", verified: false, host: "" },
  strava: { url: "", verified: false, host: "" },
};

export const socialActivities = [
  {
    id: "runs",
    type: "run",
    name: "SOCIAL RUNS",
    title: "DIFERENTES RITMOS. EL MISMO PUNTO DE ENCUENTRO.",
    description:
      "Quedadas para correr, compartir kilómetros y conocer a otros corredores. Organizamos ritmos, grupos y distancias según los participantes y el recorrido: desde quien está construyendo su base hasta quien prepara su próxima competición.",
    shortDescription:
      "Compartir kilómetros con organización: ritmos, grupos y distancias adaptados a los participantes. Para quienes empiezan, progresan o compiten.",
    cta: "DESCUBRIR SOCIAL RUNS",
    interest: "social_run",
    sport: "Carrera",
    source: "social-runs",
    image: "running",
    imageAlt: "Corredor junto al mar al atardecer",
    advice: [
      {
        title: "Un grupo con sentido",
        text: "Consulta el ritmo, la distancia y las condiciones de cada quedada. Elegir un grupo acorde a tu preparación permite compartir la sesión con un objetivo claro.",
      },
      {
        title: "Tu objetivo tiene su espacio",
        text: "Una salida compartida puede formar parte de tu semana. Si sigues un plan, coordínala con tu preparación y respeta la intensidad que te corresponde.",
      },
    ],
  },
  {
    id: "rides",
    type: "ride",
    name: "SOCIAL RIDES",
    title: "SALIMOS JUNTOS. CADA UNO CON SU OBJETIVO.",
    description:
      "Salidas de ciclismo en grupo para disfrutar del recorrido y compartir el deporte. Adaptamos la organización a las capacidades y experiencia de los participantes, con grupos y rutas definidos para cada salida.",
    shortDescription:
      "Ciclismo en grupo, rutas compartidas y compañerismo. La organización tiene en cuenta la capacidad, la experiencia y los objetivos de cada participante.",
    cta: "DESCUBRIR SOCIAL RIDES",
    interest: "social_ride",
    sport: "Ciclismo",
    source: "social-rides",
    image: "cycling",
    imageAlt: "Ciclista en bicicleta de carretera en una ruta asfaltada",
    advice: [
      {
        title: "La ruta define la salida",
        text: "Antes de decidir, revisa la distancia, el recorrido, los grupos y los requisitos publicados. La experiencia en carretera y en grupo también cuenta.",
      },
      {
        title: "Rodar con responsabilidad",
        text: "Respeta las normas de circulación y las indicaciones de organización. Revisa la bicicleta, lleva casco y prepara agua, alimentación y material básico para el recorrido.",
      },
    ],
  },
] as const;

export function verifiedSocialUrl(
  link: VerifiedSocialLink | undefined,
  allowedHosts?: readonly string[],
): string | null {
  if (!link?.verified || !link.url || !link.host) return null;
  try {
    const url = new URL(link.url);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      url.hostname !== link.host.toLowerCase() ||
      !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(
        url.hostname,
      ) ||
      (allowedHosts && !allowedHosts.includes(url.hostname))
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Reject incomplete, cancelled or elapsed events before showing a public date. */
export function isUpcomingSocialEvent(
  event: SocialEvent,
  now = Date.now(),
): boolean {
  if (
    event.status !== "published" ||
    !event.confirmed ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.id) ||
    !["run", "ride"].includes(event.type) ||
    event.timeZone !== "Europe/Madrid" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\+0[12]:00$/.test(event.startsAt) ||
    !hasText(event.title) ||
    !hasText(event.meetingPoint) ||
    !hasText(event.route?.description) ||
    !event.route?.distancesKm.length ||
    !event.route.distancesKm.every(
      (distance) => Number.isFinite(distance) && distance > 0,
    ) ||
    !event.groups.length ||
    !event.groups.every(
      (group) => hasText(group.name) && hasText(group.description),
    ) ||
    !event.requirements.length ||
    !event.requirements.every(hasText) ||
    !hasText(event.conditions) ||
    !event.safetyRecommendations.length ||
    !event.safetyRecommendations.every(hasText)
  )
    return false;

  const timestamp = Date.parse(event.startsAt);
  if (!Number.isFinite(timestamp) || timestamp <= now) return false;
  // Madrid's daylight-saving offset must agree with the specified local time.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: event.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(timestamp);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((value) => value.type === type)?.value;
  const madridLocal = `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
  return madridLocal === event.startsAt.slice(0, 16);
}

export function upcomingSocialEvents(
  events: readonly SocialEvent[] = socialEvents,
  now = Date.now(),
): SocialEvent[] {
  const seen = new Set<string>();
  return events
    .filter((event) => {
      if (!isUpcomingSocialEvent(event, now) || seen.has(event.id))
        return false;
      seen.add(event.id);
      return true;
    })
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

export function socialEventDate(event: SocialEvent): string {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: event.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(event.startsAt));
}

export function socialEventTime(event: SocialEvent): string {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: event.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(event.startsAt));
}
