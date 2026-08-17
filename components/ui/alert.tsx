import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  icon?: React.ReactNode;
}

export function Alert({
  children,
  variant = "info",
  title,
  icon,
  className = "",
  ...props
}: AlertProps) {
  const icons = {
    info: <Info className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-[var(--warning)] shrink-0 mt-0.5" />,
    danger: <AlertCircle className="w-5 h-5 text-[var(--danger)] shrink-0 mt-0.5" />,
  };

  const variantStyles = {
    info: "bg-amber-500/5 border-amber-500/20 text-[var(--text-secondary)]",
    success: "bg-emerald-500/5 border-emerald-500/20 text-[var(--text-secondary)]",
    warning: "bg-amber-500/5 border-amber-500/20 text-[var(--text-secondary)]",
    danger: "bg-rose-500/5 border-rose-500/20 text-[var(--text-secondary)]",
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-[var(--radius-md)] border text-sm leading-relaxed ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon || icons[variant]}
      <div className="flex flex-col gap-0.5 w-full">
        {title && (
          <h5 className="font-display font-bold text-sm text-[var(--text-primary)]">
            {title}
          </h5>
        )}
        <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
