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
    for (const id of [
      "metodo",
      "perfil",
      "planes",
      "lactato",
      "faq",
      "contacto",
    ])
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
test("prices switch and selecting plan carries interest to form", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".price strong")).toHaveText([
    "89 €",
    "119 €",
    "179 €",
  ]);
  await page
    .getByRole("button", { name: "Una disciplina", exact: true })
    .click();
  await expect(page.locator(".price strong")).toHaveText([
    "69 €",
    "99 €",
    "159 €",
  ]);
  await page.getByRole("button", { name: "Triatlón", exact: true }).click();
  await expect(page.locator(".price strong")).toHaveText([
    "89 €",
    "119 €",
    "179 €",
  ]);
  await page.getByRole("link", { name: "Elegir Coaching" }).click();
  await expect(page.locator(".chosen-plan")).toContainText("Coaching");
  await expect(page.locator('input[name="plan"]')).toHaveValue("Coaching");
  await page.getByRole("button", { name: "Cambiar", exact: true }).click();
  await expect(page.locator(".chosen-plan")).toHaveCount(0);
});
test("curve changes stage and explains thresholds", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Después de un bloque" }).click();
  await expect(page.locator(".evolution-curve")).toHaveClass(/active/);
  await expect(page.locator(".chart-caption")).toContainText(
    "Sin datos reales",
  );
  await page.getByRole("button", { name: /Segundo umbral/ }).click();
  await expect(page.locator(".threshold-description")).toContainText(
    "El segundo umbral",
  );
  await page.getByRole("button", { name: /Tus zonas/ }).click();
  await expect(page.locator(".threshold-description")).toContainText(
    "no a una tabla",
  );
});
test("FAQ expands and contact cannot falsely claim submission", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("summary")
    .filter({ hasText: "¿Los tests de lactato son obligatorios?" })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "No. Son opcionales",
  );
  await page.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(page.locator(".form-status")).toBeEmpty();
  await page.getByLabel("Nombre", { exact: true }).fill("Atleta de prueba");
  await page
    .getByLabel("Email o teléfono", { exact: true })
    .fill("atleta@example.com");
  await page.getByLabel("Deporte", { exact: true }).selectOption("Running");
  await page
    .getByLabel("Tu objetivo", { exact: true })
    .fill("Preparar una media maratón");
  await page.getByRole("button", { name: "Preparar mi consulta" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No se ha enviado ni guardado",
  );
  await expect(page.locator(".message-preview textarea")).toHaveValue(
    /Preparar una media maratón/,
  );
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
    "Triatlón.",
  );
  await expect(page.locator(".hero-price")).toContainText("89 € / mes");
  await expect(page.locator("#como-funciona")).toContainText("TrainingPeaks");
  await expect(page.locator("#como-funciona")).toContainText(
    "reloj compatible",
  );
  await expect(page.locator("#barcelona")).toContainText("Dos centros");
  await expect(page.locator("#barcelona")).toContainText("Barcelona");
  await page
    .getByRole("link", { name: "Ver planes y precios", exact: true })
    .click();
  await expect(page).toHaveURL(/#planes$/);
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
