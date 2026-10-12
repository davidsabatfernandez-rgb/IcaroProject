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
    const bubble = page.getByRole("link", {
      name: "Contactar por WhatsApp (abre en una pestaña nueva)",
      exact: true,
    });
    await expect(bubble).toBeVisible();
    const chatUrl = new URL((await bubble.getAttribute("href"))!);
    expect(chatUrl.hostname).toBe("wa.me");
    expect(chatUrl.pathname).toBe("/34619282582");
    await expect(bubble).toHaveAttribute("target", "_blank");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width <= 900) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page
        .locator("#mobile-nav")
        .getByRole("link", { name: "Empieza tu preparación" })
        .click();
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
      await expect(page.locator('input[name="source"]')).toHaveValue(
        /^header-mobile \| /,
      );
      await page.getByRole("button", { name: "Abrir menú" }).click();
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
    for (const link of await page
      .getByRole("link", { name: /Contáctanos por WhatsApp/ })
      .all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/34619282582");
      await expect(link).toHaveAttribute("target", "_blank");
    }
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
  await expect(page.locator("#planes")).not.toContainText(
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
  await page
    .locator("#planes")
    .getByRole("button", { name: "Triatlón", exact: true })
    .click();
  for (const plan of ["Individual", "Seguimiento", "Rendimiento"]) {
    await page
      .getByRole("link", { name: `Consultar este plan: ${plan}`, exact: true })
      .click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator(".chosen-plan")).toContainText(plan);
    await expect(page.locator('input[name="plan"]')).toHaveValue(plan);
    await expect(
      page.getByLabel("Qué te interesa", { exact: true }),
    ).toHaveValue("coaching");
    await expect(page.getByLabel("Deporte", { exact: true })).toHaveValue(
      "Triatlón",
    );
    await expect(page.locator('input[name="source"]')).toHaveValue(
      /^planes \| /,
    );
    await page.getByRole("button", { name: "Cambiar", exact: true }).click();
    await expect(page.locator(".chosen-plan")).toHaveCount(0);
  }
  await expect(page.locator("#planes")).not.toContainText(
    /€|\beuros?\b|\bprecios?\b/i,
  );
});

test("lactate lab distinguishes synthetic observations, estimates and interpretations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const lab = page.locator(".lactate-lab");
  await expect(lab.locator(".ll-demo")).toContainText("datos sintéticos");
  await expect(lab.locator(".ll-demo")).toContainText(
    "No son resultados de un atleta",
  );
  await expect(lab.locator(".ll-chart-caption")).toContainText("min/km");
  await expect(lab.locator(".ll-thresholds")).toContainText(/referencias/i);
  await expect(lab.locator(".ll-plot-point")).toHaveCount(7);

  // A graph point is reachable and actionable without using a pointer.
  const lastPoint = lab.getByRole("button", {
    name: /^Punto 0?7 de la curva:/,
  });
  await lastPoint.focus();
  await page.keyboard.press("Enter");
  await expect(lastPoint).toBeFocused();
  await expect(lastPoint).toHaveAttribute("aria-pressed", "true");
  await expect(lab.locator('.ll-plot-point[aria-pressed="true"]')).toHaveCount(
    1,
  );
  await expect(lab.locator(".ll-reading h4")).toHaveText(
    "Por encima de la referencia LT2",
  );
  await expect(lab.getByRole("status")).toContainText("escalón 7");
  await expect(lab.locator(".ll-lactate-number")).toContainText("6,7");
  await expect(lab.locator(".ll-main-reading")).toContainText(
    "Observación simulada",
  );

  await lab.getByRole("button", { name: "Evaluación A", exact: true }).click();
  await expect(lab.locator(".ll-lactate-number")).toContainText("8,6");
  await expect(lab.locator(".ll-longitudinal")).toContainText(
    "no demuestra por sí sola una mejora",
  );
  await lab.getByRole("button", { name: "Evaluación B", exact: true }).click();
  await expect(lab.locator(".ll-lactate-number")).toContainText("6,7");
  const compare = lab.getByRole("button", {
    name: "Comparar A / B",
    exact: true,
  });
  await compare.click();
  await expect(compare).toHaveAttribute("aria-pressed", "false");
  await expect(lab.locator(".ll-longitudinal")).toHaveCount(0);
  await compare.click();
  await expect(lab.locator(".ll-longitudinal")).toBeVisible();

  const sports = lab.getByRole("group", {
    name: "Disciplina del ejemplo de lactato",
  });
  await sports.getByRole("button", { name: "Ciclismo", exact: true }).click();
  await expect(lab.locator(".ll-chart-caption")).toContainText("Potencia · W");
  const firstSample = lab.getByRole("button", { name: /^Escalón 0?1/ });
  await firstSample.click();
  await expect(lab.locator(".ll-reading-metrics")).toContainText("100 W");
  await expect(lab.locator(".ll-reading h4")).toHaveText(
    "Por debajo de la referencia LT1",
  );
  await expect(lab.getByRole("status")).toContainText("114 latidos por minuto");
  const data = lab.locator(".ll-data-table");
  await data.locator("summary").click();
  await expect(data.locator("tbody tr")).toHaveCount(7);
  await expect(data.locator("thead th")).toHaveCount(5);
  await expect(data.locator("caption")).toContainText("Valores inventados");

  await sports.getByRole("button", { name: "Natación", exact: true }).click();
  await expect(lab.locator(".ll-chart-caption")).toContainText("min/100 m");
  await expect(lab.locator(".ll-reading-metrics")).toContainText(
    "No registrada",
  );
  await expect(lab.getByRole("status")).toContainText(
    "Frecuencia cardiaca no registrada",
  );
  await data.locator("summary").click();
  await expect(data.locator("thead th")).toHaveCount(3);
  await expect(data.locator("tbody tr")).toHaveCount(7);
  await lab.locator(".ll-method-notes summary").click();
  await expect(lab.locator(".ll-method-notes")).toContainText(
    "No calculamos los umbrales aplicando una concentración universal",
  );
  await expect(lab.locator(".ll-method-notes")).toContainText(
    "no implica que ICARO ofrezca pruebas de lactato en piscina",
  );
  await sports.getByRole("button", { name: "Carrera", exact: true }).click();
  await expect(lab.locator(".ll-chart-caption")).toContainText("min/km");
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
    has: page.getByRole("heading", { name: "Seguimiento", exact: true }),
  });
  const performance = page.locator(".plan").filter({
    has: page.getByRole("heading", { name: "Rendimiento", exact: true }),
  });
  await expect(individual).toContainText("audios de WhatsApp");
  await expect(individual).toContainText("Sin llamadas de seguimiento");
  await expect(page.locator(".pricing-included")).toContainText(
    "Llamada inicial",
  );
  await expect(page.locator(".pricing-included")).toContainText(
    "LOS TRES PLANES",
  );
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

