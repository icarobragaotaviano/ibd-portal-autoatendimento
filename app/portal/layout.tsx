import React from "react";
import Link from "next/link";
import { FolderKanban, PlusCircle, LogOut } from "lucide-react";

export const metadata = {
  title: "Portal do Cliente",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col">
      {/* Portal Dedicated Shell Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container-shell flex min-h-[64px] items-center justify-between gap-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="flex items-center gap-2.5 group focus-visible:outline-none"
            >
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[var(--accent)] text-black font-display font-black text-xs">
                IBD
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)]">
                  Portal do Cliente
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider uppercase">
                  Acompanhamento de Projetos
                </span>
              </div>
            </Link>

            <nav className="hidden sm:flex items-center gap-1 ml-6 text-xs font-mono">
              <Link
                href="/portal"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Próxima Ação
              </Link>
              <Link
                href="/portal/projetos"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Meus Projetos
              </Link>
              <Link
                href="/guia"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Manual & Guias
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal/solicitar"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] hover:border-amber-500/50 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nova Solicitação</span>
            </Link>

            <Link
              href="/login"
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-[var(--surface)] transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Portal Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
