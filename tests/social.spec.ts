import { expect, test } from "@playwright/test";
import {
  isUpcomingSocialEvent,
  socialEvents,
  socialEventDate,
  socialEventTime,
  upcomingSocialEvents,
  verifiedSocialUrl,
  type SocialEvent,
} from "../src/data/social";

const referenceTime = Date.parse("2030-01-01T00:00:00Z");
/** Test-only data; never included in the public community configuration. */
function eventFixture(overrides: Partial<SocialEvent> = {}): SocialEvent {
  return {
    id: "fixture-run",
    type: "run",
    title: "Encuentro de prueba",
    status: "published",
    confirmed: true,
    startsAt: "2030-06-15T09:00:00+02:00",
    timeZone: "Europe/Madrid",
    meetingPoint: "Punto de encuentro de prueba",
    route: { description: "Recorrido de prueba", distancesKm: [5, 10] },
    groups: [{ name: "Grupo de prueba", description: "Condiciones de prueba" }],
    requirements: ["Requisito de prueba"],
    conditions: "Condiciones de prueba",
    safetyRecommendations: ["Recomendación de prueba"],
    ...overrides,
  };
}

test("the public agenda remains empty until actual events have been confirmed", () => {
  expect(socialEvents).toEqual([]);
  expect(upcomingSocialEvents([], referenceTime)).toEqual([]);
});

test("the agenda publishes only complete future events with the correct Madrid time", () => {
  const valid = eventFixture();
  expect(isUpcomingSocialEvent(valid, referenceTime)).toBe(true);
  expect(socialEventDate(valid)).toContain("15 de junio de 2030");
  expect(socialEventTime(valid)).toBe("09:00");
  for (const invalid of [
    eventFixture({ status: "draft" }),
    eventFixture({ status: "cancelled" }),
    eventFixture({ confirmed: false }),
    eventFixture({ meetingPoint: " " }),
    eventFixture({ groups: [] }),
    eventFixture({ requirements: [] }),
    eventFixture({ conditions: "" }),
    eventFixture({ safetyRecommendations: [] }),
    eventFixture({ route: { description: "Ruta", distancesKm: [Number.NaN] } }),
    eventFixture({ route: { description: "Ruta", distancesKm: [0] } }),
    eventFixture({ startsAt: "2029-06-15T09:00:00+02:00" }),
    eventFixture({ startsAt: "2030-06-15T09:00:00+01:00" }),
    eventFixture({ startsAt: "2030-02-30T09:00:00+01:00" }),
    eventFixture({ startsAt: "2030-06-15T09:00:00Z" }),
  ]) {
    expect(isUpcomingSocialEvent(invalid, referenceTime)).toBe(false);
  }
  expect(isUpcomingSocialEvent(valid, Date.parse(valid.startsAt))).toBe(false);
  const earlier = eventFixture({
    id: "fixture-ride",
    type: "ride",
    startsAt: "2030-02-12T08:30:00+01:00",
  });
  expect(
    upcomingSocialEvents([valid, valid, earlier], referenceTime).map(
      (event) => event.id,
    ),
  ).toEqual(["fixture-ride", "fixture-run"]);
});

test("social destinations require editor verification, HTTPS and the expected host", () => {
  expect(
    verifiedSocialUrl({
      url: "https://www.strava.com/clubs/confirmed-fixture",
      host: "www.strava.com",
      verified: true,
    }),
  ).toBe("https://www.strava.com/clubs/confirmed-fixture");
  for (const link of [
    { url: "", host: "", verified: false },
    { url: "https://www.strava.com/", host: "www.strava.com", verified: false },
    { url: "http://www.strava.com/", host: "www.strava.com", verified: true },
    { url: "https://wrong.example/", host: "www.strava.com", verified: true },
    { url: "javascript:alert(1)", host: "www.strava.com", verified: true },
    {
      url: "https://user:pass@www.strava.com/",
      host: "www.strava.com",
      verified: true,
    },
    {
      url: "https://www.strava.com:9443/",
      host: "www.strava.com",
      verified: true,
    },
    { url: "https://localhost/", host: "localhost", verified: true },
  ]) {
    expect(verifiedSocialUrl(link)).toBeNull();
  }
  expect(
    verifiedSocialUrl(
      {
        url: "https://www.strava.com/",
        host: "www.strava.com",
        verified: true,
      },
      ["instagram.com", "www.instagram.com"],
    ),
  ).toBeNull();
});

