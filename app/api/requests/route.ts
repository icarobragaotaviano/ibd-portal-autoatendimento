import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prospect = await db.createProspect({
      name: body.clientName || body.name,
      email: body.clientEmail || body.email,
      whatsapp: body.clientWhatsapp || body.whatsapp,
      service: body.service,
      need_description: body.description || body.need_description || "",
      desired_deadline: body.desiredDate || body.desired_deadline || null,
      consent_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: true,
        request: {
          id: prospect.id,
          status: prospect.stage,
          createdAt: prospect.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("request_create_error", error);
    return NextResponse.json(
      { error: "Não foi possível registrar a solicitação." },
      { status: 500 }
    );
  }
}
