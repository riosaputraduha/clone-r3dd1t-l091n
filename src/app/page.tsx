"use client";

import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { SiteHeader } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/header";
import { AuthModal } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/auth-modal";

export default function Home() {
  const isDark = useIsDarkMode();

  return (
    <>
      {/* Solid base layer behind everything, always on — the mask div below is
          `hidden` under sm: without this, its transparent (unmasked) areas show
          shadcn's globals.css body bg (always dark) instead of the current theme. */}
      <div className={isDark ? "fixed inset-0 -z-20 bg-[#090F11]" : "fixed inset-0 -z-20 bg-white"} />
      {/* CSS mask composites an element with its children as one layer, so the
          modal must be a sibling — not a child — of the masked bg div, or the
          bg pattern punches holes through the modal too. */}
      {/* Mask bg pattern is desktop-only; mobile shows the login panel alone on a plain bg. */}
      <div
        className={
          isDark
            ? "site-reddit-com-1feab940-bg-pattern fixed inset-0 -z-10 hidden bg-[#090F11] sm:block"
            : "site-reddit-com-1feab940-bg-pattern fixed inset-0 -z-10 hidden bg-white sm:block"
        }
      />
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-0 sm:px-4">
        <div className="pointer-events-auto w-full sm:w-auto">
          <AuthModal />
        </div>
      </div>
    </>
  );
}