test("onboarding and calendar explain sessions and adapt a coherent weekly example", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const journey = page.locator("#como-funciona");
  const onboarding = journey.locator(".atelier-onboarding");
  await onboarding.locator("summary").click();
  await expect(onboarding.locator("ol > li")).toHaveCount(8);
  const initialCall = onboarding.locator("li").filter({
    has: page.getByRole("heading", { name: "Llamada inicial.", exact: true }),
  });
  await expect(initialCall).toContainText("Incluida en los tres planes");
  await expect(onboarding).toContainText(
    "Prescribir, revisar, ajustar y repetir",
  );

  const calendar = journey.locator(".training-calendar");
  await expect(calendar).toContainText("SEMANA ORIENTATIVA");
  await expect(calendar).toContainText(
    "no un plan individual ni un generador automático",
  );
  await expect(calendar.locator(".tc-total strong")).toHaveText("7 h");
  await expect(calendar.locator(".tc-total small")).toContainText(
    "420 minutos",
  );
  const bike = calendar.getByRole("button", { name: /^Martes: Ciclismo/ });
  await bike.click();
  await expect(calendar.locator(".tc-detail h4")).toHaveText("Pedaleo estable");
  await expect(calendar.locator(".tc-detail-meta")).toContainText("55 min");
  await expect(calendar.locator(".tc-session-reasoning")).toContainText(
    "Por qué este día",
  );
  await expect(calendar.locator(".tc-session-reasoning")).toContainText(
    "Adaptación que buscamos",
  );
  await expect(bike).toHaveAttribute("aria-pressed", "true");
  await expect(
    calendar.locator('.tc-session[aria-pressed="true"]'),
  ).toHaveCount(1);

  await calendar
    .getByRole("button", { name: "Esta semana, menos tiempo", exact: true })
    .click();
  await expect(calendar.locator(".tc-total strong")).toHaveText("4 h 20 min");
  await expect(calendar.locator(".tc-total small")).toContainText(
    "260 minutos",
  );
  await expect(calendar.locator(".tc-detail-meta")).toContainText("40 min");
  await expect(calendar.locator(".tc-summary")).toContainText(
    "No compensamos con más intensidad",
  );
  await expect(
    calendar.getByRole("button", { name: /^Viernes: Ciclismo/ }),
  ).toHaveCount(0);
  await expect(
    calendar.getByRole("button", { name: /^Viernes: Natación/ }),
  ).toHaveCount(1);
  await expect(calendar.locator(".tc-key")).toContainText("Fuerza");
  const rest = calendar.getByRole("button", { name: /^Jueves: Recuperación/ });
  await rest.focus();
  await page.keyboard.press("Enter");
  await expect(rest).toBeFocused();
  await expect(rest).toHaveAttribute("aria-pressed", "true");
  await expect(bike).toHaveAttribute("aria-pressed", "false");
  await expect(calendar.locator(".tc-recovery-note")).toContainText("descanso");
  await expect(calendar.locator(".tc-structure-bar")).toHaveCount(0);
  await calendar
    .getByRole("button", { name: "Disponibilidad habitual", exact: true })
    .click();
  await expect(calendar.locator(".tc-total strong")).toHaveText("7 h");
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
  await expect(benefits.nth(1)).toContainText(/promoción trimestral/i);
  await expect(benefits.nth(2)).toContainText("1 prueba incluida cada 6 meses");
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
    "Pruebas opcionales",
  );
  await expect(page.locator(".lactate-travel")).toHaveText(
    "Desplazamiento presupuestado antes de reservar.",
  );
  await page
    .getByRole("link", {
      name: "Consultar condiciones de la prueba",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.locator('input[name="plan"]')).toHaveValue(
    "Prueba de lactato en pista",
  );
  await expect(page.locator(".chosen-plan")).toContainText(
    "Prueba de lactato en pista",
  );
  await expect(page.getByLabel("Qué te interesa", { exact: true })).toHaveValue(
    "tests",
  );
  await expect(page.locator('input[name="source"]')).toHaveValue(
    /^lactato \| /,
  );
});
test("contact handles mail failures and offers the same enquiry in WhatsApp", async ({
  page,
}) => {
  const payloads: Record<string, unknown>[] = [];
  let accepted = false;
  await page.route("**/api/contact", async (route) => {
    expect(route.request().isNavigationRequest()).toBe(false);
    payloads.push(route.request().postDataJSON());
    await route.fulfill({
      status: accepted ? 200 : 503,
      contentType: "application/json",
      body: JSON.stringify(
        accepted
          ? { success: true }
          : {
              success: false,
              message:
                "El envío por correo electrónico aún no está disponible. Puedes enviarnos esta consulta por WhatsApp.",
            },
      ),
    });
  });
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Consultar este plan: Seguimiento",
      exact: true,
    })
    .click();
  await page
    .getByLabel("Deporte", { exact: true })
    .selectOption("Atleta híbrido");
  await page
    .getByLabel("Tu objetivo", { exact: true })
    .fill("Preparar una media maratón");
  await page
    .getByRole("button", { name: "Continuar al contacto", exact: true })
    .click();
  await page.getByLabel("Nombre", { exact: true }).fill("Atleta de prueba");
  await page
    .getByLabel("Correo o teléfono", { exact: true })
    .fill("atleta@example.com");
  await page
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  expect(payloads).toHaveLength(0);
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(page.locator(".form-status")).toContainText(
    "correo electrónico aún no está disponible",
  );
  await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue(
    "Atleta de prueba",
  );
  const fallback = page.getByRole("link", {
    name: "Enviar mi consulta por WhatsApp",
  });
  await expect(fallback).toBeVisible();
  const url = new URL((await fallback.getAttribute("href"))!);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/34619282582");
  expect(url.searchParams.get("text")).toContain("Preparar una media maratón");
  expect(url.searchParams.get("text")).toContain("Plan: Seguimiento");
  expect(payloads[0]).toMatchObject({
    contact: "atleta@example.com",
    sport: "Atleta híbrido",
    consent: "on",
    plan: "Seguimiento",
    interest: "coaching",
  });
  expect(payloads[0].source).toMatch(/^planes \| /);
  accepted = true;
  await page
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(page.locator(".form-status")).toContainText(
    "Tu consulta se ha enviado",
  );
  await expect(page.getByLabel("Nombre", { exact: true })).toBeEmpty();
  await expect(fallback).toHaveCount(0);
  await page.goto("/privacidad");
  await expect(page.locator("main")).toContainText("Resend");
});

