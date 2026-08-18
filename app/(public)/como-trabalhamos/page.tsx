import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/public/final-cta";

export const metadata: Metadata = {
  title: "Como Trabalhamos Juntos • Combinados do Estúdio",
  description:
    "Processo claro, prazos confiáveis e transparência. Conheça os 7 combinados de atendimento e produção do estúdio IBD.",
  openGraph: {
    title: "Como Trabalhamos Juntos | IBD — Ícaro Braga Designer",
    description: "Sem letras miúdas. Regras de revisão, prazos e acompanhamento direto.",
  },
};

export default function ComoTrabalhamosPage() {
  const detailedAgreements = [
    {
      num: "01",
      title: "Briefing antes de tudo",
      desc: "Sem escopo aprovado, o trabalho não começa.",
    },
    {
      num: "02",
      title: "Prazo após materiais",
      desc: "O cronômetro só roda quando os arquivos necessários forem enviados.",
    },
    {
      num: "03",
      title: "Data confirmada é compromisso",
      desc: "Antes do alinhamento completo, qualquer data é apenas estimativa.",
    },
    {
      num: "04",
      title: "2 rodadas de revisão",
      desc: "Ajustes de refinamento inclusos; mudanças radicais de direção configuram novo escopo.",
    },
    {
      num: "05",
      title: "Retorno ágil",
      desc: "Lembrete após 3 dias sem resposta; pausa de cronograma após 6 dias para organizar a fila.",
    },
    {
      num: "06",
      title: "Escopo respeitado",
      desc: "Novas peças adicionadas durante o processo entram como demanda complementar.",
    },
    {
      num: "07",
      title: "Atendimento focado",
      desc: "De segunda a sexta, das 09:00 às 18:00 (horário de Brasília/Fortaleza).",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <Section spacing="lg" className="pt-12 sm:pt-20 pb-12">
        <Container size="lg">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="eyebrow">Alinhamento • Diretrizes do Processo</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Como trabalhamos juntos
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Processo claro não é burocracia. É o que deixa o projeto tranquilo, seguro e previsível para os dois lados.
            </p>
          </div>
        </Container>
      </Section>

      {/* Grid of detailed agreements */}
      <Section spacing="md">
        <Container size="lg">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {detailedAgreements.map((item) => (
              <div
                key={item.num}
                className="surface-card p-6 sm:p-7 flex flex-col justify-between gap-4 border-[var(--border)]"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xl font-bold text-[var(--accent)]">
                    {item.num}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Central de Guias Link */}
      <Section spacing="md">
        <Container size="lg">
          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                Acesse a Central de Guias Completa
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Explore os 7 guias operacionais de briefing, materiais, revisões, prazos e retomada.
              </p>
            </div>

            <Link href="/guia">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Ver todos os 7 guias
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
