import React from "react";

export function MethodologySteps() {
  const steps = [
    {
      num: "01",
      title: "Briefing",
      headline: "Toda peça nasce de uma conversa estruturada.",
      description:
        "Confirmo por escrito o que entendi antes de começar. Sem briefing aprovado, a produção não tem início.",
    },
    {
      num: "02",
      title: "Material",
      headline: "Você envia logos, referências e textos.",
      description: "Se faltar algo crítico para a execução, identificamos antes de rodar o prazo.",
    },
    {
      num: "03",
      title: "Data Confirmada",
      headline: "Com briefing aprovado e insumos recebidos, a data de entrega é travada no cronograma.",
      description: "Antes desse alinhamento completo, qualquer data é apenas estimativa.",
    },
    {
      num: "04",
      title: "Entrega e Revisão",
      headline: "Você recebe a primeira versão completa.",
      description:
        "O projeto inclui 2 rodadas de revisão dentro do escopo. Ajustes finos inclusos; mudança radical é novo escopo.",
    },
    {
      num: "05",
      title: "Fechamento",
      headline: "Arquivos finais organizados, fechados para produção e disponibilizados para download.",
      description: "Acesso permanente e organizado através do portal.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {steps.map((step) => (
        <div
          key={step.num}
          className="surface-card p-6 sm:p-8 flex flex-col md:flex-row md:items-start gap-6 border-[var(--border)] relative overflow-hidden"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface-strong)] border border-[var(--border)] shrink-0 font-mono text-base font-bold text-[var(--accent)]">
            {step.num}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Etapa {step.num}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {step.title}
            </h3>
            <p className="text-sm font-bold text-[var(--text-secondary)] leading-relaxed">
              {step.headline}
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
