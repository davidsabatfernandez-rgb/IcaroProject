"use client";
import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/config/site";
import { Arrow } from "./ui";
import type { EnquiryInterest, EnquirySelection } from "./enquiry-link";

const interestLabels: Record<EnquiryInterest, string> = {
  coaching: "Entrenamiento individual",
  collective: "Comunidad ICARO",
  tests: "Pruebas y evaluaciones",
};
const disciplines = [
  "Triatlón",
  "Carrera",
  "Carrera por montaña",
  "Ciclismo",
  "Natación",
  "Atleta híbrido",
];

function enquiryEntry() {
  const url = new URL(window.location.href);
  const path = `${url.pathname}${url.hash}`
    .replace(/[^a-zA-Z0-9_/#.-]/g, "")
    .slice(0, 160);
  const campaign: string[] = [];
  for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign"]) {
    const value = url.searchParams.get(key);
    // Retain campaign identifiers, never complete URLs or arbitrary query data.
    if (value && /^[a-zA-Z0-9_-]{1,40}$/.test(value))
      campaign.push(`${key}=${value}`);
  }
  return [path, ...campaign].join(" | ");
}

export function ContactForm() {
  const [plan, setPlan] = useState("");
  const [interest, setInterest] = useState<EnquiryInterest>("coaching");
  const [sport, setSport] = useState("");
  const [source, setSource] = useState("contacto");
  const [entry, setEntry] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setEntry(enquiryEntry());
    const interestListener = (event: Event) => {
      const selection = (event as CustomEvent<EnquirySelection>).detail;
      if (!selection || !Object.hasOwn(interestLabels, selection.interest))
        return;
      setInterest(selection.interest);
      setPlan(
        typeof selection.plan === "string" ? selection.plan.slice(0, 100) : "",
      );
      setSource(
        typeof selection.source === "string"
          ? selection.source.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) ||
              "contacto"
          : "contacto",
      );
      if (selection.sport && disciplines.includes(selection.sport))
        setSport(selection.sport);
      setStatus("");
      setFailed(false);
    };
    const planListener = (event: Event) => {
      const selection = (event as CustomEvent<string>).detail;
      if (typeof selection !== "string") return;
      const isTest = /test|prueba/i.test(selection);
      setPlan(selection.slice(0, 100));
      setInterest(isTest ? "tests" : "coaching");
      setSource(isTest ? "tests" : "planes");
    };
    window.addEventListener("icaro-interest", interestListener);
    window.addEventListener("icaro-plan", planListener);
    return () => {
      window.removeEventListener("icaro-interest", interestListener);
      window.removeEventListener("icaro-plan", planListener);
    };
  }, []);
  const configured = !!(
    site.contact.formEndpoint ||
    site.contact.whatsapp ||
    site.contact.email
  );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setStatus("");
    setFailed(false);
    setBusy(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const contact = String(data.get("contact") || "").trim();
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) &&
      !/^\+?[\d\s().-]{6,25}$/.test(contact)
    ) {
      setStatus(
        "Introduce un correo electrónico válido o un teléfono para poder contactarte.",
      );
      setBusy(false);
      return;
    }
    if (configured && !site.legal.privacy) {
      setStatus(
        "El envío está pendiente de activar la política de privacidad. No se ha enviado tu consulta.",
      );
      setBusy(false);
      return;
    }
    if (data.get("_honey")) {
      setStatus("No se ha podido enviar la consulta.");
      setBusy(false);
      return;
    }
    const message = `Hola, soy ${data.get("name")}.\nMe interesa: ${interestLabels[interest]}\nContacto: ${data.get("contact")}\nDeporte: ${data.get("sport")}\nObjetivo: ${data.get("goal")}\n${plan ? `Plan: ${plan}\n` : ""}${data.get("message") || ""}\nOrigen: ${data.get("source")}`;
    setSummary(message);
    try {
      if (site.contact.formEndpoint) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch(site.contact.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(data)),
            signal: controller.signal,
          });
          const result = await response.json();
          if (!response.ok || result.success !== true) {
            setFailed(true);
            setStatus(
              typeof result.message === "string"
                ? result.message
                : "No hemos podido confirmar el envío. Puedes contactar por WhatsApp.",
            );
          } else {
            setStatus(
              "Tu consulta se ha enviado. Gracias por contarnos tu objetivo.",
            );
            form.reset();
            setPlan("");
            setSport("");
            setInterest("coaching");
            setSource("contacto");
            setSummary("");
          }
        } finally {
          window.clearTimeout(timeout);
        }
      } else if (site.contact.whatsapp) {
        window.location.assign(whatsappUrl(message));
        setStatus(
          "Abriendo WhatsApp. Envía el mensaje para completar tu consulta.",
        );
      } else if (site.contact.email) {
        window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Mi objetivo · ICARO PROJECT")}&body=${encodeURIComponent(message)}`;
        setStatus(
          "Se ha preparado un correo. Envíalo desde tu aplicación de correo.",
        );
      } else {
        setStatus(
          "Tu mensaje está preparado, pero aún no hay un canal de envío configurado. Puedes copiarlo. No se ha enviado ni guardado.",
        );
      }
    } catch {
      setFailed(true);
      setStatus(
        "No se ha podido confirmar el envío. Inténtalo de nuevo o escríbenos a contacticaroproject@gmail.com.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className="contact-form"
      action={site.contact.formEndpoint || undefined}
      method="POST"
      onSubmit={submit}
    >
      <div hidden aria-hidden="true">
        <label>
          Sitio web
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Nombre
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Cómo te llamas"
            maxLength={100}
          />
        </label>
        <label>
          Correo o teléfono
          <input
            required
            name="contact"
            autoComplete="email"
            placeholder="Dónde podemos hablar"
            maxLength={150}
          />
        </label>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="interest">Qué te interesa</label>
          <select
            id="interest"
            name="interest"
            required
            value={interest}
            onChange={(event) => {
              setInterest(event.target.value as EnquiryInterest);
              setPlan("");
            }}
          >
            {Object.entries(interestLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="sport">Deporte</label>
          <select
            id="sport"
            name="sport"
            required
            value={sport}
            onChange={(event) => setSport(event.target.value)}
          >
            <option value="" disabled>
              Elige tu disciplina
            </option>
            {disciplines.map((discipline) => (
              <option key={discipline}>{discipline}</option>
            ))}
          </select>
        </div>
      </div>
      <label>
        Tu objetivo
        <input
          required
          name="goal"
          placeholder="Una prueba, una distancia, volver a entrenar…"
          maxLength={300}
        />
      </label>
      <label>
        Algo más que debamos saber <span>(opcional)</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Tu disponibilidad, tu experiencia o lo que te preocupa."
          maxLength={2000}
        />
      </label>
      {plan && (
        <p className="chosen-plan">
          Te interesa: {plan}
          <button type="button" onClick={() => setPlan("")}>
            Cambiar
          </button>
        </p>
      )}
      <input type="hidden" name="plan" value={plan} />
      <input
        type="hidden"
        name="source"
        value={[source, entry].filter(Boolean).join(" | ")}
      />
      {site.legal.privacy ? (
        <label className="privacy-check">
          <input type="checkbox" required name="consent" />
          He leído la <a href={site.legal.privacy}>política de privacidad</a>.
        </label>
      ) : (
        <p className="form-note">
          {configured
            ? "El envío se activará cuando esté disponible la información de privacidad."
            : "El canal de envío todavía no está disponible. Puedes preparar y copiar tu consulta; tus datos no se enviarán ni se guardarán."}
        </p>
      )}
      <button className="button accent" type="submit" disabled={busy}>
        {busy
          ? "Enviando…"
          : configured
            ? "Enviar mi consulta"
            : "Preparar mi consulta"}
        <Arrow diagonal />
      </button>
      <p role="status" className="form-status">
        {status}
      </p>
      {failed && summary && whatsappUrl(summary) && (
        <div className="message-preview">
          <p>
            Conservamos los datos en este formulario. Puedes enviar la misma
            consulta por WhatsApp.
          </p>
          <a
            className="button accent"
            href={whatsappUrl(summary)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar mi consulta por WhatsApp <Arrow diagonal />
          </a>
        </div>
      )}
      {summary && !configured && (
        <div className="message-preview">
          <label>
            Tu consulta preparada
            <textarea readOnly value={summary} rows={6} />
          </label>
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setStatus("Mensaje copiado. No se ha enviado.");
              } catch {
                setStatus("Selecciona el texto para copiarlo manualmente.");
              }
            }}
          >
            Copiar mensaje <Arrow />
          </button>
        </div>
      )}
    </form>
  );
}
