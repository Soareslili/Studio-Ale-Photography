"use client";

import AOSInit from "../AOSInit";
import { Heart, Users, PenLine, Briefcase, Calendar, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const ShuffleHero = () => {
  return (
    <section
      className="
        w-full max-w-6xl mx-auto
        px-5 md:px-8
        py-10 md:py-16 lg:py-20   /* um pouco menos de padding */
        grid grid-cols-1 md:grid-cols-2
        items-center md:items-start
        gap-8 md:gap-12
      "
    >
      <AOSInit />

    
      <div className="order-2 md:order-1 text-center md:text-left">
        <h3
          className="
            font-semibold text-white/90 leading-tight
            text-[clamp(2rem,6vw,3.5rem)]   /* título fluido */
          "
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Hi! I'm <span className="font-extrabold text-[#C8A24A]">Alexandre</span>, a photographer.
        </h3>

        <p className="mt-4 text-sm md:text-base text-white/70 flex flex-wrap gap-x-2 justify-center md:justify-start">
          {["Editorial", "Weddings", "Portraits", "Commercial"].map((item, idx) => (
            <span
              key={item}
              data-aos="fade-up"
              data-aos-delay={400 + idx * 300}
              data-aos-duration="800"
              className="flex items-center"
            >
              {item}
              {idx < 3 && <span className="mx-2">•</span>}
            </span>
          ))}
        </p>

        <p
          className="mt-5 md:mt-6 text-base md:text-lg text-white/70 max-w-xl md:max-w-2xl mx-auto md:mx-0"
          data-aos="fade-right"
          data-aos-delay="1000"
          data-aos-duration="1000"
        >
          Fotografia é contar histórias com luz. Trabalho com retratos, casamentos e campanhas
          editoriais, criando imagens que capturam momentos únicos e emoções genuínas.
        </p>

      
        <div className="mt-7 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4 justify-center md:justify-start">
          <a
            href="#Portfolio"
            className={cn(
              "inline-flex items-center justify-center h-11 px-5 rounded-xl font-medium",
              "transition-all hover:bg-black hover:text-[#C8A24A] active:scale-95",
              "hover:border",
              "text-black bg-[#C8A24A]"
            )}
            aria-label="Ver Portfólio"
          >
            Ver Portfólio
          </a>

            <a
            href="https://wa.me/5599999999999"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center h-11 px-5 rounded-xl font-medium",
              "border transition-colors active:scale-95",
              "text-[#C8A24A] hover:bg-[#C8A24A] hover:text-black"
            )}
            style={{ borderColor: "#C8A24A" }}
            aria-label="Reservar Agora pelo WhatsApp"
            >
            Reservar Agora
            </a>
        </div>

        {/* Ícones */}
        <div className="mt-8 md:mt-10 grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {[
            { icon: Heart, label: "Portraits" },
            { icon: Users, label: "Weddings" },
            { icon: PenLine, label: "Editorial" },
            { icon: Briefcase, label: "Commercial" },
            { icon: Calendar, label: "Events" },
            { icon: Mountain, label: "Landscape" },
          ].map((item, idx) => (
            <div
              key={item.label}
              data-aos="fade-up"
              data-aos-delay={idx * 200}
              data-aos-duration="600"
            >
              <IconItem icon={item.icon} label={item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Grid responsivo animado */}
      <ShuffleGrid />
    </section>
  );
};

function IconItem({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/80 cursor-pointer transform transition-transform duration-300 hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm text-white/70">{label}</span>
    </div>
  );
}

/** ======== IMAGENS ======== */
const squareData = [
  { id: 1, src: "/gallery/Surf.png" },
  { id: 2, src: "/gallery/Casamento.png" },
  { id: 3, src: "/gallery/Aniversario.png" },
  { id: 4, src: "/gallery/Futebol.png" },
  { id: 5, src: "/gallery/Basquete.png" },
  { id: 6, src: "/gallery/Casal.png" },
  { id: 7, src: "/gallery/Corrida.png" },
  { id: 8, src: "/gallery/Evento.png" },
  { id: 9, src: "/gallery/Volei.png" },
  { id: 10, src: "/gallery/Paisagem.png" },
  { id: 11, src: "/gallery/Modelo.png" },
  { id: 12, src: "/gallery/Crianca.png" },
  { id: 13, src: "/gallery/natacao.png" },
  { id: 14, src: "/gallery/Cachorro.png" },
  { id: 15, src: "/gallery/Comemoracao.png" },
  { id: 16, src: "/gallery/Amizade.png" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const generateSquares = () =>
  shuffleArray(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
      className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Foto da galeria"
      role="img"
    />
  ));

/** ======== GRID RESPONSIVO ======== */
const ShuffleGrid = () => {
  const intervalRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = () => setSquares(generateSquares());

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const start = () => {
      stop();
      intervalRef.current = window.setInterval(shuffleSquares, 3000);
    };
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const onVis = () => (document.visibilityState === "visible" ? start() : stop());

    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      className={cn(
        "order-1 md:order-2",               
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
        "gap-2 sm:gap-3 md:gap-3",
        "rounded-2xl overflow-hidden",
        "max-h-[52vh] md:max-h-[70vh] lg:max-h-none" 
      )}
    >
      {squares}
    </div>
  );
};
