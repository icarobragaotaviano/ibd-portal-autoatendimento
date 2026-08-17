import React from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = "", id, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;

    return (
      <label
        htmlFor={radioId}
        className={`flex items-start gap-3 p-4 rounded-[var(--radius-md)] border cursor-pointer select-none transition-all duration-200 ${
          checked
            ? "border-[var(--accent)] bg-amber-500/[0.04]"
            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
        } ${className}`}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 rounded-full border border-[var(--border-hover)] bg-[var(--surface-strong)] peer-checked:border-[var(--accent)] flex items-center justify-center transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-bold text-[var(--text-primary)]">
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
    );
  }
);

Radio.displayName = "Radio";
