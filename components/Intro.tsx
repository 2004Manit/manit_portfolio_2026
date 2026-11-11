"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { profile } from "@/content/site";
import { useScrollLock } from "./SmoothScroll";
import { INTRO_KEY } from "./introKey";

/**
 * First-load intro (like douglus.site): plays once per browser tab.
 * sessionStorage is per tab, so reloads and later page loads in the same tab skip it; a new tab plays it again.
 * The inline script in app/layout.tsx hides it before first paint when it has already played (no flash on reload).
 */
const WORDS = ["Users", "Come", "First"]; // last word gets the accent colour
const SUBTITLE = `${profile.role} · 2026`;

// timeline (seconds) — ~5.35s in total
const START = 0.25;
const WORD_STEP = 0.85; // a new word every 0.85s
const WORD_DUR = 0.9;
const LAST_DUR = 1.15; // the accent word holds a little longer
const NAME_AT = START + WORD_STEP * (WORDS.length - 1) + LAST_DUR - 0.05; // ≈ 3.05s
const LEAVE_AT = 4.55; // then the screen lifts away (0.8s)

let playingThisLoad = false; // survives React Strict Mode's dev remount, so the intro still plays in development

export default function Intro() {
  const [phase, setPhase] = useState<"idle" | "play" | "leave" | "done">("idle");
  const lock = useScrollLock();

  // decide before paint: skip if this tab has already seen it (or the visitor prefers reduced motion)
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((seen && !playingThisLoad) || reduce) {
      setPhase("done");
      return;
    }
    playingThisLoad = true;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setPhase((p) => (p === "idle" ? "play" : p));
  }, []);

  // while it plays: freeze page scroll, then lift the screen on schedule (not skippable)
  const active = phase === "play" || phase === "leave";
  useEffect(() => {
    if (!active) return;
    const raf = requestAnimationFrame(() => lock(true)); // after the smooth-scroll engine has started
    return () => {
      cancelAnimationFrame(raf);
      lock(false);
    };
  }, [active, lock]);

  useEffect(() => {
    if (phase !== "play") return;
    const t = setTimeout(() => setPhase((p) => (p === "play" ? "leave" : p)), LEAVE_AT * 1000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;
  const playing = phase !== "idle";

  return (
    <motion.div
      data-intro
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#111111] text-white"
      initial={false}
      animate={{ y: phase === "leave" ? "-100%" : "0%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setPhase((p) => (p === "leave" ? "done" : p))}
    >
      {/* the words, one at a time: each slides up into view, holds, then slides up and out */}
      {WORDS.map((w, i) => {
        const last = i === WORDS.length - 1;
        return (
          <span key={w} className="absolute inset-0 flex items-center justify-center">
            <span className="block overflow-hidden px-[0.04em] pb-[0.04em]">
              <motion.span
                className={`display block text-[clamp(64px,14vw,200px)] uppercase leading-none ${last ? "text-lime" : ""}`}
                initial={{ y: "110%" }}
                animate={playing ? { y: ["110%", "0%", "0%", "-110%"] } : undefined}
                transition={{
                  duration: last ? LAST_DUR : WORD_DUR,
                  delay: START + i * WORD_STEP,
                  times: last ? [0, 0.3, 0.78, 1] : [0, 0.38, 0.72, 1],
                  ease: ["easeOut", "linear", "easeIn"],
                }}
              >
                {w}
              </motion.span>
            </span>
          </span>
        );
      })}

      {/* then the name, letter by letter, with a hairline and the role underneath */}
      <span className="relative flex flex-col items-center px-4 text-center">
        {/* pl balances the letter-spacing after the last letter, so the name sits truly centred */}
        <span className="flex overflow-hidden pb-[0.06em] pl-[0.28em] font-display text-[clamp(26px,5vw,56px)] font-semibold leading-none tracking-[0.28em]">
          {profile.name.toUpperCase().split("").map((ch, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ y: "110%" }}
              animate={playing ? { y: "0%" } : undefined}
              transition={{ duration: 0.6, delay: NAME_AT + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </span>
        <motion.span
          className="mt-5 block h-px w-[min(560px,78vw)] origin-center bg-white/20"
          initial={{ scaleX: 0 }}
          animate={playing ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, delay: NAME_AT + 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.4em] text-white/55 sm:text-[12px]"
          initial={{ opacity: 0, y: 6 }}
          animate={playing ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: NAME_AT + 0.45, ease: "easeOut" }}
        >
          {SUBTITLE}
        </motion.span>
      </span>
    </motion.div>
  );
}
