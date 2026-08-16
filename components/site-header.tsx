import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl sticky top-0 z-50 text-white">
      <div className="container-shell flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="IBD — início">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffd400] text-sm font-black text-black">IBD</span>
          <span className="hidden sm:block">
            <strong className="block text-sm">Portal do Cliente</strong>
            <span className="text-xs text-muted">Processo claro. Próximo passo visível.</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold" aria-label="Principal">
          <Link className="btn-ghost !min-h-10 !px-3" href="/guia">Guias</Link>
          <Link className="btn-ghost !min-h-10 !px-3" href="/status">Status</Link>
          <Link className="btn-primary !min-h-10 !px-4" href="/agendar">Agendar</Link>
        </nav>
      </div>
    </header>
  );
}
