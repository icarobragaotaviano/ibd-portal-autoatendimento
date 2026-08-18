import Link from "next/link";
import { Clock } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="container-shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-[var(--border)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[var(--accent)] text-xs font-display font-black text-[#050505] tracking-tighter">IBD</span>
              <span className="font-display font-bold text-base tracking-tight text-[var(--text-primary)]">Ícaro Braga Designer</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Design que trabalha pelo seu negócio. Estúdio solo com atendimento direto, processos transparentes e compromisso com o resultado.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Navegação</span>
            <div className="flex flex-col gap-2 text-xs font-mono">
              <Link href="/servicos" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Serviços de Design</Link>
              <Link href="/portfolio" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Cases de Portfólio</Link>
              <Link href="/como-eu-trabalho" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Metodologia IBD</Link>
              <Link href="/quem-sou" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Quem faz o IBD</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Diretrizes & Processo</span>
            <div className="flex flex-col gap-2 text-xs font-mono">
              <Link href="/como-trabalhamos" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Como trabalhamos juntos</Link>
              <Link href="/guia" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Manual & Central de Guias</Link>
              <Link href="/comecar" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Começar um projeto</Link>
              <Link href="/login" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Acessar Portal do Cliente</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Atendimento</span>
            <div className="flex flex-col gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>Segunda a sexta-feira<br />das 09:00 às 18:00 (Fortaleza)</span>
              </div>
              <div className="pt-2">
                <Link href="/comecar" className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[var(--accent)] hover:underline">
                  Começar briefing de projeto →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} IBD — Ícaro Braga Designer. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="hover:text-[var(--text-primary)] transition-colors">Privacidade & Termos</Link>
            <Link href="/guia/manual" className="hover:text-[var(--text-primary)] transition-colors">Manual do Cliente</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
