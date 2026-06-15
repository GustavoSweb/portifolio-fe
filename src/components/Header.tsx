"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Inicio", href: "#hero-section", num: "01" },
  { label: "Sobre Mim", href: "#about-section", num: "02" },
  { label: "Projetos", href: "#projects-section", num: "03" },
  { label: "Artigos", href: "#blog-section", num: "04" },
];

const languages = [
  { code: "PT", label: "Português" },
  { code: "EN", label: "English" },
];

export default function Header() {
  const [lang, setLang] = useState("PT");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const gustavoRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);
  const lastScrollY = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { y: "-100%", pointerEvents: "none" });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      const y = window.scrollY;
      if (y <= 0) setHidden(false);
      else if (y > lastScrollY.current) { setHidden(true); setOpen(false); }
      else setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  useGSAP(() => {
    const hero = document.getElementById("hero-section");
    if (!hero || !gustavoRef.current) return;
    gsap.fromTo(
      gustavoRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
  }, { dependencies: [] });

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);
    setHidden(false);
    document.body.style.overflow = "hidden";

    gsap.to(line1.current, { y: 8, rotation: 45, duration: 0.3, ease: "power2.inOut" });
    gsap.to(line2.current, { opacity: 0, duration: 0.15 });
    gsap.to(line3.current, { y: -8, rotation: -45, duration: 0.3, ease: "power2.inOut" });

    gsap.to(menuRef.current, {
      y: "0%",
      duration: 0.7,
      ease: "power4.inOut",
      pointerEvents: "auto",
      onComplete: () => { isAnimating.current = false; },
    });

    gsap.fromTo(".mobile-nav-item",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power3.out", delay: 0.3 },
    );

    gsap.fromTo(".mobile-menu-foot",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", delay: 0.65 },
    );
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to(line1.current, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(line2.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    gsap.to(line3.current, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });

    gsap.to(".mobile-nav-item", { opacity: 0, y: -24, stagger: 0.04, duration: 0.2 });
    gsap.to(".mobile-menu-foot", { opacity: 0, duration: 0.2 });

    gsap.to(menuRef.current, {
      y: "-100%",
      duration: 0.6,
      ease: "power4.inOut",
      delay: 0.12,
      pointerEvents: "none",
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
        isAnimating.current = false;
      },
    });
  };

  const baseTextClass =
    "font-condensed italic wdth-condensed text-lg lg:text-2xl text-white tracking-[-0.25px] leading-none";

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-bg flex items-center justify-between px-4 lg:px-16 py-5 lg:py-8 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center gap-3 lg:gap-5">
          <a href="#hero-section" aria-label="Início" className="shrink-0">
            <svg
              width="33"
              height="22"
              viewBox="0 0 33 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8.48704 2.54565C2.78214 1.6051 0 4.64149 0 9.65092C0 18.4941 8.03507 20.4768 11.1989 21.2033C16.4217 22.4027 25.9664 22.734 30.483 18.6475C31.387 17.8296 36.3587 11.7978 29.1773 6.07276C21.996 0.347706 29.1773 -4.50841 21.5942 7.04396C14.0111 18.5963 15.6182 3.72133 8.48704 2.54565Z"
                fill="#F96440"
              />
            </svg>
          </a>

          <span
            ref={gustavoRef}
            aria-hidden="true"
            className="font-display text-xl lg:text-[1.75rem] text-white uppercase leading-none tracking-tight opacity-0"
          >
            GUSTAVO
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-32">
          <nav aria-label="Navegação principal">
            <ul className="flex items-center gap-8 lg:gap-16">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={`${baseTextClass} hover:text-orange transition-colors`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="listbox"
              className="flex items-center gap-0.5 hover:text-orange transition-colors group"
            >
              <ChevronDown
                size={24}
                className={`text-white group-hover:text-orange transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
              <span className={baseTextClass}>{lang}</span>
            </button>

            {open && (
              <ul
                role="listbox"
                aria-label="Idioma"
                className="absolute right-0 top-full mt-2 bg-bg border border-white/10 min-w-[80px] shadow-lg"
              >
                {languages.map(({ code, label }) => (
                  <li key={code} role="option" aria-selected={lang === code}>
                    <button
                      onClick={() => { setLang(code); setOpen(false); }}
                      className={`w-full px-4 py-2 text-left font-condensed italic wdth-condensed text-base text-white tracking-[-0.25px] hover:text-orange transition-colors ${lang === code ? "text-orange" : ""}`}
                    >
                      {code}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Hamburger button */}
        <button
          onClick={menuOpen ? closeMenu : openMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-[6px] p-2 -mr-2"
        >
          <span ref={line1} className="block w-6 h-0.5 bg-white origin-center" />
          <span ref={line2} className="block w-6 h-0.5 bg-white" />
          <span ref={line3} className="block w-4 h-0.5 bg-white origin-center" />
        </button>
      </header>

      {/* Mobile full-screen menu — z-30 so header sits on top */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-30 bg-orange flex flex-col md:hidden overflow-hidden"
        aria-hidden={!menuOpen}
        aria-label="Menu de navegação"
      >
        {/* Push content below header height */}
        <div className="h-[72px] shrink-0" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Navegação mobile">
          <ul>
            {navLinks.map(({ label, href, num }) => (
              <li
                key={href}
                className="mobile-nav-item border-t border-bg/20 first:border-t-0"
              >
                <a
                  href={href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-3 py-4 group"
                >
                  <span className="font-condensed italic wdth-condensed text-xs text-bg/40 tracking-widest shrink-0 group-hover:text-bg/70 transition-colors">
                    {num}
                  </span>
                  <span className="font-display text-[clamp(2.4rem,12vw,4.5rem)] text-bg uppercase leading-tight tracking-tight group-hover:translate-x-2 transition-transform duration-200">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mobile-menu-foot px-6 pb-10 flex items-end justify-between shrink-0">
          <div className="flex flex-col gap-1">
            <p className="font-condensed italic wdth-condensed text-xs text-bg/40 tracking-widest uppercase mb-2">
              Idioma
            </p>
            <div className="flex gap-4">
              {languages.map(({ code }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`font-condensed italic wdth-condensed text-xl text-bg tracking-[-0.25px] transition-opacity ${
                    lang === code ? "opacity-100 underline underline-offset-4" : "opacity-35"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative large dot matching portal style */}
          <span
            className="font-display text-[10rem] text-bg/10 leading-none select-none -mb-8"
            aria-hidden="true"
          >
            .
          </span>
        </div>
      </div>
    </>
  );
}
