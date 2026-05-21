import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KioskBar } from "@/components/KioskBar";
import { burgers, drinks, sides, sauces, type Burger, type Brand } from "@/lib/menu-data";
import { useOrderStore } from "@/lib/store";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Plus, X, ShoppingBag, Truck, Store } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Le Menu — Scuderia Burger" },
      { name: "description", content: "Découvrez nos 3 burgers signature, nos boissons aux couleurs des marques, frites maison et desserts." },
      { property: "og:title", content: "Le Menu — Scuderia Burger" },
      { property: "og:description", content: "3 burgers d'auteur, 9 boissons collector, accompagnements maison." },
    ],
  }),
  component: MenuPage,
});

const brandLabel: Record<Brand, string> = { ferrari: "Ferrari", lamborghini: "Lamborghini", alfa: "Alfa Romeo" };

function MenuPage() {
  const mode = useOrderStore((s) => s.mode);
  const [filter, setFilter] = useState<"all" | Brand>("all");
  const [composing, setComposing] = useState<Burger | null>(null);
  const addItem = useOrderStore((s) => s.addItem);
  const items = useOrderStore((s) => s.items);

  const filteredBurgers = filter === "all" ? burgers : burgers.filter((b) => b.brand === filter);
  const filteredDrinks = filter === "all" ? drinks : drinks.filter((d) => d.brand === filter);

  return (
    <div className="min-h-screen bg-background">
      <KioskBar />
      <Toaster theme="dark" />

      {/* Mode banner */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3 text-sm">
            {mode === "delivery" ? (
              <><Truck className="h-4 w-4 text-gold" /><span>Mode <span className="font-bold text-gold">Livraison</span></span></>
            ) : mode === "pickup" ? (
              <><Store className="h-4 w-4 text-gold" /><span>Mode <span className="font-bold text-gold">Click & Collect</span></span></>
            ) : (
              <span className="text-muted-foreground">Choisissez votre mode de récupération depuis l'accueil.</span>
            )}
          </div>
          <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold">Modifier</Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Le menu</p>
            <h1 className="display mt-2 text-5xl font-bold">Choisissez votre écurie</h1>
          </div>
          <div className="flex gap-2">
            {(["all","ferrari","lamborghini","alfa"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-sm px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                  filter === f ? "gradient-gold text-black" : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {f === "all" ? "Toutes" : brandLabel[f]}
              </button>
            ))}
          </div>
        </div>

        {/* BURGERS */}
        <h2 className="display mt-14 text-3xl font-bold">Nos burgers signature</h2>
        <p className="text-sm text-muted-foreground">Frappés au logo, à composer selon votre cuisson et vos suppléments.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {filteredBurgers.map((b) => (
            <article key={b.id} className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface">
              <div className="aspect-square overflow-hidden bg-carbon">
                <img src={b.image} alt={b.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{b.tagline}</p>
                <h3 className="display mt-1 text-2xl font-bold">{b.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-2xl font-bold text-gold">{b.price.toFixed(2)} €</span>
                  <button
                    onClick={() => setComposing(b)}
                    className="inline-flex items-center gap-2 rounded-sm gradient-gold px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-black"
                  >
                    Composer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DRINKS */}
        <h2 className="display mt-20 text-3xl font-bold">Les boissons collection</h2>
        <p className="text-sm text-muted-foreground">Édition limitée Scuderia — une cannette par modèle de légende.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDrinks.map((d) => (
            <article key={d.id} className="group flex gap-4 rounded-sm border border-border bg-surface p-4 transition-all hover:border-gold">
              <div className="grid h-32 w-24 shrink-0 place-items-center overflow-hidden rounded-sm bg-carbon">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="font-bold leading-tight">{d.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="font-bold text-gold">{d.price.toFixed(2)} €</span>
                  <button
                    onClick={() => {
                      addItem({ productId: d.id, name: d.name, image: d.image, unitPrice: d.price, type: "drink" });
                      toast.success(`${d.name} ajouté`);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-sm border border-gold/50 text-gold hover:bg-gold hover:text-carbon"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SIDES */}
        <h2 className="display mt-20 text-3xl font-bold">Les accompagnements</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sides.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-sm border border-border bg-surface p-5 hover:border-gold">
              <div>
                <h3 className="font-semibold">{s.label}</h3>
                <span className="text-sm font-bold text-gold">{s.price.toFixed(2)} €</span>
              </div>
              <button
                onClick={() => {
                  addItem({ productId: s.id, name: s.label, unitPrice: s.price, type: "side" });
                  toast.success(`${s.label} ajouté`);
                }}
                className="grid h-9 w-9 place-items-center rounded-sm border border-gold/50 text-gold hover:bg-gold hover:text-carbon"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky cart bar */}
      {items.length > 0 && (
        <div className="sticky bottom-4 z-30 mx-auto w-fit">
          <Link to="/panier" className="flex items-center gap-3 rounded-full gradient-gold px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-luxe">
            <ShoppingBag className="h-4 w-4" />
            Voir le panier ({items.reduce((a, i) => a + i.quantity, 0)})
          </Link>
        </div>
      )}

      {composing && <ComposerModal burger={composing} onClose={() => setComposing(null)} />}
    </div>
  );
}

function ComposerModal({ burger, onClose }: { burger: Burger; onClose: () => void }) {
  const [cuisson, setCuisson] = useState(burger.cuissons[1]);
  const [supps, setSupps] = useState<string[]>([]);
  const [chosenSauce, setChosenSauce] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const addItem = useOrderStore((s) => s.addItem);

  const suppPrice = burger.supplements.filter((s) => supps.includes(s.id)).reduce((a, b) => a + b.price, 0);
  const sauceObj = sauces.find((s) => s.id === chosenSauce);
  const total = (burger.price + suppPrice + (sauceObj?.price ?? 0)) * qty;

  const toggleSupp = (id: string) => setSupps((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const confirm = () => {
    const opts = [{ label: "Cuisson", value: cuisson }];
    supps.forEach((id) => {
      const s = burger.supplements.find((x) => x.id === id)!;
      opts.push({ label: "Supplément", value: s.label });
    });
    if (sauceObj) opts.push({ label: "Sauce", value: sauceObj.label });
    addItem({
      productId: burger.id,
      name: burger.name,
      image: burger.image,
      unitPrice: total / qty,
      quantity: qty,
      options: opts,
      type: "burger",
    });
    toast.success(`${burger.name} ajouté au panier`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-carbon/80 p-4 backdrop-blur" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-sm border border-gold/40 bg-surface shadow-luxe md:grid-cols-2">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-carbon/80 text-foreground hover:text-gold"><X className="h-4 w-4" /></button>
        <img src={burger.image} alt={burger.name} className="h-full max-h-[40vh] w-full object-cover md:max-h-none" />
        <div className="overflow-y-auto p-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{burger.tagline}</p>
          <h2 className="display mt-1 text-3xl font-bold">{burger.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{burger.description}</p>

          <Section title="Cuisson">
            <div className="flex gap-2">
              {burger.cuissons.map((c) => (
                <button key={c} onClick={() => setCuisson(c)} className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-widest ${cuisson === c ? "border-gold bg-gold text-carbon" : "border-border text-foreground/80 hover:border-gold"}`}>{c}</button>
              ))}
            </div>
          </Section>

          <Section title="Suppléments">
            <div className="grid gap-2">
              {burger.supplements.map((s) => (
                <label key={s.id} className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-2.5 text-sm ${supps.includes(s.id) ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"}`}>
                  <span className="flex items-center gap-3">
                    <input type="checkbox" checked={supps.includes(s.id)} onChange={() => toggleSupp(s.id)} className="h-4 w-4 accent-[oklch(0.82_0.14_80)]" />
                    {s.label}
                  </span>
                  <span className="font-bold text-gold">+ {s.price.toFixed(2)} €</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Une sauce ?">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setChosenSauce(null)} className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-widest ${!chosenSauce ? "border-gold bg-gold text-carbon" : "border-border hover:border-gold"}`}>Aucune</button>
              {sauces.map((s) => (
                <button key={s.id} onClick={() => setChosenSauce(s.id)} className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-widest ${chosenSauce === s.id ? "border-gold bg-gold text-carbon" : "border-border hover:border-gold"}`}>
                  {s.label} <span className="opacity-70">+{s.price.toFixed(2)}€</span>
                </button>
              ))}
            </div>
          </Section>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 rounded-sm border border-border hover:border-gold">−</button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-9 w-9 rounded-sm border border-border hover:border-gold">+</button>
            </div>
            <button onClick={confirm} className="rounded-sm gradient-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-luxe">
              Ajouter · {total.toFixed(2)} €
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{title}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}
