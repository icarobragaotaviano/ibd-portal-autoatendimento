import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
          >
            {label}
            {props.required && <span className="text-[var(--accent)] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full min-h-[46px] bg-[var(--surface)] border rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-200 ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${
              error
                ? "border-[var(--danger)] focus-visible:border-[var(--danger)]"
                : "border-[var(--border)] hover:border-[var(--border-hover)] focus-visible:border-[var(--accent)]"
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[var(--text-muted)] pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-[var(--danger)] font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-[var(--text-muted)]">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
