import Link from "next/link";
import { ActionCard } from "@/components/action-card";

export default function HomePage() {
  return (
    <>
      <section className="section pt-16 md:pt-24">
        <div className="container-shell grid gap-10 md:grid-cols-[1.25fr_.75fr] md:items-end">
          <div>
            <div className="eyebrow">Autoatendimento orientado</div>
            <h1 className="display text-6xl sm:text-7xl md:text-[6.4rem] mt-5 max-w-4xl">Comece sem adivinhar o próximo passo.</h1>
            <p className="muted text-lg md:text-xl leading-8 max-w-2xl mt-6">Agende uma conversa, envie uma nova demanda ou consulte as regras do processo. Tudo foi organizado para deixar prazo, material, revisão e escopo claros desde o início.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link className="btn-primary" href="/solicitar">Enviar uma demanda</Link>
              <Link className="btn-secondary" href="/agendar">Agendar conversa</Link>
            </div>
          </div>
          <div className="card p-6 md:p-7">
            <div className="eyebrow">Regra central</div>
            <p className="display text-3xl mt-4">Prazo só vira compromisso depois de briefing aprovado + material recebido.</p>
            <p className="muted text-sm leading-6 mt-4">Antes disso, qualquer data informada é uma estimativa. Essa regra protege o projeto e mantém a agenda previsível.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          <ActionCard number="01" title="Agendar conversa" description="Veja horários livres reais e escolha um encontro de 50 minutos, com 10 minutos de respiro entre reuniões." href="/agendar" cta="Ver horários" />
          <ActionCard number="02" title="Solicitar projeto" description="Envie o que você precisa em poucas etapas. O formulário orienta o que informar sem transformar o briefing em interrogatório." href="/solicitar" cta="Começar solicitação" />
          <ActionCard number="03" title="Entender o processo" description="Consulte os guias de prazo, materiais, revisões, retorno, pausa e escopo antes de começar ou durante o projeto." href="/guia" cta="Abrir os guias" />
        </div>
      </section>

      <section className="section bg-[#1f2d28] text-white">
        <div className="container-shell grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div>
            <div className="eyebrow !text-[#dca27e]">Processo em 4 passos</div>
            <h2 className="display text-5xl mt-4">Clareza antes da produção.</h2>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {[
              "Você conta o que precisa.",
              "O briefing é organizado e aprovado.",
              "Os materiais necessários são recebidos.",
              "O prazo é confirmado e a produção começa.",
            ].map((item, index) => (
              <li key={item} className="rounded-2xl border border-white/15 bg-white/5 p-5 flex gap-4">
                <span className="text-[#dca27e] font-black">0{index + 1}</span>
                <span className="leading-6">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
