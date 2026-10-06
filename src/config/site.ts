/** Configuración pública. Nunca incluyas aquí credenciales. */
export const site = {
  brandName: "ICARO PROJECT",
  description:
    "Entrenamiento de triatlón individualizado, planificación semanal en TrainingPeaks y seguimiento de tu entrenador. También running, ciclismo y natación.",
  url: "", // URL pública definitiva, sin barra final. Activa canonical y sitemap.
  contact: { whatsapp: "", instagram: "", email: "", formEndpoint: "" },
  legal: { notice: "", privacy: "", cookies: "" },
  images: {
    hero: "/images/triathlon-race.jpg",
    running: "/images/running-race.jpg",
    cycling: "/images/road-cycling.jpg",
    swimming: "/images/swimming-technique.webp",
    triathlon: "",
    lactate: "",
  },
  photographyCredits: [
    { name: "Quino Al", url: "https://unsplash.com/@quinoal" },
    { name: "Marcus Ng", url: "https://unsplash.com/photos/ZbbhkQ0M2AM" },
    {
      name: "Pixabay",
      url: "https://www.pexels.com/photo/person-riding-road-bike-on-the-road-38296/",
    },
  ],
  prices: {
    individual: { single: 69, triathlon: 89 },
    coaching: { single: 99, triathlon: 119 },
    performance: { single: 159, triathlon: 179 },
  },
  terms: {
    commitment: "",
    trainingPlatform:
      "Trabajamos con TrainingPeaks. Desde la app puedes consultar tu planificación y conectar un dispositivo compatible para recibir los entrenamientos estructurados admitidos por su fabricante. Te acompañamos en la configuración inicial.",
  },
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
