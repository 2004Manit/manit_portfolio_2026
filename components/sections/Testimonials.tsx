"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/content/site";
import { Doodles, GooglyEyes, Reveal, SectionSticker } from "../Decor";
import { Close, LinkedIn, Star } from "../Icons";
import { Pin } from "./About";

function PeelCorner() {
  return (
    <span aria-hidden className="absolute bottom-0 right-0 size-14 overflow-hidden rounded-br-[20px]">
      <span className="absolute inset-0 bg-[#ff7a1a] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      <span className="absolute inset-0 bg-forest [clip-path:polygon(100%_0,0_100%,0_0)] shadow-[3px_-3px_8px_rgba(0,0,0,0.3)]" />
    </span>
  );
}

function Person({ t, small = false }: { t: Testimonial; small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow ${small ? "size-11" : "size-12"}`}>
        <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0 leading-tight">
        <a
          href={t.linkedin}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-1.5 rounded font-bold text-ink hover:underline"
        >
          {t.name}
          <LinkedIn className="size-3.5 text-[#0a66c2]" />
        </a>
        <span className="mt-0.5 block text-[12.5px] font-medium text-ink-2">{t.title}</span>
      </span>
    </div>
  );
}

function ReadMore({ t, onClose }: { t: Testimonial | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (t && !d.open) d.showModal();
    if (!t && d.open) d.close();
  }, [t]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(640px,calc(100vw-32px))] max-h-[min(84vh,760px)] overflow-hidden rounded-[22px] bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      {t && (
        <div className="flex max-h-[min(84vh,760px)] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
            <Person t={t} small />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring grid size-9 shrink-0 place-items-center rounded-full bg-cream transition hover:bg-pink"
            >
              <Close className="size-4" />
            </button>
          </div>
          <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-5 sm:p-6">
            <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-wide text-ink-2">
              {t.date} · {t.relation} · via LinkedIn
            </p>
            <div className="space-y-4 text-[15.5px] leading-relaxed text-ink">
              {t.full.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null);
  const tilts = [-3, 3.5];

  return (
    <section id="kind-words" className="grid-paper relative overflow-hidden px-4 pb-28 pt-24 md:pb-36 md:pt-32">
      <Doodles
        items={[
          { s: "Dot", c: "#f472b6", x: "5%", y: "8%" },
          { s: "Leaf", c: "#d6f264", x: "3%", y: "30%", r: -6, hideMobile: true },
          { s: "Wave", c: "#7fb3ff", x: "88%", y: "8%" },
          { s: "Cursor", c: "#7ea7ff", x: "8%", y: "80%", r: -10, hideMobile: true },
          { s: "Zig", c: "#f9a8b8", x: "84%", y: "84%", r: 8 },
          { s: "Diamond", c: "#60a5fa", x: "92%", y: "46%", hideMobile: true },
        ]}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="Kind words" icon={<Star className="size-3.5" />} color="#ff9f1a" rotate={-10} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            People I&apos;ve
            <br />
            worked with
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-8">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ rotate: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-[20px] bg-white p-6 pb-7 shadow-[var(--shadow-card)] sm:p-7 ${i === 1 ? "md:mt-10" : ""}`}
          >
            <Pin className="left-4 top-4" />
            <div className="mt-2">
              <Person t={t} />
            </div>
            <p className="mt-5 font-display text-[clamp(20px,2.2vw,25px)] font-bold leading-[1.15] tracking-tight">
              &ldquo;{t.highlight}&rdquo;
            </p>
            <p className="mt-4 line-clamp-4 text-[14.5px] leading-relaxed text-ink-2">{t.full[0]}</p>
            <div className="mt-5 flex items-center justify-between gap-3 pr-10">
              <span className="text-[12px] font-semibold text-ink-2">
                {t.relation}
                <span className="mx-1.5 text-ink/30">·</span>
                {t.date}
              </span>
              <button
                type="button"
                onClick={() => setActive(t)}
                className="focus-ring shrink-0 rounded-full bg-ink px-4 py-2 text-[13px] font-bold text-white transition hover:-translate-y-0.5"
              >
                Read more
              </button>
            </div>
            <PeelCorner />
          </motion.article>
        ))}
        <GooglyEyes className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 md:inline-flex" size={18} />
      </div>
      <ReadMore t={active} onClose={() => setActive(null)} />
    </section>
  );
}
