"use client";

import React from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { ProjectStatus } from "@/lib/domain/types";

export interface TimelineStep {
  label: string;
  sublabel?: string;
  status: "completed" | "current" | "upcoming";
}

interface HumanTimelineProps {
  currentStatus: ProjectStatus;
  confirmedDueDate?: string | null;
  className?: string;
}

export function HumanTimeline({
  currentStatus,
  confirmedDueDate,
  className = "",
}: HumanTimelineProps) {
  // Map ProjectStatus to human timeline milestones
  function getMilestones(status: ProjectStatus): TimelineStep[] {
    const isSolicitacao = status === "solicitacao_recebida";
    const isBriefing = status === "briefing_em_andamento" || status === "briefing_aprovado";
    const isMaterial = status === "aguardando_material" || status === "aguardando_inicio";
    const isProducao = status === "em_producao";
    const isRevisao = status === "versao_enviada" || status === "aguardando_retorno" || status === "revisao_em_andamento";
    const isConcluido = status === "concluido";

    return [
      {
        label: "Solicitação Enviada",
        sublabel: "Demanda recebida no estúdio",
        status: "completed",
      },
      {
        label: "Briefing Definido",
        sublabel: isBriefing ? "Aguardando suas respostas" : "Diretrizes alinhadas",
        status: isSolicitacao || isBriefing ? "current" : "completed",
      },
      {
        label: "Materiais Recebidos",
        sublabel: isMaterial ? "Envio de logos/textos" : "Assets em mãos",
        status: isMaterial ? "current" : isSolicitacao || isBriefing ? "upcoming" : "completed",
      },
      {
        label: "Criação em Andamento",
        sublabel: isProducao ? "Produzindo a 1ª versão" : "Desenvolvimento gráfico",
        status: isProducao ? "current" : isSolicitacao || isBriefing || isMaterial ? "upcoming" : "completed",
      },
      {
        label: "Sua Revisão",
        sublabel: isRevisao ? "Versão pronta para avaliar" : "2 rodadas inclusas",
        status: isRevisao ? "current" : isConcluido ? "completed" : "upcoming",
      },
      {
        label: "Arquivos Finais",
        sublabel: isConcluido ? "Entregues em alta resolução" : "Fechamento do projeto",
        status: isConcluido ? "completed" : "upcoming",
      },
    ];
  }

  const steps = getMilestones(currentStatus);

  return (
    <div className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-md ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4 mb-6">
        <div>
          <span className="font-mono text-[10px] uppercase text-[var(--accent)] tracking-wider">
            Linha do Tempo
          </span>
          <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
            Onde estamos no seu projeto
          </h4>
        </div>

        {confirmedDueDate ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Entrega prevista: <strong>{confirmedDueDate}</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Prazo confirmado após briefing + materiais</span>
          </div>
        )}
      </div>

      {/* Grid of Steps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 relative">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <div
              key={index}
              className={`p-3 rounded-[var(--radius-md)] border flex flex-col gap-2 transition-all ${
                isCurrent
                  ? "bg-[var(--surface-strong)] border-[var(--accent)] shadow-[0_0_15px_rgba(255,212,0,0.08)]"
                  : isCompleted
                  ? "bg-[var(--surface)] border-[var(--border)] opacity-90"
                  : "bg-[var(--surface)]/40 border-[var(--border)]/40 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  0{index + 1}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <span className={`text-xs font-bold ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span className="text-[10px] text-[var(--text-muted)] leading-tight">
                    {step.sublabel}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
