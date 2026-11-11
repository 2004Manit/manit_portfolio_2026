"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/content/site";
import { useScrollLock } from "./SmoothScroll";

/**
 * "Request my resume": a button that opens a small popup asking for the visitor's email.
 * On send, Web3Forms (https://web3forms.com) emails that address to Manit — no backend, no database.
 * The resume itself is never on the site; Manit replies to each request personally.
 */
export default function ResumeRequest({ className, children }: { className: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button ref={trigger} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence onExitComplete={() => trigger.current?.focus({ preventScroll: true })}>
            {open && <RequestDialog key="resume-request" onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function RequestDialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const lock = useScrollLock();
  const titleId = useId();
  const descId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const doneRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lock(true);
    inputRef.current?.focus({ preventScroll: true });
    return () => lock(false);
  }, [lock]);

  // Esc closes from anywhere (focus may sit on <body> after the form is swapped for the "sent" message)
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // after sending, move focus to "Done" so keyboard users stay inside the popup
  useEffect(() => {
    if (status === "sent") doneRef.current?.focus({ preventScroll: true });
  }, [status]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !boxRef.current) return;
    // keep keyboard focus inside the popup
    const f = boxRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const botcheck = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked ?? false;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.resumeRequestKey,
          subject: `Resume request from ${email}`,
          from_name: "Portfolio — resume request",
          email, // Web3Forms uses this as the reply-to, so Manit can simply hit "Reply"
          message: `${email} requested your resume from your portfolio.`,
          page: window.location.href,
          botcheck,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      setStatus(res.ok && data?.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const from = reduce ? { opacity: 0, scale: 0.98 } : { opacity: 0, scale: 0.92, y: 16 };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onKeyDown={onKeyDown}
    >
      {/* dimmed, blurred page behind — click to close */}
      <div aria-hidden className="absolute inset-0 bg-[#16181d]/55 backdrop-blur-[6px]" onClick={onClose} />

      <motion.div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={from}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={from}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full max-w-[420px] rounded-[22px] bg-white p-6 text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:p-7"
      >
        {status === "sent" ? (
          <div role="status">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-mint text-[#16a34a]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h2 id={titleId} className="mt-4 font-display text-[24px] font-extrabold leading-tight tracking-tight">
              Request sent
            </h2>
            <p id={descId} className="mt-2 text-[15px] leading-relaxed text-ink-2">
              Thanks! I&apos;ll email my resume to <span className="font-semibold text-ink">{email}</span> personally, soon.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                ref={doneRef}
                type="button"
                onClick={onClose}
                className="focus-ring inline-flex items-center rounded-xl bg-ink px-5 py-2.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 id={titleId} className="font-display text-[24px] font-extrabold leading-tight tracking-tight">
              Request my resume
            </h2>
            <p id={descId} className="mt-2 text-[15px] leading-relaxed text-ink-2">
              Leave your email and I&apos;ll send my resume to you personally.
            </p>

            <label htmlFor={`${titleId}-email`} className="mt-5 block text-[13px] font-semibold text-ink-2">
              Your email
            </label>
            <input
              ref={inputRef}
              id={`${titleId}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              disabled={status === "sending"}
              className="mt-1.5 w-full rounded-xl bg-[#f2f1ec] px-4 py-3 text-[15px] font-medium text-ink outline-none ring-1 ring-black/5 transition placeholder:text-muted focus:bg-white focus:ring-2 focus:ring-sky"
            />
            {/* spam trap: hidden from people, bots tend to tick it */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            {status === "error" && (
              <p role="alert" className="mt-3 text-[13.5px] font-medium text-[#d93636]">
                Couldn&apos;t send right now. Please try again, or email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                  {profile.email}
                </a>
                .
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="focus-ring inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-[15px] font-bold text-ink ring-1 ring-black/10 transition hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#28c840] px-5 py-2.5 text-[15px] font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
