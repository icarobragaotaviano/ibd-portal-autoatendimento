"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Clock, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const prospectId = searchParams.get("prospectId");

  return (
    <Section spacing="lg" className="pt-12 sm:pt-20 pb-24">
      <Container size="md">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[var(--success)] shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-3 max-w-xl">
            <span className="eyebrow">Solicitação & Briefing Recebidos</span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Recebi sua solicitação.
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Agora eu vou revisar o briefing e avaliar o melhor caminho para o projeto. O próximo passo é a definição de escopo, prazo e investimento.
            </p>
            {prospectId && (
              <div className="inline-flex items-center justify-center gap-2 mt-2 py-1 px-3 rounded-full bg-[var(--surface-strong)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]">
                <span>Protocolo:</span>
                <strong className="text-[var(--text-primary)]">{prospectId}</strong>
              </div>
            )}
          </div>

          {/* Next Steps Timeline Card */}
          <Card className="w-full text-left bg-[var(--surface-elevated)] border-[var(--border)] p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent)]" />
              O que acontece a seguir?
            </h3>

            <div className="grid gap-6">
              {[
                {
                  step: "1",
                  title: "Análise do Briefing",
                  desc: "Leio suas respostas e avalio a complexidade técnica e gráfica da demanda.",
                },
                {
                  step: "2",
                  title: "Envio da Proposta",
                  desc: "Você recebe por e-mail e WhatsApp o escopo detalhado, investimento e estimativa de prazo.",
                },
                {
                  step: "3",
                  title: "Contrato & Formalização",
                  desc: "Com a aprovação, o projeto é formalizado e entra na agenda oficial.",
                },
                {
                  step: "4",
                  title: "Acesso ao Portal Privado",
                  desc: "Após a ativação, você acompanha projetos, revisões e próximos passos pelo portal.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[var(--surface-strong)] text-[var(--accent)] font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-[var(--border)]">
                    {item.step}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/como-eu-trabalho">
              <Button variant="secondary" size="md">
                Ver Como Eu Trabalho
              </Button>
            </Link>
            <Link href="/guia">
              <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Conhecer a Central de Guias
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Carregando confirmação...</div>}>
      <ObrigadoContent />
    </Suspense>
  );
}
