import { SiteHeader } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/header";
import { AuthModal } from "@/components/sites/reddit.com-1feab940/login-7e93fba0/auth-modal";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen w-screen grow items-center justify-center px-4 pt-14">
        <div className="site-reddit-com-1feab940-bg-pattern absolute inset-0 -z-10 bg-[rgb(9,15,17)]" />
        <AuthModal />
      </main>
    </>
  );
}
