import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserCheck, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/public/media-placeholder";
import { FinalCTA } from "@/components/public/final-cta";

export const metadata: Metadata = {
  title: "Quem Faz o IBD",
  description:
    "Conheça o designer Ícaro Braga. Estúdio solo focado em design estratégico, atendimento direto e processos transparentes.",
  openGraph: {
    title: "Quem Faz o IBD | Ícaro Braga Designer",
    description: "Design direto com quem cria. Sem intermediários, sem reuniões vazias e com compromisso real no prazo.",
  },
};

export default function QuemSouPage() {
  const principles = [
    {
      icon: <UserCheck className="w-5 h-5 text-[var(--accent)]" />,
      title: "Direto com quem cria",
      description:
        "Sem intermediários, sem executivo de contas e sem ruídos de comunicação. Você alinha cada detalhe diretamente comigo.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />,
      title: "Sem surpresas no prazo",
      description:
        "Data confirmada é data entregue. Se o briefing foi aprovado e o material recebido, o prazo é um compromisso inviolável.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[var(--accent)]" />,
      title: "Foco em resultado real",
      description:
        "Design feito para o mundo real: legível, consistente, funcional e desenhado para valorizar a proposta do seu negócio.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Bio / Presentation Hero */}
      <Section spacing="lg" className="pt-12 sm:pt-20 pb-16">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="eyebrow">Quem Faz o IBD • Estúdio Solo</span>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                Prazer, Ícaro Braga.
              </h1>

              <div className="flex flex-col gap-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
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

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/comecar">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    COMEÇAR BRIEFING
                  </Button>
                </Link>

                <Link href="/como-eu-trabalho">
                  <Button variant="secondary" size="lg">
                    VER COMO EU TRABALHO
                  </Button>
                </Link>
              </div>
            </div>

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

      {/* Principles Section */}
      <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--surface)]">
        <Container size="lg">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="eyebrow">Princípios do Estúdio</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Como eu enxergo o design profissional
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {principles.map((item, idx) => (
                <div
                  key={idx}
                  className="surface-card p-6 sm:p-8 flex flex-col gap-4 border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-strong)] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
