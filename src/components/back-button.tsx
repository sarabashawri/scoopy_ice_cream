import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";

type Props = {
  to: ComponentProps<typeof Link>["to"];
  children?: React.ReactNode;
};

export function BackButton({ to, children = "Back" }: Props) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-base font-bold hover:opacity-90 transition shadow-[var(--shadow-card)] ring-2 ring-foreground/10"
    >
      <ArrowLeft className="h-5 w-5" />
      {children}
    </Link>
  );
}
