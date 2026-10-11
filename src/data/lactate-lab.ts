export type LabDisciplineId = "running" | "cycling" | "swimming";
export type LabAssessmentId = "a" | "b";

export type LabSample = {
  intensity: number;
  lactate: number;
  heartRate: number | null;
};

export type LabThreshold = {
  intensity: number;
  range: readonly [number, number];
};

export type LabAssessment = {
  label: string;
  samples: readonly LabSample[];
  lt1: LabThreshold;
  lt2: LabThreshold;
};

export type LabDiscipline = {
  id: LabDisciplineId;
  label: string;
  intensityLabel: string;
  axisLabel: string;
  formatIntensity: (intensity: number) => string;
  assessment: Record<LabAssessmentId, LabAssessment>;
  context: string;
};

function pace(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

// Educational, invented observations. The threshold references and ranges are
// assigned explicitly to the example, not calculated from a fixed concentration
// (such as 2 or 4 mmol/L), and must never be used as an athlete's training zones.
export const lactateDisciplines: readonly LabDiscipline[] = [
  {
    id: "running",
    label: "Carrera",
    intensityLabel: "Ritmo",
    axisLabel: "Ritmo de carrera · min/km · intensidad creciente →",
    formatIntensity: (speed) => `${pace(3600 / speed)} /km`,
    assessment: {
      a: {
        label: "Evaluación A",
        samples: [
          { intensity: 9, lactate: 1.1, heartRate: 135 },
          { intensity: 10.5, lactate: 1.1, heartRate: 142 },
          { intensity: 12, lactate: 1.4, heartRate: 149 },
          { intensity: 13.5, lactate: 2.2, heartRate: 157 },
          { intensity: 15, lactate: 3.6, heartRate: 165 },
          { intensity: 16.5, lactate: 5.8, heartRate: 173 },
          { intensity: 18, lactate: 8.6, heartRate: 181 },
        ],
        lt1: { intensity: 11.5, range: [11.1, 11.9] },
        lt2: { intensity: 14.6, range: [14.2, 15] },
      },
      b: {
        label: "Evaluación B",
        samples: [
          { intensity: 9, lactate: 1, heartRate: 132 },
          { intensity: 10.5, lactate: 1, heartRate: 138 },
          { intensity: 12, lactate: 1.1, heartRate: 145 },
          { intensity: 13.5, lactate: 1.5, heartRate: 152 },
          { intensity: 15, lactate: 2.5, heartRate: 160 },
          { intensity: 16.5, lactate: 4.2, heartRate: 168 },
          { intensity: 18, lactate: 6.7, heartRate: 176 },
        ],
        lt1: { intensity: 12.4, range: [12, 12.8] },
        lt2: { intensity: 15.7, range: [15.3, 16.1] },
      },
    },
    context:
      "Relacionamos el ritmo con la respuesta interna y las sensaciones. La superficie, la temperatura y la fatiga también cambian el coste de correr.",
  },
  {
    id: "cycling",
    label: "Ciclismo",
    intensityLabel: "Potencia",
    axisLabel: "Potencia · W · intensidad creciente →",
    formatIntensity: (watts) => `${Math.round(watts)} W`,
    assessment: {
      a: {
        label: "Evaluación A",
        samples: [
          { intensity: 100, lactate: 1, heartRate: 117 },
          { intensity: 130, lactate: 1.1, heartRate: 124 },
          { intensity: 160, lactate: 1.5, heartRate: 132 },
          { intensity: 190, lactate: 2.3, heartRate: 140 },
          { intensity: 220, lactate: 3.9, heartRate: 149 },
          { intensity: 250, lactate: 6.1, heartRate: 158 },
          { intensity: 280, lactate: 8.8, heartRate: 168 },
        ],
        lt1: { intensity: 150, range: [140, 160] },
        lt2: { intensity: 216, range: [206, 226] },
      },
      b: {
        label: "Evaluación B",
        samples: [
          { intensity: 100, lactate: 0.9, heartRate: 114 },
          { intensity: 130, lactate: 1, heartRate: 120 },
          { intensity: 160, lactate: 1.2, heartRate: 127 },
          { intensity: 190, lactate: 1.7, heartRate: 135 },
          { intensity: 220, lactate: 2.8, heartRate: 144 },
          { intensity: 250, lactate: 4.6, heartRate: 153 },
          { intensity: 280, lactate: 7.1, heartRate: 163 },
        ],
        lt1: { intensity: 170, range: [160, 180] },
        lt2: { intensity: 236, range: [226, 246] },
      },
    },
    context:
      "Los vatios describen trabajo externo. Lactato, frecuencia cardiaca y sensaciones ayudan a interpretar su coste: igual potencia no siempre significa igual respuesta.",
  },
  {
    id: "swimming",
    label: "Natación",
    intensityLabel: "Ritmo",
    axisLabel: "Ritmo de natación · min/100 m · intensidad creciente →",
    formatIntensity: (speed) => `${pace(100 / speed)} /100 m`,
    assessment: {
      a: {
        label: "Evaluación A",
        samples: [
          { intensity: 100 / 135, lactate: 1, heartRate: null },
          { intensity: 100 / 126, lactate: 1, heartRate: null },
          { intensity: 100 / 118, lactate: 1.2, heartRate: null },
          { intensity: 100 / 111, lactate: 1.9, heartRate: null },
          { intensity: 100 / 105, lactate: 3.2, heartRate: null },
          { intensity: 100 / 100, lactate: 5.2, heartRate: null },
          { intensity: 100 / 95, lactate: 7.9, heartRate: null },
        ],
        lt1: { intensity: 0.82, range: [0.805, 0.835] },
        lt2: { intensity: 0.94, range: [0.925, 0.955] },
      },
      b: {
        label: "Evaluación B",
        samples: [
          { intensity: 100 / 135, lactate: 0.9, heartRate: null },
          { intensity: 100 / 126, lactate: 0.9, heartRate: null },
          { intensity: 100 / 118, lactate: 1, heartRate: null },
          { intensity: 100 / 111, lactate: 1.4, heartRate: null },
          { intensity: 100 / 105, lactate: 2.4, heartRate: null },
          { intensity: 100 / 100, lactate: 4.1, heartRate: null },
          { intensity: 100 / 95, lactate: 6.5, heartRate: null },
        ],
        lt1: { intensity: 0.87, range: [0.855, 0.885] },
        lt2: { intensity: 1.01, range: [0.995, 1.025] },
      },
    },
    context:
      "El ritmo en el agua exige contexto técnico: longitud de piscina, pausas y eficiencia de nado influyen en la lectura. Esta demostración no registra frecuencia cardiaca.",
  },
];

export const lactateInterpretations = [
  {
    label: "Por debajo de la referencia LT1",
    observation:
      "En este ejemplo, el lactato permanece cercano a las concentraciones iniciales. Esto aporta contexto sobre la respuesta a una intensidad baja.",
    decision:
      "Para desarrollar la base, valoramos duración, continuidad y coste de recuperación. Una cifra baja no convierte cualquier volumen en adecuado.",
  },
  {
    label: "Entre las referencias LT1 y LT2",
    observation:
      "La concentración aumenta con los escalones. Miramos la curva completa, la frecuencia cardiaca y las sensaciones antes de convertirla en una decisión.",
    decision:
      "El objetivo determina cuánto tiempo trabajamos, cómo distribuimos las pausas y qué recuperación dejamos. El ritmo o la potencia no definen por sí solos la sesión.",
  },
  {
    label: "Por encima de la referencia LT2",
    observation:
      "La acumulación es mayor en los últimos escalones. Una prueba incremental aislada no demuestra cuánto tiempo puede sostenerse esta intensidad.",
    decision:
      "Los bloques exigentes necesitan una dosis y una recuperación coherentes. Contrastamos estas referencias con sesiones, pruebas de campo y respuesta del atleta.",
  },
] as const;
