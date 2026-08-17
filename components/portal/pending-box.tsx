"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ArrowRight, Clock, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PendingItem {
  id: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  isClientAction: boolean; // true = "Preciso de você", false = "Comigo"
  completed?: boolean;
}

interface PendingBoxProps {
  clientItems: PendingItem[];
  studioItems: PendingItem[];
  className?: string;
}

export function PendingBox({ clientItems, studioItems, className = "" }: PendingBoxProps) {
  const pendingClientCount = clientItems.filter((i) => !i.completed).length;
  const pendingStudioCount = studioItems.filter((i) => !i.completed).length;

  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {/* Coluna: Preciso de você */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
              Preciso de você
            </h4>
          </div>
          <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            {pendingClientCount} {pendingClientCount === 1 ? "ação pendente" : "ações pendentes"}
          </span>
        </div>

        {clientItems.length === 0 || pendingClientCount === 0 ? (
          <div className="py-6 text-center text-[var(--text-muted)] flex flex-col items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              Nenhuma pendência do seu lado no momento.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {clientItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] hover:border-amber-400/30 transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {item.title}
                    </span>
                    {item.description && (
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {item.actionLabel && item.actionHref && (
                  <Link href={item.actionHref} className="shrink-0">
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                      {item.actionLabel}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coluna: Comigo (IBD) */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
              Comigo (IBD)
            </h4>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {pendingStudioCount} {pendingStudioCount === 1 ? "etapa em progresso" : "etapas em progresso"}
          </span>
        </div>

        {studioItems.length === 0 ? (
          <div className="py-6 text-center text-[var(--text-muted)] flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-[var(--text-muted)]" />
            <p className="font-mono text-xs">Aguardando entrada de materiais/briefing.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {studioItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex items-start gap-2.5"
              >
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {item.title}
                  </span>
                  {item.description && (
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
