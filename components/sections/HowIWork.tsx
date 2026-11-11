"use client";

import { motion } from "motion/react";
import { howIWork } from "@/content/site";
import { Doodles, Reveal, SectionSticker } from "../Decor";
import { Bolt } from "../Icons";

const bg: Record<string, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  butter: "bg-butter",
  mint: "bg-mint",
  lavender: "bg-lavender",
};
const dot: Record<string, string> = {
  pink: "#f58b9a",
  blue: "#4f9cf5",
  butter: "#d9c22b",
  mint: "#3fcf7a",
  lavender: "#8a72f5",
};

export default function HowIWork() {
  return (
    <section id="how-i-work" className="grid-paper relative overflow-hidden px-4 pb-28 pt-24 md:pb-36 md:pt-32">
      <Doodles
        items={[
          { s: "Cursor", c: "#7ea7ff", x: "7%", y: "10%", r: -12 },
          { s: "Zig", c: "#f9a8b8", x: "14%", y: "18%", r: 14, hideMobile: true },
          { s: "Diamond", c: "#4ade80", x: "84%", y: "12%" },
          { s: "Dot", c: "#f472b6", x: "90%", y: "60%", hideMobile: true },
          { s: "Squiggle", c: "#f9c46b", x: "4%", y: "70%", r: -8, hideMobile: true },
          { s: "Wave", c: "#7fb3ff", x: "86%", y: "88%" },
        ]}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="How I work" icon={<Bolt className="size-3.5" />} color="#34c75a" rotate={-10} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            How I get
            <br />
            things shipped
          </h2>
        </Reveal>
      </div>

      <ul className="relative mx-auto mt-12 flex max-w-5xl flex-col gap-3.5">
        {howIWork.map((h, i) => (
          <motion.li
            key={h.title}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.05 }}
            whileHover={{ scale: 1.01, rotate: i % 2 ? 0.6 : -0.6 }}
            className={`${bg[h.color]} grid gap-3 rounded-2xl px-5 py-5 shadow-[0_2px_0_rgba(0,0,0,0.06),0_8px_24px_-14px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-6`}
          >
            <span className="font-display text-[clamp(20px,2.6vw,28px)] font-extrabold uppercase leading-none tracking-tight">
              {h.title}
            </span>
            <span>
              <span className="block text-[15px] font-medium leading-relaxed text-ink">{h.proof}</span>
              <span className="mt-2.5 flex flex-wrap gap-1.5">
                {h.tools.map((t) => (
                  <span key={t} className="rounded-full bg-white/75 px-2.5 py-1 text-[12px] font-semibold text-ink-2 ring-1 ring-black/5">
                    {t}
                  </span>
                ))}
              </span>
            </span>
            <span
              aria-hidden
              className="hidden size-9 place-items-center rounded-full text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] ring-2 ring-white/80 md:grid"
              style={{ background: dot[h.color] }}
            >
              <span className="font-display text-sm font-extrabold">{String(i + 1).padStart(2, "0")}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
