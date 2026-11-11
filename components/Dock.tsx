"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollTo } from "./SmoothScroll";
import { AppTile, Briefcase, Chat, Folder, Person, Star } from "./Icons";
import { dockMerge, itemProgress, smoothstep } from "./dockMerge";

// same order as the footer nav words (content/site.ts → nav), so each tile flies into its own word
const items = [
  { id: "about", label: "About", gradient: ["#a99bff", "#6a4dfb"] as [string, string], Icon: Person },
  { id: "experience", label: "Experience", gradient: ["#ff9fc4", "#ec3f87"] as [string, string], Icon: Briefcase },
  { id: "work", label: "Work", gradient: ["#63c3ff", "#1077ea"] as [string, string], Icon: Folder },
  { id: "kind-words", label: "Kind words", gradient: ["#ffd25a", "#ff7a1a"] as [string, string], Icon: Star },
  { id: "contact", label: "Contact", gradient: ["#6be38b", "#16a34a"] as [string, string], Icon: Chat, badge: true },
];

// phones only (below Tailwind's `sm`): the dock slides away while scrolling down and back while scrolling up,
// instead of morphing into the footer words
const PHONE = "(max-width: 639.98px)";

export default function Dock() {
  const pathname = usePathname();
  const scrollTo = useScrollTo();
  const onHome = pathname === "/";
  const reduce = useReducedMotion();
  const n = items.length;

  const [merged, setMerged] = useState(false);
  const mergedRef = useRef(false);
  const [hidden, setHidden] = useState(false); // phone: tucked away while scrolling down
  const phoneRef = useRef(false);
  const barRef = useRef<HTMLUListElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // paint one frame of the morph: each tile travels to its footer word, shrinks and fades as the word appears
  const apply = useCallback(
    (p: number) => {
      const bg = bgRef.current;
      // phone: no morph — keep the tiles in place (the footer words stay visible on their own)
      if (phoneRef.current) {
        if (bg) {
          bg.style.opacity = "";
          bg.style.transform = "";
        }
        tileRefs.current.forEach((tile) => {
          if (!tile) return;
          tile.style.transform = "";
          tile.style.opacity = "";
        });
        return;
      }
      if (bg) {
        const out = smoothstep(0, 0.55, p);
        bg.style.opacity = out ? String(1 - out) : "";
        bg.style.transform = out ? `scale(${1 - 0.06 * out})` : "";
      }
      items.forEach((it, i) => {
        const tile = tileRefs.current[i];
        const slot = slotRefs.current[i];
        if (!tile || !slot) return;
        const e = itemProgress(p, i, n);
        if (e === 0) {
          tile.style.transform = "";
          tile.style.opacity = "";
          return;
        }
        let dx = 0;
        let dy = 0;
        const target = document.querySelector<HTMLElement>(`[data-dock-target="${it.id}"]`);
        if (target && !reduce) {
          // measured every frame, so the path stays correct even if the page is still scrolling
          const a = slot.getBoundingClientRect();
          const b = target.getBoundingClientRect();
          dx = b.left + b.width / 2 - (a.left + a.width / 2);
          dy = b.top + b.height / 2 - (a.top + a.height / 2);
        }
        tile.style.transform = `translate3d(${dx * e}px, ${dy * e}px, 0) scale(${1 - 0.6 * e})`;
        tile.style.opacity = String(1 - smoothstep(0.4, 0.85, e));
      });
    },
    [n, reduce],
  );

  useEffect(() => dockMerge.on("change", apply), [apply]);

  // merge once the footer nav row has scrolled clear above the dock (or the page is at the very bottom)
  useEffect(() => {
    let raf = 0;
    let first = true;
    const phoneMq = window.matchMedia(PHONE);
    let lastY = window.scrollY;
    let travel = 0; // px scrolled in the current direction
    const evaluate = () => {
      raf = 0;
      if (phoneMq.matches !== phoneRef.current) {
        phoneRef.current = phoneMq.matches;
        first = true; // switched between phone and bigger layouts: re-sync without animating
      }

      if (phoneRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0)); // ignore overscroll bounce
        if (first) {
          first = false;
          mergedRef.current = false;
          setMerged(false);
          dockMerge.jump(1); // footer words fully shown; apply() leaves the tiles alone on phones
          apply(1);
          setHidden(false);
          lastY = y;
          travel = 0;
          return;
        }
        const dy = y - lastY;
        lastY = y;
        if (y < 40) {
          // near the top: always show
          travel = 0;
          setHidden(false);
          return;
        }
        if (dy === 0) return;
        travel = (Math.sign(dy) === Math.sign(travel) ? travel : 0) + dy;
        if (travel > 12) setHidden(true);
        else if (travel < -12) setHidden(false);
        return;
      }

      if (first) setHidden(false);
      const bar = barRef.current;
      const row = document.querySelector<HTMLElement>("[data-dock-row]");
      let next = false;
      if (bar && row) {
        const dockTop = bar.getBoundingClientRect().top;
        const rowBottom = row.getBoundingClientRect().bottom;
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        // small hysteresis so it doesn't flicker right at the threshold
        next = atBottom || rowBottom <= dockTop - (mergedRef.current ? -12 : 4);
      }
      if (first) {
        first = false;
        mergedRef.current = next;
        setMerged(next);
        dockMerge.jump(next ? 1 : 0); // no animation on load / page change
        apply(dockMerge.get());
        return;
      }
      if (next !== mergedRef.current) {
        mergedRef.current = next;
        setMerged(next);
        // going down: 0.8s morph into the words; coming back up: a quicker 0.5s return so the dock is back promptly
        animate(dockMerge, next ? 1 : 0, { duration: reduce ? 0.3 : next ? 0.8 : 0.5, ease: [0.65, 0, 0.35, 1] });
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(evaluate);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    phoneMq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      phoneMq.removeEventListener("change", schedule);
    };
  }, [pathname, reduce, apply]);

  const off = merged || hidden; // not interactive right now

  return (
    <nav
      aria-label="Primary"
      aria-hidden={off || undefined}
      className={`fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom))] z-50 flex justify-center pointer-events-none transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-opacity ${
        hidden ? "translate-y-[calc(100%+28px)] opacity-0 motion-reduce:translate-y-0" : ""
      }`}
    >
      <ul
        ref={barRef}
        className={`relative flex items-end gap-2 rounded-[22px] border border-transparent p-2 sm:gap-2.5 sm:p-2.5 ${
          off ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {/* glass bar lives on its own layer so it can fade away while the tiles fly off */}
        <span
          ref={bgRef}
          aria-hidden
          className="glass absolute -inset-px rounded-[22px] bg-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
        />
        {items.map(({ id, label, gradient, Icon, badge }, i) => {
          const tile = (
            <>
              <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
                {label}
              </span>
              <span className="block size-11 transition-transform duration-300 ease-[cubic-bezier(.2,.9,.3,1.4)] group-hover:-translate-y-1.5 group-hover:scale-[1.18] sm:size-12">
                <AppTile gradient={gradient} badge={badge}>
                  <Icon className="size-full" />
                </AppTile>
              </span>
            </>
          );
          return (
            <li key={id} ref={(el) => void (slotRefs.current[i] = el)} className="relative">
              <div ref={(el) => void (tileRefs.current[i] = el)}>
                {onHome ? (
                  <a
                    href={`#${id}`}
                    aria-label={label}
                    tabIndex={off ? -1 : undefined}
                    className="focus-ring group relative block rounded-[14px]"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(`#${id}`);
                      history.replaceState(null, "", `#${id}`);
                    }}
                  >
                    {tile}
                  </a>
                ) : (
                  <Link
                    href={`/#${id}`}
                    aria-label={label}
                    tabIndex={off ? -1 : undefined}
                    className="focus-ring group relative block rounded-[14px]"
                  >
                    {tile}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
