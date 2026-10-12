import { expect, test } from "@playwright/test";

test("sports profile and contact survive back navigation and an email error", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  const enquiries: Record<string, unknown>[] = [];
  let accepted = false;
  await page.route("**/api/contact", async (route) => {
    enquiries.push(route.request().postDataJSON());
    await route.fulfill({
      status: accepted ? 200 : 503,
      contentType: "application/json",
      body: JSON.stringify(
        accepted
          ? { success: true, leadStatus: "new", qualification: "potential_fit" }
          : {
              success: false,
              message:
                "El correo no está disponible; puedes consultar por WhatsApp.",
            },
      ),
    });
  });
  await page.goto("/?utm_source=google&utm_medium=search#inicio");
  await page
    .getByRole("link", {
      name: "Consultar este plan: Seguimiento",
      exact: true,
    })
    .click();
  const form = page.locator(".cq-form");
  await expect(form.getByLabel("Nombre", { exact: true })).not.toBeVisible();
  await form
    .getByLabel("Tu objetivo", { exact: true })
    .fill("Preparar mi primer medio Ironman");
  await form.locator('input[name="goalDate"]').fill("Primavera de 2027");
  await form.locator('select[name="experience"]').selectOption("competition");
  await form.locator('select[name="weeklyHours"]').selectOption("6-8");
  await form.locator('select[name="difficulty"]').selectOption("progress");
  await form.locator('select[name="budget"]').selectOption("options");
  await expect(form.locator('select[name="support"]')).toHaveValue("followup");
  await expect(form).toContainText("El presupuesto expresa tu preferencia");
  await form
    .getByRole("button", { name: "Continuar al contacto", exact: true })
    .click();
  await expect(
    form.getByRole("heading", {
      name: "Hablemos de tu objetivo.",
      exact: true,
    }),
  ).toBeFocused();
  await form.getByLabel("Nombre", { exact: true }).fill("Atleta de prueba");
  await form
    .getByLabel("Correo o teléfono", { exact: true })
    .fill("atleta@example.com");
  await form.getByRole("checkbox").check();
  await form
    .getByRole("button", { name: "Volver a tu preparación", exact: true })
    .click();
  await expect(form.locator('select[name="weeklyHours"]')).toHaveValue("6-8");
  await expect(form.locator('input[name="goalDate"]')).toHaveValue(
    "Primavera de 2027",
  );
  await expect(form.getByLabel("Tu objetivo", { exact: true })).toHaveValue(
    "Preparar mi primer medio Ironman",
  );
  await form
    .getByRole("button", { name: "Continuar al contacto", exact: true })
    .click();
  await expect(form.getByLabel("Nombre", { exact: true })).toHaveValue(
    "Atleta de prueba",
  );
  await form
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(form.getByRole("status")).toContainText(
    "correo no está disponible",
  );
  expect(enquiries).toHaveLength(1);
  expect(enquiries[0]).toMatchObject({
    name: "Atleta de prueba",
    sport: "Triatlón",
    plan: "Seguimiento",
    goalDate: "Primavera de 2027",
    experience: "competition",
    weeklyHours: "6-8",
    difficulty: "progress",
    support: "followup",
    budget: "options",
    consent: "on",
  });
  expect(enquiries[0].source).toMatch(
    /^planes.*utm_source=google.*utm_medium=search/,
  );
  const fallback = form.getByRole("link", {
    name: "Enviar mi consulta por WhatsApp",
  });
  const fallbackUrl = new URL((await fallback.getAttribute("href"))!);
  expect(fallbackUrl.searchParams.get("text")).toContain("De 6 a 8 horas");
  expect(fallbackUrl.searchParams.get("text")).toContain(
    "Prefiero conocer opciones",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  accepted = true;
  await form
    .getByRole("button", { name: "Solicitar valoración", exact: true })
    .click();
  await expect(form.getByRole("status")).toContainText(
    "pendiente de valoración",
  );
  await expect(form.getByLabel("Tu objetivo", { exact: true })).toBeEmpty();
  await expect(form.locator('select[name="weeklyHours"]')).toHaveValue("");
  await expect(form.locator('input[name="plan"]')).toHaveValue("");
  await expect(fallback).toHaveCount(0);
});

test("community and testing enquiries remain single-step without coaching qualification fields", async ({
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
  for (const interest of ["collective", "tests"]) {
    await page.goto(`/?consulta=${interest}&origen=comunidad#contacto`);
    const form = page.locator(".cq-form");
    await expect(form.locator(".cq-progress")).toHaveCount(0);
    await expect(form.getByLabel("Nombre", { exact: true })).toBeVisible();
    await expect(form.locator('select[name="weeklyHours"]')).toHaveCount(0);
    await form.getByLabel("Deporte", { exact: true }).selectOption("Carrera");
    await form
      .getByLabel("Tu objetivo", { exact: true })
      .fill(
        interest === "collective"
          ? "Conocer los entrenamientos presenciales"
          : "Consultar un test de lactato en pista",
      );
    await form.getByLabel("Nombre", { exact: true }).fill("Atleta");
    await form
      .getByLabel("Correo o teléfono", { exact: true })
      .fill("atleta@example.com");
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
    interest: "collective",
    weeklyHours: "",
    budget: "",
    support: "",
  });
  expect(enquiries[1]).toMatchObject({
    interest: "tests",
    weeklyHours: "",
    budget: "",
    support: "",
  });
});

test("advertising query context preselects the preparation without submitting a request", async ({
  page,
}) => {
  const submitted: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/api/contact")) submitted.push(request.url());
  });
  await page.goto(
    "/?consulta=coaching&origen=ads-hero&deporte=Triatl%C3%B3n&plan=Rendimiento&utm_source=google#contacto",
  );
  const form = page.locator(".cq-form");
  await expect(form.locator('select[name="sport"]')).toHaveValue("Triatlón");
  await expect(form.locator('select[name="support"]')).toHaveValue(
    "performance",
  );
  await expect(form.locator('input[name="plan"]')).toHaveValue("Rendimiento");
  await expect(form.locator('input[name="source"]')).toHaveValue(
    /^ads-hero.*utm_source=google/,
  );
  await expect(
    form.getByRole("button", { name: "Continuar al contacto", exact: true }),
  ).toBeVisible();
  expect(submitted).toEqual([]);
});
