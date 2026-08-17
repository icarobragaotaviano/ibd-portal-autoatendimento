import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { getServices } from "@/data/services";
import { ServiceCard } from "@/components/public/service-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/public/final-cta";

export const metadata: Metadata = {
  title: "Serviços de Design",
  description:
    "Identidade visual, peças para redes sociais, landing pages, diagramação editorial e apresentações comerciais. Processo transparente e entrega no prazo.",
  openGraph: {
    title: "Serviços de Design | IBD — Ícaro Braga Designer",
    description: "Design com processo claro, sem intermediários e com foco em conversão e consistência visual.",
  },
};

export default function ServicosPage() {
  const allServices = getServices();

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <Section spacing="lg" className="pt-12 sm:pt-16 pb-12">
        <Container size="lg">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="eyebrow">Soluções • Catálogo de Serviços</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Serviços de design
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Design que resolve problemas reais do seu negócio. Do diagnóstico inicial à entrega final, com processo transparente e foco no resultado.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="md">
        <Container size="lg">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Mandatory Note Section */}
      <Section spacing="md">
        <Container size="lg">
          <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border)] relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--surface-strong)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--accent)]">
                  Nota Obrigatória sobre Prazos e Valores
                </span>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Diretriz de Transparência Operacional
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
                  Os prazos e valores apresentados são estimativas para projetos padrão. O escopo exato, o cronograma e o investimento final são confirmados após a aprovação do briefing. A produção tem início mediante confirmação do sinal de entrada e entrega dos materiais obrigatórios.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Custom Demand Block */}
      <Section spacing="md">
        <Container size="lg">
          <div className="surface-card p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-strong)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Não encontrou exatamente o que precisa?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  Explique sua demanda no briefing aberto e desenhamos um escopo sob medida.
                </p>
              </div>
            </div>

            <Link href="/comecar?service=outro">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                COMEÇAR BRIEFING PERSONALIZADO
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
