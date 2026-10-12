export type ArticleCategory =
  | "Empezar a correr"
  | "Mejorar en carrera"
  | "Iniciación al triatlón"
  | "Entrenamiento personalizado"
  | "Fuerza y hábitos";

export type TrainingArticle = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  keyword: string;
  level: "Iniciación" | "Intermedio" | "Todos los niveles";
  publishedAt: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  takeaways: string[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
};
