import { motionValue } from "motion/react";

/**
 * Shared progress of the dock → footer-words morph.
 * 0 = dock visible at the bottom of the screen, 1 = dock gone, footer nav words visible.
 * Driven by <Dock/>, read by the footer nav words.
 */
export const dockMerge = motionValue(0);

const STAGGER = 0.07; // each item starts a little after the previous one

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** progress (0–1) of item `i` of `n`, staggered across the overall progress */
export function itemProgress(p: number, i: number, n: number) {
  return clamp01((p - i * STAGGER) / (1 - STAGGER * (n - 1)));
}

export function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
