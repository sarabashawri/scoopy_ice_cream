import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useOrder } from "@/lib/order-context";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [{ title: "Order Confirmed — Scoopy" }],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { reset } = useOrder();
  const [orderNum] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  useEffect(() => {
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28 text-center">
      <div className="relative inline-flex">
        <span className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" aria-hidden />
        <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
          <Check className="h-16 w-16" strokeWidth={3} />
        </span>
      </div>
      <h1 className="mt-10 font-display text-5xl md:text-7xl font-black">Order Confirmed!</h1>
      <p className="mt-4 text-xl text-muted-foreground">Your ice cream is on the way 🍦</p>

      <div className="mt-10 inline-flex flex-col bg-card rounded-3xl px-8 py-6 shadow-[var(--shadow-card)]">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Order #</span>
        <span className="font-display text-3xl font-black">SC-{orderNum}</span>
        <span className="mt-2 text-sm text-muted-foreground">Estimated delivery · 25-30 min</span>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-7 py-3.5 font-semibold hover:opacity-90">
          Back to Home
        </Link>
        <Link to="/menu" className="inline-flex items-center justify-center rounded-full bg-card px-7 py-3.5 font-semibold text-foreground hover:bg-muted shadow-[var(--shadow-card)]">
          Order Another
        </Link>
      </div>
    </div>
  );
}
