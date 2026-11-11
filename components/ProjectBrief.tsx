"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { briefs, testimonials, type Brief } from "@/content/site";
import { useScrollLock } from "./SmoothScroll";
import { ArrowRight, ArrowUpRight } from "./Icons";

/* ---------- open-a-brief context ---------- */

type OpenBrief = (id: string, from?: HTMLElement | null) => void;
const BriefCtx = createContext<OpenBrief | null>(null);

/** returns null outside <BriefProvider>, so callers can fall back to normal navigation */
export function useOpenBrief() {
  return useContext(BriefCtx);
}

type Open = { brief: Brief; origin: { x: number; y: number } };

export function BriefProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Open | null>(null);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const open = useCallback<OpenBrief>((id, from) => {
    const brief = briefs[id];
    if (!brief) return;
    // remember where the click came from so the window can grow out of that card
    let origin = { x: 0, y: 0 };
    if (from) {
      const r = from.getBoundingClientRect();
      origin = { x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - window.innerHeight / 2 };
    }
    trigger.current = from ?? null;
    setState({ brief, origin });
  }, []);

  const close = useCallback(() => setState(null), []);

  return (
    <BriefCtx.Provider value={open}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence onExitComplete={() => trigger.current?.focus({ preventScroll: true })}>
            {state && <BriefWindow key={state.brief.id} brief={state.brief} origin={state.origin} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </BriefCtx.Provider>
  );
}

/* ---------- the window ---------- */

const tint: Record<string, string> = {
  blue: "bg-blue",
  mint: "bg-mint",
  butter: "bg-butter",
  pink: "bg-pink",
  lavender: "bg-lavender",
  lime: "bg-lime",
};

