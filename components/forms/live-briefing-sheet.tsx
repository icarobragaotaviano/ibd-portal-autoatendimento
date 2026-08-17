"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, Check, Clock, FileText, Sparkles, HelpCircle } from "lucide-react";

export interface LiveSheetData {
  serviceName?: string;
  clientName?: string;
  objective?: string;
  targetAudience?: string;
  ctaDestination?: string;
  hasMaterials?: boolean | string;
  materialsNote?: string;
  desiredDate?: string;
  unsureFields?: string[];
  currentStep?: number;
  totalSteps?: number;
}

interface LiveBriefingSheetProps {
  data: LiveSheetData;
  className?: string;
}

export function LiveBriefingSheet({ data, className = "" }: LiveBriefingSheetProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const hasAnyContent = Boolean(
    data.serviceName ||
    data.objective ||
    data.targetAudience ||
    data.ctaDestination ||
    data.desiredDate
  );

  return (
    <>
      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface-elevated)] border-t border-[var(--border)] p-3 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--surface-strong)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)]"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>Ficha da Solicitação {data.serviceName ? `• ${data.serviceName}` : ""}</span>
          </span>
          <span className="flex items-center gap-1 text-[var(--accent)] font-bold">
            {isMobileOpen ? "Fechar" : "Ver resumo ↑"}
            {isMobileOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </span>
        </button>
      </div>

      {/* Mobile Collapsible Panel */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-14 z-40 max-h-[75vh] overflow-y-auto bg-[var(--surface-elevated)] border-t border-[var(--border)] p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <SheetContent data={data} hasAnyContent={hasAnyContent} />
        </div>
      )}

      {/* Desktop Persistent Sidebar Column */}
      <div className={`hidden lg:block ${className}`}>
        <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">
                Ficha Viva da Solicitação
              </h3>
            </div>
            {data.totalSteps && (
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Passo {data.currentStep || 1} de {data.totalSteps}
              </span>
            )}
          </div>

          <SheetContent data={data} hasAnyContent={hasAnyContent} />
        </div>
      </div>
    </>
  );
}

function SheetContent({
  data,
  hasAnyContent,
}: {
  data: LiveSheetData;
  hasAnyContent: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 text-xs">
      {!hasAnyContent ? (
        <div className="py-8 text-center text-[var(--text-muted)] flex flex-col items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--accent)]/50" />
          <p className="font-mono text-xs">
            A ficha é preenchida automaticamente conforme você responde às etapas.
          </p>
        </div>
      ) : (
        <>
          {/* Serviço */}
          <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border)]/60">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              Serviço
            </span>
            <span className="font-display font-bold text-sm text-[var(--accent)]">
              {data.serviceName || "Selecionando..."}
            </span>
          </div>

          {/* Objetivo */}
          {data.objective && (
            <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border)]/60">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Objetivo Principal
              </span>
              <span className="text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                {data.objective}
              </span>
            </div>
          )}

          {/* Público ou Destino */}
          {data.targetAudience && (
            <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border)]/60">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Público-Alvo
              </span>
              <span className="text-[var(--text-secondary)] line-clamp-2">
                {data.targetAudience}
              </span>
            </div>
          )}

          {data.ctaDestination && (
            <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border)]/60">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Destino do Botão / CTA
              </span>
              <span className="text-[var(--text-secondary)] font-mono text-[11px]">
                {data.ctaDestination}
              </span>
            </div>
          )}

          {/* Materiais */}
          <div className="flex flex-col gap-1.5 pb-3 border-b border-[var(--border)]/60">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              Materiais & Arquivos
            </span>
            {data.hasMaterials === true || data.hasMaterials === "sim" ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5" /> Arquivos disponíveis
              </span>
            ) : data.hasMaterials === false || data.hasMaterials === "nao" || data.hasMaterials === "pendente" ? (
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" /> Envio complementar posterior
              </span>
            ) : (
              <span className="text-[var(--text-muted)] font-mono text-[11px]">
                A definir na etapa
              </span>
            )}
            {data.materialsNote && (
              <p className="text-[var(--text-muted)] text-[11px] italic line-clamp-2">
                &ldquo;{data.materialsNote}&rdquo;
              </p>
            )}
          </div>

          {/* Data Desejada */}
          {data.desiredDate && (
            <div className="flex flex-col gap-1 pb-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Previsão Desejada
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[var(--text-primary)]">
                  {data.desiredDate}
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Estimativa bilateral
                </span>
              </div>
            </div>
          )}

          {/* Itens marcados como "Ainda não sei" */}
          {data.unsureFields && data.unsureFields.length > 0 && (
            <div className="p-2.5 rounded bg-[var(--surface-strong)] border border-[var(--border)] flex flex-col gap-1">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-[var(--accent)]" /> Itens para orientação futura:
              </span>
              <ul className="list-disc list-inside text-[11px] text-[var(--text-secondary)]">
                {data.unsureFields.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
