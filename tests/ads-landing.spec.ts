import { test, expect } from "@playwright/test";

for (const [width, height] of [
  [320, 740],
  [390, 844],
  [768, 1024],
  [1440, 1000],
] as const) {
  test(`triathlon landing at ${width}: clear first action and working local navigation`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/entrenador-triatlon-online");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "ENTRENADOR DE TRIATLÓN ONLINE.",
    );
    const firstAction = page
      .locator(".ads-hero")
      .getByRole("link", { name: "Solicitar valoración inicial", exact: true });
    await expect(firstAction).toBeVisible();
    const box = await firstAction.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    await expect(page.locator(".ads-header nav a")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .map((link) => link.getAttribute("href"))
            .filter(
              (href) =>
                href && href !== "#" && !document.getElementById(href.slice(1)),
            ),
        ),
    ).toEqual([]);
    await page
      .getByRole("navigation", { name: "Preparación de triatlón" })
      .getByRole("link", { name: "Método", exact: true })
      .click();
    await expect(page).toHaveURL(/#metodo$/);
    await expect(page.locator(".ads-method-steps li")).toHaveCount(6);
    await expect(page.locator(".ads-plan")).toHaveCount(2);
    await expect(page.locator(".ads-plan-featured")).toContainText(
      "Seguimiento",
    );
    expect(errors).toEqual([]);
  });
}

test("the landing records the chosen plan and campaign through both form stages without a false success", async ({
  page,
}) => {
  await page.goto(
    "/entrenador-triatlon-online?utm_source=google&utm_medium=cpc&utm_campaign=triatlon-search",
  );
  const form = page.locator("#valoracion form");
  await expect(form.locator('select[name="sport"]')).toHaveValue("Triatlón");
  await expect(form.locator('input[name="plan"]')).toHaveValue("Seguimiento");
  await expect(form.locator('input[name="source"]')).toHaveValue(
    /^landing-triatlon \| /,
  );
  await page
    .getByRole("link", {
      name: "Solicitar valoración de Rendimiento",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/#valoracion$/);
  await expect(form.locator('input[name="plan"]')).toHaveValue("Rendimiento");
  await expect(form.locator('input[name="source"]')).toHaveValue(
    /^ads-plan-performance \| /,
  );
  await expect(form.locator('input[name="source"]')).toHaveValue(
    /utm_source=google/,
  );
  await form
    .locator('input[name="goal"]')
    .fill("Preparar un triatlón olímpico con seguimiento de mi semana");
  await form.locator('select[name="weeklyHours"]').selectOption("6-8");
  await form
    .getByRole("button", { name: "Continuar al contacto", exact: true })
    .click();
  await form.locator('input[name="name"]').fill("Atleta de prueba");
  await form.locator('input[name="contact"]').fill("prueba@example.com");
  await form.locator('input[name="consent"]').check();
  let received: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    received = route.request().postDataJSON();
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message: "No se ha podido confirmar el envío.",
      }),
    });
  });
  await form
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(form.getByRole("status")).toContainText(
    "No se ha podido confirmar el envío.",
  );
  expect(received).toBeDefined();
  expect(received!.plan).toBe("Rendimiento");
  expect(received!.sport).toBe("Triatlón");
  expect(received!.weeklyHours).toBe("6-8");
  expect(received!.source).toEqual(
    expect.stringContaining("ads-plan-performance"),
  );
  expect(received!.source).toEqual(
    expect.stringContaining("utm_campaign=triatlon-search"),
  );
  await expect(form.locator('input[name="name"]')).toHaveValue(
    "Atleta de prueba",
  );
  await expect(
    form.getByRole("link", { name: /Enviar mi consulta por WhatsApp/ }),
  ).toHaveAttribute("href", /^https:\/\/wa\.me\/34619282582\?/);
});

test("landing metadata and service schema describe the actual service and appear in the sitemap", async ({
  page,
  request,
}) => {
  await page.goto("/entrenador-triatlon-online");
  const canonical = "https://www.icaroproject.es/entrenador-triatlon-online";
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    canonical,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    canonical,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  const service = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ||
      "{}",
  );
  expect(service["@type"]).toBe("Service");
  expect(service.provider).toEqual({
    "@type": "Organization",
    name: "ICARO PROJECT",
    url: "https://www.icaroproject.es",
  });
  expect(service.url).toBe(canonical);
  expect(service).not.toHaveProperty("aggregateRating");
  expect(service).not.toHaveProperty("offers");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`<loc>${canonical}</loc>`);
  await expect(page.locator(".ads-individual a")).toHaveAttribute(
    "href",
    "/#planes",
  );
  const question = page.locator(".ads-faq summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".ads-faq details").first()).toHaveAttribute(
    "open",
    "",
  );
});
