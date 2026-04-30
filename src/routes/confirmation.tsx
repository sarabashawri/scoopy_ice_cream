import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Truck, Clock, Home } from "lucide-react";
import { DELIVERY_MINUTES, useOrder } from "@/lib/order-context";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [{ title: "Order Confirmed — Scoopy" }],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { confirmedOrder } = useOrder();
  const nav = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center">
      <div className="relative inline-flex">
        <span className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" aria-hidden />
        <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
          <Check className="h-16 w-16" strokeWidth={3} />
        </span>
      </div>
      <h1 className="mt-10 font-display text-5xl md:text-7xl font-black">Order Confirmed!</h1>
      <p className="mt-4 text-xl text-muted-foreground">Your ice cream is on the way 🍦</p>

      {confirmedOrder && (
        <div className="mt-10 inline-flex flex-col bg-card rounded-3xl px-8 py-6 shadow-[var(--shadow-card)]">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Order #</span>
          <span className="font-display text-3xl font-black">{confirmedOrder.orderNumber}</span>
          <span className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> Estimated delivery · {DELIVERY_MINUTES} minutes
          </span>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => nav({ to: "/tracking" })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
        >
          <Truck className="h-4 w-4" /> Track My Order
        </button>
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-7 py-3.5 font-semibold text-foreground hover:bg-muted shadow-[var(--shadow-card)] ring-1 ring-border">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
