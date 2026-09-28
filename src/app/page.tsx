import { SiteHeader } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/header";
import { AuthModal } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/auth-modal";

export default function Home() {
  return (
    <>
      {/* CSS mask composites an element with its children as one layer, so the
          modal must be a sibling — not a child — of the masked bg div, or the
          bg pattern punches holes through the modal too. */}
      {/* Mask bg pattern is desktop-only; mobile shows the login panel alone on a plain dark bg. */}
      <div className="site-reddit-com-1feab940-bg-pattern fixed inset-0 -z-10 hidden dark:bg-[#090F11] bg-neutral-background-medium sm:block" />
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-0 sm:px-4">
        <div className="pointer-events-auto w-full sm:w-auto">
          <AuthModal />
        </div>
      </div>
    </>
  );
}
