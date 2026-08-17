import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";

export async function POST(request: NextRequest) {
  try {
    const prospects = await db.listProspects();
    return NextResponse.json({ ok: true, requests: prospects });
  } catch (error) {
    console.error("admin_list_error", error);
    return NextResponse.json({ error: "Erro ao listar" }, { status: 500 });
  }
}
