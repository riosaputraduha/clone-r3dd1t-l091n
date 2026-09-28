"use client";

import Link from "next/link";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { SnooLogo, RedditWordmark } from "../shared/icons";

export function SiteHeader() {
  const isDark = useIsDarkMode();

  return (
    <header
      className={
        isDark
          ? "fixed top-0 inset-x-0 z-10 hidden h-14 items-center border-b border-white/10 bg-[rgb(14,17,19)] px-4 sm:flex"
          : "fixed top-0 inset-x-0 z-10 hidden h-14 items-center border-b border-black/10 bg-white px-4 sm:flex"
      }
    >
      <Link href="/" className="flex items-center gap-2">
        <SnooLogo />
        <RedditWordmark
          className={
            isDark
              ? "hidden h-[22px] w-auto sm:block text-[rgb(238,241,243)]"
              : "hidden h-[22px] w-auto sm:block text-[rgb(26,26,27)]"
          }
        />
      </Link>
    </header>
  );
}
