"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { services } from "@/content/services";

export default function PortalSolicitarPage() {
  const router = useRouter();
  const [service, setService] = useState<string>(services[0].value);
  const [title, setTitle] = useState("");
  const [scopeDescription, setScopeDescription] = useState("");
  const [desiredDeadline, setDesiredDeadline] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          title,
          scope_description: scopeDescription,
          desired_deadline: desiredDeadline || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Falha ao registrar nova demanda.");
      }

      router.push(`/portal/projetos/${json.project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  const serviceOptions = services.map((s) => ({
    value: s.value,
    label: s.label,
  }));

  return (
    <Section spacing="lg" className="pt-6 sm:pt-12 pb-24">
      <Container size="md">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar ao Painel
              </Button>
            </Link>
          </div>

          <PageHeader
            eyebrow="Nova Demanda • Cliente Ativo"
            title="Solicitar Novo Projeto"
            description="Abra uma nova demanda no estúdio. Ela entrará imediatamente na fila de análise da equipe."
          />

          {error && (
            <Alert variant="danger" title="Não foi possível enviar">
              {error}
            </Alert>
          )}

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Select
                label="Tipo de Serviço"
                options={serviceOptions}
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              />

              <Input
                label="Título do Projeto"
                placeholder="Ex: Landing Page de Lançamento Q4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Textarea
                label="Descrição e Objetivos"
                placeholder="Detalhe o contexto, público-alvo e o que precisa ser desenvolvido..."
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                required
                rows={5}
              />

              <Input
                type="date"
                label="Data Desejada para Entrega (Estimativa Inicial)"
                value={desiredDeadline}
                onChange={(e) => setDesiredDeadline(e.target.value)}
                helperText="O prazo oficial será confirmado após a aprovação do briefing e recebimento de materiais."
              />

              <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
