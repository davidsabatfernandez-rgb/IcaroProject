"use client";

import { Arrow } from "./ui";

export function LactatePricing() {
  return (
    <div className="lactate-tariffs">
      <div className="lactate-standalone">
        <div>
          <span className="micro">TAMBIÉN PUEDES CONTRATAR SOLO EL TEST</span>
          <h3>Test de lactato en pista.</h3>
          <p>
            Para conocer tu respuesta y orientar las intensidades, también si
            todavía no entrenas con ICARO.
          </p>
        </div>
        <div className="lactate-booking">
          <p className="lactate-travel">
            Desplazamiento presupuestado antes de reservar.
          </p>
          <a
            className="button accent"
            href="#contacto"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("icaro-plan", {
                  detail: "Test de lactato en pista",
                }),
              )
            }
          >
            Consultar condiciones del test
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="lactate-plan-rates">
        <h3>Si entrenas con nosotros, tienes estas ventajas.</h3>
        <dl>
          <div>
            <dt>Individual</dt>
            <dd>
              <strong>Condiciones para atletas del plan.</strong>
              <p>Te orientamos sobre cuándo puede aportarte información.</p>
            </dd>
          </div>
          <div>
            <dt>Coaching</dt>
            <dd>
              <strong>Promoción trimestral.</strong>
              <p>Consulta las condiciones junto a tu seguimiento.</p>
            </dd>
          </div>
          <div>
            <dt>Performance</dt>
            <dd>
              <strong>
                1 test incluido <span>cada 6 meses</span>
              </strong>
              <p>También puedes consultar la opción trimestral.</p>
            </dd>
          </div>
        </dl>
        <p className="lactate-rate-note">
          Tests opcionales. Para los tests en pista, el desplazamiento se
          presupuesta antes de reservar. Performance combina seguimiento cercano
          con la ventaja de un test semestral incluido.
        </p>
      </div>
    </div>
  );
}
