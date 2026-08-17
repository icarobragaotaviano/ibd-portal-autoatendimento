import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function PublicPipeline() {
  const steps = [
    {
      num: "01",
      title: "Conheça",
      description: "Assista ao vídeo ou veja como funciona o processo de trabalho do estúdio.",
    },
    {
      num: "02",
      title: "Escolha",
      description: "Escolha um serviço específico ou chegue sem saber exatamente o que precisa.",
    },
    {
      num: "03",
      title: "Briefing",
      description: "Responda poucas perguntas por rodada de forma guiada e sem formulários cansativos.",
    },
    {
      num: "04",
      title: "Proposta",
      description: "Você recebe escopo detalhado, investimento e condições por escrito.",
    },
    {
      num: "05",
      title: "Contrato",
      description: "Com a aprovação, o projeto é formalizado e entra na agenda conforme as condições da proposta.",
    },
    {
      num: "06",
      title: "Portal",
      description: "Depois da ativação pelo admin, você acompanha status, materiais, revisões e próximos passos.",
    },
  ];

  return (
    <Section spacing="md" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="eyebrow">Jornada Comercial • Do Primeiro Contato ao Portal</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Como funciona o processo comercial
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
