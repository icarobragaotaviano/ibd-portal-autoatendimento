import React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className = "", id, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className="flex items-start gap-3 cursor-pointer select-none group"
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              checked={checked}
              className="peer sr-only"
              {...props}
            />
            <div
              className={`w-5 h-5 rounded-[var(--radius-sm)] border bg-[var(--surface)] transition-all duration-150 flex items-center justify-center peer-checked:bg-[var(--accent)] peer-checked:border-[var(--accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)] ${
                error
                  ? "border-[var(--danger)]"
                  : "border-[var(--border-hover)] group-hover:border-[var(--text-muted)]"
              } ${className}`}
            >
              <Check className="w-3.5 h-3.5 text-[#050505] stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity duration-150" />
            </div>
          </div>
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[var(--text-muted)] leading-relaxed">
                {description}
              </span>
            )}
          </div>
        </label>
        {error && <span className="text-xs text-[var(--danger)] ml-8">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
