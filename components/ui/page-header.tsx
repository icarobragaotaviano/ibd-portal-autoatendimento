import React from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] mb-10 ${className}`}
    >
      <div className="flex flex-col gap-2 max-w-2xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
}
