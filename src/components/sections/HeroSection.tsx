"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-letter", { y: "110%", opacity: 0, stagger: 0.05, duration: 0.85 })
        .from(".hero-sub", { x: -24, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-social", { y: 16, opacity: 0, stagger: 0.08, duration: 0.4 }, "-=0.2")
        .from(".hero-photo", { scale: 0.96, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.9")
        .from(
          ".hero-arrow",
          { scale: 0.7, opacity: 0, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-bg relative overflow-hidden min-h-svh">
      <div className="content-wrap py-16 min-h-svh grid grid-cols-[880fr_784fr] gap-0 relative z-10">
        {/* ── Left column ── */}
        <div className="flex flex-col justify-between pb-4">
          <div>
            <h1
              aria-label="Gustavo"
              className="font-display text-[clamp(3rem,10.2vw,11rem)] leading-none tracking-[-0.25px] uppercase whitespace-nowrap"
            >
              {"GUSTAVO".split("").map((l, i) => (
                <span key={i} className="inline-block overflow-hidden leading-none align-bottom">
                  <span className="hero-letter inline-block">{l}</span>
                </span>
              ))}
            </h1>

            <div className="hero-sub flex items-center gap-3 mt-4">
              <p className="font-condensed wdth-condensed font-normal italic text-[clamp(0.9rem,1.4vw,1.5rem)] text-white/85 uppercase tracking-[-0.25px]">
                Desenvolvedor FULLSTACK
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="hero-desc font-sans font-medium text-base text-white/80 max-w-[308px] leading-6 tracking-[0.15px] mb-8">
                A imaginação é mais importante que o conhecimento — construo experiências digitais
                com foco em performance e design.
              </p>

              <div className="flex gap-4 items-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social flex items-center justify-center overflow-hidden w-[94px] h-[94px] bg-orange"
                >
                  <Image src="/icon-github.png" alt="GitHub" width={70} height={69} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social flex  items-center justify-center overflow-hidden w-[94px] h-[94px] bg-orange"
                >
                  <Image src="/icon-linkedin.png" alt="LinkedIn" width={82} height={71} />
                </a>
                <a
                  href="mailto:gustavord@email.com"
                  className="hero-social flex items-center justify-center overflow-hidden w-[94px] h-[94px] bg-orange"
                >
                  <Image src="/icon-gmail.svg" alt="Email" width={71} height={53} />
                </a>
              </div>
            </div>

            <div className="hero-arrow">
              <Image
                src="/arrow-hero.svg"
                alt="Ver projetos"
                width={400}
                height={324}
                className="w-[clamp(180px,16vw,280px)] h-auto"
              />
            </div>
          </div>
        </div>

        {/* ── Right column: Photo ── */}
        <div className="hero-photo relative rounded-3xl overflow-hidden">
          <Image
            src="/photo.jpg"
            alt="Gustavo Rodrigues"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1728px) 45vw, 784px"
          />
        </div>
      </div>
    </section>
  );
}
