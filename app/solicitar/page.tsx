import type { Metadata } from "next";
import { RequestWizard } from "@/components/request-wizard";

export const metadata: Metadata = { title: "Nova solicitação" };

export default function RequestPage() {
  return (
    <section className="section text-white">
      <div className="container-shell">
        <div className="max-w-3xl mb-10"><div className="eyebrow">Nova demanda</div><h1 className="display text-5xl md:text-7xl mt-4">Conte o essencial. O processo organiza o resto.</h1><p className="muted text-lg leading-8 mt-5">Poucas perguntas por etapa, com orientação clara sobre prazo, materiais e próximos passos.</p></div>
        <RequestWizard />
      </div>
    </section>
  );
}
