import { site } from "@/config/site";
export const navigation = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Planes", href: "#planes" },
  { label: "Barcelona", href: "#barcelona" },
  { label: "Método", href: "#metodo" },
  { label: "FAQ", href: "#faq" },
];
export const copy = {
  hero: {
    eyebrow: "ENTRENAMIENTO DE TRIATLÓN",
    title: ["Triatlón.", "A tu medida."],
    description:
      "Un entrenador que organiza tu natación, ciclismo y carrera. Tu plan semanal en TrainingPeaks, feedback y ajustes para que sepas qué hacer y por qué.",
    primary: "Cuéntame tu objetivo",
    secondary: "Ver planes y precios",
  },
  philosophy: {
    title: "El plan empieza\npor entenderte.",
    description:
      "No entrenas en una hoja de cálculo. Entrenas en una vida real. Por eso, antes de decidir qué haces, necesitamos saber quién eres, qué buscas y qué puedes sostener.",
  },
};
export const process = [
  {
    title: "Conocerte",
    text: "Tu objetivo, experiencia, disponibilidad, historial y lesiones. El contexto también cuenta.",
  },
  {
    title: "Medir",
    text: "Tests de campo, entrenamientos, datos disponibles y sensaciones. Elegimos lo que aporta información útil.",
  },
  {
    title: "Entender",
    text: "Construimos tu perfil: fortalezas, limitaciones y prioridades. Y te explicamos lo que vemos.",
  },
  {
    title: "Planificar",
    text: "Organizamos la temporada en ciclos. Cada bloque persigue una adaptación concreta.",
  },
  {
    title: "Entrenar",
    text: "Prescripción semanal personalizada. Intensidades y dosis que encajan contigo.",
  },
  {
    title: "Observar",
    text: "Revisamos datos, fatiga y sensaciones. Importa cómo respondes, además de lo que completas.",
  },
  {
    title: "Adaptar",
    text: "La siguiente semana depende de lo que ha sucedido. Volvemos a medir y ajustamos el camino.",
  },
];
export const sharedFeatures = [
  "Plan semanal individualizado en TrainingPeaks",
  "Sincronización con dispositivos compatibles",
  "Revisión de la semana anterior",
  "Objetivo y disponibilidad real",
  "Trabajo por fortalezas y limitaciones",
  "Organización por ciclos",
  "Tests de campo y zonas revisables",
  "Feedback semanal",
  "Preparación de competición",
];
export const plans = [
  {
    id: "individual",
    number: "01",
    name: "Individual",
    label: "TU PLAN. TU AUTONOMÍA.",
    description:
      "Quieres saber qué entrenar cada semana y te organizas con autonomía.",
    features: [
      "Análisis de sesiones importantes",
      "Feedback cada semana",
      "Preparación de competición",
    ],
    contact: "Consultas urgentes de 19:00 a 20:00.",
    detail:
      "Para molestias, cambios de horario o dudas que condicionen el siguiente entrenamiento. Las demás consultas se responden con la programación semanal.",
    call: "Sin videollamada periódica incluida",
  },
  {
    id: "coaching",
    number: "02",
    name: "Coaching",
    label: "UN PUNTO DE CONTACTO DIARIO.",
    description:
      "Quieres un entrenador al que consultar cada día y ajustes durante la semana.",
    features: [
      "Todo lo incluido en Individual",
      "Seguimiento y análisis más frecuentes",
      "Ajustes durante la semana",
      "Control de fatiga y respuesta",
    ],
    contact: "Contacto diario de 19:00 a 20:00.",
    detail:
      "Dudas, sensaciones y cambios relacionados con el entrenamiento, sin necesidad de que sean urgentes.",
    call: "Videollamada mensual",
  },
  {
    id: "performance",
    number: "03",
    name: "Performance",
    label: "MÁS CERCA DE CADA DECISIÓN.",
    description:
      "Quieres contacto directo, análisis en profundidad y una videollamada cada semana.",
    features: [
      "Todo lo incluido en Coaching",
      "Contacto directo y prioridad de respuesta",
      "Análisis profundo y adaptación continua",
      "Perfil longitudinal y comparación de ciclos",
      "Mayor preparación de competición",
    ],
    contact: "Contacto directo y seguimiento detallado.",
    detail:
      "Mayor profundidad para interpretar tu evolución y preparar cada fase de la temporada.",
    call: "Videollamada semanal",
  },
] as const;
export const faqs = [
  [
    "¿Los entrenamientos llegan a mi reloj?",
    "Sí, puedes conectar TrainingPeaks con un dispositivo compatible para recibir los entrenamientos estructurados que admita tu modelo. La sincronización depende de la marca, la disciplina y el tipo de sesión. Te ayudamos con la configuración inicial.",
  ],
  [
    "¿Puedo trabajar la técnica de forma presencial?",
    "Sí. Tenemos la posibilidad de trabajar técnica en dos centros de Barcelona. Cuéntanos qué necesitas mejorar y te explicaremos las opciones, disponibilidad y condiciones antes de reservar.",
  ],
  [
    "¿Puedo entrenar solamente running?",
    "Sí. El plan de una disciplina puede dedicarse a running, ciclismo o natación. La planificación es individualizada en los tres casos.",
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
    "Los viernes recibes la planificación de la siguiente semana, basada en tu objetivo, el ciclo y tu respuesta. Si el fin de semana cambia la situación, puede modificarse.",
  ],
  [
    "¿Cómo funciona el feedback semanal?",
    "El domingo revisamos qué hemos visto, qué ha funcionado, qué debemos vigilar y qué condiciona la siguiente semana. Una valoración sencilla y útil.",
  ],
  [
    "¿Cómo contacto con el entrenador?",
    "Individual reserva la franja de 19:00 a 20:00 para consultas urgentes sobre el próximo entrenamiento. Coaching ofrece contacto diario en esa franja. Performance añade contacto directo y prioridad de respuesta. No es un servicio de atención médica.",
  ],
  [
    "¿Los tests de lactato son obligatorios?",
    "No. Son opcionales y se contratan aparte. Los atletas activos tienen precio especial y pueden realizar aproximadamente un test cada tres meses cuando resulte útil.",
  ],
  [
    "¿Qué diferencia hay entre los tres planes?",
    "Todos incluyen planificación individualizada. Cambian la frecuencia de contacto y revisión, la rapidez de los ajustes y la profundidad del análisis. Coaching incluye una videollamada mensual; Performance, una semanal.",
  ],
  [
    "¿Hay permanencia?",
    site.terms.commitment ||
      "Las condiciones de contratación están pendientes de publicación. Consúltanos antes de contratar para conocer las condiciones vigentes.",
  ],
  [
    "¿Cómo veo mis entrenamientos?",
    site.terms.trainingPlatform ||
      "Te explicaremos el canal y las herramientas de entrega al comenzar. La plataforma concreta está pendiente de confirmación; no necesitas elegirla ahora.",
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
    alt: "Triatleta corriendo durante una competición",
    caption: "Llegar a correr con lo que necesitas.",
    symbol: "03",
  },
] as const;
