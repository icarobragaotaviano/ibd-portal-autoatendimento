"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/servicos", label: "Serviços" },
    { href: "/portfolio", label: "Portfólio" },
    { href: "/como-eu-trabalho", label: "Como eu trabalho" },
    { href: "/quem-sou", label: "Quem faz o IBD" },
  ];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md sticky top-0 z-40 text-[var(--text-primary)]">
      <div className="container-shell flex min-h-[72px] items-center justify-between gap-4 py-3">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="IBD — Ícaro Braga Designer"
        >
          <span className="flex items-center justify-center h-9 w-9 rounded-full bg-[var(--accent)] text-xs font-display font-black text-[#050505] tracking-tighter group-hover:bg-[var(--accent-hover)] transition-colors">
            IBD
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
              Ícaro Braga Designer
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
              Estúdio Criativo
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-display font-bold"
          aria-label="Navegação Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions (Area do Cliente + CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Área do cliente</span>
          </Link>

          <Link href="/comecar">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              COMEÇAR UM PROJETO
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] focus-visible:outline-none"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--background)] px-6 py-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Área do cliente (Portal)</span>
            </Link>

            <Link href="/comecar" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                COMEÇAR UM PROJETO
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
