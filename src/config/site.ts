/** Configuración pública. Nunca incluyas aquí credenciales. */
export const site = {
  brandName: "ICARO PROJECT",
  description:
    "Entrenamiento individualizado de running, ciclismo, natación y triatlón. Entender al atleta, entrenar con sentido y adaptar según su respuesta.",
  url: "", // URL pública definitiva, sin barra final. Activa canonical y sitemap.
  contact: { whatsapp: "", instagram: "", email: "", formEndpoint: "" },
  legal: { notice: "", privacy: "", cookies: "" },
  images: {
    hero: "",
    running: "",
    cycling: "",
    swimming: "",
    triathlon: "",
    lactate: "",
  },
  prices: {
    individual: { single: 69, triathlon: 89 },
    coaching: { single: 99, triathlon: 119 },
    performance: { single: 159, triathlon: 179 },
  },
  terms: { commitment: "", trainingPlatform: "" },
  testimonials: [] as { name: string; sport: string; quote: string }[],
};
export function whatsappUrl(
  message = "Hola, quiero contaros mi objetivo deportivo.",
) {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : "";
}
