import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";
const displayFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-900-normal.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const bodyFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title: `${site.brandName} — Preparación individualizada de resistencia`,
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
        alt: "ICARO PROJECT. Entrena con propósito.",
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
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
        <WhatsAppBubble />
      </body>
    </html>
  );
}
