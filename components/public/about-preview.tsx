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
                Sou designer gráfico e trabalho há mais de uma década criando marcas, publicações editoriais e interfaces digitais. Criei o IBD para trabalhar exatamente como acredito: com atenção concentrada, contato direto com quem decide e processos que não geram desgaste.
              </p>
              <p>
                Aqui você não fala com intermediários. A mesma pessoa que analisa o seu briefing é quem senta diante da tela, pensa na tipografia, organiza o grid e fecha os arquivos finais.
              </p>
              <p className="font-bold text-[var(--text-primary)]">
                Se você precisa de design que funciona e de um processo transparente para chegar lá, me conta o que você precisa.
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
