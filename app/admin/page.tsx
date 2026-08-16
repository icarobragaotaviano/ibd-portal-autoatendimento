"use client";

import { useEffect, useState } from "react";
import { statusLabels } from "@/content/messages";
import { getServiceLabel } from "@/content/services";
import type { ClientRequestRecord, RequestStatus } from "@/lib/types";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [requests, setRequests] = useState<ClientRequestRecord[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ClientRequestRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Edit form states
  const [editStatus, setEditStatus] = useState<RequestStatus>("novo");
  const [editConfirmedDueDate, setEditConfirmedDueDate] = useState("");
  const [editRevisionsUsed, setEditRevisionsUsed] = useState(0);
  const [updating, setUpdating] = useState(false);

  // Read saved password from session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("ibd_admin_password");
    if (saved) {
      setPassword(saved);
      fetchRequests(saved);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    await fetchRequests(password);
  }

  async function fetchRequests(pwd: string) {
    try {
      const res = await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Falha na autenticação.");
      }
      setRequests(data.requests || []);
      setIsAuth(true);
      sessionStorage.setItem("ibd_admin_password", pwd);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Erro ao carregar dados.");
      setIsAuth(false);
      sessionStorage.removeItem("ibd_admin_password");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setPassword("");
    setIsAuth(false);
    setRequests([]);
    setSelectedRequest(null);
    sessionStorage.removeItem("ibd_admin_password");
  }

  function selectRequestForEdit(req: ClientRequestRecord) {
    setSelectedRequest(req);
    setEditStatus(req.status);
    setEditConfirmedDueDate(req.confirmedDueDate || "");
    setEditRevisionsUsed(req.revisionsUsed || 0);
    setUpdateError("");
    setSuccessMessage("");
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRequest) return;
    setUpdating(true);
    setUpdateError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/admin/requests/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          id: selectedRequest.id,
          status: editStatus,
          confirmedDueDate: editConfirmedDueDate || null,
          revisionsUsed: Number(editRevisionsUsed),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Falha ao atualizar solicitação.");
      }
      setSuccessMessage("Solicitação atualizada com sucesso!");

      // Update local requests list
      setRequests((prev) =>
        prev.map((r) => (r.id === selectedRequest.id ? data.request : r))
      );
      setSelectedRequest(data.request);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Erro ao atualizar.");
    } finally {
      setUpdating(false);
    }
  }

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuth) {
    return (
      <section className="section text-white">
        <div className="container-shell max-w-md mt-12">
          <div className="card p-7 md:p-9 grid gap-6">
            <div>
              <div className="eyebrow">Área Restrita</div>
              <h1 className="display text-4xl mt-3">Acesso Administrativo</h1>
              <p className="text-muted text-sm mt-3">Informe a senha administrativa para gerenciar as demandas do estúdio.</p>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="field">
                <label htmlFor="adminPassword">Senha de acesso</label>
                <input
                  id="adminPassword"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha..."
                  required
                />
              </div>
              {authError && (
                <div className="rounded-xl border border-red-900 bg-red-950/50 p-4 text-sm text-red-400" role="alert">
                  {authError}
                </div>
              )}
              <button className="btn-primary w-full" disabled={loading}>
                {loading ? "Verificando..." : "Entrar no painel"}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section text-white">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow">Painel Administrativo</div>
            <h1 className="display text-5xl md:text-6xl mt-4">Controle de Demandas</h1>
          </div>
          <button className="btn-secondary !min-h-10" onClick={handleLogout}>
            Sair do Painel
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* List Section */}
          <div className="card p-6 grid gap-5 self-start">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <h2 className="display text-2xl text-white">Solicitações Registradas</h2>
              <span className="pill">{filteredRequests.length} filtradas</span>
            </div>

            {/* Filters */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="field">
                <label htmlFor="search">Pesquisar</label>
                <input
                  id="search"
                  className="input"
                  placeholder="Protocolo, nome ou e-mail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="filterStatus">Filtrar por Status</label>
                <select
                  id="filterStatus"
                  className="input"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  {Object.entries(statusLabels).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table/List */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-sm border-collapse text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 font-extrabold text-xs uppercase text-muted">Protocolo</th>
                    <th className="py-3 font-extrabold text-xs uppercase text-muted">Cliente</th>
                    <th className="py-3 font-extrabold text-xs uppercase text-muted">Serviço</th>
                    <th className="py-3 font-extrabold text-xs uppercase text-muted">Status</th>
                    <th className="py-3 font-extrabold text-xs uppercase text-muted text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted">
                        Nenhuma solicitação encontrada com os filtros atuais.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className={`hover:bg-white/5 transition-colors ${
                          selectedRequest?.id === req.id
                            ? "bg-[#ffd400]/10 border-l-2 border-[#ffd400] font-medium"
                            : ""
                        }`}
                      >
                        <td className="py-3.5 pr-2 font-mono text-xs font-bold text-[#ffd400]">{req.id}</td>
                        <td className="py-3.5 pr-2">
                          <span className="block font-bold">{req.clientName}</span>
                          <span className="block text-xs text-muted">{req.clientEmail}</span>
                        </td>
                        <td className="py-3.5 pr-2">
                          <span className="font-bold">{getServiceLabel(req.service)}</span>
                          {req.urgency === "urgente" && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-red-950/80 border border-red-800/30 px-2 py-0.5 text-2xs font-extrabold text-red-400 uppercase tracking-wider">
                              Urgente
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1c1c1c] px-2 py-1 text-xs">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                req.status === "concluido"
                                  ? "bg-green-500"
                                  : req.status === "pausado"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                              }`}
                            />
                            {statusLabels[req.status]}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            type="button"
                            className="btn-secondary !min-h-8 !px-3 text-xs"
                            onClick={() => selectRequestForEdit(req)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit/Details Section */}
          <div className="card p-6 md:p-7 grid gap-6 self-start lg:sticky lg:top-24">
            <h2 className="display text-2xl border-b border-white/10 pb-3">
              Detalhes & Gestão
            </h2>

            {selectedRequest ? (
              <form onSubmit={handleUpdate} className="grid gap-5">
                <div>
                  <span className="text-2xs font-black uppercase tracking-wider text-muted">
                    Protocolo em edição
                  </span>
                  <div className="text-3xl font-mono font-bold mt-1 text-[#ffd400]">
                    {selectedRequest.id}
                  </div>
                </div>

                <div className="grid gap-1.5 bg-[#161616] border border-white/10 rounded-2xl p-4 text-xs text-white">
                  <div>
                    <strong>Cliente:</strong> {selectedRequest.clientName}
                  </div>
                  <div>
                    <strong>E-mail:</strong> {selectedRequest.clientEmail}
                  </div>
                  <div>
                    <strong>WhatsApp:</strong> {selectedRequest.clientWhatsapp}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <strong>Descrição da necessidade:</strong>
                    <p className="mt-1 text-[#d4d4d4] whitespace-pre-wrap leading-5">
                      {selectedRequest.description}
                    </p>
                  </div>
                  {selectedRequest.materialNotes && (
                    <div className="mt-2">
                      <strong>Notas de material:</strong>
                      <p className="mt-1 text-[#d4d4d4] leading-5">
                        {selectedRequest.materialNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="editStatus">Status do Projeto</label>
                  <select
                    id="editStatus"
                    className="input font-bold"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as RequestStatus)}
                  >
                    {Object.entries(statusLabels).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="editConfirmedDueDate">Prazo Confirmado (Entrega)</label>
                  <input
                    id="editConfirmedDueDate"
                    type="date"
                    className="input"
                    value={editConfirmedDueDate}
                    onChange={(e) => setEditConfirmedDueDate(e.target.value)}
                  />
                  <small className="text-muted">
                    Defina a data final acertada após a aprovação do briefing e recebimento do material.
                  </small>
                </div>

                <div className="field">
                  <label htmlFor="editRevisionsUsed">Rodadas de Revisão Usadas</label>
                  <input
                    id="editRevisionsUsed"
                    type="number"
                    min="0"
                    max="10"
                    className="input"
                    value={editRevisionsUsed}
                    onChange={(e) => setEditRevisionsUsed(Number(e.target.value))}
                  />
                  <small className="text-muted">Geralmente o plano padrão inclui até 2 rodadas.</small>
                </div>

                {updateError && (
                  <div className="rounded-xl border border-red-900 bg-red-950/50 p-4 text-sm text-red-400" role="alert">
                    {updateError}
                  </div>
                )}

                {successMessage && (
                  <div className="rounded-xl border border-green-900 bg-green-950/50 p-4 text-sm text-green-400" role="alert">
                    {successMessage}
                  </div>
                )}

                <button className="btn-primary w-full" disabled={updating}>
                  {updating ? "Salvando..." : "Salvar Alterações"}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center text-muted text-sm border border-dashed border-white/20 rounded-2xl p-4">
                Selecione uma solicitação na lista para visualizar detalhes e atualizar seu status ou prazo.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
