import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/public/portfolio-grid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCTA } from "@/components/public/final-cta";

export const metadata: Metadata = {
  title: "Portfólio de Design",
  description:
    "Cases selecionados de identidade visual, materiais digitais, redes sociais e design editorial desenvolvidos pelo estúdio IBD.",
  openGraph: {
    title: "Portfólio | IBD — Ícaro Braga Designer",
    description: "Projetos de design com soluções visuais para desafios reais de negócio.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <Section spacing="lg" className="pt-12 sm:pt-20 pb-12">
        <Container size="lg">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="eyebrow">Trabalhos • Portfólio Selecionado</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Portfólio de projetos
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Soluções visuais desenvolvidas para clientes reais. Cada projeto nasce de um diagnóstico profundo e é executado com foco em consistência, usabilidade e clareza.
            </p>
          </div>
        </Container>
      </Section>

      {/* Grid of cases */}
      <Section spacing="md">
        <Container size="lg">
          <PortfolioGrid />
        </Container>
      </Section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
