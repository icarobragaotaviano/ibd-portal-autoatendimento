"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserCheck,
  FileText,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Plus,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Prospect, ProspectBriefing, Proposal, Contract, Client } from "@/lib/domain/types";
import { leadMessages } from "@/lib/domain/lead-stage";

export default function AdminProspectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [briefing, setBriefing] = useState<ProspectBriefing | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Proposal Creation Modal / Form State
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [propTitle, setPropTitle] = useState("");
  const [propScope, setPropScope] = useState("");
  const [propPrice, setPropPrice] = useState("12500");
  const [propValidUntil, setPropValidUntil] = useState("");
  const [isSubmittingProp, setIsSubmittingProp] = useState(false);

  // Contract Registration Form State
  const [isRegisteringContract, setIsRegisteringContract] = useState(false);
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractNotes, setContractNotes] = useState("");
  const [isSubmittingContract, setIsSubmittingContract] = useState(false);

  // Client Activation Dialog State
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  async function fetchDetails() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/prospects/${id}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao carregar dados do prospect.");
      }
      setProspect(json.prospect);
      setBriefing(json.briefing);
      setProposals(json.proposals || []);
      setContract(json.contract);
      setClient(json.client);

      if (!propTitle && json.prospect) {
        setPropTitle(`Proposta • ${json.prospect.service}`);
        setPropScope(json.prospect.need_description);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [id]);

  async function handleCreateProposal(e: React.FormEvent) {
    e.preventDefault();
    if (!prospect) return;
    setIsSubmittingProp(true);
    try {
      const res = await fetch("/api/admin/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect_id: prospect.id,
          title: propTitle,
          scope: propScope,
          price: Number(propPrice),
          currency: "BRL",
          valid_until: propValidUntil || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Erro ao criar proposta.");
      setActionSuccess("Proposta criada como rascunho com sucesso.");
      setIsCreatingProposal(false);
      await fetchDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar proposta");
    } finally {
      setIsSubmittingProp(false);
    }
  }

  async function handleSendProposal(proposalId: string) {
    try {
      const res = await fetch("/api/admin/proposals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proposalId, status: "sent" }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Erro ao enviar proposta.");
      setActionSuccess("Proposta marcada como enviada e notificação disparada.");
      await fetchDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar proposta");
    }
  }

  async function handleRegisterContract(e: React.FormEvent) {
    e.preventDefault();
    if (!prospect) return;
    setIsSubmittingContract(true);
    try {
      const latestProposal = proposals[0];
      const res = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect_id: prospect.id,
          proposal_id: latestProposal?.id || null,
          start_date: contractStartDate || null,
          notes: contractNotes || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Erro ao registrar contrato.");
      setActionSuccess("Contrato registrado como assinado. Pronto para ativação do cliente.");
      setIsRegisteringContract(false);
      await fetchDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar contrato");
    } finally {
      setIsSubmittingContract(false);
    }
  }

  async function handleActivateClient() {
    if (!prospect) return;
    setIsActivating(true);
    try {
      const res = await fetch("/api/admin/activate-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect_id: prospect.id,
          company_name: prospect.name,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao ativar cliente.");
      }
      setActionSuccess("Cliente ativado com sucesso! Acesso habilitado e convite enviado.");
      setIsActivateDialogOpen(false);
      await fetchDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao ativar cliente");
      setIsActivateDialogOpen(false);
    } finally {
      setIsActivating(false);
    }
  }

  if (isLoading) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <LoadingState message="Carregando detalhes do prospect..." />
        </Container>
      </Section>
    );
  }

  if (error || !prospect) {
    return (
      <Section spacing="lg">
        <Container size="lg">
          <ErrorState description={error || "Prospect não encontrado"} onRetry={fetchDetails} />
        </Container>
      </Section>
    );
  }

  const isContractSigned = contract?.status === "signed";
  const isAlreadyConverted = prospect.stage === "convertido";

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="lg">
        <div className="flex flex-col gap-8">
          {/* Top Nav */}
          <div className="flex items-center gap-4">
            <Link href="/admin/prospects">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar aos Prospects
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="eyebrow">{prospect.id}</span>
                <StatusBadge status={prospect.stage} size="sm" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                {prospect.name}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {prospect.email} • {prospect.whatsapp}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {isAlreadyConverted && client ? (
                <Link href={`/admin/clients`}>
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<UserCheck className="w-4 h-4 text-[var(--success)]" />}
                  >
                    Ver Cliente Ativo ({client.id})
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  disabled={!isContractSigned}
                  onClick={() => setIsActivateDialogOpen(true)}
                  leftIcon={<UserCheck className="w-4 h-4" />}
                >
                  ATIVAR CLIENTE
                </Button>
              )}
            </div>
          </div>

          {actionSuccess && (
            <Alert variant="success" title="Sucesso">
              {actionSuccess}
            </Alert>
          )}

          {/* Grid of details */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Column: Data, Need & Briefing */}
            <div className="flex flex-col gap-6">
              {/* Initial Data Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Solicitação Inicial</CardTitle>
                  <CardDescription>
                    Registrado em {new Date(prospect.created_at).toLocaleDateString("pt-BR")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm">
                  <div>
                    <span className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                      Serviço Solicitado
                    </span>
                    <strong className="text-[var(--text-primary)] text-base">{prospect.service}</strong>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                      Descrição da Necessidade
                    </span>
                    <p className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed bg-[var(--surface-elevated)] p-4 rounded-lg border border-[var(--border)]">
                      {prospect.need_description}
                    </p>
                  </div>
                  {prospect.desired_deadline && (
                    <div>
                      <span className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                        Prazo Desejado pelo Lead
                      </span>
                      <span className="font-mono text-sm text-[var(--accent)] font-bold">
                        {prospect.desired_deadline}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Briefing Responses Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Briefing Guiado</CardTitle>
                    <CardDescription>
                      {briefing
                        ? `Status: ${briefing.status === "concluido" ? "Concluído" : "Em andamento"} (v${briefing.version})`
                        : "Aguardando preenchimento pelo prospect"}
                    </CardDescription>
                  </div>
                  {briefing && (
                    <Badge variant={briefing.status === "concluido" ? "success" : "warning"}>
                      {briefing.status === "concluido" ? "Completo" : "Em andamento"}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {briefing && Object.keys(briefing.responses).length > 0 ? (
                    <div className="grid gap-4 divide-y divide-[var(--border)]">
                      {Object.entries(briefing.responses).map(([key, val], idx) => (
                        <div key={key} className={idx > 0 ? "pt-3" : ""}>
                          <span className="text-xs font-mono font-bold uppercase text-[var(--accent)] block mb-1">
                            {key.replace(/_/g, " ")}
                          </span>
                          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                            {typeof val === "string" ? val : JSON.stringify(val, null, 2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)] py-4">
                      O prospect ainda não completou as etapas de briefing.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Proposals & Contract */}
            <div className="flex flex-col gap-6">
              {/* Proposals Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Propostas Comerciais</CardTitle>
                    <CardDescription>Versionamento e status de envio</CardDescription>
                  </div>
                  {!isCreatingProposal && !isAlreadyConverted && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsCreatingProposal(true)}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Nova Proposta
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {isCreatingProposal && (
                    <form onSubmit={handleCreateProposal} className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.02] flex flex-col gap-4 mb-2">
                      <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
                        Criar Nova Versão de Proposta
                      </h4>
                      <Input
                        label="Título da Proposta"
                        value={propTitle}
                        onChange={(e) => setPropTitle(e.target.value)}
                        required
                      />
                      <Textarea
                        label="Escopo e Entregáveis"
                        value={propScope}
                        onChange={(e) => setPropScope(e.target.value)}
                        required
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Input
                          type="number"
                          label="Investimento (R$)"
                          value={propPrice}
                          onChange={(e) => setPropPrice(e.target.value)}
                          required
                        />
                        <Input
                          type="date"
                          label="Válida Até"
                          value={propValidUntil}
                          onChange={(e) => setPropValidUntil(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsCreatingProposal(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" variant="primary" size="sm" isLoading={isSubmittingProp}>
                          Salvar Rascunho
                        </Button>
                      </div>
                    </form>
                  )}

                  {proposals.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                      Nenhuma proposta criada ainda.
                    </p>
                  ) : (
                    proposals.map((p) => (
                      <div key={p.id} className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-xs font-bold text-[var(--accent)] block">
                              Versão {p.version} • R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                            <strong className="font-display text-sm text-[var(--text-primary)]">{p.title}</strong>
                          </div>
                          <StatusBadge status={p.status} size="sm" />
                        </div>

                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {p.scope}
                        </p>

                        {p.status === "draft" && (
                          <div className="pt-2 flex justify-end">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleSendProposal(p.id)}
                              rightIcon={<Send className="w-3.5 h-3.5" />}
                            >
                              Enviar Proposta ao Lead
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Contract Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Contrato</CardTitle>
                    <CardDescription>Formalização prévia para ativação</CardDescription>
                  </div>
                  {!contract && !isRegisteringContract && !isAlreadyConverted && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsRegisteringContract(true)}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Registrar Contrato
                    </Button>
                  )}
                </CardHeader>

                <CardContent>
                  {isRegisteringContract && (
                    <form onSubmit={handleRegisterContract} className="p-4 rounded-xl border border-[var(--border-hover)] bg-[var(--surface-elevated)] flex flex-col gap-4 mb-2">
                      <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
                        Registrar Contrato Assinado
                      </h4>
                      <Input
                        type="date"
                        label="Data de Início Prevista"
                        value={contractStartDate}
                        onChange={(e) => setContractStartDate(e.target.value)}
                      />
                      <Textarea
                        label="Notas ou Referência do Documento"
                        placeholder="Ex: Assinado via DocuSign em 16/08/2026..."
                        value={contractNotes}
                        onChange={(e) => setContractNotes(e.target.value)}
                      />
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsRegisteringContract(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" variant="primary" size="sm" isLoading={isSubmittingContract}>
                          Salvar Contrato Assinado
                        </Button>
                      </div>
                    </form>
                  )}

                  {contract ? (
                    <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                          <strong className="font-display text-sm text-[var(--text-primary)]">
                            Contrato Assinado
                          </strong>
                        </div>
                        <StatusBadge status={contract.status} size="sm" />
                      </div>

                      {contract.signed_at && (
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          Assinado em: {new Date(contract.signed_at).toLocaleDateString("pt-BR")}
                        </span>
                      )}

                      {contract.notes && (
                        <p className="text-xs text-[var(--text-secondary)]">{contract.notes}</p>
                      )}
                    </div>
                  ) : (
                    !isRegisteringContract && (
                      <div className="p-4 rounded-lg border border-dashed border-[var(--border)] text-center text-xs text-[var(--text-muted)]">
                        Nenhum contrato registrado. O botão &quot;ATIVAR CLIENTE&quot; será liberado após o registro do contrato assinado.
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Confirmation Modal for Client Activation */}
        <ConfirmationDialog
          isOpen={isActivateDialogOpen}
          onClose={() => setIsActivateDialogOpen(false)}
          onConfirm={handleActivateClient}
          isLoading={isActivating}
          title="Confirmar Ativação do Cliente"
          description={
            <div className="flex flex-col gap-3">
              <p>
                Esta ação converterá <strong>{prospect.name}</strong> ({prospect.email}) em cliente ativo do IBD.
              </p>
              <div className="text-xs text-[var(--text-secondary)] list-disc pl-4 space-y-1">
                <li>Validação do contrato assinado confirmada</li>
                <li>Criação do registro na tabela de clientes</li>
                <li>Vínculo e habilitação do acesso ao portal</li>
                <li>Disparo automático do e-mail de convite com link de login</li>
                <li>Registro auditável em Activity Log</li>
              </div>
            </div>
          }
          confirmText="Ativar e Enviar Convite"
        />
      </Container>
    </Section>
  );
}
