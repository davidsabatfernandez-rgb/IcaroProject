import type { Metadata } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: `${site.brandName} — Entender. Entrenar. Adaptar.`,
  description: site.description,
  ...(site.url
    ? { metadataBase: new URL(site.url), alternates: { canonical: site.url } }
    : {}),
  openGraph: {
    title: site.brandName,
    description: site.description,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ICARO PROJECT. Entender. Entrenar. Adaptar.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.brandName,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
