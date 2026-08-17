import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPublicCaseBySlug, getPublishedCases } from "@/data/cases";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/public/media-placeholder";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cases = getPublishedCases();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublicCaseBySlug(slug);

  if (!item) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${item.title} — ${item.client}`,
    description: item.challenge,
    openGraph: {
      title: `${item.title} — ${item.client} | IBD`,
      description: item.challenge,
    },
  };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getPublicCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb */}
      <Section spacing="sm" className="pt-8 pb-4 border-b border-[var(--border)]">
        <Container size="lg">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao portfólio</span>
          </Link>
        </Container>
      </Section>

      {/* Case Hero */}
      <Section spacing="lg" className="pt-10 pb-16">
        <Container size="lg">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[var(--accent)] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {item.client}
              </span>

              <div className="flex flex-wrap gap-1.5">
                {item.services.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              {item.title}
            </h1>
          </div>
        </Container>
      </Section>

      {/* Main Cover Asset */}
      <Section spacing="sm">
        <Container size="lg">
          <MediaPlaceholder
            label={`TODO_ASSET_${item.slug.toUpperCase().replace(/-/g, "_")}_COVER`}
            type="image"
            aspectRatio="wide"
            hint={`Capa do projeto ${item.client}`}
            className="shadow-2xl"
          />
        </Container>
      </Section>

      {/* Structured Case Sections: Desafio, Entrega, Resultado */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Desafio */}
            <div className="surface-card p-8 flex flex-col gap-4 border-[var(--border)]">
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--accent)]">
                01 • O Desafio
              </span>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Contexto e necessidade
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.challenge}
              </p>
            </div>

            {/* Entrega */}
            <div className="surface-card p-8 flex flex-col gap-4 border-[var(--border)]">
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--accent)]">
                02 • A Entrega
              </span>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Soluções e entregáveis
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.delivery}
              </p>
            </div>

            {/* Resultado */}
            <div className="surface-card p-8 flex flex-col gap-4 border-[var(--border)]">
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--accent)]">
                03 • O Resultado
              </span>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Impacto no negócio
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.result}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery Section */}
      {item.gallery && item.gallery.length > 0 && (
        <Section spacing="md" className="border-t border-[var(--border)] bg-[var(--surface)]">
          <Container size="lg">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">Galeria • Visualização dos Entregáveis</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Peças e aplicações
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {item.gallery.map((_, idx) => (
                  <MediaPlaceholder
                    key={idx}
                    label={`TODO_ASSET_${item.slug.toUpperCase().replace(/-/g, "_")}_0${idx + 1}`}
                    type="image"
                    aspectRatio="video"
                    hint={`Aplicação visual ${idx + 1} de ${item.client}`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Direct CTA Section */}
      <Section spacing="lg" className="border-t border-[var(--border)]">
        <Container size="md">
          <div className="surface-card p-8 sm:p-12 text-center flex flex-col items-center gap-6 border-amber-500/20">
            <span className="eyebrow">Próximo Projeto</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Quer construir algo assim para o seu negócio?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-md">
              Inicie o briefing agora mesmo. Analisamos seu momento e desenhamos a solução visual ideal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/comecar">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  COMEÇAR BRIEFING
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg">
                  Ver outros projetos
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
