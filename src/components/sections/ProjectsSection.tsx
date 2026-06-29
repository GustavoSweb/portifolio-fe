"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/data/projects";
import ProjectModal from "@/components/ProjectModal";
import { useTranslations } from "next-intl";
import { useHeaderStore } from "@/store/useHeaderStore";

gsap.registerPlugin(ScrollTrigger);

const SVG_CX = 747;
const SVG_CY = 444;

// Bounding boxes for each project polygon (in SVG viewBox coordinates 0 0 1494 888)
// Used to correctly position the cover image pattern inside each polygon
const PROJECT_BBOXES = [
  { x: 830, y: 70, w: 294, h: 382 }, // p0
  { x: 613, y: 3, w: 614, h: 530 }, // p1
  { x: 583, y: 554, w: 492, h: 292 }, // p2
  { x: 10, y: 269, w: 373, h: 329 }, // p3
  { x: 20, y: 539, w: 405, h: 323 }, // p4
  { x: 0, y: 245, w: 356, h: 288 }, // p5
  { x: 370, y: 240, w: 376, h: 288 }, // p6
  { x: 860, y: 485, w: 381, h: 330 }, // p7
  { x: 1172, y: 465, w: 300, h: 297 }, // p8
] as const;

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const projectTitleRef = useRef<HTMLParagraphElement>(null);
  const t = useTranslations("Projects");
  const setIsVisible = useHeaderStore((s) => s.setIsVisible);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(
    () => {
      const els = Array.from(
        svgRef.current?.querySelectorAll<SVGGraphicsElement>(".polygon") ?? [],
      );
      if (!els.length) return;

      els.forEach((el) => {
        const attr = el.getAttribute("data-project");
        if (attr === null) return;
        const project = PROJECTS[parseInt(attr)];
        if (!project) return;
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          setActiveProject(project);
          if (projectTitleRef.current) gsap.set(projectTitleRef.current, { opacity: 0 });
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(els, {
          opacity: 0,
          x: (_i: number, el: SVGGraphicsElement) =>
            (el.getBBox().x + el.getBBox().width / 2 - SVG_CX) * 0.5,
          y: (_i: number, el: SVGGraphicsElement) =>
            (el.getBBox().y + el.getBBox().height / 2 - SVG_CY) * 0.5,
        });
        gsap.set(".projects-label", { x: -60, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: "top top",
            end: "+=900",
            scrub: 1.5,
            onEnter: (self) => {
              // Scrolling DOWN: fast-forward through pin (0.4s) so user doesn't get stuck
              setIsVisible(false);
              const endPos = self.end;
              requestAnimationFrame(() => {
                (window as any).lenis?.scrollTo(endPos, {
                  duration: 0.4,
                  easing: (t: number) => t,
                });
              });
            },
            onEnterBack: () => setIsVisible(false),
            onLeave: () => {
              setIsVisible(true);
              // After fast-forwarding through the pin, glide smoothly to blog
              requestAnimationFrame(() => {
                const blog = document.getElementById("blog-section");
                if (blog) (window as any).lenis?.scrollTo(blog, { duration: 1.0 });
              });
            },
            onLeaveBack: () => setIsVisible(true),
            onUpdate: (self) => setIsScrolled(self.progress > 0.01),
          },
        });

        tl.to(els, { x: 0, y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power2.out" }, 0);
        tl.to(".projects-label", { x: 0, opacity: 1, duration: 0.6 }, 0);

        const svg = svgRef.current;
        const onMouseMove = (e: MouseEvent) => {
          if (projectTitleRef.current) {
            projectTitleRef.current.style.left = `${e.clientX}px`;
            projectTitleRef.current.style.top = `${e.clientY}px`;
          }
        };
        svg?.addEventListener("mousemove", onMouseMove);

        els.forEach((el) => {
          const attr = el.getAttribute("data-project");
          const isProject = attr !== null;
          const project = attr !== null ? PROJECTS[parseInt(attr)] : undefined;

          el.addEventListener("mouseenter", () => {
            if (isProject && project && projectTitleRef.current) {
              projectTitleRef.current.textContent = project.title;
              gsap.to(projectTitleRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              });
            }
            gsap.to(el, {
              filter: "drop-shadow(0px 12px 28px rgba(0,0,0,0.5))",
              scale: 1.06,
              transformOrigin: "center center",
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          el.addEventListener("mouseleave", () => {
            if (isProject && projectTitleRef.current) {
              gsap.to(projectTitleRef.current, { opacity: 0, duration: 0.15 });
            }
            gsap.to(el, {
              filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              scale: 1,
              transformOrigin: "center center",
              duration: 0.35,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          });
        });

        return () => {
          svg?.removeEventListener("mousemove", onMouseMove);
        };
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(els, {
          opacity: 0,
          scale: 0.92,
          stagger: 0.04,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="projects-section"
      className="w-full bg-bg mt-16 lg:mt-32 min-h-[60vw] lg:min-h-svh relative"
    >
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <p
        ref={projectTitleRef}
        className="hidden lg:block fixed bg-orange text-bg font-condensed wdth-condensed font-medium italic text-lg uppercase tracking-[0.2em] px-3 py-1 opacity-0 pointer-events-none z-[60]"
        style={{ transform: "translate(18px, -50%)" }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center max-w-[1728px] mx-auto px-5 md:px-8 lg:pl-[55px] lg:pr-0 gap-4 lg:gap-[14px] py-8 lg:py-0 lg:h-[888px]">
        <div className="projects-label shrink-0 flex items-center lg:justify-center w-auto lg:w-[48px] lg:h-[201px]">
          <p className="font-condensed wdth-condensed font-medium italic text-[clamp(1.5rem,2.8vw,3rem)] text-white uppercase tracking-[-0.25px] whitespace-nowrap lg:-rotate-90">
            {t("title")}
          </p>
        </div>

        <div className="relative flex-1 w-full lg:h-[888px]" style={{ aspectRatio: "1494/888" }}>
          <svg
            ref={svgRef}
            viewBox="0 0 1494 888"
            width="100%"
            height="100%"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {PROJECTS.map((p, i) =>
                p.cover ? (
                  <pattern
                    key={p.id}
                    id={`cover-${i}`}
                    patternUnits="userSpaceOnUse"
                    x={PROJECT_BBOXES[i].x}
                    y={PROJECT_BBOXES[i].y}
                    width={PROJECT_BBOXES[i].w}
                    height={PROJECT_BBOXES[i].h}
                  >
                    <rect width={PROJECT_BBOXES[i].w} height={PROJECT_BBOXES[i].h} fill="#F3F293" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <image
                      href={p.cover}
                      width={PROJECT_BBOXES[i].w}
                      height={PROJECT_BBOXES[i].h}
                      preserveAspectRatio="xMidYMid slice"
                      opacity="0.28"
                    />
                  </pattern>
                ) : null,
              )}
            </defs>
            <path
              className="polygon"
              d="M1224.92 744L1168 722.645L1209.11 657L1285 687.845L1224.92 744Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M1163 433.155L1007.25 474L975 225L1085.13 233.64L1163 433.155Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M741.47 271L689 219.025L726.59 145L754 154.45L741.47 271Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M452.293 600L400 568.312L444.488 539L496 563.558L452.293 600Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M366.555 568L316 530.8L338.908 506L350.756 506L410 525.375L366.555 568Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M508 200.089C470.454 205.059 394.89 215 393 215L456.801 153L508 200.089Z"
              fill="#F3F293"
            />
            <path
              className="polygon"
              d="M678 156.169L533 168L601.189 0L678 156.169Z"
              fill="#F3F293"
            />

            <path
              className="polygon"
              data-project="0"
              d="M1113 256.969L1218.34 446L1407 425.522L1384.2 197.109L1180.6 64L1113 256.969Z"
              fill={PROJECTS[0].cover ? "url(#cover-0)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="1"
              d="M879.308 533L715 533L845.503 3L920.975 31.3507L965 398.334L879.308 533Z"
              fill={PROJECTS[1].cover ? "url(#cover-1)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="2"
              d="M689.011 846L590.362 728.411L573 557.946L803.443 554L865 761.557L689.011 846Z"
              fill={PROJECTS[2].cover ? "url(#cover-2)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="3"
              d="M573 773.873L300 888L526.582 559L573 773.873Z"
              fill={PROJECTS[3].cover ? "url(#cover-3)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="4"
              d="M286.323 862L20 763.524L20 550.817L277.656 539L425 626.446L286.323 862Z"
              fill={PROJECTS[4].cover ? "url(#cover-4)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="5"
              d="M303.347 510.918L6.287 518L0 363.77L289.987 230L356 408.623L356 433.016L303.347 510.918Z"
              fill={PROJECTS[5].cover ? "url(#cover-5)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="6"
              d="M664.209 524L390.508 496.456L370 263.514L647.645 210L721 332.767L664.209 524Z"
              fill={PROJECTS[6].cover ? "url(#cover-6)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="7"
              d="M1012.72 805L890.717 744.5L849 557.5L1107.96 475L1130 706L1012.72 805Z"
              fill={PROJECTS[7].cover ? "url(#cover-7)" : "#F3F293"}
            />
            <path
              className="polygon"
              data-project="8"
              d="M1313.37 677C1268.08 663.077 1176.4 635.23 1172 635.23L1196.35 488.643L1424.1 465L1494 604.494L1494 623.409L1435.88 677L1313.37 677Z"
              fill={PROJECTS[8].cover ? "url(#cover-8)" : "#F3F293"}
            />
          </svg>
        </div>
      </div>

      {!isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none flex flex-col items-center justify-end pb-4 gap-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="animate-bounce opacity-50"
          >
            <path
              d="M10 4v12M10 16l-4-4M10 16l4-4"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]">scroll</span>
        </div>
      )}
    </section>
  );
}
