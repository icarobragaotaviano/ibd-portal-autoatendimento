import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Carregando informações...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)] mb-3" />
      <span className="text-xs font-mono font-medium text-[var(--text-muted)] tracking-wider">
        {message}
      </span>
    </div>
  );
}
