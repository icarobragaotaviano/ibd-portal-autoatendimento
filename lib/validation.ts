import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, "Informe um WhatsApp válido com DDD.")
  .max(30, "WhatsApp muito longo.");

// 1. Lead / Prospect Initial Input
export const LeadInputSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  email: z.string().trim().email("Informe um e-mail válido.").max(254).toLowerCase(),
  whatsapp: phone,
  service: z.string().trim().min(1, "Selecione o tipo de serviço.").max(100),
  need_description: z
    .string()
    .trim()
    .min(10, "Descreva a necessidade com pelo menos 10 caracteres.")
    .max(4000),
  desired_deadline: z
    .union([z.literal(""), z.string().date(), z.null()])
    .optional()
    .transform((v) => v || null),
  consent: z.boolean().refine((val) => val === true, {
    message: "É necessário autorizar o uso dos dados para prosseguir.",
  }),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;

// 2. Progressive Briefing Responses
export const BriefingResponsesSchema = z.object({
  step: z.number().int().min(1).max(5).optional(),
  responses: z.record(z.string(), z.unknown()),
  completed: z.boolean().optional(),
});

// 3. Proposals
export const ProposalInputSchema = z.object({
  prospect_id: z.string().min(1),
  title: z.string().trim().min(3).max(200),
  scope: z.string().trim().min(10).max(10000),
  price: z.number().positive("O valor deve ser positivo."),
  currency: z.string().default("BRL"),
  valid_until: z.string().date().optional().nullable(),
});

// 4. Contracts
export const ContractInputSchema = z.object({
  prospect_id: z.string().min(1),
  proposal_id: z.string().optional().nullable(),
  start_date: z.string().date().optional().nullable(),
  file_path: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

// 5. Client Activation
export const ActivateClientSchema = z.object({
  prospect_id: z.string().min(1),
  company_name: z.string().trim().max(150).optional(),
  notes: z.string().trim().max(1000).optional(),
});

// 6. Project Creation (by Admin or Active Client)
export const ProjectRequestSchema = z.object({
  service: z.string().trim().min(1).max(100),
  title: z.string().trim().min(3).max(150),
  scope_description: z.string().trim().min(10).max(4000),
  desired_deadline: z.string().date().optional().nullable(),
});

// 7. Revision Feedback Input
export const RevisionFeedbackSchema = z.object({
  notes: z.string().trim().min(5, "Informe os apontamentos de revisão.").max(5000),
});

// 8. Legacy Schemas for backward compatibility
export const ClientRequestSchema = z.object({
  service: z.string().trim().min(1),
  description: z.string().trim().min(10),
  desiredDate: z.string().optional().nullable(),
  hasMaterial: z.boolean().default(false),
  materialNotes: z.string().optional().nullable(),
  wantsContent: z.boolean().default(false),
  urgency: z.enum(["normal", "urgente"]).default("normal"),
  clientName: z.string().trim().min(2),
  clientEmail: z.string().trim().email(),
  clientWhatsapp: phone,
  consent: z.literal(true),
});

export const StatusLookupSchema = z.object({
  id: z.string().trim().min(3),
  email: z.string().trim().email(),
});

export const AdminAuthSchema = z.object({
  password: z.string().min(1),
});

export const AdminUpdateRequestSchema = z.object({
  password: z.string().min(1),
  id: z.string().min(1),
  status: z.string(),
  confirmedDueDate: z.string().optional().nullable(),
  revisionsUsed: z.number().int().min(0).optional(),
});
