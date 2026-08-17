import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[var(--surface-strong)] border border-[var(--border-hover)] flex items-center justify-center text-[var(--accent)] mb-4">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
        {title}
      </h4>
      <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {actionText && (onAction || actionHref) && (
        <div>
          {actionHref ? (
            <Button variant="secondary" size="sm" onClick={onAction}>
              {actionText}
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
