import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/public/hero";
import { OnboardingMedia } from "@/components/public/onboarding-media";
import { FeaturedServices } from "@/components/public/featured-services";
import { PublicPipeline } from "@/components/public/public-pipeline";
import { MethodologySteps } from "@/components/public/methodology-steps";
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
      {/* 1. Hero (Posicionamento & Promessa) */}
      <Hero />

      {/* 2. Apresentação em Vídeo ("Antes de Começar" / "Como é trabalhar comigo") */}
      <OnboardingMedia />

      {/* 3. Serviços em Destaque (Catálogo Editorial) */}
      <FeaturedServices />

      {/* 4. Jornada Comercial (Do Lead ao Portal) */}
      <PublicPipeline />

      {/* 5. Método de Execução (As 5 Etapas) */}
      <Section spacing="lg" className="border-t border-[var(--border)]">
        <Container size="lg">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="eyebrow">Metodologia • Execução Técnica</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Sem espaço para improviso
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Rigor técnico e processo estruturado da conversa inicial à entrega dos arquivos fechados.
              </p>
            </div>

            <MethodologySteps />
          </div>
        </Container>
      </Section>

      {/* 6. Combinados do Processo (Alinhamento & Regras Claras) */}
      <WorkingTogetherSummary />

      {/* 7. Portfólio Selecionado (Mini-Cases com Desafio, Entrega e Resultado) */}
      <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--surface)]">
        <Container size="lg">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[var(--border)]">
              <div className="flex flex-col gap-2 max-w-xl">
                <span className="eyebrow">Portfólio • Casos Reais</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                  Projetos que resolveram problemas concretos
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Conheça alguns dos trabalhos desenvolvidos pelo estúdio, documentados do desafio inicial ao resultado final.
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

      {/* 8. Quem Faz o IBD (Sobre Ícaro Braga • Estúdio Solo) */}
      <AboutPreview />

      {/* 9. CTA Final de Conversão (Entrada para o Briefing) */}
      <FinalCTA />
    </div>
  );
}
