import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12 mt-20 bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="container-shell flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <strong className="font-display text-sm tracking-tight text-[var(--text-primary)]">
              IBD — Ícaro Braga Designer 2026
            </strong>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Portal de relacionamento, atendimento e execução de projetos. Processo guiado, regras transparentes e próxima ação sempre visível.
          </p>
          <span className="font-mono text-[11px] text-[var(--text-muted)] mt-2">
            Fuso Operacional: America/Fortaleza (UTC-3)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          <Link
            href="/guia"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Manual do Cliente
          </Link>
          <Link
            href="/agendar"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Agendar Conversa
          </Link>
          <Link
            href="/privacidade"
            className="hover:text-[var(--accent)] transition-colors"
          >
            LGPD & Privacidade
          </Link>
          <Link
            href="/admin"
            className="opacity-40 hover:opacity-100 hover:text-[var(--accent)] transition-opacity"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
