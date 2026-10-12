"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartStorageKey,
  maxItemQuantity,
  parseStoredCart,
  shopProduct,
  type CartLine,
  type ShopSize,
} from "@/data/shop";

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  totalCents: number;
  add: (productId: string, size: ShopSize, quantity: number) => void;
  changeQuantity: (productId: string, size: ShopSize, quantity: number) => void;
  remove: (productId: string, size: ShopSize) => void;
  clear: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setLines(parseStoredCart(localStorage.getItem(cartStorageKey)));
    } catch {
      /* Shopping still works when browser storage is unavailable. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        cartStorageKey,
        JSON.stringify({ version: 1, lines }),
      );
    } catch {
      /* Persistence is optional. */
    }
  }, [lines, ready]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === cartStorageKey || event.key === null)
        setLines(parseStoredCart(event.key === null ? null : event.newValue));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      ready,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      totalCents: lines.reduce(
        (sum, line) =>
          sum + (shopProduct(line.productId)?.priceCents ?? 0) * line.quantity,
        0,
      ),
      add(productId, size, quantity) {
        const product = shopProduct(productId);
        if (
          !ready ||
          !product?.sizes.includes(size) ||
          !Number.isSafeInteger(quantity) ||
          quantity < 1 ||
          quantity > maxItemQuantity
        )
          return;
        setLines((previous) => {
          const found = previous.find(
            (line) => line.productId === productId && line.size === size,
          );
          if (found)
            return previous.map((line) =>
              line === found
                ? {
                    ...line,
                    quantity: Math.min(
                      maxItemQuantity,
                      line.quantity + quantity,
                    ),
                  }
                : line,
            );
          return [...previous, { productId, size, quantity }];
        });
      },
      changeQuantity(productId, size, quantity) {
        if (
          !Number.isSafeInteger(quantity) ||
          quantity < 1 ||
          quantity > maxItemQuantity
        )
          return;
        setLines((previous) =>
          previous.map((line) =>
            line.productId === productId && line.size === size
              ? { ...line, quantity }
              : line,
          ),
        );
      },
      remove(productId, size) {
        setLines((previous) =>
          previous.filter(
            (line) => !(line.productId === productId && line.size === size),
          ),
        );
      },
      clear() {
        setLines([]);
      },
    }),
    [lines, ready],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useShopCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("ShopCartProvider is required.");
  return context;
}
