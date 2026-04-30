import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const steps = [
  { to: "/menu", label: "Flavor" },
  { to: "/size", label: "Size" },
  { to: "/toppings", label: "Toppings" },
  { to: "/review", label: "Review" },
] as const;

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.to} className="flex items-center gap-2 md:gap-4">
            <Link
              to={s.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : done
                    ? "bg-primary/15 text-foreground"
                    : "bg-card text-muted-foreground"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${active ? "bg-primary-foreground/20" : done ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {s.label}
            </Link>
            {i < steps.length - 1 && <span className="hidden md:block h-px w-8 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
