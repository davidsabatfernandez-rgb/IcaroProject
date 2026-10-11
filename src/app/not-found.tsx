import Link from "next/link";
import { Wordmark } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="contenido" className="section" style={{ maxWidth: 900 }}>
      <Link href="/" aria-label="Volver al inicio de ICARO PROJECT">
        <Wordmark />
      </Link>
      <p className="eyebrow" style={{ marginTop: 48 }}>
        404 / PÁGINA NO ENCONTRADA
      </p>
      <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", margin: "24px 0" }}>
        Volvamos al camino.
      </h1>
      <p>
        Esta dirección no existe o ha cambiado. Puedes volver a la web o
        escribirnos por WhatsApp.
      </p>
      <Link href="/" className="button accent" style={{ marginTop: 32 }}>
        Volver al inicio
      </Link>
    </main>
  );
}
