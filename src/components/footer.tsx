import { site, whatsappUrl } from "@/config/site";
import { Wordmark, Arrow } from "./ui";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#inicio" title="Volver al inicio">
          <Wordmark />
        </a>
        <span>Triathlon · Swimming · Cycling · Running</span>
        <div>
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
              Email
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
        Fotografía editorial:{" "}
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
        </div>
        <span>Entrenar con sentido.</span>
      </div>
    </footer>
  );
}
