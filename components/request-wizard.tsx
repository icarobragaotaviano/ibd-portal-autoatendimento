"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/content/services";
import { OrientationCard } from "@/components/orientation-card";

const steps = ["Demanda", "Materiais", "Contato"];

export function RequestWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    service: "social_media",
    description: "",
    desiredDate: "",
    hasMaterial: false,
    materialNotes: "",
    wantsContent: false,
    urgency: "normal",
    clientName: "",
    clientEmail: "",
    clientWhatsapp: "",
    consent: false,
  });

  function next() { setError(""); setStep((s) => Math.min(s + 1, steps.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function back() { setError(""); setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, urgency: form.urgency, consent: form.consent }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao registrar solicitação.");
      router.push(`/confirmacao?tipo=solicitacao&protocolo=${encodeURIComponent(data.request.id)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao registrar solicitação.");
    } finally { setSubmitting(false); }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_.42fr]">
      <div className="card p-6 md:p-8">
        <div className="flex gap-2 mb-8" aria-label={`Etapa ${step + 1} de ${steps.length}`}>
          {steps.map((label, index) => <div key={label} className={`h-2 flex-1 rounded-full ${index <= step ? "bg-[#20372f]" : "bg-black/10"}`} />)}
        </div>
        <div className="eyebrow">Etapa {step + 1} · {steps[step]}</div>

        {step === 0 && <div className="grid gap-5 mt-6">
          <div className="field"><label htmlFor="service">Qual é o serviço?</label><select id="service" className="input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>{services.filter(s => s.value !== "conversa_inicial").map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
          <div className="field"><label htmlFor="description">O que você precisa e qual é o objetivo?</label><textarea id="description" className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ex.: preciso de 5 peças para divulgar um evento e quero destacar inscrições." required /><small>Não precisa escrever um briefing completo. Esta é a primeira leitura da demanda.</small></div>
          <div className="field"><label htmlFor="desiredDate">Para quando você gostaria?</label><input id="desiredDate" className="input" type="date" value={form.desiredDate} onChange={(e) => setForm({ ...form, desiredDate: e.target.value })} /><small>Esta data é uma referência, não um prazo confirmado.</small></div>
        </div>}

        {step === 1 && <div className="grid gap-6 mt-6">
          <fieldset className="field"><legend className="label">Você já tem os materiais?</legend><div className="flex flex-wrap gap-3"><label className="pill"><input type="radio" name="hasMaterial" checked={form.hasMaterial} onChange={() => setForm({ ...form, hasMaterial: true })} /> Sim</label><label className="pill"><input type="radio" name="hasMaterial" checked={!form.hasMaterial} onChange={() => setForm({ ...form, hasMaterial: false })} /> Ainda não / parcialmente</label></div></fieldset>
          <div className="field"><label htmlFor="materialNotes">Quais materiais você já tem ou ainda faltam?</label><textarea id="materialNotes" className="input" value={form.materialNotes} onChange={(e) => setForm({ ...form, materialNotes: e.target.value })} placeholder="Logo, fotos, textos, identidade visual, links…" /></div>
          <fieldset className="field"><legend className="label">Quer que o conteúdo/texto seja criado também?</legend><div className="flex gap-3"><label className="pill"><input type="radio" name="content" checked={form.wantsContent} onChange={() => setForm({ ...form, wantsContent: true })} /> Sim</label><label className="pill"><input type="radio" name="content" checked={!form.wantsContent} onChange={() => setForm({ ...form, wantsContent: false })} /> Não</label></div></fieldset>
          <fieldset className="field"><legend className="label">Nível de urgência informado</legend><div className="flex gap-3"><label className="pill"><input type="radio" name="urgency" checked={form.urgency === "normal"} onChange={() => setForm({ ...form, urgency: "normal" })} /> Normal</label><label className="pill"><input type="radio" name="urgency" checked={form.urgency === "urgente"} onChange={() => setForm({ ...form, urgency: "urgente" })} /> Urgente</label></div></fieldset>
        </div>}

        {step === 2 && <div className="grid gap-5 mt-6">
          <div className="field"><label htmlFor="clientName">Nome</label><input id="clientName" className="input" autoComplete="name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required /></div>
          <div className="grid sm:grid-cols-2 gap-4"><div className="field"><label htmlFor="clientEmail">E-mail</label><input id="clientEmail" className="input" type="email" autoComplete="email" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} required /></div><div className="field"><label htmlFor="clientWhatsapp">WhatsApp</label><input id="clientWhatsapp" className="input" autoComplete="tel" value={form.clientWhatsapp} onChange={(e) => setForm({ ...form, clientWhatsapp: e.target.value })} required /></div></div>
          <label className="flex gap-3 items-start text-sm leading-6"><input className="mt-1" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /><span>Concordo com o uso destes dados para receber, organizar e acompanhar esta solicitação. <a className="underline" href="/privacidade">Ver privacidade</a>.</span></label>
          {error && <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</div>}
        </div>}

        <div className="flex justify-between gap-3 mt-8">
          {step > 0 ? <button type="button" className="btn-secondary" onClick={back}>Voltar</button> : <span />}
          {step < steps.length - 1 ? <button type="button" className="btn-primary" onClick={next}>Continuar</button> : <button type="submit" className="btn-primary" disabled={submitting || !form.consent}>{submitting ? "Enviando…" : "Enviar solicitação"}</button>}
        </div>
      </div>

      <div className="grid gap-4 self-start lg:sticky lg:top-24">
        {step === 0 && <OrientationCard title="Primeiro contato">Me conta o que você precisa. Pode ser direto: tipo de peça, objetivo e prazo desejado.</OrientationCard>}
        {step === 1 && <OrientationCard title="Prazo começa com material em mãos">Você pode enviar os materiais agora ou depois. A produção só entra na agenda quando o briefing estiver aprovado e os materiais necessários tiverem chegado.</OrientationCard>}
        {step === 2 && <OrientationCard title="O que acontece depois">A solicitação será registrada como “novo”. O próximo passo é organizar o briefing e confirmar o escopo. Você receberá um protocolo para acompanhar o status.</OrientationCard>}
        <div className="card p-5 text-sm leading-6"><strong className="block mb-2">2 rodadas de revisão</strong><span className="muted">Ajustes dentro do briefing estão incluídos. Mudança de direção ou item novo é tratado separadamente.</span></div>
      </div>
    </form>
  );
}
