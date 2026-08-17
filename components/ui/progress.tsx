import React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  className = "",
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono text-[var(--text-muted)]">
          <span>Progresso</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-[var(--surface-strong)] rounded-full overflow-hidden border border-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
