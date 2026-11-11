"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/* ---------------- Section label sticker ("About", "Work"…) ---------------- */

export function SectionSticker({
  label,
  color = "#039cfb",
  rotate = -12,
  icon,
  className = "",
}: {
  label: string;
  color?: string;
  rotate?: number;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className={`relative inline-flex items-center gap-2 rounded-md bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-ink shadow-[var(--shadow-sticker)] ${className}`}
      style={{ rotate }}
    >
      <span className="grid size-6 place-items-center rounded-full text-white ring-2 ring-white" style={{ background: color }}>
        {icon ?? <span className="size-2 rounded-full bg-white" />}
      </span>
      {label}
      {/* little tape tab */}
      <span className="absolute -right-1.5 -top-1.5 size-3 rotate-45 rounded-[3px]" style={{ background: color }} />
    </motion.span>
  );
}

/* ---------------- Skill tag stickers on the hero headline ---------------- */

export function TagSticker({
  label,
  color,
  rotate,
  className = "",
  delay = 0,
  icon,
}: {
  label: string;
  color: string;
  rotate: number;
  className?: string;
  delay?: number;
  icon?: React.ReactNode;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, rotate: rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 14, delay }}
      className={`pointer-events-none absolute z-20 inline-flex items-center gap-1.5 whitespace-nowrap rounded-[7px] bg-[#f4f1f6] py-1 pl-1 pr-3 font-sans text-[11px] font-semibold normal-case leading-none tracking-normal text-ink shadow-[var(--shadow-sticker)] [font-variation-settings:normal] sm:text-[13px] ${className}`}
    >
      <span className="grid size-5 place-items-center rounded-full text-white ring-2 ring-white sm:size-6" style={{ background: color }}>
        {icon ?? <span className="size-1.5 rounded-full bg-white sm:size-2" />}
      </span>
      {label}
      <span className="absolute -right-1 -top-1 size-2.5 rounded-full ring-2 ring-white" style={{ background: color }} />
    </motion.span>
  );
}

/* ---------------- Googly eyes that follow the pointer ---------------- */

export function GooglyEyes({ className = "", size = 18 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx);
        const d = Math.min(1, Math.hypot(dx, dy) / 200);
        el.style.setProperty("--px", `${Math.cos(a) * d * size * 0.22}px`);
        el.style.setProperty("--py", `${Math.sin(a) * d * size * 0.22}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce, size]);

  return (
    <span ref={ref} aria-hidden className={`pointer-events-none inline-flex gap-[3px] ${className}`}>
      {[0, 1].map((i) => (
        <span
          key={i}
          className="relative grid place-items-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          style={{ width: size, height: size * 1.12 }}
        >
          <span
            className="rounded-full bg-[#111] transition-transform duration-150 ease-out"
            style={{
              width: size * 0.55,
              height: size * 0.6,
              transform: "translate(var(--px,0px), var(--py,0px))",
            }}
          />
        </span>
      ))}
    </span>
  );
}

/* ---------------- Scattered doodles on grid-paper sections ---------------- */

const Squiggle = ({ c }: { c: string }) => (
  <svg width="62" height="16" viewBox="0 0 62 16" fill="none">
    <path d="M2 9c5-6 9 6 14 0s9 6 14 0 9 6 14 0 9 6 14 0" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const Zig = ({ c }: { c: string }) => (
  <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
    <path d="M2 18 10 5l8 13 8-13 8 13" stroke={c} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Diamond = ({ c }: { c: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="3" width="8" height="8" rx="1.5" transform="rotate(45 7 7)" fill={c} /></svg>
);
const Dot = ({ c }: { c: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" fill={c} stroke="#252525" strokeOpacity=".15" /></svg>
);
const Cursor = ({ c }: { c: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 3l16 7-7 2-2 7L4 3Z" fill={c} stroke="#252525" strokeWidth="1.2" strokeLinejoin="round" /></svg>
);
const Cloud = ({ c }: { c: string }) => (
  <svg width="30" height="18" viewBox="0 0 30 18"><path d="M8 17a6 6 0 0 1-.6-12A7.5 7.5 0 0 1 21.6 5 6 6 0 0 1 23 17H8Z" fill={c} /></svg>
);
const Wave = ({ c }: { c: string }) => (
  <svg width="46" height="34" viewBox="0 0 46 34" fill="none">
    {[4, 15, 26].map((y, i) => (
      <path key={i} d={`M${2 + i * 3} ${y}c4 4 7 4 10 0s7-4 10 0 7 4 10 0`} stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    ))}
  </svg>
);
const Leaf = ({ c }: { c: string }) => (
  <svg width="70" height="62" viewBox="0 0 70 62" fill="none">
    <path d="M10 52C2 30 18 6 44 6c4 22-10 46-34 46Zm0 0c12-14 20-24 30-34" stroke={c} strokeWidth="3" strokeLinecap="round" />
    <path d="M22 56c10-16 30-22 44-14-6 16-28 22-44 14Z" stroke={c} strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

const shapes = { Squiggle, Zig, Diamond, Dot, Cursor, Cloud, Wave, Leaf };
export type DoodleSpec = { s: keyof typeof shapes; c: string; x: string; y: string; r?: number; hideMobile?: boolean };

export function Doodles({ items }: { items: DoodleSpec[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((d, i) => {
        const S = shapes[d.s];
        return (
          <motion.span
            key={i}
            className={`absolute ${d.hideMobile ? "hidden md:block" : ""}`}
            style={{ left: d.x, top: d.y, rotate: d.r ?? 0 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
          >
            <S c={d.c} />
          </motion.span>
        );
      })}
    </div>
  );
}

/* ---------------- Reveal on scroll ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  rotate = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate: rotate * 1.6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}
