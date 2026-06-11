"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { type Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);

  // Mantém os dados visíveis durante a animação de saída
  const [displayed, setDisplayed] = useState<Project | null>(null);

  useEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (project) {
      setDisplayed(project);
      document.body.style.overflow = "hidden";
      gsap.set(backdropRef.current, { pointerEvents: "auto" });
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, { opacity: 0, y: 20, duration: 0.2, ease: "power2.in" });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          gsap.set(backdropRef.current, { pointerEvents: "none" });
          setDisplayed(null);
        },
      });
    }
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 lg:p-8 opacity-0"
      style={{ pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="bg-bg-dark border border-teal w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {displayed && (
          <div className="p-8 lg:p-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {displayed.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs font-medium text-bg bg-lime-soft px-3 py-1 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Título */}
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white leading-none tracking-[-0.25px] uppercase mb-4">
              {displayed.title}
            </h2>

            {/* Divisor */}
            <div className="w-12 h-[2px] bg-orange mb-8" />

            {/* Descrição */}
            <p className="font-sans text-base text-white/70 leading-7 tracking-[0.1px] mb-10">
              {displayed.description}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {displayed.url && displayed.url !== "#" && (
                <a
                  href={displayed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-bg font-sans font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Ver Projeto
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {displayed.repo && displayed.repo !== "#" && (
                <a
                  href={displayed.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-teal text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-teal/10 transition-colors"
                >
                  GitHub
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
