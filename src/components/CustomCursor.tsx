"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const attachLinkListeners = () => {
      const links = document.querySelectorAll("a, button");
      links.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachLinkListeners();
    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--lime)] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--lime)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
