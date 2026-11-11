"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { briefs, experience } from "@/content/site";
import { useOpenBrief } from "../ProjectBrief";
import { Doodles, Reveal, SectionSticker } from "../Decor";
import { ArrowUpRight, Briefcase, CompassSpark, HomeKey, Plus, SignHand, TravelPlane } from "../Icons";

// an illustrated mark per row (replaces the "+", since rows now open a popup rather than expanding)
const marks: Record<string, (p: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  "holiday-tribe": TravelPlane,
  "housing-dtu": HomeKey,
  "compass-ai": CompassSpark,
  "iiit-allahabad": SignHand,
};

const bg: Record<string, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  butter: "bg-butter",
  mint: "bg-mint",
  lavender: "bg-lavender",
  lime: "bg-lime",
};
const dot: Record<string, string> = {
  pink: "#f58b9a",
  blue: "#4f9cf5",
  butter: "#d9c22b",
  mint: "#3fcf7a",
  lavender: "#8a72f5",
  lime: "#9bc41a",
};

export default function Experience() {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const openBrief = useOpenBrief();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // tight, slightly over-damped spring: follows the cursor closely with no wobble
  const x = useSpring(mx, { stiffness: 700, damping: 50, mass: 0.5 });
  const y = useSpring(my, { stiffness: 700, damping: 50, mass: 0.5 });
  const hovered = experience.find((e) => e.id === hover && e.preview);

  const shown = useRef(false); // is the preview currently on screen?
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    shown.current = Boolean(hovered);
  }, [hovered]);
  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  const enterRow = (id: string, ev: React.PointerEvent) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    // appearing fresh: snap straight to the cursor instead of gliding in from the last position
    if (!shown.current) {
      mx.jump(ev.clientX);
      my.jump(ev.clientY);
      x.jump(ev.clientX);
      y.jump(ev.clientY);
    }
    setHover(id);
  };
  // short grace period so moving across the gap between rows swaps the image instead of re-popping it
  const leaveRow = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHover(null), 90);
  };

  return (
    <section
      id="experience"
      className="grid-paper relative overflow-hidden px-4 pb-28 pt-20 md:pb-36"
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <Doodles
        items={[
          { s: "Dot", c: "#f472b6", x: "6%", y: "6%" },
          { s: "Wave", c: "#7fb3ff", x: "88%", y: "4%" },
          { s: "Leaf", c: "#d6f264", x: "4%", y: "40%", r: 10, hideMobile: true },
          { s: "Cloud", c: "#5b6b8c", x: "90%", y: "46%", hideMobile: true },
          { s: "Squiggle", c: "#f9c46b", x: "84%", y: "88%", r: -6 },
        ]}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="Experience" icon={<Briefcase className="size-3.5" />} color="#ec68fd" rotate={-10} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            Where I&apos;ve
            <br />
            been building
          </h2>
        </Reveal>
      </div>

      <ul className="relative mx-auto mt-12 flex max-w-4xl flex-col gap-3.5">
        {experience.map((e, i) => {
          const isOpen = open === e.id;
          const hasBrief = Boolean(briefs[e.id]) && Boolean(openBrief);
          return (
            <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.06 }}
                className={`${bg[e.color]} overflow-hidden rounded-2xl shadow-[0_2px_0_rgba(0,0,0,0.06),0_8px_24px_-14px_rgba(0,0,0,0.35)] ring-1 ring-black/5`}
                onPointerEnter={(ev) => enterRow(e.id, ev)}
                onPointerLeave={leaveRow}
              >
                <button
                  type="button"
                  {...(hasBrief
                    ? { "aria-haspopup": "dialog" as const }
                    : { "aria-expanded": isOpen, "aria-controls": `exp-${e.id}` })}
                  onClick={(ev) => {
                    // rows with a brief open the quick-look popup instead of expanding in place
                    if (hasBrief && openBrief) {
                      if (leaveTimer.current) clearTimeout(leaveTimer.current);
                      setHover(null);
                      openBrief(e.id, ev.currentTarget);
                      return;
                    }
                    setOpen(isOpen ? null : e.id);
                  }}
                  className="focus-ring flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[clamp(20px,2.6vw,28px)] font-extrabold uppercase leading-none tracking-tight">
                      {e.company}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold text-ink-2 sm:text-[15px]">
                      {e.role}
                      <span className="mx-2 text-ink/30">·</span>
                      <span className="whitespace-nowrap">{e.period}</span>
                      <span className="hidden sm:inline">
                        <span className="mx-2 text-ink/30">·</span>
                        {e.place}
                      </span>
                    </span>
                  </span>
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-full text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] ring-2 ring-white/80 transition-transform duration-300"
                    style={{ background: dot[e.color], transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    {(() => {
                      const Mark = marks[e.id] ?? Plus;
                      return <Mark className="size-[18px]" />;
                    })()}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-${e.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6">
                        <div className="rounded-xl bg-white/70 p-4 sm:p-5">
                          <p className="font-semibold text-ink">{e.summary}</p>
                          <ul className="mt-3 space-y-2.5">
                            {e.points.map((p) => (
                              <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: dot[e.color] }} />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                          {e.links.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2.5">
                              {e.links.map((l) =>
                                l.external ? (
                                  <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5"
                                  >
                                    {l.label} <ArrowUpRight className="size-3.5" />
                                  </a>
                                ) : (
                                  <Link
                                    key={l.href}
                                    href={l.href}
                                    className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
                                  >
                                    {l.label} <ArrowUpRight className="size-3.5" />
                                  </Link>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
          );
        })}
      </ul>

      {/* floating preview that follows the cursor (pointer devices only) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 0 }}
              transition={{
                opacity: { duration: 0.15, ease: "easeOut" },
                default: { type: "spring", stiffness: 500, damping: 32, mass: 0.6 },
              }}
              style={{ transformOrigin: "0 0" }}
              className="relative ml-6 mt-6 h-[150px] w-[240px] overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)]"
            >
              <span className="relative block size-full overflow-hidden rounded-lg">
                {/* cross-fade between rows' images while the card stays put */}
                <AnimatePresence initial={false}>
                  <motion.span
                    key={hovered.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Image src={hovered.preview} alt="" fill sizes="240px" className="object-cover object-left-top" />
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
