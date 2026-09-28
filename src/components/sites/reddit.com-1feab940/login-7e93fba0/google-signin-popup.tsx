"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { SnooLogo } from "../shared/icons";

/**
 * Mock of the real Google sign-in popup window
 * (accounts.google.com/v3/signin/identifier?opparams=...), rendered as a fake
 * browser window (title bar + address bar) matching what `window.open` shows.
 * Frontend-only visual — no real Google endpoint, no OAuth token exchange.
 * ponytail: no password step / multi-account flow, "Next" just closes the popup.
 */
interface GoogleSignInPopupProps {
  onClose: () => void;
  onContinue: () => void;
}

export function GoogleSignInPopup({ onClose, onContinue }: GoogleSignInPopupProps) {
  const [email, setEmail] = useState("");
  const isDark = useIsDarkMode();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in - Google Accounts - Google Chrome"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex w-full max-w-[520px] flex-col overflow-hidden rounded-xl shadow-2xl",
          isDark ? "bg-[#3c4043]" : "bg-[#dee1e6]"
        )}
      >
        {/* fake browser title bar */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 pt-2.5 pb-2 text-xs",
            isDark ? "text-[#9aa0a6]" : "text-[#5f6368]"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="flex-1 truncate">Sign in - Google Accounts - Google Chrome</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded",
              isDark ? "hover:bg-white/10" : "hover:bg-black/10"
            )}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>
        </div>

        {/* fake address bar */}
        <div
          className={cn(
            "mx-3 mb-2.5 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
            isDark ? "bg-[#202124] text-[#9aa0a6]" : "bg-white text-[#5f6368]"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 118 0v4" />
          </svg>
          <span className="truncate">accounts.google.com/v3/signin/identifier?opparams=...</span>
        </div>

        {/* actual sign-in card */}
        <div
          className={cn(
            "flex flex-col px-10 py-8",
            isDark ? "bg-[#131314] text-[#e3e3e3]" : "bg-white text-[#1f1f1f]"
          )}
        >
          <div className="mb-6 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.997 10.997 0 0012 23Z" />
              <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 010-4.18V7.07H2.18a11.02 11.02 0 000 9.86l3.66-2.84Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
            </svg>
            <span className={cn("text-lg", isDark ? "text-[#9aa0a6]" : "text-[#5f6368]")}>
              Sign in with Google
            </span>
          </div>

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <SnooLogo />
          </div>

          <h1 className="text-3xl font-normal">Sign in</h1>
          <p className="mt-2 text-base">
            to continue to <span className="font-medium">Reddit</span>
          </p>

          <label className="relative mt-8 block">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone"
              className={cn(
                "h-14 w-full rounded border px-4 pt-2 text-base outline-none",
                isDark
                  ? "border-[#8e918f] bg-transparent text-[#e3e3e3] focus:border-[#a8c7fa] focus:ring-1 focus:ring-[#a8c7fa]"
                  : "border-[#747775] focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]"
              )}
            />
          </label>
          <a href="#" className={cn("mt-4 inline-block text-sm font-medium", isDark ? "text-[#a8c7fa]" : "text-[#0b57d0]")}>
            Forgot email?
          </a>

          <p className="mt-8 text-sm leading-5">
            Before using this app, you can review Reddit&apos;s{" "}
            <a
              href="https://www.redditinc.com/policies/privacy-policy"
              className={isDark ? "text-[#a8c7fa]" : "text-[#0b57d0]"}
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://www.redditinc.com/policies/user-agreement"
              className={isDark ? "text-[#a8c7fa]" : "text-[#0b57d0]"}
            >
              Terms of Service
            </a>
            .
          </p>

          <div className="mt-10 flex items-center justify-between">
            <a href="#" className={cn("text-sm font-medium", isDark ? "text-[#a8c7fa]" : "text-[#0b57d0]")}>
              Create account
            </a>
            <button
              type="button"
              onClick={onContinue}
              disabled={email.length === 0}
              className={cn(
                "h-10 rounded-full px-6 text-sm font-medium transition-colors",
                email.length > 0
                  ? isDark
                    ? "cursor-pointer bg-[#a8c7fa] text-[#062e6f]"
                    : "cursor-pointer bg-[#0b57d0] text-white"
                  : isDark
                    ? "cursor-not-allowed bg-[#3c4043] text-[#5f6368]"
                    : "cursor-not-allowed bg-[#f2f2f2] text-[#a0a0a0]"
              )}
            >
              Next
            </button>
          </div>
        </div>

        {/* footer */}
        <div
          className={cn(
            "flex items-center justify-between px-10 pb-6 text-xs",
            isDark ? "bg-[#131314] text-[#9aa0a6]" : "bg-white text-[#5f6368]"
          )}
        >
          <span>English (United States)</span>
          <div className="flex items-center gap-4">
            <a href="https://support.google.com/accounts" className="hover:underline">
              Help
            </a>
            <a href="https://policies.google.com/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="https://policies.google.com/terms" className="hover:underline">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
