"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/ui";
import type { ArticleCategory, TrainingArticle } from "@/data/articles/types";

export type ArticlePreview = Pick<
  TrainingArticle,
  "slug" | "title" | "description" | "category" | "level" | "keyword"
> & { readingMinutes: number };

function searchable(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function ArticleDirectory({
  articles,
  categories,
}: {
  articles: ArticlePreview[];
  categories: ArticleCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory | "Todas">("Todas");
  const words = searchable(query.trim()).split(/\s+/).filter(Boolean);
  const filtered = articles.filter((article) => {
    if (category !== "Todas" && article.category !== category) return false;
    const text = searchable(
      `${article.title} ${article.description} ${article.keyword} ${article.category}`,
    );
    return words.every((word) => text.includes(word));
  });

  function reset() {
    setQuery("");
    setCategory("Todas");
  }

  return (
    <section className="article-directory" aria-labelledby="directory-title">
      <div className="article-directory-heading">
        <div>
          <p className="eyebrow">Encuentra tu siguiente paso</p>
          <h2 id="directory-title">Las guías.</h2>
        </div>
        <div className="article-search">
          <label htmlFor="article-search">¿Qué quieres aprender?</label>
          <div className="article-search-field">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="article-search"
              type="search"
              placeholder="Por ejemplo: primeros 5 km, fuerza…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              aria-controls="article-results"
            />
          </div>
        </div>
      </div>
      <div
        className="article-categories"
        role="group"
        aria-label="Filtrar guías por tema"
      >
        {(["Todas", ...categories] as const).map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            aria-controls="article-results"
            onClick={() => setCategory(item)}
          >
            {item}
            <span>
              {item === "Todas"
                ? articles.length
                : articles.filter((article) => article.category === item)
                    .length}
            </span>
          </button>
        ))}
      </div>
      <div className="article-results-heading">
        <p role="status" aria-live="polite" aria-atomic="true">
          {filtered.length === 1 ? "1 guía" : `${filtered.length} guías`}
          {category !== "Todas" && ` · ${category}`}
          {query.trim() && ` · «${query.trim()}»`}
        </p>
        {(query || category !== "Todas") && (
          <button type="button" className="article-reset" onClick={reset}>
            Ver todas las guías
          </button>
        )}
      </div>
      <div id="article-results" className="article-grid">
        {filtered.map((article, index) => (
          <article className="article-card" key={article.slug}>
            <div className="article-card-top">
              <span className="article-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{article.category}</span>
            </div>
            <h3>
              <Link href={`/articulos/${article.slug}`} prefetch={false}>
                {article.title}
              </Link>
            </h3>
            <p>{article.description}</p>
            <div className="article-card-bottom">
              <span>
                {article.level} · {article.readingMinutes} min
              </span>
              <Arrow diagonal />
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="article-empty">
          <h3>No hemos encontrado una guía con esa búsqueda.</h3>
          <p>
            Prueba con otro tema, como «correr», «triatlón» o «fuerza», o vuelve
            a explorar la biblioteca completa.
          </p>
          <button type="button" className="button accent" onClick={reset}>
            Ver todas las guías <Arrow />
          </button>
        </div>
      )}
    </section>
  );
}
