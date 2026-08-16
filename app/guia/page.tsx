import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/guides";

export const metadata: Metadata = { title: "Guia do Cliente" };

export default function GuidesPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <div className="max-w-3xl"><div className="eyebrow">Central de guias</div><h1 className="display text-6xl md:text-7xl mt-4">Processo sem letra miúda.</h1><p className="muted text-lg leading-8 mt-5">Consulte cada regra antes de começar ou quando surgir uma dúvida durante o projeto.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {guides.map((guide, index) => <Link key={guide.slug} href={`/guia/${guide.slug}`} className="card p-6 min-h-60 flex flex-col group"><span className="eyebrow">0{index + 1}</span><h2 className="display text-3xl mt-5 group-hover:underline">{guide.title}</h2><p className="muted leading-6 mt-3">{guide.summary}</p><span className="font-black mt-auto pt-6">Abrir guia →</span></Link>)}
        </div>
      </div>
    </section>
  );
}
