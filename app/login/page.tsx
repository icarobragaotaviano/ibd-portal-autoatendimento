"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      if (isAdminMode) {
        if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ibd2026admin")) {
          // Set mock admin cookie / storage
          sessionStorage.setItem("ibd_admin_password", password);
          document.cookie = `ibd_mock_auth=${JSON.stringify({
            id: "admin-user-id",
            email: "icaro@icarobraga.com",
            role: "admin",
          })}; path=/`;
          router.push("/admin");
          return;
        } else {
          setError("Senha administrativa incorreta.");
          return;
        }
      }

      // Client login simulation
      if (email.toLowerCase().includes("vertice") || email.toLowerCase().includes("demo") || email.toLowerCase().includes("cliente")) {
        document.cookie = `ibd_mock_auth=${JSON.stringify({
          id: "client-user-id-demo",
          email: email.toLowerCase(),
          role: "client",
        })}; path=/`;
        router.push("/portal");
        return;
      }

      setMessage("Link de acesso enviado para seu e-mail. Verifique sua caixa de entrada.");
    } catch {
      setError("Falha ao autenticar. Verifique seus dados.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section spacing="lg" className="pt-12 sm:pt-20 pb-24">
      <Container size="sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="eyebrow">Acesso Exclusivo</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              {isAdminMode ? "Painel Administrativo" : "Portal do Cliente"}
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              {isAdminMode
                ? "Acesso restrito ao estúdio para gestão de demandas."
                : "Acesso reservado a clientes com contrato ativo no IBD."}
            </p>
          </div>

          {error && (
            <Alert variant="danger" title="Erro de Acesso">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="success" title="E-mail Enviado">
              {message}
            </Alert>
          )}

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {!isAdminMode ? (
                <>
                  <Input
                    type="email"
                    label="Seu E-mail Cadastrado"
                    placeholder="cliente@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    leftIcon={<Mail className="w-4 h-4" />}
                    helperText="Utilize o mesmo e-mail informado no contrato do projeto."
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Acessar Portal do Cliente
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    type="password"
                    label="Senha do Administrador"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    leftIcon={<Lock className="w-4 h-4" />}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isLoading}
                    >
                      Entrar no Painel
                    </Button>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminMode(!isAdminMode);
                    setError(null);
                    setMessage(null);
                  }}
                  className="font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {isAdminMode ? "← Entrar como Cliente" : "Acesso Admin →"}
                </button>

                {!isAdminMode && (
                  <Link
                    href="/comecar"
                    className="font-mono text-[var(--accent)] hover:underline"
                  >
                    Não é cliente? Comece aqui
                  </Link>
                )}
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
