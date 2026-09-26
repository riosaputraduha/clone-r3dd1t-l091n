import Link from "next/link";
import { SnooLogo, RedditWordmark } from "../shared/icons";

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-10 flex h-14 items-center border-b border-white/10 bg-[rgb(14,17,19)] px-4">
      <Link href="/" className="flex items-center gap-2">
        <SnooLogo />
        <RedditWordmark className="hidden h-[22px] w-auto sm:block text-[rgb(238,241,243)]" />
      </Link>
    </header>
  );
}
