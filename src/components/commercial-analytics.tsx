"use client";

import { useEffect, useState } from "react";
import {
  commercialMeasurementEnabled,
  getCommercialConfiguration,
  initializeCommercialMeasurement,
  openCommercialPreferences,
  readCommercialConsent,
  saveCommercialConsent,
  sanitizeCommercialDetails,
  trackCommercialEvent,
  validateCommercialConfiguration,
  type CommercialConfiguration,
  type CommercialConsent,
  type CommercialEventDetails,
} from "@/lib/commercial-events";
import "./commercial-analytics.css";

export function CommercialAnalytics({
  configuration = getCommercialConfiguration(),
}: {
  configuration?: CommercialConfiguration;
}) {
  const { measurementId, adsId, adsLeadLabel } =
    validateCommercialConfiguration(configuration);
  const enabled = Boolean(measurementId || adsId);
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [choice, setChoice] = useState<CommercialConsent>({
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    if (!enabled) return;
    initializeCommercialMeasurement({ measurementId, adsId, adsLeadLabel });
    const saved = readCommercialConsent();
    setOpen(!saved);
    if (saved) setChoice(saved);
    const preferences = () => {
      setChoice(
        readCommercialConsent() || { analytics: false, advertising: false },
      );
      setCustomize(true);
      setOpen(true);
    };
    const clicks = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a");
      if (
        !anchor ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      try {
        const destination = new URL(anchor.href, window.location.origin);
        if (
          destination.protocol === "https:" &&
          destination.hostname === "wa.me"
        ) {
          trackCommercialEvent("whatsapp_click", {
            source: anchor.dataset.trackSource || "whatsapp",
          });
          return;
        }
      } catch {
        return;
      }
      if (anchor.dataset.track !== "cta_click") return;
      const details: CommercialEventDetails = {
        source: anchor.dataset.trackSource,
        plan: anchor.dataset.trackPlan,
        interest: anchor.dataset.trackInterest,
        sport: anchor.dataset.trackSport,
      };
      trackCommercialEvent("cta_click", details);
      if (sanitizeCommercialDetails(details).plan)
        trackCommercialEvent("plan_select", details);
    };
    window.addEventListener("icaro-consent-preferences", preferences);
    document.addEventListener("click", clicks, true);
    return () => {
      window.removeEventListener("icaro-consent-preferences", preferences);
      document.removeEventListener("click", clicks, true);
    };
  }, [enabled, measurementId, adsId, adsLeadLabel]);

  function choose(next: CommercialConsent) {
    const result = saveCommercialConsent(next, {
      measurementId,
      adsId,
      adsLeadLabel,
    });
    setChoice(next);
    setOpen(false);
    if (result.reloadRequired) window.location.reload();
  }

  if (!enabled || !open) return null;
  return (
    <section
      className="icaro-consent"
      role="dialog"
      aria-labelledby="icaro-consent-title"
      aria-describedby="icaro-consent-description"
    >
      <div className="icaro-consent-copy">
        <h2 id="icaro-consent-title">Tú decides qué medimos</h2>
        <p id="icaro-consent-description">
          {measurementId && adsId
            ? "Con tu permiso, utilizamos Google Analytics para entender el uso de la web y Google Ads para medir solicitudes procedentes de publicidad."
            : measurementId
              ? "Con tu permiso, utilizamos Google Analytics para entender cómo se utiliza la web."
              : "Con tu permiso, utilizamos Google Ads para medir solicitudes procedentes de publicidad."}{" "}
          Puedes rechazarlo y seguir usando todos los servicios. No enviamos el
          contenido de tu consulta a estas herramientas.
        </p>
        <a href="/privacidad#medicion">Cómo tratamos tus datos</a>
        {customize && (
          <fieldset className="icaro-consent-options">
            <legend>Elige las categorías opcionales</legend>
            {measurementId && (
              <label>
                <input
                  type="checkbox"
                  checked={choice.analytics}
                  onChange={(event) =>
                    setChoice({ ...choice, analytics: event.target.checked })
                  }
                />
                Analítica de uso (Google Analytics)
              </label>
            )}
            {adsId && (
              <label>
                <input
                  type="checkbox"
                  checked={choice.advertising}
                  onChange={(event) =>
                    setChoice({ ...choice, advertising: event.target.checked })
                  }
                />
                Medición publicitaria (Google Ads)
              </label>
            )}
            <p>
              Guardamos tu elección durante seis meses. Puedes cambiarla desde
              «Preferencias de medición». Si retiras una categoría activa, la
              página se recargará para aplicar el cambio.
            </p>
          </fieldset>
        )}
      </div>
      <div className="icaro-consent-actions">
        <button
          type="button"
          onClick={() => choose({ analytics: false, advertising: false })}
        >
          Rechazar opcionales
        </button>
        <button
          type="button"
          onClick={() =>
            choose({
              analytics: Boolean(measurementId),
              advertising: Boolean(adsId),
            })
          }
        >
          Aceptar opcionales
        </button>
        {customize ? (
          <button type="button" onClick={() => choose(choice)}>
            Guardar preferencias
          </button>
        ) : (
          <button type="button" onClick={() => setCustomize(true)}>
            Elegir preferencias
          </button>
        )}
      </div>
    </section>
  );
}

export function CommercialPreferencesButton() {
  if (!commercialMeasurementEnabled()) return null;
  return (
    <button
      className="icaro-consent-preferences"
      type="button"
      onClick={openCommercialPreferences}
    >
      Preferencias de medición
    </button>
  );
}
