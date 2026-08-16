import { neon } from "@neondatabase/serverless";
import type { ClientRequestRecord } from "@/lib/types";
import type { RequestRepository } from "@/lib/data/types";
import { createProtocol } from "@/lib/ids";

function sqlClient() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada.");
  return neon(process.env.DATABASE_URL);
}

function mapRow(row: Record<string, unknown>): ClientRequestRecord {
  return {
    id: String(row.id),
    service: String(row.service),
    description: String(row.description),
    desiredDate: row.desired_date ? String(row.desired_date).slice(0, 10) : undefined,
    hasMaterial: Boolean(row.has_material),
    materialNotes: row.material_notes ? String(row.material_notes) : undefined,
    wantsContent: Boolean(row.wants_content),
    urgency: row.urgency === "urgente" ? "urgente" : "normal",
    clientName: String(row.client_name),
    clientEmail: String(row.client_email),
    clientWhatsapp: String(row.client_whatsapp),
    consent: true,
    status: row.status as ClientRequestRecord["status"],
    confirmedDueDate: row.confirmed_due_date ? String(row.confirmed_due_date).slice(0, 10) : null,
    revisionsUsed: Number(row.revisions_used ?? 0),
    consentedAt: new Date(String(row.consented_at)).toISOString(),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export const neonRequestRepository: RequestRepository = {
  async create(input) {
    const sql = sqlClient();
    const id = createProtocol();
    const consentedAt = new Date().toISOString();
    const rows = await sql`
      INSERT INTO client_requests (
        id, service, description, desired_date, has_material, material_notes,
        wants_content, urgency, client_name, client_email, client_whatsapp,
        status, revisions_used, consented_at
      ) VALUES (
        ${id}, ${input.service}, ${input.description}, ${input.desiredDate ?? null},
        ${input.hasMaterial}, ${input.materialNotes ?? null}, ${input.wantsContent},
        ${input.urgency}, ${input.clientName}, ${input.clientEmail.toLowerCase()},
        ${input.clientWhatsapp}, 'novo', 0, ${consentedAt}
      )
      RETURNING *
    `;
    return mapRow(rows[0] as Record<string, unknown>);
  },

  async findByProtocolAndEmail(id, email) {
    const sql = sqlClient();
    const rows = await sql`
      SELECT * FROM client_requests
      WHERE id = ${id.toUpperCase()} AND LOWER(client_email) = ${email.toLowerCase()}
      LIMIT 1
    `;
    return rows[0] ? mapRow(rows[0] as Record<string, unknown>) : null;
  },

  async listAll() {
    const sql = sqlClient();
    const rows = await sql`
      SELECT * FROM client_requests
      ORDER BY created_at DESC
    `;
    return rows.map((row) => mapRow(row as Record<string, unknown>));
  },

  async update(id, updates) {
    const sql = sqlClient();
    const updatedAt = new Date().toISOString();

    const rows = await sql`
      SELECT * FROM client_requests WHERE id = ${id.toUpperCase()} LIMIT 1
    `;
    if (!rows[0]) throw new Error("Solicitação não encontrada.");

    const record = mapRow(rows[0] as Record<string, unknown>);
    const status = updates.status ?? record.status;
    const confirmedDueDate =
      updates.confirmedDueDate !== undefined ? updates.confirmedDueDate : record.confirmedDueDate;
    const revisionsUsed =
      updates.revisionsUsed !== undefined ? updates.revisionsUsed : record.revisionsUsed;

    const updatedRows = await sql`
      UPDATE client_requests
      SET status = ${status},
          confirmed_due_date = ${confirmedDueDate ?? null},
          revisions_used = ${revisionsUsed},
          updated_at = ${updatedAt}
      WHERE id = ${id.toUpperCase()}
      RETURNING *
    `;
    return mapRow(updatedRows[0] as Record<string, unknown>);
  },
};
