import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "./media-placeholder";

export function AboutPreview() {
  return (
    <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--surface)]">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Narrative */}
          <div className="flex flex-col gap-6">
            <span className="eyebrow">Quem faz o IBD • Estúdio Solo</span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
              Prazer, Ícaro Braga.
            </h2>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                Sou designer gráfico há mais de 10 anos. Criei o IBD para trabalhar de um jeito diferente: você fala direto comigo, sem intermediário, sem reuniões desnecessárias e sem prazos que mudam do nada.
              </p>
              <p>
                Meu processo é simples: entender o que você precisa, fazer as perguntas certas e entregar no prazo combinado.
              </p>
              <p className="font-bold text-[var(--text-primary)]">
                Se você precisa de design que funciona e de um processo que não te dá dor de cabeça, estamos prontos.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/quem-sou">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  CONHEÇA MAIS SOBRE O ÍCARO
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Portrait / Studio Placeholder */}
          <div className="flex flex-col items-center justify-center">
            <MediaPlaceholder
              label="TODO_ASSET_ICARO_STUDIO"
              type="portrait"
              aspectRatio="portrait"
              hint="Ícaro Braga no estúdio de criação"
              className="max-w-md shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
