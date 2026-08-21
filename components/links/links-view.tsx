"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Share2,
  Check,
  MessageCircle,
  Mail,
  Lock,
  Download,
  Sparkles,
  Layers,
  ExternalLink,
} from "lucide-react";
import { SiteConfig } from "@/data/site";
import { Service } from "@/data/services";
import { PortfolioCase } from "@/data/cases";
import { SocialLink } from "@/data/social-links";
import { trackPublicEvent } from "@/lib/analytics";

interface LinksViewProps {
  site: SiteConfig;
  services: Service[];
  cases: PortfolioCase[];
  socialLinks: SocialLink[];
  whatsappLink: string;
}

export function LinksView({
  site,
  services,
  cases,
  socialLinks,
  whatsappLink,
}: LinksViewProps) {
  const [copied, setCopied] = useState(false);

  // Manipulação de compartilhamento com Web Share API + fallback de clipboard
  const handleShare = async () => {
    trackPublicEvent("links_share_clicked");
    const shareData = {
      title: site.studioName,
      text: `${site.name} — ${site.role}. ${site.bio}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Usuário cancelou ou navegador não suportou, segue para o fallback
        if ((err as Error).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Falha silenciosa
    }
  };

  // Gerador dinâmico de cartão de contato VCF
  const handleDownloadVCard = () => {
    trackPublicEvent("links_vcf_downloaded");
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:Braga;Ícaro;;;`,
      `FN:${site.name}`,
      `ORG:${site.studioName}`,
      `TITLE:${site.role}`,
      `EMAIL;type=INTERNET;type=WORK:${site.contact.email}`,
      `TEL;type=CELL;type=VOICE;type=pref:${site.contact.whatsappNumber}`,
      `URL:${process.env.NEXT_PUBLIC_APP_URL || "https://icarobraga.com"}`,
      `NOTE:${site.bio}`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Icaro_Braga_IBD.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSocialIcon = (icon: SocialLink["icon"]) => {
    switch (icon) {
      case "instagram":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "behance":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.085 0-5.625-3-5.625-6.5 0-3.963 1.93-6.5 5.625-6.5 3.39 0 5.127 1.83 5.375 4.5h-3.082c-.172-.942-.871-1.8-2.293-1.8-1.879 0-2.457 1.637-2.457 3.8h7.828c.068.78.026 2.41-.27 3.5zm-5.088-4.25c-.07-1.129-.652-2.15-2.138-2.15-1.398 0-2.091.95-2.264 2.15h4.402zm-12.638 7.25h-6v-16h6.5c3.037 0 4.5 1.547 4.5 4.088 0 1.579-.769 2.766-2.115 3.412 1.722.564 2.615 2.112 2.615 3.965 0 2.92-2.015 4.535-5.5 4.535zm-3-13.5v4.5h3c1.458 0 2-.72 2-2.25 0-1.448-.564-2.25-2-2.25h-3zm0 7v4.5h3.25c1.472 0 2.25-.806 2.25-2.25 0-1.49-.806-2.25-2.25-2.25h-3.25z" />
          </svg>
        );
      case "mail":
        return <Mail className="w-4 h-4" />;
      case "whatsapp":
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8">
      {/* Top Header Bar: Marca + Botão Compartilhar */}
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="Ir para a página inicial"
        >
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[var(--accent)] text-[11px] font-display font-black text-[#050505] tracking-tighter group-hover:bg-[var(--accent-hover)] transition-colors">
            IBD
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase group-hover:text-[var(--text-primary)] transition-colors">
            Estúdio Criativo
          </span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label="Compartilhar perfil"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              <span className="text-[var(--success)]">Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Compartilhar</span>
            </>
          )}
        </button>
      </header>

      {/* 1. Profile Hero Section */}
      <section className="flex flex-col items-center text-center gap-4 pt-2">
        {/* Monograma / Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[var(--surface-strong)] border-2 border-[var(--border-hover)] flex items-center justify-center shadow-xl relative overflow-hidden group">
            <span className="font-display text-2xl font-black text-[var(--accent)] tracking-tighter">
              IBD
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Títulos e Bio */}
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {site.name}
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            {site.role}
          </p>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1 leading-relaxed">
            {site.bio}
          </p>
        </div>

        {/* Status de Disponibilidade */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]" />
          </span>
          <span>{site.status.label}</span>
        </div>
      </section>

      {/* 2. CTA Primário Dourado (Ação Comercial Oficial) */}
      <section>
        <Link
          href="/comecar"
          onClick={() => trackPublicEvent("links_start_project_clicked")}
          className="group relative block w-full p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#e6be00] text-[#050505] shadow-[0_0_30px_rgba(255,212,0,0.15)] hover:shadow-[0_0_40px_rgba(255,212,0,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-left overflow-hidden"
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-[#050505]/80">
                <Sparkles className="w-3.5 h-3.5 fill-[#050505]" />
                Início Oficial
              </span>
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#050505] leading-tight">
                Começar um projeto
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#050505]/80">
                Conte o que você precisa em poucos minutos.
              </span>
            </div>

            <div className="h-10 w-10 rounded-full bg-[#050505] text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        </Link>
      </section>

      {/* 3. Projetos Selecionados (Portfólio com Prova Real) */}
      {cases.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="eyebrow">Projetos Selecionados</h2>
            <Link
              href="/portfolio"
              onClick={() => trackPublicEvent("links_portfolio_clicked")}
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/portfolio/${c.slug}`}
                onClick={() =>
                  trackPublicEvent("links_case_clicked", { case_slug: c.slug })
                }
                className="group relative flex items-center gap-4 p-3.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[var(--surface-strong)] shrink-0 border border-[var(--border)]">
                  {c.cover ? (
                    <Image
                      src={c.cover}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">
                      IBD
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col flex-1 min-w-0 pr-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] truncate">
                    {c.client}
                  </span>
                  <h3 className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                    {c.services.join(" • ")}
                  </p>
                </div>

                <div className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. Como Posso Ajudar (Serviços Dinâmicos com Atalhos Reais) */}
      <section className="flex flex-col gap-3">
        <h2 className="eyebrow px-1">Como Posso Ajudar</h2>

        <div className="grid grid-cols-1 gap-2.5">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/comecar?service=${s.slug}`}
              onClick={() =>
                trackPublicEvent("links_service_clicked", { service_slug: s.slug })
              }
              className="group flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
            >
              <div className="flex flex-col gap-0.5 pr-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {s.name}
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                  {s.shortPromise}
                </p>
              </div>

              <div className="h-8 w-8 rounded-lg bg-[var(--surface-elevated)] group-hover:bg-[var(--accent)] text-[var(--text-muted)] group-hover:text-[#050505] flex items-center justify-center shrink-0 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Como Eu Trabalho (Metodologia & Transparência) */}
      <section>
        <Link
          href="/como-eu-trabalho"
          onClick={() => trackPublicEvent("links_how_it_works_clicked")}
          className="group flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-9 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent)] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                Como eu trabalho
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Processo claro, transparência e etapas sem surpresas.
              </span>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
        </Link>
      </section>

      {/* 6. Contato Direto & WhatsApp Secundário */}
      <section className="flex flex-col gap-3">
        <h2 className="eyebrow px-1">Contato & Canais</h2>

        {/* WhatsApp Secundário (Dúvidas Rápidas) */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPublicEvent("links_whatsapp_clicked")}
          className="group flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[#25D366] transition-colors">
                Tenho uma dúvida
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Fale diretamente comigo pelo WhatsApp
              </span>
            </div>
          </div>

          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
        </a>

        {/* Redes Sociais */}
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackPublicEvent("links_social_clicked", { platform: social.id })
              }
              className="flex items-center gap-2.5 p-3 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all truncate"
            >
              <span className="text-[var(--text-muted)]">
                {getSocialIcon(social.icon)}
              </span>
              <span className="font-mono truncate">{social.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 7. Área do Cliente (Acesso Secundário) */}
      <section className="pt-2">
        <Link
          href="/login"
          onClick={() => trackPublicEvent("links_portal_clicked")}
          className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[var(--surface)]/50 hover:bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Já é cliente? Acessar Portal do Cliente →</span>
        </Link>
      </section>

      {/* 8. Recurso Secundário: Salvar Contato no Celular */}
      <section className="flex justify-center">
        <button
          type="button"
          onClick={handleDownloadVCard}
          className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer py-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Salvar contato no smartphone (.vcf)</span>
        </button>
      </section>

      {/* Footer Minimalista */}
      <footer className="flex flex-col items-center gap-2 pt-6 border-t border-[var(--border)] text-center">
        <p className="text-[11px] font-mono text-[var(--text-muted)]">
          © {new Date().getFullYear()} {site.studioName}
        </p>
        <p className="text-[10px] text-[var(--text-muted)]/60">
          {site.tagline}
        </p>
      </footer>
    </div>
  );
}
