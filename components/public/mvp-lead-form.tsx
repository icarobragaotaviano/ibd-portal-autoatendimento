"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MVP_SERVICE_OPTIONS, type MvpServiceSlug } from "@/lib/validation/briefing";

interface MvpLeadFormProps {
  initialService?: string;
}

export function MvpLeadForm({ initialService = "identidade-visual" }: MvpLeadFormProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [service, setService] = useState<string>(initialService);
  const [projectSummary, setProjectSummary] = useState("");
  const [consent, setConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");

  // UTM tracking from URL query parameters without cookies
  const [utmParams, setUtmParams] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get("utm_source") || undefined;
      const utmMedium = searchParams.get("utm_medium") || undefined;
      const utmCampaign = searchParams.get("utm_campaign") || undefined;
      if (utmSource || utmMedium || utmCampaign) {
        setUtmParams({ utmSource, utmMedium, utmCampaign });
      }

      const serviceQuery = searchParams.get("service");
      if (serviceQuery) {
        const found = MVP_SERVICE_OPTIONS.find((s) => s.value === serviceQuery);
        if (found) {
          setService(found.value);
        }
      }
    }
  }, []);

  // Listen to external custom events or prop changes (e.g. from service cards)
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [protocol, setProtocol] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Client-side quick validation before dispatch
  function validate() {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Informe seu nome (mínimo 2 caracteres).";
    }

    const cleanPhone = whatsapp.replace(/[^\d+]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.whatsapp = "Informe um WhatsApp válido com DDD.";
    }

    if (!service) {
      errs.service = "Selecione o serviço desejado.";
    }

    if (!projectSummary.trim() || projectSummary.trim().length < 20) {
      errs.projectSummary = "Descreva seu projeto com pelo menos 20 caracteres.";
    } else if (projectSummary.trim().length > 1500) {
      errs.projectSummary = "O resumo deve ter no máximo 1500 caracteres.";
    }

    if (!consent) {
      errs.consent = "Você precisa concordar com os termos para enviar a solicitação.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setGeneralError(null);

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          service,
          projectSummary: projectSummary.trim(),
          consent,
          website: websiteHoneypot, // invisible honeypot
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setProtocol(data.leadId || "IBD-2026-SOLICITACAO");
        setStatus("success");
      } else {
        setStatus("error");
        setGeneralError(
          "Não consegui enviar sua solicitação agora. Verifique sua conexão e tente novamente."
        );
      }
    } catch {
      setStatus("error");
      setGeneralError(
        "Não consegui enviar sua solicitação agora. Verifique sua conexão e tente novamente."
      );
    }
  }

  function handleReset() {
    setName("");
    setWhatsapp("");
    setProjectSummary("");
    setConsent(false);
    setErrors({});
    setGeneralError(null);
    setStatus("idle");
    setProtocol(null);
  }

  return (
    <div
      id="solicitar"
      className="w-full max-w-2xl mx-auto rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative subtle accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

      {/* Header */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="eyebrow">Solicitação Direta</span>
          <span className="h-1 w-1 rounded-full bg-[var(--border-hover)]" />
          <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">
            Resposta em até 24h úteis
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          Vamos falar sobre o seu projeto?
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Não precisa escrever um briefing perfeito. Me dê o contexto inicial e eu organizo o
          restante com você.
        </p>
      </div>

      {/* Live Region for Screen Readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "submitting" && "Enviando solicitação de projeto, por favor aguarde..."}
        {status === "success" && `Briefing recebido com sucesso. Protocolo ${protocol}.`}
        {status === "error" && (generalError || "Erro ao enviar solicitação.")}
      </div>

      {/* State: SUCCESS */}
      {status === "success" && (
        <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-300">
          <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-hover)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Briefing recebido!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Recebi sua solicitação. Entrarei em contato em até{" "}
                <strong className="text-[var(--text-primary)]">24 horas úteis</strong> para
                organizar os próximos passos.
              </p>
              {protocol && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--surface-strong)] border border-[var(--border)] text-xs font-mono font-semibold text-[var(--accent)]">
                  <span>Protocolo:</span>
                  <span className="tracking-wider">{protocol}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
              <span>Seus dados estão protegidos de acordo com a LGPD.</span>
            </div>

            <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Nova solicitação
            </Button>
          </div>
        </div>
      )}

      {/* State: ERROR Banner */}
      {status === "error" && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-xs text-[var(--text-primary)] animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-2">
            <p className="leading-relaxed font-medium">
              {generalError ||
                "Não consegui enviar sua solicitação agora. Verifique sua conexão e tente novamente."}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-xs font-mono font-semibold text-[var(--accent)] hover:underline self-start"
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </div>
      )}

      {/* State: FORM (idle / submitting / error retry) */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Honeypot field (hidden visually and from screen readers) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="website-field">Website</label>
            <input
              id="website-field"
              type="text"
              name="website"
              value={websiteHoneypot}
              onChange={(e) => setWebsiteHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Grid 2 cols for Name & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              id="lead-name"
              label="Seu nome"
              placeholder="Como posso te chamar?"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={errors.name}
              required
              disabled={status === "submitting"}
              autoComplete="name"
            />

            <Input
              id="lead-whatsapp"
              label="WhatsApp com DDD"
              placeholder="(DDD) 99999-9999"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
                if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: "" }));
              }}
              error={errors.whatsapp}
              required
              disabled={status === "submitting"}
              autoComplete="tel"
              type="tel"
            />
          </div>

          {/* Service Selection */}
          <Select
            id="lead-service"
            label="Serviço desejado"
            options={MVP_SERVICE_OPTIONS as unknown as { value: string; label: string }[]}
            value={service}
            onChange={(e) => {
              setService(e.target.value as MvpServiceSlug);
              if (errors.service) setErrors((prev) => ({ ...prev, service: "" }));
            }}
            error={errors.service}
            required
            disabled={status === "submitting"}
          />

          {/* Project Summary */}
          <div className="flex flex-col gap-1.5 w-full">
            <Textarea
              id="lead-summary"
              label="Resumo do projeto"
              placeholder="O que você precisa criar, para quem é e qual é o principal objetivo?"
              rows={4}
              value={projectSummary}
              onChange={(e) => {
                setProjectSummary(e.target.value);
                if (errors.projectSummary) setErrors((prev) => ({ ...prev, projectSummary: "" }));
              }}
              error={errors.projectSummary}
              required
              disabled={status === "submitting"}
              maxLength={1500}
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] px-1">
              <span>Mínimo 20 caracteres</span>
              <span className={projectSummary.length > 1400 ? "text-[var(--warning)]" : ""}>
                {projectSummary.length}/1500
              </span>
            </div>
          </div>

          {/* LGPD Consent Checkbox */}
          <div className="pt-2">
            <Checkbox
              id="lead-consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
              }}
              error={errors.consent}
              disabled={status === "submitting"}
              label={
                <span className="text-xs text-[var(--text-secondary)] leading-snug">
                  Concordo com o uso destes dados pelo IBD para analisar minha solicitação e entrar em
                  contato comigo sobre este projeto.{" "}
                  <Link
                    href="/privacidade"
                    className="text-[var(--accent)] hover:underline font-mono text-[11px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Política de Privacidade
                  </Link>
                </span>
              }
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold uppercase tracking-wider"
              isLoading={status === "submitting"}
              disabled={status === "submitting"}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              {status === "submitting" ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO DE PROJETO"}
            </Button>
          </div>

          {/* Security & Response Guarantee microcopy */}
          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Sem spam. Seus dados nunca serão compartilhados com terceiros.</span>
          </div>
        </form>
      )}
    </div>
  );
}
