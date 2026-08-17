import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";
import { getGuide, guides } from "@/content/guides";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide
    ? {
        title: `${guide.title} | Guia do Cliente IBD`,
        description: guide.summary,
      }
    : {};
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  return (
    <Section spacing="lg" className="pt-8 sm:pt-16 pb-24">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          {/* Sidebar Nav */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 self-start">
            <Link href="/guia">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Todos os Guias
              </Button>
            </Link>

            <div className="surface-card p-5 flex flex-col gap-3">
              <span className="eyebrow">Outros Guias</span>
              <div className="flex flex-col gap-1">
                {guides.map((g) => {
                  const isActive = g.slug === guide.slug;
                  return (
                    <Link
                      key={g.slug}
                      href={`/guia/${g.slug}`}
                      className={`text-xs font-mono py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[var(--surface-strong)] text-[var(--accent)] font-bold border border-amber-500/20"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                      }`}
                    >
                      {g.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Guide Article Content */}
          <article className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-[var(--border)] pb-8">
              <span className="eyebrow">Manual & Diretrizes IBD</span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                {guide.title}
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {guide.sections.map((sec, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  {sec.heading && (
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}

                  {sec.bullets && (
                    <ul className="grid gap-2.5 my-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-secondary)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.numbered && (
                    <ol className="grid gap-3 my-2">
                      {sec.numbered.map((item, nIdx) => (
                        <li
                          key={nIdx}
                          className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="w-6 h-6 rounded-full bg-[var(--surface-strong)] text-[var(--accent)] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            0{nIdx + 1}
                          </span>
                          <span className="leading-relaxed text-[var(--text-primary)]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {sec.callout && (
                    <div className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-amber-500/5 border-l-4 border-l-[var(--accent)] border border-amber-500/20 text-xs sm:text-sm text-[var(--text-primary)] flex items-start gap-3 my-2 leading-relaxed">
                      <AlertCircle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-[var(--accent)] block mb-1">
                          Diretriz Importante:
                        </strong>
                        {sec.callout}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
