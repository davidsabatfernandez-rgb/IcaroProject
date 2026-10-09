export const technicalMethodCopy = {
  label: "CRITERIO DETRÁS DE CADA SESIÓN",
  title: ["Decisiones con datos.", "Un entrenador que te entiende."],
  intro:
    "No necesitas entender fisiología para entrenar con sentido. Nuestro trabajo es interpretar tu respuesta, elegir qué necesitas y explicarte el porqué de cada semana.",
  action: "Hablemos de tu entrenamiento",
  panelTitle: "Lo que hay detrás de tu plan.",
  panelIntro:
    "Datos y sensaciones, convertidos en decisiones. Elige un criterio para ver cómo orienta tus sesiones.",
};

export const technicalMethodSteps = [
  {
    title: "Medimos",
    text: "Tests de campo, datos disponibles de tus sesiones y lo que nos cuentas.",
  },
  {
    title: "Interpretamos",
    text: "Relacionamos el esfuerzo con tu respuesta y tu contexto.",
  },
  {
    title: "Prescribimos",
    text: "Elegimos el objetivo, la duración y la intensidad de cada sesión.",
  },
  {
    title: "Revisamos",
    text: "El feedback semanal orienta los ajustes de la siguiente semana.",
  },
] as const;

export const technicalDecisions = [
  {
    id: "intensidad",
    label: "Intensidad",
    signals: ["Ritmo / potencia", "Frecuencia cardiaca", "Sensaciones"],
    observation:
      "Relacionamos ritmo o potencia, cuando están disponibles, con tu pulso y el esfuerzo que percibes.",
    decision:
      "Ajustamos las zonas a tus tests y a cada disciplina. El calor, el terreno o la fatiga también cuentan.",
    athlete:
      "Sabes a qué intensidad entrenar y qué buscamos con ella. Un día suave también tiene un propósito.",
    technicalTitle: "Zonas de intensidad y umbrales",
    technicalExplanation:
      "Los tests de campo nos ayudan a orientar las zonas de trabajo. Si incorporamos un test de lactato, LT1 y LT2 son puntos de referencia estimados a partir de los cambios del lactato durante un esfuerzo progresivo. Los interpretamos junto con ritmo o potencia, frecuencia cardiaca y sensaciones. Los resultados dependen del protocolo y de la disciplina; no son un número universal. El test de lactato es opcional.",
  },
  {
    id: "carga",
    label: "Carga y recuperación",
    signals: [
      "Duración + intensidad",
      "Fatiga y descanso",
      "Tu disponibilidad",
    ],
    observation:
      "Revisamos la carga conjunta de las sesiones de resistencia y fuerza, junto con tu descanso y tus sensaciones.",
    decision:
      "Distribuimos los estímulos y la recuperación para que una sesión tenga sentido dentro de toda tu semana.",
    athlete:
      "Un plan que encaja en tu agenda y se ajusta a cómo respondes. Recuperar también forma parte de entrenar.",
    technicalTitle: "La dosis importa tanto como la sesión",
    technicalExplanation:
      "La carga combina cuánto entrenas y a qué intensidad, pero una cifra no cuenta toda la historia. Miramos la distribución entre resistencia y fuerza, la fatiga muscular y la respuesta del atleta. El descanso, los compromisos y las sensaciones nos ayudan a decidir cuándo mantener el estímulo, reducirlo o reorganizar la semana.",
  },
  {
    id: "progresion",
    label: "Progresión",
    signals: ["Tendencias", "Sesiones comparables", "Feedback semanal"],
    observation:
      "Buscamos tendencias entre semanas y sesiones comparables, sin sacar conclusiones de un único día.",
    decision:
      "Decidimos si avanzar, repetir o ajustar el trabajo según tu respuesta y el objetivo que preparas.",
    athlete:
      "Entiendes cómo ha ido tu semana y por qué cambia la siguiente. Tu plan evoluciona contigo.",
    technicalTitle: "Progresar no siempre significa hacer más",
    technicalExplanation:
      "Comparamos el trabajo realizado con la respuesta del atleta, teniendo en cuenta las condiciones de cada sesión. La progresión puede consistir en ajustar duración, intensidad, técnica o recuperación. La revisión semanal nos permite elegir el siguiente paso sin asumir que acumular más horas siempre es mejor.",
  },
] as const;

export const technicalStrengths = [
  {
    title: "Perfil antes que plan.",
    text: "Tus tests de campo, tus sesiones y tu contexto orientan las prioridades. Primero te conocemos; después planificamos.",
  },
  {
    title: "La dosis que puedes sostener.",
    text: "Duración, intensidad y recuperación se coordinan entre disciplinas, con tu disponibilidad real como punto de partida.",
  },
  {
    title: "Datos que cambian decisiones.",
    text: "Ritmo, potencia y pulso cobran sentido junto con tus sensaciones. Tu entrenador mira también el contexto.",
  },
  {
    title: "Un criterio que entiendes tú.",
    text: "Conoces el propósito de las sesiones y recibes feedback semanal. El contacto se adapta al plan que elijas.",
  },
] as const;
