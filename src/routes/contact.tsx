import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Scoopy" },
      { name: "description", content: "Get in touch with the Scoopy team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Say hi</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl font-black">Get in touch</h1>
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@scoopy.cafe" },
            { icon: Phone, label: "Phone", value: "+1 (555) 010-2046" },
            { icon: MapPin, label: "Studio", value: "24 Cream Lane, Sunset District" },
          ].map((c) => (
            <div key={c.label} className="bg-card rounded-2xl p-5 flex items-center gap-4 shadow-[var(--shadow-card)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-soft text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground uppercase">{c.label}</p>
                <p className="font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          className="bg-card rounded-3xl p-7 shadow-[var(--shadow-card)] space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We'll be in touch soon 🍦");
          }}
        >
          <div>
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <input id="name" required className="mt-1 w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" type="email" required className="mt-1 w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="msg">Message</label>
            <textarea id="msg" rows={4} required className="mt-1 w-full rounded-xl bg-background border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90 shadow-[var(--shadow-soft)]">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
