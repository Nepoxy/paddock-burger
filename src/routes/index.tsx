import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KioskBar } from "@/components/KioskBar";
import { ZoneCheck } from "@/components/ZoneCheck";
import logoPaddock from "@/assets/logo-paddock.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paddock Burgers — Borne de commande" },
      { name: "description", content: "Commandez vos burgers signature sur notre borne tactile. Ferrari, Lamborghini, Alfa Romeo." },
    ],
  }),
  component: Home,
});

function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/hero-garage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="text-center relative z-10">
          <img src={logoPaddock} alt="Paddock Burgers" className="h-40 w-40 mx-auto object-contain drop-shadow-lg" />
          <h1 className="display mt-4 text-7xl font-bold leading-none md:text-9xl">
            PADDOCK
          </h1>
          <p className="mt-4 text-xl uppercase tracking-[0.3em] text-gold">Burger · Italia</p>
          <div className="mt-12 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              La passion <span className="text-gold">italienne</span> entre deux <span className="text-red-600">buns</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Trois légendes, trois burgers signés. Ferrari, Lamborghini, Alfa Romeo — frappés au logo, garnis comme un Grand Prix.
            </p>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="mt-12 inline-flex items-center gap-3 rounded-sm gradient-gold px-10 py-5 text-lg font-bold uppercase tracking-widest text-black shadow-luxe transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Cliquer pour commander
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/hero-garage.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <KioskBar />
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24 relative z-10">
        <h2 className="display text-center text-4xl font-bold md:text-5xl">
          Comment souhaitez-vous commander ?
        </h2>
        <div className="mt-10">
          <ZoneCheck onDone={() => {}} />
        </div>
      </section>
    </div>
  );
}
