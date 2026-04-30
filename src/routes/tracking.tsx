import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChefHat, Bike, MapPin, PackageCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { DELIVERY_MINUTES, useOrder } from "@/lib/order-context";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Scoopy" },
      { name: "description", content: "Live status of your ice cream delivery." },
    ],
  }),
  component: Tracking,
});

const STAGES = [
  { id: 0, label: "Order Confirmed", Icon: Check },
  { id: 1, label: "Preparing", Icon: ChefHat },
  { id: 2, label: "Out for Delivery", Icon: Bike },
  { id: 3, label: "Arriving Soon", Icon: MapPin },
  { id: 4, label: "Delivered", Icon: PackageCheck },
];

function Tracking() {
  const [stage, setStage] = useState(0);
  const { confirmedOrder } = useOrder();

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s < STAGES.length - 1 ? s + 1 : s));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const progress = (stage / (STAGES.length - 1)) * 100;
  const current = STAGES[stage];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
      <div className="mb-6"><BackButton to="/" variant="ghost">Back to Home</BackButton></div>
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-card)]">
          <Clock className="h-3.5 w-3.5 text-primary" />
          Estimated arrival in {DELIVERY_MINUTES} minutes
        </span>
        <h1 className="mt-5 font-display text-4xl md:text-6xl font-black">Track Your Order</h1>
        {confirmedOrder && (
          <p className="mt-2 text-sm text-muted-foreground">Order #{confirmedOrder.orderNumber}</p>
        )}
        <p className="mt-3 text-muted-foreground">Watch your scoop's journey to your doorstep.</p>
      </div>

      {/* Current status hero */}
      <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] animate-pulse">
          <current.Icon className="h-9 w-9" />
        </span>
        <p className="mt-4 text-xs font-semibold text-primary uppercase tracking-wider">Current Status</p>
        <h2 className="mt-1 font-display text-3xl font-black">{current.label}</h2>
        

        {/* Progress bar */}
        <div className="mt-8">
          <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-blue-soft rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>
      </div>

      {/* Stages list */}
      <ol className="mt-10 space-y-3">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <li
              key={s.id}
              className={`flex items-center gap-4 rounded-2xl p-4 transition-all ${
                active
                  ? "bg-card shadow-[var(--shadow-card)] ring-2 ring-primary"
                  : done
                    ? "bg-card/70"
                    : "bg-card/40 opacity-60"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-pink-soft text-primary animate-pulse"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-5 w-5" /> : <s.Icon className="h-5 w-5" />}
              </span>
              <div className="flex-1">
                <p className={`font-semibold ${active ? "text-foreground" : ""}`}>{s.label}</p>
                
              </div>
              {done && <span className="text-xs font-semibold text-primary">Done</span>}
              {active && <span className="text-xs font-semibold text-primary">In progress</span>}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-between">
        <BackButton to="/">Back to Home</BackButton>
        <Link to="/menu" className="inline-flex items-center justify-center rounded-full bg-card px-7 py-3.5 font-semibold text-foreground hover:bg-muted shadow-[var(--shadow-card)]">
          Order Another
        </Link>
      </div>
    </div>
  );
}
