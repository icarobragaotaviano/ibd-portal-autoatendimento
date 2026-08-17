"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Prospect, LeadStage } from "@/lib/domain/types";
import { leadStageLabels } from "@/lib/domain/lead-stage";

export default function AdminProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  async function fetchProspects() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/prospects");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar prospects.");
      }
      setProspects(json.prospects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProspects();
  }, []);

  const filtered = prospects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === "" || p.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stageOptions = [
    { value: "", label: "Todos os Estágios" },
    ...Object.entries(leadStageLabels).map(([val, label]) => ({
      value: val,
      label,
    })),
  ];

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Dashboard
              </Button>
            </Link>
          </div>

          <PageHeader
            eyebrow="Aquisição • Funil Comercial"
            title="Gestão de Prospects"
            description="Leads recebidos, respostas de briefing, envio de propostas e ativação de clientes."
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchProspects}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Atualizar
              </Button>
            }
          />

          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
            <Input
              placeholder="Buscar por nome, e-mail, serviço ou protocolo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />

            <Select
              options={stageOptions}
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            />
          </div>

          {isLoading && <LoadingState message="Carregando prospects..." />}

          {error && <ErrorState description={error} onRetry={fetchProspects} />}

          {!isLoading && !error && (
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse text-[var(--text-primary)]">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface-strong)]">
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Protocolo
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Prospect / Contato
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Serviço Desejado
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Estágio
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)] text-right">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-xs text-[var(--text-muted)]">
                          Nenhum prospect encontrado com os filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((p) => (
                        <tr key={p.id} className="hover:bg-[var(--surface-elevated)] transition-colors">
                          <td className="py-4 px-4 font-mono text-xs font-bold text-[var(--accent)]">
                            {p.id}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-display font-bold block text-sm">
                              {p.name}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] block">
                              {p.email} • {p.whatsapp}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-xs text-[var(--text-secondary)]">
                            {p.service}
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={p.stage} size="sm" />
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link href={`/admin/prospects/${p.id}`}>
                              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                                Gerenciar
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </Section>
  );
}
