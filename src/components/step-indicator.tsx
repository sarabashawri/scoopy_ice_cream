import { Check } from "lucide-react";

const steps = [
  { label: "Flavor" },
  { label: "Size" },
  { label: "Toppings" },
  { label: "Review" },
] as const;

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol
      aria-label="Order progress"
      className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap select-none"
    >
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.label} className="flex items-center gap-2 md:gap-4">
            <div
              aria-current={active ? "step" : undefined}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition cursor-default ${
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : done
                    ? "bg-primary/15 text-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  active
                    ? "bg-primary-foreground/20"
                    : done
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/60"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <span
                className={`hidden md:block h-px w-8 ${done ? "bg-primary/40" : "bg-border"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
