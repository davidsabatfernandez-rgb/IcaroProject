import { site } from "@/config/site";
export const navigation = [
  { label: "Método", href: "#metodo" },
  { label: "Tu preparación", href: "#como-funciona" },
  { label: "Disciplinas", href: "#disciplinas" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Planes", href: "#planes" },
  { label: "Tienda", href: "/tienda" },
  { label: "Artículos", href: "/articulos" },
];
export const copy = {
  hero: {
    eyebrow: "TRIATLÓN · CARRERA · ATLETA HÍBRIDO",
    title: ["Tu reto.", "Nuestro camino."],
    description:
      "Entrenar es hacer espacio para algo que te importa. Te acompañamos con un sistema personalizado que trabaja la resistencia sin olvidarse de la fuerza, una planificación en TrainingPeaks y una comunidad con la que compartir el camino.",
    primary: "Hablar con un entrenador",
    secondary: "Ver cómo empezamos",
  },
  philosophy: {
    title: "El plan empieza\npor entenderte.",
    description:
      "No entrenas en una hoja de cálculo. Entrenas en una vida real. Por eso, antes de decidir qué haces, necesitamos saber quién eres, qué buscas y qué puedes sostener.",
  },
};
export const sharedFeatures = [
  "Llamada inicial incluida en los tres planes",
  "Plan semanal individualizado en TrainingPeaks",
  "Resistencia y fuerza coordinadas según tu perfil y objetivo",
  "Disponibilidad enviada cada viernes",
  "Programación entre sábado y domingo",
  "Explicación de la semana anterior y objetivos de la siguiente",
  "Revisión semanal de tu entrenador",
  "Sincronización con dispositivos compatibles",
  "Trabajo por fortalezas, limitaciones y ciclos",
  "Pruebas de campo y zonas revisables",
  "Preparación de competición",
];
export const plans = [
  {
    id: "individual",
    number: "01",
    name: "Individual",
    label: "TU PLAN. TU AUTONOMÍA.",
    value: "Un plan claro para entrenar con criterio.",
    description:
      "Una preparación individualizada, explicada y revisada cada semana. Para quien prefiere organizarse con autonomía y recibir una orientación clara.",
    features: [
      "Análisis de sesiones importantes",
      "Revisión semanal por audios de WhatsApp",
      "Preparación de competición",
    ],
    contact: "Revisión semanal por WhatsApp.",
    detail:
      "Entre sábado y domingo recibes audios con la explicación de la semana anterior y los objetivos de la siguiente, junto a tu nueva programación.",
    call: "Sin llamadas de seguimiento",
    comparison: {
      communication: "Revisión semanal por audios de WhatsApp",
      calls: "Inicial incluida; sin llamadas de seguimiento",
      lactate: "Prueba opcional con condiciones para atletas del plan",
    },
    lactate: {
      headline: "Condiciones para atletas del plan",
      detail:
        "La prueba es opcional: te explicamos cuándo puede aportar información a tu preparación.",
    },
  },
  {
    id: "coaching",
    number: "02",
    name: "Seguimiento",
    label: "PLANIFICACIÓN Y CONTACTO REGULAR.",
    value: "Tu entrenamiento, en constante evolución.",
    description:
      "Un entrenador que interpreta tu respuesta y adapta el proceso contigo. Para quien quiere resolver dudas durante la semana y mantener una conversación regular.",
    features: [
      "Plan individual y revisión semanal",
      "Consultas diarias al entrenador",
      "Seguimiento y análisis más frecuentes",
      "Ajustes durante la semana",
      "Control de fatiga y respuesta",
    ],
    contact: "Consultas diarias con tu entrenador.",
    detail:
      "Comparte tus dudas, sensaciones y cambios de disponibilidad durante la semana. Estamos cerca para revisar contigo lo que necesitas.",
    call: "Llamada mensual",
    comparison: {
      communication: "Consultas diarias y ajustes durante la semana",
      calls: "Inicial incluida y una llamada mensual",
      lactate: "Prueba opcional con promoción trimestral",
    },
    lactate: {
      headline: "Promoción trimestral para tu prueba",
      detail:
        "Consulta las condiciones de la prueba opcional de lactato para atletas de Seguimiento.",
    },
  },
  {
    id: "performance",
    number: "03",
    name: "Rendimiento",
    label: "ANÁLISIS Y CONTACTO MÁS DIRECTOS.",
    value: "Una colaboración más profunda con tu rendimiento.",
    description:
      "Más proximidad para revisar decisiones, comparar ciclos y preparar la competición. Para quien busca un análisis en profundidad y una llamada cada semana.",
    features: [
      "Plan individual y revisión semanal",
      "Consultas diarias y contacto cercano",
      "Análisis profundo y adaptación continua",
      "Perfil longitudinal y comparación de ciclos",
      "Preparación detallada de competición",
    ],
    contact: "Contacto diario para todas tus dudas.",
    detail:
      "En la llamada semanal revisamos cómo fue la semana anterior y qué buscamos en la siguiente. Durante la semana estamos disponibles para resolver tus dudas.",
    call: "Llamada semanal",
    comparison: {
      communication: "Consultas diarias y análisis en profundidad",
      calls: "Inicial incluida y una llamada semanal",
      lactate: "Una prueba incluida cada 6 meses; opción trimestral",
    },
    lactate: {
      headline: "1 prueba incluida cada 6 meses",
      detail:
        "También puedes consultar la opción trimestral. Las pruebas se realizan cuando aportan información útil.",
    },
  },
] as const;
export const faqs = [
  [
    "¿Puedo combinar resistencia y fuerza?",
    "Sí. Puedes preparar triatlón o carrera incorporando fuerza, o trabajar con un enfoque de atleta híbrido. En la llamada inicial hablamos de tu experiencia, objetivo y material disponible. Coordinamos ambas capacidades en TrainingPeaks y ajustamos su distribución a tu disponibilidad y recuperación.",
  ],
  [
    "¿Puedo formar parte de Social ICARO sin contratar un plan?",
    "Sí. Social ICARO es nuestro grupo gratuito en Instagram para compartir el camino con la comunidad. Los planes personalizados y las sesiones presenciales tienen sus propias condiciones, que te explicamos antes de contratar.",
  ],
  [
    "¿Necesito entender los datos para empezar?",
    "No necesitas conocer las zonas ni saber fisiología. Te explicamos cuánto dura cada sesión, a qué intensidad hacerla y qué buscamos con ella. Utilizamos los datos que tengas disponibles junto con tus sensaciones; un potenciómetro no es un requisito para empezar.",
  ],
  [
    "¿La llamada inicial está incluida?",
    "Sí. Individual, Seguimiento y Rendimiento incluyen una llamada inicial para conocerte, resolver dudas y acordar objetivos concretos. Después, las llamadas de seguimiento dependen del plan: Individual no las incluye, Seguimiento tiene una mensual y Rendimiento una semanal.",
  ],
  [
    "¿Los entrenamientos llegan a mi reloj?",
    "Sí, puedes conectar TrainingPeaks con un dispositivo compatible para recibir los entrenamientos estructurados que admita tu modelo. La sincronización depende de la marca, la disciplina y el tipo de sesión. Te ayudamos con la configuración inicial.",
  ],
  [
    "¿Puedo trabajar la técnica de forma presencial?",
    "Sí. Tenemos la posibilidad de trabajar técnica en dos centros de Barcelona. Cuéntanos qué necesitas mejorar y te explicaremos las opciones, disponibilidad y condiciones antes de reservar.",
  ],
  [
    "¿Puedo centrar mi preparación en la carrera?",
    "Sí. El plan de una disciplina puede dedicarse a carrera, ciclismo o natación. La planificación es individualizada en los tres casos.",
  ],
  [
    "¿También trabajáis ciclismo y natación?",
    "Sí. Puedes trabajar una de estas disciplinas o combinar natación, ciclismo y carrera en el plan de triatlón.",
  ],
  [
    "¿Puedo preparar un triatlón de larga distancia?",
    "Sí. Empezamos valorando tu experiencia, disponibilidad y objetivo para construir una preparación que tenga en cuenta la interacción entre las tres disciplinas.",
  ],
  [
    "¿Qué pasa si viajo o cambia mi horario?",
    "La disponibilidad real forma parte del plan. Cuéntanos el cambio para ajustar la programación; la frecuencia de ajustes y contacto depende del seguimiento contratado.",
  ],
  [
    "¿Qué pasa si no puedo hacer un entrenamiento?",
    "Registra lo sucedido y avisa si afecta al siguiente entrenamiento. Revisaremos el contexto: una sesión perdida no se recupera automáticamente sumando carga.",
  ],
  [
    "¿Cada cuánto recibo mi planificación?",
    "Cada viernes nos envías tu disponibilidad para la siguiente semana. Entre sábado y domingo recibes la programación en TrainingPeaks, una explicación de la semana anterior y los objetivos de la siguiente. Así el plan encaja con el tiempo que realmente tienes.",
  ],
  [
    "¿Cómo funciona la revisión semanal?",
    "Revisamos lo que has hecho, cómo has respondido y qué buscamos en la semana siguiente. Esa explicación llega entre sábado y domingo junto al nuevo plan. En Individual, la revisión semanal se entrega mediante audios de WhatsApp.",
  ],
  [
    "¿Cómo contacto con el entrenador?",
    "Los tres planes incluyen una llamada inicial. Después, Individual entrega revisión semanal por audios de WhatsApp y no incluye llamadas de seguimiento. Seguimiento permite consultas diarias y una llamada mensual. Rendimiento ofrece contacto diario para tus dudas y una llamada semanal, con un acompañamiento más cercano.",
  ],
  [
    "¿Las pruebas de lactato son obligatorias?",
    "No. Son opcionales. Las utilizamos cuando aportan información útil para decidir tu entrenamiento. Puedes contratar una prueba por separado o acceder a las condiciones de tu plan. Rendimiento incluye una prueba cada 6 meses.",
  ],
  [
    "¿Puedo reservar una prueba sin contratar un plan?",
    "Sí. Puedes consultar una prueba de lactato en pista aunque todavía no entrenes con ICARO. Te explicaremos cómo funciona y sus condiciones; el desplazamiento se presupuesta antes de reservar. Si entrenas con nosotros, también tienes condiciones específicas según tu plan.",
  ],
  [
    "¿Qué diferencia hay entre los tres planes?",
    "Todos incluyen llamada inicial, planificación individualizada, revisión semanal y explicación de los objetivos. Individual entrega la revisión por audios de WhatsApp y no incluye llamadas de seguimiento. Seguimiento añade consultas diarias y una llamada mensual. Rendimiento ofrece contacto diario más cercano, análisis en profundidad y una llamada semanal. También cambian las condiciones de las pruebas de lactato.",
  ],
  [
    "¿Hay permanencia?",
    site.terms.commitment ||
      "Te explicamos las condiciones de contratación en la primera conversación, antes de empezar. Pregúntanos por la duración del seguimiento y las opciones para cambiar o finalizar tu plan.",
  ],
  [
    "¿Cómo veo mis entrenamientos?",
    site.terms.trainingPlatform ||
      "Consultas tu programación en TrainingPeaks. Puedes conectar un reloj compatible para recibir las sesiones estructuradas que admita tu modelo. Te ayudamos a configurar la conexión.",
  ],
];
export const sports = [
  {
    key: "swimming",
    name: "Natación",
    alt: "Nadador practicando crol en una piscina",
    caption: "Técnica, ritmo y confianza en el agua.",
    symbol: "01",
  },
  {
    key: "cycling",
    name: "Ciclismo",
    alt: "Ciclista pedaleando sobre una bicicleta de carretera",
    caption: "La carga que necesitas sobre la bici.",
    symbol: "02",
  },
  {
    key: "running",
    name: "Carrera",
    alt: "Silueta de un corredor junto al mar al atardecer",
    caption: "Llegar a correr con lo que necesitas.",
    symbol: "03",
  },
] as const;
