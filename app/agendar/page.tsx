import type { Metadata } from "next";
import { Scheduler } from "@/components/scheduler";

export const metadata: Metadata = { title: "Agendar conversa" };

export default function SchedulePage() {
  return (
    <section className="section">
      <div className="container-shell">
        <div className="max-w-3xl mb-10">
          <div className="eyebrow">Conversa inicial</div>
          <h1 className="display text-5xl md:text-7xl mt-4">Escolha um horário livre.</h1>
          <p className="muted text-lg leading-8 mt-5">Encontro de 50 minutos para entender sua necessidade. Há 10 minutos de respiro entre reuniões.</p>
        </div>
        <Scheduler />
      </div>
    </section>
  );
}
