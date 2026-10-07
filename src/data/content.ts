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
      "Tu objetivo y tus horarios marcan el punto de partida. Ajustamos la duración, la intensidad y la recuperación con tus datos y sensaciones, y te explicamos el porqué de cada sesión.",
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
  "Disponibilidad enviada cada viernes",
  "Programación entre sábado y domingo",
  "Explicación de la semana anterior y objetivos de la siguiente",
  "Feedback semanal de tu entrenador",
  "Sincronización con dispositivos compatibles",
  "Trabajo por fortalezas, limitaciones y ciclos",
  "Tests de campo y zonas revisables",
  "Preparación de competición",
];
export const plans = [
  {
    id: "individual",
    number: "01",
    name: "Individual",
    label: "TU PLAN. TU AUTONOMÍA.",
    description:
      "Quieres un plan bien explicado, feedback semanal y libertad para organizarte con autonomía.",
    features: [
      "Análisis de sesiones importantes",
      "Feedback semanal por audios de WhatsApp",
      "Preparación de competición",
    ],
    contact: "Feedback semanal por WhatsApp.",
    detail:
      "Entre sábado y domingo recibes audios con la explicación de la semana anterior y los objetivos de la siguiente, junto a tu nueva programación.",
    call: "Sin llamadas de seguimiento",
  },
  {
    id: "coaching",
    number: "02",
    name: "Coaching",
    label: "UN PUNTO DE CONTACTO DIARIO.",
    description:
      "Quieres resolver tus dudas cada día, ajustar el plan cuando hace falta y hablar con tu entrenador una vez al mes.",
    features: [
      "Plan individual y feedback semanal",
      "Consultas diarias al entrenador",
      "Seguimiento y análisis más frecuentes",
      "Ajustes durante la semana",
      "Control de fatiga y respuesta",
    ],
    contact: "Consultas diarias con tu entrenador.",
    detail:
      "Comparte tus dudas, sensaciones y cambios de disponibilidad durante la semana. Estamos cerca para revisar contigo lo que necesitas.",
    call: "Llamada mensual",
  },
  {
    id: "performance",
    number: "03",
    name: "Performance",
    label: "MÁS CERCA DE CADA DECISIÓN.",
    description:
      "Quieres un acompañamiento más cercano, disponibilidad para tus dudas y una llamada cada semana para revisar tu evolución.",
    features: [
      "Plan individual y feedback semanal",
      "Consultas diarias y contacto cercano",
      "Análisis profundo y adaptación continua",
      "Perfil longitudinal y comparación de ciclos",
      "Preparación detallada de competición",
    ],
    contact: "Contacto diario para todas tus dudas.",
    detail:
      "En la llamada semanal revisamos cómo fue la semana anterior y qué buscamos en la siguiente. Durante la semana estamos disponibles para resolver tus dudas.",
    call: "Llamada semanal",
  },
] as const;
export const faqs = [
  [
    "¿Necesito entender los datos para empezar?",
    "No necesitas conocer las zonas ni saber fisiología. Te explicamos cuánto dura cada sesión, a qué intensidad hacerla y qué buscamos con ella. Utilizamos los datos que tengas disponibles junto con tus sensaciones; un potenciómetro no es un requisito para empezar.",
  ],
  [
    "¿La llamada inicial está incluida?",
    "Sí. Individual, Coaching y Performance incluyen una llamada inicial para conocerte, resolver dudas y acordar objetivos concretos. Después, las llamadas de seguimiento dependen del plan: Individual no las incluye, Coaching tiene una mensual y Performance una semanal.",
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
    "Cada viernes nos envías tu disponibilidad para la siguiente semana. Entre sábado y domingo recibes la programación en TrainingPeaks, una explicación de la semana anterior y los objetivos de la siguiente. Así el plan encaja con el tiempo que realmente tienes.",
  ],
  [
    "¿Cómo funciona el feedback semanal?",
    "Revisamos lo que has hecho, cómo has respondido y qué buscamos en la semana siguiente. Esa explicación llega entre sábado y domingo junto al nuevo plan. En Individual, el feedback semanal se entrega mediante audios de WhatsApp.",
  ],
  [
    "¿Cómo contacto con el entrenador?",
    "Los tres planes incluyen una llamada inicial. Después, Individual entrega feedback semanal por audios de WhatsApp y no incluye llamadas de seguimiento. Coaching permite consultas diarias y una llamada mensual. Performance ofrece contacto diario para tus dudas y una llamada semanal, con un acompañamiento más cercano.",
  ],
  [
    "¿Los tests de lactato son obligatorios?",
    "No. Son opcionales. Los utilizamos cuando aportan información útil para decidir tu entrenamiento. Puedes contratar un test por separado o acceder a las condiciones de tu plan. Performance incluye un test cada 6 meses.",
  ],
  [
    "¿Puedo consultar un test sin contratar un plan?",
    "Sí. Puedes consultar un test de lactato en pista aunque todavía no entrenes con ICARO. Te explicaremos cómo funciona y sus condiciones; el desplazamiento se presupuesta antes de reservar. Si entrenas con nosotros, también tienes condiciones específicas según tu plan.",
  ],
  [
    "¿Qué diferencia hay entre los tres planes?",
    "Todos incluyen llamada inicial, planificación individualizada, revisión semanal y explicación de los objetivos. Individual entrega feedback por audios de WhatsApp y no incluye llamadas de seguimiento. Coaching añade consultas diarias y una llamada mensual. Performance ofrece contacto diario más cercano, análisis en profundidad y una llamada semanal. También cambian las condiciones de los tests de lactato.",
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
