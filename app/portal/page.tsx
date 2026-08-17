"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  ArrowRight,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NextActionCard } from "@/components/ui/next-action-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Client, Project, ProjectNextAction } from "@/lib/domain/types";

interface PortalData {
  client: Client;
  priorityProject: (Project & { nextAction: ProjectNextAction }) | null;
  activeProjects: Array<Project & { nextAction: ProjectNextAction }>;
  waitingClientProjects: Array<Project & { nextAction: ProjectNextAction }>;
  completedProjects: Array<Project & { nextAction: ProjectNextAction }>;
  allProjects: Array<Project & { nextAction: ProjectNextAction }>;
}

export default function ClientPortalDashboard() {
  const [data, setData] = useState<PortalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPortalData() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/overview");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar seus projetos.");
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPortalData();
  }, []);

  if (isLoading) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <LoadingState message="Carregando seu portal..." />
        </Container>
      </Section>
    );
  }

  if (error || !data) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <ErrorState description={error || "Não foi possível carregar seu portal"} onRetry={fetchPortalData} />
        </Container>
      </Section>
    );
  }

  const { client, priorityProject, activeProjects, waitingClientProjects, completedProjects } = data;

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Portal do Cliente IBD 2026</span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                Olá, {client.name}.
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Acompanhe o andamento dos seus trabalhos, envie arquivos e avalie versões enviadas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/portal/solicitar">
                <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                  Nova Solicitação
                </Button>
              </Link>
            </div>
          </div>

          {/* SECTION: O QUE PRECISA DA SUA ATENÇÃO (PRIORITÁRIO) */}
          {priorityProject && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  O que precisa da sua atenção
                </h3>
              </div>

              <NextActionCard
                owner={priorityProject.nextAction.owner}
                title={priorityProject.nextAction.title}
                description={priorityProject.nextAction.description}
                actionText={priorityProject.nextAction.action}
                actionHref={`/portal/projetos/${priorityProject.id}`}
                projectTitle={priorityProject.title}
                badge={<StatusBadge status={priorityProject.status} size="sm" />}
              />
            </div>
          )}

          {/* SECTION: RESUMO EM CARDS (Projetos Ativos, Aguardando Você, Concluídos) */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 flex flex-col justify-between border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Projetos Ativos
              </span>
              <div className="flex items-baseline justify-between mt-3">
                <span className="font-display text-3xl font-bold text-[var(--text-primary)]">
                  {activeProjects.length}
                </span>
                <Badge variant="accent" size="sm">Em Curso</Badge>
              </div>
            </Card>

            <Card className="p-5 flex flex-col justify-between border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Aguardando Você
              </span>
              <div className="flex items-baseline justify-between mt-3">
                <span className="font-display text-3xl font-bold text-[var(--warning)]">
                  {waitingClientProjects.length}
                </span>
                <Badge variant="warning" size="sm">Ação Necessária</Badge>
              </div>
            </Card>

            <Card className="p-5 flex flex-col justify-between border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Concluídos
              </span>
              <div className="flex items-baseline justify-between mt-3">
                <span className="font-display text-3xl font-bold text-[var(--success)]">
                  {completedProjects.length}
                </span>
                <Badge variant="success" size="sm">Finalizados</Badge>
              </div>
            </Card>
          </div>

          {/* SECTION: MEUS PROJETOS */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Todos os Projetos
              </h3>
              <Link href="/portal/solicitar" className="text-xs font-mono text-[var(--accent)] hover:underline">
                + Abrir nova demanda
              </Link>
            </div>

            <div className="grid gap-4">
              {data.allProjects.length === 0 ? (
                <Card className="p-8 text-center text-xs text-[var(--text-muted)]">
                  Nenhum projeto registrado no momento.
                </Card>
              ) : (
                data.allProjects.map((prj) => (
                  <Link
                    key={prj.id}
                    href={`/portal/projetos/${prj.id}`}
                    className="surface-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group border-[var(--border)]"
                  >
                    <div className="flex flex-col gap-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--accent)]">
                          {prj.id}
                        </span>
                        <StatusBadge status={prj.status} size="sm" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {prj.title}
                      </h4>
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
                        Ver detalhes & ações →
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* SECTION: ACESSO AOS GUIAS */}
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                Dúvidas sobre o fluxo de revisões ou prazos?
              </span>
              <p className="text-xs text-[var(--text-muted)]">
                Consulte o Manual do Cliente e os guias completos de atendimento.
              </p>
            </div>

            <Link href="/guia">
              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Abrir Central de Guias
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
