import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useOrder, TOPPINGS, SIZE_PRICES, DELIVERY_MINUTES, TOPPING_PRICE } from "@/lib/order-context";
import { formatSAR } from "@/components/price";
import { StepIndicator } from "@/components/step-indicator";
import { BackButton } from "@/components/back-button";
import { Check, Clock, Truck, Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [{ title: "Review Order — Scoopy" }],
  }),
  component: Review,
});

function Review() {
  const { flavor, size, toppings, total, addBuilderToCart } = useOrder();
  const nav = useNavigate();

  if (!flavor) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Nothing to review yet</h1>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">Start an order</Link>
      </div>
    );
  }

  const selectedToppings = toppings.map((id) => TOPPINGS.find((t) => t.id === id)!);

  const confirm = () => {
    addBuilderToCart();
    nav({ to: "/cart" });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
      <div className="mb-6"><BackButton to="/toppings" variant="ghost">Back to Toppings</BackButton></div>
      <StepIndicator current={3} />
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 4</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-2">Review Your Order</h1>
      </div>

      <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="grid sm:grid-cols-[200px_1fr] gap-6 p-6">
          <img src={flavor.image} alt={flavor.name} width={400} height={400} className="w-full aspect-square rounded-2xl object-cover" />
          <div>
            <p className="text-sm text-muted-foreground">Flavor</p>
            <h2 className="font-display text-3xl font-bold">{flavor.name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Size</p>
                <p className="font-semibold">{size}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Toppings</p>
                <p className="font-semibold">{selectedToppings.length || "None"}</p>
              </div>
            </div>
            {selectedToppings.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {selectedToppings.map((t) => (
                  <li key={t.id} className="inline-flex items-center gap-1 rounded-full bg-pink-soft px-3 py-1 text-xs font-medium">
                    <Check className="h-3 w-3" /> {t.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-cream/50 px-6 py-5 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">{size} {flavor.name}</span><span>{formatSAR(SIZE_PRICES[size])}</span></div>
          {selectedToppings.map((t) => (
            <div key={t.id} className="flex justify-between"><span className="text-muted-foreground">{t.name}</span><span>{formatSAR(TOPPING_PRICE)}</span></div>
          ))}
        </div>

        <div className="px-6 py-5 border-t border-border flex items-center gap-3 bg-blue-soft/40">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-card)]">
            <Truck className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4" /> Estimated delivery</p>
            <p className="text-sm text-muted-foreground">Arrives in about {DELIVERY_MINUTES} minutes</p>
          </div>
        </div>

        <div className="px-6 py-6 flex items-center justify-between border-t border-border">
          <span className="font-display text-xl font-bold">Total</span>
          <span className="font-display text-4xl font-black text-primary">{formatSAR(total())}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/toppings"
                aria-label="Edit Order"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground hover:bg-muted shadow-[var(--shadow-card)] ring-1 ring-border transition"
              >
                <Pencil className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit Order</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <button
          onClick={confirm}
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
