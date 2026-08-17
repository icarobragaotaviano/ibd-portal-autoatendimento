import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MethodologySteps } from "@/components/public/methodology-steps";
import { FinalCTA } from "@/components/public/final-cta";

export const metadata: Metadata = {
  title: "Como Eu Trabalho • Metodologia IBD",
  description:
    "Conheça as 5 etapas da metodologia IBD: Briefing, Material, Data Confirmada, Entrega e Revisão, e Entrega Final.",
  openGraph: {
    title: "Como Eu Trabalho | IBD — Ícaro Braga Designer",
    description: "Processo claro do primeiro rascunho aos arquivos finais de entrega.",
  },
};

export default function ComoEuTrabalhoPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <Section spacing="lg" className="pt-12 sm:pt-20 pb-12">
        <Container size="lg">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="eyebrow">Metodologia • Execução Criativa</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Como eu trabalho
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Sem etapas misteriosas ou retrabalho desnecessário. Cada projeto passa por cinco etapas claras, com validação e acompanhamento contínuo.
            </p>
          </div>
        </Container>
      </Section>

      {/* 5 Methodology Steps */}
      <Section spacing="md">
        <Container size="lg">
          <MethodologySteps />
        </Container>
      </Section>

      {/* Cross link to combinados / guia */}
      <Section spacing="md">
        <Container size="lg">
          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                Quer conhecer os combinados comerciais?
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Regras de atendimento, prazos de retorno e rodadas de revisão explicadas em detalhes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/como-trabalhamos">
                <Button variant="secondary" size="md">
                  Como trabalhamos juntos
                </Button>
              </Link>
              <Link href="/guia">
                <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Central de Guias
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
