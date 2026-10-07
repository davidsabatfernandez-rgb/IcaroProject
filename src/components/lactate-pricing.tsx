"use client";

import { site } from "@/config/site";
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
          <p className="lactate-standalone-price">
            <strong>{site.lactate.standalone} €</strong>
            <span>+ desplazamiento</span>
          </p>
          <p className="lactate-travel">{site.lactate.travelNote}</p>
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
            Consultar test en pista
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
              <strong>
                {site.lactate.individual} € <span>/ test</span>
              </strong>
              <p>Tarifa para atletas del plan.</p>
            </dd>
          </div>
          <div>
            <dt>Coaching</dt>
            <dd>
              <strong>
                {site.lactate.coaching} € <span>/ test</span>
              </strong>
              <p>Promoción trimestral.</p>
            </dd>
          </div>
          <div>
            <dt>Performance</dt>
            <dd>
              <strong>
                1 test incluido{" "}
                <span>cada {site.lactate.performanceIncludedMonths} meses</span>
              </strong>
              <p>
                Opción de test trimestral: {site.lactate.performanceQuarterly}{" "}
                €.
              </p>
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
