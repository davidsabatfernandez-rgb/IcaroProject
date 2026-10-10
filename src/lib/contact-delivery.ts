const recipient = "contacticaroproject@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sports = new Set([
  "Running",
  "Ciclismo",
  "Natación",
  "Triatlón",
  "Atleta híbrido",
]);
const failure = (status: number, message: string) =>
  Response.json({ success: false, message }, { status });

export async function handleContact(
  request: Request,
  options: {
    apiKey?: string;
    fromEmail?: string;
    send?: typeof fetch;
  },
): Promise<Response> {
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol === "https" || forwardedProtocol === "http"
      ? `${forwardedProtocol}:`
      : url.protocol;
  if (request.headers.get("origin") !== `${protocol}//${host}`) {
    return failure(
      403,
      "Envía la consulta desde el formulario de nuestra web.",
    );
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return failure(415, "El formato de la consulta no es válido.");
  }
  if (Number(request.headers.get("content-length")) > 8000) {
    return failure(413, "La consulta es demasiado larga.");
  }
  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 8000)
      return failure(413, "La consulta es demasiado larga.");
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return failure(400, "Revisa los datos de la consulta.");
    data = parsed as Record<string, unknown>;
  } catch {
    return failure(400, "Revisa los datos de la consulta.");
  }
  const field = (name: string, max: number, required = true) => {
    const value = data[name];
    if (!required && (value === undefined || value === "")) return "";
    if (typeof value !== "string") return null;
    const text = value.trim();
    return text.length <= max && (!required || text.length > 0) ? text : null;
  };
  const name = field("name", 100);
  const contact = field("contact", 150);
  const sport = field("sport", 30);
  const goal = field("goal", 300);
  const message = field("message", 2000, false);
  const plan = field("plan", 100, false);
  if (
    !name ||
    !contact ||
    !sport ||
    !sports.has(sport) ||
    !goal ||
    message === null ||
    plan === null ||
    (!emailPattern.test(contact) && !/^\+?[\d\s().-]{6,25}$/.test(contact)) ||
    (data.consent !== "on" && data.consent !== true) ||
    (data._honey !== undefined && data._honey !== "")
  ) {
    return failure(
      400,
      "Revisa los campos y confirma que has leído la política de privacidad.",
    );
  }
  if (!options.apiKey) {
    return failure(
      503,
      "El envío por email aún no está disponible. Puedes enviarnos esta consulta por WhatsApp.",
    );
  }
  try {
    const response = await (options.send || fetch)(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: options.fromEmail || "ICARO PROJECT <onboarding@resend.dev>",
          to: [recipient],
          subject: "Nueva consulta · ICARO PROJECT",
          ...(emailPattern.test(contact) ? { reply_to: contact } : {}),
          text: `Nombre: ${name}\nContacto: ${contact}\nDeporte: ${sport}\nObjetivo: ${goal}\n${plan ? `Plan: ${plan}\n` : ""}\n${message}\n\nEl atleta confirmó que ha leído la política de privacidad.`,
        }),
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      },
    );
    if (!response.ok)
      return failure(
        502,
        "No hemos podido enviar el email. Puedes enviarnos la consulta por WhatsApp.",
      );
    const acknowledgment: unknown = await response.json();
    if (
      !acknowledgment ||
      typeof acknowledgment !== "object" ||
      !("id" in acknowledgment) ||
      typeof acknowledgment.id !== "string" ||
      !acknowledgment.id.trim()
    ) {
      return failure(
        502,
        "No hemos recibido confirmación del envío. Puedes contactar por WhatsApp.",
      );
    }
    return Response.json({ success: true });
  } catch {
    return failure(
      504,
      "No hemos podido confirmar el envío a tiempo. Puedes contactar por WhatsApp.",
    );
  }
}
