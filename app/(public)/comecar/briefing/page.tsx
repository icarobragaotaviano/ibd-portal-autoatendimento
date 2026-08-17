"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";

function BriefingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prospectId = searchParams.get("prospectId");

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!prospectId) {
      setError("Identificador de solicitação não encontrado. Por favor, reinicie pelo formulário.");
      return;
    }

    const isLastStep = currentStep === totalSteps;

    // Collect responses up to current step
    const responses: Record<string, string> = {};
    if (currentStep >= 1) {
      responses.momento_e_objetivo = q1;
      responses.publico_alvo = q2;
      responses.referencias_concorrentes = q3;
    }
    if (currentStep >= 2) {
      responses.entregaveis_especificos = q4;
      responses.diretrizes_anteriores = q5;
      responses.materiais_disponiveis = q6;
    }
    if (currentStep >= 3) {
      responses.data_critica_evento = q7;
      responses.responsavel_aprovacao = q8;
      responses.observacoes_finais = q9;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/prospects/${prospectId}/briefing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: currentStep,
          responses,
          completed: isLastStep,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Falha ao salvar respostas do briefing.");
        return;
      }

      if (isLastStep) {
        router.push(`/comecar/obrigado?prospectId=${prospectId}`);
      } else {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("Erro ao se comunicar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section spacing="lg" className="pt-8 sm:pt-16 pb-24">
      <Container size="md">
        <div className="flex flex-col gap-8">
          <PageHeader
            eyebrow={`Passo 3 de 3 • Briefing Guiado (${currentStep}/${totalSteps})`}
            title="Briefing do Projeto"
            description="Para eu entender bem o projeto, vou te fazer algumas perguntas. São até 3 por vez."
          />

          <div className="flex flex-col gap-2">
            <Progress value={currentStep} max={totalSteps} showLabel />
            <span className="text-xs font-mono text-[var(--text-muted)] text-right">
              Etapa {currentStep} de {totalSteps}
            </span>
          </div>

          {error && (
            <Alert variant="danger" title="Erro">
              {error}
            </Alert>
          )}

          <Card>
            <form onSubmit={handleNextStep} className="flex flex-col gap-8">
              {/* STEP 1: Contexto e Posicionamento */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="border-b border-[var(--border)] pb-4">
                    <span className="eyebrow">Etapa 1</span>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                      Contexto e Posicionamento
                    </h3>
                  </div>

                  <Textarea
                    label="1. Qual é o momento atual do seu negócio e o objetivo principal deste trabalho?"
                    placeholder="Ex: Estamos reposicionando nossa consultoria para atender clientes corporativos maiores..."
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    required
                  />

                  <Textarea
                    label="2. Quem é o público-alvo prioritário que precisamos impactar?"
                    placeholder="Ex: Diretores de tecnologia, fundadores de startups e tomadores de decisão B2B..."
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    required
                  />

                  <Textarea
                    label="3. Quais marcas, referências visuais ou concorrentes refletem a qualidade que você busca?"
                    placeholder="Ex: Gostamos do estilo minimalista da Apple e do contraste editorial da Monocle..."
                    value={q3}
                    onChange={(e) => setQ3(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* STEP 2: Escopo e Entregáveis */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="border-b border-[var(--border)] pb-4">
                    <span className="eyebrow">Etapa 2</span>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                      Escopo e Materiais
                    </h3>
                  </div>

                  <Textarea
                    label="1. Quais peças ou entregáveis específicos são prioridade?"
                    placeholder="Ex: Marca principal, manual em PDF, templates para Instagram e apresentação comercial..."
                    value={q4}
                    onChange={(e) => setQ4(e.target.value)}
                    required
                  />

                  <Textarea
                    label="2. Existe alguma restrição visual, cor que não pode ser usada ou diretriz anterior?"
                    placeholder="Ex: Queremos evitar tons de azul padrão; precisamos manter o nome já registrado..."
                    value={q5}
                    onChange={(e) => setQ5(e.target.value)}
                    required
                  />

                  <Textarea
                    label="3. Você já possui textos, fotos em alta resolução ou outros materiais prontos?"
                    placeholder="Ex: Temos os textos redigidos, mas precisaremos de fotos de banco de imagens premium..."
                    value={q6}
                    onChange={(e) => setQ6(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* STEP 3: Prazos e Alinhamentos */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="border-b border-[var(--border)] pb-4">
                    <span className="eyebrow">Etapa 3</span>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mt-1">
                      Prazos e Alinhamento Final
                    </h3>
                  </div>

                  <Textarea
                    label="1. Existe alguma data crítica ou evento/lançamento atrelado a este projeto?"
                    placeholder="Ex: Pretendemos lançar no congresso nacional que acontece em 45 dias..."
                    value={q7}
                    onChange={(e) => setQ7(e.target.value)}
                    required
                  />

                  <Textarea
                    label="2. Quem será o responsável direto pela aprovação e envio de feedbacks?"
                    placeholder="Ex: Eu e meu sócio centralizaremos as decisões e aprovações..."
                    value={q8}
                    onChange={(e) => setQ8(e.target.value)}
                    required
                  />

                  <Textarea
                    label="3. Há alguma observação importante ou dúvida adicional antes da análise da proposta?"
                    placeholder="Ex: Gostaríamos de entender também a possibilidade de suporte pós-entrega..."
                    value={q9}
                    onChange={(e) => setQ9(e.target.value)}
                  />
                </div>
              )}

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
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
                    ? "Concluir e Enviar Briefing"
                    : "Próxima Etapa"}
                </Button>
              </div>
            </form>
          </Card>
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
