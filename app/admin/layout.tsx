import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const metadata = {
  title: "Admin Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col">
      {/* Admin Dedicated Shell Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container-shell flex min-h-[64px] items-center justify-between gap-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group focus-visible:outline-none"
            >
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500 text-black font-display font-black text-xs">
                ADM
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)]">
                  IBD Admin Studio
                </span>
                <span className="font-mono text-[9px] text-[var(--accent)] tracking-wider uppercase">
                  Painel de Controle
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6 text-xs font-mono">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Visão Geral
              </Link>
              <Link
                href="/admin/prospects"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Prospects & Funil
              </Link>
              <Link
                href="/admin/clients"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Clientes Ativos
              </Link>
              <Link
                href="/admin/projects"
                className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                Projetos & Prazos
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2.5 py-1 rounded border border-[var(--border)]"
            >
              Ver Site Público ↗
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

      {/* Admin Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
