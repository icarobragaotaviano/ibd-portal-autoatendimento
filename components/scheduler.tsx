"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/content/services";
import { OrientationCard } from "@/components/orientation-card";
import type { AvailableSlot } from "@/lib/types";

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function Scheduler() {
  const router = useRouter();
  const [service, setService] = useState("conversa_inicial");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [selected, setSelected] = useState<AvailableSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", notes: "", consent: false });
  const canSubmit = useMemo(() => selected && form.name && form.email && form.whatsapp && form.notes && form.consent, [selected, form]);

  async function loadSlots(nextDate: string) {
    setDate(nextDate);
    setSelected(null);
    setSlots([]);
    setError("");
    if (!nextDate) return;
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(nextDate)}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao consultar agenda.");
      setSlots(data.slots || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao consultar agenda.");
    } finally {
      setLoadingSlots(false);
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected || !canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, start: selected.start, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao agendar.");
      const params = new URLSearchParams({
        tipo: "agendamento",
        protocolo: data.booking.id,
        inicio: data.slot.start,
      });
      if (data.booking.meetLink) params.set("meet", data.booking.meetLink);
      if (data.booking.eventLink) params.set("evento", data.booking.eventLink);
      router.push(`/confirmacao?${params.toString()}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao agendar.");
      if (date) await loadSlots(date);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="grid gap-5 self-start">
        <div className="card p-6 grid gap-5">
          <div className="eyebrow">1. Escolha o encontro</div>
          <div className="field">
            <label htmlFor="service">Assunto</label>
            <select id="service" className="input" value={service} onChange={(e) => setService(e.target.value)}>
              {services.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="date">Data</label>
            <input id="date" className="input" type="date" min={todayISO()} value={date} onChange={(e) => loadSlots(e.target.value)} />
            <small>Segunda a sexta, 09h–18h. O sistema só libera horários com pelo menos 24h de antecedência.</small>
          </div>
          <div>
            <div className="label font-extrabold text-sm mb-2">Horários disponíveis</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" aria-live="polite">
              {loadingSlots && <span className="muted text-sm col-span-full">Consultando agenda…</span>}
              {!loadingSlots && date && slots.length === 0 && <span className="muted text-sm col-span-full">Nenhum horário livre para esta data.</span>}
              {slots.map((slot) => (
                <button key={slot.start} type="button" onClick={() => setSelected(slot)} className={`min-h-11 rounded-xl border px-3 font-bold ${selected?.start === slot.start ? "bg-[#20372f] border-[#20372f] text-white" : "bg-white border-black/15"}`} aria-pressed={selected?.start === slot.start}>{slot.label}</button>
              ))}
            </div>
          </div>
        </div>
        <OrientationCard title="Este encontro não confirma o prazo final">
          A conversa serve para entender a necessidade. O prazo de produção só é confirmado depois que o briefing estiver aprovado e os materiais necessários forem recebidos.
        </OrientationCard>
      </div>

      <div className="card p-6 md:p-8 grid gap-5">
        <div className="eyebrow">2. Seus dados</div>
        {selected ? (
          <div className="rounded-2xl bg-[#ebe5d9] p-4 text-sm"><strong>{selected.dateLabel}</strong><br />Horário escolhido: {selected.label} · duração de 50 min</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/20 p-4 muted text-sm">Escolha uma data e um horário para continuar.</div>
        )}
        <div className="field"><label htmlFor="name">Nome</label><input id="name" className="input" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="field"><label htmlFor="email">E-mail</label><input id="email" className="input" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="field"><label htmlFor="whatsapp">WhatsApp</label><input id="whatsapp" className="input" autoComplete="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} required /></div>
        </div>
        <div className="field"><label htmlFor="notes">O que você precisa conversar?</label><textarea id="notes" className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Pode ser direto: objetivo, tipo de peça ou contexto." required /></div>
        <label className="flex gap-3 items-start text-sm leading-6"><input className="mt-1" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /><span>Concordo com o uso destes dados para realizar o agendamento e organizar o atendimento. <a className="underline" href="/privacidade">Ver privacidade</a>.</span></label>
        {error && <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</div>}
        <button className="btn-primary w-full" disabled={!canSubmit || submitting}>{submitting ? "Confirmando…" : "Confirmar agendamento"}</button>
      </div>
    </form>
  );
}
