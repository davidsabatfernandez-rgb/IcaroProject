"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site, whatsappUrl } from "@/config/site";
import { trackCommercialEvent } from "@/lib/commercial-events";
import {
  emptyLeadProfile,
  leadProfileOptions,
  profileLines,
  supportForPlan,
  type LeadProfile,
  type LeadProfileOption,
} from "@/data/lead-qualification";
import { Arrow } from "./ui";
import type { EnquiryInterest, EnquirySelection } from "./enquiry-link";
import "./contact-qualification.css";

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
    if (value && /^[a-zA-Z0-9_-]{1,40}$/.test(value))
      campaign.push(`${key}=${value}`);
  }
  return [path, ...campaign].join(" | ");
}

function safeSource(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "contacto";
}

export function ContactForm({
  initialSource = "contacto",
  initialSport = "",
  initialPlan = "",
}: {
  initialSource?: string;
  initialSport?: string;
  initialPlan?: string;
} = {}) {
  const id = useId();
  const [plan, setPlan] = useState(initialPlan.slice(0, 100));
  const [interest, setInterest] = useState<EnquiryInterest>("coaching");
  const [sport, setSport] = useState(
    disciplines.includes(initialSport) ? initialSport : "",
  );
  const [goal, setGoal] = useState("");
  const [profile, setProfile] = useState<LeadProfile>({
    ...emptyLeadProfile,
    support: supportForPlan(initialPlan),
  });
  const [source, setSource] = useState(safeSource(initialSource));
  const [entry, setEntry] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");
  const [failed, setFailed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const changedStep = useRef(false);
  const sending = useRef(false);
  const isCoaching = interest === "coaching";
  const atContact = !isCoaching || step === 2;
  const configured = !!(
    site.contact.formEndpoint ||
    site.contact.whatsapp ||
    site.contact.email
  );
  const eventContext = { source, plan, interest, sport, step };

  useEffect(() => {
    setEntry(enquiryEntry());
    const params = new URLSearchParams(window.location.search);
    const requestedInterest = params.get("consulta");
    if (requestedInterest && Object.hasOwn(interestLabels, requestedInterest)) {
      setInterest(requestedInterest as EnquiryInterest);
      setSource(safeSource(params.get("origen") || initialSource));
      const requestedSport = params.get("deporte");
      if (requestedSport && disciplines.includes(requestedSport))
        setSport(requestedSport);
      const requestedPlan = (params.get("plan") || "").slice(0, 100);
      setPlan(requestedPlan);
      setProfile((current) => ({
        ...current,
        support: supportForPlan(requestedPlan),
      }));
    }
    const select = (selection: EnquirySelection) => {
      if (
        !selection ||
        !Object.hasOwn(interestLabels, selection.interest) ||
        sending.current
      )
        return;
      const nextPlan =
        typeof selection.plan === "string" ? selection.plan.slice(0, 100) : "";
      setInterest(selection.interest);
      setPlan(nextPlan);
      setSource(
        safeSource(
          typeof selection.source === "string" ? selection.source : "contacto",
        ),
      );
      if (selection.sport && disciplines.includes(selection.sport))
        setSport(selection.sport);
      if (nextPlan)
        setProfile((current) => ({
          ...current,
          support: supportForPlan(nextPlan),
        }));
      setStep(1);
      setStatus("");
      setFailed(false);
    };
    const interestListener = (event: Event) =>
      select((event as CustomEvent<EnquirySelection>).detail);
    const planListener = (event: Event) => {
      const selection = (event as CustomEvent<string>).detail;
      if (typeof selection !== "string") return;
      const isTest = /test|prueba/i.test(selection);
      select({
        interest: isTest ? "tests" : "coaching",
        source: isTest ? "tests" : "planes",
        plan: selection,
      });
    };
    window.addEventListener("icaro-interest", interestListener);
    window.addEventListener("icaro-plan", planListener);
    return () => {
      window.removeEventListener("icaro-interest", interestListener);
      window.removeEventListener("icaro-plan", planListener);
    };
  }, [initialSource]);

  useEffect(() => {
    if (changedStep.current) heading.current?.focus();
  }, [step]);

  function noteStart() {
    if (started.current) return;
    started.current = true;
    trackCommercialEvent("form_start", eventContext);
  }

  function changeStep(next: 1 | 2) {
    changedStep.current = true;
    setStep(next);
    setStatus("");
    trackCommercialEvent("form_step", { ...eventContext, step: next });
  }

  function clearEnquiry(form: HTMLFormElement) {
    form.reset();
    setPlan("");
    setSport("");
    setGoal("");
    setProfile({ ...emptyLeadProfile });
    setInterest("coaching");
    setSource(safeSource(initialSource));
    setSummary("");
    setStep(1);
    started.current = false;
    changedStep.current = false;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    noteStart();
    if (!atContact) {
      changeStep(2);
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    const contact = String(data.get("contact") || "").trim();
    setStatus("");
    setFailed(false);
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) &&
      !/^\+?[\d\s().-]{6,25}$/.test(contact)
    ) {
      setStatus(
        "Introduce un correo electrónico válido o un teléfono para poder contactarte.",
      );
      return;
    }
    if (configured && !site.legal.privacy) {
      setStatus(
        "El envío está pendiente de activar la política de privacidad. No se ha enviado tu consulta.",
      );
      return;
    }
    if (data.get("_honey")) {
      setStatus("No se ha podido enviar la consulta.");
      return;
    }
    const fullSource = [source, entry].filter(Boolean).join(" | ");
    const activeProfile = isCoaching ? profile : emptyLeadProfile;
    const payload = {
      ...Object.fromEntries(data),
      sport,
      goal,
      plan,
      interest,
      source: fullSource,
      ...activeProfile,
    };
    const message = [
      `Hola, soy ${data.get("name")}.`,
      `Me interesa: ${interestLabels[interest]}`,
      `Contacto: ${contact}`,
      `Deporte: ${sport}`,
      `Objetivo: ${goal}`,
      ...(plan ? [`Plan: ${plan}`] : []),
      ...profileLines(activeProfile),
      String(data.get("message") || ""),
      `Origen: ${fullSource}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSummary(message);
    sending.current = true;
    setBusy(true);
    trackCommercialEvent("form_submit", eventContext);
    try {
      if (site.contact.formEndpoint) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch(site.contact.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          const result = await response.json();
          if (!response.ok || result?.success !== true) {
            setFailed(true);
            setStatus(
              typeof result?.message === "string"
                ? result.message
                : "No hemos podido confirmar el envío. Puedes contactar por WhatsApp.",
            );
          } else {
            trackCommercialEvent("form_success", {
              ...eventContext,
              providerAccepted: true,
            });
            if (result.qualification === "potential_fit")
              trackCommercialEvent("lead_potential_fit", {
                ...eventContext,
                serverQualified: true,
                qualification: "potential_fit",
              });
            setStatus(
              "Tu consulta se ha enviado. Revisaremos tu preparación y las opciones de seguimiento contigo. La solicitud está pendiente de valoración.",
            );
            clearEnquiry(form);
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
      sending.current = false;
      setBusy(false);
    }
  }

  function profileSelect(field: LeadProfileOption, label: string) {
    return (
      <div className="form-field">
        <label htmlFor={`${id}-${field}`}>
          {label} <span>(opcional)</span>
        </label>
        <select
          id={`${id}-${field}`}
          name={field}
          value={profile[field]}
          onChange={(event) =>
            setProfile((current) => ({
              ...current,
              [field]: event.target.value,
            }))
          }
        >
          <option value="">Elige una opción</option>
          {leadProfileOptions[field].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <form
      className="contact-form cq-form"
      action={site.contact.formEndpoint || undefined}
      method="POST"
      onSubmit={submit}
      onFocusCapture={(event) => {
        if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName))
          noteStart();
      }}
      aria-busy={busy}
    >
      <div hidden aria-hidden="true">
        <label>
          Sitio web
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {isCoaching && (
        <ol className="cq-progress" aria-label="Progreso de la solicitud">
          <li aria-current={step === 1 ? "step" : undefined}>
            <span>01</span> Tu preparación
          </li>
          <li aria-current={step === 2 ? "step" : undefined}>
            <span>02</span> Tu contacto
          </li>
        </ol>
      )}
      <h3 className="cq-step-heading" tabIndex={-1} ref={heading}>
        {atContact ? "Hablemos de tu objetivo." : "Cuéntanos tu preparación."}
      </h3>
      <p className="cq-introduction">
        {isCoaching
          ? "Revisaremos tu objetivo y tu disponibilidad para hablar contigo sobre el seguimiento que puede encajar. Las preferencias son orientativas; no estás contratando un plan."
          : "Cuéntanos qué necesitas y cómo podemos contactarte para explicarte las opciones y condiciones."}
      </p>
      <div className="form-field">
        <label htmlFor={`${id}-interest`}>Qué te interesa</label>
        <select
          id={`${id}-interest`}
          name="interest"
          disabled={busy}
          value={interest}
          onChange={(event) => {
            setInterest(event.target.value as EnquiryInterest);
            setPlan("");
            setStep(1);
            setFailed(false);
            setStatus("");
          }}
        >
          {Object.entries(interestLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {plan && (
        <p className="chosen-plan">
          Te interesa: {plan}
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setPlan("");
              setProfile((current) => ({ ...current, support: "" }));
            }}
          >
            Cambiar
          </button>
        </p>
      )}
      <fieldset
        className="cq-fields"
        hidden={isCoaching && step === 2}
        disabled={(isCoaching && step === 2) || busy}
      >
        <legend>Tu preparación deportiva</legend>
        <div className="form-field">
          <label htmlFor={`${id}-sport`}>Deporte</label>
          <select
            id={`${id}-sport`}
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
        <label>
          Tu objetivo
          <input
            required
            name="goal"
            placeholder="Qué prueba o preparación te planteas"
            maxLength={300}
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
        </label>
        {isCoaching && (
          <>
            <div className="cq-select-row">
              <label>
                Fecha aproximada <span>(opcional)</span>
                <input
                  name="goalDate"
                  maxLength={100}
                  placeholder="Mes o prueba, si ya lo tienes definido"
                  value={profile.goalDate}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      goalDate: event.target.value,
                    }))
                  }
                />
              </label>
              {profileSelect("experience", "Experiencia previa")}
            </div>
            <div className="cq-select-row">
              {profileSelect("weeklyHours", "Horas semanales disponibles")}
              {profileSelect("difficulty", "Principal dificultad")}
            </div>
            <div className="cq-select-row">
              {profileSelect("support", "Seguimiento deseado")}
              {profileSelect("budget", "Presupuesto mensual orientativo")}
            </div>
            <p className="cq-budget-note">
              El presupuesto expresa tu preferencia. No es una tarifa de ICARO
              ni un compromiso de contratación. También puedes pedir que te
              expliquemos las opciones.
            </p>
          </>
        )}
      </fieldset>
      {isCoaching && step === 2 && (
        <p className="cq-profile-summary">
          <strong>{sport}</strong> · {goal}
        </p>
      )}
      <fieldset
        className="cq-fields"
        hidden={!atContact}
        disabled={!atContact || busy}
      >
        <legend>Tu contacto y consentimiento</legend>
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
        <label>
          Algo más que debamos saber <span>(opcional)</span>
          <textarea
            name="message"
            rows={3}
            placeholder="Lo que quieras añadir sobre tu preparación. Evita incluir datos de salud."
            maxLength={2000}
          />
        </label>
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
      </fieldset>
      <input type="hidden" name="plan" value={plan} />
      <input
        type="hidden"
        name="source"
        value={[source, entry].filter(Boolean).join(" | ")}
      />
      <div className="cq-actions">
        {isCoaching && step === 2 && (
          <button
            className="cq-back"
            type="button"
            disabled={busy}
            onClick={() => changeStep(1)}
          >
            Volver a tu preparación
          </button>
        )}
        <button className="button accent" type="submit" disabled={busy}>
          {busy
            ? "Enviando…"
            : !atContact
              ? "Continuar al contacto"
              : !configured
                ? "Preparar mi consulta"
                : isCoaching
                  ? "Solicitar valoración"
                  : "Enviar mi consulta"}
          <Arrow diagonal />
        </button>
      </div>
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
