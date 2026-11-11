"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { builtProjects, teardowns, type Project } from "@/content/site";
import { GooglyEyes, Reveal, SectionSticker } from "../Decor";
import { ArrowUpRight, Folder } from "../Icons";
import { useOpenBrief } from "../ProjectBrief";

export function PaperClip({ color = "#8aa4ff", className = "" }: { color?: string; className?: string }) {
  return (
    <svg aria-hidden width="22" height="46" viewBox="0 0 22 46" fill="none" className={className}>
      <path
        d="M16 14v20a5 5 0 0 1-10 0V9a3.5 3.5 0 0 1 7 0v23a1.5 1.5 0 0 1-3 0V13"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const clipColors = ["#7c9bff", "#ff8fa3", "#f5c84b", "#5fd08a"];

export function BrowserCard({ p, i, size = "lg" }: { p: Project; i: number; size?: "lg" | "md" }) {
  const openBrief = useOpenBrief();
  const tilt = [-3, 2.5, -2, 3, -2.5, 2][i % 6];
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ rotate: 0, y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 140, damping: 16, delay: (i % 4) * 0.06 }}
      className="relative rounded-[16px] bg-white p-2 pb-0 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5"
    >
      <PaperClip color={clipColors[i % 4]} className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-12" />
      {/* window chrome */}
      <div className="flex items-center gap-1.5 px-1.5 pb-2 pt-0.5">
        <span className="size-2.5 rounded-[3px] bg-[#ff9db1]" />
        <span className="size-2.5 rounded-full bg-[#7ab8ff]" />
        <span className="size-0 border-x-[5px] border-b-[9px] border-x-transparent border-b-[#f5c84b]" />
        {p.logo && (
          <span className="relative ml-auto size-5 overflow-hidden rounded-md ring-1 ring-black/10">
            <Image src={p.logo} alt="" fill sizes="20px" className="object-cover" />
          </span>
        )}
      </div>
      <div className={`relative overflow-hidden rounded-[10px] bg-cream ${size === "lg" ? "aspect-[16/10.5]" : "aspect-[16/10]"}`}>
        <Image
          src={p.image}
          alt={`${p.title} — screenshot`}
          fill
          sizes="(min-width:1280px) 420px, (min-width:768px) 45vw, 92vw"
          className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-end justify-between gap-3 px-1.5 pb-3 pt-2.5">
        <span className="min-w-0">
          <span className="block truncate font-display text-[19px] font-extrabold tracking-tight">{p.title}</span>
          <span className="mt-0.5 block truncate text-[12px] font-semibold text-ink-2">
            {p.kind} <span className="text-ink/30">·</span> {p.meta}
          </span>
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </motion.div>
  );
  const hasBrief = Boolean(p.brief && openBrief);
  // cards with a brief open the quick-look popup; ctrl/cmd-click still opens the link itself
  const onCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!p.brief || !openBrief || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    openBrief(p.brief, e.currentTarget);
  };
  return p.external ? (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="focus-ring group block rounded-[16px]"
      aria-label={hasBrief ? p.title : `${p.title} (opens in a new tab)`}
      aria-haspopup={hasBrief ? "dialog" : undefined}
      onClick={onCardClick}
    >
      {inner}
    </a>
  ) : (
    <Link
      href={p.href}
      className="focus-ring group block rounded-[16px]"
      aria-label={p.title}
      aria-haspopup={hasBrief ? "dialog" : undefined}
      onClick={onCardClick}
    >
      {inner}
    </Link>
  );
}

function GroupLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-wide text-ink shadow-sm backdrop-blur">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} id="work" className="relative overflow-hidden px-4 pb-32 pt-20 md:pb-40 md:pt-24">
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -inset-y-[10%]">
        <Image src="/images/hills-projects.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_35%]" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_30%,rgba(0,0,0,0.12)_100%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="Work" icon={<Folder className="size-3.5" />} color="#039cfb" rotate={-12} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)] text-ink">
            The work behind
            <br />
            the numbers
          </h2>
        </Reveal>
        <GooglyEyes className="mt-4" size={18} />
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl">
        <div className="mb-8 flex justify-center">
          <GroupLabel color="#34c75a">Built &amp; shipped</GroupLabel>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {builtProjects.map((p, i) => (
            <BrowserCard key={p.title} p={p} i={i} />
          ))}
        </div>

        <div className="mb-8 mt-20 flex justify-center">
          <GroupLabel color="#fac900">Interactive product teardowns</GroupLabel>
        </div>
        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {teardowns.map((p, i) => (
            <BrowserCard key={p.title} p={p} i={i + 3} size="md" />
          ))}
        </div>
      </div>
    </section>
  );
}
