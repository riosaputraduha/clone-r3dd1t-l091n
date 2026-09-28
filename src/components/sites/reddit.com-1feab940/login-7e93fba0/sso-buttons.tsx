"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { AppleLogo, LinkIcon } from "../shared/icons";
import { GoogleSignInPopup } from "./google-signin-popup";

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.73v2.26h2.92c1.71-1.57 2.69-3.89 2.69-6.63Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A8.997 8.997 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9.01 9.01 0 0 0 0 8.08l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A8.997 8.997 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

const buttonBase =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold";

export function SSOButtons() {
  const isDark = useIsDarkMode();
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setShowGooglePopup(true)}
        className={cn(buttonBase, "border border-black/10 bg-white text-[#1f1f1f]")}
      >
        <GoogleLogo />
        Continue with Google
      </button>
      <button
        type="button"
        className={cn(buttonBase, isDark ? "bg-black text-white" : "bg-[rgb(26,26,27)] text-white")}
      >
        <AppleLogo />
        Sign in with Apple
      </button>
      <button
        type="button"
        className={cn(
          buttonBase,
          "border bg-transparent",
          isDark ? "border-white/20 text-[rgb(238,241,243)]" : "border-black/20 text-[rgb(26,26,27)]"
        )}
      >
        <LinkIcon width={20} height={20} />
        Continue with email
      </button>

      {showGooglePopup && (
        <GoogleSignInPopup
          onClose={() => setShowGooglePopup(false)}
          onContinue={() => setShowGooglePopup(false)}
        />
      )}
    </div>
  );
}
