import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Arrow } from "@/components/ui";
import { EnquiryLink } from "@/components/enquiry-link";
import { ArticleDirectory } from "@/components/articles/article-directory";
import {
  articleCategories,
  articleReadingMinutes,
  trainingArticles,
} from "@/data/articles";

const description =
  "Guías de carrera, triatlón, fuerza y entrenamiento personalizado para empezar y mejorar: resuelve tus dudas y encuentra tu siguiente paso con ICARO.";

export const metadata: Metadata = {
  title: "Guías para empezar y mejorar en carrera y triatlón · ICARO PROJECT",
  description,
  alternates: { canonical: `${site.url}/articulos` },
  openGraph: {
    title: "Guías para entrenar con propósito · ICARO PROJECT",
    description,
    url: `${site.url}/articulos`,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ICARO PROJECT. Entrena con propósito.",
      },
    ],
  },
};

export default function ArticlesPage() {
  const articles = trainingArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    keyword: article.keyword,
    category: article.category,
    level: article.level,
    readingMinutes: articleReadingMinutes(article),
  }));

  return (
    <main id="contenido" className="articles-main">
      <section className="articles-hero" aria-labelledby="articles-title">
        <nav className="article-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Guías</span>
        </nav>
        <div className="articles-hero-grid">
          <div>
            <p className="eyebrow">El conocimiento también se entrena</p>
            <h1 id="articles-title">
              MENOS DUDAS.
              <br />
              <em>MÁS DIRECCIÓN.</em>
            </h1>
            <p className="articles-hero-copy">
              Desde tu primer kilómetro hasta tu siguiente reto. Guías claras
              para entender tu entrenamiento, elegir mejor y avanzar a tu ritmo.
            </p>
          </div>
          <div className="articles-hero-aside">
            <div className="articles-library-mark" aria-hidden="true">
              <svg viewBox="0 0 260 170" fill="none">
                <path
                  d="M8 143H252M8 112H252M8 81H252M8 50H252M8 19H252"
                  stroke="currentColor"
                  opacity=".18"
                />
                <path
                  d="M17 139c34 0 28-21 55-21s25-30 54-30 25-25 51-25 38-26 61-36"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="72" cy="118" r="5" fill="currentColor" />
                <circle cx="126" cy="88" r="5" fill="currentColor" />
                <circle cx="177" cy="63" r="5" fill="currentColor" />
                <circle cx="238" cy="27" r="5" fill="currentColor" />
              </svg>
            </div>
            <p>
              <strong>{trainingArticles.length} guías.</strong> Un objetivo: que
              sepas por qué haces lo que haces.
            </p>
            <span>CARRERA / TRIATLÓN / FUERZA / HÁBITOS</span>
          </div>
        </div>
      </section>
      <ArticleDirectory articles={articles} categories={articleCategories} />
      <section
        className="article-enquiry"
        aria-labelledby="article-enquiry-title"
      >
        <div>
          <p className="eyebrow">De la información a tu preparación</p>
          <h2 id="article-enquiry-title">
            TU CONTEXTO
            <br />
            CAMBIA EL PLAN.
          </h2>
        </div>
        <div>
          <p>
            Tu tiempo, tu punto de partida y tu objetivo merecen una preparación
            que encaje contigo. Cuéntanos dónde estás y buscamos el siguiente
            paso.
          </p>
          <EnquiryLink
            className="button accent"
            interest="coaching"
            source="articulos"
          >
            Cuéntanos tu objetivo <Arrow diagonal />
          </EnquiryLink>
        </div>
      </section>
    </main>
  );
}
