import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (id && status) {
      await db.updateProjectStatus(id, status);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin_update_error", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}
