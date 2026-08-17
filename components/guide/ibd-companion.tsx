"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown, ExternalLink, Copy, Check, X, HelpCircle } from "lucide-react";
import { CompanionMessage, CompanionState } from "@/lib/domain/guide-rules";

interface IBDCompanionProps {
  message: CompanionMessage;
  onApplyTemplate?: (template: string) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export function IBDCompanion({
  message,
  onApplyTemplate,
  className = "",
  defaultExpanded = false,
}: IBDCompanionProps) {
  const [isDetailed, setIsDetailed] = useState(defaultExpanded);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Preference persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ibd_guide_dismissed");
      if (saved === "true") {
        setIsDismissed(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  function handleDismiss() {
    setIsDismissed(true);
    try {
      localStorage.setItem("ibd_guide_dismissed", "true");
    } catch {
      // Ignore
    }
  }

  if (isDismissed) return null;

  const stateBadges: Record<CompanionState, { icon: string; bg: string; text: string; label: string }> = {
    neutral: { icon: "●", bg: "bg-neutral-800 border-neutral-700", text: "text-[var(--text-muted)]", label: "Acompanhamento" },
    attention: { icon: "!", bg: "bg-amber-950/80 border-amber-800/80", text: "text-amber-400", label: "Atenção" },
    success: { icon: "✓", bg: "bg-emerald-950/80 border-emerald-800/80", text: "text-emerald-400", label: "Concluído" },
    action: { icon: "→", bg: "bg-amber-500/20 border-amber-500/40", text: "text-[var(--accent)]", label: "Sua Ação" },
  };

  const currentBadge = stateBadges[message.state] || stateBadges.neutral;

  function handleCopyOrApply() {
    if (message.exampleTemplate) {
      if (onApplyTemplate) {
        onApplyTemplate(message.exampleTemplate);
      }
      navigator.clipboard?.writeText?.(message.exampleTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <aside
      aria-label="IBD Guia - Orientação Contextual"
      className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xl transition-all duration-200 overflow-hidden ${className}`}
    >
      {/* Level 1: Compact One-Liner Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--surface-strong)]/60 border-b border-[var(--border)] select-none">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold border shrink-0 ${currentBadge.bg} ${currentBadge.text}`}
            title={currentBadge.label}
          >
            {currentBadge.icon}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-xs font-bold text-[var(--text-primary)] truncate">
              {message.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <button
            type="button"
            onClick={() => setIsDetailed(!isDetailed)}
            className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[var(--surface)]"
            aria-expanded={isDetailed}
          >
            <span>{isDetailed ? "Menos" : "Me explique"}</span>
            {isDetailed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Ocultar dicas"
            title="Ocultar dicas do IBD Guia"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Level 2: Detailed Explanation (Expandable) */}
      {isDetailed && (
        <div className="p-4 flex flex-col gap-3 text-xs leading-relaxed animate-in fade-in duration-150">
          <p className="text-[var(--text-secondary)]">{message.content}</p>

          {/* Template helper */}
          {message.exampleTemplate && (
            <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                Estrutura sugerida:
              </span>
              <p className="font-mono text-[11px] text-[var(--accent)] bg-amber-500/5 p-2 rounded border border-amber-500/10">
                &ldquo;{message.exampleTemplate}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyOrApply}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--surface-strong)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[var(--accent)]" />}
                  {copied ? "Aplicado!" : "Usar modelo"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDetailed(false)}
                  className="px-2 py-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Fechar detalhes
                </button>
              </div>
            </div>
          )}

          {/* Guide Link */}
          {message.guideLink && (
            <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
              <Link
                href={message.guideLink.href}
                target="_blank"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent)] hover:underline"
              >
                <span>{message.guideLink.label}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
