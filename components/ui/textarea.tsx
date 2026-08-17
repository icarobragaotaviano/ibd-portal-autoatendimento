import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
          >
            {label}
            {props.required && <span className="text-[var(--accent)] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full min-h-[110px] bg-[var(--surface)] border rounded-[var(--radius-md)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-y transition-colors duration-200 ${
            error
              ? "border-[var(--danger)] focus-visible:border-[var(--danger)]"
              : "border-[var(--border)] hover:border-[var(--border-hover)] focus-visible:border-[var(--accent)]"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-[var(--danger)] font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-[var(--text-muted)]">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
