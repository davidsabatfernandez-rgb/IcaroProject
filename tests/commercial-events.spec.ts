import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import * as measurement from "../src/lib/commercial-events";

const configuration = {
  measurementId: "G-TEST123456",
  adsId: "AW-123456789",
  adsLeadLabel: "test_lead_label",
};
type MeasurementTestWindow = Window & {
  __icaroMeasurement: typeof measurement;
  __tagLoads?: number;
};
const browserModule = ts.transpileModule(
  readFileSync(resolve("src/lib/commercial-events.ts"), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

async function prepare(page: Page) {
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "window.__tagLoads = (window.__tagLoads || 0) + 1;",
    }),
  );
  await page.goto(
    "/?utm_source=google&utm_medium=cpc&utm_campaign=triatlon_online&gclid=test_CLICK_123456&goal=private-goal&email=private%40example.com#contacto",
  );
  await page.evaluate((code) => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    const exports = {};
    new Function("exports", "process", code)(exports, { env: {} });
    (window as unknown as MeasurementTestWindow).__icaroMeasurement =
      exports as typeof measurement;
  }, browserModule);
}

test("measurement configuration is off with empty or invalid identifiers", () => {
  expect(measurement.commercialMeasurementEnabled({})).toBe(false);
  expect(
    measurement.validateCommercialConfiguration({
      measurementId: "https://malicious.example/ga.js",
      adsId: "GTM-123456",
      adsLeadLabel: "Label/with/injection",
    }),
  ).toEqual({
    measurementId: undefined,
    adsId: undefined,
    adsLeadLabel: undefined,
  });
  expect(measurement.validateCommercialConfiguration(configuration)).toEqual(
    configuration,
  );
});

test("consent rejects invalid, expired, future and permissive non-boolean storage", () => {
  const now = Date.now();
  for (const value of [
    null,
    "{",
    "{}",
    JSON.stringify({
      version: 1,
      analytics: "yes",
      advertising: true,
      savedAt: now,
    }),
    JSON.stringify({
      version: 1,
      analytics: true,
      advertising: true,
      savedAt: now + 1000,
    }),
    JSON.stringify({
      version: 1,
      analytics: true,
      advertising: true,
      savedAt: now - 181 * 86400000,
    }),
  ])
    expect(measurement.parseCommercialConsent(value, now)).toBeNull();
  expect(
    measurement.parseCommercialConsent(
      JSON.stringify({
        version: 1,
        analytics: false,
        advertising: false,
        savedAt: now,
      }),
      now,
    ),
  ).toEqual({ analytics: false, advertising: false });
});

test("event payloads accept fixed vocabulary and strip PII, budget, URL and control flags", () => {
  const safe = measurement.sanitizeCommercialDetails({
    source: "ads-hero",
    plan: "Coaching",
    interest: "coaching",
    sport: "Triatlón",
    step: "2",
    contact: "private@example.com",
    name: "Private athlete",
    goal: "Private goal",
    budget: "private budget",
    url: "https://example.com/?email=private@example.com",
    providerAccepted: true,
    serverQualified: true,
    qualification: "potential_fit",
  });
  expect(safe).toEqual({
    source: "ads-hero",
    plan: "seguimiento",
    interest: "coaching",
    sport: "triatlon",
    step: 2,
  });
  expect(
    measurement.sanitizeCommercialDetails({
      source: "private@example.com",
      plan: "Private name",
      sport: "+34619282582",
      step: 99,
    }),
  ).toEqual({});
  expect(
    measurement.sanitizeCommercialDetails({
      source: "toString",
      plan: "__proto__",
      sport: "constructor",
    }),
  ).toEqual({});
  expect(
    measurement.sanitizeCommercialDetails({
      source: "ads-plan-performance",
      plan: "Rendimiento",
    }),
  ).toEqual({ source: "ads-plan-performance", plan: "rendimiento" });
  expect(
    measurement.sanitizeCommercialDetails({
      source: "articulo-primer-triatlon-sprint",
    }),
  ).toEqual({ source: "articulo" });
});

