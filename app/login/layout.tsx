import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Entrar no Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col justify-between">
      <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
        <div className="container-shell flex min-h-[64px] items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao site público</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--accent)] text-black font-display font-black text-xs">
              IBD
            </span>
            <span className="font-display font-bold text-xs text-[var(--text-primary)]">
              Ícaro Braga Designer
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">{children}</main>

      <footer className="border-t border-[var(--border)] py-6 text-center text-xs font-mono text-[var(--text-muted)]">
        IBD Client Portal 2026 • Acesso Restrito a Clientes e Administração
      </footer>
    </div>
  );
}
