import React from "react";
import { MessageSquare, FileSearch, Sparkles, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const STEPS = [
  {
    number: "01",
    title: "Você me conta o projeto",
    description: "Preencha uma solicitação inicial rápida compartilhando o contexto e o objetivo principal.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Eu analiso a demanda",
    description: "Avalio escopo, viabilidade técnica, prazos e os detalhes que precisamos alinhar.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Seguimos com briefing e proposta",
    description: "Se fizer sentido avançar, estruturamos o plano completo do projeto antes de iniciar a produção.",
    icon: Sparkles,
  },
];

export function MvpHowItWorks() {
  return (
    <Section id="como-funciona" spacing="lg" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="lg">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="eyebrow">Como funciona</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Processo transparente do primeiro contato à entrega
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Sem burocracia desnecessária. Um fluxo assíncrono projetado para economizar seu tempo
              e garantir clareza absoluta em cada etapa.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="surface-card p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden group hover:border-[var(--border-hover)]"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-[var(--accent)]">
                        {step.number}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee / Microcopy Callout */}
          <div className="flex items-start sm:items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
            <ShieldAlert className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              <strong className="text-[var(--text-primary)]">Importante:</strong> A solicitação
              inicial não cria automaticamente um contrato nem inicia a produção. Toda contratação é
              acordada formalmente antes do início do trabalho.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
