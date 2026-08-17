"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Sparkles, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { IBDCompanion } from "@/components/guide/ibd-companion";
import { LiveBriefingSheet } from "@/components/forms/live-briefing-sheet";
import { getContextualGuideMessage } from "@/lib/domain/guide-rules";
import { useFormDraft } from "@/lib/hooks/use-form-draft";
import { trackPublicEvent } from "@/lib/analytics";

function BriefingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prospectId = searchParams.get("prospectId");

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // 1: Contexto, 2: Escopo, 3: Prazos, 4: Revisão ("Foi isso que eu entendi")

  // Auto-Save Draft for Deep Briefing
  const { hasSavedDraft, draftSavedAt, restoreDraft, clearDraft, saveDraft } = useFormDraft({
    key: "briefing_flow",
    contextId: prospectId,
    version: 1,
    initialValues: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      step: 1,
      unsureFields: [] as string[],
    },
  });

  // Answers State
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");

  const [q7, setQ7] = useState("");
  const [q8, setQ8] = useState("");
  const [q9, setQ9] = useState("");

  // Unsure Fields Tracked
  const [unsureFields, setUnsureFields] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>("momento_e_objetivo");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleRestoreBriefing() {
    const data = restoreDraft();
    if (data) {
      if (data.q1) setQ1(data.q1);
      if (data.q2) setQ2(data.q2);
      if (data.q3) setQ3(data.q3);
      if (data.q4) setQ4(data.q4);
      if (data.q5) setQ5(data.q5);
      if (data.q6) setQ6(data.q6);
      if (data.q7) setQ7(data.q7);
      if (data.q8) setQ8(data.q8);
      if (data.q9) setQ9(data.q9);
      if (data.step) setCurrentStep(data.step);
      if (data.unsureFields) setUnsureFields(data.unsureFields);
      trackPublicEvent("draft_restored");
    }
  }

  function updateQuestion(field: string, value: string, setter: (v: string) => void) {
    setter(value);
    saveDraft({ [field]: value, step: currentStep, unsureFields });
  }

  function toggleUnsure(fieldLabel: string, setter: (val: string) => void, fieldName: string) {
    let updated: string[];
    let newVal = "";
    if (unsureFields.includes(fieldLabel)) {
      updated = unsureFields.filter((f) => f !== fieldLabel);
      setter("");
    } else {
      updated = [...unsureFields, fieldLabel];
      newVal = "Ainda não definido (quero orientação no processo)";
      setter(newVal);
      trackPublicEvent("dont_know_selected");
    }
    setUnsureFields(updated);
    saveDraft({ [fieldName]: newVal, unsureFields: updated, step: currentStep });
  }

  async function handleProceed(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!prospectId) {
      setError("Identificador de solicitação não encontrado. Por favor, reinicie pelo formulário.");
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // STEP 4: Final submission
    setIsLoading(true);
    try {
      const responses = {
        momento_e_objetivo: q1,
        publico_alvo: q2,
        referencias_concorrentes: q3,
        entregaveis_especificos: q4,
        diretrizes_anteriores: q5,
        materiais_disponiveis: q6,
        data_critica_evento: q7,
        responsavel_aprovacao: q8,
        observacoes_finais: q9,
        orientacoes_pendentes: unsureFields.join(", "),
      };

      const res = await fetch(`/api/prospects/${prospectId}/briefing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 3,
          responses,
          completed: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Não foi possível salvar suas respostas. Seus dados permanecem seguros neste navegador. Tente novamente.");
        return;
      }

      clearDraft();
      trackPublicEvent("briefing_completed");
      router.push(`/comecar/obrigado?prospectId=${prospectId}`);
    } catch {
      setError("Erro ao se comunicar com o servidor. Suas respostas continuam salvas. Clique em enviar para tentar novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const guideMessage = getContextualGuideMessage({
    route: "/comecar/briefing",
    step: currentStep,
    focusedField,
    hasMaterials: q6.toLowerCase().includes("pronto") || q6.toLowerCase().includes("sim"),
  });

  return (
    <Section spacing="lg" className="pt-8 sm:pt-16 pb-24">
      <Container size="lg">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Briefing Flow (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <PageHeader
              eyebrow={`Passo 3 de 3 • Briefing Guiado (Etapa ${currentStep} de ${totalSteps})`}
              title={
                currentStep === 4
                  ? "Confira sua Solicitação"
                  : "Briefing do Projeto"
              }
              description={
                currentStep === 4
                  ? "Revise o que entendemos antes de enviar. Você pode editar qualquer ponto ou confirmar."
                  : "Para eu entender bem o projeto, vou te fazer até 3 perguntas por vez. Sem termos difíceis."
              }
            />

            {/* Draft Recovery Banner */}
            {hasSavedDraft && (
              <div className="p-4 rounded-[var(--radius-md)] bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-blue-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>
                    Encontramos um rascunho salvo deste briefing {draftSavedAt ? `às ${draftSavedAt}` : ""}. Deseja restaurar?
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button type="button" variant="primary" size="sm" onClick={handleRestoreBriefing}>
                    Restaurar Rascunho
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={clearDraft}>
                    Descartar
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Progress value={currentStep} max={totalSteps} showLabel />
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>{currentStep === 4 ? "Revisão e Confirmação" : `Etapa ${currentStep} de ${totalSteps}`}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% concluído</span>
              </div>
            </div>

            {error && (
              <Alert variant="danger" title="Atenção">
                {error}
              </Alert>
            )}

            <Card>
              <form onSubmit={handleProceed} className="flex flex-col gap-8">
                {/* STEP 1: Contexto e Posicionamento */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div className="border-b border-[var(--border)] pb-4">
                      <span className="eyebrow">Etapa 1 de 3</span>
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                        Contexto e Posicionamento
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[var(--text-primary)]">
                          1. Qual é o momento atual do seu negócio e o objetivo principal deste trabalho?
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleUnsure("Objetivo", (v) => updateQuestion("q1", v, setQ1), "q1")}
                          className="text-[11px] font-mono text-[var(--accent)] hover:underline"
                        >
                          {unsureFields.includes("Objetivo") ? "✓ Quero definir agora" : "Ainda não sei"}
                        </button>
                      </div>
                      <Textarea
                        placeholder="Ex: Estamos reposicionando nossa marca para atender clientes corporativos maiores..."
                        value={q1}
                        onChange={(e) => updateQuestion("q1", e.target.value, setQ1)}
                        onFocus={() => setFocusedField("momento_e_objetivo")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[var(--text-primary)]">
                          2. Quem é o público-alvo prioritário que precisamos impactar?
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleUnsure("Público-Alvo", (v) => updateQuestion("q2", v, setQ2), "q2")}
                          className="text-[11px] font-mono text-[var(--accent)] hover:underline"
                        >
                          {unsureFields.includes("Público-Alvo") ? "✓ Quero definir agora" : "Ainda não sei"}
                        </button>
                      </div>
                      <Textarea
                        placeholder="Ex: Diretores de tecnologia, fundadores de startups e tomadores de decisão B2B..."
                        value={q2}
                        onChange={(e) => updateQuestion("q2", e.target.value, setQ2)}
                        onFocus={() => setFocusedField("publico_alvo")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[var(--text-primary)]">
                          3. Quais marcas, referências visuais ou concorrentes refletem o estilo desejado?
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleUnsure("Referências", (v) => updateQuestion("q3", v, setQ3), "q3")}
                          className="text-[11px] font-mono text-[var(--accent)] hover:underline"
                        >
                          {unsureFields.includes("Referências") ? "✓ Quero definir agora" : "Quero orientação"}
                        </button>
                      </div>
                      <Textarea
                        placeholder="Ex: Gostamos do estilo minimalista da Apple e do contraste editorial da Monocle..."
                        value={q3}
                        onChange={(e) => updateQuestion("q3", e.target.value, setQ3)}
                        onFocus={() => setFocusedField("referencias_concorrentes")}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Escopo e Entregáveis */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div className="border-b border-[var(--border)] pb-4">
                      <span className="eyebrow">Etapa 2 de 3</span>
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                        Escopo e Materiais
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[var(--text-primary)]">
                        1. Quais peças ou entregáveis específicos são prioridade?
                      </label>
                      <Textarea
                        placeholder="Ex: Marca principal, manual em PDF, templates para Instagram e apresentação..."
                        value={q4}
                        onChange={(e) => updateQuestion("q4", e.target.value, setQ4)}
                        onFocus={() => setFocusedField("entregaveis_especificos")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[var(--text-primary)]">
                        2. Existe alguma restrição visual, cor que não pode ser usada ou diretriz anterior?
                      </label>
                      <Textarea
                        placeholder="Ex: Queremos evitar tons de azul padrão; precisamos manter o nome já registrado..."
                        value={q5}
                        onChange={(e) => updateQuestion("q5", e.target.value, setQ5)}
                        onFocus={() => setFocusedField("diretrizes_anteriores")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[var(--text-primary)]">
                          3. Você já possui textos, fotos em alta resolução ou outros materiais prontos?
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleUnsure("Materiais", (v) => updateQuestion("q6", v, setQ6), "q6")}
                          className="text-[11px] font-mono text-[var(--accent)] hover:underline"
                        >
                          {unsureFields.includes("Materiais") ? "✓ Definir agora" : "Vou enviar depois"}
                        </button>
                      </div>
                      <Textarea
                        placeholder="Ex: Temos os textos redigidos, mas precisaremos de fotos de banco de imagens premium..."
                        value={q6}
                        onChange={(e) => updateQuestion("q6", e.target.value, setQ6)}
                        onFocus={() => setFocusedField("materiais_disponiveis")}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Prazos e Alinhamentos */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div className="border-b border-[var(--border)] pb-4">
                      <span className="eyebrow">Etapa 3 de 3</span>
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                        Prazos e Alinhamento Final
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[var(--text-primary)]">
                        1. Existe alguma data crítica ou evento/lançamento atrelado a este projeto?
                      </label>
                      <Textarea
                        placeholder="Ex: Pretendemos lançar no congresso nacional que acontece em 45 dias..."
                        value={q7}
                        onChange={(e) => updateQuestion("q7", e.target.value, setQ7)}
                        onFocus={() => setFocusedField("data_critica_evento")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[var(--text-primary)]">
                        2. Quem será o responsável direto pela aprovação e envio de feedbacks?
                      </label>
                      <Textarea
                        placeholder="Ex: Eu e meu sócio centralizaremos as decisões e aprovações..."
                        value={q8}
                        onChange={(e) => updateQuestion("q8", e.target.value, setQ8)}
                        onFocus={() => setFocusedField("responsavel_aprovacao")}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[var(--text-primary)]">
                        3. Há alguma observação importante ou dúvida adicional?
                      </label>
                      <Textarea
                        placeholder="Ex: Gostaríamos de entender também a possibilidade de suporte pós-entrega..."
                        value={q9}
                        onChange={(e) => updateQuestion("q9", e.target.value, setQ9)}
                        onFocus={() => setFocusedField("observacoes_finais")}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: "Foi isso que eu entendi" (Review & Confirmation) */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div className="border-b border-[var(--border)] pb-4">
                      <span className="eyebrow text-emerald-400">Revisão Pré-Envio</span>
                      <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mt-1">
                        Foi isso que eu entendi:
                      </h3>
                    </div>

                    <div className="grid gap-4 bg-[var(--surface)] p-5 rounded-[var(--radius-lg)] border border-[var(--border)]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                          Objetivo e Momento
                        </span>
                        <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                          {q1 || "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 pt-3 border-t border-[var(--border)]">
                        <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                          Público-Alvo
                        </span>
                        <p className="text-sm text-[var(--text-secondary)]">{q2 || "A definir"}</p>
                      </div>

                      <div className="flex flex-col gap-1 pt-3 border-t border-[var(--border)]">
                        <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                          Entregáveis Prioritários
                        </span>
                        <p className="text-sm text-[var(--text-secondary)]">{q4 || "A definir"}</p>
                      </div>

                      <div className="flex flex-col gap-1 pt-3 border-t border-[var(--border)]">
                        <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                          Situação dos Materiais
                        </span>
                        <p className="text-sm text-[var(--text-secondary)]">{q6 || "Envio complementar"}</p>
                      </div>

                      {unsureFields.length > 0 && (
                        <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                          <span>
                            Pontos marcados para orientação durante o processo: <strong>{unsureFields.join(", ")}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-strong)] border border-[var(--border)] flex items-center gap-3">
                      <Check className="w-5 h-5 text-[var(--accent)] shrink-0" />
                      <p className="text-xs text-[var(--text-secondary)]">
                        Ao clicar em confirmar, analisarei o briefing e estruturarei a proposta de escopo e cronograma.
                      </p>
                    </div>
                  </div>
                )}

                {/* Buttons Navigation */}
                <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={() => {
                        setCurrentStep((prev) => prev - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                      disabled={isLoading}
                    >
                      Voltar Etapa
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    rightIcon={
                      currentStep === totalSteps ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )
                    }
                  >
                    {currentStep === totalSteps
                      ? "Está Certo, Enviar Solicitação"
                      : "Próxima Etapa"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar Column (4 cols) with IBD Companion & Live Briefing Sheet */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <IBDCompanion
              message={guideMessage}
              onApplyTemplate={(tpl) => {
                if (currentStep === 1) setQ1((prev) => (prev ? `${prev}\n${tpl}` : tpl));
                if (currentStep === 2) setQ4((prev) => (prev ? `${prev}\n${tpl}` : tpl));
              }}
            />

            <LiveBriefingSheet
              data={{
                serviceName: "Demanda Estruturada",
                objective: q1,
                targetAudience: q2,
                hasMaterials: q6 ? (q6.toLowerCase().includes("pronto") ? "sim" : "pendente") : undefined,
                materialsNote: q6,
                unsureFields,
                currentStep,
                totalSteps,
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function BriefingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Carregando briefing...</div>}>
      <BriefingFlow />
    </Suspense>
  );
}
