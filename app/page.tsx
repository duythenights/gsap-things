"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTION_BACKGROUNDS = [
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
    alt: "Snowy mountain ridge under starry sky",
    label: "Summit",
    subtitle: "Alpine night",
  },
  {
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80",
    alt: "Sand dunes at sunset",
    label: "Dunes",
    subtitle: "Desert light",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
    alt: "Sunlight through a forest canopy",
    label: "Glade",
    subtitle: "Woodland path",
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1920&q=80",
    alt: "Field of pink cherry blossoms",
    label: "Bloom",
    subtitle: "Spring field",
  },
] as const;

/**
 * Home page with scroll-pinned section transitions driven by GSAP ScrollTrigger.
 * @returns The main page layout with animated sections.
 */
const HomePage = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const panels = gsap.utils
        .toArray<HTMLElement>(".section")
        .slice(0, -1);

      panels.forEach((panel) => {
        const innerpanel = panel.querySelector<HTMLElement>(".section-inner");
        if (!innerpanel) return;

        const panelHeight = innerpanel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;
        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio
                ? `+=${innerpanel.offsetHeight}`
                : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
          },
        });

        if (fakeScrollRatio) {
          tl.to(innerpanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 },
        ).to(panel, { opacity: 0, duration: 0.1 });
      });
    },
    { scope: containerRef, revertOnUpdate: true },
  );

  return (
    <main ref={containerRef} className="home pb-[400px]">
      <section className="section section-1 relative h-screen overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
        <Image
          src={SECTION_BACKGROUNDS[0].src}
          alt={SECTION_BACKGROUNDS[0].alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-indigo-950/55 via-slate-900/35 to-slate-950/75"
          aria-hidden
        />
        <div className="section-inner relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/70">
            {SECTION_BACKGROUNDS[0].subtitle}
          </p>
          <h2 className="font-serif text-5xl font-light tracking-tight drop-shadow-lg sm:text-6xl md:text-7xl">
            {SECTION_BACKGROUNDS[0].label}
          </h2>
        </div>
      </section>
      <section className="section section-2 relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-amber-900/20">
        <Image
          src={SECTION_BACKGROUNDS[1].src}
          alt={SECTION_BACKGROUNDS[1].alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-950/50 via-orange-950/25 to-stone-950/70"
          aria-hidden
        />
        <div className="section-inner relative z-10 flex h-[1000px] flex-col items-center px-6 pt-28 text-center text-amber-50">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-amber-200/80">
            {SECTION_BACKGROUNDS[1].subtitle}
          </p>
          <h2 className="mt-4 font-serif text-5xl font-light tracking-tight drop-shadow-md sm:text-6xl">
            {SECTION_BACKGROUNDS[1].label}
          </h2>
        </div>
      </section>
      <section className="section section-3 relative h-screen overflow-hidden rounded-2xl shadow-2xl ring-1 ring-emerald-900/25">
        <Image
          src={SECTION_BACKGROUNDS[2].src}
          alt={SECTION_BACKGROUNDS[2].alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-emerald-950/60 via-green-950/30 to-zinc-950/65"
          aria-hidden
        />
        <div className="section-inner relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-emerald-50">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/80">
            {SECTION_BACKGROUNDS[2].subtitle}
          </p>
          <h2 className="font-serif text-5xl font-light tracking-tight drop-shadow-lg sm:text-6xl md:text-7xl">
            {SECTION_BACKGROUNDS[2].label}
          </h2>
        </div>
      </section>
      <section className="section section-4 relative h-screen overflow-hidden rounded-2xl shadow-2xl ring-1 ring-fuchsia-900/20">
        <Image
          src={SECTION_BACKGROUNDS[3].src}
          alt={SECTION_BACKGROUNDS[3].alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-fuchsia-950/45 via-rose-950/30 to-violet-950/70"
          aria-hidden
        />
        <div className="section-inner relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-rose-50">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-rose-200/85">
            {SECTION_BACKGROUNDS[3].subtitle}
          </p>
          <h2 className="font-serif text-5xl font-light tracking-tight drop-shadow-lg sm:text-6xl md:text-7xl">
            {SECTION_BACKGROUNDS[3].label}
          </h2>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
