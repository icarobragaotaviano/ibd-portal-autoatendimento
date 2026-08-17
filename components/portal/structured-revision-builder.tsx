"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ArrowRight, ArrowLeft, Layers, Palette, Type, Image as ImageIcon, Layout, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StructuredRevisionBuilderProps {
  currentRound: number;
  maxRounds: number;
  onSubmitRevision: (notes: string) => Promise<void>;
  isLoading?: boolean;
}

const revisionAreas = [
  { id: "hero", label: "Hero / Capa / Título Principal", icon: Layers },
  { id: "content", label: "Seção de Conteúdo / Benefícios", icon: Layout },
  { id: "typography", label: "Textos / Tipografia", icon: Type },
  { id: "colors", label: "Cores / Paleta", icon: Palette },
  { id: "images", label: "Imagens / Assets / Fotos", icon: ImageIcon },
  { id: "other", label: "Outro Ajuste Geral", icon: Layers },
];

const changeTypes = [
  { id: "text_fix", label: "Correção de Texto / Copywriting" },
  { id: "color_tweak", label: "Refinamento de Tom / Contraste de Cor" },
  { id: "image_swap", label: "Substituição de Imagem / Logo" },
  { id: "layout_adjust", label: "Alinhamento e Espaçamento" },
  { id: "general", label: "Outro Refinamento" },
];

export function StructuredRevisionBuilder({
  currentRound,
  maxRounds,
  onSubmitRevision,
  isLoading = false,
}: StructuredRevisionBuilderProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedArea, setSelectedArea] = useState<string>("hero");
  const [selectedType, setSelectedType] = useState<string>("text_fix");
  const [detailedNotes, setDetailedNotes] = useState<string>("");

  const areaObj = revisionAreas.find((a) => a.id === selectedArea);
  const typeObj = changeTypes.find((t) => t.id === selectedType);

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!detailedNotes.trim()) return;

    const formattedPayload = `[ÁREA: ${areaObj?.label}] - [TIPO: ${typeObj?.label}]\n${detailedNotes}`;
    await onSubmitRevision(formattedPayload);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-amber-500/30 bg-[var(--surface-elevated)] p-6 flex flex-col gap-6 shadow-xl">
      {/* Header with Round Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
            Revisão Estruturada
          </span>
          <h4 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Solicitar Rodada de Ajustes ({currentRound} de {maxRounds})
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={currentRound >= maxRounds ? "warning" : "accent"} size="md">
            Rodada {currentRound} / {maxRounds}
          </Badge>
        </div>
      </div>

      {/* Step 1: Escolha da Área */}
      {step === 1 && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          <label className="text-xs font-bold text-[var(--text-primary)]">
            1. Em qual parte ou elemento da peça está o ajuste?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {revisionAreas.map((area) => {
              const Icon = area.icon;
              const isSelected = selectedArea === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedArea(area.id)}
                  className={`p-3.5 rounded-[var(--radius-md)] border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? "bg-[var(--surface-strong)] border-[var(--accent)] text-[var(--accent)] shadow-sm"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`} />
                  <span className="text-xs font-medium">{area.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Avançar para Tipo de Ajuste
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Tipo de Alteração */}
      {step === 2 && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          <label className="text-xs font-bold text-[var(--text-primary)]">
            2. Qual é o tipo de ajuste para &ldquo;{areaObj?.label}&rdquo;?
          </label>
          <div className="flex flex-col gap-2">
            {changeTypes.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-[var(--radius-md)] border text-left text-xs transition-all ${
                    isSelected
                      ? "bg-[var(--surface-strong)] border-[var(--accent)] text-[var(--accent)] font-bold"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Voltar
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setStep(3)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Descrever Ajustes
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Descrição e Confirmação */}
      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4 animate-in fade-in duration-150">
          <div className="p-3 rounded bg-[var(--surface-strong)] border border-[var(--border)] text-xs text-[var(--text-secondary)] flex items-center justify-between">
            <span>
              Área: <strong>{areaObj?.label}</strong> · Tipo: <strong>{typeObj?.label}</strong>
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[11px] font-mono text-[var(--accent)] hover:underline"
            >
              Alterar
            </button>
          </div>

          <Textarea
            label="3. Descreva detalhadamente as alterações desejadas:"
            placeholder="Ex: Na seção de depoimentos, trocar o texto do card 2 pelo arquivo enviado e escurecer 10% o tom de cinza do fundo..."
            value={detailedNotes}
            onChange={(e) => setDetailedNotes(e.target.value)}
            required
            helperText="Ajustes refinam a direção combinada no briefing. Alterações conceituais de escopo são orçadas separadamente."
          />

          <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <p>
              Ao enviar, você utiliza a <strong>Rodada {currentRound} de {maxRounds}</strong> inclusas no seu contrato.
            </p>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStep(2)}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              disabled={isLoading}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Confirmar e Enviar Rodada {currentRound}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
