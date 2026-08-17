"use client";

import React, { useState } from "react";
import { Send, Plus, Trash2, ArrowRight, ArrowLeft, Layers, Palette, Type, Image as ImageIcon, Layout, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface RevisionItem {
  id: string;
  areaId: string;
  areaLabel: string;
  typeId: string;
  typeLabel: string;
  notes: string;
}

interface StructuredRevisionBuilderProps {
  currentRound: number;
  maxRounds: number;
  onSubmitRevision: (formattedNotes: string) => Promise<void>;
  isLoading?: boolean;
}

const revisionAreas = [
  { id: "hero", label: "Hero / Capa / Título Principal", icon: Layers },
  { id: "content", label: "Seção de Conteúdo / Benefícios", icon: Layout },
  { id: "typography", label: "Textos / Tipografia", icon: Type },
  { id: "colors", label: "Cores / Paleta", icon: Palette },
  { id: "images", label: "Imagens / Assets / Fotos", icon: ImageIcon },
  { id: "layout", label: "Diagramação & Espaçamentos", icon: Layout },
  { id: "other", label: "Outro Ajuste Geral", icon: Layers },
];

const changeTypes = [
  { id: "text_fix", label: "Correção de Texto / Copywriting" },
  { id: "color_tweak", label: "Refinamento de Tom / Contraste de Cor" },
  { id: "image_swap", label: "Substituição de Imagem / Logo" },
  { id: "layout_adjust", label: "Alinhamento e Espaçamento" },
  { id: "general", label: "Outro Refinamento Geral" },
];

export function StructuredRevisionBuilder({
  currentRound,
  maxRounds,
  onSubmitRevision,
  isLoading = false,
}: StructuredRevisionBuilderProps) {
  // Mode: "builder" (adding/editing an item) or "review_cart" (reviewing list of items)
  const [mode, setMode] = useState<"builder" | "review_cart">("builder");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Current item being configured
  const [selectedArea, setSelectedArea] = useState<string>("hero");
  const [selectedType, setSelectedType] = useState<string>("text_fix");
  const [detailedNotes, setDetailedNotes] = useState<string>("");

  // Cart of revision items for this round
  const [items, setItems] = useState<RevisionItem[]>([]);

  const areaObj = revisionAreas.find((a) => a.id === selectedArea);
  const typeObj = changeTypes.find((t) => t.id === selectedType);

  function handleAddItem(andReview = false) {
    if (!detailedNotes.trim()) return;

    const newItem: RevisionItem = {
      id: `rev_item_${Date.now()}`,
      areaId: selectedArea,
      areaLabel: areaObj?.label || "Geral",
      typeId: selectedType,
      typeLabel: typeObj?.label || "Ajuste",
      notes: detailedNotes.trim(),
    };

    const updated = [...items, newItem];
    setItems(updated);

    // Reset current item builder
    setDetailedNotes("");
    setStep(1);

    if (andReview) {
      setMode("review_cart");
    }
  }

  function handleRemoveItem(id: string) {
    const remaining = items.filter((i) => i.id !== id);
    setItems(remaining);
    if (remaining.length === 0) {
      setMode("builder");
    }
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If there's uncommitted text in the current builder and no items in cart yet
    let finalItems = [...items];
    if (detailedNotes.trim() && finalItems.length === 0) {
      finalItems = [
        {
          id: `rev_item_${Date.now()}`,
          areaId: selectedArea,
          areaLabel: areaObj?.label || "Geral",
          typeId: selectedType,
          typeLabel: typeObj?.label || "Ajuste",
          notes: detailedNotes.trim(),
        },
      ];
    }

    if (finalItems.length === 0) return;

    // Format the multi-item payload
    const formattedPayload = finalItems
      .map((item, idx) => `[AJUSTE ${idx + 1}] • ${item.areaLabel} (${item.typeLabel})\n${item.notes}`)
      .join("\n\n---\n\n");

    await onSubmitRevision(formattedPayload);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-amber-500/30 bg-[var(--surface-elevated)] p-6 flex flex-col gap-6 shadow-xl">
      {/* Header with Round Counter & Cart Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
            Revisão Estruturada
          </span>
          <h4 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Montar Rodada de Ajustes ({currentRound} de {maxRounds})
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => setMode(mode === "review_cart" ? "builder" : "review_cart")}
              className="text-xs font-mono text-[var(--accent)] hover:underline bg-[var(--surface-strong)] px-2.5 py-1 rounded border border-[var(--border)]"
            >
              {items.length} {items.length === 1 ? "ajuste adicionado" : "ajustes adicionados"}
            </button>
          )}
          <Badge variant={currentRound >= maxRounds ? "warning" : "accent"} size="md">
            Rodada {currentRound} / {maxRounds}
          </Badge>
        </div>
      </div>

      {/* VIEW: CART REVIEW */}
      {mode === "review_cart" ? (
        <form onSubmit={handleFinalSubmit} className="flex flex-col gap-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-sm text-[var(--text-primary)]">
              Resumo da Rodada {currentRound} ({items.length} itens):
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode("builder")}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              + Adicionar outro ajuste
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[var(--accent)]">
                    Ajuste #{idx + 1} • {item.areaLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remover ajuste"
                    className="p-1 rounded text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Tipo: {item.typeLabel}
                </span>
                <p className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <p>
              Ao enviar todos os {items.length} itens acima juntos, você utiliza a <strong>Rodada {currentRound} de {maxRounds}</strong> inclusas no seu projeto.
            </p>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode("builder")}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              disabled={isLoading}
            >
              Voltar ao Criador
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              disabled={items.length === 0}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Enviar Rodada Completa ({items.length} ajustes)
            </Button>
          </div>
        </form>
      ) : (
        /* VIEW: STEP BUILDER */
        <div className="flex flex-col gap-6">
          {/* Progress chips if items already in cart */}
          {items.length > 0 && (
            <div className="p-3 rounded bg-[var(--surface-strong)] border border-[var(--border)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)]">
                Você já tem <strong>{items.length}</strong> {items.length === 1 ? "ajuste preparado" : "ajustes preparados"}.
              </span>
              <button
                type="button"
                onClick={() => setMode("review_cart")}
                className="font-mono text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                Ver lista e enviar →
              </button>
            </div>
          )}

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
                2. Qual é o tipo de alteração em &ldquo;{areaObj?.label}&rdquo;?
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

          {/* Step 3: Descrição do Ajuste + Opção de Adicionar Mais */}
          {step === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-150">
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
                label="3. Descreva detalhadamente a alteração desejada:"
                placeholder="Ex: Trocar a foto do card principal pela foto anexada; ajustar o título para..."
                value={detailedNotes}
                onChange={(e) => setDetailedNotes(e.target.value)}
                required
                helperText="Ajustes refinam a direção combinada no briefing. Alterações conceituais de escopo são orçadas separadamente."
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
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

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={!detailedNotes.trim()}
                    onClick={() => handleAddItem(false)}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    + Adicionar outro ajuste a esta rodada
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    disabled={!detailedNotes.trim()}
                    onClick={() => handleAddItem(true)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Revisar e Enviar Rodada
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
