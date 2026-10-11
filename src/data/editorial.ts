export const philosophyStages = [
  {
    name: "Objetivo",
    question: "¿Para qué estás entrenando?",
    explanation:
      "La prueba, su exigencia y el tiempo disponible sitúan la preparación. Un objetivo concreto permite elegir prioridades.",
  },
  {
    name: "Limitante",
    question: "¿Qué necesita más atención?",
    explanation:
      "Buscamos qué condiciona tu rendimiento hoy: resistencia, técnica, fuerza, tolerancia a la carga o recuperación. No todo se mejora a la vez.",
  },
  {
    name: "Adaptación",
    question: "¿Qué queremos desarrollar?",
    explanation:
      "Definimos la capacidad que queremos mejorar. El objetivo de una sesión va más allá de acumular minutos o terminar una serie.",
  },
  {
    name: "Estímulo",
    question: "¿Qué trabajo tiene sentido?",
    explanation:
      "Elegimos el tipo de sesión y la disciplina que pueden acercarte a esa adaptación, según tu experiencia y la fase de preparación.",
  },
  {
    name: "Dosis",
    question: "¿Cuánto puedes asimilar?",
    explanation:
      "Duración, intensidad, frecuencia y recuperación forman la dosis. Más entrenamiento no siempre aporta una mejor respuesta.",
  },
  {
    name: "Respuesta",
    question: "¿Cómo has respondido?",
    explanation:
      "Contrastamos lo que haces con tus datos, sensaciones y contexto. Una sesión aislada no explica toda tu evolución.",
  },
  {
    name: "Decisión",
    question: "¿Qué necesita el siguiente paso?",
    explanation:
      "Mantenemos, progresamos o ajustamos el trabajo. La siguiente semana nace de tu respuesta y de tu disponibilidad real.",
  },
] as const;

export const contextualComparisons = [
  {
    key: "power",
    number: "01",
    label: "CARGA EXTERNA / RESPUESTA INTERNA",
    title: "La misma potencia. Otro coste.",
    description:
      "Los watts describen el trabajo externo. El esfuerzo percibido y otras respuestas ayudan a entender cómo lo estás viviendo.",
    detail:
      "La frecuencia cardiaca, el lactato o las sensaciones pueden variar entre personas y entre días. El protocolo, el ambiente, la fatiga y el historial del atleta importan. Una cifra de potencia no determina por sí sola la intensidad fisiológica.",
  },
  {
    key: "availability",
    number: "02",
    label: "DISPONIBILIDAD / PRIORIDADES",
    title: "Menos tiempo. Una nueva decisión.",
    description:
      "Cuando cambia tu semana, revisamos las prioridades. No intentamos comprimir todas las sesiones en menos días.",
    detail:
      "Se puede conservar el trabajo que mejor responde al objetivo y ajustar volumen, sesiones secundarias o recuperación. La decisión depende de la fase de preparación y de lo que puedas asimilar, no solo de las horas del calendario.",
  },
  {
    key: "fatigue",
    number: "03",
    label: "OBSERVACIÓN / CONTEXTO",
    title: "Una señal no cuenta toda la historia.",
    description:
      "La fatiga se interpreta junto al sueño, las sensaciones y la evolución de las sesiones. Un dato aislado no decide por ti.",
    detail:
      "Buscamos tendencias y contrastamos señales. Un esfuerzo percibido más alto puede invitar a preguntar, observar o ajustar; no demuestra por sí solo una mala adaptación. La conversación aporta información que el dispositivo no registra.",
  },
] as const;

export const coachTeam = {
  title: ["ENTRENADORES.", "ATLETAS.", "TU EQUIPO."],
  lead: "Experiencia en el entrenamiento. Experiencia en la competición.",
  introduction:
    "Nuestro equipo reúne entrenadores con experiencia, finishers de Ironman y triatletas que compiten actualmente a alto nivel. Criterio de entrenamiento y vivencia deportiva al servicio de tu preparación.",
  method:
    "Tu entrenador interpreta las sesiones con tus sensaciones y te explica qué buscamos. El seguimiento tiene un propósito: que entiendas tu preparación y que el siguiente paso responda a tu realidad.",
  contact: "Conoce al equipo",
} as const;

export const coachFollowUp = [
  {
    number: "01",
    timing: "ANTES DE EMPEZAR",
    title: "Una conversación con propósito.",
    text: "La llamada inicial está incluida en los tres planes. Hablamos de tu experiencia, tus objetivos y las condiciones reales de tu preparación.",
  },
  {
    number: "02",
    timing: "CADA VIERNES",
    title: "Tu disponibilidad forma parte del plan.",
    text: "Nos envías el tiempo que tienes para la siguiente semana. Tus horarios y tu contexto entran en las decisiones de entrenamiento.",
  },
  {
    number: "03",
    timing: "SÁBADO Y DOMINGO",
    title: "Revisión, explicación y siguiente paso.",
    text: "Recibes la nueva programación en TrainingPeaks, una explicación de la semana anterior y el propósito de la siguiente. El formato de seguimiento depende del plan.",
  },
] as const;

export const collectiveDetails = [
  {
    label: "PRESENCIAL",
    text: "Entrenamientos compartidos cada semana.",
  },
  {
    label: "ORGANIZACIÓN",
    text: "Ritmos y distancias según participantes y sesión.",
  },
  {
    label: "PROPÓSITO",
    text: "Cada atleta conserva el objetivo de su preparación.",
  },
] as const;
