import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 mt-12">
      <div className="container-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <strong className="block mb-2">IBD — Portal do Cliente</strong>
          <p className="muted max-w-xl text-sm leading-6">Agendamento, solicitação e acompanhamento com orientações claras em cada etapa.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/guia">Guia do cliente</Link>
          <Link href="/status">Acompanhar</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/admin" className="opacity-60 hover:opacity-100 transition-opacity">Painel</Link>
        </div>
      </div>
    </footer>
  );
}
