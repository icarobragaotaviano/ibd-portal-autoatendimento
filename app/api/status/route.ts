import { NextRequest, NextResponse } from "next/server";
import { getRequestRepository } from "@/lib/data";
import { StatusLookupSchema } from "@/lib/validation";
import { statusLabels, statusMessages } from "@/content/messages";
import { getServiceLabel } from "@/content/services";

export async function POST(request: NextRequest) {
  try {
    const parsed = StatusLookupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Informe protocolo e e-mail válidos." }, { status: 400 });
    }

    const record = await getRequestRepository().findByProtocolAndEmail(
      parsed.data.id,
      parsed.data.email,
    );

    if (!record) {
      return NextResponse.json(
        { error: "Solicitação não encontrada com esse protocolo e e-mail." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: record.id,
      service: getServiceLabel(record.service),
      status: record.status,
      statusLabel: statusLabels[record.status],
      message: statusMessages[record.status],
      desiredDate: record.desiredDate ?? null,
      confirmedDueDate: record.confirmedDueDate ?? null,
      revisionsUsed: record.revisionsUsed,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  } catch (error) {
    console.error("status_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Não foi possível consultar o status." }, { status: 500 });
  }
}
