import { Link, useRouterState } from "@tanstack/react-router";
import { useOrderStore } from "@/lib/store";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import logoPaddock from "@/assets/logo-paddock.png";

export function KioskBar() {
  const items = useOrderStore((s) => s.items);
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const total = items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-carbon/95 backdrop-blur-md">
      <div className="italy-stripe h-1 w-full" />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoPaddock} alt="Paddock Burgers" className="h-16 w-16 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="display text-2xl font-bold text-foreground">PADDOCK</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Burger · Italia</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {path !== "/" && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Retour</span>
            </Link>
          )}

          <Link
            to="/panier"
            className="relative inline-flex items-center gap-3 rounded-sm border border-gold/40 bg-surface px-5 py-3 text-sm font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-carbon"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <>
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-secondary px-1.5 text-xs font-bold text-foreground shadow-glow-red">
                  {count}
                </span>
                <span className="ml-1 hidden text-gold md:inline">{total.toFixed(2)} €</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
