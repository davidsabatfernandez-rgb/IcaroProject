export type ShopSize = "XS" | "S" | "M" | "L" | "XL" | "Única";
export type ShopProduct = {
  id: string;
  name: string;
  category: string;
  colorName: string;
  color: string;
  kind: "shirt" | "tank" | "hoodie" | "cap";
  priceCents: number;
  sizes: readonly ShopSize[];
  description: string;
  detail: string;
};
const apparelSizes: readonly ShopSize[] = ["XS", "S", "M", "L", "XL"];
export const shopProducts: readonly ShopProduct[] = [
  {
    id: "camiseta-origen-marfil",
    name: "Camiseta Origen",
    category: "Camiseta técnica",
    colorName: "Marfil",
    color: "#eee8de",
    kind: "shirt",
    priceCents: 3600,
    sizes: apparelSizes,
    description:
      "Líneas limpias, tono marfil y el emblema de ICARO en el pecho. Una propuesta para llevar el equipo contigo.",
    detail:
      "Diseño conceptual de manga corta. Tejido, corte y medidas pendientes de desarrollo.",
  },
  {
    id: "camiseta-origen-cobre",
    name: "Camiseta Origen Cobre",
    category: "Camiseta técnica",
    colorName: "Cobre",
    color: "#986446",
    kind: "shirt",
    priceCents: 3600,
    sizes: apparelSizes,
    description:
      "El color de nuestra identidad, una silueta sencilla y el emblema del equipo. Un diseño que se reconoce sin hacer ruido.",
    detail:
      "Diseño conceptual de manga corta. Tejido, corte y medidas pendientes de desarrollo.",
  },
  {
    id: "camiseta-ritmo-carbon",
    name: "Camiseta Ritmo",
    category: "Camiseta técnica",
    colorName: "Carbón",
    color: "#302b27",
    kind: "shirt",
    priceCents: 3800,
    sizes: apparelSizes,
    description:
      "Carbón y marfil, con una firma discreta en el pecho. Una propuesta de estética sobria para la colección ICARO.",
    detail:
      "Diseño conceptual de manga corta. Las características técnicas aún no están definidas.",
  },
  {
    id: "camiseta-horizonte",
    name: "Camiseta Horizonte",
    category: "Camiseta sin mangas",
    colorName: "Carbón",
    color: "#302b27",
    kind: "tank",
    priceCents: 3200,
    sizes: apparelSizes,
    description:
      "Hombros despejados, líneas de contraste y el emblema de ICARO. Una idea para quienes disfrutan de cada kilómetro.",
    detail: "Diseño conceptual sin mangas. Tejido y patronaje por confirmar.",
  },
  {
    id: "sudadera-colectivo",
    name: "Sudadera Colectivo",
    category: "Sudadera con capucha",
    colorName: "Arena",
    color: "#baa48c",
    kind: "hoodie",
    priceCents: 6800,
    sizes: apparelSizes,
    description:
      "El equipo también se lleva fuera de los entrenamientos. Una propuesta en arena con capucha y bolsillo frontal.",
    detail:
      "Diseño conceptual. Composición, gramaje y tallaje pendientes de desarrollo.",
  },
  {
    id: "gorra-equipo",
    name: "Gorra Equipo",
    category: "Accesorio",
    colorName: "Marfil",
    color: "#eee8de",
    kind: "cap",
    priceCents: 2400,
    sizes: ["Única"],
    description:
      "Una visera curva y el emblema del equipo al frente. El detalle sencillo que completa la colección.",
    detail:
      "Diseño conceptual. Ajuste, materiales y medidas pendientes de confirmar.",
  },
];
export const cartStorageKey = "icaro-demo-cart-v1";
export const maxItemQuantity = 5;
export type CartLine = { productId: string; size: ShopSize; quantity: number };
export function shopProduct(id: string) {
  return shopProducts.find((product) => product.id === id);
}
export function formatShopPrice(cents: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw || raw.length > 10000) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (
      !value ||
      typeof value !== "object" ||
      !("version" in value) ||
      value.version !== 1 ||
      !("lines" in value) ||
      !Array.isArray(value.lines)
    )
      return [];
    const lines: CartLine[] = [];
    for (const candidate of value.lines.slice(0, 30)) {
      if (!candidate || typeof candidate !== "object") continue;
      const { productId, size, quantity } = candidate;
      const product =
        typeof productId === "string" ? shopProduct(productId) : undefined;
      if (
        !product ||
        typeof size !== "string" ||
        !product.sizes.includes(size as ShopSize) ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1 ||
        quantity > maxItemQuantity
      )
        continue;
      const previous = lines.find(
        (line) => line.productId === productId && line.size === size,
      );
      if (previous)
        previous.quantity = Math.min(
          maxItemQuantity,
          previous.quantity + quantity,
        );
      else lines.push({ productId, size: size as ShopSize, quantity });
    }
    return lines;
  } catch {
    return [];
  }
}
