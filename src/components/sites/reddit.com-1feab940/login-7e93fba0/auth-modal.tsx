"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [pageName, setPageName] = useState<PageName>("login_username_and_password");

  return (
    <div
      className="relative flex w-full max-w-[528px] flex-col overflow-hidden rounded-2xl bg-[rgb(24,28,31)]"
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
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[rgb(238,241,243)] hover:bg-white/20 sm:hidden"
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
            <h1 className="mb-2 text-2xl font-bold leading-7 text-[rgb(238,241,243)]">
              Log In
            </h1>
            <p className="mb-6 text-sm text-[rgb(183,202,212)]">
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
