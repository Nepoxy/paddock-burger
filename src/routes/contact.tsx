import { createFileRoute } from "@tanstack/react-router";
import { KioskBar } from "@/components/KioskBar";
import { RESTAURANT } from "@/lib/menu-data";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Scuderia Burger" },
      { name: "description", content: "Adresse, téléphone, horaires et réseaux du restaurant Scuderia Burger à Paris." },
      { property: "og:title", content: "Contact — Scuderia Burger" },
      { property: "og:description", content: "Trouvez-nous au 12 Via dei Motori, 75008 Paris." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <KioskBar />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Contact</p>
        <h1 className="display mt-2 text-5xl font-bold">Nous trouver</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <Card icon={<MapPin />} title="Adresse" lines={[RESTAURANT.address]} />
            <Card icon={<Phone />} title="Téléphone" lines={[RESTAURANT.phone]} />
            <Card icon={<Clock />} title="Horaires" lines={["Mardi – Dimanche", "11h30 – 14h30", "18h30 – 22h30", "Fermé le lundi"]} />
            <div className="rounded-sm border border-border bg-surface p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Suivez-nous</p>
              <div className="mt-3 flex gap-3">
                <a href="#" className="grid h-11 w-11 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-carbon"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="grid h-11 w-11 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-carbon"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-border bg-surface">
            <iframe
              title="Plan Scuderia Burger"
              src="https://www.google.com/maps?q=12+rue+royale+paris+8&output=embed"
              className="h-[520px] w-full grayscale invert-[0.85] sepia-[0.2]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-sm border border-border bg-surface p-5">
      <div className="flex items-center gap-3 text-gold">{icon}<p className="text-xs uppercase tracking-[0.25em]">{title}</p></div>
      <div className="mt-3 space-y-1 text-sm text-foreground/90">
        {lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}
