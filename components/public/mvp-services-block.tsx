"use client";

import React from "react";
import { ArrowUpRight, Palette, Share2, Layout, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { services } from "@/data/services";

interface MvpServicesBlockProps {
  onSelectService?: (serviceSlug: string) => void;
}

const MVP_SERVICES_DATA = [
  {
    slug: "identidade-visual",
    name: "Identidade Visual",
    description:
      "Marcas e sistemas visuais construídos para comunicar com clareza, autoridade e consistência.",
    deliverables: ["Logotipo e variações", "Manual de identidade", "Paleta de cores e tipografia"],
    icon: Palette,
  },
  {
    slug: "social-media",
    name: "Social Media",
    description:
      "Peças e sistemas de conteúdo visual para presença digital consistente e engajamento qualificado.",
    deliverables: ["Templates editáveis", "Capas e stories estratégicos", "Diretrizes visuais"],
    icon: Share2,
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    description:
      "Páginas de apresentação, lançamento e conversão com estratégia visual e hierarquia de informação.",
    deliverables: ["Wireframe estratégico", "Design UI desktop & mobile", "Assets prontos para dev"],
    icon: Layout,
  },
  {
    slug: "editorial",
    name: "Editorial",
    description:
      "E-books, apresentações corporativas, catálogos e materiais digitais estruturados com rigor estético.",
    deliverables: ["Diagramação editorial", "Infográficos e tabelas", "Fechamento digital e print"],
    icon: BookOpen,
  },
];

export function MvpServicesBlock({ onSelectService }: MvpServicesBlockProps) {
  function handleServiceClick(slug: string) {
    if (onSelectService) {
      onSelectService(slug);
    }
    const formElement = document.getElementById("solicitar");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const selectElement = document.getElementById("lead-service") as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = slug;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }

  return (
    <Section id="servicos" spacing="lg" className="border-t border-[var(--border)] bg-[var(--surface)]">
      <Container size="lg">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="eyebrow">O que posso criar para você</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Serviços de design focados em valor real
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Soluções sob medida para marcas, produtos digitais e comunicação institucional,
              sempre com metodologia clara e execução direta.
            </p>
          </div>

          {/* Grid 2x2 on desktop, 1 col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MVP_SERVICES_DATA.map((item) => {
              const Icon = item.icon;
              const originalService = services.find((s) => s.slug === item.slug);

              return (
                <div
                  key={item.slug}
                  className="surface-card p-6 sm:p-8 flex flex-col justify-between gap-6 group hover:border-[var(--border-hover)] transition-all duration-200"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent)] group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
                        {originalService?.pricing.mode === "starting_at"
                          ? "Sob consulta"
                          : "Sob medida"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <ul className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border)]">
                      {item.deliverables.map((deliv) => (
                        <li
                          key={deliv}
                          className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                        >
                          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleServiceClick(item.slug)}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-[var(--border)] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group/btn cursor-pointer"
                  >
                    <span>SOLICITAR ESTE SERVIÇO</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover/btn:text-[var(--accent)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
