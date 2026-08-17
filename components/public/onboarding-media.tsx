"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "./media-placeholder";

export type OnboardingMediaProps = {
  type?: "video" | "audio";
  src?: string;
  poster?: string;
  transcript?: string;
};

const DEFAULT_TRANSCRIPT = `Oi, eu sou o Ícaro, do IBD.

Antes de falar de preço ou prazo, deixa eu te mostrar como a gente trabalha.

Todo projeto começa com um briefing. Eu te faço poucas perguntas, uma rodada de cada vez, até entender o que você precisa de verdade.

Quando o briefing está aprovado e o material chega, eu te dou uma data. Essa data é um compromisso meu com você.

Depois do contrato, você acompanha tudo em um portal: status do projeto, materiais, revisões e próximos passos.

Se fez sentido, escolhe um serviço na galeria ou começa o briefing agora.`;

export function OnboardingMedia({
  type = "video",
  src,
  poster,
  transcript = DEFAULT_TRANSCRIPT,
}: OnboardingMediaProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <Section spacing="md" className="border-y border-[var(--border)] bg-[var(--surface)]">
      <Container size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Left Column: Context & Transcript toggle */}
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Apresentação • Onboarding</span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Antes de começar
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Veja em menos de 2 minutos como funciona o método de trabalho, prazos transparentes e acompanhamento direto pelo portal.
            </p>

            {/* Transcript Toggle Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent)] hover:underline focus-visible:outline-none"
              >
                <FileText className="w-4 h-4" />
                <span>{showTranscript ? "Ocultar transcrição do vídeo" : "Ver transcrição completa do vídeo"}</span>
                {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showTranscript && (
                <div className="mt-4 p-5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                  {transcript}
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link href="/comecar">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Iniciar Meu Briefing
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Media or Placeholder */}
          <div className="flex flex-col items-center">
            {src ? (
              <video
                src={src}
                poster={poster}
                controls
                className="w-full aspect-video rounded-[var(--radius-lg)] border border-[var(--border)] bg-[#050505]"
              />
            ) : (
              <MediaPlaceholder
                label="TODO_VIDEO_ONBOARDING"
                type={type}
                aspectRatio="video"
                hint="Vídeo de Apresentação — Conteúdo em preparação. Enquanto isso, veja como funciona o processo."
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
