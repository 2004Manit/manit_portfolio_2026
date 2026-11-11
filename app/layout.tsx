import type { Metadata, Viewport } from "next";
import { Mona_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Dock from "@/components/Dock";
import Intro from "@/components/Intro";
import { INTRO_KEY } from "@/components/introKey";
import { profile } from "@/content/site";

const mona = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  axes: ["wdth"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Product Manager`,
  description:
    "Manit Agarwal — aspiring product manager. Founder of Housing DTU (3,000+ users), PM intern at Holiday Tribe, builder of Compass AI. Case studies and interactive product teardowns.",
  openGraph: {
    title: `${profile.name} — Product Manager`,
    description: "Building products people come back to. Case studies, teardowns and shipped work.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below may add a class to <html> before React hydrates
    <html lang="en" className={`${mona.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* runs before first paint: if this tab has already seen the intro (or prefers reduced motion), hide it — no flash on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("${INTRO_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen")}catch(e){}})()`,
          }}
        />
        <noscript>
          <style>{`[data-intro]{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll>
          {children}
          <Dock />
          <Intro />
        </SmoothScroll>
      </body>
    </html>
  );
}
