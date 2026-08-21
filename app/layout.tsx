import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://icarobraga.com"),
  title: {
    default: "IBD — Ícaro Braga Designer | Estúdio Criativo & Portal do Cliente",
    template: "%s | IBD — Ícaro Braga Designer",
  },
  description:
    "Design que trabalha pelo seu negócio. Identidade visual, peças para redes sociais, landing pages e materiais com processos transparentes e acompanhamento direto.",
  openGraph: {
    title: "IBD — Ícaro Braga Designer",
    description: "Design que trabalha pelo seu negócio. Processo claro, prazos transparentes e contato direto com quem cria.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--background)] text-[var(--text-primary)] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
