import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { ContractInputSchema } from "@/lib/validation";
import { ContractStatus } from "@/lib/domain/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContractInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prospect_id, proposal_id, start_date, file_path, notes } = parsed.data;

    // Check if contract already exists for prospect
    const existing = await db.getContractByProspect(prospect_id);
    if (existing) {
      const updated = await db.updateContractStatus(existing.id, "signed", new Date().toISOString());
      await db.updateProspectStage(prospect_id, "contrato_fechado");
      return NextResponse.json({ success: true, contract: updated });
    }

    const contract = await db.createContract({
      prospect_id,
      proposal_id: proposal_id || null,
      status: "signed", // When admin registers contract, status is marked signed
      signed_at: new Date().toISOString(),
      start_date: start_date || null,
      file_path: file_path || null,
      notes: notes || null,
    });

    await db.updateProspectStage(prospect_id, "contrato_fechado");

    await db.createActivityLog({
      actor_type: "admin",
      entity_type: "contract",
      entity_id: contract.id,
      event: "contract.signed",
      metadata: { prospect_id },
    });

    return NextResponse.json({ success: true, contract }, { status: 201 });
  } catch (error) {
    console.error("Error creating contract:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao registrar contrato." },
      { status: 500 }
    );
  }
}
