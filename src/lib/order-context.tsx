import { createContext, useContext, useState, ReactNode } from "react";

export type Flavor = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
};

export type Size = "Small" | "Medium" | "Large";
export const SIZE_PRICES: Record<Size, number> = { Small: 0, Medium: 1.5, Large: 3 };
export const TOPPINGS = [
  { id: "syrup", name: "Chocolate Syrup", price: 0.75 },
  { id: "nuts", name: "Nuts", price: 1.0 },
  { id: "caramel", name: "Caramel", price: 0.75 },
  { id: "sprinkles", name: "Sprinkles", price: 0.5 },
  { id: "oreo", name: "Oreo", price: 1.25 },
];

type OrderState = {
  flavor: Flavor | null;
  size: Size;
  toppings: string[];
  setFlavor: (f: Flavor) => void;
  setSize: (s: Size) => void;
  toggleTopping: (id: string) => void;
  total: () => number;
  reset: () => void;
};

const Ctx = createContext<OrderState | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [flavor, setFlavor] = useState<Flavor | null>(null);
  const [size, setSize] = useState<Size>("Medium");
  const [toppings, setToppings] = useState<string[]>([]);

  const toggleTopping = (id: string) =>
    setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const total = () => {
    const base = flavor?.price ?? 0;
    const sizeP = SIZE_PRICES[size];
    const topP = toppings.reduce(
      (s, id) => s + (TOPPINGS.find((t) => t.id === id)?.price ?? 0),
      0,
    );
    return base + sizeP + topP;
  };

  const reset = () => {
    setFlavor(null);
    setSize("Medium");
    setToppings([]);
  };

  return (
    <Ctx.Provider value={{ flavor, size, toppings, setFlavor, setSize, toggleTopping, total, reset }}>
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
  { id: "chocolate", name: "Chocolate", price: 4.5, image: chocolate, color: "oklch(0.55 0.08 50)" },
  { id: "vanilla", name: "Vanilla", price: 4.0, image: vanilla, color: "oklch(0.95 0.03 80)" },
  { id: "strawberry", name: "Strawberry", price: 4.5, image: strawberry, color: "oklch(0.85 0.1 5)" },
  { id: "mango", name: "Mango", price: 5.0, image: mango, color: "oklch(0.85 0.15 75)" },
];
