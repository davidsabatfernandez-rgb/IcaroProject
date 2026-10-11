import { site } from "@/config/site";

export type Discipline = {
  id: string;
  label: string;
  formSport: string;
  statement: string;
  introduction: string;
  criteria: { label: string; text: string }[];
  image?: string;
  imageAlt?: string;
  visual: "triathlon" | "photo" | "swim" | "terrain" | "strength";
  action: string;
};

export const disciplines: Discipline[] = [
  {
    id: "triathlon",
    label: "Triatlón",
    formSport: "Triatlón",
    statement: "Tres disciplinas.\nUna preparación.",
    introduction:
      "Nuestra especialidad principal. La natación, el ciclismo y la carrera no son tres planes independientes: comparten tiempo, fatiga y un mismo objetivo.",
    criteria: [
      {
        label: "Perfil",
        text: "Qué disciplina condiciona más tu objetivo y cómo responde tu cuerpo al conjunto de la semana.",
      },
      {
        label: "Prioridad",
        text: "Coordinar los estímulos para trabajar lo que necesitas sin acumular sesiones que compitan entre sí.",
      },
      {
        label: "Aplicación",
        text: "Preparación específica, trabajo de fuerza y recuperación ajustados a tu distancia y disponibilidad.",
      },
    ],
    image: site.images.cycling,
    imageAlt: "Ciclista en carretera; fotografía editorial de deporte",
    visual: "triathlon",
    action: "Prepara tu triatlón",
  },
  {
    id: "running",
    label: "Running",
    formSport: "Running",
    statement: "El ritmo importa.\nEl proceso, también.",
    introduction:
      "Del objetivo en asfalto a la consistencia semanal. La preparación combina resistencia, trabajo específico y fuerza según tu experiencia y tu respuesta.",
    criteria: [
      {
        label: "Perfil",
        text: "Historial de entrenamiento, tolerancia al volumen y demandas de la distancia que quieres preparar.",
      },
      {
        label: "Prioridad",
        text: "Construir continuidad y dosificar el trabajo intenso sin convertir cada salida en un test.",
      },
      {
        label: "Aplicación",
        text: "Ritmo, frecuencia cardiaca y sensaciones para interpretar el esfuerzo; fuerza para acompañar la carrera.",
      },
    ],
    image: site.images.running,
    imageAlt:
      "Silueta de una persona junto al mar al atardecer; fotografía editorial",
    visual: "photo",
    action: "Cuéntanos tu objetivo de running",
  },
  {
    id: "trail",
    label: "Trail",
    formSport: "Trail",
    statement: "El terreno cambia.\nEl objetivo se concreta.",
    introduction:
      "Hablemos de tu objetivo en trail. La distancia por sí sola no describe sus exigencias: desnivel, terreno y tiempo de esfuerzo cambian el contexto de la preparación.",
    criteria: [
      {
        label: "Contexto",
        text: "Qué recorrido te planteas, qué experiencia tienes y a qué terreno puedes acceder para entrenar.",
      },
      {
        label: "Preguntas",
        text: "Cómo toleras las subidas, las bajadas y el esfuerzo prolongado; qué necesitas valorar antes de prescribir.",
      },
      {
        label: "Primer paso",
        text: "Conversar sobre tu caso y confirmar cómo podemos acompañarte en ese objetivo concreto.",
      },
    ],
    visual: "terrain",
    action: "Consulta tu objetivo en trail",
  },
  {
    id: "cycling",
    label: "Ciclismo",
    formSport: "Ciclismo",
    statement: "Más que vatios.\nCapacidad para sostenerlos.",
    introduction:
      "Potencia, percepción del esfuerzo y respuesta fisiológica aportan información diferente. Las interpretamos en relación con tu objetivo, sin exigir que dispongas de todos los sensores.",
    criteria: [
      {
        label: "Perfil",
        text: "Capacidad aeróbica, respuesta al esfuerzo y contexto de tus salidas o competiciones.",
      },
      {
        label: "Prioridad",
        text: "Elegir la duración y la intensidad que buscas sostener, con una progresión que puedas asimilar.",
      },
      {
        label: "Aplicación",
        text: "Sesiones estructuradas por potencia cuando hay potenciómetro, o con referencias de esfuerzo alternativas.",
      },
    ],
    image: site.images.cycling,
    imageAlt: "Ciclista rodando en carretera; fotografía editorial de deporte",
    visual: "photo",
    action: "Prepara tu objetivo de ciclismo",
  },
  {
    id: "swimming",
    label: "Natación",
    formSport: "Natación",
    statement: "Cada metro\ntiene un propósito.",
    introduction:
      "La velocidad se relaciona con la técnica y con la capacidad de sostener el gesto. Coordinamos objetivos de sesión, ritmos orientativos y recuperación según tu nivel y contexto.",
    criteria: [
      {
        label: "Perfil",
        text: "Experiencia en el agua, referencias de ritmo y objetivos de tu preparación.",
      },
      {
        label: "Prioridad",
        text: "Distinguir cuándo trabajar el gesto, cuándo acumular metros y cuándo aplicar un estímulo específico.",
      },
      {
        label: "Aplicación",
        text: "Series con una intención clara, pausas y referencias ajustables a lo que observamos en tu respuesta.",
      },
    ],
    image: site.images.swimming,
    imageAlt: "Nadadora realizando crol en una piscina; fotografía editorial",
    visual: "swim",
    action: "Cuéntanos tu objetivo en el agua",
  },
  {
    id: "strength",
    label: "Fuerza aplicada",
    formSport: "Atleta híbrido",
    statement: "Resistencia y fuerza.\nLa misma dirección.",
    introduction:
      "El atleta híbrido no necesita sumar estímulos sin criterio. Integramos la fuerza en una preparación de resistencia para que ambas tengan un propósito y una dosis coherente.",
    criteria: [
      {
        label: "Perfil",
        text: "Experiencia de fuerza, objetivo de resistencia y tiempo real para trabajar ambas capacidades.",
      },
      {
        label: "Prioridad",
        text: "Ajustar el volumen y la posición de las sesiones para gestionar la fatiga compartida.",
      },
      {
        label: "Aplicación",
        text: "Prescripción de resistencia y fuerza en TrainingPeaks, con recuperación y progresión revisables.",
      },
    ],
    visual: "strength",
    action: "Habla de tu preparación híbrida",
  },
];
