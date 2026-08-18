import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function PublicPipeline() {
  const steps = [
    {
      num: "01",
      title: "Entrada",
      description: "Você escolhe o serviço e envia a necessidade inicial.",
    },
    {
      num: "02",
      title: "Manual do Cliente",
      description: "Você conhece os combinados de atendimento e prazos.",
    },
    {
      num: "03",
      title: "Briefing Guiado",
      description: "Respondemos perguntas pontuais para fechar o escopo.",
    },
    {
      num: "04",
      title: "Proposta & Contrato",
      description: "Escopo fechado, valor definido e termos acordados.",
    },
    {
      num: "05",
      title: "Ativação",
      description: "Seu projeto é oficializado e seu acesso ao portal é liberado.",
    },
    {
      num: "06",
      title: "Acompanhamento",
      description: "Você acompanha cada entrega e revisão em um só lugar.",
    },
  ];

  return (
    <Section spacing="md" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="eyebrow">Fluxo Comercial • Transparência</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Como o seu projeto começa
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Fluxo estruturado e sem surpresas. Você sempre sabe onde o projeto está e o que acontece a seguir.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="surface-card p-6 flex flex-col justify-between gap-4 border-[var(--border)] relative overflow-hidden group hover:border-amber-500/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-2xl font-bold text-[var(--accent)]">
                    {step.num}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
