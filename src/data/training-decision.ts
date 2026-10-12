/**
 * Publish a case only after its source data and publication permission have
 * been checked. Leave null until an authorised, anonymised case is available.
 * The interactive laboratory uses illustrative data and is not a client case.
 */
export type TrainingDecisionCase = {
  title: string;
  discipline: "Triatlón" | "Carrera" | "Ciclismo";
  situation: string;
  observations: { label: string; value: string; context?: string }[];
  hypothesis: string;
  decision: string;
  adaptation: string;
  publication: {
    authorized: true;
    anonymized: true;
    sourceChecked: true;
    reviewedAt: string;
  };
  verifiedOutcome?: {
    description: string;
    measuredAt: string;
    sourceChecked: true;
  };
};

export const trainingDecisionCase: TrainingDecisionCase | null = null;
