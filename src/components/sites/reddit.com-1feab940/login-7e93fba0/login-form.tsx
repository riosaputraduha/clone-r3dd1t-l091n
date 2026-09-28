"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { SSOButtons } from "./sso-buttons";
import { FloatingLabelInput } from "./floating-label-input";

interface LoginFormProps {
  onSubmit?: () => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const isDark = useIsDarkMode();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = username.length > 0 && password.length > 0;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <SSOButtons />

      <div className={cn("flex items-center gap-3 text-xs", isDark ? "text-[rgb(139,162,173)]" : "text-[rgb(120,124,126)]")}>
        <span className={cn("h-px flex-1", isDark ? "bg-white/10" : "bg-black/10")} />
        OR
        <span className={cn("h-px flex-1", isDark ? "bg-white/10" : "bg-black/10")} />
      </div>

      <FloatingLabelInput
        label="Email or username"
        name="username"
        autoComplete="username webauthn"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FloatingLabelInput
        label="Password"
        name="password"
        autoComplete="current-password"
        required
        showToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link href="#" className="self-end text-sm font-medium text-[rgb(100,142,252)] hover:underline">
        Forgot password?
      </Link>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "h-12 w-full rounded-full text-sm font-semibold transition-colors",
          canSubmit
            ? "cursor-pointer bg-[rgb(100,142,252)] text-[rgb(238,241,243)]"
            : isDark
              ? "cursor-not-allowed bg-white/[0.047] text-white/[0.247]"
              : "cursor-not-allowed bg-black/[0.05] text-black/[0.25]"
        )}
      >
        Log In
      </button>

      <p className={cn("text-center text-sm", isDark ? "text-[rgb(183,202,212)]" : "text-[rgb(87,101,109)]")}>
        New to Reddit?{" "}
        <Link href="#" className="font-medium text-[rgb(100,142,252)] hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
