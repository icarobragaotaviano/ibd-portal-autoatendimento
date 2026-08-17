import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { StatusLookupSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const parsed = StatusLookupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Informe protocolo e e-mail válidos." }, { status: 400 });
    }

    const prospect = await db.getProspect(parsed.data.id);
    if (!prospect || prospect.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
      return NextResponse.json(
        { error: "Solicitação não encontrada com esse protocolo e e-mail." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: prospect.id,
      service: prospect.service,
      status: prospect.stage,
      statusLabel: prospect.stage,
      desiredDate: prospect.desired_deadline ?? null,
      createdAt: prospect.created_at,
      updatedAt: prospect.updated_at,
    });
  } catch (error) {
    console.error("status_error", error);
    return NextResponse.json({ error: "Não foi possível consultar o status." }, { status: 500 });
  }
}
