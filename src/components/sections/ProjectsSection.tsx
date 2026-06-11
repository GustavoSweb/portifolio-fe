"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SVG_CX = 747;
const SVG_CY = 444;

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const els = Array.from(
      svgRef.current?.querySelectorAll<SVGGraphicsElement>(".polygon") ?? [],
    );
    if (!els.length) return;

    // Estado inicial imediato — garante transparência antes do trigger
    gsap.set(els, {
      opacity: 0,
      x: (_i: number, el: SVGGraphicsElement) => (el.getBBox().x + el.getBBox().width  / 2 - SVG_CX) * 0.5,
      y: (_i: number, el: SVGGraphicsElement) => (el.getBBox().y + el.getBBox().height / 2 - SVG_CY) * 0.5,
    });
    gsap.set(".projects-label", { x: -60, opacity: 0 });

    // Animação scrub: polígonos voam para a posição final
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=900",
        scrub: 1.5,
      },
    });

    tl.to(els, { x: 0, y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power2.out" }, 0);
    tl.to(".projects-label", { x: 0, opacity: 1, duration: 0.6 }, 0);

    // Hover: só fill + scale no polígono hovered — sem tocar em opacity (conflita com scrub)
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          fill: "#ffffff",
          scale: 1.06,
          transformOrigin: "center center",
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          fill: "#F3F293",
          scale: 1,
          transformOrigin: "center center",
          duration: 0.35,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-bg mt-32"
      style={{ minHeight: "100svh" }}
    >
      <div className="max-w-[1728px] mx-auto pl-[55px] flex items-center gap-[14px] h-[888px]">

        {/* Vertical "PROJETOS" label */}
        <div className="projects-label shrink-0 flex items-center justify-center w-[48px] h-[201px]">
          <p className="font-condensed wdth-condensed font-medium italic text-[clamp(1.5rem,2.8vw,3rem)] text-white uppercase tracking-[-0.25px] whitespace-nowrap -rotate-90">
            PROJETOS
          </p>
        </div>

        {/* Mosaic inline SVG — cada path é um polígono animável */}
        <div className="relative flex-1 h-[888px]">
          <svg
            ref={svgRef}
            viewBox="0 0 1494 888"
            width="100%"
            height="100%"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="polygon" d="M1224.92 744L1168 722.645L1209.11 657L1285 687.845L1224.92 744Z"                                                                             fill="#F3F293" />
            <path className="polygon" d="M1113 256.969L1218.34 446L1407 425.522L1384.2 197.109L1180.6 64L1113 256.969Z"                                                               fill="#F3F293" />
            <path className="polygon" d="M1163 433.155L1007.25 474L975 225L1085.13 233.64L1163 433.155Z"                                                                              fill="#F3F293" />
            <path className="polygon" d="M879.308 533L715 533L845.503 3L920.975 31.3507L965 398.334L879.308 533Z"                                                                     fill="#F3F293" />
            <path className="polygon" d="M689.011 846L590.362 728.411L573 557.946L803.443 554L865 761.557L689.011 846Z"                                                               fill="#F3F293" />
            <path className="polygon" d="M741.47 271L689 219.025L726.59 145L754 154.45L741.47 271Z"                                                                                   fill="#F3F293" />
            <path className="polygon" d="M573 773.873L300 888L526.582 559L573 773.873Z"                                                                                               fill="#F3F293" />
            <path className="polygon" d="M452.293 600L400 568.312L444.488 539L496 563.558L452.293 600Z"                                                                               fill="#F3F293" />
            <path className="polygon" d="M366.555 568L316 530.8L338.908 506L350.756 506L410 525.375L366.555 568Z"                                                                    fill="#F3F293" />
            <path className="polygon" d="M286.323 862L20 763.524L20 550.817L277.656 539L425 626.446L286.323 862Z"                                                                     fill="#F3F293" />
            <path className="polygon" d="M303.347 510.918L6.287 518L0 363.77L289.987 230L356 408.623L356 433.016L303.347 510.918Z"                                                    fill="#F3F293" />
            <path className="polygon" d="M664.209 524L390.508 496.456L370 263.514L647.645 210L721 332.767L664.209 524Z"                                                               fill="#F3F293" />
            <path className="polygon" d="M508 200.089C470.454 205.059 394.89 215 393 215L456.801 153L508 200.089Z"                                                                    fill="#F3F293" />
            <path className="polygon" d="M678 156.169L533 168L601.189 0L678 156.169Z"                                                                                                 fill="#F3F293" />
            <path className="polygon" d="M1012.72 805L890.717 744.5L849 557.5L1107.96 475L1130 706L1012.72 805Z"                                                                      fill="#F3F293" />
            <path className="polygon" d="M1313.37 677C1268.08 663.077 1176.4 635.23 1172 635.23L1196.35 488.643L1424.1 465L1494 604.494L1494 623.409L1435.88 677L1313.37 677Z"        fill="#F3F293" />
          </svg>
        </div>
      </div>
    </section>
  );
}
