import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";

export async function GET() {
  try {
    const clients = await db.listClients();
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error("Error listing clients:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao listar clientes." },
      { status: 500 }
    );
  }
}
