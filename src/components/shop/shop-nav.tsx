"use client";
import Link from "next/link";
import { useShopCart } from "./cart-context";
export function ShopNavigation() {
  const { count } = useShopCart();
  return (
    <div className="ip-shop-nav">
      <Link href="/tienda">Colección ICARO</Link>
      <Link
        href="/tienda#carrito"
        aria-label={`Ver carrito: ${count} ${count === 1 ? "artículo" : "artículos"}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 8h12l2 12H4L6 8ZM9 8V6a3 3 0 0 1 6 0v2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Carrito <span>{count}</span>
      </Link>
    </div>
  );
}
