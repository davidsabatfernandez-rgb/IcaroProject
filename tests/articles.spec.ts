import { test, expect } from "@playwright/test";
import { trainingArticles } from "../src/data/articles";

test("the complete guide directory is readable and linked without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/articulos");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  const links = page.locator(".article-card h3 a");
  await expect(links).toHaveCount(50);
  expect(
    (
      await links.evaluateAll((items) =>
        items.map((item) => item.getAttribute("href")),
      )
    ).sort(),
  ).toEqual(
    trainingArticles.map((article) => `/articulos/${article.slug}`).sort(),
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.icaroproject.es/articulos",
  );
  expect(await page.locator("html").getAttribute("lang")).toBe("es");
  await context.close();
});

test("all 50 article URLs serve unique canonical metadata and matching structured data", async ({
  request,
}) => {
  expect(trainingArticles).toHaveLength(50);
  expect(new Set(trainingArticles.map((article) => article.slug)).size).toBe(
    50,
  );
  for (let offset = 0; offset < trainingArticles.length; offset += 10) {
    await Promise.all(
      trainingArticles.slice(offset, offset + 10).map(async (article) => {
        const response = await request.get(`/articulos/${article.slug}`);
        expect(response.status(), article.slug).toBe(200);
        const html = await response.text();
        const canonical = `https://www.icaroproject.es/articulos/${article.slug}`;
        expect(html, article.slug).toContain(
          `<link rel="canonical" href="${canonical}"`,
        );
        const script = html.match(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
        );
        expect(script, article.slug).not.toBeNull();
        const graph = JSON.parse(script![1])["@graph"];
        const structuredArticle = graph.find(
          (item: { "@type": string }) => item["@type"] === "Article",
        );
        expect(structuredArticle.headline).toBe(article.title);
        expect(structuredArticle.description).toBe(article.description);
        expect(structuredArticle.datePublished).toBe(article.publishedAt);
        expect(structuredArticle.mainEntityOfPage["@id"]).toBe(canonical);
        expect(structuredArticle.inLanguage).toBe("es-ES");
        expect(structuredArticle.author).toEqual({
          "@type": "Organization",
          name: "ICARO PROJECT",
          url: "https://www.icaroproject.es",
        });
        const breadcrumb = graph.find(
          (item: { "@type": string }) => item["@type"] === "BreadcrumbList",
        );
        expect(breadcrumb.itemListElement.at(-1).item).toBe(canonical);
      }),
    );
  }
  const missing = await request.get("/articulos/guia-inexistente-123456");
  expect(missing.status()).toBe(404);
});

test("the sitemap includes every published guide exactly once", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  const articleUrls = urls.filter((url) =>
    url.startsWith("https://www.icaroproject.es/articulos/"),
  );
  expect(articleUrls).toHaveLength(50);
  expect(new Set(articleUrls).size).toBe(50);
  expect(articleUrls.sort()).toEqual(
    trainingArticles
      .map((article) => `https://www.icaroproject.es/articulos/${article.slug}`)
      .sort(),
  );
  expect(urls).toContain("https://www.icaroproject.es/articulos");
});

test("guide search handles accents, categories and an empty result with reset", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/articulos");
  const search = page.getByRole("searchbox", {
    name: "¿Qué quieres aprender?",
  });
  await search.fill("nAtAcIoN");
  await expect(page.locator(".article-card").first()).toBeVisible();
  const matchCount = await page.locator(".article-card").count();
  expect(matchCount).toBeGreaterThan(0);
  expect(matchCount).toBeLessThan(50);
  await search.fill("");
  await page
    .getByRole("button", { name: /^Entrenamiento personalizado/ })
    .click();
  const categoryCount = trainingArticles.filter(
    (article) => article.category === "Entrenamiento personalizado",
  ).length;
  await expect(page.locator(".article-card")).toHaveCount(categoryCount);
  await expect(page.getByRole("status")).toContainText(
    "Entrenamiento personalizado",
  );
  await search.fill("zzzzq0000");
  await expect(page.locator(".article-card")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "No hemos encontrado una guía con esa búsqueda.",
    }),
  ).toBeVisible();
  await page
    .locator(".article-empty")
    .getByRole("button", { name: "Ver todas las guías" })
    .click();
  await expect(search).toHaveValue("");
  await expect(page.locator(".article-card")).toHaveCount(50);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("an article provides navigable content, FAQ, relevant links and a contextual enquiry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  const article = trainingArticles.find(
    (item) => item.slug === "primer-triatlon-sprint",
  )!;
  await page.goto(`/articulos/${article.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    article.title,
  );
  await expect(page.locator(".article-body-section")).toHaveCount(
    article.sections.length,
  );
  for (const [index, section] of article.sections.entries()) {
    await expect(
      page.locator(`#apartado-${index + 1}`).getByRole("heading", { level: 2 }),
    ).toHaveText(section.heading);
  }
  const firstToc = page.locator(".article-toc ol a").first();
  await firstToc.click();
  await expect(page).toHaveURL(/#apartado-1$/);
  if (article.faq.length) {
    const question = page.locator(".article-faq summary").first();
    await question.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".article-faq details").first()).toHaveAttribute(
      "open",
      "",
    );
    await expect(page.locator(".article-faq details p").first()).toHaveText(
      article.faq[0].answer,
    );
  }
  const related = await page
    .locator(".article-related .article-card h3 a")
    .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  expect(related).toHaveLength(3);
  expect(new Set(related).size).toBe(3);
  for (const href of related) {
    expect(href).not.toBe(`/articulos/${article.slug}`);
    expect(
      trainingArticles.some((item) => `/articulos/${item.slug}` === href),
    ).toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Hablemos de tu preparación" }).click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.locator('input[name="source"]')).toHaveValue(
    new RegExp(`^articulo-${article.slug} \\| `),
  );
});