test("contact times out and releases the send button without losing the enquiry", async ({
  page,
}) => {
  await page.clock.install();
  await page.route("**/api/contact", (route) => new Promise<void>(() => {}));
  await page.goto("/");
  await page.getByLabel("Deporte", { exact: true }).selectOption("Carrera");
  await page.getByLabel("Tu objetivo", { exact: true }).fill("Mi carrera");
  await page
    .getByRole("button", { name: "Continuar al contacto", exact: true })
    .click();
  await page.getByLabel("Nombre", { exact: true }).fill("Atleta");
  await page
    .getByLabel("Correo o teléfono", { exact: true })
    .fill("atleta@example.com");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Enviando…", exact: true }),
  ).toBeDisabled();
  await page.clock.fastForward(16000);
  await expect(
    page.getByRole("button", { name: "Solicitar valoración", exact: true }),
  ).toBeEnabled();
  await expect(page.locator(".form-status")).toContainText(
    "No se ha podido confirmar",
  );
  await expect(page.getByLabel("Tu objetivo", { exact: true })).toHaveValue(
    "Mi carrera",
  );
  await expect(
    page.getByRole("link", { name: "Enviar mi consulta por WhatsApp" }),
  ).toBeVisible();
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

test("editorial identity, platform, Barcelona and authentic photography remain clear", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "TU OBJETIVO.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "EL ENTRENAMIENTOADECUADO.",
  );
  await page
    .getByRole("link", { name: "Descubrir el método", exact: true })
    .click();
  await expect(page).toHaveURL(/#metodo$/);
  const platform = page
    .locator("#como-funciona")
    .getByRole("link", { name: "Planificación en TrainingPeaks" });
  await expect(platform).toHaveAttribute(
    "href",
    "https://www.trainingpeaks.com/",
  );
  await expect(platform).toHaveAttribute("target", "_blank");
  await expect(platform).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator("#como-funciona")).toContainText(
    "reloj compatible",
  );
  await expect(page.locator("#barcelona")).toContainText(
    "dos centros de Barcelona",
  );
  await expect(
    page.locator(".testimonials, #sobre-mi, #sobre-nosotros"),
  ).toHaveCount(0);
  const images = page.locator(".atelier-hero-image img, #disciplinas img");
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

test("discipline enquiries preserve sport and campaign context without unrelated query data", async ({
  page,
}) => {
  await page.goto(
    "/?utm_source=instagram&utm_medium=social&email=private%40example.com#inicio",
  );
  const disciplines = page.locator("#disciplinas");
  const selector = disciplines.getByRole("group", {
    name: "Elige una disciplina",
  });
  const trail = selector.getByRole("button", {
    name: "Carrera por montaña",
    exact: true,
  });
  await trail.focus();
  await page.keyboard.press("Enter");
  await expect(trail).toBeFocused();
  await expect(trail).toHaveAttribute("aria-pressed", "true");
  await expect(disciplines.locator(".discipline-introduction")).toContainText(
    "desnivel, terreno",
  );
  await disciplines
    .getByRole("link", {
      name: "Consulta tu objetivo de carrera por montaña",
      exact: true,
    })
    .click();
  await expect(page.getByLabel("Deporte", { exact: true })).toHaveValue(
    "Carrera por montaña",
  );
  await expect(page.getByLabel("Qué te interesa", { exact: true })).toHaveValue(
    "coaching",
  );
  await expect(page.locator('input[name="source"]')).toHaveValue(
    /disciplinas.*utm_source=instagram.*utm_medium=social/,
  );
  await expect(page.locator('input[name="source"]')).not.toHaveValue(
    /private|email=/,
  );

  await selector
    .getByRole("button", { name: "Fuerza aplicada", exact: true })
    .click();
  await expect(disciplines.locator(".discipline-introduction")).toContainText(
    "atleta híbrido",
  );
  await expect(disciplines.locator(".discipline-criteria")).toContainText(
    "TrainingPeaks",
  );
  await disciplines
    .getByRole("link", { name: "Habla de tu preparación híbrida", exact: true })
    .click();
  await expect(page.getByLabel("Deporte", { exact: true })).toHaveValue(
    "Atleta híbrido",
  );
});

test("collective has its own enquiry context and does not replace individual coaching", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Consultar este plan: Rendimiento",
      exact: true,
    })
    .click();
  const collective = page.locator("#comunidad");
  await expect(collective).toContainText("presencialmente cada semana");
  await expect(collective).toContainText("ritmos y distancias según");
  await expect(collective).toContainText(
    "entrenamiento individual tiene su propio seguimiento",
  );
  await expect(collective.locator(".en-social-group")).toContainText(
    "GRUPO GRATUITO",
  );
  await collective
    .getByRole("link", { name: "Conoce la comunidad", exact: true })
    .click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.getByLabel("Qué te interesa", { exact: true })).toHaveValue(
    "collective",
  );
  await expect(page.locator('input[name="source"]')).toHaveValue(
    /^comunidad \| /,
  );
  await expect(page.locator('input[name="plan"]')).toHaveValue("");
  await expect(page.locator(".chosen-plan")).toHaveCount(0);
});
