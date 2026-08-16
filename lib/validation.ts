import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, "Informe um WhatsApp válido.")
  .max(30, "WhatsApp muito longo.");

export const BookingSchema = z.object({
  service: z.string().trim().min(1).max(80),
  start: z.string().datetime({ offset: true }),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  whatsapp: phone,
  notes: z.string().trim().min(3).max(1500),
  consent: z.literal(true),
});

export const ClientRequestSchema = z.object({
  service: z.string().trim().min(1).max(100),
  description: z.string().trim().min(10).max(4000),
  desiredDate: z.union([z.literal(""), z.string().date()]).optional().transform((v) => v || undefined),
  hasMaterial: z.boolean(),
  materialNotes: z.string().trim().max(1500).optional(),
  wantsContent: z.boolean(),
  urgency: z.enum(["normal", "urgente"]),
  clientName: z.string().trim().min(2).max(120),
  clientEmail: z.string().trim().email().max(254),
  clientWhatsapp: phone,
  consent: z.literal(true),
});

export const StatusLookupSchema = z.object({
  id: z.string().trim().min(5).max(40).transform((v) => v.toUpperCase()),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
});

export const AdminAuthSchema = z.object({
  password: z.string().min(1, "A senha é obrigatória."),
});

export const AdminUpdateRequestSchema = z.object({
  password: z.string().min(1, "A senha é obrigatória."),
  id: z.string().trim().min(5).max(40),
  status: z.enum([
    "novo",
    "briefing_em_andamento",
    "briefing_aprovado",
    "aguardando_material",
    "em_producao",
    "versao_enviada",
    "aguardando_retorno",
    "pausado",
    "revisao_em_andamento",
    "concluido",
  ]),
  confirmedDueDate: z
    .union([z.literal(""), z.string().date(), z.null()])
    .optional()
    .transform((v) => v || null),
  revisionsUsed: z.number().int().min(0).max(10),
});
