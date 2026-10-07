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
    text: "Nos cuentas qué quieres preparar, tu experiencia y el tiempo que tienes. Escuchamos tu contexto antes de elegir el entrenamiento.",
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
    text: "Elegimos las pruebas que aportan información útil sobre tu rendimiento. Los datos se leen junto a tus entrenamientos y sensaciones.",
    detail: "Tests de campo. Lactato opcional.",
  },
  {
    number: "04",
    phase: "INICIO",
    title: "Hablamos de tu perfil.",
    text: "Te explicamos tus fortalezas, qué limita ahora tu rendimiento y qué queremos trabajar primero. El perfil orienta el plan.",
    detail: "Entender antes de prescribir.",
  },
  {
    number: "05",
    phase: "CICLO SEMANAL",
    title: "Prescribimos tu semana.",
    text: "El viernes nos envías tu disponibilidad. Entre sábado y domingo recibes tu programación en TrainingPeaks, con sesiones que responden a tu perfil y objetivo.",
    detail: "Qué hacer, cuánto y a qué intensidad.",
  },
  {
    number: "06",
    phase: "CICLO SEMANAL",
    title: "Revisamos contigo.",
    text: "Entre sábado y domingo te explicamos cómo fue la semana anterior y qué buscamos en la siguiente. Tus datos y sensaciones dan contexto al feedback.",
    detail: "Una explicación, además de números.",
  },
  {
    number: "07",
    phase: "CICLO SEMANAL",
    title: "Ajustamos la siguiente semana.",
    text: "Lo aprendido y tu nueva disponibilidad orientan la próxima prescripción. Repetimos el ciclo y revisamos el perfil cuando aporta información útil.",
    detail: "Prescribir, revisar, ajustar y repetir.",
  },
  {
    number: "08",
    phase: "OBJETIVO",
    title: "Avanzamos hacia tu objetivo.",
    text: "Conectamos cada semana con la preparación que buscas. Tu objetivo marca el rumbo y tu respuesta ayuda a decidir los siguientes pasos.",
    detail: "Tu primer triatlón o tu próximo reto.",
  },
] as const;
