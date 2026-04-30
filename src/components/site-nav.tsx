import { Link } from "@tanstack/react-router";
import { IceCream, ShoppingBag } from "lucide-react";
import { useOrder } from "@/lib/order-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/tracking", label: "Track" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const { cart } = useOrder();
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black text-foreground">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <IceCream className="h-5 w-5" />
          </span>
          Scoopy
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-primary/15 text-foreground" }}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/cart"
          activeProps={{ className: "ring-2 ring-primary/40" }}
          className="relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-card)]"
        >
          <ShoppingBag className="h-4 w-4" />
          Cart
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-black px-1.5 ring-2 ring-background">
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 Scoopy Ice Cream. Made with cream & love.</p>
        <p>hello@scoopy.cafe · +1 (555) 010-2046</p>
      </div>
    </footer>
  );
}
