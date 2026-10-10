import { test, expect } from "@playwright/test";
for (const [name, width, height] of [
  ["iPhone", 390, 844],
  ["Android", 360, 800],
  ["small mobile", 320, 740],
  ["tablet", 768, 1024],
  ["desktop", 1440, 1000],
] as const) {
  test(`${name}: navigation, content, no overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("body")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width <= 760) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page
        .locator("#mobile-nav")
        .getByRole("link", { name: "Planes", exact: true })
        .click();
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
    } else {
      await page
        .getByRole("navigation", { name: "Principal", exact: true })
        .getByRole("link", { name: "Planes", exact: true })
        .click();
    }
    await expect(page).toHaveURL(/#planes$/);
    for (const id of ["metodo", "planes", "lactato", "faq", "contacto"])
      await expect(page.locator(`#${id}`)).toBeAttached();
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute("href"))
          .filter(
            (h) => h && h !== "#" && !document.getElementById(h.slice(1)),
          ),
      );
    expect(broken).toEqual([]);
    expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/${name.replaceAll(" ", "-")}.png`,
      fullPage: true,
    });
  });
}
test("plans show no prices and each enquiry carries interest to the form", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("main")).not.toContainText(
    /€|\beuros?\b|\bprecios?\b/i,
  );
  await expect(page.locator("#faq")).not.toContainText(
    /€|\beuros?\b|\bprecios?\b/i,
  );
  await expect(page.locator(".price, .hero-price")).toHaveCount(0);
  await expect(page.locator(".plan-modality")).toHaveText([
    "Plan de triatlón",
    "Plan de triatlón",
    "Plan de triatlón",
  ]);
  await page
    .getByRole("button", { name: "Una disciplina", exact: true })
    .click();
  await expect(page.locator(".plan-modality")).toHaveText([
    "Plan de una disciplina",
    "Plan de una disciplina",
    "Plan de una disciplina",
  ]);
  await page.getByRole("button", { name: "Triatlón", exact: true }).click();
  for (const plan of ["Individual", "Coaching", "Performance"]) {
    await page
      .getByRole("link", { name: `Consultar ${plan}`, exact: true })
      .click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator(".chosen-plan")).toContainText(plan);
    await expect(page.locator('input[name="plan"]')).toHaveValue(plan);
    await page.getByRole("button", { name: "Cambiar", exact: true }).click();
    await expect(page.locator(".chosen-plan")).toHaveCount(0);
  }
  await expect(page.locator("main")).not.toContainText(
    /€|\beuros?\b|\bprecios?\b/i,
  );
});

test("technical criteria explain decisions and can be explored with the keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const method = page.locator("#metodo");
  const intensity = method.getByRole("button", {
    name: "Intensidad",
    exact: true,
  });
  const load = method.getByRole("button", {
    name: "Carga y recuperación",
    exact: true,
  });
  const progression = method.getByRole("button", {
    name: "Progresión",
    exact: true,
  });
  const detail = method.locator(".tm-technical-detail");

  await load.click();
  await expect(load).toHaveAttribute("aria-pressed", "true");
  await expect(intensity).toHaveAttribute("aria-pressed", "false");
  await expect(method.locator(".tm-decision-content")).toContainText(
    "recuperación",
  );
  await expect(method.locator(".tm-signals")).toContainText(
    "Tu disponibilidad",
  );
  await detail.locator("summary").click();
  await expect(detail).toHaveAttribute("open", "");
  await expect(detail).toContainText("La dosis importa tanto como la sesión");

  await progression.focus();
  await page.keyboard.press("Enter");
  await expect(progression).toBeFocused();
  await expect(progression).toHaveAttribute("aria-pressed", "true");
  await expect(load).toHaveAttribute("aria-pressed", "false");
  await expect(method.locator('.tm-topic[aria-pressed="true"]')).toHaveCount(1);
  await expect(method.locator(".tm-signals")).toContainText(
    "Sesiones comparables",
  );
  await expect(method.locator(".tm-decision-content")).toContainText(
    "avanzar, repetir o ajustar",
  );
  await expect(detail).not.toHaveAttribute("open");

  await intensity.click();
  await detail.locator("summary").click();
  await expect(detail).toContainText("LT1 y LT2");
  await expect(detail).toContainText("opcional");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("weekly schedule and support channels match the three coaching plans", async ({
  page,
}) => {
  await page.goto("/");
  const schedule = page.locator(".shared-schedule");
  await expect(schedule).toContainText("VIERNES");
  await expect(schedule).toContainText("Tú nos envías tu disponibilidad.");
  await expect(schedule).toContainText("SÁBADO Y DOMINGO");
  await expect(schedule).toContainText("semana anterior");
  await expect(schedule).toContainText("siguiente");
  const individual = page.locator(".plan").filter({
    has: page.getByRole("heading", { name: "Individual", exact: true }),
  });
  const coaching = page.locator(".plan").filter({
    has: page.getByRole("heading", { name: "Coaching", exact: true }),
  });
  const performance = page.locator(".plan").filter({
    has: page.getByRole("heading", { name: "Performance", exact: true }),
  });
  await expect(individual).toContainText("audios de WhatsApp");
  await expect(individual).toContainText("Sin llamadas de seguimiento");
  for (const plan of [individual, coaching, performance]) {
    await expect(plan).toContainText("Llamada inicial");
  }
  await expect(coaching).toContainText("Consultas diarias");
  await expect(coaching).toContainText("Llamada mensual");
  await expect(performance).toContainText("Contacto diario");
  await expect(performance).toContainText("Llamada semanal");
  await page
    .locator("summary")
    .filter({ hasText: "¿Cada cuánto recibo mi planificación?" })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "Cada viernes nos envías tu disponibilidad",
  );
  await expect(page.locator("details[open]")).toContainText(
    "Entre sábado y domingo recibes la programación",
  );
});

test("journey explains the start and weekly cycle, with an interactive session example", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const journey = page.locator("#como-funciona");
  await expect(journey.locator(".journey-stages > li")).toHaveCount(8);
  const initialCall = journey.locator(".journey-step").filter({
    has: page.getByRole("heading", { name: "Llamada inicial.", exact: true }),
  });
  await expect(initialCall).toContainText("Incluida en los tres planes");
  await expect(journey.locator(".journey-loop")).toContainText(
    "prescribir, revisar y ajustar",
  );

  const calendar = journey.locator(".training-calendar");
  await expect(calendar).toContainText("SEMANA ORIENTATIVA");
  await expect(calendar).toContainText("no un plan individual");
  const bike = calendar.getByRole("button", { name: /^Martes: Ciclismo/ });
  await bike.click();
  await expect(calendar.locator(".tc-detail h4")).toHaveText("Pedaleo estable");
  await expect(calendar.locator(".tc-detail-meta")).toContainText("55 min");
  await expect(bike).toHaveAttribute("aria-pressed", "true");
  await expect(calendar.locator('button[aria-pressed="true"]')).toHaveCount(1);

  const rest = calendar.getByRole("button", { name: /^Jueves: Recuperación/ });
  await rest.focus();
  await page.keyboard.press("Enter");
  await expect(rest).toBeFocused();
  await expect(rest).toHaveAttribute("aria-pressed", "true");
  await expect(bike).toHaveAttribute("aria-pressed", "false");
  await expect(calendar.locator(".tc-recovery-note")).toContainText("descanso");
  await expect(calendar.locator(".tc-structure-bar")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("optional lactate conditions are clear and a track enquiry is prefilled", async ({
  page,
}) => {
  await page.goto("/");
  const benefits = page.locator(".plan-lactate");
  await expect(benefits.nth(0)).toContainText(
    "Condiciones para atletas del plan",
  );
  await expect(benefits.nth(1)).toContainText("promoción trimestral");
  await expect(benefits.nth(2)).toContainText("1 test incluido cada 6 meses");
  await expect(benefits.nth(2)).toContainText("opción trimestral");
  await page
    .getByRole("button", { name: "Una disciplina", exact: true })
    .click();
  await expect(benefits.nth(0)).toContainText(
    "Condiciones para atletas del plan",
  );
  await expect(benefits.nth(2)).toContainText("cada 6 meses");
  await expect(page.locator("#lactato")).not.toContainText(
    /€|\beuros?\b|\bprecios?\b/i,
  );
  await expect(page.locator(".lactate-rate-note")).toContainText(
    "Tests opcionales",
  );
  await expect(page.locator(".lactate-travel")).toHaveText(
    "Desplazamiento presupuestado antes de reservar.",
  );
  await page
    .getByRole("link", { name: "Consultar condiciones del test", exact: true })
    .click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.locator('input[name="plan"]')).toHaveValue(
    "Test de lactato en pista",
  );
  await expect(page.locator(".chosen-plan")).toContainText(
    "Test de lactato en pista",
  );
});
test("contact requires consent and posts the enquiry to the native mail service", async ({
  page,
}) => {
  const requests: string[] = [];
  await page.route(
    "https://formsubmit.co/contacticaroproject@gmail.com",
    async (route) => {
      expect(route.request().method()).toBe("POST");
      expect(route.request().isNavigationRequest()).toBe(true);
      requests.push(route.request().postData() || "");
      await route.fulfill({
        contentType: "text/html; charset=utf-8",
        body: "<h1>Servicio de envío de prueba</h1>",
      });
    },
  );
  await page.goto("/");
  await page.getByLabel("Nombre", { exact: true }).fill("Atleta de prueba");
  await page
    .getByLabel("Email o teléfono", { exact: true })
    .fill("atleta@example.com");
  await page
    .getByLabel("Deporte", { exact: true })
    .selectOption("Atleta híbrido");
  await page
    .getByLabel("Tu objetivo", { exact: true })
    .fill("Preparar una media maratón");
  await page
    .getByRole("button", { name: "Cuéntame tu objetivo", exact: true })
    .click();
  expect(requests).toHaveLength(0);
  await page.getByRole("checkbox").check();
  await page.getByLabel("Email o teléfono", { exact: true }).fill("incorrecto");
  await page
    .getByRole("button", { name: "Cuéntame tu objetivo", exact: true })
    .click();
  await expect(page.locator(".form-status")).toContainText(
    "Introduce un email válido",
  );
  expect(requests).toHaveLength(0);
  await page
    .getByLabel("Email o teléfono", { exact: true })
    .fill("atleta@example.com");
  await page
    .getByRole("button", { name: "Cuéntame tu objetivo", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Servicio de envío de prueba",
  );
  const data = new URLSearchParams(requests[0]);
  expect(data.get("contact")).toBe("atleta@example.com");
  expect(data.get("_replyto")).toBe("atleta@example.com");
  expect(data.get("consent")).toBe("on");
  expect(data.get("sport")).toBe("Atleta híbrido");
  await page.goto("/privacidad");
  await expect(page.locator("main")).toContainText("FormSubmit");
});
test("keyboard access and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido/);
  expect(
    await page
      .locator('input:not([type="hidden"]), select, textarea')
      .evaluateAll((elements) =>
        elements.every((e) => (e as HTMLInputElement).labels?.length),
      ),
  ).toBe(true);
});

test("triathlon product, platform and Barcelona are clear and real photos load", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tu reto.",
  );
  await expect(page.locator("#como-funciona")).toContainText("TrainingPeaks");
  await expect(page.locator("#atleta-hibrido")).toContainText(
    "resistencia y fuerza",
  );
  await page
    .getByLabel("Deporte", { exact: true })
    .selectOption("Atleta híbrido");
  await expect(page.getByLabel("Deporte", { exact: true })).toHaveValue(
    "Atleta híbrido",
  );
  await expect(page.locator("#como-funciona")).toContainText(
    "reloj compatible",
  );
  await expect(page.locator("#barcelona")).toContainText("Dos centros");
  await expect(page.locator("#barcelona")).toContainText("Barcelona");
  await expect(
    page.locator(".testimonials, #sobre-mi, #sobre-nosotros"),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: "Ver cómo empezamos", exact: true })
    .click();
  await expect(page).toHaveURL(/#como-funciona$/);
  await expect(
    page.getByRole("button", { name: "Triatlón", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const images = page.locator(".hero-visual img, .triathlon-sports img");
  await expect(images).toHaveCount(4);
  for (const photo of await images.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect
      .poll(() =>
        photo.evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(photo).toHaveAttribute("alt", /.+/);
  }
});
