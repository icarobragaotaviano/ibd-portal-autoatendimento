import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  retryText?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Ocorreu um erro ao carregar",
  description = "Não foi possível buscar as informações neste momento. Tente novamente.",
  retryText = "Tentar novamente",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[var(--radius-lg)] border border-rose-500/30 bg-rose-500/[0.02] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-[var(--danger)] mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
        {title}
      </h4>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  );
}
