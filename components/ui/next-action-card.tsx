import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, UserCheck, ShieldCheck } from "lucide-react";
import { Button } from "./button";

export interface NextActionCardProps {
  owner: "client" | "ibd" | "none";
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  projectTitle?: string;
  badge?: React.ReactNode;
  className?: string;
}

export function NextActionCard({
  owner,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  projectTitle,
  badge,
  className = "",
}: NextActionCardProps) {
  const isClientAction = owner === "client";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-8 transition-all duration-200 ${
        isClientAction
          ? "bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] border-amber-500/40 shadow-[0_8px_30px_rgb(255,212,0,0.05)]"
          : "bg-[var(--surface)] border-[var(--border)]"
      } ${className}`}
    >
      {/* Accent Indicator Bar */}
      {isClientAction && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]" />
      )}

      <div className="flex flex-col gap-5">
        {/* Header Eyebrow & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isClientAction ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <UserCheck className="w-3.5 h-3.5" />
                Sua Vez de Agir
              </span>
            ) : owner === "ibd" ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] bg-zinc-800/60 px-3 py-1 rounded-full border border-[var(--border)]">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                Com o IBD
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--success)] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Acompanhamento
              </span>
            )}

            {projectTitle && (
              <span className="text-xs font-mono text-[var(--text-muted)]">
                • {projectTitle}
              </span>
            )}
          </div>

          {badge && <div>{badge}</div>}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Button */}
        {actionText && (actionHref || onAction) && (
          <div className="pt-2">
            {actionHref ? (
              <Link href={actionHref} className="inline-block">
                <Button
                  variant={isClientAction ? "primary" : "secondary"}
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {actionText}
                </Button>
              </Link>
            ) : (
              <Button
                variant={isClientAction ? "primary" : "secondary"}
                size="md"
                onClick={onAction}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {actionText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
