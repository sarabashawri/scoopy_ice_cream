import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useOrder, TOPPINGS, SIZE_PRICES } from "@/lib/order-context";
import { StepIndicator } from "@/components/step-indicator";

export const Route = createFileRoute("/toppings")({
  head: () => ({
    meta: [{ title: "Toppings — Scoopy" }],
  }),
  component: ToppingsPage,
});

function ToppingsPage() {
  const { flavor, size, toppings, toggleTopping, total } = useOrder();
  const nav = useNavigate();

  if (!flavor) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Pick a flavor first</h1>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <StepIndicator current={2} />
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 3</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-2">Add Some Magic</h1>
        <p className="mt-3 text-muted-foreground">Pick any toppings to make it extra special.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <fieldset className="grid sm:grid-cols-2 gap-4">
          <legend className="sr-only">Toppings</legend>
          {TOPPINGS.map((t) => {
            const active = toppings.includes(t.id);
            return (
              <label
                key={t.id}
                className={`flex items-center justify-between cursor-pointer rounded-2xl bg-card p-5 transition shadow-[var(--shadow-card)] ${
                  active ? "ring-2 ring-primary" : "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border-2 transition ${
                      active ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background"
                    }`}
                  >
                    {active && <Check className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">+${t.price.toFixed(2)}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleTopping(t.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </fieldset>

        {/* Summary sidebar */}
        <aside className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] h-fit lg:sticky lg:top-24">
          <h2 className="font-display font-bold text-2xl">Order Summary</h2>
          <div className="mt-5 flex items-center gap-4 pb-5 border-b border-border">
            <img src={flavor.image} alt={flavor.name} width={64} height={64} className="h-16 w-16 rounded-2xl object-cover" />
            <div>
              <p className="font-semibold">{flavor.name}</p>
              <p className="text-sm text-muted-foreground">{size} · ${flavor.price.toFixed(2)}</p>
            </div>
          </div>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Base</dt><dd>${flavor.price.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{size}</dt><dd>${SIZE_PRICES[size].toFixed(2)}</dd></div>
            {toppings.map((id) => {
              const t = TOPPINGS.find((x) => x.id === id)!;
              return (
                <div key={id} className="flex justify-between">
                  <dt className="text-muted-foreground">{t.name}</dt>
                  <dd>${t.price.toFixed(2)}</dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-5 pt-5 border-t border-border flex justify-between items-baseline">
            <span className="font-semibold">Total</span>
            <span className="font-display text-3xl font-black text-primary">${total().toFixed(2)}</span>
          </div>
          <button
            onClick={() => nav({ to: "/review" })}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90"
          >
            Review Order <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </div>
    </div>
  );
}
