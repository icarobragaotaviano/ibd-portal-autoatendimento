import React from "react";
import { ChevronDown } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
          >
            {label}
            {props.required && <span className="text-[var(--accent)] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            className={`w-full min-h-[46px] appearance-none bg-[var(--surface)] border rounded-[var(--radius-md)] px-4 py-2.5 pr-10 text-sm text-[var(--text-primary)] transition-colors duration-200 cursor-pointer ${
              error
                ? "border-[var(--danger)] focus-visible:border-[var(--danger)]"
                : "border-[var(--border)] hover:border-[var(--border-hover)] focus-visible:border-[var(--accent)]"
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[var(--surface-strong)] text-[var(--text-primary)]"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 text-[var(--text-muted)] pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <span className="text-xs text-[var(--danger)] font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-[var(--text-muted)]">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
