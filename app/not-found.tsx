import type { Metadata } from "next";
import Link from "next/link";
import { Doodles, GooglyEyes, SectionSticker, TagSticker } from "@/components/Decor";
import { ArrowRight, Compass, Folder } from "@/components/Icons";

// shown for any mistyped or old link (Next.js returns a 404 status and adds noindex automatically)
export const metadata: Metadata = {
  title: "Page not found · Manit Agarwal",
};

export default function NotFound() {
  return (
    <main className="grid-paper relative flex min-h-svh items-center justify-center overflow-hidden px-4 pb-32 pt-16">
      <Doodles
        items={[
          { s: "Squiggle", c: "#f9c46b", x: "8%", y: "14%", r: -8 },
          { s: "Dot", c: "#f472b6", x: "86%", y: "12%" },
          { s: "Cursor", c: "#e0fd72", x: "80%", y: "70%", r: 10 },
          { s: "Wave", c: "#7fb3ff", x: "6%", y: "72%", hideMobile: true },
          { s: "Cloud", c: "#5b6b8c", x: "90%", y: "40%", hideMobile: true },
          { s: "Diamond", c: "#8a72f5", x: "14%", y: "44%", hideMobile: true },
        ]}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <SectionSticker label="Page not found" icon={<Compass className="size-3.5" />} color="#ec68fd" rotate={-8} />

        <p aria-hidden className="display relative mx-auto mt-6 w-fit text-[clamp(120px,30vw,260px)] leading-[0.85]">
          404
          <GooglyEyes className="absolute -top-[6%] right-[8%]" size={26} />
          <TagSticker label="Off the map" color="#34c75a" rotate={8} className="-right-[14%] bottom-[8%] sm:-right-[18%]" />
        </p>

        <h1 className="display mt-6 text-[clamp(30px,5.6vw,56px)]">This page wandered off</h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
          The link might be mistyped, or the page may have moved. Everything else is right where you left it.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Back to portfolio <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/#work"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-ink shadow-lg ring-1 ring-black/10 transition hover:-translate-y-0.5"
          >
            <Folder className="size-4" /> See my work
          </Link>
        </div>
      </div>
    </main>
  );
}
