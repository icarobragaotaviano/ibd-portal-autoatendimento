import React from "react";

export function MethodologySteps() {
  const steps = [
    {
      num: "01",
      title: "Briefing",
      headline: "Toda peça começa com uma conversa.",
      description:
        "Eu faço as perguntas, você responde do seu jeito, inclusive por áudio quando fizer sentido. Eu confirmo por escrito o que entendi, e você aprova antes da produção.",
    },
    {
      num: "02",
      title: "Material",
      headline: "Logo, fotos, textos, cores e tudo que entra no projeto.",
      description: "Se faltar alguma coisa, a gente identifica antes de começar.",
    },
    {
      num: "03",
      title: "Data Confirmada",
      headline: "Com briefing aprovado e material em mãos, eu confirmo a data.",
      description: "Antes disso, qualquer data é estimativa.",
    },
    {
      num: "04",
      title: "Entrega e Revisão",
      headline: "Você recebe a primeira versão.",
      description:
        "O projeto inclui 2 rodadas de revisão dentro do briefing aprovado. Mudança de direção ou item novo é novo escopo.",
    },
    {
      num: "05",
      title: "Entrega Final",
      headline: "Com o projeto aprovado e as condições concluídas, os arquivos finais são organizados e entregues.",
      description: "A próxima demanda pode começar pelo próprio portal.",
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
