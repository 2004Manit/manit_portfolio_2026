"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useTransform } from "motion/react";
import { nav, profile } from "@/content/site";
import { GooglyEyes, TagSticker } from "../Decor";
import { FileText, LinkedIn, Mail, Sparkle, Briefcase, Bolt } from "../Icons";
import ResumeRequest from "../ResumeRequest";
import { useScrollTo } from "../SmoothScroll";
import { dockMerge, itemProgress, smoothstep } from "../dockMerge";

/** footer nav word — fades/grows in as its dock tile flies into it (see Dock.tsx) */
function NavWord({ id, label, index, total }: { id: string; label: string; index: number; total: number }) {
  const reveal = useTransform(dockMerge, (p) => smoothstep(0.5, 1, itemProgress(p, index, total)));
  const scale = useTransform(reveal, (v) => 0.6 + 0.4 * v);
  return (
    <motion.span
      data-dock-target={id}
      style={{ opacity: reveal, scale }}
      // always visible while keyboard-focused
      className="inline-block group-hover:underline group-focus-visible:opacity-100! group-focus-visible:transform-none!"
    >
      {label}
    </motion.span>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-butter px-3 pb-8 pt-3 sm:px-4 sm:pb-28 sm:pt-4">
      {/* faint oversized background type */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 overflow-hidden opacity-[0.22]">
        {["let's talk · let's talk ·", "let's build · let's build ·"].map((t, i) => (
          <span
            key={t}
            className="display whitespace-nowrap text-[22vw] text-transparent [-webkit-text-stroke:2px_#d4c34a]"
            style={{ transform: `translateX(${i ? "-12%" : "-4%"}) rotate(-6deg)` }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative min-h-[560px] overflow-hidden rounded-[22px] text-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] sm:min-h-[600px] md:min-h-[78svh]">
        {/* calmer colour and brightness so the white type reads clearly */}
        <Image
          src="/images/meadow-footer-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%] brightness-[0.86] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,40,80,0.42)_0%,rgba(15,40,80,0.08)_32%,rgba(0,0,0,0)_45%,rgba(10,30,10,0.3)_70%,rgba(10,30,10,0.6)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_18%_78%,rgba(0,0,0,0.22),transparent_70%)]" />

        <div className="relative flex min-h-[inherit] flex-col justify-between p-5 sm:p-7 md:p-9">
          <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="focus-ring grid size-10 place-items-center rounded-full bg-white text-ink shadow transition hover:-translate-y-0.5"
              >
                <LinkedIn className="size-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="focus-ring grid size-10 place-items-center rounded-full bg-white text-ink shadow transition hover:-translate-y-0.5"
              >
                <Mail className="size-[18px]" />
              </a>
            </div>
            <p className="max-w-[300px] font-display text-[19px] font-bold leading-[1.1] tracking-tight drop-shadow sm:text-right">
              <span className="mr-1 inline-block w-5 border-t-2 border-white align-middle" /> Hiring for an APM or PM intern role?
              <br />
              Let&apos;s talk about your product.
            </p>
          </div>

          <GooglyEyes className="absolute left-[52%] top-[42%]" size={22} />

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display relative text-[clamp(46px,9vw,124px)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">
              Let&apos;s build
              <br />
              something
              <br />
              worth using
              <TagSticker label="Product" color="#ec68fd" rotate={-8} className="left-[-2%] top-[-8%]" icon={<Briefcase className="size-3 sm:size-3.5" />} />
              <TagSticker label="Growth" color="#34c75a" rotate={9} className="right-[4%] top-[-12%] sm:right-[-14%] sm:top-[34%]" icon={<Bolt className="size-3 sm:size-3.5" />} />
              <TagSticker label="AI" color="#8168fd" rotate={-6} className="bottom-[-16%] left-[38%] sm:bottom-[2%] sm:left-[-3%]" icon={<Sparkle className="size-3 sm:size-3.5" />} />
            </h2>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-ink shadow-lg transition hover:-translate-y-0.5"
              >
                <Mail className="size-4" /> Email me
              </a>
              <ResumeRequest className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink/80 px-5 py-3 text-[15px] font-bold text-white shadow-lg ring-1 ring-white/30 backdrop-blur transition hover:-translate-y-0.5">
                <FileText className="size-4" /> Request resume
              </ResumeRequest>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex flex-col gap-4 px-2 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-xl font-extrabold uppercase tracking-tight">{profile.name}</span>
        {/* hidden on phones — the dock covers navigation there */}
        <ul data-dock-row className="hidden flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold uppercase tracking-wide text-ink sm:flex">
          {nav.map((n, i) => (
            <li key={n.id}>
              {pathname === "/" ? (
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(`#${n.id}`);
                  }}
                  className="focus-ring group rounded"
                >
                  <NavWord id={n.id} label={n.label} index={i} total={nav.length} />
                </a>
              ) : (
                <Link href={`/#${n.id}`} className="focus-ring group rounded">
                  <NavWord id={n.id} label={n.label} index={i} total={nav.length} />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <span className="text-[13px] font-medium text-ink-2">© {year} {profile.name}</span>
      </div>
    </footer>
  );
}
