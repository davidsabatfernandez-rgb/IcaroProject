import type { Metadata } from "next";
import { DemoCheckout } from "@/components/shop/demo-checkout";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Simulación de compra · Tienda ICARO",
  description:
    "Prueba el recorrido de compra de la colección conceptual ICARO con una tarjeta ficticia. No se cobra ni se crea un pedido real.",
  alternates: { canonical: `${site.url}/tienda/pago` },
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return <DemoCheckout />;
}
