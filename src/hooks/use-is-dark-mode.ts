"use client";

import { useSyncExternalStore } from "react";

const query = () => window.matchMedia("(prefers-color-scheme: dark)");

function subscribe(onChange: () => void) {
  const q = query();
  q.addEventListener("change", onChange);
  return () => q.removeEventListener("change", onChange);
}

/**
 * Live-tracks the OS light/dark preference via prefers-color-scheme.
 * useSyncExternalStore gives a dedicated server snapshot (always `false`,
 * matching SSR where there's no `window`) so client and server render agree
 * on first paint — no hydration mismatch, no setState-in-effect lint error.
 */
export function useIsDarkMode() {
  return useSyncExternalStore(subscribe, () => query().matches, () => false);
}
