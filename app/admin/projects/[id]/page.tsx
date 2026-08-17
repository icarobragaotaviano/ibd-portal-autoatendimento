"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  UploadCloud,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Project, Client, ProjectMaterial, ProjectRevision, ProjectMessage, ActivityLog, ProjectStatus } from "@/lib/domain/types";
import { projectStatusLabels } from "@/lib/domain/project-status";
import { getProjectNextAction } from "@/lib/domain/next-action";

export default function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [materials, setMaterials] = useState<ProjectMaterial[]>([]);
  const [revisions, setRevisions] = useState<ProjectRevision[]>([]);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states for status update & deadline confirmation
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>("solicitacao_recebida");
  const [confirmedDeadline, setConfirmedDeadline] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  async function fetchProjectDetails() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar dados do projeto.");
      }
      setProject(json.project);
      setClient(json.client);
      setMaterials(json.materials || []);
      setRevisions(json.revisions || []);
      setMessages(json.messages || []);
      setActivityLogs(json.activityLogs || []);

      setSelectedStatus(json.project.status);
      setConfirmedDeadline(json.project.confirmed_deadline || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  async function handleSaveProjectChanges(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedStatus,
          confirmed_deadline: confirmedDeadline || null,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao atualizar projeto.");
      }

      setSuccessMsg("Alterações salvas com sucesso!");
      await fetchProjectDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar alterações");
    } finally {
      setIsUpdating(false);
    }
  }

  if (isLoading) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <LoadingState message="Carregando detalhes do projeto..." />
        </Container>
      </Section>
    );
  }

  if (error || !project) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <ErrorState description={error || "Projeto não encontrado"} onRetry={fetchProjectDetails} />
        </Container>
      </Section>
    );
  }

  const nextAction = getProjectNextAction(project);

  const statusOptions = Object.entries(projectStatusLabels).map(([val, label]) => ({
    value: val,
    label,
  }));

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar aos Projetos
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="eyebrow">{project.id}</span>
                <StatusBadge status={project.status} size="sm" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Cliente: <strong className="text-[var(--text-primary)]">{client?.name || project.client_id}</strong> ({client?.email})
              </p>
            </div>
          </div>

          {successMsg && (
            <Alert variant="success" title="Atualizado">
              {successMsg}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" title="Não foi possível salvar">
              {error}
            </Alert>
          )}

          {/* Grid Layout */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Column: Management, Status & Materials */}
            <div className="flex flex-col gap-6">
              {/* Management Form Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Status & Prazos</CardTitle>
                  <CardDescription>
                    Atualize a etapa do projeto e defina prazos oficiais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProjectChanges} className="flex flex-col gap-5">
                    <Select
                      label="Status Atual do Projeto"
                      options={statusOptions}
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus)}
                      required
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="date"
                        label="Prazo Confirmado (Oficial)"
                        value={confirmedDeadline}
                        onChange={(e) => setConfirmedDeadline(e.target.value)}
                        helperText="Exige briefing aprovado + materiais recebidos."
                      />

                      <div className="flex flex-col gap-1.5 justify-center">
                        <span className="text-xs font-mono font-bold uppercase text-[var(--text-muted)]">
                          Rodadas de Revisão
                        </span>
                        <span className="font-mono text-sm text-[var(--text-primary)] font-bold">
                          {project.revisions_count} de {project.revisions_limit} utilizadas
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button type="submit" variant="primary" size="md" isLoading={isUpdating}>
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Materials Checklist Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Materiais & Arquivos do Projeto</CardTitle>
                  <CardDescription>
                    Itens necessários para início e continuidade da produção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {materials.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                      Nenhum material cadastrado neste projeto.
                    </p>
                  ) : (
                    <div className="divide-y divide-[var(--border)]">
                      {materials.map((m) => (
                        <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                              {m.name} {m.required && <span className="text-[var(--accent)]">*</span>}
                            </span>
                            {m.description && (
                              <span className="text-xs text-[var(--text-muted)]">{m.description}</span>
                            )}
                            {m.original_filename && (
                              <span className="font-mono text-[11px] text-[var(--accent)] mt-0.5">
                                Arquivo: {m.original_filename}
                              </span>
                            )}
                          </div>
                          <StatusBadge status={m.status} size="sm" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Next Action, Timeline & Revisions */}
            <div className="flex flex-col gap-6">
              {/* Calculated Next Action */}
              <Card className="border-amber-500/30 bg-amber-500/[0.02]">
                <CardHeader>
                  <span className="eyebrow">Cálculo de Próxima Ação</span>
                  <CardTitle className="text-xl">{nextAction.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {nextAction.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[var(--text-muted)]">Responsável atual:</span>
                    <Badge variant={nextAction.owner === "client" ? "warning" : "accent"}>
                      {nextAction.owner === "client" ? "Cliente" : "IBD"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & History */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Eventos & Timeline</CardTitle>
                  <CardDescription>Registro cronológico de atividades</CardDescription>
                </CardHeader>
                <CardContent>
                  {activityLogs.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] text-center py-4">
                      Nenhuma atividade registrada ainda.
                    </p>
                  ) : (
                    <div className="grid gap-3">
                      {activityLogs.map((log) => (
                        <div key={log.id} className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col gap-1 text-xs">
                          <div className="flex justify-between items-center">
                            <strong className="font-mono text-[var(--accent)]">{log.event}</strong>
                            <span className="font-mono text-[var(--text-muted)]">
                              {new Date(log.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <span className="text-[var(--text-muted)]">
                              {JSON.stringify(log.metadata)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
