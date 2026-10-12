import { beginnerRunningArticles } from "./beginner-running";
import { intermediateRunningArticles } from "./intermediate-running";
import { triathlonArticles } from "./triathlon";
import { coachingStrengthArticles } from "./coaching-strength";
import type { ArticleCategory, TrainingArticle } from "./types";

export const articleCategories: ArticleCategory[] = [
  "Empezar a correr",
  "Mejorar en carrera",
  "Iniciación al triatlón",
  "Entrenamiento personalizado",
  "Fuerza y hábitos",
];

export const trainingArticles: TrainingArticle[] = [
  ...beginnerRunningArticles,
  ...intermediateRunningArticles,
  ...triathlonArticles,
  ...coachingStrengthArticles,
];

export function getArticle(slug: string) {
  return trainingArticles.find((article) => article.slug === slug);
}

export function articleReadingMinutes(article: TrainingArticle) {
  const text = [
    article.introduction,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...article.takeaways,
    ...article.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
