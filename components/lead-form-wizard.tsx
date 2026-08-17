"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { trackPublicEvent } from "@/lib/analytics";

interface LeadFormWizardProps {
  initialService?: string;
  initialServiceName?: string;
  serviceOptions: Array<{ value: string; label: string }>;
}

export function LeadFormWizard({
  initialService = "",
  initialServiceName,
  serviceOptions,
}: LeadFormWizardProps) {
  const router = useRouter();

  // Steps: "form" -> "manual"
  const [step, setStep] = useState<"form" | "manual">("form");
  const [prospectId, setProspectId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [service, setService] = useState(initialService);
  const [needDescription, setNeedDescription] = useState("");
  const [desiredDeadline, setDesiredDeadline] = useState("");
  const [consent, setConsent] = useState(false);

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [manualAccepted, setManualAccepted] = useState(false);

  const optionsWithPlaceholder = [
    { value: "", label: "Selecione o tipo de serviço" },
    ...serviceOptions,
  ];

  async function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!consent) {
      setErrors({ consent: "Você precisa autorizar o uso dos dados para prosseguir." });
      return;
    }

    if (!service) {
      setErrors({ service: "Selecione o tipo de serviço desejado." });
      return;
    }

    setIsLoading(true);
    trackPublicEvent("lead_started", { service });

    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          service,
          need_description: needDescription,
          desired_deadline: desiredDeadline || null,
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.errors) {
          const formatted: Record<string, string> = {};
          for (const key in data.errors) {
            formatted[key] = data.errors[key][0];
          }
          setErrors(formatted);
        } else {
          setErrors({ form: data.error || "Erro ao registrar solicitação." });
        }
        return;
      }

      setProspectId(data.prospect.id);
      trackPublicEvent("lead_completed", { service });
      // Move to step 2: Manual do Cliente before briefing
      setStep("manual");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ form: "Falha de conexão com o servidor. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  }

  function handleProceedToBriefing() {
    if (!prospectId) return;
    trackPublicEvent("briefing_started", { service });
    router.push(`/comecar/briefing?prospectId=${prospectId}`);
  }

  return (
    <Section spacing="lg" className="pt-8 sm:pt-16 pb-24">
      <Container size="md">
        {step === "form" ? (
          <div className="flex flex-col gap-8">
            <PageHeader
              eyebrow="Passo 1 de 3 • Solicitação Inicial"
              title="Iniciar Novo Projeto"
              description="Conte sobre sua necessidade. As informações serão analisadas para estruturarmos o melhor caminho para sua entrega."
            />

            {initialServiceName && (
              <div className="p-4 rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-[var(--accent)] font-mono">
                <Tag className="w-4 h-4 shrink-0" />
                <span>
                  Serviço pré-selecionado: <strong>{initialServiceName}</strong>
                </span>
              </div>
            )}

            {errors.form && (
              <Alert variant="danger" title="Atenção">
                {errors.form}
              </Alert>
            )}

            <Card>
              <form onSubmit={handleInitialSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Seu Nome Completo"
                    placeholder="Ex: Mariana Albuquerque"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    required
                  />

                  <Input
                    type="email"
                    label="E-mail Profissional"
                    placeholder="Ex: mariana@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    type="tel"
                    label="WhatsApp para Contato"
                    placeholder="(85) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    error={errors.whatsapp}
                    helperText="Número para comunicações rápidas e atualizações de status."
                    required
                  />

                  <Select
                    label="Tipo de Serviço"
                    options={optionsWithPlaceholder}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    error={errors.service}
                    required
                  />
                </div>

                <Textarea
                  label="Descreva sua Necessidade ou Projeto"
                  placeholder="Explique o que precisa ser desenvolvido, o momento atual da sua marca e seus objetivos..."
                  value={needDescription}
                  onChange={(e) => setNeedDescription(e.target.value)}
                  error={errors.need_description}
                  required
                />

                <Input
                  type="date"
                  label="Prazo Desejado (Opcional)"
                  value={desiredDeadline}
                  onChange={(e) => setDesiredDeadline(e.target.value)}
                  error={errors.desired_deadline}
                  helperText="Data estimada. O prazo oficial será confirmado após aprovação do briefing."
                />

                {/* LGPD Consent */}
                <div className="pt-2">
                  <Checkbox
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    label="Autorização e Consentimento"
                    description="Autorizo o uso dos dados enviados para análise, contato e acompanhamento desta solicitação, em conformidade com a LGPD."
                    error={errors.consent}
                  />
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Avançar para o Manual do Cliente
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        ) : (
          /* Step 2: Manual do Cliente (Apresentado antes do briefing) */
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <PageHeader
              eyebrow="Passo 2 de 3 • Alinhamento do Processo"
              title="Manual do Cliente IBD"
              description="Antes de responder ao briefing, veja como funciona o processo de atendimento e execução. A leitura leva apenas 2 minutos e garante clareza para ambas as partes."
            />

            <Card className="flex flex-col gap-6 border-amber-500/20 bg-[var(--surface-elevated)]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                <BookOpen className="w-4 h-4" />
                Diretrizes de Atendimento & Produção
              </div>

              <div className="grid gap-4">
                {[
                  {
                    num: "1",
                    title: "Todo projeto começa com briefing",
                    text: "O briefing alinha exatamente o que será entregue, evitando retrabalho e desalinhamento de expectativas.",
                  },
                  {
                    num: "2",
                    title: "Prazo só vira compromisso após briefing aprovado + materiais recebidos",
                    text: "Antes de recebermos seus textos, fotos e referências obrigatórias, qualquer data é apenas uma estimativa.",
                  },
                  {
                    num: "3",
                    title: "Cada projeto inclui 2 rodadas de revisão",
                    text: "Ajustes e refinamentos dentro do escopo do briefing aprovado estão cobertos em até 2 rodadas estruturadas.",
                  },
                  {
                    num: "4",
                    title: "Mudança de direção criativa = novo escopo",
                    text: "Alterações estruturais de conceito ou adição de novas peças são tratadas como solicitação adicional.",
                  },
                  {
                    num: "5",
                    title: "Acompanhamento ativo e regras de retorno",
                    text: "Após 3 dias úteis sem resposta sobre uma versão enviada, fazemos um follow-up. Após 6 dias úteis sem retorno, o projeto entra em pausa programada.",
                  },
                  {
                    num: "6",
                    title: "Retomada conforme agenda disponível",
                    text: "Quando você responder em um projeto pausado, reabrimos o cronograma e definimos uma nova estimativa de data.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex gap-4 items-start"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--surface-strong)] text-[var(--accent)] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <Checkbox
                  checked={manualAccepted}
                  onChange={(e) => setManualAccepted(e.target.checked)}
                  label="Li e estou de acordo com o Manual do Cliente"
                />

                <Button
                  variant="primary"
                  size="md"
                  disabled={!manualAccepted}
                  onClick={handleProceedToBriefing}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continuar para o Briefing Guiado
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </Section>
  );
}
