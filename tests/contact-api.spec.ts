import { expect, test } from "@playwright/test";
import { handleContact } from "../src/lib/contact-delivery";

const origin = "https://www.icaroproject.es";
const endpoint = `${origin}/api/contact`;
const validEnquiry = {
  name: "Atleta de prueba",
  contact: "atleta@example.com",
  sport: "Atleta híbrido",
  goal: "Preparar una media maratón",
  message: "Tengo tres tardes disponibles.",
  plan: "Coaching",
  consent: "on",
  _honey: "",
};

function enquiry(
  values: Record<string, unknown> = {},
  requestOrigin: string | null = origin,
) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (requestOrigin !== null) headers.set("Origin", requestOrigin);
  return new Request(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...validEnquiry, ...values }),
  });
}

function provider(body: unknown, status = 200) {
  const requests: { url: string; init?: RequestInit }[] = [];
  const send: typeof fetch = async (input, init) => {
    requests.push({
      url: input instanceof Request ? input.url : String(input),
      init,
    });
    return Response.json(body, { status });
  };
  return { requests, send };
}

test("contact API sends a fixed recipient and preserves the athlete's enquiry", async () => {
  const mail = provider({ id: "test-message-id" });
  const response = await handleContact(
    enquiry({
      to: "other@example.com",
      from: "attacker@example.com",
      _subject: "Untrusted subject",
    }),
    {
      apiKey: "test-api-key",
      fromEmail: "ICARO <contacto@icaroproject.es>",
      send: mail.send,
    },
  );

  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ success: true });
  expect(mail.requests).toHaveLength(1);
  const request = mail.requests[0];
  expect(request.url).toBe("https://api.resend.com/emails");
  expect(request.init?.method).toBe("POST");
  const headers = new Headers(request.init?.headers);
  expect(headers.get("Authorization")).toBe("Bearer test-api-key");
  const payload = JSON.parse(String(request.init?.body));
  expect([payload.to].flat()).toEqual(["contacticaroproject@gmail.com"]);
  expect(payload.from).toBe("ICARO <contacto@icaroproject.es>");
  expect(payload.subject).not.toBe("Untrusted subject");
  expect(payload.reply_to).toBe("atleta@example.com");
  for (const field of ["name", "sport", "goal", "message", "plan"] as const)
    expect(payload.text).toContain(validEnquiry[field]);
  expect(payload).not.toHaveProperty("html");
});

test("contact API accepts phone contacts without an invalid email reply address", async () => {
  const mail = provider({ id: "phone-message-id" });
  const response = await handleContact(
    enquiry({ contact: "+34 619 28 25 82", consent: true }),
    { apiKey: "test-api-key", send: mail.send },
  );

  expect(response.status).toBe(200);
  const payload = JSON.parse(String(mail.requests[0].init?.body));
  expect(payload.text).toContain("+34 619 28 25 82");
  expect(payload).not.toHaveProperty("reply_to");
});

test("contact API rejects invalid fields and honeypot submissions before contacting mail", async () => {
  const mail = provider({ id: "must-not-be-sent" });
  const invalidEnquiries: Record<string, unknown>[] = [
    { name: "" },
    { name: "n".repeat(101) },
    { name: null },
    { contact: "invalid contact" },
    { contact: "a".repeat(151) },
    { sport: "Unknown discipline" },
    { goal: "" },
    { goal: "g".repeat(301) },
    { message: "m".repeat(2001) },
    { plan: "p".repeat(101) },
    { consent: false },
    { consent: "off" },
    { _honey: "https://spam.example.com" },
  ];

  for (const values of invalidEnquiries) {
    const response = await handleContact(enquiry(values), {
      apiKey: "test-api-key",
      send: mail.send,
    });
    expect(response.status, JSON.stringify(values).slice(0, 150)).toBe(400);
    expect(await response.json()).toMatchObject({ success: false });
  }
  expect(mail.requests).toHaveLength(0);
});

test("contact API rejects missing or cross-site origins without sending", async () => {
  const mail = provider({ id: "must-not-be-sent" });
  for (const requestOrigin of [null, "https://other.example.com"]) {
    const response = await handleContact(enquiry({}, requestOrigin), {
      apiKey: "test-api-key",
      send: mail.send,
    });
    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ success: false });
  }
  expect(mail.requests).toHaveLength(0);
});

test("contact API rejects malformed and oversized JSON before contacting mail", async () => {
  const mail = provider({ id: "must-not-be-sent" });
  const malformed = new Request(endpoint, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: "{",
  });
  const invalidResponse = await handleContact(malformed, {
    apiKey: "test-api-key",
    send: mail.send,
  });
  expect(invalidResponse.status).toBe(400);
  expect(await invalidResponse.json()).toMatchObject({ success: false });

  // UTF-8 bytes matter, even when the number of JS characters is below 8000.
  const oversizedResponse = await handleContact(
    enquiry({ message: "🏃".repeat(2500) }),
    { apiKey: "test-api-key", send: mail.send },
  );
  expect(oversizedResponse.status).toBe(413);
  expect(await oversizedResponse.json()).toMatchObject({ success: false });
  expect(mail.requests).toHaveLength(0);
});

test("contact API reports missing mail configuration without claiming an email was sent", async () => {
  const mail = provider({ id: "must-not-be-sent" });
  const response = await handleContact(enquiry(), { send: mail.send });
  expect(response.status).toBe(503);
  expect(await response.json()).toMatchObject({ success: false });
  expect(mail.requests).toHaveLength(0);
});

test("contact API never reports delivery after provider rejection or missing acceptance id", async () => {
  for (const [status, body] of [
    [401, { message: "Invalid API key" }],
    [422, { message: "Sender not permitted" }],
    [429, { message: "Too many requests" }],
    [500, { message: "Provider unavailable" }],
    [200, {}],
    [200, { id: "" }],
  ] as const) {
    const mail = provider(body, status);
    const response = await handleContact(enquiry(), {
      apiKey: "test-api-key",
      send: mail.send,
    });
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ success: false });
  }
});

test("contact API returns a retryable failure when the mail connection fails", async () => {
  for (const error of [
    new TypeError("Network unavailable"),
    new DOMException("Provider timed out", "TimeoutError"),
  ]) {
    const send: typeof fetch = async () => {
      throw error;
    };
    const response = await handleContact(enquiry(), {
      apiKey: "test-api-key",
      send,
    });
    expect(response.status).toBe(504);
    expect(await response.json()).toMatchObject({ success: false });
  }
});
