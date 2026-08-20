"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function MvpHero() {
  function scrollToElement(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[var(--border)] bg-[var(--background)]">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />

      <Container size="lg">
        <div className="flex flex-col items-start gap-8 max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
              IBD — Ícaro Braga Designer • Estúdio Solo
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
            Design que trabalha pelo seu negócio.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans">
            Processo direto, transparente e focado em resultados. Me conte o que você precisa e eu
            organizo os próximos passos com você.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToElement("solicitar")}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="font-bold uppercase tracking-wider"
            >
              COMEÇAR UM PROJETO
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToElement("servicos")}
              rightIcon={<ArrowDown className="w-4 h-4" />}
              className="font-bold uppercase tracking-wider text-xs"
            >
              VER SERVIÇOS
            </Button>
          </div>

          {/* Microcopy & Guarantees */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-[var(--text-muted)] font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Você não precisa chegar com tudo pronto.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Atendimento direto com quem cria.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
