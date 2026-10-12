/** Basic consent mode: no Google tag, queue or attribution before an opt-in. */
export type CommercialEventName =
  | "cta_click"
  | "form_start"
  | "form_step"
  | "form_submit"
  | "form_success"
  | "whatsapp_click"
  | "plan_select"
  | "lead_potential_fit"
  | "lead_qualified"
  | "customer_confirmed";

export type CommercialEventDetails = {
  source?: string;
  plan?: string;
  interest?: string;
  sport?: string;
  step?: number | string;
  /** Control flags from the real API response; never included in an event. */
  providerAccepted?: boolean;
  serverQualified?: boolean;
  qualification?: "potential_fit";
};

export type CommercialConfiguration = {
  measurementId?: string;
  adsId?: string;
  adsLeadLabel?: string;
};

export type CommercialConsent = {
  analytics: boolean;
  advertising: boolean;
};

export type CommercialAttribution = Partial<
  Record<"ref" | "utm_source" | "utm_medium" | "utm_campaign" | "gclid", string>
>;

export const COMMERCIAL_CONSENT_KEY = "icaro-measurement-consent-v1";
export const COMMERCIAL_ATTRIBUTION_KEY = "icaro-attribution-v1";
const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000;
const TAG_ID = "icaro-google-tag";
const knownEvents = new Set<CommercialEventName>([
  "cta_click",
  "form_start",
  "form_step",
  "form_submit",
  "form_success",
  "whatsapp_click",
  "plan_select",
  "lead_potential_fit",
  "lead_qualified",
  "customer_confirmed",
]);
const sources = new Set([
  "hero",
  "header",
  "header-mobile",
  "planes",
  "lactato",
  "barcelona",
  "contacto",
  "comunidad",
  "entrenador",
  "disciplinas",
  "articulos",
  "articulo",
  "ads-hero",
  "ads-nav",
  "ads-planes",
  "ads-plans",
  "ads-contacto",
  "ads-contact",
  "ads-plan-coaching",
  "ads-plan-performance",
  "ads-plan-individual",
  "ads-final",
  "ads-method",
  "landing-triatlon",
  "landing-method",
  "footer",
  "whatsapp",
  "whatsapp-bubble",
  "form",
  "landing",
  "ads",
  "cta-final",
]);
const planAliases: Record<string, string> = {
  individual: "individual",
  seguimiento: "seguimiento",
  coaching: "seguimiento",
  rendimiento: "rendimiento",
  performance: "rendimiento",
};
const sportAliases: Record<string, string> = {
  triatlon: "triatlon",
  carrera: "carrera",
  running: "carrera",
  "carrera por montana": "trail",
  trail: "trail",
  ciclismo: "ciclismo",
  natacion: "natacion",
  "atleta hibrido": "hibrido",
  hibrido: "hibrido",
};
const normalize = (value: unknown) =>
  typeof value === "string"
    ? value
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    : "";

export function validateCommercialConfiguration(
  input: CommercialConfiguration,
): CommercialConfiguration {
  const measurementId = /^G-[A-Z0-9]{6,20}$/.test(input.measurementId || "")
    ? input.measurementId
    : undefined;
  const adsId = /^AW-\d{6,15}$/.test(input.adsId || "")
    ? input.adsId
    : undefined;
  const adsLeadLabel =
    adsId && /^[A-Za-z0-9_-]{5,80}$/.test(input.adsLeadLabel || "")
      ? input.adsLeadLabel
      : undefined;
  return { measurementId, adsId, adsLeadLabel };
}

export function getCommercialConfiguration(): CommercialConfiguration {
  return validateCommercialConfiguration({
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    adsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  });
}

export function commercialMeasurementEnabled(
  configuration = getCommercialConfiguration(),
): boolean {
  const validated = validateCommercialConfiguration(configuration);
  return Boolean(validated.measurementId || validated.adsId);
}

export function parseCommercialConsent(
  value: string | null,
  now = Date.now(),
): CommercialConsent | null {
  try {
    if (!value) return null;
    const parsed = JSON.parse(value);
    if (
      parsed?.version !== 1 ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.advertising !== "boolean" ||
      typeof parsed.savedAt !== "number" ||
      parsed.savedAt > now ||
      now - parsed.savedAt > CONSENT_DURATION
    )
      return null;
    return { analytics: parsed.analytics, advertising: parsed.advertising };
  } catch {
    return null;
  }
}

export function readCommercialConsent(): CommercialConsent | null {
  if (typeof window === "undefined") return null;
  try {
    return parseCommercialConsent(
      window.localStorage.getItem(COMMERCIAL_CONSENT_KEY),
    );
  } catch {
    return null;
  }
}

