"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Clock,
  AlertTriangle,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Prospect, Project } from "@/lib/domain/types";

interface OverviewData {
  stats: {
    newLeadsCount: number;
    pendingProposalsCount: number;
    inProductionCount: number;
    waitingClientCount: number;
    upcomingDeadlinesCount: number;
    totalClientsCount: number;
  };
  attentionItems: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    actionUrl: string;
    severity: "warning" | "danger" | "info";
  }>;
  recentProspects: Prospect[];
  recentProjects: Project[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOverview() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/overview");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar visão geral.");
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Painel de Controle • IBD 2026</span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                Visão Executiva
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Aquisições, propostas em andamento, projetos e alertas operacionais do estúdio.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchOverview}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Atualizar
              </Button>
              <Link href="/admin/prospects">
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Ver Prospects
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-4">
            <Link href="/admin/prospects" className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--surface-strong)] text-[var(--text-primary)] hover:border-[var(--border-hover)] border border-[var(--border)] transition-colors">
              Leads & Prospects
            </Link>
            <Link href="/admin/clients" className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors">
              Clientes Ativos
            </Link>
            <Link href="/admin/projects" className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors">
              Projetos & Prazos
            </Link>
            <Link href="/guia" className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors">
              Manual & Guias
            </Link>
          </div>

          {isLoading && <LoadingState message="Carregando métricas de hoje..." />}

          {error && <ErrorState description={error} onRetry={fetchOverview} />}

          {data && !isLoading && !error && (
            <>
              {/* Section 1: HOJE Metrics Grid */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                    Hoje • Panorama Geral
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <Link href="/admin/prospects" className="block">
                    <Card hoverable className="p-5 flex flex-col justify-between h-full border-[var(--border)]">
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                        Novos Leads
                      </span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="font-display text-3xl font-bold text-[var(--accent)]">
                          {data.stats.newLeadsCount}
                        </span>
                        <Badge variant="accent" size="sm">Leads</Badge>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/admin/prospects" className="block">
                    <Card hoverable className="p-5 flex flex-col justify-between h-full border-[var(--border)]">
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                        Propostas Pendentes
                      </span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="font-display text-3xl font-bold text-[var(--text-primary)]">
                          {data.stats.pendingProposalsCount}
                        </span>
                        <Badge variant="warning" size="sm">Comercial</Badge>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/admin/projects" className="block">
                    <Card hoverable className="p-5 flex flex-col justify-between h-full border-[var(--border)]">
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                        Em Produção
                      </span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="font-display text-3xl font-bold text-[var(--accent)]">
                          {data.stats.inProductionCount}
                        </span>
                        <Badge variant="accent" size="sm">Execução</Badge>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/admin/projects" className="block">
                    <Card hoverable className="p-5 flex flex-col justify-between h-full border-[var(--border)]">
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                        Aguardando Cliente
                      </span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="font-display text-3xl font-bold text-[var(--warning)]">
                          {data.stats.waitingClientCount}
                        </span>
                        <Badge variant="warning" size="sm">Retorno</Badge>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/admin/projects" className="block">
                    <Card hoverable className="p-5 flex flex-col justify-between h-full border-[var(--border)]">
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                        Prazos Próximos
                      </span>
                      <div className="flex items-baseline justify-between mt-3">
                        <span className="font-display text-3xl font-bold text-[var(--danger)]">
                          {data.stats.upcomingDeadlinesCount}
                        </span>
                        <Badge variant="danger" size="sm">3 Dias</Badge>
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>

              {/* Section 2: PRECISA DE ATENÇÃO */}
              {data.attentionItems.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--warning)]">
                      Precisa de Atenção ({data.attentionItems.length})
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.attentionItems.map((item) => (
                      <Card
                        key={item.id}
                        hoverable
                        className={`p-5 flex flex-col justify-between gap-4 ${
                          item.severity === "danger"
                            ? "border-rose-500/30 bg-rose-500/[0.02]"
                            : "border-amber-500/30 bg-amber-500/[0.02]"
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-2">
                          <Link href={item.actionUrl}>
                            <Button
                              variant={item.severity === "danger" ? "danger" : "secondary"}
                              size="sm"
                              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                            >
                              Resolver Pendência
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Recent Prospects & Recent Projects */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent Prospects */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Prospects Recentes
                    </h3>
                    <Link href="/admin/prospects" className="text-xs font-mono text-[var(--accent)] hover:underline">
                      Ver todos →
                    </Link>
                  </div>

                  <Card className="p-0 overflow-hidden divide-y divide-[var(--border)]">
                    {data.recentProspects.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[var(--text-muted)]">
                        Nenhum prospect registrado ainda.
                      </div>
                    ) : (
                      data.recentProspects.map((p) => (
                        <Link
                          key={p.id}
                          href={`/admin/prospects/${p.id}`}
                          className="p-4 flex items-center justify-between hover:bg-[var(--surface-elevated)] transition-colors group"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                              {p.name}
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">
                              {p.service} • {p.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <StatusBadge status={p.stage} size="sm" />
                            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                          </div>
                        </Link>
                      ))
                    )}
                  </Card>
                </div>

                {/* Recent Projects */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Projetos em Acompanhamento
                    </h3>
                    <Link href="/admin/projects" className="text-xs font-mono text-[var(--accent)] hover:underline">
                      Ver todos →
                    </Link>
                  </div>

                  <Card className="p-0 overflow-hidden divide-y divide-[var(--border)]">
                    {data.recentProjects.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[var(--text-muted)]">
                        Nenhum projeto ativo no momento.
                      </div>
                    ) : (
                      data.recentProjects.map((prj) => (
                        <Link
                          key={prj.id}
                          href={`/admin/projects/${prj.id}`}
                          className="p-4 flex items-center justify-between hover:bg-[var(--surface-elevated)] transition-colors group"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                              {prj.title}
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">
                              {prj.confirmed_deadline
                                ? `Prazo: ${prj.confirmed_deadline}`
                                : "Aguardando confirmação de prazo"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <StatusBadge status={prj.status} size="sm" />
                            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                          </div>
                        </Link>
                      ))
                    )}
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
