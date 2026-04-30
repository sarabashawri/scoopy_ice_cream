import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, Clock, Truck, Check, Sparkles } from "lucide-react";
import { useOrder, TOPPINGS, SIZE_PRICES, FLAVORS, DELIVERY_MINUTES, Size, getFlavor, TOPPING_PRICE } from "@/lib/order-context";
import { formatSAR } from "@/components/price";
import { BackButton } from "@/components/back-button";
import { StepIndicator } from "@/components/step-indicator";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — Scoopy" }],
  }),
  component: Cart,
});

const SIZES: Size[] = ["Small", "Medium", "Large"];

function Cart() {
  const { cart, updateItem, changeQty, removeItem, cartTotal, itemPrice, confirmOrder, confirmedOrder, startNewOrder } = useOrder();
  const nav = useNavigate();

  // If an order is already confirmed and there is nothing in the active cart,
  // redirect to the confirmation page to avoid duplicating the summary.
  if (confirmedOrder && cart.length === 0) {
    return <Navigate to="/confirmation" replace />;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 md:py-12">
        <div className="mb-6"><BackButton to="/" variant="ghost">Back to Home</BackButton></div>
        <div className="text-center pt-10">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-soft text-primary mb-6">
            <ShoppingBag className="h-9 w-9" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Pick a flavor and start building your perfect cone.</p>
          <Link to="/menu" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]">
            Browse Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    confirmOrder();
    nav({ to: "/confirmation" });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
      <div className="mb-6"><BackButton to="/menu" variant="ghost">Back to Menu</BackButton></div>
      <StepIndicator current={3} />
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 4</p>
        <h1 className="font-display text-4xl md:text-5xl font-black mt-2 mb-2">Review Your Cart</h1>
        <p className="text-muted-foreground">Edit flavor, size, toppings, and quantity below.</p>
      </div>

      <div className="space-y-5">
        {cart.map((item) => {
          const flavor = getFlavor(item.flavorId)!;
          const unit = itemPrice({ ...item, quantity: 1 });
          return (
            <div key={item.id} className="bg-card rounded-3xl p-5 md:p-6 shadow-[var(--shadow-card)]">
              <div className="flex flex-col sm:flex-row gap-5">
                <img src={flavor.image} alt={flavor.name} width={140} height={140} className="h-32 w-32 rounded-2xl object-cover self-center sm:self-start" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-2xl font-bold">{flavor.name}</h2>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Edit flavor */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Flavor</label>
                    <div className="flex flex-wrap gap-2">
                      {FLAVORS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateItem(item.id, { flavorId: f.id })}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                            item.flavorId === f.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-pink-soft"
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Edit size */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateItem(item.id, { size: s })}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                            item.size === s
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-pink-soft"
                          }`}
                        >
                          {s} · {formatSAR(SIZE_PRICES[s])}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Edit toppings */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Toppings</label>
                    <div className="flex flex-wrap gap-2">
                      {TOPPINGS.map((t) => {
                        const active = item.toppings.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              const next = active
                                ? item.toppings.filter((x) => x !== t.id)
                                : [...item.toppings, t.id];
                              updateItem(item.id, { toppings: next });
                            }}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground hover:bg-pink-soft"
                            }`}
                          >
                            {t.name} (+{formatSAR(TOPPING_PRICE)})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity + price */}
                  <div className="mt-5 flex items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="inline-flex items-center bg-muted rounded-full p-1">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-[var(--shadow-card)]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        aria-label="Increase quantity"
                        className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-[var(--shadow-card)]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{formatSAR(unit)} each</p>
                      <p className="font-display text-2xl font-black text-primary">{formatSAR(itemPrice(item))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals & Order Summary */}
      <div className="mt-8 bg-card rounded-3xl shadow-[var(--shadow-card)] overflow-hidden">
        <ul className="divide-y divide-border">
          {cart.map((item) => {
            const f = getFlavor(item.flavorId)!;
            const tNames = item.toppings.map((id) => TOPPINGS.find((t) => t.id === id)?.name).filter(Boolean).join(", ");
            return (
              <li key={item.id} className="flex gap-4 p-5 md:p-6">
                <img src={f.image} alt={f.name} className="h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-lg">{f.name}</p>
                  <p className="text-sm text-muted-foreground">{item.size} · Qty {item.quantity}</p>
                  {tNames && <p className="text-xs text-muted-foreground mt-1">Toppings: {tNames}</p>}
                </div>
                <p className="font-bold text-primary">{formatSAR(itemPrice(item))}</p>
              </li>
            );
          })}
        </ul>
        <div className="bg-blue-soft/40 px-6 py-4 flex items-center gap-3 border-t border-border">
          <Truck className="h-5 w-5 text-primary" />
          <p className="text-sm"><span className="font-semibold">Estimated delivery</span> · {DELIVERY_MINUTES} minutes</p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between border-t border-border">
          <span className="font-display text-xl font-bold">Total</span>
          <span className="font-display text-4xl font-black text-primary">{formatSAR(cartTotal())}</span>
        </div>
        <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3 justify-between">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-6 py-3.5 font-semibold text-foreground hover:bg-pink-soft shadow-[var(--shadow-card)] ring-1 ring-border"
          >
            Add More <Plus className="h-4 w-4" />
          </Link>
          <button
            onClick={handleCheckout}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
          >
            Checkout <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
