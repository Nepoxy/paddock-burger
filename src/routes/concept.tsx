import { createFileRoute, Link } from "@tanstack/react-router";
import { KioskBar } from "@/components/KioskBar";
import { Trophy, Heart, Flame } from "lucide-react";

export const Route = createFileRoute("/concept")({
  head: () => ({
    meta: [
      { title: "Le concept — Scuderia Burger" },
      { name: "description", content: "Trois marques mythiques, trois recettes d'auteur. La rencontre du street-food et de l'ingénierie italienne." },
      { property: "og:title", content: "Le concept — Scuderia Burger" },
      { property: "og:description", content: "L'esprit Scuderia : passion, précision, plaisir." },
    ],
  }),
  component: ConceptPage,
});

function ConceptPage() {
  return (
    <div className="min-h-screen bg-background">
      <KioskBar />
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Le concept</p>
        <h1 className="display mt-3 text-6xl font-bold leading-none">Trois marques.<br /><span className="text-gold">Trois recettes</span> d'auteur.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Scuderia Burger, c'est un atelier parisien où la précision d'un atelier de carrosserie rencontre le feu d'un grill. On signe trois burgers — un par légende italienne — frappés au logo de la marque sur un bun fait maison chaque matin.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Trophy, t: "Précision", d: "Cuissons calibrées au degré près, comme un boîtier moteur." },
            { icon: Heart, t: "Passion", d: "Recettes pensées avec un chef italien, avec du produit, du vrai." },
            { icon: Flame, t: "Plaisir", d: "Le pur plaisir de mordre dans un burger qui claque." },
          ].map((v, i) => (
            <div key={i} className="rounded-sm border border-border bg-surface p-6">
              <v.icon className="h-7 w-7 text-gold" />
              <h3 className="display mt-4 text-2xl">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-sm border border-gold/40 bg-surface p-10 carbon-pattern">
          <h2 className="display text-3xl">Notre philosophie</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pas de chichi : du bœuf maturé, des fromages affinés, du pain pétri à la main, des sauces préparées chaque service. Trois choix, trois expériences. Pas de menu interminable, pas d'errance — vous savez ce que vous venez chercher.
          </p>
          <Link to="/menu" className="mt-8 inline-flex rounded-sm gradient-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-black">Voir le menu</Link>
        </div>
      </section>
    </div>
  );
}
