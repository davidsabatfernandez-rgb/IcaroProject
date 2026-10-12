import { site, whatsappUrl } from "@/config/site";
import { Wordmark, Arrow } from "./ui";
import { CommercialPreferencesButton } from "./commercial-analytics";
export function Footer({ home = false }: { home?: boolean } = {}) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href={home ? "#inicio" : "/#inicio"} title="Volver al inicio">
          <Wordmark />
        </a>
        <span>CIENCIA. INDIVIDUALIZACIÓN. RENDIMIENTO. COMUNIDAD.</span>
        <div>
          <a
            href="/social"
            data-track="cta_click"
            data-track-source="footer-social"
            data-track-interest="collective"
          >
            Social Club <Arrow diagonal />
          </a>
          <a href="/planes">
            Planes <Arrow diagonal />
          </a>
          <a href="/tienda">
            Tienda <Arrow diagonal />
          </a>
          <a href="/articulos">
            Artículos <Arrow diagonal />
          </a>
          {site.contact.instagram && (
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
              <Arrow diagonal />
            </a>
          )}
          {site.contact.email && (
            <a href={`mailto:${site.contact.email}`}>
              Correo
              <Arrow diagonal />
            </a>
          )}
          {whatsappUrl() && (
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp
              <Arrow diagonal />
            </a>
          )}
        </div>
      </div>
      <p className="photo-credits">
        Portada facilitada a ICARO. Fotografía editorial:{" "}
        {site.photographyCredits.map((credit, index) => (
          <span key={credit.name}>
            {index > 0 && " / "}
            <a href={credit.url} target="_blank" rel="noopener noreferrer">
              {credit.name}
            </a>
          </span>
        ))}
      </p>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.brandName}
        </span>
        <div>
          {(
            [
              ["Aviso legal", site.legal.notice],
              ["Privacidad", site.legal.privacy],
              ["Cookies", site.legal.cookies],
            ] as const
          ).map(([label, url]) =>
            url ? (
              <a key={label} href={url}>
                {label}
              </a>
            ) : null,
          )}
          <CommercialPreferencesButton />
        </div>
        <span>ENTRENA CON PROPÓSITO.</span>
      </div>
    </footer>
  );
}
