export type TrainingDiscipline =
  "swim" | "bike" | "run" | "strength" | "recovery";

export type TrainingSession = {
  id: string;
  discipline: TrainingDiscipline;
  title: string;
  minutes: number;
  objective: string;
  intensity: string;
  whyThisDay: string;
  adaptation: string;
  structure: { label: string; minutes: number }[];
};

export type TrainingWeekDay = {
  day: string;
  shortDay: string;
  sessions: TrainingSession[];
};

export const trainingDisciplineOrder: TrainingDiscipline[] = [
  "swim",
  "bike",
  "run",
  "strength",
  "recovery",
];

export const trainingDisciplines: Record<
  TrainingDiscipline,
  { label: string; shortLabel: string }
> = {
  swim: { label: "Natación", shortLabel: "Agua" },
  bike: { label: "Ciclismo", shortLabel: "Bici" },
  run: { label: "Carrera", shortLabel: "Carrera" },
  strength: { label: "Fuerza", shortLabel: "Fuerza" },
  recovery: { label: "Recuperación", shortLabel: "Descanso" },
};

// Synthetic examples for an athlete already accustomed to these disciplines.
// Session structures sum to their duration. Time alone is not training load.
export const trainingWeek: TrainingWeekDay[] = [
  {
    day: "Lunes",
    shortDay: "LUN",
    sessions: [
      {
        id: "monday-swim",
        discipline: "swim",
        title: "Técnica y continuidad",
        minutes: 40,
        objective:
          "Practicar la posición y la continuidad de la brazada sin perseguir velocidad.",
        intensity: "Cómoda. La calidad del gesto marca el límite.",
        whyThisDay:
          "El agua permite trabajar la técnica con poco impacto tras la carrera del domingo anterior.",
        adaptation:
          "Buscamos consolidar el gesto y reducir movimientos que no contribuyen al avance.",
        structure: [
          { label: "Activación", minutes: 8 },
          { label: "Técnica y nado", minutes: 24 },
          { label: "Vuelta a la calma", minutes: 8 },
        ],
      },
      {
        id: "monday-strength",
        discipline: "strength",
        title: "Fuerza aplicada",
        minutes: 35,
        objective:
          "Trabajar patrones de sentadilla, bisagra y apoyo unilateral con una dosis ya tolerada por este atleta ilustrativo.",
        intensity:
          "Carga individual, sin llegar al fallo. La ejecución tiene prioridad.",
        whyThisDay:
          "Se combina con agua cómoda y se separa de la carrera progresiva del miércoles. Si deja fatiga residual, se modifica esa carrera.",
        adaptation:
          "Buscamos mejorar la capacidad de producir fuerza y controlar el apoyo, sin dar por garantizada una mejora del rendimiento.",
        structure: [
          { label: "Preparación del movimiento", minutes: 8 },
          { label: "Patrones principales y pausas", minutes: 22 },
          { label: "Trabajo de tronco", minutes: 5 },
        ],
      },
    ],
  },
  {
    day: "Martes",
    shortDay: "MAR",
    sessions: [
      {
        id: "tuesday-bike",
        discipline: "bike",
        title: "Pedaleo estable",
        minutes: 55,
        objective:
          "Acumular trabajo aeróbico a un esfuerzo sostenible, observando potencia o pulso junto a las sensaciones.",
        intensity:
          "Cómoda y estable. Se ajusta con las referencias individuales; no con una cifra universal.",
        whyThisDay:
          "Evita añadir impacto entre la fuerza del lunes y la carrera del miércoles. No se fuerza el ritmo si las piernas siguen cargadas.",
        adaptation:
          "Buscamos sostener trabajo aeróbico con un coste compatible con el resto de la semana.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Bloque continuo", minutes: 35 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
    ],
  },
  {
    day: "Miércoles",
    shortDay: "MIÉ",
    sessions: [
      {
        id: "wednesday-run",
        discipline: "run",
        title: "Carrera progresiva",
        minutes: 40,
        objective:
          "Pasar de una carrera cómoda a un bloque moderado, manteniendo control del gesto y de la sensación de esfuerzo.",
        intensity:
          "De cómoda a moderada; no es un test máximo. La progresión se reduce si hay fatiga residual.",
        whyThisDay:
          "Es la sesión de carrera con más intención de la semana y va antes del descanso del jueves.",
        adaptation:
          "Buscamos ampliar la capacidad de sostener un esfuerzo moderado y reconocer cómo cambia su coste.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Bloque progresivo", minutes: 20 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
      {
        id: "wednesday-swim",
        discipline: "swim",
        title: "Agua y coordinación",
        minutes: 30,
        objective:
          "Repetir tareas de coordinación sin añadir una segunda sesión exigente.",
        intensity: "Cómoda, con pausas suficientes para mantener la técnica.",
        whyThisDay:
          "Aporta otra exposición técnica con poco impacto. Se separa de la carrera según la disponibilidad del atleta.",
        adaptation:
          "Buscamos consolidar la coordinación mediante práctica frecuente y controlada.",
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Coordinación y pausas", minutes: 20 },
          { label: "Vuelta a la calma", minutes: 5 },
        ],
      },
    ],
  },
  {
    day: "Jueves",
    shortDay: "JUE",
    sessions: [
      {
        id: "thursday-recovery",
        discipline: "recovery",
        title: "Día de recuperación",
        minutes: 0,
        objective:
          "Dejar espacio al descanso y revisar sueño, molestias y sensación de fatiga.",
        intensity: "Sin entrenamiento programado.",
        whyThisDay:
          "Separa la primera mitad de la semana del bloque del fin de semana. No es un hueco que haya que rellenar.",
        adaptation:
          "La recuperación permite asimilar los estímulos; si no es suficiente, se reduce el entrenamiento posterior.",
        structure: [],
      },
    ],
  },
  {
    day: "Viernes",
    shortDay: "VIE",
    sessions: [
      {
        id: "friday-bike",
        discipline: "bike",
        title: "Trabajo de cadencia",
        minutes: 50,
        objective:
          "Explorar la coordinación del pedaleo con cambios de cadencia y esfuerzo cómodo.",
        intensity:
          "Cómoda. Cambiar la cadencia no significa aumentar la intensidad.",
        whyThisDay:
          "Prepara el gesto sin buscar fatiga antes de la salida de fondo del sábado.",
        adaptation:
          "Buscamos ampliar el control del pedaleo en cadencias que el atleta puede sostener con naturalidad.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Cadencia y recuperación", minutes: 30 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
      {
        id: "friday-strength",
        discipline: "strength",
        title: "Control y estabilidad",
        minutes: 30,
        objective:
          "Trabajar tronco y control de cadera con ejercicios conocidos y poca fatiga muscular.",
        intensity:
          "Baja fatiga, sin fallo ni ejercicios nuevos que provoquen agujetas.",
        whyThisDay:
          "Complementa la fuerza del lunes sin colocar una sesión pesada de piernas antes del fin de semana.",
        adaptation:
          "Buscamos controlar la postura y el movimiento en tareas relevantes para la resistencia.",
        structure: [
          { label: "Preparación", minutes: 5 },
          { label: "Control y estabilidad", minutes: 20 },
          { label: "Movilidad cómoda", minutes: 5 },
        ],
      },
    ],
  },
  {
    day: "Sábado",
    shortDay: "SÁB",
    sessions: [
      {
        id: "saturday-bike",
        discipline: "bike",
        title: "Salida de fondo",
        minutes: 80,
        objective:
          "Sostener trabajo aeróbico y observar cómo evolucionan esfuerzo, pulso y técnica con el tiempo.",
        intensity:
          "Cómoda y estable. Se limita la duración si el coste sube más de lo previsto.",
        whyThisDay:
          "Este ejemplo reserva el mayor bloque de tiempo al sábado, después de un viernes de baja exigencia.",
        adaptation:
          "Buscamos desarrollar la tolerancia al trabajo sostenido. No se deduce la durabilidad a partir de una única salida.",
        structure: [
          { label: "Activación", minutes: 15 },
          { label: "Bloque continuo", minutes: 50 },
          { label: "Vuelta a la calma", minutes: 15 },
        ],
      },
      {
        id: "saturday-run",
        discipline: "run",
        title: "Transición a carrera",
        minutes: 15,
        objective:
          "Practicar el cambio de bicicleta a carrera con una dosis corta y controlada.",
        intensity: "Cómoda. No se añade intensidad al terminar la bicicleta.",
        whyThisDay:
          "Va inmediatamente después de la bicicleta para trabajar una demanda específica del triatlón.",
        adaptation:
          "Buscamos familiaridad con la transición y control del gesto al empezar a correr.",
        structure: [
          { label: "Transición", minutes: 5 },
          { label: "Carrera cómoda", minutes: 10 },
        ],
      },
    ],
  },
  {
    day: "Domingo",
    shortDay: "DOM",
    sessions: [
      {
        id: "sunday-run",
        discipline: "run",
        title: "Rodaje cómodo",
        minutes: 45,
        objective:
          "Acumular carrera continua con una sensación cómoda y un gesto estable.",
        intensity:
          "Cómoda, con margen para conversar. Se acorta si queda fatiga del sábado.",
        whyThisDay:
          "La transición del sábado es breve; aquí se añade continuidad sin convertir el fin de semana en dos días exigentes.",
        adaptation:
          "Buscamos tolerancia a la carrera continua, dentro de la carga que el atleta ya puede asimilar.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Rodaje", minutes: 25 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
    ],
  },
];

function exampleSession(id: string): TrainingSession {
  const session = trainingWeek
    .flatMap((day) => day.sessions)
    .find((item) => item.id === id);
  if (!session) throw new Error(`Unknown illustrative session: ${id}`);
  return session;
}

// A second editorial example chosen by a coach, not an automatic prescription.
// Easy volume is reduced; no extra intensity compensates for fewer minutes.
export const reducedTrainingWeek: TrainingWeekDay[] = [
  {
    ...trainingWeek[0],
    sessions: [
      {
        ...exampleSession("monday-swim"),
        minutes: 30,
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Técnica y nado", minutes: 20 },
          { label: "Vuelta a la calma", minutes: 5 },
        ],
      },
      {
        ...exampleSession("monday-strength"),
        minutes: 25,
        objective:
          "Mantener los patrones principales con menos series, pausas completas y buena ejecución.",
        structure: [
          { label: "Preparación del movimiento", minutes: 7 },
          { label: "Patrones principales y pausas", minutes: 15 },
          { label: "Trabajo de tronco", minutes: 3 },
        ],
      },
    ],
  },
  {
    ...trainingWeek[1],
    sessions: [
      {
        ...exampleSession("tuesday-bike"),
        minutes: 40,
        structure: [
          { label: "Activación", minutes: 8 },
          { label: "Bloque continuo", minutes: 24 },
          { label: "Vuelta a la calma", minutes: 8 },
        ],
      },
    ],
  },
  {
    ...trainingWeek[2],
    sessions: [
      {
        ...exampleSession("wednesday-run"),
        minutes: 30,
        objective:
          "Conservar un bloque progresivo más corto sin subir su intensidad ni recortar el calentamiento.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Bloque progresivo", minutes: 10 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
    ],
  },
  trainingWeek[3],
  {
    ...trainingWeek[4],
    sessions: [
      {
        ...exampleSession("wednesday-swim"),
        id: "friday-swim",
        minutes: 25,
        whyThisDay:
          "Se mueve aquí para repartir mejor los horarios. Sustituye la bicicleta complementaria del viernes, sin sumar carga.",
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Coordinación y pausas", minutes: 15 },
          { label: "Vuelta a la calma", minutes: 5 },
        ],
      },
      {
        ...exampleSession("friday-strength"),
        minutes: 20,
        structure: [
          { label: "Preparación", minutes: 5 },
          { label: "Control y estabilidad", minutes: 10 },
          { label: "Movilidad cómoda", minutes: 5 },
        ],
      },
    ],
  },
  {
    ...trainingWeek[5],
    sessions: [
      {
        ...exampleSession("saturday-bike"),
        title: "Continuidad en bicicleta",
        minutes: 50,
        objective:
          "Mantener continuidad aeróbica dentro del tiempo disponible. Esta sesión más corta no equivale al estímulo de fondo original.",
        whyThisDay:
          "Se conserva el trabajo específico del sábado, con menos volumen y sin hacerlo más intenso.",
        adaptation:
          "Buscamos continuidad del trabajo aeróbico; aceptamos que esta semana habrá menos exposición al esfuerzo prolongado.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Bloque continuo", minutes: 30 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
      {
        ...exampleSession("saturday-run"),
        minutes: 10,
        structure: [
          { label: "Transición", minutes: 5 },
          { label: "Carrera cómoda", minutes: 5 },
        ],
      },
    ],
  },
  {
    ...trainingWeek[6],
    sessions: [
      {
        ...exampleSession("sunday-run"),
        minutes: 30,
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Rodaje", minutes: 20 },
          { label: "Vuelta a la calma", minutes: 5 },
        ],
      },
    ],
  },
];

export const trainingScenarios = {
  standard: {
    label: "Disponibilidad habitual",
    week: trainingWeek,
    explanation:
      "Una semana de triatlón que combina continuidad aeróbica, práctica técnica, fuerza y un día sin entrenamiento.",
    decisions: [
      "Una sola carrera progresiva; el resto del trabajo de resistencia es cómodo.",
      "La fuerza principal va el lunes; el viernes se evita una sesión pesada de piernas.",
      "El sábado concentra el mayor bloque de tiempo, no la mayor intensidad.",
    ],
  },
  reduced: {
    label: "Esta semana, menos tiempo",
    week: reducedTrainingWeek,
    explanation:
      "Otro ejemplo elegido por un entrenador: recortamos volumen complementario, redistribuimos el agua y conservamos fuerza y descanso. No compensamos con más intensidad.",
    decisions: [
      "Se elimina la bicicleta complementaria del viernes y se mueve allí la segunda sesión de agua.",
      "Se acortan los bloques; se mantienen las pausas de fuerza y el descanso del jueves.",
      "Menos tiempo implica menos estímulo de fondo. Las prioridades se revisan según el objetivo y la respuesta del atleta.",
    ],
  },
} as const;

export type TrainingScenarioId = keyof typeof trainingScenarios;
