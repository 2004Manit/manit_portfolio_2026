"use client";

import { motion } from "motion/react";
import { about, profile } from "@/content/site";
import { Doodles, GooglyEyes, Reveal, SectionSticker } from "../Decor";
import { FileText, Person } from "../Icons";
import ResumeRequest from "../ResumeRequest";
import { useScrollTo } from "../SmoothScroll";

const tilts = [-4, 3, -3, 4];
const lift = ["lg:translate-y-6", "lg:translate-y-1", "lg:-translate-y-4", "lg:translate-y-3"];

export function Pin({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute size-3.5 rounded-full bg-red shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.18),0_2px_3px_rgba(0,0,0,0.3)] ${className}`}
    />
  );
}

export function FoldCorner() {
  return (
    <span aria-hidden className="absolute right-0 top-0 size-12 overflow-hidden rounded-tr-[18px]">
      <span className="absolute inset-0 bg-ink [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <span className="absolute inset-0 bg-lime [clip-path:polygon(0_0,100%_100%,0_100%)] shadow-[-3px_3px_6px_rgba(0,0,0,0.25)]" />
    </span>
  );
}

export default function About() {
  const scrollTo = useScrollTo();
  return (
    <section id="about" className="grid-paper relative overflow-hidden px-4 pb-28 pt-24 md:pb-36 md:pt-32">
      <Doodles
        items={[
          { s: "Leaf", c: "#d6f264", x: "3%", y: "16%", r: -10, hideMobile: true },
          { s: "Cloud", c: "#5b6b8c", x: "10%", y: "9%" },
          { s: "Squiggle", c: "#f9c46b", x: "78%", y: "20%", r: 8, hideMobile: true },
          { s: "Wave", c: "#7fb3ff", x: "86%", y: "6%" },
          { s: "Dot", c: "#f472b6", x: "92%", y: "40%", hideMobile: true },
          { s: "Cursor", c: "#7ea7ff", x: "6%", y: "64%", r: -8, hideMobile: true },
          { s: "Zig", c: "#f9a8b8", x: "12%", y: "78%", r: 12 },
          { s: "Diamond", c: "#60a5fa", x: "88%", y: "84%" },
          { s: "Diamond", c: "#4ade80", x: "8%", y: "86%", hideMobile: true },
        ]}
      />
      <GooglyEyes className="absolute right-[12%] top-[30%] hidden md:inline-flex" size={16} />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionSticker label="About" icon={<Person className="size-3.5" />} color="#039cfb" />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            {about.heading[0]}
            <br />
            {about.heading[1]}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(17px,1.9vw,22px)] font-medium leading-snug text-ink">
            {about.body}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-ink-2">{profile.education}</p>
        </Reveal>
        <Reveal delay={0.14} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ResumeRequest className="focus-ring relative inline-flex -rotate-3 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold shadow-[var(--shadow-sticker)] transition-transform hover:-translate-y-0.5 hover:-rotate-1">
            <Pin className="-right-1.5 -top-1.5" />
            <FileText className="size-4" /> Request my resume
          </ResumeRequest>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="focus-ring inline-flex rotate-2 items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-sticker)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
          >
            Let&apos;s talk
          </a>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-0">
        {about.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.08 }}
            whileHover={{ rotate: 0, y: -8, zIndex: 10 }}
            className={`relative mx-auto w-full max-w-[340px] lg:-mx-2 lg:max-w-none ${lift[i]}`}
          >
            <div className="relative h-full rounded-[18px] bg-white p-6 pt-7 shadow-[var(--shadow-card)]">
              <Pin className="left-4 top-4" />
              <FoldCorner />
              <div className="mt-3 font-display text-[44px] font-extrabold leading-none tracking-tight">{s.value}</div>
              <div className="mt-3 text-[17px] font-bold">{s.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
