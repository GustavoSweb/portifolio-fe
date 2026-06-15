"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { type Project } from "@/data/projects";

const ICON_MAP: Record<string, string> = {
  JavaScript: "/skill-js.svg",
  TypeScript: "/skill-ts.svg",
  React: "/skill-react.svg",
  "Next.js": "/skill-next.svg",
  Vue: "/skill-vue.svg",
  Docker: "/skill-docker.svg",
  Kubernetes: "/skill-k8s.svg",
  AWS: "/skill-aws.svg",
};

type PanelSize = "half" | "full";

const PANEL_SIZE: Record<
  PanelSize,
  { height: string; left: string; right: string; duration: number }
> = {
  half: { height: "50dvh", left: "5%", right: "5%", duration: 0.4 },
  full: { height: "100dvh", left: "0%", right: "0%", duration: 0.45 },
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExpandedRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const [displayed, setDisplayed] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const setExpandedState = (value: boolean) => {
    isExpandedRef.current = value;
    setIsExpanded(value);
  };

  const isAtTop = () => (contentRef.current?.scrollTop ?? 0) === 0;

  const setPanelSize = (size: PanelSize) => {
    const wantFull = size === "full";
    if (isExpandedRef.current === wantFull || isAnimatingRef.current) return;
    if (!wantFull && !isAtTop()) return;

    isAnimatingRef.current = true;
    setExpandedState(wantFull);
    if (!wantFull && contentRef.current) contentRef.current.scrollTop = 0;

    gsap.to(panelRef.current, {
      ...PANEL_SIZE[size],
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  };

  useEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (project) {
      setDisplayed(project);
      setExpandedState(false);
      isAnimatingRef.current = false;
      document.body.style.overflow = "hidden";

      gsap.set(panelRef.current, { ...PANEL_SIZE.half, y: "100%" });
      gsap.set(backdropRef.current, { pointerEvents: "auto", opacity: 0 });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(panelRef.current, { y: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, { y: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(backdropRef.current, { pointerEvents: "none" });
          setDisplayed(null);
          setExpandedState(false);
        },
      });
    }
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isExpandedRef.current) setPanelSize("half");
      else onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (e: WheelEvent) => {
      if (!isExpandedRef.current) {
        e.preventDefault();
        if (e.deltaY > 0) setPanelSize("full");
      } else if (isAtTop() && e.deltaY < 0) {
        e.preventDefault();
        setPanelSize("half");
      }
    };

    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (!isExpandedRef.current && dy > 50) setPanelSize("full");
      else if (isExpandedRef.current && dy < -50 && isAtTop()) setPanelSize("half");
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      panel.removeEventListener("wheel", onWheel);
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/60 z-50 opacity-0"
      style={{ pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="absolute bottom-0 bg-orange overflow-hidden"
        style={{ height: "50dvh", left: "5%", right: "5%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end ">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className=" w-[72px] h-[72px] lg:w-[87px] lg:h-[87px] bg-[#ed5531] flex items-center justify-center z-20"
          >
            <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
              <path d="M9 9L35 35M35 9L9 35" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div
          ref={contentRef}
          className="h-full overflow-y-auto pl-4 lg:pl-16 pt-8 lg:pt-10 pr-[84px] lg:pr-[calc(4rem+87px+1rem)]"
          style={{ overscrollBehavior: "contain" }}
        >
          {displayed && (
            <div className="relative">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                viewBox="0 0 1472 2124"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 1095 434 C 1200 680, 380 820, 560 1086 C 730 1310, 980 1480, 810 1756"
                  stroke="#004634"
                  strokeWidth="6"
                  strokeDasharray="22 14"
                  strokeLinecap="round"
                />
                <rect
                  x="1063"
                  y="418"
                  width="32"
                  height="32"
                  fill="#004634"
                  transform="rotate(45 1079 434)"
                />
                <rect
                  x="528"
                  y="1070"
                  width="32"
                  height="32"
                  fill="#004634"
                  transform="rotate(45 544 1086)"
                />
                <rect
                  x="778"
                  y="1740"
                  width="32"
                  height="32"
                  fill="#004634"
                  transform="rotate(45 794 1756)"
                />
              </svg>

              <div className="">
                {displayed.date && (
                  <p className="font-sans text-sm font-medium text-white/70 mb-2 tracking-wide">
                    {displayed.date}
                  </p>
                )}

                <h2 className="font-display text-[clamp(2.5rem,8.7vw,8rem)] text-bg leading-[0.88] tracking-tight uppercase">
                  {displayed.title}.{" "}
                  <sup className="text-[0.3em] align-super relative -top-1 font-sans font-normal">
                    ©
                  </sup>
                </h2>

                <div className="flex gap-2 mt-4 lg:mt-5 mb-10 lg:mb-16">
                  {displayed.tags.slice(0, 5).map((tag) => {
                    const src = ICON_MAP[tag];
                    if (!src) return null;
                    return (
                      <div
                        key={tag}
                        className="relative w-[47px] h-[47px] shrink-0 flex items-center justify-center"
                      >
                        <Image
                          src={src}
                          alt={tag}
                          width={47}
                          height={47}
                          className="object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row mb-12 lg:mb-20">
                <div className="w-full bg-[#e5512d] aspect-[839/416] lg:ml-[4.35%] lg:w-[57%] shrink-0" />
                <div className="flex-1 px-4 lg:pl-10 lg:pr-[4.35%] pt-5 lg:pt-0 flex items-start lg:items-center">
                  <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px]">
                    {displayed.description}
                  </p>
                </div>
              </div>

              <div
                className="hidden lg:block absolute pointer-events-none"
                style={{ left: 0, top: "39.4%", width: "29.6%", height: "26.6%" }}
                aria-hidden="true"
              >
                <div className="dots-pattern w-full h-full opacity-20" />
              </div>

              <div className="flex flex-col mb-12 lg:mb-20">
                <div className="w-full bg-[#e5512d] aspect-[679/337] lg:ml-[49.5%] lg:w-[46.1%]" />
                <div className="px-4 lg:pl-0 lg:ml-[62.2%] pt-4 lg:w-[33.7%]">
                  <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px] text-right ml-auto">
                    {displayed.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col mb-12 lg:mb-16">
                <div className="w-full bg-[#e5512d] aspect-[679/337] lg:ml-[4.35%] lg:w-[46.1%]" />
                <div className="px-4 lg:pl-0 lg:ml-[29.3%] pt-4">
                  <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px]">
                    {displayed.description}
                  </p>
                </div>
              </div>

              <div className="relative h-24 lg:h-32 mb-0">
                <div
                  className="hidden lg:flex absolute items-end gap-0"
                  style={{ right: "4.35%", bottom: 0 }}
                >
                  <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0">
                    <polygon points="48,4 92,92 4,92" fill="#f3f293" />
                  </svg>
                  <div className="relative w-[72px] h-[72px] shrink-0">
                    <div className="absolute inset-0 bg-teal" />
                    <div className="absolute rounded-full bg-amber" style={{ inset: "16.7%" }} />
                  </div>
                  <div className="relative w-[73px] h-[73px] shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#0578c2]" />
                    <svg className="absolute" style={{ inset: "15%" }} viewBox="0 0 44 44">
                      <polygon points="22,2 42,42 2,42" fill="#f3f293" />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="hidden lg:block absolute pointer-events-none"
                style={{ right: 0, top: "82.7%", width: "12.2%", height: "17.3%" }}
                aria-hidden="true"
              >
                <div className="dots-pattern w-full h-full opacity-20" />
              </div>

              <div className="px-4 lg:px-16 pb-16 flex flex-wrap gap-3 mt-4">
                {displayed.url && displayed.url !== "#" && (
                  <a
                    href={displayed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bg text-white font-sans font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    {t("viewProject", { defaultMessage: "Ver Projeto" })}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
                {displayed.repo && displayed.repo !== "#" && (
                  <a
                    href={displayed.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-bg text-bg font-sans font-semibold text-sm uppercase tracking-wider hover:bg-bg/10 transition-colors"
                  >
                    GitHub
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        {!isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none flex flex-col items-center justify-end pb-4 gap-1"
            style={{ background: "linear-gradient(to top, #f96440 25%, transparent)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="animate-bounce opacity-50"
            >
              <path
                d="M10 4v12M10 16l-4-4M10 16l4-4"
                stroke="#004634"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-sans text-[10px] text-bg/40 uppercase tracking-[0.2em]">
              scroll
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
