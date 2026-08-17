import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { MediaPlaceholder } from "./media-placeholder";

export function Hero() {
  return (
    <Section spacing="lg" className="pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="flex flex-col gap-6">
            <span className="eyebrow">IBD • Ícaro Braga Designer</span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              Design que trabalha <span className="text-[var(--accent)]">pelo seu negócio.</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Sou o Ícaro Braga. Transformo o que você precisa dizer em peças que funcionam: identidade, social media e materiais para o mundo real.
            </p>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border-l-2 border-l-[var(--accent)] border border-[var(--border)] max-w-xl text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Você fala direto com quem cria. Sem intermediário, sem telefone sem fio.
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/comecar">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  COMEÇAR BRIEFING
                </Button>
              </Link>

              <Link href="/servicos">
                <Button variant="secondary" size="lg">
                  VER SERVIÇOS
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Portrait Placeholder */}
          <div className="flex flex-col items-center justify-center">
            <MediaPlaceholder
              label="TODO_ASSET_ICARO_HERO"
              type="portrait"
              aspectRatio="portrait"
              hint="Retrato do designer Ícaro Braga em ambiente de estúdio"
              className="max-w-md shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
