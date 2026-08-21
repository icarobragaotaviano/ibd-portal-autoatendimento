export interface SiteConfig {
  name: string;
  studioName: string;
  tagline: string;
  role: string;
  bio: string;
  status: {
    available: boolean;
    label: string;
    subtext: string;
  };
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappUrl: string;
    defaultWhatsappMessage: string;
  };
  location: string;
}

export const siteConfig: SiteConfig = {
  name: "Ícaro Braga",
  studioName: "IBD — Ícaro Braga Designer",
  tagline: "Design que trabalha pelo seu negócio.",
  role: "Designer & Diretor Criativo",
  bio: "Design para marcas, produtos e negócios que precisam comunicar melhor.",
  status: {
    available: true,
    label: "Disponível para novos projetos",
    subtext: "Novos projetos • Solicitação online",
  },
  contact: {
    email: "contato@icarobraga.com",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5583999999999",
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/5583999999999",
    defaultWhatsappMessage: "Olá, Ícaro! Cheguei pelo seu site e queria tirar uma dúvida sobre um projeto.",
  },
  location: "Brasil",
};

export function getWhatsAppLink(customMessage?: string): string {
  const baseUrl = siteConfig.contact.whatsappUrl.replace(/\/$/, "");
  const message = customMessage || siteConfig.contact.defaultWhatsappMessage;
  
  if (baseUrl.includes("?")) {
    return `${baseUrl}&text=${encodeURIComponent(message)}`;
  }
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
