import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/menu-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 className="display text-2xl font-bold text-foreground">SCUDERIA</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold">Burger · Italia</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Trois burgers d'auteur inspirés des légendes italiennes. À emporter ou livrés.
          </p>
        </div>
        <div>
          <h4 className="display text-sm uppercase tracking-widest text-gold">Le restaurant</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> {RESTAURANT.address}</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" /> {RESTAURANT.phone}</li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-gold" /> {RESTAURANT.hours}</li>
          </ul>
        </div>
        <div>
          <h4 className="display text-sm uppercase tracking-widest text-gold">Naviguer</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-gold">Le menu</Link></li>
            <li><Link to="/concept" className="hover:text-gold">Le concept</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Nous trouver</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="display text-sm uppercase tracking-widest text-gold">Suivez l'écurie</h4>
          <div className="mt-4 flex gap-3">
            <a href="#" className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-carbon"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-carbon"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Scuderia Burger — Tous droits réservés. Concept fictif à but pédagogique.
      </div>
    </footer>
  );
}
