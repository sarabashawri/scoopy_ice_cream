import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useOrder, TOPPINGS, SIZE_PRICES } from "@/lib/order-context";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — Scoopy" }],
  }),
  component: Cart,
});

function Cart() {
  const { flavor, size, toppings, total } = useOrder();

  if (!flavor) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-soft text-primary mb-6">
          <ShoppingBag className="h-9 w-9" />
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-black">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Pick a flavor and start building your perfect cone.</p>
        <Link to="/menu" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]">
          Browse Menu <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-5xl font-black mb-8">Your Cart</h1>
      <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-5">
          <img src={flavor.image} alt={flavor.name} width={120} height={120} className="h-28 w-28 rounded-2xl object-cover" />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold">{flavor.name}</h2>
            <p className="text-sm text-muted-foreground">{size} · {toppings.length} toppings</p>
            <p className="mt-1 font-semibold text-primary">
              ${(flavor.price + SIZE_PRICES[size] + toppings.reduce((s, id) => s + (TOPPINGS.find((t) => t.id === id)?.price ?? 0), 0)).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
          <span className="font-display text-xl font-bold">Total</span>
          <span className="font-display text-3xl font-black text-primary">${total().toFixed(2)}</span>
        </div>
        <Link to="/review" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90">
          Checkout <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
