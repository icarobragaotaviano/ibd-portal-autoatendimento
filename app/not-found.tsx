import Link from "next/link";

export default function NotFound() {
  return <section className="section"><div className="container-shell max-w-2xl text-center"><div className="eyebrow">404</div><h1 className="display text-6xl mt-4">Página não encontrada.</h1><p className="muted mt-5">O caminho pode ter mudado ou o conteúdo não existe.</p><Link className="btn-primary mt-8" href="/">Voltar ao início</Link></div></section>;
}
