import { z } from "zod";

export const MVP_SERVICE_OPTIONS = [
  { value: "identidade-visual", label: "Identidade Visual" },
  { value: "social-media", label: "Social Media" },
  { value: "landing-page", label: "Landing Page" },
  { value: "editorial", label: "Editorial" },
] as const;

export const MVP_SERVICE_SLUGS = [
  "identidade-visual",
  "social-media",
  "landing-page",
  "editorial",
  "apresentacao",
  "outro",
] as const;

export type MvpServiceSlug = (typeof MVP_SERVICE_SLUGS)[number];

const normalizeWhatsapp = (val: string) => {
  return val.replace(/[^\d+]/g, "").trim();
};

export const MvpBriefingInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 caracteres).")
    .max(120, "Nome muito longo (máximo 120 caracteres)."),
  whatsapp: z
    .string()
    .trim()
    .min(8, "Informe um WhatsApp válido com DDD.")
    .max(30, "Número de WhatsApp muito longo.")
    .transform((val) => normalizeWhatsapp(val))
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return digits.length >= 8 && digits.length <= 15;
      },
      { message: "Informe um número de WhatsApp válido com DDD." }
    ),
  service: z
    .string()
    .trim()
    .min(1, "Selecione o tipo de serviço desejado.")
    .refine((val) => MVP_SERVICE_SLUGS.includes(val as MvpServiceSlug), {
      message: "Selecione um serviço válido da lista.",
    }),
  projectSummary: z
    .string()
    .trim()
    .min(20, "Descreva seu projeto com pelo menos 20 caracteres.")
    .max(1500, "O resumo deve ter no máximo 1500 caracteres."),
  consent: z.boolean().refine((val) => val === true, {
    message: "É necessário concordar com os termos de contato para prosseguir.",
  }),
  website: z.string().optional().default(""), // Honeypot field
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
});

export type MvpBriefingInput = z.infer<typeof MvpBriefingInputSchema>;

export interface MvpBriefingPayload {
  leadId: string;
  source: string;
  name: string;
  whatsapp: string;
  service: string;
  projectSummary: string;
  consent: true;
  submittedAt: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}
