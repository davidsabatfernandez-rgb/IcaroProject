import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop/shop-catalog";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Tienda ICARO · Colección en diseño",
  description:
    "Descubre los diseños conceptuales de la colección ICARO. Explora camisetas, sudadera y gorra en una tienda de demostración, sin compras ni cobros reales.",
  alternates: { canonical: `${site.url}/tienda` },
  robots: { index: false, follow: true },
};
export default function ShopPage() {
  return <ShopCatalog />;
}
