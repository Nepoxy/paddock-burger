import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useOrderStore } from "@/lib/store";
import { DELIVERY_ZIPS, RESTAURANT } from "@/lib/menu-data";
import { Truck, Store, MapPin, Check, X } from "lucide-react";

export function ZoneCheck({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const setMode = useOrderStore((s) => s.setMode);
  const setZip = useOrderStore((s) => s.setZip);
  const [step, setStep] = useState<"mode" | "zip" | "ko" | "ok">("mode");
  const [code, setCode] = useState("");

  const pickPickup = () => {
    setMode("pickup");
    setZip("", true);
    setStep("ok");
    setTimeout(() => {
      onDone?.();
      navigate({ to: "/menu" });
    }, 900);
  };

  const checkZip = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = DELIVERY_ZIPS.includes(code.trim());
    setZip(code.trim(), ok);
    if (ok) {
      setMode("delivery");
      setStep("ok");
      setTimeout(() => {
        onDone?.();
        navigate({ to: "/menu" });
      }, 900);
    } else {
      setStep("ko");
    }
  };

  if (step === "mode") {
    return (
      <div>
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <button
            onClick={() => setStep("zip")}
            className="group relative overflow-hidden rounded-sm border border-border bg-surface p-12 text-left transition-all hover:-translate-y-2 hover:border-gold hover:shadow-luxe"
          >
            <Truck className="h-12 w-12 text-gold" />
            <h3 className="display mt-6 text-3xl font-bold">Livraison</h3>
            <p className="mt-3 text-base text-muted-foreground">
              On apporte vos burgers chauds chez vous, en 35 min.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-sm border border-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-black gradient-gold">
                Vérifier ma zone →
              </span>
            </div>
          </button>

          <button
            onClick={pickPickup}
            className="group relative overflow-hidden rounded-sm border border-border bg-surface p-12 text-left transition-all hover:-translate-y-2 hover:border-gold hover:shadow-luxe"
          >
            <Store className="h-12 w-12 text-gold" />
            <h3 className="display mt-6 text-3xl font-bold">Click & Collect</h3>
            <p className="mt-3 text-base text-muted-foreground">
              Venez retirer votre commande au stand, prête en 15 min.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-sm border border-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-black gradient-gold">
                Choisir →
              </span>
            </div>
          </button>
        </div>

        <div className="rounded-sm border border-border bg-surface overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-80 md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9918456725316!2d2.297069!3d48.864716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f5c58a5e9a1%3A0x8c0e9f7d3f8f8f8f!2s12%20Via%20dei%20Motori%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="display text-2xl font-bold mb-6">Retrouvez-nous au stand</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">Adresse</p>
                    <p className="text-lg font-semibold mt-1">{RESTAURANT.address}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">Horaires</p>
                    <p className="text-sm mt-1">{RESTAURANT.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "zip") {
    return (
      <form onSubmit={checkZip} className="rounded-sm border border-border bg-surface p-8">
        <button type="button" onClick={() => setStep("mode")} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold">← Retour</button>
        <h3 className="display mt-3 text-2xl font-bold">Êtes-vous dans la zone ?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Pour éviter toute déception, on vérifie votre code postal avant la commande.
        </p>
        <div className="mt-6 flex gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="75008"
            inputMode="numeric"
            maxLength={5}
            className="flex-1 rounded-sm border border-border bg-input px-4 py-3 text-lg tracking-widest text-foreground outline-none focus:border-gold"
            autoFocus
          />
          <button className="rounded-sm gradient-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.02]">
            Vérifier
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Zones servies : Paris centre & ouest, Hauts-de-Seine.</p>
      </form>
    );
  }

  if (step === "ko") {
    return (
      <div className="rounded-sm border border-border bg-surface p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-secondary text-secondary"><X className="h-6 w-6" /></div>
        <h3 className="display mt-4 text-2xl font-bold">Hors zone — pas encore !</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Le code <span className="text-gold">{code}</span> n'est pas dans notre rayon de livraison. Pas de panique : passez en Click & Collect au restaurant.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { setStep("zip"); setCode(""); }} className="rounded-sm border border-border px-5 py-2.5 text-sm uppercase tracking-widest hover:border-gold hover:text-gold">
            Essayer un autre code
          </button>
          <button onClick={pickPickup} className="rounded-sm gradient-gold px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-carbon">
            Passer en Click & Collect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-gold bg-surface p-8 text-center shadow-luxe">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-carbon"><Check className="h-7 w-7" /></div>
      <h3 className="display mt-4 text-2xl font-bold text-gold">Parfait, on démarre les fourneaux</h3>
      <p className="mt-2 text-sm text-muted-foreground">Direction le menu…</p>
    </div>
  );
}
