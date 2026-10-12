import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { Arrow } from "@/components/ui";
import { EnquiryLink } from "@/components/enquiry-link";
import {
  articleReadingMinutes,
  getArticle,
  trainingArticles,
} from "@/data/articles";
import type { TrainingArticle } from "@/data/articles/types";

type ArticleProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return trainingArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const url = `${site.url}/articulos/${article.slug}`;
  return {
    title: `${article.title} · ICARO PROJECT`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      locale: "es_ES",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "ICARO PROJECT. Entrena con propósito.",
        },
      ],
      publishedTime: article.publishedAt,
      authors: [site.brandName],
      section: article.category,
      tags: [article.keyword],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function relatedArticles(article: TrainingArticle) {
  const candidates = [
    ...article.relatedSlugs
      .map(getArticle)
      .filter((item): item is TrainingArticle => !!item),
    ...trainingArticles.filter((item) => item.category === article.category),
    ...trainingArticles,
  ];
  const seen = new Set([article.slug]);
  return candidates
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .slice(0, 3);
}

export default async function ArticlePage({ params }: ArticleProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const canonical = `${site.url}/articulos/${article.slug}`;
  const publishedDate = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${article.publishedAt}T12:00:00Z`));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#articulo`,
        headline: article.title,
        description: article.description,
        inLanguage: "es-ES",
        articleSection: article.category,
        keywords: article.keyword,
        datePublished: article.publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: {
          "@type": "Organization",
          name: site.brandName,
          url: site.url,
        },
        publisher: {
          "@type": "Organization",
          name: site.brandName,
          url: site.url,
          ...(site.logo.src
            ? {
                logo: {
                  "@type": "ImageObject",
                  url: new URL(site.logo.src, site.url).href,
                },
              }
            : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guías",
            item: `${site.url}/articulos`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <main id="contenido" className="articles-main article-detail-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <article className="article-detail">
        <header className="article-detail-header">
          <nav className="article-breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/articulos">Guías</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.category}</span>
          </nav>
          <p className="eyebrow">
            {article.category} / {article.level}
          </p>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-byline">
            <span>Equipo ICARO PROJECT</span>
            <span>{articleReadingMinutes(article)} min de lectura</span>
            <time dateTime={article.publishedAt}>{publishedDate}</time>
          </div>
        </header>
        <div className="article-reading-layout">
          <aside className="article-toc" aria-labelledby="article-toc-title">
            <p id="article-toc-title" className="eyebrow">
              En esta guía
            </p>
            <ol>
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#apartado-${index + 1}`}>{section.heading}</a>
                </li>
              ))}
              <li>
                <a href="#ideas-clave">Qué llevarte de esta guía</a>
              </li>
              {article.faq.length > 0 && (
                <li>
                  <a href="#dudas-frecuentes">Dudas frecuentes</a>
                </li>
              )}
            </ol>
            <Link className="article-back-link" href="/articulos">
              Todas las guías <Arrow />
            </Link>
          </aside>
          <div className="article-body">
            <p className="article-introduction">{article.introduction}</p>
            {article.sections.map((section, index) => (
              <section
                className="article-body-section"
                id={`apartado-${index + 1}`}
                key={section.heading}
              >
                <span className="article-section-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} /
                </span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section
              id="ideas-clave"
              className="article-takeaways"
              aria-labelledby="article-takeaways-title"
            >
              <p className="eyebrow">Para tu siguiente entrenamiento</p>
              <h2 id="article-takeaways-title">Qué llevarte de esta guía</h2>
              <ul>
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>
            {article.faq.length > 0 && (
              <section
                id="dudas-frecuentes"
                className="article-faq"
                aria-labelledby="article-faq-title"
              >
                <h2 id="article-faq-title">Dudas frecuentes</h2>
                {article.faq.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </section>
            )}
          </div>
        </div>
      </article>
      <section
        className="article-enquiry article-detail-enquiry"
        aria-labelledby="article-enquiry-title"
      >
        <div>
          <p className="eyebrow">Tu próximo paso</p>
          <h2 id="article-enquiry-title">
            ENTENDERLO
            <br />
            ES EL PRINCIPIO.
          </h2>
        </div>
        <div>
          <p>
            Para convertir estas ideas en tu preparación necesitamos conocerte:
            tu experiencia, tu disponibilidad y lo que quieres conseguir. En
            ICARO ajustamos el entrenamiento a tu semana y revisamos cómo
            respondes.
          </p>
          <EnquiryLink
            className="button accent"
            interest="coaching"
            source={`articulo-${article.slug}`.slice(0, 80)}
          >
            Hablemos de tu preparación <Arrow diagonal />
          </EnquiryLink>
        </div>
      </section>
      <section
        className="article-related"
        aria-labelledby="article-related-title"
      >
        <div className="article-related-heading">
          <h2 id="article-related-title">Sigue aprendiendo.</h2>
          <Link href="/articulos" className="article-back-link">
            Ver todas las guías <Arrow />
          </Link>
        </div>
        <div className="article-grid">
          {relatedArticles(article).map((related, index) => (
            <article className="article-card" key={related.slug}>
              <div className="article-card-top">
                <span className="article-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{related.category}</span>
              </div>
              <h3>
                <Link href={`/articulos/${related.slug}`} prefetch={false}>
                  {related.title}
                </Link>
              </h3>
              <p>{related.description}</p>
              <div className="article-card-bottom">
                <span>
                  {related.level} · {articleReadingMinutes(related)} min
                </span>
                <Arrow diagonal />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