test("campaign attribution uses bounded permitted values and separates advertising consent", () => {
  const query = new URLSearchParams(
    "utm_source=google&utm_medium=cpc&utm_campaign=triatlon_online&gclid=test_CLICK_123456&name=Private&email=private%40example.com&goal=PrivateGoal",
  );
  expect(measurement.sanitizeCommercialAttribution(query, false)).toEqual({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "triatlon_online",
  });
  expect(measurement.sanitizeCommercialAttribution(query, true).gclid).toBe(
    "test_CLICK_123456",
  );
  expect(
    measurement.sanitizeCommercialAttribution(
      new URLSearchParams(
        "utm_source=private%40example.com&utm_medium=%2B34619282582&utm_campaign=https%3A%2F%2Fexample.com&gclid=private%40example.com",
      ),
      true,
    ),
  ).toEqual({});
});

test("before choice and after rejection there is no external tag, event queue or attribution", async ({
  page,
}) => {
  await prepare(page);
  const initial = await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    api.initializeCommercialMeasurement(config);
    return {
      tracked: api.trackCommercialEvent("cta_click", { source: "hero" }),
      tag: Boolean(document.getElementById("icaro-google-tag")),
      queue: Boolean(window.dataLayer),
      attribution: window.sessionStorage.getItem(
        api.COMMERCIAL_ATTRIBUTION_KEY,
      ),
    };
  }, configuration);
  expect(initial).toEqual({
    tracked: false,
    tag: false,
    queue: false,
    attribution: null,
  });
  const rejected = await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    api.saveCommercialConsent({ analytics: false, advertising: false }, config);
    api.initializeCommercialMeasurement(config);
    return {
      consent: api.readCommercialConsent(),
      tracked: api.trackCommercialEvent("whatsapp_click", {
        source: "whatsapp",
      }),
      tag: Boolean(document.getElementById("icaro-google-tag")),
      queue: Boolean(window.dataLayer),
      attribution: window.sessionStorage.getItem(
        api.COMMERCIAL_ATTRIBUTION_KEY,
      ),
    };
  }, configuration);
  expect(rejected).toEqual({
    consent: { analytics: false, advertising: false },
    tracked: false,
    tag: false,
    queue: false,
    attribution: null,
  });
});

test("analytics opt-in loads one tag, excludes advertising identifiers and never sends PII", async ({
  page,
}) => {
  await prepare(page);
  await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    api.initializeCommercialMeasurement(config);
    api.saveCommercialConsent({ analytics: true, advertising: false }, config);
    api.initializeCommercialMeasurement(config);
  }, configuration);
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as MeasurementTestWindow).__tagLoads || 0,
      ),
    )
    .toBe(1);
  const result = await page.evaluate(() => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    const details = {
      source: "planes",
      plan: "Rendimiento",
      sport: "Triatlón",
      contact: "private@example.com",
      goal: "PrivateGoal",
      budget: "private budget",
    };
    api.trackCommercialEvent("plan_select", details);
    return {
      attribution: api.getCommercialAttribution(),
      queue: JSON.stringify(window.dataLayer),
      count: document.querySelectorAll("#icaro-google-tag").length,
    };
  });
  expect(result.count).toBe(1);
  expect(result.attribution).toEqual({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "triatlon_online",
  });
  expect(result.queue).toContain("plan_select");
  expect(result.queue).toContain("rendimiento");
  for (const privateValue of [
    "private@example.com",
    "private-goal",
    "PrivateGoal",
    "private budget",
    "gclid",
    "test_CLICK_123456",
    "#contacto",
    "?utm_source=",
  ])
    expect(result.queue).not.toContain(privateValue);
  expect(result.queue).not.toContain('"conversion"');
});

