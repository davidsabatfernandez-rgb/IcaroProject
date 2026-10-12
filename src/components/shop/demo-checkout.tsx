"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatShopPrice, shopProduct } from "@/data/shop";
import { Arrow } from "@/components/ui";
import { useShopCart } from "./cart-context";
export function DemoCheckout() {
  const { lines, totalCents, ready, clear } = useShopCart();
  const [confirmed, setConfirmed] = useState(false);
  const [demoAccepted, setDemoAccepted] = useState(false);
  const completed = useRef(false);
  const confirmationTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (confirmed) confirmationTitle.current?.focus();
  }, [confirmed]);
  function simulate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || !demoAccepted || lines.length === 0 || completed.current)
      return;
    completed.current = true;
    clear();
    setConfirmed(true);
  }
  if (confirmed)
    return (
      <section
        className="ip-shop-confirmation"
        aria-labelledby="confirmation-title"
      >
        <span className="ip-shop-confirmation-icon" aria-hidden="true">
          ✓
        </span>
        <p className="eyebrow">RECORRIDO DE DEMOSTRACIÓN</p>
        <h1 id="confirmation-title" tabIndex={-1} ref={confirmationTitle}>
          SIMULACIÓN
          <br />
          COMPLETADA.
        </h1>
        <p role="status">No se ha cobrado ni creado un pedido real.</p>
        <p>
          Has probado la selección de diseños y el recorrido del carrito. La
          colección sigue en desarrollo.
        </p>
        <Link className="ip-shop-button" href="/tienda">
          Volver a la colección <Arrow />
        </Link>
      </section>
    );
  return (
    <section className="ip-shop-checkout" aria-labelledby="checkout-title">
      <Link className="ip-shop-back" href="/tienda#carrito">
        ← Volver al carrito
      </Link>
      <p className="eyebrow">ÚLTIMO PASO / DEMOSTRACIÓN</p>
      <h1 id="checkout-title">
        PRUEBA EL
        <br />
        RECORRIDO.
      </h1>
      <p className="ip-shop-checkout-lead">
        Una simulación para explorar la futura tienda ICARO. Solo se utiliza la
        tarjeta ficticia que ves a continuación.
      </p>
      {!ready ? (
        <p role="status" className="ip-shop-empty">
          Preparando tu selección…
        </p>
      ) : lines.length === 0 ? (
        <div className="ip-shop-checkout-empty">
          <h2>El carrito está vacío.</h2>
          <p>Selecciona un diseño antes de continuar con la simulación.</p>
          <Link className="ip-shop-button" href="/tienda#coleccion">
            Explorar la colección <Arrow />
          </Link>
        </div>
      ) : (
        <div className="ip-shop-checkout-grid">
          <form className="ip-shop-payment" onSubmit={simulate}>
            <fieldset>
              <legend>Tarjeta ficticia de demostración</legend>
              <p id="demo-card-description">
                Los datos están fijados para esta prueba. No introduzcas una
                tarjeta real. La simulación ocurre en tu navegador.
              </p>
              <label htmlFor="demo-card-number">
                Número de tarjeta ficticia
              </label>
              <input
                id="demo-card-number"
                aria-describedby="demo-card-description"
                value="4242 4242 4242 4242"
                readOnly
                type="text"
                autoComplete="off"
              />
              <div className="ip-shop-payment-row">
                <div>
                  <label htmlFor="demo-card-expiry">Caducidad ficticia</label>
                  <input
                    id="demo-card-expiry"
                    value="12 / 30"
                    type="text"
                    readOnly
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="demo-card-cvc">Código ficticio</label>
                  <input
                    id="demo-card-cvc"
                    value="123"
                    type="text"
                    readOnly
                    autoComplete="off"
                  />
                </div>
              </div>
            </fieldset>
            <label className="ip-shop-demo-consent">
              <input
                type="checkbox"
                checked={demoAccepted}
                onChange={(event) => setDemoAccepted(event.target.checked)}
                required
              />
              <span>
                Entiendo que esta es una simulación y no una compra real.
              </span>
            </label>
            <button
              type="submit"
              className="ip-shop-button"
              disabled={!demoAccepted}
            >
              Simular compra <Arrow />
            </button>
            <p className="ip-shop-no-payment">
              No hay pasarela de pago ni envío de datos de tarjeta. No se
              realiza ningún cobro.
            </p>
          </form>
          <aside
            className="ip-shop-order-summary"
            aria-labelledby="summary-title"
          >
            <p className="eyebrow">TU SELECCIÓN DE DISEÑOS</p>
            <h2 id="summary-title">Resumen</h2>
            <ul>
              {lines.map((line) => {
                const product = shopProduct(line.productId)!;
                return (
                  <li key={`${line.productId}-${line.size}`}>
                    <div>
                      <strong>{product.name}</strong>
                      <span>
                        Talla {line.size} · {line.quantity}{" "}
                        {line.quantity === 1 ? "unidad" : "unidades"}
                      </span>
                    </div>
                    <span>
                      {formatShopPrice(product.priceCents * line.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="ip-shop-checkout-total">
              <span>Total orientativo</span>
              <strong>{formatShopPrice(totalCents)}</strong>
            </div>
            <p>
              Productos conceptuales, sin stock ni entrega. Este total solo
              ilustra el recorrido de compra.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
