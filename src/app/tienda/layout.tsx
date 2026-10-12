import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShopCartProvider } from "@/components/shop/cart-context";
import { ShopNavigation } from "@/components/shop/shop-nav";
import "@/components/shop/shop.css";

export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ShopCartProvider>
        <main id="contenido" className="ip-shop">
          <ShopNavigation />
          {children}
        </main>
      </ShopCartProvider>
      <Footer />
    </>
  );
}
