import { LoginForm } from "./login-form";

export function AuthModal() {
  return (
    <div
      className="flex w-full max-w-[528px] flex-col overflow-hidden rounded-2xl bg-[rgb(24,28,31)]"
      style={{
        boxShadow:
          "0 1px 4px 0 rgba(0,0,0,.33), 0 4px 4px 0 rgba(0,0,0,.33)",
      }}
    >
      <div className="px-6 pb-8 pt-6">
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
        <LoginForm />
      </div>
    </div>
  );
}
