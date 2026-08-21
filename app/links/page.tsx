import { Metadata } from "next";
import { siteConfig, getWhatsAppLink } from "@/data/site";
import { getServices } from "@/data/services";
import { getPublishedCases } from "@/data/cases";
import { socialLinks } from "@/data/social-links";
import { LinksView } from "@/components/links/links-view";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Links & Projetos | ${siteConfig.studioName}`,
  description: siteConfig.bio,
  robots: {
    index: false,
    follow: true,
  },
};

export default function LinksPage() {
  // Consumir fontes canônicas de dados do projeto
  const allServices = getServices();
  const selectedCases = getPublishedCases().slice(0, 2);
  const whatsappLink = getWhatsAppLink();

  return (
    <LinksView
      site={siteConfig}
      services={allServices}
      cases={selectedCases}
      socialLinks={socialLinks}
      whatsappLink={whatsappLink}
    />
  );
}
