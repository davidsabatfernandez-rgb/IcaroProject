import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main id="contenido" className="articles-main article-not-found">
      <p className="eyebrow">Guías ICARO / 404</p>
      <h1>No encontramos esa guía.</h1>
      <p>
        Puedes volver a la biblioteca y buscar otro tema para tu siguiente paso.
      </p>
      <Link className="button accent" href="/articulos">
        Explorar las guías
      </Link>
    </main>
  );
}
