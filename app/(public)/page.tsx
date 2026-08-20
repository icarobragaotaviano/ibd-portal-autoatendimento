import type { Metadata } from "next";
import { MvpHero } from "@/components/public/mvp-hero";
import { MvpServicesBlock } from "@/components/public/mvp-services-block";
import { MvpHowItWorks } from "@/components/public/mvp-how-it-works";
import { MvpLeadForm } from "@/components/public/mvp-lead-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "IBD — Ícaro Braga Designer | Design que trabalha pelo seu negócio",
  description:
    "Design estratégico para marcas, conteúdos, páginas e projetos editoriais. Conte seu projeto e receba uma orientação inicial.",
  openGraph: {
    title: "IBD — Ícaro Braga Designer",
    description:
      "Design que trabalha pelo seu negócio. Processo direto, sem intermediários e prazos transparentes.",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <MvpHero />

      {/* 2. Serviços / O que posso criar */}
      <MvpServicesBlock />

      {/* 3. Como funciona */}
      <MvpHowItWorks />

      {/* 4. Formulário Principal de Solicitação */}
      <Section spacing="xl" className="border-t border-[var(--border)] bg-[var(--background)]">
        <Container size="md">
          <MvpLeadForm />
        </Container>
      </Section>
    </div>
  );
}
