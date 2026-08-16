import Link from "next/link";

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const type = params.tipo === "agendamento" ? "agendamento" : "solicitacao";
  const protocol = typeof params.protocolo === "string" ? params.protocolo : "";
  const start = typeof params.inicio === "string" ? params.inicio : "";
  const meet = typeof params.meet === "string" ? params.meet : "";
  const event = typeof params.evento === "string" ? params.evento : "";
  return (
    <section className="section"><div className="container-shell max-w-3xl"><div className="card p-7 md:p-10"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#20372f] text-white text-2xl">✓</div><div className="eyebrow mt-8">Recebido com sucesso</div><h1 className="display text-5xl md:text-6xl mt-3">{type === "agendamento" ? "Conversa confirmada." : "Solicitação registrada."}</h1>{protocol && <div className="rounded-2xl bg-[#ebe5d9] p-5 mt-7"><span className="text-xs font-black uppercase tracking-wider muted">Protocolo</span><strong className="block text-2xl mt-1">{protocol}</strong></div>}{type === "agendamento" ? <div className="mt-7 grid gap-3"><p className="leading-7">O convite do Google Calendar é a referência do encontro. Use a conversa para alinhar a necessidade; o prazo final de produção não é confirmado nesta etapa.</p>{start && <p className="muted text-sm">Início registrado: {start}</p>}<div className="flex flex-wrap gap-3">{meet && <a className="btn-primary" href={meet} target="_blank" rel="noreferrer">Abrir Google Meet</a>}{event && <a className="btn-secondary" href={event} target="_blank" rel="noreferrer">Ver evento</a>}<Link className="btn-secondary" href="/guia/manual">Ler manual do cliente</Link></div></div> : <div className="mt-7"><p className="leading-7">Próximo passo: organizar o briefing e confirmar o escopo. Guarde seu protocolo e consulte o status usando o mesmo e-mail informado no envio.</p><div className="flex flex-wrap gap-3 mt-6"><Link className="btn-primary" href="/status">Acompanhar solicitação</Link><Link className="btn-secondary" href="/guia/manual">Entender o processo</Link></div></div>}</div></div></section>
  );
}
