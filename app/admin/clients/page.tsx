"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Users, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Client } from "@/lib/domain/types";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function fetchClients() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/clients");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar clientes.");
      }
      setClients(json.clients || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const filtered = clients.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      (c.company_name && c.company_name.toLowerCase().includes(search.toLowerCase()))
    );
  });

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
            eyebrow="Relacionamento • Clientes Ativos"
            title="Gestão de Clientes"
            description="Clientes ativados pelo estúdio com acesso habilitado ao portal."
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchClients}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Atualizar
              </Button>
            }
          />

          <div className="max-w-md">
            <Input
              placeholder="Buscar por nome, empresa, e-mail ou código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          {isLoading && <LoadingState message="Carregando clientes..." />}

          {error && <ErrorState description={error} onRetry={fetchClients} />}

          {!isLoading && !error && (
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse text-[var(--text-primary)]">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface-strong)]">
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Código
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Cliente / Empresa
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Contato
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Portal Habilitado
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-xs text-[var(--text-muted)]">
                          Nenhum cliente encontrado.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((c) => (
                        <tr key={c.id} className="hover:bg-[var(--surface-elevated)] transition-colors">
                          <td className="py-4 px-4 font-mono text-xs font-bold text-[var(--accent)]">
                            {c.id}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-display font-bold block text-sm">
                              {c.name}
                            </span>
                            {c.company_name && (
                              <span className="text-xs text-[var(--text-muted)] block">
                                {c.company_name}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-xs text-[var(--text-secondary)]">
                            <div>{c.email}</div>
                            <div className="text-[var(--text-muted)]">{c.whatsapp}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--success)]">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Habilitado
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={c.status} size="sm" />
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
