import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <Section spacing="lg" className="border-t border-[var(--border)] relative overflow-hidden bg-radial from-amber-500/[0.04] to-transparent">
      <Container size="md">
        <div className="surface-card p-8 sm:p-14 text-center flex flex-col items-center gap-6 border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]" />

          <span className="eyebrow">Próximo Passo</span>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-xl leading-tight">
            Pronto para começar?
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Não precisa ter tudo definido. O briefing foi feito exatamente para descobrir o que você precisa e estruturar a melhor entrega.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/comecar">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                COMEÇAR BRIEFING
              </Button>
            </Link>

            <Link href="/servicos">
              <Button variant="secondary" size="lg">
                CONHECER OS SERVIÇOS
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
