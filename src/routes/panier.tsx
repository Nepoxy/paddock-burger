import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { KioskBar } from "@/components/KioskBar";
import { useOrderStore } from "@/lib/store";
import { sauces, drinks } from "@/lib/menu-data";
import { Trash2, Plus, Minus, Truck, Store, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — Scuderia Burger" },
      { name: "description", content: "Vérifiez votre commande, ajoutez des sauces et validez votre récupération." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, addItem, mode, zip, clear } = useOrderStore();
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>("19:30");
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
  const deliveryFee = mode === "delivery" ? 3.9 : 0;
  const total = subtotal + deliveryFee;

  // upsell suggestions
  const hasDrink = items.some((i) => i.type === "drink");
  const suggestions = !hasDrink ? drinks.slice(0, 3) : [];

  if (!mode) {
    return (
      <Empty title="Choisissez d'abord votre mode" cta="Démarrer" to="/" desc="Livraison ou click & collect : sélectionnez votre option depuis l'accueil." />
    );
  }
  if (items.length === 0 && !confirmed) {
    return <Empty title="Votre panier est vide" cta="Voir le menu" to="/menu" desc="Composez votre premier burger signature." />;
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <KioskBar />
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto h-16 w-16 rounded-full gradient-gold shadow-luxe" />
          <h1 className="display mt-8 text-4xl font-bold">Commande envoyée !</h1>
          <p className="mt-3 text-muted-foreground">
            On lance la cuisson. {mode === "delivery" ? `Livraison prévue à ${time} chez vous.` : `À récupérer à ${time} au restaurant.`}
            <br />Le paiement se fera {mode === "delivery" ? "directement au livreur" : "sur place"}.
          </p>
          <Link to="/" className="mt-10 inline-flex rounded-sm gradient-gold px-7 py-4 text-sm font-bold uppercase tracking-widest text-black">Retour à l'accueil</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <KioskBar />
      <Toaster theme="dark" />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Étape 2 / 3</p>
        <h1 className="display mt-2 text-5xl font-bold">Mon panier</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.uid} className="flex gap-4 rounded-sm border border-border bg-surface p-4">
                {i.image && <img src={i.image} alt="" className="h-24 w-24 shrink-0 rounded-sm object-cover" />}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold">{i.name}</h3>
                    <button onClick={() => removeItem(i.uid)} className="text-muted-foreground hover:text-secondary"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  {i.options && (
                    <ul className="mt-1 text-xs text-muted-foreground">
                      {i.options.map((o, k) => <li key={k}>{o.label} : <span className="text-foreground/80">{o.value}</span></li>)}
                    </ul>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center gap-2 rounded-sm border border-border">
                      <button onClick={() => updateQty(i.uid, i.quantity - 1)} className="grid h-8 w-8 place-items-center hover:text-gold"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-bold">{i.quantity}</span>
                      <button onClick={() => updateQty(i.uid, i.quantity + 1)} className="grid h-8 w-8 place-items-center hover:text-gold"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-bold text-gold">{(i.unitPrice * i.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Sauces additional */}
            <div className="mt-6 rounded-sm border border-border bg-surface p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Une sauce en plus ?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sauces.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      addItem({ productId: s.id, name: s.label, unitPrice: s.price, type: "sauce" });
                      toast.success(`${s.label} ajoutée`);
                    }}
                    className="rounded-sm border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-gold hover:text-gold"
                  >
                    + {s.label} · {s.price.toFixed(2)}€
                  </button>
                ))}
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-6 rounded-sm border border-gold/40 bg-surface p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">N'oubliez pas la boisson</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {suggestions.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { addItem({ productId: d.id, name: d.name, image: d.image, unitPrice: d.price, type: "drink" }); toast.success(`${d.name} ajouté`); }}
                      className="group flex items-center gap-3 rounded-sm border border-border bg-carbon/40 p-2 text-left hover:border-gold"
                    >
                      <img src={d.image} alt="" className="h-16 w-12 object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold leading-tight">{d.name}</p>
                        <p className="text-xs text-gold">{d.price.toFixed(2)} €</p>
                      </div>
                      <Plus className="h-4 w-4 text-gold" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recap */}
          <aside className="h-fit rounded-sm border border-gold/40 bg-surface p-6 shadow-luxe">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              {mode === "delivery" ? <Truck className="h-5 w-5 text-gold" /> : <Store className="h-5 w-5 text-gold" />}
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">{mode === "delivery" ? "Livraison" : "Click & Collect"}</p>
                <p className="text-xs text-muted-foreground">{mode === "delivery" ? `Code postal ${zip}` : "Au restaurant — 12 Via dei Motori"}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              <label className="grid gap-1">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-sm border border-border bg-input px-3 py-2 outline-none focus:border-gold" />
              </label>
              <label className="grid gap-1">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Heure</span>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-sm border border-border bg-input px-3 py-2 outline-none focus:border-gold" />
              </label>
            </div>

            <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
              <Row k="Sous-total" v={`${subtotal.toFixed(2)} €`} />
              {mode === "delivery" && <Row k="Frais de livraison" v={`${deliveryFee.toFixed(2)} €`} />}
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="display text-lg">Total</span>
                <span className="display text-3xl font-bold text-gold">{total.toFixed(2)} €</span>
              </div>
              <p className="pt-1 text-xs text-muted-foreground">Paiement {mode === "delivery" ? "au livreur" : "sur place"}.</p>
            </div>

            <button
              onClick={() => { setConfirmed(true); clear(); window.scrollTo({ top: 0 }); }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm gradient-gold px-6 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-luxe transition-transform hover:scale-[1.01]"
            >
              Valider la commande <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate({ to: "/menu" })} className="mt-2 w-full rounded-sm border border-border px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold hover:text-gold">
              Continuer mes choix
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between text-muted-foreground"><span>{k}</span><span className="text-foreground">{v}</span></div>;
}

function Empty({ title, desc, cta, to }: { title: string; desc: string; cta: string; to: string }) {
  return (
    <div className="min-h-screen bg-background">
      <KioskBar />
      <section className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="display text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-muted-foreground">{desc}</p>
        <Link to={to} className="mt-8 inline-flex rounded-sm gradient-gold px-7 py-4 text-sm font-bold uppercase tracking-widest text-black">{cta}</Link>
      </section>
    </div>
  );
}
