"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "Next.js Otimização",
    excerpt:
      "Técnicas avançadas para otimizar aplicações Next.js em produção — bundle splitting, image optimization e streaming SSR.",
  },
  {
    title: "Arquitetura Limpa com Node.js",
    excerpt:
      "Como estruturar APIs Node.js escaláveis aplicando os princípios de Clean Architecture e Domain-Driven Design.",
  },
  {
    title: "Docker e Kubernetes na Prática",
    excerpt:
      "Containerização e orquestração: um guia prático para fazer deploy de aplicações fullstack em produção.",
  },
  {
    title: "React Server Components",
    excerpt:
      "Entendendo o modelo de renderização híbrida do React 19 e como RSCs transformam a forma de construir UIs.",
  },
];

export default function BlogSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Pin only on desktop
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=600",
          pinSpacing: true,
        });
      });

      gsap.from(".blog-title", {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });

      gsap.from(".blog-item", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".blog-grid", start: "top 75%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-bg mt-16 lg:mt-32 lg:min-h-svh snap-start">
      <div className="content-wrap pb-12 lg:pb-20">
        <p className="blog-title font-condensed wdth-condensed font-medium italic text-[clamp(1.5rem,2.8vw,3rem)] text-white uppercase tracking-[-0.25px] whitespace-nowrap pb-6 lg:pb-8 pt-6">
          Blog
        </p>

        <div className="blog-grid grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          {ARTICLES.map((article, i) => (
            <a key={i} href="#" className="blog-item group flex flex-col gap-[10px] pb-[10px]">
              <div className="flex items-center justify-between gap-4 pb-[10px] border-b border-white/12">
                <div className="grid">
                  <p className="font-sans font-bold text-xl lg:text-2xl text-white tracking-[-0.25px] leading-none mb-2 transition-colors group-hover:text-lime">
                    {article.title}
                  </p>
                  <p className="font-sans text-sm lg:text-base text-white/60 tracking-[-0.25px] leading-[1.5] max-w-full lg:max-w-[365px]">
                    {article.excerpt}
                  </p>
                </div>
                <div className="shrink-0 w-[56px] h-[56px] lg:w-[98px] lg:h-[98px]">
                  <Image
                    src="/arrow-right.svg"
                    alt="Ler artigo"
                    width={98}
                    height={98}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
