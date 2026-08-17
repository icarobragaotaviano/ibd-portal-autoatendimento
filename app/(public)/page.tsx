import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/public/hero";
import { OnboardingMedia } from "@/components/public/onboarding-media";
import { FeaturedServices } from "@/components/public/featured-services";
import { PublicPipeline } from "@/components/public/public-pipeline";
import { WorkingTogetherSummary } from "@/components/public/working-together-summary";
import { PortfolioGrid } from "@/components/public/portfolio-grid";
import { AboutPreview } from "@/components/public/about-preview";
import { FinalCTA } from "@/components/public/final-cta";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "IBD — Ícaro Braga Designer | Design que trabalha pelo seu negócio",
  description:
    "Estúdio solo de design. Identidade visual, redes sociais, landing pages e apresentações. Atendimento direto com quem cria, prazos transparentes e portal exclusivo.",
  openGraph: {
    title: "IBD — Ícaro Braga Designer",
    description: "Design que trabalha pelo seu negócio. Processo claro, sem intermediários e prazos transparentes.",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Apresentação em Vídeo / Onboarding */}
      <OnboardingMedia />

      {/* 3. Serviços em Destaque */}
      <FeaturedServices />

      {/* 4. Jornada Comercial (6 etapas) */}
      <PublicPipeline />

      {/* 5. Como Trabalhamos Juntos (7 combinados) */}
      <WorkingTogetherSummary />

      {/* 6. Portfólio Selecionado */}
      <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--surface)]">
        <Container size="lg">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[var(--border)]">
              <div className="flex flex-col gap-2 max-w-xl">
                <span className="eyebrow">Trabalhos • Portfólio Selecionado</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                  Projetos recentes
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Cases com desafios reais, processos transparentes e foco em resultado.
                </p>
              </div>

              <Link href="/portfolio">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Ver todos os cases
                </Button>
              </Link>
            </div>

            <PortfolioGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* 7. Quem Faz o IBD */}
      <AboutPreview />

      {/* 8. CTA Final */}
      <FinalCTA />
    </div>
  );
}
