"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SKILL_ICONS: { src: string; alt: string; overlay?: boolean; inset?: string }[] = [
  { src: "/skill-js.svg", alt: "JavaScript" },
  { src: "/skill-react.svg", alt: "React" },
  { src: "/skill-next.svg", alt: "Next.js" },
  { src: "/skill-vue.svg", alt: "Vue" },
  { src: "/skill-docker.svg", alt: "Docker" },
  { src: "/skill-k8s.svg", alt: "Kubernetes" },
  { src: "/skill-ts.svg", alt: "TypeScript" },
  { src: "/skill-aws.svg", alt: "AWS" },
  {
    src: "/skill-figma-fill.svg",
    alt: "Figma",
    overlay: true,
    inset: "10.94% 24.08% 10.94% 23.83%",
  },
  { src: "/skill-cloudflare-fill.svg", alt: "Cloudflare", overlay: true, inset: "10.94%" },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-title-letter", {
        y: "110%",
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });

      gsap.from(".about-desc", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-desc", start: "top 85%" },
      });

      gsap.from(".about-circle", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="about-section" className="w-full relative bg-bg snap-start">
      <div className="content-wrap pb-10 lg:pb-[160px]">
        <div className="relative grid grid-cols-1 lg:grid-cols-[800fr_800fr] lg:min-h-[504px]">
          <div className="relative flex flex-col justify-end p-4 bg-bg border border-teal min-h-[240px] lg:min-h-0">
            <div className="dots-pattern absolute inset-0 opacity-30 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4">
              <Image
                src="/about-icon-3.svg"
                alt=""
                width={96}
                height={96}
                className="transform translate-y-3"
              />
              <Image src="/about-icon-1.svg" alt="" width={72} height={72} />
              <Image src="/about-icon-2.svg" alt="" width={73} height={73} />
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden bg-orange p-8 lg:p-16">
            <div className="flex">
              <h2 className="font-display text-[clamp(3rem,7.4vw,8rem)] text-bg leading-none tracking-[-0.25px] whitespace-nowrap">
                {"SOBRE".split("").map((l, i) => (
                  <span key={i} className="inline-block overflow-hidden leading-none align-bottom">
                    <span className="about-title-letter inline-block">{l}</span>
                  </span>
                ))}
              </h2>

              <div className="overflow-hidden mt-8">
                <div className="animate-marquee flex gap-4 w-max">
                  {[...SKILL_ICONS, ...SKILL_ICONS].map(({ src, alt, overlay, inset }, i) => (
                    <div key={`${alt}-${i}`} className="relative shrink-0 w-[50px] h-[50px]">
                      {overlay ? (
                        <>
                          <Image src="/skill-icon-bg.svg" alt="" fill className="object-contain" />
                          <div className="absolute" style={{ inset }}>
                            <Image src={src} alt={alt} fill className="object-contain" />
                          </div>
                        </>
                      ) : (
                        <Image src={src} alt={alt} fill className="object-contain" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-8" />

            <p className="about-desc self-end text-right font-sans font-semibold text-base text-bg max-w-[308px] tracking-[0.15px] leading-6">
              Desenvolvedor fullstack com foco em criar aplicações modernas, escaláveis e bem
              projetadas. Trabalho com React, Next.js, Node.js e infraestrutura em nuvem.
            </p>
          </div>

          <div className="about-circle pointer-events-none hidden lg:block absolute -bottom-[147px] left-1/2 -translate-x-1/2 w-[294px] h-[294px] z-10">
            <div className="spin-slow relative w-full h-full rounded-full bg-bg flex items-center justify-center overflow-hidden">
              <Image
                src="/about-circle-arrow.svg"
                alt=""
                width={115}
                height={89}
                className="relative z-10"
              />
              <svg
                viewBox="0 0 294 294"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <path id="cd-arc" d="M 233,64 A 120,120 0 0,1 236,227" fill="none" />
                </defs>
                <text fill="white" fontSize="11" letterSpacing="5">
                  <textPath href="#cd-arc">CREATIVE DESIGN</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
