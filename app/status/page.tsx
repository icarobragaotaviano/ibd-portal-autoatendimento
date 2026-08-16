import type { Metadata } from "next";
import { StatusLookup } from "@/components/status-lookup";

export const metadata: Metadata = { title: "Acompanhar solicitação" };

export default function StatusPage() {
  return <section className="section"><div className="container-shell"><div className="max-w-3xl mb-10"><div className="eyebrow">Acompanhamento</div><h1 className="display text-5xl md:text-7xl mt-4">Veja em que etapa sua demanda está.</h1><p className="muted text-lg leading-8 mt-5">Use o protocolo recebido no envio e o mesmo e-mail informado na solicitação.</p></div><StatusLookup /></div></section>;
}