function BriefWindow({ brief, origin, onClose }: { brief: Brief; origin: { x: number; y: number }; onClose: () => void }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const lock = useScrollLock();
  const titleId = useId();
  const winRef = useRef<HTMLDivElement>(null);
  const [expandFrom, setExpandFrom] = useState<DOMRect | null>(null);
  const caseStudy = brief.caseStudy;
  const heroImgs = Array.isArray(brief.hero) ? brief.hero : [brief.hero];
  const quote = brief.quote ? testimonials.find((t) => t.name === brief.quote?.name) : undefined;
  const proof = brief.side || brief.video || quote; // left half of the closing row
  const cta = brief.cta && (caseStudy || brief.live) ? brief.cta : undefined; // right half

  // freeze the page behind, warm up the case-study route, focus the window
  useEffect(() => {
    lock(true);
    if (caseStudy) router.prefetch(caseStudy);
    winRef.current?.focus({ preventScroll: true });
    return () => lock(false);
  }, [lock, router, caseStudy]);

  // green button / "Read full case study": the window grows to fill the screen, then the case study opens
  const expand = useCallback(() => {
    if (!caseStudy) return;
    const r = winRef.current?.getBoundingClientRect();
    if (reduce || !r) {
      router.push(caseStudy);
      return;
    }
    setExpandFrom((cur) => cur ?? r);
  }, [reduce, router, caseStudy]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !winRef.current) return;
    // keep keyboard focus inside the window
    const f = winRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === winRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openCase = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let "open in new tab" work
    e.preventDefault();
    expand();
  };

  const from = reduce ? { opacity: 0, scale: 0.96 } : { opacity: 0, scale: 0.3, x: origin.x, y: origin.y };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onKeyDown={onKeyDown}
    >
      {/* dimmed, blurred page behind — click to close */}
      <div aria-hidden className="absolute inset-0 bg-[#16181d]/55 backdrop-blur-[6px]" onClick={onClose} />

      <motion.div
        ref={winRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={from}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={from}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
        className="relative flex h-[min(84svh,820px)] w-full max-w-[820px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] outline-none sm:rounded-[28px]"
      >
        {/* ---- window chrome ---- */}
        <div className="flex shrink-0 items-center gap-3 border-b border-black/[0.06] px-4 py-3 sm:gap-4 sm:px-5 sm:py-3.5">
          <div className="group/lights flex items-center gap-2">
            <Light color="#ff5f57" label="Close" onClick={onClose} glyph="close" />
            <Light color="#febc2e" label="Minimise" onClick={onClose} glyph="min" />
            {caseStudy && <Light color="#28c840" label="Open full case study" onClick={expand} glyph="expand" />}
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f2f1ec] px-3.5 py-1.5 text-[13px] font-medium text-ink-2">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-3.5 shrink-0 opacity-70">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            <span className="truncate">{brief.path}</span>
          </div>
          {brief.logo && (
            <span className="relative size-7 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
              <Image src={brief.logo} alt="" fill sizes="28px" className="object-contain p-0.5" />
            </span>
          )}
        </div>

        {/* ---- scrollable content ---- */}
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-7 sm:pb-8 sm:pt-6">
          {/* hero — one screenshot, or several photos side by side at the same height */}
          <div className="flex gap-2.5 sm:gap-3">
            {heroImgs.map((img) => (
              <div
                key={img.src}
                className="relative min-w-0 overflow-hidden rounded-2xl bg-cream shadow-[var(--shadow-card)] ring-1 ring-black/5"
                style={{ flex: `${img.w / img.h} 1 0%`, aspectRatio: `${img.w}/${img.h}` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={heroImgs.length > 1 ? "(min-width: 980px) 600px, 70vw" : "(min-width: 860px) 780px, 94vw"}
                  className="object-cover object-left-top"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <h2 id={titleId} className="font-display text-[clamp(30px,5vw,46px)] font-extrabold leading-none tracking-tight">
              {brief.title}
            </h2>
            {brief.live?.label && (
              <a
                href={brief.live.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded text-[15px] font-semibold text-[#5b44f2] underline decoration-[#5b44f2]/40 underline-offset-4 transition hover:decoration-[#5b44f2]"
              >
                {brief.live.label} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">{brief.description}</p>

          {(caseStudy || brief.live) && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {caseStudy && (
                <Link
                  href={caseStudy}
                  onClick={openCase}
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-bold text-white shadow-md transition hover:-translate-y-0.5"
                >
                  Read full case study <ArrowRight className="size-4" />
                </Link>
              )}
              {brief.live && (
                <a
                  href={brief.live.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`focus-ring inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold transition hover:-translate-y-0.5 ${
                    caseStudy ? "bg-white text-ink shadow-sm ring-1 ring-black/10" : "bg-ink text-white shadow-md"
                  }`}
                >
                  {brief.live.button ?? "Visit site"} <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          )}

          {/* fields */}
          <dl className="mt-7 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-black/[0.07] pt-6 sm:grid-cols-2">
            {brief.fields.map((f) => (
              <div key={f.label}>
                <dt className="text-[14px] font-medium text-muted">{f.label} :</dt>
                <dd className="mt-1 text-[16px] font-semibold text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* numbers */}
          {brief.metrics && (
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {brief.metrics.map((m) => (
                <div key={m.label} className={`${tint[m.color]} rounded-2xl p-4`}>
                  <p className="font-display text-[26px] font-extrabold leading-none tracking-tight sm:text-[28px]">{m.value}</p>
                  <p className="mt-1.5 text-[12.5px] font-semibold text-ink-2">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* phone screens */}
          {brief.phones && (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {brief.phones.map((ph, i) => (
                <div key={ph.src} className={`${i ? "bg-mint" : "bg-lavender"} rounded-2xl p-4 sm:p-8`}>
                  <div className="relative mx-auto aspect-[780/1300] max-w-[300px] overflow-hidden rounded-[18px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] ring-4 ring-white/70">
                    <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 640px) 300px, 40vw" className="object-cover object-top" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* highlights */}
          <h3 className="mt-8 text-[13px] font-bold uppercase tracking-wider text-muted">Highlights</h3>
          <div className={`mt-3 grid gap-3 ${brief.highlights.length % 2 === 0 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {brief.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl bg-cream p-4 ring-1 ring-black/[0.04]">
                <p className="font-display text-[16px] font-extrabold tracking-tight">{h.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{h.text}</p>
              </div>
            ))}
          </div>

          {brief.gallery?.map((g) => (
            <figure key={g.src} className="mt-7">
              <div className="relative overflow-hidden rounded-2xl bg-ink ring-1 ring-black/5" style={{ aspectRatio: `${g.w}/${g.h}` }}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 860px) 780px, 94vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-[13px] text-muted">{g.caption}</figcaption>
            </figure>
          ))}

          {/* closing: proof + the way into the full story */}
          {(proof || cta) && (
            <div className={`mt-7 grid gap-4 ${proof && cta ? "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : ""}`}>
              {brief.side ? (
                <figure>
                  <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5" style={{ aspectRatio: `${brief.side.w}/${brief.side.h}` }}>
                    <Image src={brief.side.src} alt={brief.side.alt} fill sizes="(min-width: 640px) 420px, 94vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-muted">{brief.side.caption}</figcaption>
                </figure>
              ) : brief.video ? (
                <figure>
                  <div className="relative overflow-hidden rounded-2xl bg-ink ring-1 ring-black/5" style={{ aspectRatio: `${brief.video.w}/${brief.video.h}` }}>
                    <video
                      src={brief.video.src}
                      poster={brief.video.poster}
                      aria-label={brief.video.alt}
                      controls
                      playsInline
                      preload="none"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-muted">{brief.video.caption}</figcaption>
                </figure>
              ) : quote && brief.quote ? (
                <figure className={`${tint[brief.quote.color]} flex flex-col justify-between gap-6 rounded-2xl p-6 sm:p-7`}>
                  <blockquote className="font-display text-[clamp(20px,2.6vw,26px)] font-extrabold leading-snug tracking-tight">
                    “{quote.highlight}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <Image src={quote.photo} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-ink">{quote.name}</span>
                      <span className="block text-[13px] font-medium text-ink-2">
                        {quote.title} · {quote.relation}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ) : null}
              {cta && (
                <div className="flex flex-col justify-between gap-6 rounded-2xl bg-ink p-6 text-white sm:p-7">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wider text-white/60">{cta.kicker}</p>
                    <p className="display mt-3 text-[clamp(30px,4vw,42px)]">{cta.title}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/75">{cta.text}</p>
                  </div>
                  {caseStudy ? (
                    <Link
                      href={caseStudy}
                      onClick={openCase}
                      className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-ink transition hover:-translate-y-0.5"
                    >
                      Read full case study <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    brief.live && (
                      <a
                        href={brief.live.href}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-ink transition hover:-translate-y-0.5"
                      >
                        {brief.live.button ?? `Visit ${brief.live.label ?? "site"}`} <ArrowUpRight className="size-4" />
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* "full screen": the window's white sheet grows to cover the screen, then the case study loads */}
      {expandFrom && caseStudy && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[95] bg-white"
          initial={{
            clipPath: `inset(${expandFrom.top}px ${window.innerWidth - expandFrom.right}px ${window.innerHeight - expandFrom.bottom}px ${expandFrom.left}px round 28px)`,
          }}
          animate={{ clipPath: "inset(0px 0px 0px 0px round 0px)" }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => router.push(caseStudy)}
        />
      )}
    </motion.div>
  );
}

/* ---------- macOS-style traffic light ---------- */

function Light({ color, label, onClick, glyph }: { color: string; label: string; onClick: () => void; glyph: "close" | "min" | "expand" }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      // bigger invisible hit area for fingers, same 13px dot visually
      className="focus-ring group/l relative grid size-[13px] place-items-center rounded-full ring-1 ring-black/10 before:absolute before:-inset-1.5 before:content-['']"
      style={{ background: color }}
    >
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="size-[9px] opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100 group-focus-visible/l:opacity-100"
        fill="none"
        stroke="rgba(0,0,0,0.6)"
        strokeWidth={1.6}
        strokeLinecap="round"
      >
        {glyph === "close" && <path d="M3 3l6 6M9 3 3 9" />}
        {glyph === "min" && <path d="M2.5 6h7" />}
        {glyph === "expand" && (
          <>
            <path d="M3 7.5V3h4.5z" fill="rgba(0,0,0,0.6)" stroke="none" />
            <path d="M9 4.5V9H4.5z" fill="rgba(0,0,0,0.6)" stroke="none" />
          </>
        )}
      </svg>
    </button>
  );
}