/** Only fixed vocabulary reaches measurement, never free-text form values. */
export function sanitizeCommercialDetails(
  details: CommercialEventDetails | Record<string, unknown> = {},
): Record<string, string | number> {
  const output: Record<string, string | number> = {};
  const normalizedSource = normalize(details.source);
  const source = /^articulo-[a-z0-9-]{1,80}$/.test(normalizedSource)
    ? "articulo"
    : normalizedSource;
  if (sources.has(source)) output.source = source;
  const plan = normalize(details.plan);
  if (Object.hasOwn(planAliases, plan)) output.plan = planAliases[plan];
  if (["coaching", "collective", "tests"].includes(normalize(details.interest)))
    output.interest = normalize(details.interest);
  const sport = normalize(details.sport);
  if (Object.hasOwn(sportAliases, sport)) output.sport = sportAliases[sport];
  const step = Number(details.step);
  if ([1, 2].includes(step)) output.step = step;
  return output;
}

export function sanitizeCommercialAttribution(
  query: URLSearchParams,
  allowAdvertising: boolean,
): CommercialAttribution {
  const output: CommercialAttribution = {};
  for (const key of [
    "ref",
    "utm_source",
    "utm_medium",
    "utm_campaign",
  ] as const) {
    const value = query.get(key);
    if (
      value &&
      /^[A-Za-z][A-Za-z0-9_-]{0,39}$/.test(value) &&
      !/\d{6}/.test(value)
    )
      output[key] = value;
  }
  const gclid = query.get("gclid");
  if (allowAdvertising && gclid && /^[A-Za-z0-9_-]{8,160}$/.test(gclid))
    output.gclid = gclid;
  return output;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let activeConfiguration: CommercialConfiguration = {};
let activeConsent: CommercialConsent = { analytics: false, advertising: false };
let ownsTag = false;
const initializedIds = new Set<string>();

function captureAttribution() {
  if (typeof window === "undefined") return;
  const allowed =
    (activeConsent.analytics && activeConfiguration.measurementId) ||
    (activeConsent.advertising && activeConfiguration.adsId);
  if (!allowed) return;
  const attribution = sanitizeCommercialAttribution(
    new URLSearchParams(window.location.search),
    Boolean(activeConsent.advertising && activeConfiguration.adsId),
  );
  try {
    if (Object.keys(attribution).length)
      window.sessionStorage.setItem(
        COMMERCIAL_ATTRIBUTION_KEY,
        JSON.stringify(attribution),
      );
  } catch {
    // Consent is usable in memory if browser storage is unavailable.
  }
}

export function getCommercialAttribution(): CommercialAttribution {
  if (typeof window === "undefined") return {};
  if (!(activeConsent.analytics || activeConsent.advertising)) return {};
  try {
    const stored = JSON.parse(
      window.sessionStorage.getItem(COMMERCIAL_ATTRIBUTION_KEY) || "{}",
    );
    const query = new URLSearchParams();
    for (const key of [
      "ref",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "gclid",
    ])
      if (typeof stored[key] === "string") query.set(key, stored[key]);
    return sanitizeCommercialAttribution(
      query,
      Boolean(activeConsent.advertising && activeConfiguration.adsId),
    );
  } catch {
    return {};
  }
}

function safePageLocation(): string {
  // Do not expose query strings, hashes, complete referrers or arbitrary paths.
  const path = window.location.pathname;
  const route = [
    "/",
    "/entrenador-triatlon-online",
    "/articulos",
    "/privacidad",
  ].includes(path)
    ? path
    : path.startsWith("/articulos/")
      ? "/articulos"
      : "/";
  return `https://www.icaroproject.es${route}`;
}

function beginTag() {
  if (typeof window === "undefined") return;
  const analytics =
    activeConsent.analytics && activeConfiguration.measurementId;
  const advertising = activeConsent.advertising && activeConfiguration.adsId;
  const tag = analytics || advertising;
  if (!tag) return;
  // A separately installed tag is a configuration conflict: never duplicate it.
  if (
    !ownsTag &&
    (window.gtag ||
      document.querySelector('script[src*="googletagmanager.com/"]'))
  )
    return;
  if (!ownsTag) {
    window.dataLayer = [];
    window.gtag = function (..._args: unknown[]) {
      window.dataLayer?.push(arguments);
    };
    ownsTag = true;
    window.gtag("consent", "default", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: advertising ? "granted" : "denied",
      ad_user_data: advertising ? "granted" : "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("set", {
      page_location: safePageLocation(),
      page_referrer: "",
      page_title: "ICARO PROJECT",
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.id = TAG_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
    document.head.appendChild(script);
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: advertising ? "granted" : "denied",
      ad_user_data: advertising ? "granted" : "denied",
      ad_personalization: "denied",
    });
  }
  if (analytics && !initializedIds.has(analytics)) {
    window[`ga-disable-${analytics}`] = false;
    window.gtag?.("config", analytics, {
      send_page_view: false,
      page_location: safePageLocation(),
      page_referrer: "",
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const attribution = getCommercialAttribution();
    window.gtag?.("event", "page_view", {
      send_to: analytics,
      page_location: safePageLocation(),
      page_referrer: "",
      page_title: "ICARO PROJECT",
      ...(attribution.utm_source
        ? { campaign_source: attribution.utm_source }
        : {}),
      ...(attribution.utm_medium
        ? { campaign_medium: attribution.utm_medium }
        : {}),
      ...(attribution.utm_campaign
        ? { campaign_name: attribution.utm_campaign }
        : {}),
    });
    initializedIds.add(analytics);
  }
  if (advertising && !initializedIds.has(advertising)) {
    window.gtag?.("config", advertising, {
      send_page_view: false,
      page_location: safePageLocation(),
      page_referrer: "",
      allow_ad_personalization_signals: false,
    });
    initializedIds.add(advertising);
  }
}

export function initializeCommercialMeasurement(
  configuration = getCommercialConfiguration(),
) {
  activeConfiguration = validateCommercialConfiguration(configuration);
  activeConsent = readCommercialConsent() || {
    analytics: false,
    advertising: false,
  };
  if (!commercialMeasurementEnabled(activeConfiguration)) return;
  captureAttribution();
  beginTag();
}

/** The UI must reload on withdrawal to remove already executed third-party code. */
export function saveCommercialConsent(
  choice: CommercialConsent,
  configuration = getCommercialConfiguration(),
): { reloadRequired: boolean } {
  if (typeof window === "undefined") return { reloadRequired: false };
  activeConfiguration = validateCommercialConfiguration(configuration);
  if (!commercialMeasurementEnabled(activeConfiguration))
    return { reloadRequired: false };
  const previous = activeConsent;
  activeConsent = {
    analytics: Boolean(choice.analytics && activeConfiguration.measurementId),
    advertising: Boolean(choice.advertising && activeConfiguration.adsId),
  };
  try {
    window.localStorage.setItem(
      COMMERCIAL_CONSENT_KEY,
      JSON.stringify({
        version: 1,
        ...activeConsent,
        savedAt: Date.now(),
      }),
    );
  } catch {
    // Do not turn lack of storage into permission to track on the next visit.
  }
  const reloadRequired =
    ownsTag &&
    ((previous.analytics && !activeConsent.analytics) ||
      (previous.advertising && !activeConsent.advertising));
  if (reloadRequired) {
    if (activeConfiguration.measurementId)
      window[`ga-disable-${activeConfiguration.measurementId}`] = true;
    document.getElementById(TAG_ID)?.remove();
    delete window.gtag;
    delete window.dataLayer;
    ownsTag = false;
    initializedIds.clear();
  }
  try {
    if (!activeConsent.analytics && !activeConsent.advertising)
      window.sessionStorage.removeItem(COMMERCIAL_ATTRIBUTION_KEY);
    else if (!activeConsent.advertising) {
      const attribution = getCommercialAttribution();
      window.sessionStorage.setItem(
        COMMERCIAL_ATTRIBUTION_KEY,
        JSON.stringify(attribution),
      );
    }
  } catch {
    // Storage is optional; no tracking is enabled because an operation failed.
  }
  if (!reloadRequired) {
    captureAttribution();
    beginTag();
  }
  window.dispatchEvent(new Event("icaro-consent-change"));
  return { reloadRequired };
}

export function trackCommercialEvent(
  name: CommercialEventName,
  details: CommercialEventDetails = {},
): boolean {
  if (
    typeof window === "undefined" ||
    !knownEvents.has(name) ||
    !ownsTag ||
    !window.gtag
  )
    return false;
  // Actual customers require an authenticated commercial record/offline import.
  // A public browser event can never establish that a contract was confirmed.
  if (name === "customer_confirmed" || name === "lead_qualified") return false;
  if (name === "form_success" && details.providerAccepted !== true)
    return false;
  if (
    name === "lead_potential_fit" &&
    (details.serverQualified !== true ||
      details.qualification !== "potential_fit")
  )
    return false;
  const payload = sanitizeCommercialDetails(details);
  let measured = false;
  if (activeConsent.analytics && activeConfiguration.measurementId) {
    window.gtag("event", name, {
      ...payload,
      send_to: activeConfiguration.measurementId,
    });
    measured = true;
  }
  if (
    name === "form_success" &&
    activeConsent.advertising &&
    activeConfiguration.adsId &&
    activeConfiguration.adsLeadLabel
  ) {
    window.gtag("event", "conversion", {
      send_to: `${activeConfiguration.adsId}/${activeConfiguration.adsLeadLabel}`,
    });
    measured = true;
  }
  return measured;
}

export function openCommercialPreferences() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event("icaro-consent-preferences"));
}
