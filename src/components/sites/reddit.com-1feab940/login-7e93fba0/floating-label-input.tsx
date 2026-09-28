"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { ShowIcon, HideIcon } from "../shared/icons";

interface FloatingLabelInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  showToggle?: boolean;
}

export function FloatingLabelInput({ label, showToggle, type, value, defaultValue, onChange, ...props }: FloatingLabelInputProps) {
  const id = useId();
  const isDark = useIsDarkMode();
  const [revealed, setRevealed] = useState(false);
  const [filled, setFilled] = useState(Boolean(value ?? defaultValue));
  const resolvedType = showToggle ? (revealed ? "text" : "password") : type;

  return (
    <div className={cn("relative flex h-14 items-center rounded-[20px] px-4", isDark ? "bg-[rgb(42,50,54)]" : "bg-[rgb(240,240,240)]")}>
      <div className="flex-1">
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-left transition-all",
            isDark ? "text-[rgb(139,162,173)]" : "text-[rgb(120,124,126)]",
            filled ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-base"
          )}
        >
          {label}
        </label>
        <input
          id={id}
          type={resolvedType}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            "h-5 w-full bg-transparent text-base outline-none",
            isDark ? "text-[rgb(238,241,243)]" : "text-[rgb(26,26,27)]",
            filled ? "translate-y-3" : "translate-y-0"
          )}
          onChange={(e) => {
            setFilled(e.target.value.length > 0);
            onChange?.(e);
          }}
          onBlur={(e) => setFilled(e.target.value.length > 0)}
          {...props}
        />
      </div>
      {showToggle && (
        <button
          type="button"
          aria-label={revealed ? "Hide password" : "Show password"}
          onClick={() => setRevealed((r) => !r)}
          className={cn(
            "ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            isDark ? "text-[rgb(183,202,212)] hover:bg-white/10" : "text-[rgb(87,101,109)] hover:bg-black/5"
          )}
        >
          {revealed ? <HideIcon width={20} height={20} /> : <ShowIcon width={20} height={20} />}
        </button>
      )}
    </div>
  );
}
