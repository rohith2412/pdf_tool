import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "accent";
  size?: "sm" | "md";
};

const SIZE = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
} as const;

const VARIANT = {
  primary:
    "bg-ink text-white border border-ink hover:bg-black hover:border-black active:translate-y-px",
  ghost:
    "bg-white text-ink border border-line hover:border-ink hover:bg-surface-2 active:translate-y-px",
  accent:
    "bg-accent text-white border border-accent hover:bg-red-700 hover:border-red-700 active:translate-y-px",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium no-underline rounded transition-all duration-150 ease-soft disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-inherit";
  return (
    <button className={`${base} ${SIZE[size]} ${VARIANT[variant]} ${className}`} {...rest} />
  );
}
