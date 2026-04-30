import { createContext, useContext, useState, ReactNode } from "react";

export type Flavor = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
};

export type Size = "Small" | "Medium" | "Large";
export const SIZE_PRICES: Record<Size, number> = { Small: 8, Medium: 12, Large: 16 };
export const TOPPING_PRICE = 2;
export const TOPPINGS = [
  { id: "syrup", name: "Chocolate Syrup", price: TOPPING_PRICE },
  { id: "nuts", name: "Nuts", price: TOPPING_PRICE },
  { id: "caramel", name: "Caramel", price: TOPPING_PRICE },
  { id: "sprinkles", name: "Sprinkles", price: TOPPING_PRICE },
  { id: "oreo", name: "Oreo", price: TOPPING_PRICE },
];

export const DELIVERY_MINUTES = 20;
export const CURRENCY = "SAR";

export type CartItem = {
  id: string;
  flavorId: string;
  size: Size;
  toppings: string[];
  quantity: number;
};

// Builder state for the active in-progress order
type Builder = {
  flavorId: string | null;
  size: Size;
  toppings: string[];
};

type OrderState = {
  // Builder (used by menu/size/toppings flow)
  builder: Builder;
  flavor: Flavor | null;
  size: Size;
  toppings: string[];
  setFlavor: (f: Flavor) => void;
  setSize: (s: Size) => void;
  toggleTopping: (id: string) => void;
  resetBuilder: () => void;

  // Cart
  cart: CartItem[];
  addBuilderToCart: () => void;
  updateItem: (id: string, patch: Partial<Omit<CartItem, "id">>) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  cartTotal: () => number;
  itemPrice: (item: CartItem) => number;

  // Backwards compat (single-item review flow)
  total: () => number;
  reset: () => void;
};

const Ctx = createContext<OrderState | null>(null);

const initialBuilder: Builder = { flavorId: null, size: "Medium", toppings: [] };

export function OrderProvider({ children }: { children: ReactNode }) {
  const [builder, setBuilder] = useState<Builder>(initialBuilder);
  const [cart, setCart] = useState<CartItem[]>([]);

  const flavor = builder.flavorId ? FLAVORS.find((f) => f.id === builder.flavorId) ?? null : null;

  const setFlavor = (f: Flavor) => setBuilder((b) => ({ ...b, flavorId: f.id }));
  const setSize = (s: Size) => setBuilder((b) => ({ ...b, size: s }));
  const toggleTopping = (id: string) =>
    setBuilder((b) => ({
      ...b,
      toppings: b.toppings.includes(id) ? b.toppings.filter((x) => x !== id) : [...b.toppings, id],
    }));
  const resetBuilder = () => setBuilder(initialBuilder);

  const itemPrice = (item: CartItem) => {
    const f = FLAVORS.find((x) => x.id === item.flavorId);
    const base = f?.price ?? 0;
    const sizeP = SIZE_PRICES[item.size];
    const topP = item.toppings.length * TOPPING_PRICE;
    return (base + sizeP + topP) * item.quantity;
  };

  const addBuilderToCart = () => {
    if (!builder.flavorId) return;
    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      flavorId: builder.flavorId,
      size: builder.size,
      toppings: builder.toppings,
      quantity: 1,
    };
    setCart((c) => [...c, newItem]);
    resetBuilder();
  };

  const updateItem: OrderState["updateItem"] = (id, patch) =>
    setCart((c) => c.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) => setCart((c) => c.filter((it) => it.id !== id));

  const changeQty = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it))
        .filter((it) => it.quantity > 0),
    );

  const cartTotal = () => cart.reduce((s, it) => s + itemPrice(it), 0);

  // Builder total (used in review for the in-progress build)
  const total = () => {
    const base = flavor?.price ?? 0;
    return base + SIZE_PRICES[builder.size] + builder.toppings.length * TOPPING_PRICE;
  };

  const reset = () => {
    resetBuilder();
    setCart([]);
  };

  return (
    <Ctx.Provider
      value={{
        builder,
        flavor,
        size: builder.size,
        toppings: builder.toppings,
        setFlavor,
        setSize,
        toggleTopping,
        resetBuilder,
        cart,
        addBuilderToCart,
        updateItem,
        removeItem,
        changeQty,
        cartTotal,
        itemPrice,
        total,
        reset,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useOrder = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOrder must be inside OrderProvider");
  return c;
};

import chocolate from "@/assets/flavor-chocolate.jpg";
import vanilla from "@/assets/flavor-vanilla.jpg";
import strawberry from "@/assets/flavor-strawberry.jpg";
import mango from "@/assets/flavor-mango.jpg";

export const FLAVORS: Flavor[] = [
  { id: "chocolate", name: "Chocolate", price: 0, image: chocolate, color: "oklch(0.55 0.08 50)" },
  { id: "vanilla", name: "Vanilla", price: 0, image: vanilla, color: "oklch(0.95 0.03 80)" },
  { id: "strawberry", name: "Strawberry", price: 0, image: strawberry, color: "oklch(0.85 0.1 5)" },
  { id: "mango", name: "Mango", price: 0, image: mango, color: "oklch(0.85 0.15 75)" },
];

export const getFlavor = (id: string) => FLAVORS.find((f) => f.id === id);
