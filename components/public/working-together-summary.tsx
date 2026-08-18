import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function WorkingTogetherSummary() {
  const agreements = [
    {
      title: "Briefing antes de tudo",
      description: "Sem escopo aprovado, o trabalho não começa.",
    },
    {
      title: "Prazo após materiais",
      description: "O cronômetro só roda quando os arquivos necessários forem enviados.",
    },
    {
      title: "Data confirmada é compromisso",
      description: "Antes do alinhamento completo, qualquer data é apenas estimativa.",
    },
    {
      title: "2 rodadas de revisão",
      description: "Ajustes de refinamento inclusos; mudanças radicais de direção configuram novo escopo.",
    },
    {
      title: "Retorno ágil",
      description: "Lembrete após 3 dias sem resposta; pausa de cronograma após 6 dias para organizar a fila.",
    },
    {
      title: "Escopo respeitado",
      description: "Novas peças adicionadas durante o processo entram como demanda complementar.",
    },
    {
      title: "Atendimento focado",
      description: "De segunda a sexta, das 09:00 às 18:00 (horário de Brasília/Fortaleza).",
    },
  ];

  return (
    <Section spacing="lg">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="eyebrow">Alinhamento • Regras Claras</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Combinados que protegem o seu tempo e o meu
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Processo claro não é burocracia: é o que garante que o seu projeto seja entregue com tranquilidade e pontualidade.
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
