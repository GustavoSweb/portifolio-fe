"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";
import Image from "next/image";
import { type Project } from "@/data/projects";
import { useHeaderStore } from "@/store/useHeaderStore";

gsap.registerPlugin(ScrollTrigger);

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

interface TrackPoint {
  x: number;
  y: number;
}

interface TrackState {
  width: number;
  height: number;
  d: string;
  points: TrackPoint[];
}

const EMPTY_TRACK: TrackState = { width: 0, height: 0, d: "", points: [] };

function buildTrackPath(points: TrackPoint[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    d += ` C ${p0.x + dx * 0.2} ${p0.y + dy * 0.65}, ${p0.x + dx * 0.8} ${p0.y + dy * 0.35}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function PointLabel({
  index,
  label,
  align = "left",
}: {
  index: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`flex items-center gap-3 mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <span className="font-condensed italic wdth-condensed text-xs text-bg/50 tracking-widest shrink-0">
        {index}
      </span>
      <span className="h-px w-8 bg-bg/30 shrink-0" />
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-bg/70">
        {label}
      </span>
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none" className="opacity-25">
        <rect x="4" y="4" width="48" height="48" rx="2" stroke="#004634" strokeWidth="2" />
        <circle cx="20" cy="20" r="5" stroke="#004634" strokeWidth="2" />
        <path
          d="M6 38L20 26L30 34L38 24L52 40"
          stroke="#004634"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isExpandedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const setIsVisible = useHeaderStore((s) => s.setIsVisible);

  const [displayed, setDisplayed] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [track, setTrack] = useState<TrackState>(EMPTY_TRACK);

  // Mobile screens carousel refs/state
  const screensRef = useRef<HTMLDivElement | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const el = screensRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(el.children) as HTMLElement[];
        if (!children.length) return;
        // gap from tailwind gap-4 = 16px
        const itemWidth = children[0].getBoundingClientRect().width + 16;
        const idx = Math.round(el.scrollLeft / itemWidth);
        setMobileIndex(Math.min(Math.max(idx, 0), children.length - 1));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [displayed?.type === "mobile" ? (displayed as any).screens : null]);

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
        ScrollTrigger.refresh();
      },
    });
  };

  useEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (project) {
      setDisplayed(project);
      setIsVisible(false);
      setExpandedState(false);
      isAnimatingRef.current = false;
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();

      gsap.set(panelRef.current, { ...PANEL_SIZE.half, y: "100%" });
      gsap.set(backdropRef.current, { pointerEvents: "auto", opacity: 0 });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(panelRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      document.body.style.overflow = "";
      (window as any).lenis?.start();
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
    const content = contentRef.current;
    if (!panel || !content) return;

    const onWheel = (e: WheelEvent) => {
      // stopPropagation prevents Lenis's window listener from firing
      e.stopPropagation();
      if (!isExpandedRef.current) {
        e.preventDefault();
        if (e.deltaY > 0) setPanelSize("full");
      } else if (isAtTop() && e.deltaY < 0) {
        e.preventDefault();
        setPanelSize("half");
      }
      // else: browser scrolls contentRef naturally
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

    // Attach wheel to contentRef + stopPropagation so Lenis (on window) never fires
    content.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      content.removeEventListener("wheel", onWheel);
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Measures the actual rendered position of each "joint" anchor and redraws
  // the dashed track through them, so the line never drifts from the content
  // it's supposed to connect (unlike a path hardcoded to fixed percentages).
  useLayoutEffect(() => {
    if (!displayed) return;

    const recalc = () => {
      const container = trackRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const points = anchorRefs.current
        .filter((el): el is HTMLSpanElement => !!el)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - containerRect.left,
            y: r.top + r.height / 2 - containerRect.top,
          };
        });

      setTrack({
        width: containerRect.width,
        height: containerRect.height,
        d: buildTrackPath(points),
        points,
      });
    };

    const raf = requestAnimationFrame(recalc);
    window.addEventListener("resize", recalc);
    document.fonts?.ready.then(recalc).catch(() => {});

    const ro = new ResizeObserver(recalc);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, [displayed]);

  // Reveals each section as the user scrolls through the modal's own
  // scroll container (not the page), since the panel manages its own scroll.
  useEffect(() => {
    if (!displayed || !contentRef.current) return;

    const elements = gsap.utils.toArray<HTMLElement>(".modal-reveal", contentRef.current);
    const tweens = elements.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: contentRef.current,
            start: "top 90%",
            once: true,
          },
        },
      ),
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [displayed]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/60 z-[70] opacity-0"
      style={{ pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="absolute bottom-0 bg-orange overflow-hidden"
        style={{ height: "50dvh", left: "5%", right: "5%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-0 right-0 z-20 w-[72px] h-[72px] lg:w-[87px] lg:h-[87px] bg-[#ed5531] flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
            <path d="M9 9L35 35M35 9L9 35" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <div
          ref={contentRef}
          className="h-full overflow-y-auto pl-4 lg:pl-16 pt-8 lg:pt-10 pr-[84px] lg:pr-[calc(4rem+87px+1rem)]"
          style={{ overscrollBehavior: "contain" }}
        >
          {displayed && (
            <div>
              <div className="relative">
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

              {displayed.type === "big" ? (
                <div ref={trackRef} className="relative">
                  <svg
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    width={track.width || undefined}
                    height={track.height || undefined}
                    viewBox={`0 0 ${track.width || 1} ${track.height || 1}`}
                    fill="none"
                    aria-hidden="true"
                  >
                    {track.d && (
                      <path
                        d={track.d}
                        stroke="#004634"
                        strokeWidth="3"
                        strokeDasharray="14 10"
                        strokeLinecap="round"
                      />
                    )}
                    {track.points.map((p, i) => (
                      <rect
                        key={i}
                        x={p.x - 13}
                        y={p.y - 13}
                        width="26"
                        height="26"
                        fill="#004634"
                        transform={`rotate(45 ${p.x} ${p.y})`}
                      />
                    ))}
                  </svg>

                  {/* Point 01 */}
                  <div className="modal-reveal flex flex-col lg:flex-row mb-12 lg:mb-20">
                    <div className="relative w-full bg-[#e5512d] aspect-[839/416] lg:ml-[4.35%] lg:w-[57%] shrink-0 overflow-hidden">
                      {displayed.stages[0].image ? (
                        <Image src={displayed.stages[0].image} alt={displayed.title} fill className="object-cover" />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>
                    <div className="relative flex-1 px-4 lg:pl-10 lg:pr-[4.35%] pt-5 lg:pt-0 flex flex-col items-start lg:justify-center">
                      <span
                        ref={(el) => { anchorRefs.current[0] = el; }}
                        className="hidden lg:block absolute -left-3 top-1 w-px h-px"
                        aria-hidden="true"
                      />
                      <PointLabel index="01" label={displayed.stages[0].label ?? "Contexto"} />
                      <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px]">
                        {displayed.stages[0].description}
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

                  {/* Point 02 */}
                  <div className="modal-reveal flex flex-col mb-12 lg:mb-20">
                    <div className="relative w-full bg-[#e5512d] aspect-[679/337] lg:ml-[49.5%] lg:w-[46.1%] overflow-hidden">
                      {displayed.stages[1].image ? (
                        <Image src={displayed.stages[1].image} alt={displayed.title} fill className="object-cover" />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>
                    <div className="relative px-4 lg:pl-0 lg:ml-[62.2%] pt-4 lg:w-[33.7%]">
                      <span
                        ref={(el) => { anchorRefs.current[1] = el; }}
                        className="hidden lg:block absolute -right-3 top-1 w-px h-px"
                        aria-hidden="true"
                      />
                      <PointLabel index="02" label={displayed.stages[1].label ?? "Abordagem"} align="right" />
                      <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px] text-right ml-auto">
                        {displayed.stages[1].description}
                      </p>
                    </div>
                  </div>

                  {/* Point 03 */}
                  <div className="modal-reveal flex flex-col mb-12 lg:mb-16">
                    <div className="relative w-full bg-[#e5512d] aspect-[679/337] lg:ml-[4.35%] lg:w-[46.1%] overflow-hidden">
                      {displayed.stages[2].image ? (
                        <Image src={displayed.stages[2].image} alt={displayed.title} fill className="object-cover" />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>
                    <div className="relative px-4 lg:pl-0 lg:ml-[29.3%] pt-4">
                      <span
                        ref={(el) => { anchorRefs.current[2] = el; }}
                        className="hidden lg:block absolute -left-3 top-1 w-px h-px"
                        aria-hidden="true"
                      />
                      <PointLabel index="03" label={displayed.stages[2].label ?? "Resultado"} />
                      <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-6 max-w-[308px]">
                        {displayed.stages[2].description}
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
                </div>
              ) : displayed.type === "mobile" ? (
                /* Mobile project: horizontal device mockups on desktop + text below */
                <div className="modal-reveal">
                  <div
                    ref={screensRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:overflow-visible mb-4 lg:mb-8 px-4 lg:px-0 justify-start lg:justify-center"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    {displayed.screens.slice(0, 3).map((src, i) => (
                      <div
                        key={i}
                        className={`flex-shrink-0 w-[60vw] aspect-[375/667] sm:w-[300px] md:w-[375px] lg:w-[320px] lg:max-w-[375px] overflow-hidden rounded-xl shadow-sm relative snap-center transition-transform duration-300 ${i === 1 ? "lg:scale-100 lg:shadow-lg" : "lg:scale-95"}`}
                        aria-hidden={false}
                      >
                        {src ? (
                          <Image src={src} alt={`${displayed.title} screenshot ${i + 1}`} fill className="object-cover" />
                        ) : (
                          <div className="relative w-full h-full bg-gray-900">
                            <ImagePlaceholder />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dots for mobile scroll position */}
                  <div className="flex justify-center gap-2 mb-4 lg:hidden">
                    {displayed.screens.slice(0, 3).map((_s, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const el = screensRef.current;
                          if (!el) return;
                          const itemWidth = (el.children[0] as HTMLElement).getBoundingClientRect().width + 16;
                          el.scrollTo({ left: i * itemWidth, behavior: "smooth" });
                        }}
                        className={`w-2 h-2 rounded-full ${mobileIndex === i ? "bg-white" : "bg-white/30"}`}
                        aria-label={`Tela ${i + 1}`}
                      />
                    ))}
                  </div>

                  <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-7 max-w-[840px] px-4 lg:px-0 mb-16 text-center lg:text-left">
                    {displayed.description}
                  </p>
                </div>
              ) : (
                /* Small project: banner + description */
                <div className="modal-reveal">
                  {displayed.banner && (
                    <div className="relative w-full bg-[#e5512d] aspect-video lg:ml-[4.35%] lg:w-[91.3%] overflow-hidden mb-8 lg:mb-12">
                      <Image src={displayed.banner} alt={displayed.title} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <p className="font-sans font-semibold text-sm lg:text-base text-bg leading-7 max-w-[640px] px-4 lg:px-0 mb-16">
                    {displayed.description}
                  </p>
                </div>
              )}

              <div className="modal-reveal px-4 lg:px-16 pb-16 flex flex-wrap gap-3 mt-4">
                {displayed.url && displayed.url !== "#" && (
                  <a
                    href={displayed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bg text-white font-sans font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Ver Projeto
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
                {displayed.repoPrivate && (
                  <span className="inline-flex items-center gap-2 px-6 py-3 border-2 border-bg/30 text-bg/50 font-sans font-semibold text-sm uppercase tracking-wider cursor-default select-none">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="5.5" width="11" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M3.5 5.5V3.5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Repositório Privado
                  </span>
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
    </div>,
    document.body,
  );
}

