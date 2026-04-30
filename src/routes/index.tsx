import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, Heart } from "lucide-react";
import { FLAVORS, SIZE_PRICES, DELIVERY_MINUTES, useOrder } from "@/lib/order-context";
import { formatSAR } from "@/components/price";
import hero from "@/assets/hero-icecream.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scoopy — Order Your Favorite Ice Cream" },
      { name: "description", content: "Handcrafted scoops delivered to your door in 20 minutes." },
    ],
  }),
  component: Home,
});

function Home() {
  const { confirmedOrder } = useOrder();
  return (
    <div>
      {confirmedOrder && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-pink-soft/60 ring-1 ring-primary/20 rounded-2xl px-5 py-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Truck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Your order is on the way</p>
                <p className="text-xs text-muted-foreground">Order #{confirmedOrder.orderNumber} · ETA {DELIVERY_MINUTES} min</p>
              </div>
            </div>
            <Link
              to="/tracking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]"
            >
              Track My Order <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-card)]">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Fresh batches every morning
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-black leading-[0.95] text-foreground">
              Order Your Favorite <span className="text-primary">Ice Cream</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Dreamy pastel scoops, handmade with real fruit and slow-churned cream. Build your perfect cone in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-base font-semibold hover:opacity-90 transition shadow-[var(--shadow-soft)]"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full bg-card px-7 py-4 text-base font-semibold text-foreground hover:bg-muted transition shadow-[var(--shadow-card)]"
              >
                Our Story
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> {DELIVERY_MINUTES}-min delivery</div>
              <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> 12k happy scoopers</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/20 rounded-[3rem] blur-3xl" aria-hidden />
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-blue-soft shadow-[var(--shadow-soft)]">
              <img src={hero} alt="Pink strawberry ice cream cone with sprinkles" width={1280} height={1280} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl px-5 py-4 shadow-[var(--shadow-card)] hidden md:block">
              <p className="text-xs text-muted-foreground">Today's special</p>
              <p className="font-display font-bold text-lg">Strawberry Cloud</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured flavors */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Bestsellers</p>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-2">Featured Flavors</h2>
          </div>
          <Link to="/menu" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVORS.map((f) => (
            <Link
              to="/menu"
              key={f.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card)] hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-square overflow-hidden">
                <img src={f.image} alt={`${f.name} ice cream`} width={768} height={768} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">From {formatSAR(SIZE_PRICES.Small)}</p>
                </div>
                <span className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
