"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FolderKanban, RefreshCw, Search, Plus, Calendar } from "lucide-react";
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
import { Project, ProjectStatus } from "@/lib/domain/types";
import { projectStatusLabels } from "@/lib/domain/project-status";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  async function fetchProjects() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar projetos.");
      }
      setProjects(json.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.client_id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "", label: "Todos os Status" },
    ...Object.entries(projectStatusLabels).map(([val, label]) => ({
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
            eyebrow="Execução • Produção do Estúdio"
            title="Gestão de Projetos"
            description="Acompanhamento de status, rodadas de revisão, materiais e prazos confirmados."
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchProjects}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Atualizar
              </Button>
            }
          />

          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
            <Input
              placeholder="Buscar por título, serviço, ID do projeto ou cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />

            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>

          {isLoading && <LoadingState message="Carregando projetos..." />}

          {error && <ErrorState description={error} onRetry={fetchProjects} />}

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
                        Projeto / Serviço
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Prazo Confirmado
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Revisões
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
                        Status
                      </th>
                      <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase text-[var(--text-muted)] text-right">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-xs text-[var(--text-muted)]">
                          Nenhum projeto encontrado.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((prj) => (
                        <tr key={prj.id} className="hover:bg-[var(--surface-elevated)] transition-colors">
                          <td className="py-4 px-4 font-mono text-xs font-bold text-[var(--accent)]">
                            {prj.id}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-display font-bold block text-sm">
                              {prj.title}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] block">
                              {prj.service} • Cliente: {prj.client_id}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs">
                            {prj.confirmed_deadline ? (
                              <span className="text-[var(--text-primary)] font-bold">
                                {prj.confirmed_deadline}
                              </span>
                            ) : prj.estimated_deadline ? (
                              <span className="text-[var(--text-muted)]">
                                Est: {prj.estimated_deadline}
                              </span>
                            ) : (
                              <span className="text-[var(--text-muted)]">Aguardando</span>
                            )}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-[var(--text-secondary)]">
                            {prj.revisions_count} / {prj.revisions_limit}
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={prj.status} size="sm" />
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link href={`/admin/projects/${prj.id}`}>
                              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                                Detalhes
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
