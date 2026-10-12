"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import {
  formatShopPrice,
  maxItemQuantity,
  shopProduct,
  shopProducts,
  type ShopProduct,
  type ShopSize,
} from "@/data/shop";
import { useShopCart } from "./cart-context";
import { ProductArt } from "./product-art";

function ProductCard({ product }: { product: ShopProduct }) {
  const [size, setSize] = useState<ShopSize>(
    product.sizes.includes("M") ? "M" : "Única",
  );
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { add, ready, lines } = useShopCart();
  function addProduct() {
    const previous =
      lines.find((line) => line.productId === product.id && line.size === size)
        ?.quantity ?? 0;
    add(product.id, size, quantity);
    const next = Math.min(maxItemQuantity, previous + quantity);
    setMessage(
      `${product.name}, talla ${size}: ${next} ${next === 1 ? "unidad" : "unidades"} en el carrito de demostración.${previous + quantity > maxItemQuantity ? " Máximo 5 unidades por talla." : ""}`,
    );
  }
  return (
    <article
      className="ip-shop-product"
      aria-labelledby={`product-${product.id}`}
    >
      <div className="ip-shop-product-visual">
        <ProductArt product={product} />
        <span className="ip-shop-design-tag">En diseño</span>
      </div>
      <div className="ip-shop-product-category">
        <span>{product.category}</span>
        <span>{product.colorName}</span>
      </div>
      <div className="ip-shop-product-title">
        <h2 id={`product-${product.id}`}>{product.name}</h2>
        <span>{formatShopPrice(product.priceCents)}</span>
      </div>
      <p className="ip-shop-product-description">{product.description}</p>
      <details className="ip-shop-product-details">
        <summary>Sobre este diseño</summary>
        <p>
          {product.detail} La imagen es una visualización del concepto, no una
          fotografía de un producto fabricado. El precio es orientativo.
        </p>
      </details>
      <div className="ip-shop-product-options">
        <label htmlFor={`size-${product.id}`}>
          Talla{" "}
          <select
            id={`size-${product.id}`}
            aria-label={`Talla de ${product.name}`}
            value={size}
            onChange={(event) => setSize(event.target.value as ShopSize)}
          >
            {product.sizes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor={`quantity-${product.id}`}>
          Cantidad{" "}
          <select
            id={`quantity-${product.id}`}
            aria-label={`Cantidad de ${product.name}`}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            {Array.from({ length: maxItemQuantity }, (_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        className="ip-shop-button ip-shop-add"
        type="button"
        disabled={!ready}
        onClick={addProduct}
        aria-label={`Añadir al carrito: ${product.name}`}
      >
        Añadir al carrito <Arrow />
      </button>
      <p className="ip-shop-product-status" role="status">
        {message}
      </p>
    </article>
  );
}
export function ShopCatalog() {
  const { lines, count, totalCents, ready, changeQuantity, remove, clear } =
    useShopCart();
  return (
    <>
      <section className="ip-shop-intro" aria-labelledby="shop-title">
        <div className="ip-shop-intro-copy">
          <p className="eyebrow">ICARO TEAM / COLECCIÓN 01</p>
          <h1 id="shop-title">
            EL EQUIPO.
            <br />
            CONTIGO.
          </h1>
          <p>
            Una identidad compartida. Dentro del entrenamiento y fuera de él.
            Descubre cómo imaginamos la primera colección de ICARO.
          </p>
          <a className="ip-shop-intro-link" href="#coleccion">
            Explorar los diseños <Arrow diagonal />
          </a>
        </div>
        <figure className="ip-shop-collection">
          <Image
            src="/images/shop/collection.jpg"
            alt="Visualización conceptual de prendas ICARO en tonos marfil, cobre y carbón"
            width={1536}
            height={1024}
            sizes="(max-width: 768px) 100vw, 55vw"
            loading="eager"
          />
          <figcaption>
            VISUALIZACIÓN DE DISEÑO / COLECCIÓN EN DESARROLLO
          </figcaption>
        </figure>
      </section>
      <aside className="ip-shop-demo-notice" aria-label="Estado de la tienda">
        <span>TIENDA DE DEMOSTRACIÓN</span>
        <p>
          Estos productos todavía no existen y no están disponibles para
          comprar. Los precios son orientativos. Puedes explorar el carrito y
          simular una compra con una tarjeta ficticia; no se realiza ningún
          cobro ni se crea un pedido.
        </p>
      </aside>
      <section
        id="coleccion"
        className="ip-shop-catalog"
        aria-labelledby="collection-title"
      >
        <div className="ip-shop-section-heading">
          <div>
            <p className="eyebrow">PRIMEROS DISEÑOS</p>
            <h2 id="collection-title">NUESTRA COLECCIÓN.</h2>
          </div>
          <p>Seis propuestas. Una misma manera de entender el equipo.</p>
        </div>
        <div className="ip-shop-product-grid">
          {shopProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
      <section
        id="carrito"
        className="ip-shop-cart"
        aria-labelledby="cart-title"
      >
        <div className="ip-shop-section-heading">
          <div>
            <p className="eyebrow">TU SELECCIÓN</p>
            <h2 id="cart-title">CARRITO.</h2>
          </div>
          <p>
            {count} {count === 1 ? "artículo" : "artículos"} · demostración
          </p>
        </div>
        {!ready ? (
          <p className="ip-shop-empty" role="status">
            Preparando tu carrito…
          </p>
        ) : lines.length === 0 ? (
          <div className="ip-shop-empty">
            <p>Tu carrito está vacío.</p>
            <p>
              Explora los diseños y elige una talla para probar el recorrido de
              compra.
            </p>
            <a href="#coleccion">
              Ver la colección <Arrow />
            </a>
          </div>
        ) : (
          <>
            <ul className="ip-shop-cart-lines">
              {lines.map((line) => {
                const product = shopProduct(line.productId)!;
                return (
                  <li
                    className="ip-shop-cart-line"
                    key={`${line.productId}-${line.size}`}
                  >
                    <div className="ip-shop-cart-thumb">
                      <ProductArt product={product} compact />
                    </div>
                    <div className="ip-shop-cart-line-copy">
                      <h3>{product.name}</h3>
                      <p>
                        {product.colorName} · Talla {line.size}
                      </p>
                      <p>{formatShopPrice(product.priceCents)} por unidad</p>
                      <button
                        className="ip-shop-remove"
                        type="button"
                        onClick={() => remove(line.productId, line.size)}
                        aria-label={`Quitar ${product.name}, talla ${line.size}`}
                      >
                        Quitar
                      </button>
                    </div>
                    <label className="ip-shop-cart-quantity">
                      Cantidad{" "}
                      <select
                        aria-label={`Cantidad en el carrito de ${product.name}, talla ${line.size}`}
                        value={line.quantity}
                        onChange={(event) =>
                          changeQuantity(
                            line.productId,
                            line.size,
                            Number(event.target.value),
                          )
                        }
                      >
                        {Array.from({ length: maxItemQuantity }, (_, index) => (
                          <option value={index + 1} key={index}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                    <strong className="ip-shop-line-total">
                      {formatShopPrice(product.priceCents * line.quantity)}
                    </strong>
                  </li>
                );
              })}
            </ul>
            <button className="ip-shop-clear" type="button" onClick={clear}>
              Vaciar carrito
            </button>
          </>
        )}
        <div className="ip-shop-cart-summary">
          <div>
            <span>Total orientativo</span>
            <strong>{formatShopPrice(totalCents)}</strong>
          </div>
          <p>
            Importe de demostración. No se calculan envíos ni se cobra este
            importe.
          </p>
          {ready && lines.length > 0 ? (
            <Link className="ip-shop-button" href="/tienda/pago">
              Continuar a la simulación <Arrow />
            </Link>
          ) : (
            <button type="button" className="ip-shop-button" disabled>
              Continuar a la simulación <Arrow />
            </button>
          )}
        </div>
      </section>
      <section className="ip-shop-endnote">
        <p className="eyebrow">PARTE DEL MISMO EQUIPO</p>
        <h2>
          LAS PRENDAS CAMBIAN.
          <br />
          EL PROPÓSITO NOS UNE.
        </h2>
        <p>
          Mientras damos forma a la colección, puedes conocernos, entrenar con
          nosotros y formar parte de la comunidad ICARO.
        </p>
        <Link className="ip-shop-intro-link" href="/#comunidad">
          Conocer la comunidad <Arrow diagonal />
        </Link>
      </section>
    </>
  );
}
