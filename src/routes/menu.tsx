import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { FLAVORS, useOrder } from "@/lib/order-context";
import { StepIndicator } from "@/components/step-indicator";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Scoopy" },
      { name: "description", content: "Browse our handcrafted ice cream flavors." },
    ],
  }),
  component: Menu,
});

function Menu() {
  const { setFlavor, flavor } = useOrder();
  const nav = useNavigate();

  const pick = (f: typeof FLAVORS[number]) => {
    setFlavor(f);
    nav({ to: "/size" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <StepIndicator current={0} />
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 1</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-2">Pick Your Scoop</h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">Four signature flavors, churned daily in our pastel kitchen.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FLAVORS.map((f) => {
          const selected = flavor?.id === f.id;
          return (
            <article
              key={f.id}
              className={`bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card)] transition-all ${
                selected ? "ring-4 ring-primary -translate-y-1" : "hover:-translate-y-1"
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <img src={f.image} alt={`${f.name} ice cream`} width={768} height={768} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl">{f.name}</h3>
                  <span className="text-lg font-bold text-primary">${f.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Slow-churned · 100% natural</p>
                <button
                  onClick={() => pick(f)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  <Plus className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
