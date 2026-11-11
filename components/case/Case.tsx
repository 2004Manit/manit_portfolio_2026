"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { GooglyEyes, Reveal, SectionSticker } from "../Decor";
import { ArrowRight, ArrowUpRight, Folder } from "../Icons";
import { FoldCorner, Pin } from "../sections/About";
import { PaperClip } from "../sections/Projects";

/* ---------------- hero ---------------- */

export function CaseHero({
  bg,
  title,
  lede,
  meta,
  links = [],
}: {
  bg: string;
  title: string;
  lede: string;
  meta: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <header className="relative overflow-hidden px-4 pb-20 pt-6 text-white md:pb-28">
      <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,35,70,0.45)_0%,rgba(0,0,0,0.05)_45%,rgba(10,30,10,0.5)_100%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#work"
            className="glass focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:bg-white/30"
          >
            <ArrowRight className="size-4 rotate-180" /> All work
          </Link>
          <Link href="/" className="font-display text-lg font-extrabold uppercase tracking-tight">
            Manit Agarwal
          </Link>
        </div>
        <div className="pt-20 md:pt-28">
          <SectionSticker label="Case study" icon={<Folder className="size-3.5" />} color="#039cfb" rotate={-8} />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            className="display mt-4 text-[clamp(52px,11vw,150px)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.2)]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 max-w-2xl font-display text-[clamp(19px,2.3vw,26px)] font-bold leading-[1.15] tracking-tight drop-shadow"
          >
            {lede}
          </motion.p>
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {meta.map((m) => (
              <span key={m} className="glass rounded-full px-3.5 py-1.5 text-[13px] font-semibold">
                {m}
              </span>
            ))}
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-ink transition hover:-translate-y-0.5"
              >
                {l.label} <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <GooglyEyes className="absolute bottom-[18%] right-[10%] hidden md:inline-flex" size={20} />
    </header>
  );
}

/* ---------------- metric cards ---------------- */

const tilts = [-3, 2.5, -2, 3];

export function Metrics({ items }: { items: { value: string; label: string; note: string }[] }) {
  return (
    <div className="relative z-10 mx-auto -mt-12 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4 md:-mt-16">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: tilts[i % 4] }}
          viewport={{ once: true }}
          whileHover={{ rotate: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: i * 0.07 }}
          className="relative rounded-[18px] bg-white p-6 pt-7 shadow-[var(--shadow-card)]"
        >
          <Pin className="left-4 top-4" />
          <FoldCorner />
          <div className="mt-3 font-display text-[40px] font-extrabold leading-none tracking-tight">{s.value}</div>
          <div className="mt-3 text-[16px] font-bold">{s.label}</div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.note}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- chapter ---------------- */

const chapterColors = ["#fedcdd", "#bbdafe", "#f3ea9a", "#c7f8d9", "#e2dcfd", "#e0fd72"];

export function Chapter({
  n,
  kicker,
  title,
  children,
}: {
  n: number;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-20">
      <div className="md:sticky md:top-10 md:self-start">
        <span
          className="inline-grid size-14 place-items-center rounded-2xl font-display text-xl font-extrabold shadow-[var(--shadow-sticker)] ring-4 ring-white"
          style={{ background: chapterColors[(n - 1) % chapterColors.length], rotate: n % 2 ? "-6deg" : "5deg" }}
        >
          {String(n).padStart(2, "0")}
        </span>
        <p className="mt-4 text-[13px] font-bold uppercase tracking-wider text-ink-2">{kicker}</p>
      </div>
      <div>
        <Reveal>
          <h2 className="display text-[clamp(30px,4.6vw,56px)]">{title}</h2>
        </Reveal>
        <div className="mt-7 space-y-6">{children}</div>
      </div>
    </section>
  );
}

/* ---------------- note blocks inside a chapter ---------------- */

export function Note({ label, color = "pink", children }: { label: string; color?: string; children: React.ReactNode }) {
  const bg: Record<string, string> = {
    pink: "bg-pink",
    blue: "bg-blue",
    butter: "bg-butter",
    mint: "bg-mint",
    lavender: "bg-lavender",
    lime: "bg-lime",
  };
  return (
    <Reveal>
      <div className={`${bg[color]} rounded-2xl p-5 ring-1 ring-black/5 sm:p-6`}>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink/70">{label}</p>
        <div className="mt-2 space-y-3 text-[16px] leading-relaxed text-ink [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[10px] [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-ink/40 [&_li]:before:content-[''] [&_strong]:font-bold [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="space-y-4 text-[17px] leading-relaxed text-ink [&_strong]:font-bold">{children}</div>
    </Reveal>
  );
}

/* ---------------- framed screenshot ---------------- */

export function Shot({ src, alt, caption, w, h, tilt = -1.5 }: { src: string; alt: string; caption?: string; w: number; h: number; tilt?: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 16 }}
      className="relative rounded-[16px] bg-white p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
    >
      <PaperClip className="absolute -top-5 left-8 rotate-12" color="#7c9bff" />
      <div className="flex items-center gap-1.5 px-1.5 pb-2 pt-0.5">
        <span className="size-2.5 rounded-[3px] bg-[#ff9db1]" />
        <span className="size-2.5 rounded-full bg-[#7ab8ff]" />
        <span className="size-0 border-x-[5px] border-b-[9px] border-x-transparent border-b-[#f5c84b]" />
      </div>
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width:1024px) 860px, 94vw" className="h-auto w-full rounded-[10px]" />
      {caption && <figcaption className="px-1.5 pb-1.5 pt-2.5 text-[13px] font-semibold text-ink-2">{caption}</figcaption>}
    </motion.figure>
  );
}

/* ---------------- flow chips ---------------- */

export function Flow({ steps }: { steps: string[] }) {
  return (
    <Reveal>
      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className="rounded-xl bg-white px-3.5 py-2 text-[14px] font-bold shadow-[var(--shadow-sticker)]"
              style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
            >
              {s}
            </span>
            {i < steps.length - 1 && <ArrowRight className="size-4 text-ink/50" />}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/* ---------------- pull quote ---------------- */

export function PullQuote({ quote, name, title, photo }: { quote: string; name: string; title: string; photo: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <motion.blockquote
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
        className="relative rounded-[22px] bg-white p-7 shadow-[var(--shadow-card)] sm:p-10"
      >
        <Pin className="left-5 top-5" />
        <p className="font-display text-[clamp(21px,2.8vw,32px)] font-bold leading-[1.18] tracking-tight">&ldquo;{quote}&rdquo;</p>
        <footer className="mt-6 flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-white shadow">
            <Image src={photo} alt={name} fill sizes="44px" className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block font-bold">{name}</span>
            <span className="text-[13px] font-medium text-ink-2">{title}</span>
          </span>
        </footer>
      </motion.blockquote>
    </section>
  );
}

/* ---------------- next case ---------------- */

export function NextCase({ href, title, kicker }: { href: string; title: string; kicker: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <Link
        href={href}
        className="focus-ring group relative block overflow-hidden rounded-[22px] bg-ink p-8 text-white shadow-[var(--shadow-card)] sm:p-12"
      >
        <p className="text-[13px] font-bold uppercase tracking-wider text-white/60">{kicker}</p>
        <p className="display mt-3 text-[clamp(40px,8vw,104px)] transition-transform duration-500 group-hover:translate-x-2">
          {title}
        </p>
        <span className="absolute bottom-8 right-8 grid size-14 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45 sm:bottom-12 sm:right-12">
          <ArrowUpRight className="size-6" />
        </span>
      </Link>
    </section>
  );
}
