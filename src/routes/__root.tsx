import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { OrderProvider } from "@/lib/order-context";
import { SiteNav, SiteFooter } from "@/components/site-nav";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-black text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That scoop melted away. Let's get you back home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Scoopy — Artisan Ice Cream, Delivered" },
      { name: "description", content: "Order handcrafted ice cream in dreamy pastel flavors. Pick your scoop, size, and toppings." },
      { property: "og:title", content: "Scoopy — Artisan Ice Cream, Delivered" },
      { name: "twitter:title", content: "Scoopy — Artisan Ice Cream, Delivered" },
      { property: "og:description", content: "Order handcrafted ice cream in dreamy pastel flavors. Pick your scoop, size, and toppings." },
      { name: "twitter:description", content: "Order handcrafted ice cream in dreamy pastel flavors. Pick your scoop, size, and toppings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/11f52229-5a5a-468f-bbab-ee292bd8b03f/id-preview-0906bd08--7ea7e5bc-a6a0-4bad-a3e4-0849046b9486.lovable.app-1777541708045.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/11f52229-5a5a-468f-bbab-ee292bd8b03f/id-preview-0906bd08--7ea7e5bc-a6a0-4bad-a3e4-0849046b9486.lovable.app-1777541708045.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <OrderProvider>
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </OrderProvider>
  );
}