test("the community is prominent before the home plans and links to both activities", async ({
  page,
}) => {
  await page.goto("/");
  const community = page.locator("#comunidad");
  await expect(
    community.getByRole("heading", { name: "ICARO SOCIAL CLUB", exact: true }),
  ).toBeVisible();
  await expect(
    community.getByRole("link", { name: "DESCUBRIR SOCIAL RUNS" }),
  ).toHaveAttribute("href", "/social#runs");
  await expect(
    community.getByRole("link", { name: "DESCUBRIR SOCIAL RIDES" }),
  ).toHaveAttribute("href", "/social#rides");
  expect(
    await page.evaluate(() =>
      Boolean(
        document
          .querySelector("#comunidad")!
          .compareDocumentPosition(document.querySelector("#planes")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true);
});

test("the social page has clear empty-agenda and community states without invented signups", async ({
  page,
}) => {
  await page.goto("/social");
  await expect(page).toHaveTitle(
    "ICARO Social Club · Social Runs y Social Rides",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.icaroproject.es/social",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "SOCIAL CLUB",
  );
  await expect(page.locator("#agenda")).toContainText(
    "Próximas quedadas en preparación.",
  );
  await expect(page.locator("#agenda time")).toHaveCount(0);
  await expect(
    page.locator(
      '.social-event, .social-page a[href*="strava.com"], .social-page a[href*="instagram.com"]',
    ),
  ).toHaveCount(0);
  await expect(page.locator("#participar")).toContainText(
    "el envío no confirma una inscripción",
  );
  const form = page.locator("#participar .cq-form");
  await expect(form.locator('select[name="interest"]')).toHaveValue(
    "collective",
  );
  await expect(
    form.locator('select[name="support"], select[name="budget"], .cq-progress'),
  ).toHaveCount(0);
  await expect(form.getByLabel("Nombre", { exact: true })).toBeVisible();
  await expect(form.locator('input[name="plan"]')).toHaveValue("");
});

test("run and ride queries keep distinct interests and disciplines through submission", async ({
  page,
}) => {
  const enquiries: Record<string, unknown>[] = [];
  await page.route("**/api/contact", async (route) => {
    enquiries.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, qualification: "pending_review" }),
    });
  });
  for (const activity of [
    { id: "runs", label: "Run", interest: "social_run", sport: "Carrera" },
    { id: "rides", label: "Ride", interest: "social_ride", sport: "Ciclismo" },
  ]) {
    await page.goto("/social");
    await page
      .locator(`#${activity.id}`)
      .getByRole("link", {
        name: `Consultar próximo Social ${activity.label}`,
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(/\/social#participar$/);
    const form = page.locator("#participar .cq-form");
    await expect(form.locator('select[name="interest"]')).toHaveValue(
      activity.interest,
    );
    await expect(form.locator('select[name="sport"]')).toHaveValue(
      activity.sport,
    );
    await expect(form.locator('input[name="source"]')).toHaveValue(
      new RegExp(`^social-${activity.id}`),
    );
    await expect(
      form.locator(
        'select[name="support"], select[name="budget"], .cq-progress',
      ),
    ).toHaveCount(0);
    await form
      .getByLabel("Tu objetivo", { exact: true })
      .fill(`Consultar la próxima salida de ${activity.sport}`);
    await form
      .getByLabel("Nombre", { exact: true })
      .fill("Participante de prueba");
    await form
      .getByLabel("Correo o teléfono", { exact: true })
      .fill("social@example.com");
    await form.getByRole("checkbox").check();
    await form
      .getByRole("button", { name: "Enviar mi consulta", exact: true })
      .click();
    await expect(form.getByRole("status")).toContainText(
      "Tu consulta se ha enviado",
    );
  }
  expect(enquiries).toHaveLength(2);
  expect(enquiries[0]).toMatchObject({
    interest: "social_run",
    sport: "Carrera",
    plan: "",
    support: "",
    budget: "",
  });
  expect(enquiries[1]).toMatchObject({
    interest: "social_ride",
    sport: "Ciclismo",
    plan: "",
    support: "",
    budget: "",
  });
});

for (const width of [320, 390, 768, 1440]) {
  test(`social activities, agenda and contact remain usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/social");
    await expect(page.locator("#runs h2")).toContainText("DIFERENTES RITMOS");
    await expect(page.locator("#rides h2")).toContainText("SALIMOS JUNTOS");
    const form = page.locator("#participar .cq-form");
    await expect(form.getByLabel("Nombre", { exact: true })).toBeVisible();
    await expect(
      form.getByRole("button", { name: "Enviar mi consulta", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const images = page.locator(
      ".social-hero-photo img, .social-activity-photo img",
    );
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
  });
}
