/** Configuración pública. Nunca incluyas aquí credenciales. */
export const site = {
  brandName: "ICARO PROJECT",
  description:
    "Entrenamiento personalizado de triatlón, running y atleta híbrido: resistencia y fuerza en TrainingPeaks, feedback semanal y una comunidad con la que compartir el camino.",
  url: "", // URL pública definitiva, sin barra final. Activa canonical y sitemap.
  trainingPeaksUrl: "https://www.trainingpeaks.com/",
  community: { name: "Social ICARO", instagramGroupUrl: "" },
  contact: { whatsapp: "", instagram: "", email: "", formEndpoint: "" },
  legal: { notice: "", privacy: "", cookies: "" },
  images: {
    hero: "/images/running-track.jpg",
    running: "/images/running-coast.jpg",
    cycling: "/images/road-cycling.jpg",
    swimming: "/images/swimming-technique.webp",
    triathlon: "",
    lactate: "",
  },
  photographyCredits: [
    { name: "Steven Lelham", url: "https://unsplash.com/photos/atSaEOeE8Nk" },
    { name: "Fred Neethling", url: "https://unsplash.com/photos/T_KWo8LMyK4" },
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
  lactate: {
    standalone: 100,
    individual: 80,
    coaching: 65,
    performanceQuarterly: 50,
    performanceIncludedMonths: 6,
    travelNote: "Desplazamiento presupuestado antes de reservar.",
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
