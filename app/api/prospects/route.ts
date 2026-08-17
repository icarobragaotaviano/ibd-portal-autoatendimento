import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { LeadInputSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LeadInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, whatsapp, service, need_description, desired_deadline } = parsed.data;

    const prospect = await db.createProspect({
      name,
      email,
      whatsapp,
      service,
      need_description,
      desired_deadline,
      consent_at: new Date().toISOString(),
    });

    await db.createActivityLog({
      actor_type: "user",
      entity_type: "prospect",
      entity_id: prospect.id,
      event: "prospect.created",
      metadata: { service, email },
    });

    return NextResponse.json({ success: true, prospect }, { status: 201 });
  } catch (error) {
    console.error("Error creating prospect:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao registrar solicitação inicial." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const prospects = await db.listProspects();
    return NextResponse.json({ success: true, prospects });
  } catch (error) {
    console.error("Error listing prospects:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao listar prospects." },
      { status: 500 }
    );
  }
}
