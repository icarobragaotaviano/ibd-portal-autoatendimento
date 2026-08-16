import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/content/guides";

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide ? { title: guide.title, description: guide.summary } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return (
    <section className="section text-white">
      <div className="container-shell grid gap-8 lg:grid-cols-[.3fr_.7fr]">
        <aside className="self-start lg:sticky lg:top-24">
          <Link href="/guia" className="text-sm font-black hover:text-[#ffd400] transition-colors">
            ← Todos os guias
          </Link>
          <div className="eyebrow mt-8">Guia do cliente</div>
          <h1 className="display text-5xl mt-3">{guide.title}</h1>
          <p className="text-muted leading-7 mt-4">{guide.summary}</p>
        </aside>
        <article className="card p-6 md:p-10 prose-guide text-white">
          {guide.sections.map((section, index) => (
            <section key={index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.numbered && <ol>{section.numbered.map((item) => <li key={item}>{item}</li>)}</ol>}
              {section.callout && <div className="callout"><strong>Importante:</strong> {section.callout}</div>}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
