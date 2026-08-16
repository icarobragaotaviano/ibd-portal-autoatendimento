import { NextRequest, NextResponse } from "next/server";
import { getRequestRepository } from "@/lib/data";
import { AdminUpdateRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = AdminUpdateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revise os campos da atualização.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { password, id, status, confirmedDueDate, revisionsUsed } = parsed.data;

    const expectedPassword = process.env.ADMIN_PASSWORD || "ibdadmin";
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }

    const repo = getRequestRepository();
    const updated = await repo.update(id, {
      status,
      confirmedDueDate,
      revisionsUsed,
    });

    return NextResponse.json({ ok: true, request: updated });
  } catch (error) {
    console.error("admin_update_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível atualizar a solicitação." },
      { status: 500 },
    );
  }
}
