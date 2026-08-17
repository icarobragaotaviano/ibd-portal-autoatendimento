import type { Metadata } from "next";
import { resolvePublicServiceSelection, getServiceOptions } from "@/data/services";
import { LeadFormWizard } from "@/components/lead-form-wizard";

export const metadata: Metadata = {
  title: "Iniciar Projeto • Solicitação Inicial",
  description:
    "Inicie seu projeto de design no IBD. Conte sobre sua necessidade e receba uma proposta estruturada com prazos transparentes.",
  openGraph: {
    title: "Iniciar Projeto | IBD — Ícaro Braga Designer",
    description: "Briefing guiado, prazos transparentes e atendimento direto com quem cria.",
  },
};

interface ComecarPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ComecarPage({ searchParams }: ComecarPageProps) {
  const { service: serviceParam } = await searchParams;
  const resolvedService = resolvePublicServiceSelection(serviceParam);
  const serviceOptions = getServiceOptions();

  return (
    <LeadFormWizard
      initialService={resolvedService?.slug ?? ""}
      initialServiceName={resolvedService?.name}
      serviceOptions={serviceOptions}
    />
  );
}
