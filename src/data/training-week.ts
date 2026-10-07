export type TrainingDiscipline = "swim" | "bike" | "run" | "recovery";

export type TrainingSession = {
  id: string;
  discipline: TrainingDiscipline;
  title: string;
  minutes: number;
  objective: string;
  structure: { label: string; minutes: number }[];
};

export const trainingDisciplines: Record<
  TrainingDiscipline,
  { label: string; shortLabel: string }
> = {
  swim: { label: "Natación", shortLabel: "Agua" },
  bike: { label: "Ciclismo", shortLabel: "Bici" },
  run: { label: "Carrera", shortLabel: "Carrera" },
  recovery: { label: "Recuperación", shortLabel: "Descanso" },
};

// Fictional planning example. These loads are illustrative, not an individual plan.
export const trainingWeek: {
  day: string;
  shortDay: string;
  sessions: TrainingSession[];
}[] = [
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
          "Dedicar tiempo a la posición en el agua y a un gesto continuo.",
        structure: [
          { label: "Activación", minutes: 8 },
          { label: "Técnica y nado", minutes: 24 },
          { label: "Vuelta a la calma", minutes: 8 },
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
          "Reconocer un esfuerzo sostenible y mantener un pedaleo fluido.",
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
          "Observar cómo cambia la sensación de esfuerzo a lo largo de la carrera.",
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
          "Volver al agua con atención a la coordinación y a las sensaciones.",
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Coordinación", minutes: 20 },
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
          "Dejar espacio al descanso y revisar las sensaciones de la semana.",
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
          "Explorar diferentes cadencias manteniendo un gesto controlado.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Cadencia", minutes: 30 },
          { label: "Vuelta a la calma", minutes: 10 },
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
          "Acumular tiempo sobre la bicicleta con una sensación de esfuerzo estable.",
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
          "Familiarizarse con las primeras sensaciones al pasar de la bici a la carrera.",
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
          "Correr de forma continua prestando atención a las sensaciones.",
        structure: [
          { label: "Activación", minutes: 10 },
          { label: "Rodaje", minutes: 25 },
          { label: "Vuelta a la calma", minutes: 10 },
        ],
      },
      {
        id: "sunday-swim",
        discipline: "swim",
        title: "Soltar en el agua",
        minutes: 30,
        objective:
          "Cerrar la semana con un nado cómodo, sin perseguir un ritmo concreto.",
        structure: [
          { label: "Activación", minutes: 5 },
          { label: "Nado cómodo", minutes: 20 },
          { label: "Vuelta a la calma", minutes: 5 },
        ],
      },
    ],
  },
];
