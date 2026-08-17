import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function WorkingTogetherSummary() {
  const agreements = [
    {
      title: "Briefing antes de tudo",
      description: "Sem briefing confirmado, a produção não começa.",
    },
    {
      title: "Prazo começa com o material",
      description: "A produção começa quando os materiais obrigatórios chegam.",
    },
    {
      title: "Data confirmada é compromisso",
      description: "Antes da confirmação, qualquer data é estimativa.",
    },
    {
      title: "2 rodadas de revisão",
      description: "Ajustes dentro do briefing estão incluídos. Mudança de direção é novo escopo.",
    },
    {
      title: "Retorno",
      description: "Após 3 dias úteis sem resposta, envio um lembrete. Após 6 dias úteis, o projeto entra em pausa.",
    },
    {
      title: "Escopo",
      description: "O briefing aprovado define o que será produzido. Novas demandas entram como novo trabalho.",
    },
    {
      title: "Atendimento",
      description: "Segunda a sexta-feira, das 09:00 às 18:00 (Fortaleza).",
    },
  ];

  return (
    <Section spacing="lg">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="eyebrow">Alinhamento • Processo Transparente</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Como trabalhamos juntos
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Processo claro não é burocracia. É o que deixa o projeto tranquilo para os dois lados.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agreements.map((item, idx) => (
              <div
                key={idx}
                className="surface-card p-6 flex flex-col gap-2 border-[var(--border)] relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Connection to full guides */}
          <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-base text-[var(--text-primary)]">
                Quer ver os detalhes de cada diretriz?
              </span>
              <p className="text-xs text-[var(--text-muted)]">
                Consulte o Manual do Cliente completo e as políticas de prazos, revisões e pausas.
              </p>
            </div>

            <Link href="/guia">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                ABRIR GUIA COMPLETO
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
