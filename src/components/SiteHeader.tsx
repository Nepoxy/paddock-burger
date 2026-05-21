import { Link, useRouterState } from "@tanstack/react-router";
import { useOrderStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import logoPaddock from "@/assets/logo-paddock.png";

export function SiteHeader() {
  const items = useOrderStore((s) => s.items);
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm uppercase tracking-widest font-semibold transition-colors hover:text-gold ${
        path === to ? "text-gold" : "text-foreground/80"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-carbon/90 backdrop-blur-md">
      <div className="italy-stripe h-1 w-full" />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoPaddock} alt="Paddock Burgers" className="h-16 w-16 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="display text-2xl font-bold text-foreground">PADDOCK</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Burger · Italia</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {link("/", "Accueil")}
          {link("/menu", "Le Menu")}
          {link("/concept", "Le Concept")}
          {link("/contact", "Contact")}
        </nav>
        <Link
          to="/panier"
          className="relative inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-surface px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-carbon"
        >
          <ShoppingBag className="h-4 w-4" />
          Panier
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-[11px] font-bold text-foreground shadow-glow-red">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
