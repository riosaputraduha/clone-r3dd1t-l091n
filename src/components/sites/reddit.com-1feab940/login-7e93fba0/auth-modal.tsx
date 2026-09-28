"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { X } from "lucide-react";
import { LoginForm } from "./login-form";
import { OtpAppPanel, OtpBackupPanel } from "./otp-panels";

const PAGE_NAMES = [
  "login_username_and_password",
  "login_otp_app",
  "login_otp_backup",
] as const;
type PageName = (typeof PAGE_NAMES)[number];

export function AuthModal() {
  const isDark = useIsDarkMode();
  const [pageName, setPageName] = useState<PageName>("login_username_and_password");

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[528px] flex-col overflow-hidden rounded-2xl",
        isDark ? "bg-[rgb(24,28,31)]" : "bg-white"
      )}
      style={{
        boxShadow:
          "0 1px 4px 0 rgba(0,0,0,.33), 0 4px 4px 0 rgba(0,0,0,.33)",
      }}
    >
      {/* Close button: mobile-only, since the modal itself is the whole screen there
          (no header/backdrop to click away on). Desktop closes via backdrop click. */}
      <Link
        href="/"
        aria-label="Close"
        className={cn(
          "absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full sm:hidden",
          isDark ? "bg-white/10 text-[rgb(238,241,243)] hover:bg-white/20" : "bg-black/5 text-[rgb(26,26,27)] hover:bg-black/10"
        )}
      >
        <X size={18} />
      </Link>
      <div
        className="px-6 pb-8 pt-6"
        data-pagenames={PAGE_NAMES.join(",")}
        data-pageindex={PAGE_NAMES.indexOf(pageName)}
      >
        {pageName === "login_username_and_password" && (
          <>
            <h1 className={cn("mb-2 text-2xl font-bold leading-7", isDark ? "text-[rgb(238,241,243)]" : "text-[rgb(26,26,27)]")}>
              Log In
            </h1>
            <p className={cn("mb-6 text-sm", isDark ? "text-[rgb(183,202,212)]" : "text-[rgb(87,101,109)]")}>
              By continuing, you agree to our{" "}
              <a
                href="https://www.redditinc.com/policies/user-agreement"
                className="text-[rgb(100,142,252)] hover:underline"
              >
                User Agreement
              </a>{" "}
              and acknowledge that you understand the{" "}
              <a
                href="https://www.redditinc.com/policies/privacy-policy"
                className="text-[rgb(100,142,252)] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
            <LoginForm onSubmit={() => setPageName("login_otp_app")} />
          </>
        )}
        {pageName === "login_otp_app" && (
          <OtpAppPanel
            onBack={() => setPageName("login_username_and_password")}
            onTryAnother={() => setPageName("login_otp_backup")}
          />
        )}
        {pageName === "login_otp_backup" && (
          <OtpBackupPanel
            onBack={() => setPageName("login_username_and_password")}
            onTryAnother={() => setPageName("login_otp_app")}
          />
        )}
      </div>
    </div>
  );
}
