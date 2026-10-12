import { expect, test } from "@playwright/test";

const firstProduct = "Camiseta Origen";
const storageKey = "icaro-demo-cart-v1";

test("the conceptual shop is clear, branded and never offers an empty checkout", async ({
  page,
}) => {
  await page.goto("/tienda");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "EL EQUIPO.",
  );
  await expect(
    page.getByRole("complementary", { name: "Estado de la tienda" }),
  ).toContainText("todavía no existen");
  await expect(page.locator(".ip-shop-product")).toHaveCount(6);
  await expect(
    page.getByRole("button", {
      name: "Continuar a la simulación",
      exact: true,
    }),
  ).toBeDisabled();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  const images = await page
    .locator(".ip-shop-art-logo img")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        src: (element as HTMLImageElement).getAttribute("src"),
        alt: element.getAttribute("alt"),
      })),
    );
  expect(images).toHaveLength(6);
  expect(
    images.every(
      (image) =>
        image.src === "/images/icaro-team-logo.png" && image.alt === "",
    ),
  ).toBe(true);
  await page.goto("/tienda/pago");
  await expect(
    page.getByRole("heading", { name: "El carrito está vacío." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Simular compra" }),
  ).toHaveCount(0);
});

test("sizes, quantities and totals persist after refresh and can be edited or removed", async ({
  page,
}) => {
  await page.goto("/tienda");
  await page
    .getByRole("combobox", { name: `Talla de ${firstProduct}`, exact: true })
    .selectOption("L");
  await page
    .getByRole("combobox", { name: `Cantidad de ${firstProduct}`, exact: true })
    .selectOption("2");
  await page
    .getByRole("button", {
      name: `Añadir al carrito: ${firstProduct}`,
      exact: true,
    })
    .click();
  await expect(page.locator(".ip-shop-product-status").first()).toContainText(
    "talla L: 2 unidades",
  );
  await expect(page.locator(".ip-shop-cart-summary strong")).toHaveText(
    /72,00/,
  );
  await page.reload();
  await expect(page.locator(".ip-shop-cart-lines")).toContainText("Talla L");
  const cartQuantity = page.getByRole("combobox", {
    name: `Cantidad en el carrito de ${firstProduct}, talla L`,
    exact: true,
  });
  await expect(cartQuantity).toHaveValue("2");
  await cartQuantity.selectOption("3");
  await expect(page.locator(".ip-shop-cart-summary strong")).toHaveText(
    /108,00/,
  );
  await page
    .getByRole("button", {
      name: `Quitar ${firstProduct}, talla L`,
      exact: true,
    })
    .click();
  await expect(page.locator(".ip-shop-empty")).toContainText(
    "Tu carrito está vacío.",
  );
  await expect(page.locator(".ip-shop-cart-summary strong")).toHaveText(/0,00/);
});

test("the checkout uses fixed fictitious card data and completes locally without a payment request", async ({
  page,
}) => {
  const outgoing: string[] = [];
  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method()))
      outgoing.push(request.url());
  });
  await page.goto("/tienda");
  await page
    .getByRole("button", {
      name: `Añadir al carrito: ${firstProduct}`,
      exact: true,
    })
    .click();
  await page
    .getByRole("link", { name: "Continuar a la simulación", exact: true })
    .click();
  await expect(page).toHaveURL(/\/tienda\/pago$/);
  await expect(
    page.getByLabel("Número de tarjeta ficticia", { exact: true }),
  ).toHaveValue("4242 4242 4242 4242");
  await expect(
    page.getByLabel("Número de tarjeta ficticia", { exact: true }),
  ).toHaveAttribute("readonly", "");
  await expect(
    page.getByLabel("Caducidad ficticia", { exact: true }),
  ).toHaveAttribute("readonly", "");
  await expect(
    page.getByLabel("Código ficticio", { exact: true }),
  ).toHaveAttribute("readonly", "");
  await expect(
    page.locator(
      'input[type="email"], input[name="address"], input[name="name"]',
    ),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Simular compra", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("checkbox", {
      name: "Entiendo que esta es una simulación y no una compra real.",
    })
    .check();
  await page
    .getByRole("button", { name: "Simular compra", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "SIMULACIÓN",
  );
  await expect(page.getByRole("status")).toHaveText(
    "No se ha cobrado ni creado un pedido real.",
  );
  expect(outgoing).toEqual([]);
  const stored = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    storageKey,
  );
  expect(stored).toEqual({ version: 1, lines: [] });
});

test("tampered browser storage cannot inject products, prices or unsafe quantities", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key }) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 1,
          lines: [
            {
              productId: "camiseta-origen-marfil",
              size: "M",
              quantity: 2,
              priceCents: 1,
            },
            { productId: "camiseta-origen-marfil", size: "M", quantity: 2 },
            { productId: "unknown", size: "M", quantity: 1 },
            { productId: "camiseta-origen-marfil", size: "XXL", quantity: 1 },
            { productId: "camiseta-origen-cobre", size: "S", quantity: 1e200 },
            { productId: "camiseta-ritmo-carbon", size: "S", quantity: -1 },
            { productId: "camiseta-horizonte", size: "S", quantity: 1.5 },
          ],
        }),
      );
    },
    { key: storageKey },
  );
  await page.goto("/tienda");
  await expect(page.locator(".ip-shop-cart-line")).toHaveCount(1);
  await expect(page.locator(".ip-shop-cart-summary strong")).toHaveText(
    /144,00/,
  );
  await expect(
    page.getByRole("combobox", {
      name: `Cantidad en el carrito de ${firstProduct}, talla M`,
      exact: true,
    }),
  ).toHaveValue("4");
  await page
    .getByRole("combobox", { name: `Cantidad de ${firstProduct}`, exact: true })
    .selectOption("5");
  await page
    .getByRole("button", {
      name: `Añadir al carrito: ${firstProduct}`,
      exact: true,
    })
    .click();
  await expect(page.locator(".ip-shop-cart-summary strong")).toHaveText(
    /180,00/,
  );
  const stored = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    storageKey,
  );
  expect(stored.lines).toEqual([
    { productId: "camiseta-origen-marfil", size: "M", quantity: 5 },
  ]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`shop and checkout fit a ${width}px viewport and support keyboard use`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/tienda");
    const button = page.getByRole("button", {
      name: `Añadir al carrito: ${firstProduct}`,
      exact: true,
    });
    await expect(button).toBeEnabled();
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".ip-shop-cart-line")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "Continuar a la simulación", exact: true })
      .click();
    await expect(
      page.getByLabel("Número de tarjeta ficticia", { exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
