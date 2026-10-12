import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import { getArticle, articleReadingMinutes } from "@/data/articles";

const featuredSlugs = [
  "empezar-a-correr-desde-cero",
  "primer-triatlon-sprint",
  "entrenador-carrera-online-principiantes",
];

export function ExploreSection() {
  return (
    <div className="icaro-explore">
      <section
        className="explore-collection"
        aria-labelledby="collection-title"
      >
        <div className="explore-collection-image">
          <Image
            src="/images/shop/collection.jpg"
            alt="Diseños conceptuales ICARO: camisetas, sudadera y gorra en carbón, cobre y marfil"
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span>VISUALIZACIÓN DE LA FUTURA COLECCIÓN</span>
        </div>
        <div className="explore-collection-copy">
          <p className="eyebrow">ICARO TEAM / COLECCIÓN EN DISEÑO</p>
          <h2 id="collection-title">
            EL EQUIPO
            <br />
            <em>SE LLEVA CONTIGO.</em>
          </h2>
          <p>
            Una identidad que compartimos dentro y fuera del entrenamiento.
            Descubre nuestros diseños de camisetas técnicas, sudadera y
            accesorios.
          </p>
          <Link href="/tienda" className="button accent">
            Explorar la tienda <Arrow diagonal />
          </Link>
          <small>
            Prendas conceptuales. Puedes probar el carrito y la simulación de
            compra, sin cobros reales.
          </small>
        </div>
      </section>
      <section
        className="section explore-guides"
        aria-labelledby="guides-title"
      >
        <div className="explore-guides-heading">
          <div>
            <p className="eyebrow">
              GUÍAS ICARO / DEL PRIMER PASO AL SIGUIENTE RETO
            </p>
            <h2 id="guides-title">
              ENTENDERLO
              <br />
              <em>TAMBIÉN ES AVANZAR.</em>
            </h2>
          </div>
          <div>
            <p>
              50 guías sobre carrera, triatlón, fuerza y preparación
              personalizada. Respuestas prácticas para empezar con criterio y
              mejorar a tu ritmo.
            </p>
            <Link href="/articulos" className="text-link">
              Ver todos los artículos <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="explore-guide-grid">
          {featuredSlugs.map((slug, index) => {
            const article = getArticle(slug);
            if (!article) return null;
            return (
              <article className="explore-guide-card" key={slug}>
                <div>
                  <span>0{index + 1} /</span>
                  <span>{article.category}</span>
                </div>
                <h3>
                  <Link href={`/articulos/${slug}`} prefetch={false}>
                    {article.title}
                    <Arrow diagonal />
                  </Link>
                </h3>
                <p>{article.description}</p>
                <small>
                  {article.level} · {articleReadingMinutes(article)} min de
                  lectura
                </small>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
