import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prospect = await db.getProspect(id);

    if (!prospect) {
      return NextResponse.json(
        { success: false, error: "Prospect não encontrado." },
        { status: 404 }
      );
    }

    const briefing = await db.getBriefingByProspectId(id);
    const proposals = await db.listProposalsByProspect(id);
    const contract = await db.getContractByProspect(id);
    const activityLogs = await db.listActivityLogs("prospect", id);

    let client = null;
    if (prospect.converted_client_id) {
      client = await db.getClient(prospect.converted_client_id);
    }

    return NextResponse.json({
      success: true,
      prospect,
      briefing,
      proposals,
      contract,
      client,
      activityLogs,
    });
  } catch (error) {
    console.error("Error fetching prospect details:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao buscar detalhes do prospect." },
      { status: 500 }
    );
  }
}
