import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacidad · ICARO PROJECT",
  alternates: { canonical: `${site.url}/privacidad` },
};
export default function PrivacyPage() {
  return (
    <main id="contenido" className="section" style={{ maxWidth: 900 }}>
      <Link className="text-link" href="/">
        Volver a ICARO PROJECT
      </Link>
      <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>
        Privacidad de tus consultas
      </h1>
      <h2 style={{ fontSize: 24 }}>Quién atiende tu consulta</h2>
      <p>
        Las consultas dirigidas a ICARO PROJECT se reciben en{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        Puedes escribir a esa dirección para preguntar por el tratamiento de tus
        datos.
      </p>
      <h2 style={{ fontSize: 24 }}>Qué datos utilizamos y para qué</h2>
      <p>
        El formulario recoge tu nombre, email o teléfono, deporte, objetivo,
        plan de interés y el mensaje que decidas añadir. Los usamos para
        responder a tu solicitud y explicarte las opciones de entrenamiento. No
        añadas información médica ni otros datos sensibles. Enviar una consulta
        no te suscribe a comunicaciones comerciales.
      </p>
      <h2 style={{ fontSize: 24 }}>Cómo se envía</h2>
      <p>
        Al enviar, el servidor de la web recibe tu consulta y utiliza Resend
        para remitirla al correo de ICARO PROJECT. El correo se recibe en Gmail,
        de Google. Si el email falla, puedes elegir enviar la consulta por
        WhatsApp, de Meta. Estos proveedores pueden tratar información técnica
        asociada al envío conforme a sus políticas y operar fuera del Espacio
        Económico Europeo.
      </p>
      <p>
        <a
          className="text-link"
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacidad de Resend
        </a>
        {" · "}
        <a
          className="text-link"
          href="https://policies.google.com/privacy?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacidad de Google
        </a>
      </p>
      <h2 style={{ fontSize: 24 }}>Tu elección y tus derechos</h2>
      <p>
        El envío requiere que hayas leído esta información. Puedes optar por
        escribirnos directamente. Puedes solicitar acceso, rectificación o
        eliminación de tus datos, o retirar tu consentimiento, escribiendo al
        correo de contacto. Conservaremos la consulta mientras sea necesaria
        para atenderla y para cumplir las obligaciones que correspondan si
        contratas un servicio.
      </p>
      <p>
        También puedes presentar una reclamación ante la{" "}
        <a
          className="text-link"
          href="https://www.aepd.es/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agencia Española de Protección de Datos
        </a>
        .
      </p>
    </main>
  );
}
