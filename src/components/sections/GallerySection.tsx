"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".gallery-block", {
        scale: 0.94,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full">
      <div className="content-wrap">
        {/* Mobile: 2-col top row + full-width blocks below; Desktop: original 3-col 2-row grid */}
        <div className="grid grid-cols-2 lg:grid-cols-[533fr_534fr_533fr] lg:grid-rows-[495px_494px] lg:h-[989px] overflow-hidden rounded-[4px]">
          <div className="gallery-block bg-lime-soft h-[160px] lg:h-auto" />
          <div className="gallery-block bg-orange h-[160px] lg:h-auto" />
          <div className="gallery-block bg-[#003427] col-span-2 h-[260px] lg:col-auto lg:h-auto lg:row-span-2" />
          <div className="gallery-block bg-amber col-span-2 h-[160px] lg:h-[494px]" />
        </div>
      </div>
    </section>
  );
}
