import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-display font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 min-h-[36px] gap-1.5",
      md: "text-sm px-5 py-2.5 min-h-[46px] gap-2",
      lg: "text-base px-6 py-3.5 min-h-[52px] gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[#050505] border border-[var(--accent)] hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] active:bg-[var(--accent-dark)] hover:-translate-y-0.5",
      secondary:
        "bg-[var(--surface-strong)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] border border-transparent",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-hover)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      danger:
        "bg-[var(--danger)] text-white border border-[var(--danger)] hover:opacity-90 hover:-translate-y-0.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
