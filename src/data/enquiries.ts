export const enquiryInterestLabels = {
  coaching: "Entrenamiento individual",
  social_run: "Social Runs",
  social_ride: "Social Rides",
  collective: "Comunidad ICARO",
  tests: "Pruebas y evaluaciones",
} as const;

export type EnquiryInterest = keyof typeof enquiryInterestLabels;

export function socialEnquiryDefaults(interest: string) {
  if (interest === "social_run")
    return {
      sport: "Carrera",
      goal: "Consultar las próximas quedadas de Social Runs",
    };
  if (interest === "social_ride")
    return {
      sport: "Ciclismo",
      goal: "Consultar las próximas salidas de Social Rides",
    };
  return { sport: "", goal: "" };
}

export const leadCategoryLabels = {
  individual: "Entrenamiento Individual",
  seguimiento: "Entrenamiento Seguimiento",
  rendimiento: "Entrenamiento Rendimiento",
  coaching: "Entrenamiento por definir",
  social_run: "Social Runs",
  social_ride: "Social Rides",
  collective: "Comunidad ICARO",
  tests: "Pruebas y evaluaciones",
} as const;

export type LeadCategory = keyof typeof leadCategoryLabels;
