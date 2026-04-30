import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";

type Props = {
  to: ComponentProps<typeof Link>["to"];
  children?: React.ReactNode;
  variant?: "solid" | "ghost";
};

export function BackButton({ to, children = "Back", variant = "solid" }: Props) {
  const styles =
    variant === "ghost"
      ? "bg-card text-primary hover:bg-primary hover:text-primary-foreground ring-2 ring-primary/20"
      : "bg-primary text-primary-foreground hover:opacity-90 ring-2 ring-primary/20 shadow-md";
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-base font-bold transition-all shadow-[var(--shadow-card)] hover:-translate-y-0.5 ${styles}`}
    >
      <ArrowLeft className="h-5 w-5" />
      {children}
    </Link>
  );
}
