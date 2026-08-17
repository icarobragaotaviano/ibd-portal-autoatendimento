"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileText,
  MessageSquare,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NextActionCard } from "@/components/ui/next-action-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { HumanTimeline } from "@/components/portal/human-timeline";
import { IBDCompanion } from "@/components/guide/ibd-companion";
import { StructuredRevisionBuilder } from "@/components/portal/structured-revision-builder";
import { getContextualGuideMessage } from "@/lib/domain/guide-rules";
import {
  Project,
  ProjectMaterial,
  ProjectRevision,
  ProjectMessage,
  ActivityLog,
  ProjectNextAction,
} from "@/lib/domain/types";

export default function ClientProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [materials, setMaterials] = useState<ProjectMaterial[]>([]);
  const [revisions, setRevisions] = useState<ProjectRevision[]>([]);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [nextAction, setNextAction] = useState<ProjectNextAction | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  // Material upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [materialFileName, setMaterialFileName] = useState("");

  // Revision feedback form state
  const [revisionNotes, setRevisionNotes] = useState("");
  const [isSubmittingRevision, setIsSubmittingRevision] = useState(false);

  async function fetchProject() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal/projects/${id}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar projeto.");
      }
      setProject(json.project);
      setMaterials(json.materials || []);
      setRevisions(json.revisions || []);
      setMessages(json.messages || []);
      setActivityLogs(json.activityLogs || []);
      setNextAction(json.nextAction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  async function handleUploadMaterial(materialId?: string) {
    if (!materialFileName.trim()) return;
    setIsUploading(true);
    try {
      const res = await fetch(`/api/portal/projects/${id}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          material_id: materialId,
          filename: materialFileName,
          mime_type: "application/pdf",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Falha ao enviar arquivo.");
      setFeedbackSuccess("Arquivo enviado com sucesso!");
      setMaterialFileName("");
      await fetchProject();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmitRevision(e: React.FormEvent) {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    setIsSubmittingRevision(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal/projects/${id}/revisions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: revisionNotes }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Falha ao solicitar revisão.");
      setFeedbackSuccess("Solicitação de revisão enviada! O IBD iniciará a aplicação dos ajustes.");
      setRevisionNotes("");
      await fetchProject();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar revisão");
    } finally {
      setIsSubmittingRevision(false);
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
          <ErrorState description={error || "Projeto não encontrado"} onRetry={fetchProject} />
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-8">
          {/* Top Nav */}
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar ao Painel
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
              <p className="text-sm text-[var(--text-secondary)]">
                {project.service} • {project.scope_description}
              </p>
            </div>
          </div>

          {feedbackSuccess && (
            <Alert variant="success" title="Atualizado">
              {feedbackSuccess}
            </Alert>
          )}

          {/* SECTION: PRÓXIMA AÇÃO */}
          {nextAction && (
            <NextActionCard
              owner={nextAction.owner}
              title={nextAction.title}
              description={nextAction.description}
              actionText={nextAction.action}
              badge={<StatusBadge status={project.status} size="sm" />}
            />
          )}

          {/* SECTION: LINHA DO TEMPO HUMANA */}
          <HumanTimeline
            currentStatus={project.status}
            confirmedDueDate={project.confirmed_deadline}
          />

          {/* SECTION: AS 3 DATAS DO PROJETO */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-card p-5 flex flex-col gap-1 border-[var(--border)]">
              <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase">
                Data Desejada
              </span>
              <strong className="font-display text-xl text-[var(--text-primary)]">
                {project.desired_deadline || "Não informada"}
              </strong>
              <span className="text-[11px] text-[var(--text-muted)] mt-1">
                Referência inicial solicitada no briefing.
              </span>
            </div>

            <div className="surface-card p-5 flex flex-col gap-1 border-[var(--border)]">
              <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase">
                Estimativa
              </span>
              <strong className="font-display text-xl text-[var(--text-primary)]">
                {project.estimated_deadline || "Em análise"}
              </strong>
              <span className="text-[11px] text-[var(--text-muted)] mt-1">
                Previsão calculada com base na agenda do estúdio.
              </span>
            </div>

            <div className="surface-card p-5 flex flex-col gap-1 border-amber-500/30 bg-amber-500/[0.02]">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase">
                Prazo Confirmado
              </span>
              <strong className="font-display text-xl text-[var(--accent)]">
                {project.confirmed_deadline || "Aguardando requisitos"}
              </strong>
              <span className="text-[11px] text-[var(--text-muted)] mt-1">
                {project.confirmed_deadline
                  ? `Compromisso assumido em ${new Date(project.deadline_confirmed_at || "").toLocaleDateString("pt-BR")}`
                  : "Ativado após briefing aprovado + materiais recebidos."}
              </span>
            </div>
          </div>

          {/* Grid: Materials, Revisions & Timeline */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Column: Materials & Revisions */}
            <div className="flex flex-col gap-6" id="materiais">
              {/* Materials Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Materiais do Projeto</CardTitle>
                  <CardDescription>
                    Envie os arquivos necessários para iniciarmos a produção.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {materials.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] py-3 text-center">
                      Nenhum material pendente no momento.
                    </p>
                  ) : (
                    <div className="divide-y divide-[var(--border)]">
                      {materials.map((m) => (
                        <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                              {m.name} {m.required && <span className="text-[var(--accent)]">*</span>}
                            </span>
                            {m.description && (
                              <span className="text-xs text-[var(--text-muted)] leading-relaxed">
                                {m.description}
                              </span>
                            )}
                            {m.original_filename && (
                              <span className="font-mono text-[11px] text-[var(--accent)] mt-0.5">
                                Enviado: {m.original_filename}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <StatusBadge status={m.status} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Box */}
                  <div className="p-4 rounded-xl border border-dashed border-[var(--border-hover)] bg-[var(--surface-elevated)] flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <input
                      type="text"
                      placeholder="Nome do arquivo ou link do Drive/Dropbox..."
                      value={materialFileName}
                      onChange={(e) => setMaterialFileName(e.target.value)}
                      className="input text-xs w-full"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUploadMaterial()}
                      isLoading={isUploading}
                      className="shrink-0"
                      leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
                    >
                      Enviar Material
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Revisions Card */}
              <Card id="revisoes">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Rodadas de Revisão</CardTitle>
                      <CardDescription>
                        {project.revisions_count} de {project.revisions_limit} rodadas utilizadas
                      </CardDescription>
                    </div>
                    <Badge variant={project.revisions_count >= project.revisions_limit ? "warning" : "accent"}>
                      {project.revisions_count} / {project.revisions_limit}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                  {/* Revision Request Form */}
                  {project.status === "versao_enviada" || project.status === "aguardando_retorno" ? (
                    <StructuredRevisionBuilder
                      currentRound={project.revisions_count + 1}
                      maxRounds={project.revisions_limit}
                      onSubmitRevision={async (formattedNotes) => {
                        setIsSubmittingRevision(true);
                        setError(null);
                        try {
                          const res = await fetch(`/api/portal/projects/${id}/revisions`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ notes: formattedNotes }),
                          });
                          const json = await res.json();
                          if (!res.ok || !json.success) throw new Error(json.error || "Falha ao solicitar revisão.");
                          setFeedbackSuccess("Solicitação de revisão estruturada enviada! O IBD iniciará a aplicação dos ajustes.");
                          await fetchProject();
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Erro ao enviar revisão");
                        } finally {
                          setIsSubmittingRevision(false);
                        }
                      }}
                      isLoading={isSubmittingRevision}
                    />
                  ) : (
                    <p className="text-xs text-[var(--text-muted)]">
                      O envio de revisões é habilitado quando uma nova versão é entregue pelo IBD.
                    </p>
                  )}

                  {/* Previous Revisions */}
                  {revisions.length > 0 && (
                    <div className="grid gap-3 pt-2 border-t border-[var(--border)]">
                      <span className="text-xs font-mono font-bold uppercase text-[var(--text-muted)]">
                        Histórico de Rodadas
                      </span>
                      {revisions.map((rev) => (
                        <div key={rev.id} className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col gap-1 text-xs">
                          <div className="flex justify-between items-center">
                            <strong className="font-display font-bold text-[var(--text-primary)]">
                              Rodada {rev.round_number}
                            </strong>
                            <StatusBadge status={rev.status} size="sm" />
                          </div>
                          {rev.notes && (
                            <p className="text-[var(--text-secondary)] mt-1">{rev.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Companion, Timeline & Chronological History */}
            <div className="flex flex-col gap-6">
              {/* Contextual IBD Guide */}
              <IBDCompanion
                message={getContextualGuideMessage({
                  route: `/portal/projetos/${id}`,
                  status: project.status,
                  revisionsUsed: project.revisions_count,
                })}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Histórico Cronológico</CardTitle>
                  <CardDescription>
                    Registro transparente de versões, envios e marcos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activityLogs.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] text-center py-6">
                      Nenhum marco registrado ainda.
                    </p>
                  ) : (
                    <div className="relative pl-6 border-l-2 border-[var(--border)] space-y-6">
                      {activityLogs.map((act) => (
                        <div key={act.id} className="relative group">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[#050505]" />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                              {new Date(act.created_at).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                              {act.event === "project.created"
                                ? "Projeto Criado"
                                : act.event === "project.status_changed"
                                ? `Status atualizado: ${act.metadata?.to || ""}`
                                : act.event === "material.uploaded"
                                ? `Material enviado: ${act.metadata?.material_name || "Arquivo"}`
                                : act.event === "deadline.confirmed"
                                ? `Prazo Confirmado: ${act.metadata?.deadline || ""}`
                                : act.event === "revision.created"
                                ? `Rodada ${act.metadata?.round || ""} de revisão solicitada`
                                : act.event}
                            </span>
                          </div>
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
