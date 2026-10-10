"use client";
import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/config/site";
import { Arrow } from "./ui";
export function ContactForm() {
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");
  useEffect(() => {
    const listener = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener("icaro-plan", listener);
    return () => window.removeEventListener("icaro-plan", listener);
  }, []);
  const configured = !!(
    site.contact.formEndpoint ||
    site.contact.whatsapp ||
    site.contact.email
  );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    setBusy(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const contact = String(data.get("contact") || "").trim();
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) &&
      !/^\+?[\d\s().-]{6,25}$/.test(contact)
    ) {
      setStatus(
        "Introduce un email válido o un teléfono para poder contactarte.",
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
    const message = `Hola, soy ${data.get("name")}.\nContacto: ${data.get("contact")}\nDeporte: ${data.get("sport")}\nObjetivo: ${data.get("goal")}\n${plan ? `Plan: ${plan}\n` : ""}${data.get("message") || ""}`;
    setSummary(message);
    try {
      if (site.contact.formEndpoint) {
        const replyTo = form.elements.namedItem("_replyto") as HTMLInputElement;
        replyTo.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
          ? contact
          : "";
        setStatus("Abriendo el servicio de envío para completar tu consulta…");
        HTMLFormElement.prototype.submit.call(form);
      } else if (site.contact.whatsapp) {
        window.location.assign(whatsappUrl(message));
        setStatus(
          "Abriendo WhatsApp. Envía el mensaje para completar tu consulta.",
        );
      } else if (site.contact.email) {
        window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Mi objetivo · ICARO PROJECT")}&body=${encodeURIComponent(message)}`;
        setStatus(
          "Se ha preparado un correo. Envíalo desde tu aplicación de email.",
        );
      } else {
        setStatus(
          "Tu mensaje está preparado, pero aún no hay un canal de envío configurado. Puedes copiarlo. No se ha enviado ni guardado.",
        );
      }
    } catch {
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
      <input
        type="hidden"
        name="_subject"
        value="Nueva consulta · ICARO PROJECT"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_replyto" defaultValue="" />
      <div hidden aria-hidden="true">
        <label>
          Website
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
          Email o teléfono
          <input
            required
            name="contact"
            autoComplete="email"
            placeholder="Dónde podemos hablar"
            maxLength={150}
          />
        </label>
      </div>
      <div className="form-field">
        <label htmlFor="sport">Deporte</label>
        <select id="sport" name="sport" required defaultValue="">
          <option value="" disabled>
            Elige tu disciplina
          </option>
          {[
            "Running",
            "Ciclismo",
            "Natación",
            "Triatlón",
            "Atleta híbrido",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
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
      {site.contact.formEndpoint && (
        <p className="form-note">
          Al enviar continuarás en FormSubmit para completar el envío y las
          comprobaciones que solicite.
        </p>
      )}
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
            ? "Cuéntame tu objetivo"
            : "Preparar mi consulta"}
        <Arrow diagonal />
      </button>
      <p role="status" className="form-status">
        {status}
      </p>
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