test("Ads conversions require advertising opt-in, configured label and actual provider acceptance", async ({
  page,
}) => {
  await prepare(page);
  const result = await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    api.initializeCommercialMeasurement(config);
    api.saveCommercialConsent({ analytics: false, advertising: true }, config);
    const noAcceptance = api.trackCommercialEvent("form_success", {
      source: "contacto",
      interest: "coaching",
    });
    const click = api.trackCommercialEvent("whatsapp_click", {
      source: "whatsapp",
    });
    const customer = api.trackCommercialEvent("customer_confirmed", {
      source: "contacto",
    });
    const qualified = api.trackCommercialEvent("lead_qualified", {
      source: "contacto",
      serverQualified: true,
      qualification: "potential_fit",
    });
    const before = JSON.stringify(window.dataLayer);
    const socialResults = [
      "social_run",
      "social_ride",
      "collective",
      "tests",
    ].map((interest) =>
      api.trackCommercialEvent("form_success", {
        interest,
        source: "social-form",
        providerAccepted: true,
      }),
    );
    const socialQueue = JSON.stringify(window.dataLayer);
    const accepted = api.trackCommercialEvent("form_success", {
      source: "contacto",
      interest: "coaching",
      plan: "Seguimiento",
      providerAccepted: true,
    });
    return {
      noAcceptance,
      socialResults,
      socialQueue,
      click,
      customer,
      qualified,
      before,
      accepted,
      queue: JSON.stringify(window.dataLayer),
      attribution: api.getCommercialAttribution(),
    };
  }, configuration);
  expect(result.noAcceptance).toBe(false);
  expect(result.click).toBe(false);
  expect(result.customer).toBe(false);
  expect(result.qualified).toBe(false);
  expect(result.before).not.toContain('"conversion"');
  expect(result.socialResults).toEqual([false, false, false, false]);
  expect(result.socialQueue).not.toContain('"conversion"');
  expect(result.accepted).toBe(true);
  expect(result.queue).toContain(`AW-123456789/test_lead_label`);
  expect(result.queue.match(/"conversion"/g)).toHaveLength(1);
  expect(result.queue).not.toContain("purchase");
  expect(result.attribution.gclid).toBe("test_CLICK_123456");
});

test("potential-fit events require a server indication and withdrawal clears attribution and stops events", async ({
  page,
}) => {
  await prepare(page);
  const result = await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    api.initializeCommercialMeasurement(config);
    api.saveCommercialConsent({ analytics: true, advertising: true }, config);
    const invented = api.trackCommercialEvent("lead_potential_fit", {
      source: "contacto",
    });
    const potential = api.trackCommercialEvent("lead_potential_fit", {
      source: "contacto",
      serverQualified: true,
      qualification: "potential_fit",
    });
    const queue = JSON.stringify(window.dataLayer);
    const revoked = api.saveCommercialConsent(
      { analytics: false, advertising: false },
      config,
    );
    const after = api.trackCommercialEvent("form_success", {
      providerAccepted: true,
    });
    return {
      invented,
      potential,
      queue,
      reloadRequired: revoked.reloadRequired,
      after,
      attribution: api.getCommercialAttribution(),
      stored: window.sessionStorage.getItem(api.COMMERCIAL_ATTRIBUTION_KEY),
      tag: Boolean(document.getElementById("icaro-google-tag")),
      dataLayer: Boolean(window.dataLayer),
    };
  }, configuration);
  expect(result.invented).toBe(false);
  expect(result.potential).toBe(true);
  expect(result.queue).toContain("lead_potential_fit");
  expect(result.queue).not.toContain("serverQualified");
  expect(result.reloadRequired).toBe(true);
  expect(result.after).toBe(false);
  expect(result.attribution).toEqual({});
  expect(result.stored).toBeNull();
  expect(result.tag).toBe(false);
  expect(result.dataLayer).toBe(false);
});

test("a Google tag installed separately is never duplicated or adopted", async ({
  page,
}) => {
  await prepare(page);
  const result = await page.evaluate((config) => {
    const api = (window as unknown as MeasurementTestWindow).__icaroMeasurement;
    window.gtag = () => {};
    api.initializeCommercialMeasurement(config);
    api.saveCommercialConsent({ analytics: true, advertising: true }, config);
    return {
      tag: Boolean(document.getElementById("icaro-google-tag")),
      tracked: api.trackCommercialEvent("cta_click", { source: "hero" }),
    };
  }, configuration);
  expect(result).toEqual({ tag: false, tracked: false });
});
