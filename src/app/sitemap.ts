import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { trainingArticles } from "@/data/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/social`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/planes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/articulos`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${site.url}/entrenador-triatlon-online`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...trainingArticles.map((article) => ({
      url: `${site.url}/articulos/${article.slug}`,
      lastModified: new Date(`${article.publishedAt}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
