export const journeyCopy = {
  label: "DEL PRIMER CONTACTO A TU OBJETIVO",
  title: ["Así empezamos.", "Así seguimos contigo."],
  description:
    "Tu primer triatlón o un objetivo exigente: empezamos por conocerte y convertir tu punto de partida en una semana de entrenamiento con sentido.",
  cycleDescription:
    "Repetimos el ciclo: prescribir, revisar y ajustar. Cada semana nos ayuda a decidir la siguiente, con tu disponibilidad y tu respuesta al entrenamiento como referencia.",
  action: "Empezar por una conversación",
};

export const journeyStages = [
  {
    number: "01",
    phase: "INICIO",
    title: "Nos conocemos.",
    text: "Nos cuentas tu objetivo, experiencia y tiempo disponible. Escuchamos tu contexto antes de elegir el entrenamiento.",
    detail: "Tu objetivo. Tu vida real.",
  },
  {
    number: "02",
    phase: "INICIO",
    title: "Llamada inicial.",
    text: "Hablamos de tu experiencia, resolvemos dudas y acordamos objetivos concretos para orientar tu preparación.",
    detail: "Incluida en los tres planes.",
  },
  {
    number: "03",
    phase: "INICIO",
    title: "Hacemos tests de campo.",
    text: "Elegimos pruebas útiles para tu rendimiento. Leemos los resultados junto a tus sesiones y sensaciones.",
    detail: "Tests de campo. Lactato opcional.",
  },
  {
    number: "04",
    phase: "INICIO",
    title: "Hablamos de tu perfil.",
    text: "Te explicamos tus fortalezas, tus prioridades y qué vamos a trabajar primero. Tu perfil orienta el plan.",
    detail: "Entender antes de prescribir.",
  },
  {
    number: "05",
    phase: "CICLO SEMANAL",
    title: "Prescribimos tu semana.",
    text: "Envías tu disponibilidad el viernes. Entre sábado y domingo recibes tu semana en TrainingPeaks, adaptada a tu perfil y objetivo.",
    detail: "Qué hacer, cuánto y a qué intensidad.",
  },
  {
    number: "06",
    phase: "CICLO SEMANAL",
    title: "Revisamos contigo.",
    text: "Entre sábado y domingo revisamos la semana anterior y explicamos qué buscamos en la siguiente, con datos y sensaciones.",
    detail: "Una explicación, además de números.",
  },
  {
    number: "07",
    phase: "CICLO SEMANAL",
    title: "Ajustamos la siguiente semana.",
    text: "Tu respuesta y nueva disponibilidad orientan la próxima semana. Prescribimos, revisamos y ajustamos de nuevo.",
    detail: "Prescribir, revisar, ajustar y repetir.",
  },
  {
    number: "08",
    phase: "OBJETIVO",
    title: "Avanzamos hacia tu objetivo.",
    text: "Cada semana conecta con la preparación que buscas. Tu objetivo marca el rumbo y tu respuesta ayuda a decidir los siguientes pasos.",
    detail: "Tu primer triatlón o tu próximo reto.",
  },
] as const;
