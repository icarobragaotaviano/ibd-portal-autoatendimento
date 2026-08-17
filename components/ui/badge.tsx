import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "muted" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-mono font-medium tracking-wider",
    md: "text-xs px-2.5 py-1 font-mono font-semibold tracking-wide",
  };

  const variantStyles = {
    default:
      "bg-[var(--surface-strong)] text-[var(--text-primary)] border border-[var(--border)]",
    accent:
      "bg-amber-500/10 text-[var(--accent)] border border-amber-500/30",
    success:
      "bg-emerald-500/10 text-[var(--success)] border border-emerald-500/30",
    warning:
      "bg-amber-500/10 text-[var(--warning)] border border-amber-500/30",
    danger:
      "bg-rose-500/10 text-[var(--danger)] border border-rose-500/30",
    muted:
      "bg-zinc-800/40 text-[var(--text-muted)] border border-zinc-800",
    outline:
      "bg-transparent text-[var(--text-secondary)] border border-[var(--border-hover)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
