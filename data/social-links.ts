export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: "instagram" | "linkedin" | "behance" | "mail" | "whatsapp" | "globe";
  highlight?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/icarobraga.design",
    handle: "@icarobraga.design",
    icon: "instagram",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/icarobraga",
    handle: "Ícaro Braga",
    icon: "linkedin",
  },
  {
    id: "behance",
    name: "Behance",
    url: process.env.NEXT_PUBLIC_BEHANCE_URL || "https://behance.net/icarobraga",
    handle: "icarobraga",
    icon: "behance",
  },
  {
    id: "email",
    name: "E-mail Direto",
    url: "mailto:contato@icarobraga.com",
    handle: "contato@icarobraga.com",
    icon: "mail",
  },
];
