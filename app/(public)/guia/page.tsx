import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/content/guides";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Central de Guias & Manual do Cliente",
  description: "Entenda todas as regras de prazos, estimativas, revisões, materiais e pausas do IBD.",
};

export default function GuidesPage() {
  return (
    <Section spacing="lg" className="pt-8 sm:pt-16 pb-24">
      <Container size="lg">
        <PageHeader
          eyebrow="Central de Conhecimento IBD 2026"
          title="Manual & Guias do Processo"
          description="Diretrizes claras e sem letras miúdas. Consulte cada regra antes de iniciar ou durante o andamento do seu projeto."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guia/${guide.slug}`}
              className="surface-card p-6 sm:p-7 flex flex-col justify-between group cursor-pointer border-[var(--border)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-[var(--accent)] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    GUIA 0{index + 1}
                  </span>
                  <BookOpen className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                    {guide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-6 mt-4 border-t border-[var(--border)] text-xs font-mono font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                <span>Ler guia completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
