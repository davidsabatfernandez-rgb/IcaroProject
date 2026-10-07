export const valueCopy = {
  label: "TU TIEMPO MERECE UN PLAN",
  title: ["Entrena con rumbo.", "Y con alguien a tu lado."],
  intro:
    "Entre trabajo, familia y tres disciplinas, cada hora cuenta. Partimos de tu semana real para elegir las sesiones que necesitas y revisar contigo cómo respondes.",
  closeness:
    "Entrenadores online, cerca del atleta. Para nosotros, trabajar como una familia empieza por escucharte, conocer tu contexto y acompañarte cada semana.",
  action: "Cuéntanos cómo es tu semana",
};

export const athleteNeeds = [
  {
    title: "Tienes poco tiempo.",
    concern: "Quieres entrenar sin que tu agenda se convierta en otra carrera.",
    answer:
      "Planificamos con la disponibilidad que nos envías cada viernes. Duración, intensidad y recuperación se organizan alrededor de tu objetivo y tu vida.",
    outcome: "Un plan que encaja contigo.",
  },
  {
    title: "Te falta un rumbo claro.",
    concern: "Completar sesiones no siempre te ayuda a entender qué necesitas.",
    answer:
      "Cada entrenamiento tiene un propósito dentro del ciclo. Te explicamos qué buscamos para aprovechar tu tiempo y favorecer la adaptación que necesitas.",
    outcome: "Sabes qué hacer y para qué.",
  },
  {
    title: "Quieres dejar de adivinar.",
    concern:
      "Fatiga, sensaciones y dudas: no tienes por qué interpretarlas solo.",
    answer:
      "Revisamos tus datos y te escuchamos. El feedback semanal da contexto a lo realizado y orienta la siguiente semana; el contacto se adapta al plan que elijas.",
    outcome: "Tu entrenador conoce tu proceso.",
  },
] as const;

export const weeklySchedule = [
  {
    day: "VIERNES",
    title: "Tú nos envías tu disponibilidad.",
    text: "Cuéntanos cuánto tiempo tienes, tus horarios y los compromisos de la siguiente semana.",
  },
  {
    day: "SÁBADO Y DOMINGO",
    title: "Tu plan, con una explicación.",
    text: "Recibes la programación en TrainingPeaks. Te explicamos cómo fue la semana anterior y qué queremos trabajar en la siguiente.",
  },
] as const;
