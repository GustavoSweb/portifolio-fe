"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#hero-section" },
  { label: "Sobre Mim", href: "#about-section" },
  { label: "Projetos", href: "#projects-section" },
  { label: "Artigos", href: "#blog-section" },
];

const languages = [
  { code: "PT", label: "Português" },
  { code: "EN", label: "English" },
];

export default function Header() {
  const [lang, setLang] = useState("PT");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) {
        setHidden(false);
      } else if (y > lastScrollY.current) {
        setHidden(true);
        setOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const baseTextClass =
    "font-condensed italic wdth-condensed text-lg lg:text-2xl text-white tracking-[-0.25px] leading-none";

  return (
    <div
      className={`sticky top-0 z-40 flex justify-center transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <header
        className={`max-w-[1728px] w-full bg-bg flex items-center justify-between px-4 lg:px-16 py-4 lg:py-6`}
      >
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
                      onClick={() => {
                        setLang(code);
                        setOpen(false);
                      }}
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
      </header>
    </div>
  );
}
