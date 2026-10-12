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
      {site.privacy.responsibleName && (
        <p>Responsable: {site.privacy.responsibleName}.</p>
      )}
      <p>
        Las consultas dirigidas a ICARO PROJECT se reciben en{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        Puedes escribir a esa dirección para preguntar por el tratamiento de tus
        datos.
      </p>
      <h2 style={{ fontSize: 24 }}>Qué datos utilizamos y para qué</h2>
      <p>
        El formulario recoge tu nombre, correo o teléfono, deporte, objetivo,
        interés en entrenamiento individual, colectivo o evaluaciones, plan
        elegido y el mensaje que decidas añadir. En la valoración de
        entrenamiento puedes indicar fecha aproximada, experiencia, horas
        disponibles, dificultad actual, seguimiento deseado y presupuesto
        orientativo. También incluye la sección desde la que contactas y, si
        existen, parámetros limitados de campaña de la URL de entrada. Los
        usamos para dar contexto a tu consulta, responder a tu solicitud y
        explicarte las opciones de entrenamiento. No añadas información médica
        ni otros datos sensibles. Enviar una consulta no te suscribe a
        comunicaciones comerciales. El equipo revisa cada solicitud. Un
        indicador de encaje inicial basado en la disponibilidad y el seguimiento
        solicitado sirve para organizar la revisión; no acepta ni rechaza una
        contratación y no sustituye una decisión humana.
      </p>
      <h2 style={{ fontSize: 24 }}>Cómo se envía</h2>
      <p>
        Al enviar, el servidor de la web recibe tu consulta y utiliza Resend
        para remitirla al correo de ICARO PROJECT. El correo se recibe en Gmail,
        de Google. Si el envío por correo falla, puedes elegir enviar la
        consulta por WhatsApp, de Meta. Estos proveedores pueden tratar
        información técnica asociada al envío conforme a sus políticas y operar
        fuera del Espacio Económico Europeo.
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
      <h2 id="medicion" style={{ fontSize: 24 }}>
        Carrito y preferencias de medición
      </h2>
      <p>
        La tienda de demostración conserva en tu navegador los diseños, tallas y
        cantidades que añades al carrito. Puedes eliminarlos desde la tienda. No
        recoge tarjetas reales, datos de entrega ni crea pedidos.
      </p>
      <p>
        Si se activa la medición del sitio, puedes aceptar o rechazar por
        separado la analítica y la publicidad, y cambiar tu elección desde el
        pie de página. Las herramientas de Google solo se cargan para las
        categorías que aceptes. Los eventos describen acciones como abrir una
        consulta, elegir un plan o enviar una solicitud aceptada por el
        proveedor de correo. No incluyen tu nombre, contacto, objetivo, mensaje
        ni datos bancarios. Un clic en WhatsApp no se registra como una
        contratación.
      </p>
      <p>
        Con tu elección válida, la medición puede conservar identificadores
        limitados de campaña y, para publicidad, el identificador del clic. Las
        preferencias se guardan en este navegador. Si rechazas la medición,
        puedes seguir usando el formulario y todos los servicios del sitio.
      </p>
    </main>
  );
}
