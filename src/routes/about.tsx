import { createFileRoute } from "@tanstack/react-router";
import { Heart, Leaf, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Scoopy" },
      { name: "description", content: "We're a tiny ice cream studio making big-flavor scoops in pastel dreams." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center">Our story</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl font-black text-center">Tiny studio.<br />Big flavor.</h1>
      <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
        Scoopy started in a sunlit kitchen in 2019 with one mission: make ice cream that tastes like the colors look. Every batch is hand-churned, slow, and a little bit pink.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        {[
          { icon: Leaf, title: "Real ingredients", body: "Whole milk, organic fruit, no artificial anything." },
          { icon: Heart, title: "Made with care", body: "Small batches, churned daily by humans who love it." },
          { icon: Award, title: "Award-winning", body: "Best Local Dessert 2024 · City Food Awards." },
        ].map((v) => (
          <div key={v.title} className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-soft text-primary">
              <v.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">{v.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
