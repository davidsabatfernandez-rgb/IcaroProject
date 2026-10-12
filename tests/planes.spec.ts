import { expect, test } from "@playwright/test";

test("plan comparison and communication FAQ explain the confirmed service", async ({
  page,
  request,
}) => {
  await page.goto("/planes");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  const canonical = "https://www.icaroproject.es/planes";
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    canonical,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    canonical,
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`<loc>${canonical}</loc>`);

  const comparison = page.getByRole("table", {
    name: "Comparación de Individual, Seguimiento y Rendimiento",
    exact: true,
  });
  await expect(comparison.locator("thead th")).toHaveText([
    "Características",
    "Individual",
    "Seguimiento",
    "Rendimiento",
  ]);
  await expect(comparison.locator("tbody tr")).toHaveCount(8);
  await expect(
    comparison.getByRole("row", { name: /^Resolución de dudas/ }).locator("td"),
  ).toHaveText(["19:00–20:00", "19:00–20:00", "Diaria, según disponibilidad"]);
  await expect(
    comparison.getByRole("row", { name: /^Llamada semanal/ }).locator("td"),
  ).toHaveText(["No incluida", "Incluida, coordinada contigo", "Incluida"]);
  await expect(
    comparison
      .getByRole("row", { name: /^Contacto directo prioritario/ })
      .locator("td"),
  ).toHaveText(["No", "No", "Sí"]);
  await expect(
    comparison.getByRole("row", { name: /^Prueba de lactato/ }),
  ).toContainText("cada 6 meses");
  await expect(page.locator("#planes")).not.toContainText(
    /llamada mensual|€|\beuros?\b/i,
  );

  const faq = page.locator(".plan-faq");
  const calls = faq
    .locator("details")
    .filter({ hasText: "¿Las llamadas están incluidas?" });
  await calls.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(calls).toHaveAttribute("open", "");
  await expect(calls).toContainText(
    "Los tres planes incluyen una llamada inicial",
  );
  await expect(calls).toContainText(
    "se agenda aparte de la franja de consultas escritas",
  );
  const hours = faq
    .locator("details")
    .filter({ hasText: "¿El plan Rendimiento ofrece atención las 24 horas?" });
  await hours.locator("summary").click();
  await expect(hours.locator("p")).toContainText(
    "según su disponibilidad real",
  );
  await expect(hours.locator("p")).toContainText(
    "no implica atención las 24 horas ni respuestas instantáneas",
  );
});

test("each plan transfers its discipline and support preference to the home enquiry", async ({
  page,
}) => {
  for (const [plan, support] of [
    ["Individual", "individual"],
    ["Seguimiento", "followup"],
    ["Rendimiento", "performance"],
  ]) {
    await page.goto(
      "/planes?utm_source=google&utm_campaign=triatlon_prueba&private=hidden",
    );
    await page
      .getByRole("button", { name: "Una disciplina", exact: true })
      .click();
    await page
      .getByLabel("¿Qué disciplina quieres preparar?", { exact: true })
      .selectOption("Ciclismo");
    await page
      .getByRole("link", { name: `Consultar este plan: ${plan}`, exact: true })
      .click();
    await expect(page).toHaveURL(/\/#contacto$|\/\?.*#contacto$/);
    await expect(
      page.getByLabel("Qué te interesa", { exact: true }),
    ).toHaveValue("coaching");
    await expect(page.getByLabel("Deporte", { exact: true })).toHaveValue(
      "Ciclismo",
    );
    await expect(page.locator('input[name="plan"]')).toHaveValue(plan);
    await expect(page.locator('select[name="support"]')).toHaveValue(support);
    await expect(page.locator('input[name="source"]')).toHaveValue(
      /^pagina-planes \| /,
    );
    await expect(page.locator(".chosen-plan")).toContainText(plan);
    expect(new URL(page.url()).searchParams.get("utm_source")).toBe("google");
    expect(new URL(page.url()).searchParams.get("utm_campaign")).toBe(
      "triatlon_prueba",
    );
    expect(new URL(page.url()).searchParams.has("private")).toBe(false);
  }
});

for (const width of [320, 768, 1440]) {
  test(`plans at ${width}: no page overflow and comparison remains accessible`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/planes");
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("link", {
        name: "Solicitar valoración inicial",
        exact: true,
      }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const comparison = page.getByRole("region", {
      name: "Comparación de planificación, comunicación, análisis y pruebas entre planes",
      exact: true,
    });
    await comparison.focus();
    await expect(comparison).toBeFocused();
    if (width === 320) {
      expect(
        await comparison.evaluate(
          (element) => element.scrollWidth > element.clientWidth,
        ),
      ).toBe(true);
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(() => comparison.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0);
    }
    expect(errors).toEqual([]);
  });
}
