"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/content/site";
import { Doodles, GooglyEyes, Reveal, SectionSticker } from "../Decor";
import { Chat, Plus } from "../Icons";

const bg: Record<string, string> = {
  pink: "bg-pink",
  lime: "bg-lime",
  butter: "bg-butter",
  blue: "bg-blue",
  mint: "bg-mint",
};
const tilts = [-2, 2.5, -1.5, 2, -2.5];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="grid-paper relative overflow-hidden px-4 pb-32 pt-20 md:pb-40 md:pt-28">
      <Doodles
        items={[
          { s: "Wave", c: "#7fb3ff", x: "6%", y: "8%" },
          { s: "Leaf", c: "#d6f264", x: "86%", y: "6%", r: 12, hideMobile: true },
          { s: "Cursor", c: "#7ea7ff", x: "90%", y: "60%", hideMobile: true },
          { s: "Zig", c: "#f9a8b8", x: "5%", y: "78%", r: -8 },
        ]}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionSticker label="FAQs" icon={<Chat className="size-3.5" />} color="#039cfb" rotate={-10} />
        <Reveal>
          <h2 className="display mt-3 text-[clamp(34px,6.4vw,76px)]">
            Quick answers
            <br />
            for recruiters
          </h2>
        </Reveal>
        <GooglyEyes className="mt-4" size={16} />
      </div>

      <ul className="relative mx-auto mt-10 flex max-w-2xl flex-col gap-4">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={f.q}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: isOpen ? 0 : tilts[i] }}
              animate={{ rotate: isOpen ? 0 : tilts[i] }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className={`${bg[f.color]} ${i % 2 ? "sm:ml-16" : "sm:mr-16"} overflow-hidden rounded-2xl shadow-[0_2px_0_rgba(0,0,0,0.06),0_10px_24px_-14px_rgba(0,0,0,0.4)] ring-1 ring-black/5`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-bold sm:text-[17px]"
              >
                {f.q}
                <Plus className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <p className="px-5 pb-5 text-[15.5px] font-medium leading-relaxed text-ink-2">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
