"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["Inicio", "Sobre Mim", "Projetos", "Artigos"];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
    },
    { scope: containerRef },
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={containerRef}
      className="w-full bg-[rgba(0,52,39,0.95)] relative overflow-hidden mt-16 lg:mt-[128px]"
    >
      <div className="absolute pointer-events-none left-[43%] top-[52px] w-[328px] h-[215px] hidden lg:block">
        <Image src="/vector-waves.svg" alt="" width={328} height={215} />
      </div>

      <div className="content-wrap pt-10 lg:pt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-[244px_200px_1fr_auto] gap-8 lg:gap-20 items-start">
          {/* Brand — full width on mobile */}
          <div className="footer-col col-span-2 lg:col-span-1">
            <p className="font-display text-2xl text-white tracking-[-0.25px] uppercase whitespace-nowrap mb-4">
              GUSTAVO
            </p>
            <p className="font-sans font-medium text-base text-white/80 leading-6 tracking-[0.15px] max-w-[244px] mb-8">
              Desenvolvedor fullstack apaixonado por criar experiências digitais que unem design e
              tecnologia de alto desempenho.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/GustavoSweb"
                className="flex items-center justify-center overflow-hidden w-[50px] h-[50px] bg-orange"
              >
                <Image src="/icon-github.svg" alt="GitHub" width={28} height={27} />
              </a>
              <a
                href="https://www.linkedin.com/in/gustavo-rodrigues-5a7551252/"
                className="flex items-center justify-center overflow-hidden w-[50px] h-[50px] bg-orange"
              >
                <Image src="/icon-linkedin.svg" alt="LinkedIn" width={28} height={24} />
              </a>
              <a
                href="mailto:gustavodasilvama10@gmail.com"
                className="flex items-center justify-center overflow-hidden w-[50px] h-[50px] bg-orange"
              >
                <Image src="/icon-gmail.svg" alt="Email" width={32} height={24} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <p className="font-display text-2xl text-white tracking-[-0.25px] uppercase whitespace-nowrap mb-6 lg:mb-8">
              NAVEGAÇÃO
            </p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-base text-white/70 tracking-[-0.25px] capitalize hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Spacer — desktop only */}
          <div className="hidden lg:block" />

          {/* Back-to-top */}
          <div className="footer-col self-start">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center rounded-lg overflow-hidden hover:opacity-90 transition-opacity w-[67px] h-[67px] bg-transparent"
              aria-label="Voltar ao topo"
            >
              <Image src="/footer-arrow-up.svg" alt="Voltar ao topo" width={67} height={67} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/12 mt-10 lg:mt-20 py-6 flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
          <p className="font-sans text-sm lg:text-base text-white/40 tracking-[-0.25px] uppercase">
            © 2026 Gustavo da Silva Rodrigues.
          </p>
          <p className="font-sans text-sm lg:text-base text-white/40 tracking-[-0.25px]">
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
