import type { LeadCategory } from "./enquiries";

export const leadProfileOptions = {
  experience: [
    { value: "starting", label: "Estoy empezando o retomando" },
    { value: "regular", label: "Entreno de forma regular" },
    { value: "competition", label: "Tengo experiencia en competición" },
    { value: "unsure", label: "Prefiero explicarlo en la conversación" },
  ],
  weeklyHours: [
    { value: "under-3", label: "Menos de 3 horas" },
    { value: "3-5", label: "De 3 a 5 horas" },
    { value: "6-8", label: "De 6 a 8 horas" },
    { value: "9-12", label: "De 9 a 12 horas" },
    { value: "over-12", label: "Más de 12 horas" },
    { value: "unsure", label: "Aún no lo sé" },
  ],
  difficulty: [
    { value: "consistency", label: "Mantener la continuidad" },
    { value: "planning", label: "Organizar mi semana" },
    { value: "intensity", label: "Ajustar intensidad y recuperación" },
    { value: "progress", label: "Entender mi evolución" },
    { value: "preparation", label: "Preparar un objetivo concreto" },
    { value: "other", label: "Prefiero explicarlo en la conversación" },
  ],
  support: [
    { value: "individual", label: "Plan y revisión semanal" },
    { value: "followup", label: "Seguimiento con llamada semanal" },
    {
      value: "performance",
      label: "Rendimiento y comunicación prioritaria",
    },
    { value: "unsure", label: "Quiero que me orientéis" },
  ],
  budget: [
    { value: "under-100", label: "Hasta 100 €/mes" },
    { value: "100-150", label: "Entre 100 y 150 €/mes" },
    { value: "150-200", label: "Entre 150 y 200 €/mes" },
    { value: "over-200", label: "Más de 200 €/mes" },
    { value: "options", label: "Prefiero conocer opciones" },
  ],
} as const;

export type LeadProfileOption = keyof typeof leadProfileOptions;
export type LeadProfile = Record<LeadProfileOption | "goalDate", string>;

export const emptyLeadProfile: LeadProfile = {
  goalDate: "",
  experience: "",
  weeklyHours: "",
  difficulty: "",
  support: "",
  budget: "",
};

export const leadProfileLabels: Record<LeadProfileOption | "goalDate", string> =
  {
    goalDate: "Fecha aproximada",
    experience: "Experiencia previa",
    weeklyHours: "Horas semanales disponibles",
    difficulty: "Principal dificultad",
    support: "Seguimiento deseado",
    budget: "Presupuesto mensual orientativo del atleta",
  };

export function profileLabel(field: LeadProfileOption, value: string) {
  return leadProfileOptions[field].find((option) => option.value === value)
    ?.label;
}

export function profileLines(profile: LeadProfile) {
  return (Object.keys(profile) as (keyof LeadProfile)[])
    .filter((field) => profile[field])
    .map(
      (field) =>
        `${leadProfileLabels[field]}: ${field === "goalDate" ? profile[field] : profileLabel(field, profile[field])}`,
    );
}

export function supportForPlan(plan: string) {
  if (/rendimiento|performance/i.test(plan)) return "performance";
  if (/seguimiento|coaching/i.test(plan)) return "followup";
  if (/individual/i.test(plan)) return "individual";
  return "";
}

export function planForSupport(support: string) {
  return (
    (
      {
        individual: "Individual",
        followup: "Seguimiento",
        performance: "Rendimiento",
      } as Record<string, string>
    )[support] || ""
  );
}

export function leadCategory(
  interest: string,
  plan: string,
  support: string,
): LeadCategory {
  if (
    interest === "social_run" ||
    interest === "social_ride" ||
    interest === "collective" ||
    interest === "tests"
  )
    return interest;
  const preference = support || supportForPlan(plan);
  if (preference === "individual") return "individual";
  if (preference === "followup") return "seguimiento";
  if (preference === "performance") return "rendimiento";
  return "coaching";
}

/** A routing hint for human review, never a rejection or a confirmed sale. */
export function leadQualification({
  interest,
  goal,
  profile,
  plan,
}: {
  interest: string;
  goal: string;
  profile: LeadProfile;
  plan: string;
}): "potential_fit" | "pending_review" {
  const hasKnownTime = ["3-5", "6-8", "9-12", "over-12"].includes(
    profile.weeklyHours,
  );
  const support = profile.support || supportForPlan(plan);
  return interest === "coaching" &&
    goal.trim().length >= 10 &&
    hasKnownTime &&
    (support === "followup" || support === "performance")
    ? "potential_fit"
    : "pending_review";
}
