import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Download = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export const FileText = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

/* ---------- illustrated marks for the Experience rows (white on the coloured dot) ---------- */

/** Holiday Tribe — a paper plane mid-flight with a little trail */
export const TravelPlane = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M21 3 3 10.2l7 2.8 2.8 7L21 3Z" fill="currentColor" fillOpacity={0.25} />
    <path d="M21 3 10 13" />
    <path d="M3.5 17.5c1.6-.4 2.6.6 4 .2" opacity={0.7} />
  </svg>
);

/** Housing DTU — a house with a lit window */
export const HomeKey = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5.5 9.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
    <rect x="9.5" y="12.5" width="5" height="4.5" rx="0.8" fill="currentColor" fillOpacity={0.25} />
    <path d="M12 12.5V17M9.5 14.75h5" />
  </svg>
);

/** Compass AI — a compass rose with a sparkle */
export const CompassSpark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <circle cx="11" cy="13" r="7.5" />
    <path d="m14.2 9.8-2 4.6-4.4 1.8 2-4.6 4.4-1.8Z" fill="currentColor" fillOpacity={0.3} />
    <path d="M19.5 2.5c.15 1.4.75 2 2 2.2-1.25.2-1.85.8-2 2.2-.15-1.4-.75-2-2-2.2 1.25-.2 1.85-.8 2-2.2Z" fill="currentColor" stroke="none" />
  </svg>
);

/** IIIT Allahabad (sign-language detection) — an open hand with a detection frame */
export const SignHand = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M9 12.5V6.5a1.25 1.25 0 0 1 2.5 0v5M11.5 11V5a1.25 1.25 0 0 1 2.5 0v6M14 11V6.5a1.25 1.25 0 0 1 2.5 0V14a5 5 0 0 1-5 5h-.6a4.5 4.5 0 0 1-3.6-1.8L5.2 14.4a1.3 1.3 0 0 1 1.9-1.8L9 14" />
    <path d="M2.5 6V3.5a1 1 0 0 1 1-1H6M18 2.5h2.5a1 1 0 0 1 1 1V6M21.5 18v2.5a1 1 0 0 1-1 1H18" opacity={0.7} />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2c.4 4.6 2.4 7.6 8 10-5.6 2.4-7.6 5.4-8 10-.4-4.6-2.4-7.6-8-10 5.6-2.4 7.6-5.4 8-10Z" />
  </svg>
);

export const Briefcase = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
  </svg>
);

export const Person = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
  </svg>
);

export const Folder = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden {...p}>
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 2.8Z" />
  </svg>
);

export const Chat = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden {...p}>
    <path d="M4 12a8 7 0 1 1 3.4 5.7L4 19l1.1-3.1A6.6 6.6 0 0 1 4 12Z" />
  </svg>
);

export const Bolt = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

export const Compass = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const Quote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M10 7H6.5A2.5 2.5 0 0 0 4 9.5V13h4v4H4M20 7h-3.5A2.5 2.5 0 0 0 14 9.5V13h4v4h-4" />
  </svg>
);

/* ---------- glossy app-style tiles used by the dock ---------- */

type TileProps = { gradient: [string, string]; children: React.ReactNode; badge?: boolean };

export function AppTile({ gradient, children, badge }: TileProps) {
  return (
    <span
      className="relative grid size-full place-items-center rounded-[28%] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.12),0_4px_10px_-4px_rgba(0,0,0,0.45)]"
      style={{ background: `linear-gradient(160deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      <span className="pointer-events-none absolute inset-x-[8%] top-[5%] h-[42%] rounded-[40%] bg-gradient-to-b from-white/45 to-white/0" />
      <span className="relative size-[52%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">{children}</span>
      {badge && (
        <span className="absolute -right-1 -top-1 grid size-[34%] min-h-3.5 min-w-3.5 place-items-center rounded-full bg-red text-[9px] font-bold text-white ring-2 ring-white">
          1
        </span>
      )}
    </span>
  );
}
