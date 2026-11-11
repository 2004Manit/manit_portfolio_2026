"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { creative, type CreativePiece } from "@/content/site";
import { Doodles, Reveal, SectionSticker } from "../Decor";
import { Play, Sparkle } from "../Icons";

function Media({ c }: { c: CreativePiece }) {
  const [playing, setPlaying] = useState(false);
  const ratio = c.aspect === "16/9" ? "aspect-video" : c.aspect === "1/1" ? "aspect-square" : c.aspect === "wide" ? "aspect-[1707/921]" : "aspect-[640/674]";

  if (c.type === "video") {
    return (
      <div className={`relative overflow-hidden rounded-[12px] bg-ink ${ratio}`}>
        {playing ? (
          <video
            src={c.src}
            poster={c.poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${c.title}`}
            className="focus-ring group absolute inset-0"
          >
            {c.poster && <Image src={c.poster} alt="" fill sizes="(min-width:1024px) 60vw, 92vw" className="object-cover" />}
            <span className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-6" />
            </span>
          </button>
        )}
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-[12px] bg-cream ${ratio}`}>
      <Image src={c.src} alt={c.title} fill sizes="(min-width:1024px) 60vw, 92vw" className="object-cover" />
    </div>
  );
}

export default function Creative() {
  const tilts = [-1.5, 2, 1.5, -2.5];
  const spans = ["lg:col-span-2", "", "lg:col-span-2", ""];

  return (
    <section id="creative" className="grid-paper relative overflow-hidden px-4 pb-28 pt-20 md:pb-36 md:pt-28">
      <Doodles
        items={[
          { s: "Cloud", c: "#5b6b8c", x: "8%", y: "6%" },
          { s: "Squiggle", c: "#f9c46b", x: "82%", y: "8%", r: 10 },
          { s: "Diamond", c: "#4ade80", x: "4%", y: "52%", hideMobile: true },
          { s: "Dot", c: "#f472b6", x: "94%", y: "70%", hideMobile: true },
        ]}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="Beyond PM" icon={<Sparkle className="size-3.5" />} color="#8168fd" rotate={-10} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            I also make
            <br />
            the launch
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[17px] font-medium leading-snug text-ink-2">
            Ads, product demos, launch films and brand visuals for my own products — concept to final edit, done solo.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {creative.map((c, i) => (
          <motion.figure
            key={c.title}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 2) * 0.08 }}
            className={`self-start rounded-[18px] bg-white p-2.5 shadow-[var(--shadow-card)] ${spans[i]}`}
          >
            <Media c={c} />
            <figcaption className="flex items-baseline justify-between gap-3 px-1.5 pb-1.5 pt-3">
              <span className="font-display text-[17px] font-extrabold tracking-tight">{c.title}</span>
              <span className="text-right text-[12.5px] font-semibold text-ink-2">{c.caption}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
