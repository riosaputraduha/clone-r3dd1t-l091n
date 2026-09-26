"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ShowIcon, HideIcon } from "../shared/icons";

interface FloatingLabelInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  showToggle?: boolean;
}

export function FloatingLabelInput({ label, showToggle, type, value, defaultValue, onChange, ...props }: FloatingLabelInputProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const [filled, setFilled] = useState(Boolean(value ?? defaultValue));
  const resolvedType = showToggle ? (revealed ? "text" : "password") : type;

  return (
    <div className="relative flex h-14 items-center rounded-[20px] bg-[rgb(42,50,54)] px-4">
      <div className="flex-1">
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-left text-[rgb(139,162,173)] transition-all",
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
            "h-5 w-full bg-transparent text-base text-[rgb(238,241,243)] outline-none",
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
          className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[rgb(183,202,212)] hover:bg-white/10"
        >
          {revealed ? <HideIcon width={20} height={20} /> : <ShowIcon width={20} height={20} />}
        </button>
      )}
    </div>
  );
}
