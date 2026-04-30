import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useOrder, TOPPINGS } from "@/lib/order-context";
import { formatSAR } from "@/components/price";
import { StepIndicator } from "@/components/step-indicator";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/toppings")({
  head: () => ({
    meta: [{ title: "Toppings — Scoopy" }],
  }),
  component: ToppingsPage,
});

function ToppingsPage() {
  const { flavor, toppings, toggleTopping } = useOrder();
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
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <StepIndicator current={2} />
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 3</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-2">Add Some Magic</h1>
        <p className="mt-3 text-muted-foreground">Pick any toppings to make it extra special.</p>
      </div>

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
                  <p className="text-xs text-muted-foreground">+{formatSAR(t.price)}</p>
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

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <BackButton to="/size">Back to Size</BackButton>
        <button
          onClick={() => nav({ to: "/review" })}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
        >
          Review Order <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
