"use client";

import { Arrow } from "./ui";
import { EnquiryLink } from "./enquiry-link";

export function LactatePricing() {
  return (
    <div className="lactate-tariffs">
      <div className="lactate-standalone">
        <div>
          <span className="micro">TAMBIÉN PUEDES CONTRATAR SOLO LA PRUEBA</span>
          <h3>Prueba de lactato en pista.</h3>
          <p>
            Para conocer tu respuesta y orientar las intensidades, también si
            todavía no entrenas con ICARO.
          </p>
        </div>
        <div className="lactate-booking">
          <p className="lactate-travel">
            Desplazamiento presupuestado antes de reservar.
          </p>
          <EnquiryLink
            className="button accent"
            interest="tests"
            source="lactato"
            plan="Prueba de lactato en pista"
          >
            Consultar condiciones de la prueba
            <Arrow diagonal />
          </EnquiryLink>
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
            <dt>Seguimiento</dt>
            <dd>
              <strong>Promoción trimestral.</strong>
              <p>Consulta las condiciones junto a tu seguimiento.</p>
            </dd>
          </div>
          <div>
            <dt>Rendimiento</dt>
            <dd>
              <strong>
                1 prueba incluida <span>cada 6 meses</span>
              </strong>
              <p>También puedes consultar la opción trimestral.</p>
            </dd>
          </div>
        </dl>
        <p className="lactate-rate-note">
          Pruebas opcionales. Para las pruebas en pista, el desplazamiento se
          presupuesta antes de reservar. Rendimiento combina seguimiento cercano
          con la ventaja de una prueba semestral incluida.
        </p>
      </div>
    </div>
  );
}
