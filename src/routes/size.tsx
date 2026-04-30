import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useOrder, SIZE_PRICES, Size } from "@/lib/order-context";
import { formatSAR } from "@/components/price";
import { StepIndicator } from "@/components/step-indicator";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/size")({
  head: () => ({
    meta: [{ title: "Choose Size — Scoopy" }],
  }),
  component: SizePage,
});

const SIZES: { id: Size; scoops: string; diameter: string }[] = [
  { id: "Small", scoops: "1 scoop", diameter: "h-16 w-16" },
  { id: "Medium", scoops: "2 scoops", diameter: "h-24 w-24" },
  { id: "Large", scoops: "3 scoops", diameter: "h-32 w-32" },
];

function SizePage() {
  const { size, setSize, flavor } = useOrder();
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
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <StepIndicator current={1} />
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Step 2</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-2">Choose Your Size</h1>
        <p className="mt-3 text-muted-foreground">How much {flavor.name.toLowerCase()} goodness?</p>
      </div>

      <fieldset className="grid sm:grid-cols-3 gap-5">
        <legend className="sr-only">Size</legend>
        {SIZES.map((s) => {
          const active = size === s.id;
          return (
            <label
              key={s.id}
              className={`relative cursor-pointer rounded-3xl bg-card p-8 text-center transition-all shadow-[var(--shadow-card)] ${
                active ? "ring-4 ring-primary -translate-y-1" : "hover:-translate-y-1"
              }`}
            >
              <input
                type="radio"
                name="size"
                value={s.id}
                checked={active}
                onChange={() => setSize(s.id)}
                className="sr-only"
              />
              <div className={`mx-auto rounded-full bg-pink-soft ${s.diameter} flex items-center justify-center mb-4`}>
                <div className={`rounded-full ${s.diameter} scale-75 opacity-90`} style={{ background: flavor.color }} />
              </div>
              <h3 className="font-display text-2xl font-bold">{s.id}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.scoops}</p>
              <p className="mt-3 font-semibold text-primary">{formatSAR(SIZE_PRICES[s.id])}</p>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <BackButton to="/menu">Back to Flavors</BackButton>
        <button
          onClick={() => nav({ to: "/toppings" })}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
