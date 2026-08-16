import { NextRequest, NextResponse } from "next/server";
import { getRequestRepository } from "@/lib/data";
import { AdminAuthSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = AdminAuthSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Senha é obrigatória." }, { status: 400 });
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || "ibdadmin";
    if (parsed.data.password !== expectedPassword) {
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }

    const repo = getRequestRepository();
    const list = await repo.listAll();

    return NextResponse.json({ ok: true, requests: list });
  } catch (error) {
    console.error("admin_list_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível carregar as solicitações." },
      { status: 500 },
    );
  }
}
