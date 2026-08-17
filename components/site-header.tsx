import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

export function SiteHeader() {
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
            <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Ícaro Braga Designer
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
              Client Portal 2026
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          className="flex items-center gap-1 sm:gap-2 text-sm font-display font-bold"
          aria-label="Navegação Principal"
        >
          <Link
            className="hidden md:inline-flex px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            href="/guia"
          >
            Manual & Guias
          </Link>

          <Link
            className="hidden sm:inline-flex px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            href="/agendar"
          >
            Agendar
          </Link>

          <Link
            className="px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            href="/login"
          >
            Entrar
          </Link>

          <Link href="/comecar">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Iniciar Projeto
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
