"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FolderKanban, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Project, ProjectNextAction } from "@/lib/domain/types";

interface PortalData {
  allProjects: Array<Project & { nextAction: ProjectNextAction }>;
}

export default function ClientProjectsListPage() {
  const [projects, setProjects] = useState<Array<Project & { nextAction: ProjectNextAction }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProjects() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/overview");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Falha ao carregar projetos.");
      setProjects(json.allProjects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar ao Painel
              </Button>
            </Link>
          </div>

          <PageHeader
            eyebrow="Meus Projetos • IBD 2026"
            title="Todos os Projetos"
            description="Acompanhe o andamento de cada entrega, histórico de versões e prazos acordados."
            action={
              <Link href="/portal/solicitar">
                <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Nova Solicitação
                </Button>
              </Link>
            }
          />

          {isLoading && <LoadingState message="Carregando seus projetos..." />}

          {error && <ErrorState description={error} onRetry={fetchProjects} />}

          {!isLoading && !error && (
            <div className="grid gap-4">
              {projects.length === 0 ? (
                <Card className="p-8 text-center text-xs text-[var(--text-muted)]">
                  Nenhum projeto encontrado.
                </Card>
              ) : (
                projects.map((prj) => (
                  <Link
                    key={prj.id}
                    href={`/portal/projetos/${prj.id}`}
                    className="surface-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group border-[var(--border)]"
                  >
                    <div className="flex flex-col gap-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--accent)]">
                          {prj.id}
                        </span>
                        <StatusBadge status={prj.status} size="sm" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {prj.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 leading-relaxed">
                        {prj.scope_description}
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border)]">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[var(--text-muted)]">Prazo:</span>
                        <strong className="text-[var(--text-primary)]">
                          {prj.confirmed_deadline || prj.estimated_deadline || "A definir"}
                        </strong>
                      </div>
                      <span className="text-xs text-[var(--accent)] font-mono font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Abrir projeto →
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
