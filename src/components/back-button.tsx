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
      ? "bg-card text-foreground hover:bg-muted ring-1 ring-border"
      : "bg-foreground text-background hover:opacity-90 ring-2 ring-foreground/10";
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition shadow-[var(--shadow-card)] ${styles}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </Link>
  );
}
