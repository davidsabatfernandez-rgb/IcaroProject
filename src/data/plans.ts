/** Condiciones comerciales confirmadas. Las tarifas se explican antes de contratar. */
export const plans = [
  {
    id: "individual",
    number: "01",
    name: "Individual",
    label: "TU PLAN. TU AUTONOMÍA.",
    value: "Un plan claro para entrenar con criterio.",
    description:
      "Preparación individualizada, explicada y revisada cada semana. Para quien prefiere organizarse con autonomía y recibir una orientación clara.",
    features: [
      "Planificación según tu perfil y disponibilidad",
      "Revisión semanal por audios de WhatsApp",
      "Análisis de sesiones importantes",
      "Consultas de entrenamiento de 19:00 a 20:00",
      "Preparación de competición",
    ],
    contact: "Dudas de 19:00 a 20:00.",
    detail:
      "Entre sábado y domingo recibes audios con la explicación de la semana anterior y los objetivos de la siguiente, junto a tu nueva programación. Las consultas se atienden de 19:00 a 20:00, hora de Barcelona. Incluye llamada inicial; no incluye llamadas periódicas de seguimiento.",
    call: "Audios semanales; sin llamadas de seguimiento",
    comparison: {
      communication: "Consultas de 19:00 a 20:00 y audios semanales",
      calls: "Inicial incluida; sin llamadas de seguimiento",
      lactate: "Prueba opcional con condiciones para atletas del plan",
    },
    lactate: {
      headline: "Condiciones para atletas del plan",
      detail:
        "La prueba es opcional: te explicamos cuándo puede aportar información a tu preparación y sus condiciones antes de reservar.",
    },
  },
  {
    id: "coaching",
    number: "02",
    name: "Seguimiento",
    label: "PLANIFICACIÓN Y CONTACTO SEMANAL.",
    value: "Un entrenador que sigue tu evolución, no solo tu calendario.",
    description:
      "Un entrenador que interpreta tu respuesta y adapta el proceso contigo. Una llamada cada semana para revisar decisiones, resolver cuestiones y preparar el siguiente bloque.",
    features: [
      "Plan individual y revisión semanal",
      "Una llamada semanal coordinada contigo",
      "Consultas escritas de 19:00 a 20:00",
      "Análisis periódico del rendimiento y las sensaciones",
      "Ajustes según evolución, fatiga y disponibilidad",
    ],
    contact: "Consultas escritas de 19:00 a 20:00.",
    detail:
      "Revisamos tu evolución, tus sensaciones y los ajustes del plan. Las consultas escritas se atienden de 19:00 a 20:00, hora de Barcelona. La llamada semanal se agenda de mutuo acuerdo entre atleta y entrenador, aparte de esa franja de consultas.",
    call: "Llamada semanal, coordinada contigo",
    comparison: {
      communication:
        "Consultas escritas de 19:00 a 20:00 y seguimiento periódico",
      calls: "Inicial incluida y una llamada semanal coordinada",
      lactate: "Prueba opcional con promoción trimestral bajo consulta",
    },
    lactate: {
      headline: "Promoción trimestral para tu prueba",
      detail:
        "Consulta las condiciones de la prueba opcional de lactato para atletas de Seguimiento antes de reservar.",
    },
  },
  {
    id: "performance",
    number: "03",
    name: "Rendimiento",
    label: "PROXIMIDAD. PROFUNDIDAD. PRIORIDAD.",
    value: "Un acompañamiento más cercano para quien quiere ir más allá.",
    description:
      "Análisis fisiológico y del rendimiento en mayor profundidad, ajustes según tu respuesta y contacto directo prioritario. Para preparar tus objetivos con una colaboración más cercana.",
    features: [
      "Plan individual y revisión semanal",
      "Comunicación diaria, con respuesta según disponibilidad",
      "Contacto directo prioritario, sin límite a la franja de 19:00 a 20:00",
      "Análisis fisiológico y adaptación en mayor profundidad",
      "Perfil longitudinal, ciclos y preparación de competición",
    ],
    contact:
      "Comunicación diaria y respuesta prioritaria según disponibilidad.",
    detail:
      "En la llamada semanal revisamos cómo fue la semana anterior y qué buscamos en la siguiente. La comunicación diaria tiene prioridad según la disponibilidad del entrenador y no queda limitada a la franja de 19:00 a 20:00. Es un contacto más directo, sin atención las 24 horas ni respuesta inmediata garantizada.",
    call: "Llamada semanal",
    comparison: {
      communication: "Comunicación diaria prioritaria, según disponibilidad",
      calls: "Inicial incluida y una llamada semanal",
      lactate: "Una prueba incluida cada 6 meses; opción trimestral",
    },
    lactate: {
      headline: "1 prueba incluida cada 6 meses",
      detail:
        "También puedes consultar la opción trimestral. Las pruebas se realizan cuando aportan información útil y se coordinan antes de reservar.",
    },
  },
] as const;

/** Filas orientadas a decisión: no sustituyen las condiciones del servicio. */
export const planComparison = [
  { feature: "Planificación individual", values: ["Sí", "Sí", "Sí"] },
  { feature: "Planificación semanal", values: ["Sí", "Sí", "Sí"] },
  {
    feature: "Resolución de dudas",
    values: ["19:00–20:00", "19:00–20:00", "Diaria, según disponibilidad"],
  },
  {
    feature: "Llamada semanal",
    values: ["No incluida", "Incluida, coordinada contigo", "Incluida"],
  },
  { feature: "Contacto directo prioritario", values: ["No", "No", "Sí"] },
  {
    feature: "Análisis del rendimiento",
    values: ["Base", "Seguimiento periódico", "Mayor profundidad"],
  },
  { feature: "Adaptación de planificación", values: ["Sí", "Sí", "Sí"] },
  {
    feature: "Prueba de lactato",
    values: plans.map((plan) => plan.comparison.lactate),
  },
] as const;

export const planFaqs = [
  {
    question: "¿Cuándo se responden mis dudas?",
    answer:
      "Individual y Seguimiento atienden las consultas de 19:00 a 20:00, hora de Barcelona. Rendimiento ofrece comunicación diaria y respuesta prioritaria según la disponibilidad del entrenador, sin quedar limitada a esa franja horaria.",
  },
  {
    question: "¿Las llamadas están incluidas?",
    answer:
      "Los tres planes incluyen una llamada inicial. Individual entrega la revisión semanal por audios de WhatsApp y no incluye llamadas periódicas de seguimiento. Seguimiento y Rendimiento incluyen una llamada semanal, coordinada entre atleta y entrenador. En Seguimiento, esa llamada se agenda aparte de la franja de consultas escritas de 19:00 a 20:00.",
  },
  {
    question: "¿El plan Rendimiento ofrece atención las 24 horas?",
    answer:
      "No. Rendimiento ofrece comunicación más directa y prioritaria para tus cuestiones de entrenamiento. El entrenador responde según su disponibilidad real; el servicio no implica atención las 24 horas ni respuestas instantáneas.",
  },
] as const;
