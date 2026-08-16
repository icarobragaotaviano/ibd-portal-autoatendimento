"use client";

import { useState } from "react";

type StatusResult = { id: string; service: string; status: string; statusLabel: string; message: string; desiredDate: string | null; confirmedDueDate: string | null; revisionsUsed: number; createdAt: string; updatedAt: string };

export function StatusLookup() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha na consulta.");
      setResult(data);
    } catch (e) { setError(e instanceof Error ? e.message : "Falha na consulta."); }
    finally { setLoading(false); }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
      <form onSubmit={submit} className="card p-6 grid gap-5 self-start">
        <div className="field"><label htmlFor="protocol">Protocolo</label><input id="protocol" className="input uppercase" placeholder="IBD-XXXXXXXX" value={id} onChange={(e) => setId(e.target.value)} required /></div>
        <div className="field"><label htmlFor="statusEmail">E-mail usado na solicitação</label><input id="statusEmail" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <button className="btn-primary" disabled={loading}>{loading ? "Consultando…" : "Consultar status"}</button>
        <p className="text-xs muted leading-5">Modo mock para teste: protocolo <strong>IBD-DEMO01</strong> e e-mail <strong>cliente@exemplo.com</strong>.</p>
        {error && <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</div>}
      </form>

      <div className="card p-6 md:p-8 min-h-80 text-white" aria-live="polite">
        {!result ? (
          <div className="h-full grid place-content-center text-center text-muted">
            <div>
              <div className="mx-auto status-dot mb-5" />
              <strong className="text-white block mb-2">Acompanhamento protegido</strong>
              <span className="text-sm">Informe protocolo + e-mail para visualizar o estado da solicitação.</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <div className="eyebrow font-mono">{result.id}</div>
                <h2 className="display text-4xl mt-2">{result.statusLabel}</h2>
              </div>
              <span className="pill self-start">{result.service}</span>
            </div>
            <p className="text-lg leading-8 mt-6 text-text-secondary">{result.message}</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              <div className="rounded-2xl bg-[#1c1c1c] border border-white/10 p-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">Prazo desejado</span>
                <strong className="block mt-2">{result.desiredDate || "—"}</strong>
              </div>
              <div
                className={`rounded-2xl border p-4 ${
                  result.confirmedDueDate
                    ? "bg-[#ffd400]/10 border-[#ffd400]"
                    : "bg-[#1c1c1c] border-white/10"
                }`}
              >
                <span className="text-xs font-black uppercase tracking-wider text-muted">Prazo confirmado</span>
                <strong className={`block mt-2 ${result.confirmedDueDate ? "text-[#ffd400] text-lg" : ""}`}>
                  {result.confirmedDueDate || "Ainda não"}
                </strong>
              </div>
              <div className="rounded-2xl bg-[#1c1c1c] border border-white/10 p-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted">Revisões usadas</span>
                <strong className="block mt-2">{result.revisionsUsed} de 2</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
