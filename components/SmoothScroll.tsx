"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

type ScrollTo = (target: string | number | HTMLElement) => void;
const ScrollCtx = createContext<ScrollTo>(() => {});

export function useScrollTo() {
  return useContext(ScrollCtx);
}

const LockCtx = createContext<(locked: boolean) => void>(() => {});

export function useScrollLock() {
  return useContext(LockCtx);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // freeze page scrolling while a popup is open (scroll areas marked data-lenis-prevent still scroll)
  const setLocked = useCallback((locked: boolean) => {
    const html = document.documentElement;
    if (locked) {
      lenisRef.current?.stop();
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      lenisRef.current?.start();
    }
  }, []);

  const scrollTo = useCallback<ScrollTo>((target) => {
    const el =
      typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;
    if (el === null) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement | number, { offset: 0, duration: 1.4 });
    } else if (typeof el === "number") {
      window.scrollTo({ top: el, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <ScrollCtx.Provider value={scrollTo}>
      <LockCtx.Provider value={setLocked}>{children}</LockCtx.Provider>
    </ScrollCtx.Provider>
  );
}
