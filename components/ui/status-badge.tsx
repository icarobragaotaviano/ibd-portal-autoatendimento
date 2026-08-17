import React from "react";
import { Badge, BadgeProps } from "./badge";
import {
  LeadStage,
  ProjectStatus,
  ClientStatus,
  MaterialStatus,
  RevisionStatus,
  ProposalStatus,
  ContractStatus,
} from "@/lib/domain/types";
import { leadStageLabels } from "@/lib/domain/lead-stage";
import { projectStatusLabels } from "@/lib/domain/project-status";

export type AnyStatus =
  | LeadStage
  | ProjectStatus
  | ClientStatus
  | MaterialStatus
  | RevisionStatus
  | ProposalStatus
  | ContractStatus
  | string;

export interface StatusBadgeProps {
  status: AnyStatus;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, label, size = "md", className = "" }: StatusBadgeProps) {
  let variant: BadgeProps["variant"] = "default";
  let displayLabel = label || status;

  // 1. LeadStage
  if (status in leadStageLabels) {
    displayLabel = label || leadStageLabels[status as LeadStage];
    switch (status as LeadStage) {
      case "novo_lead":
        variant = "accent";
        break;
      case "manual_enviado":
      case "briefing_em_andamento":
      case "proposta_em_preparo":
      case "negociacao":
        variant = "warning";
        break;
      case "briefing_concluido":
      case "proposta_enviada":
      case "contrato_fechado":
      case "convertido":
        variant = "success";
        break;
      case "descartado":
        variant = "muted";
        break;
      default:
        variant = "default";
    }
  }

  // 2. ProjectStatus
  else if (status in projectStatusLabels) {
    displayLabel = label || projectStatusLabels[status as ProjectStatus];
    switch (status as ProjectStatus) {
      case "solicitacao_recebida":
      case "aguardando_inicio":
      case "aguardando_material":
      case "versao_enviada":
      case "aguardando_retorno":
        variant = "warning";
        break;
      case "briefing_em_andamento":
      case "em_producao":
      case "revisao_em_andamento":
        variant = "accent";
        break;
      case "briefing_aprovado":
      case "concluido":
        variant = "success";
        break;
      case "pausado":
      case "cancelado":
        variant = "danger";
        break;
      default:
        variant = "default";
    }
  }

  // 3. ClientStatus
  else if (status === "ativo") {
    variant = "success";
    displayLabel = label || "Ativo";
  } else if (status === "inativo") {
    variant = "muted";
    displayLabel = label || "Inativo";
  } else if (status === "arquivado") {
    variant = "muted";
    displayLabel = label || "Arquivado";
  }

  // 4. MaterialStatus
  else if (status === "pendente") {
    variant = "warning";
    displayLabel = label || "Pendente";
  } else if (status === "recebido") {
    variant = "accent";
    displayLabel = label || "Recebido";
  } else if (status === "aprovado") {
    variant = "success";
    displayLabel = label || "Aprovado";
  } else if (status === "dispensado") {
    variant = "muted";
    displayLabel = label || "Dispensado";
  }

  // 5. RevisionStatus
  else if (status === "aberta" || status === "aguardando_cliente") {
    variant = "warning";
    displayLabel = label || (status === "aberta" ? "Aberta" : "Aguardando Cliente");
  } else if (status === "em_execucao") {
    variant = "accent";
    displayLabel = label || "Em Execução";
  } else if (status === "concluida") {
    variant = "success";
    displayLabel = label || "Concluída";
  }

  // 6. ProposalStatus
  else if (status === "draft") {
    variant = "muted";
    displayLabel = label || "Rascunho";
  } else if (status === "sent") {
    variant = "warning";
    displayLabel = label || "Enviada";
  } else if (status === "accepted") {
    variant = "success";
    displayLabel = label || "Aprovada";
  } else if (status === "rejected" || status === "expired") {
    variant = "danger";
    displayLabel = label || (status === "rejected" ? "Recusada" : "Expirada");
  }

  // 7. ContractStatus
  else if (status === "signed") {
    variant = "success";
    displayLabel = label || "Assinado";
  }

  return (
    <Badge variant={variant} size={size} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {displayLabel}
    </Badge>
  );
}
