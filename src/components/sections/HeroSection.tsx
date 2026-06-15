"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import {useTranslations} from 'next-intl';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Hero');

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
      <div className="content-wrap py-10 lg:py-16 !pt-0 min-h-svh flex flex-col lg:grid lg:grid-cols-[880fr_784fr] gap-6 lg:gap-0 relative z-10">
        <div className="hero-photo relative rounded-2xl lg:rounded-3xl overflow-hidden h-[260px] order-1 lg:order-2 lg:h-auto">
          <Image
            src="/photo.jpg"
            alt="Gustavo Rodrigues"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1023px) 100vw, (max-width: 1728px) 45vw, 784px"
          />
        </div>

        <div className="flex flex-col justify-between pb-4 order-2 lg:order-1">
          <div>
            <h1
              aria-label={t('title')}
              className="font-display text-[clamp(3rem,10.2vw,11rem)] leading-none tracking-[-0.25px] uppercase whitespace-nowrap"
            >
              {t('title').split("").map((l, i) => (
                <span key={i} className="inline-block overflow-hidden leading-none align-bottom">
                  <span className="hero-letter inline-block">{l}</span>
                </span>
              ))}
            </h1>

            <div className="hero-sub flex items-center gap-3 mt-4">
              <p className="font-condensed wdth-condensed font-normal italic text-[clamp(0.9rem,1.4vw,1.5rem)] text-white/85 uppercase tracking-[-0.25px]">
                {t('subtitle')}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-8 lg:mt-0 lg:flex-row lg:justify-between lg:items-end">
            <div>
              <p className="hero-desc font-sans font-medium text-base text-white/80 max-w-[308px] leading-6 tracking-[0.15px] mb-6 lg:mb-8">
                {t('description')}
              </p>

              <div className="flex gap-3 lg:gap-4 items-start">
                <a
                  href="https://github.com/GustavoSweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social flex items-center justify-center overflow-hidden w-16 h-16 lg:w-[94px] lg:h-[94px] bg-orange"
                >
                  <Image
                    src="/icon-github.svg"
                    alt="GitHub"
                    width={44}
                    height={43}
                    className="lg:w-[70px] lg:h-[69px]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/gustavo-rodrigues-5a7551252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social flex items-center justify-center overflow-hidden w-16 h-16 lg:w-[94px] lg:h-[94px] bg-orange"
                >
                  <Image
                    src="/icon-linkedin.svg"
                    alt="LinkedIn"
                    width={50}
                    height={44}
                    className="lg:w-[82px] lg:h-[71px]"
                  />
                </a>
                <a
                  href="mailto:gustavodasilvama10@gmail.com"
                  className="hero-social flex items-center justify-center overflow-hidden w-16 h-16 lg:w-[94px] lg:h-[94px] bg-orange"
                >
                  <Image
                    src="/icon-gmail.svg"
                    alt="Email"
                    width={44}
                    height={33}
                    className="lg:w-[71px] lg:h-[53px]"
                  />
                </a>
              </div>
            </div>

            <div className="hero-arrow hidden lg:block">
              <Image
                src="/arrow-hero.svg"
                alt={t('cta')}
                width={400}
                height={324}
                className="w-[clamp(180px,16vw,280px)] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
