"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero, profile } from "@/content/site";
import { GooglyEyes, TagSticker } from "../Decor";
import { ArrowUpRight, Bolt, Briefcase, Sparkle } from "../Icons";

const featured = [
  { kind: "PM Internship", year: "2026", title: "Holiday Tribe", img: "/images/ht-simulator.jpg", href: "/work/holiday-tribe", external: false },
  { kind: "Founder", year: "2025–26", title: "Housing DTU", img: "/images/shot-housingdtu.jpg", href: "/work/housing-dtu", external: false },
  { kind: "Teardown", year: "2026", title: "Rapido After Dark", img: "/images/shot-rapido.jpg", href: "https://rapido-product-manit.netlify.app/", external: true },
];

const CARD_H = 78; // px — 56px thumbnail + padding + border
const CARD_GAP = 12; // px — space between cards when the stack is fanned out

function FeaturedDeck() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const n = featured.length;

  // rotate the front card while collapsed; pause while the stack is open
  useEffect(() => {
    if (reduce || open) return;
    const t = setInterval(() => setActive((v) => (v + 1) % n), 4200);
    return () => clearInterval(t);
  }, [reduce, open, n]);

  return (
    <div
      className="relative w-[290px]"
      style={{ height: CARD_H }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {/* invisible hover pad so the pointer doesn't "fall through" the gaps between fanned-out cards */}
      {open && (
        <span aria-hidden className="absolute inset-x-0 bottom-0" style={{ height: n * CARD_H + (n - 1) * CARD_GAP }} />
      )}
      {featured.map((f, idx) => {
        const pos = (idx - active + n) % n; // 0 = front card while collapsed
        const target = open
          ? { y: -(n - 1 - idx) * (CARD_H + CARD_GAP), scale: 1, opacity: 1 }
          : { y: -pos * 8, scale: 1 - pos * 0.04, opacity: pos === 0 ? 1 : pos === 1 ? 0.6 : 0.35 };
        const showContent = open || pos === 0;
        const inner = (
          <>
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/50">
              <Image src={f.img} alt="" fill sizes="56px" className="object-cover object-left-top" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-white/80">
                <span>{f.kind}</span>
                <span>{f.year}</span>
              </span>
              <span className="block truncate font-display text-[15px] font-extrabold uppercase tracking-tight">{f.title}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                View case study <ArrowUpRight className="size-3" />
              </span>
            </span>
          </>
        );
        const linkClass = `focus-ring glass flex h-full items-center gap-3 rounded-2xl p-2.5 pr-4 text-white transition-opacity duration-300 ${
          showContent ? "opacity-100" : "opacity-0"
        }`;
        return (
          <motion.div
            key={f.title}
            initial={false}
            animate={target}
            transition={{ type: "spring", stiffness: 260, damping: 28, delay: open ? (n - 1 - idx) * 0.04 : 0 }}
            className="absolute inset-x-0 bottom-0 origin-top"
            style={{
              height: CARD_H,
              zIndex: open ? n - idx : n - pos,
              pointerEvents: showContent ? "auto" : "none",
            }}
          >
            {/* the glass shell stays visible behind the front card even while its content is hidden */}
            {!showContent && <span aria-hidden className="glass absolute inset-0 rounded-2xl" />}
            {f.external ? (
              <a href={f.href} target="_blank" rel="noreferrer" className={linkClass} tabIndex={showContent ? 0 : -1}>
                {inner}
              </a>
            ) : (
              <Link href={f.href} className={linkClass} tabIndex={showContent ? 0 : -1}>
                {inner}
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-24%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[660px] overflow-hidden bg-[#4f86b4] text-white">
      {/* background: starts on the sky, pans down to the hill as you scroll */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-x-0 top-0 h-[132%] origin-top will-change-transform">
        <Image
          src="/images/hero-sky-hill.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,40,70,0.28)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0)_60%,rgba(10,30,10,0.38)_100%)]" />

      {/* will-change: keep this on its own GPU layer so scrolling moves/fades it without repainting (big perf win on high-DPI phones) */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 flex h-full flex-col will-change-[transform,opacity]">
        {/* top bar */}
        <header className="relative flex flex-col items-center gap-4 px-4 pt-5 lg:block lg:px-8 lg:pt-6">
          <Link href="/" className="font-display text-lg font-extrabold uppercase tracking-tight drop-shadow-sm lg:absolute lg:left-1/2 lg:top-6 lg:-translate-x-1/2">
            Manit Agarwal
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="glass inline-flex items-center gap-3 rounded-2xl py-2 pl-2 pr-4"
          >
            {/* full width of the photo, anchored to the top, with a little trimmed off the bottom */}
            <span className="relative aspect-[1170/1250] w-9 shrink-0 overflow-hidden rounded-lg ring-2 ring-white/70 sm:w-10">
              <Image src="/images/manit-photo.jpg" alt="Manit Agarwal" fill sizes="40px" className="object-cover object-top" />
            </span>
            <span className="leading-tight">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
                </span>
                {profile.status}
              </span>
              <span className="mt-1 block font-display text-[13px] font-bold uppercase tracking-tight">
                {profile.name} — {profile.role}
              </span>
            </span>
          </motion.div>
        </header>

        {/* headline, centered */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-4 lg:pb-20">
          <h1 className="display relative will-change-transform text-center text-[clamp(44px,12.4vw,72px)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)] md:text-[clamp(64px,10vw,96px)] lg:text-left lg:text-[clamp(72px,7.6vw,122px)]">
            {hero.headline.map((line, idx) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: "60%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.1 + idx * 0.08 }}
              >
                {line}
              </motion.span>
            ))}
            <TagSticker label={hero.stickers[0]} color="#34c75a" rotate={-10} delay={0.7} className="right-[-2%] top-[-17%] lg:right-[-14%] lg:top-[-10%]" icon={<Bolt className="size-3 sm:size-3.5" />} />
            <TagSticker label={hero.stickers[1]} color="#ec68fd" rotate={8} delay={0.85} className="right-[-3%] top-[80%] lg:right-[2%] lg:top-[29%]" icon={<Briefcase className="size-3 sm:size-3.5" />} />
            <TagSticker label={hero.stickers[2]} color="#8168fd" rotate={-12} delay={1} className="left-[-3%] top-[80%] lg:left-[-12%] lg:top-[70%]" icon={<Sparkle className="size-3 sm:size-3.5" />} />
          </h1>
        </div>

        {/* bottom row */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between px-8 pb-7 lg:flex">
          <p className="max-w-[340px] text-right font-display text-[17px] font-bold leading-[1.1] tracking-tight drop-shadow">
            <span className="mr-1 inline-block w-5 border-t-2 border-white align-middle" /> {hero.taglineLead}
            <br />
            {hero.tagline}
          </p>
          <div className="pointer-events-auto mb-1">
            <FeaturedDeck />
          </div>
        </div>
      </motion.div>

      <GooglyEyes className="absolute left-[7%] top-[24%] z-10 hidden lg:inline-flex" size={20} />
    </section>
  );
}
