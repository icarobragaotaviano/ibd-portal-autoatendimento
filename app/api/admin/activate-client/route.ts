import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { emailProvider } from "@/lib/services/email";
import { clientInviteTemplate } from "@/lib/services/email/templates";
import { ActivateClientSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ActivateClientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prospect_id, company_name, notes } = parsed.data;

    // 1. Fetch Prospect
    const prospect = await db.getProspect(prospect_id);
    if (!prospect) {
      return NextResponse.json(
        { success: false, error: "Prospect não encontrado." },
        { status: 404 }
      );
    }

    // 2. Idempotency Check: Already converted?
    if (prospect.stage === "convertido" && prospect.converted_client_id) {
      const existingClient = await db.getClient(prospect.converted_client_id);
      if (existingClient) {
        return NextResponse.json({
          success: true,
          message: "Cliente já ativado anteriormente.",
          client: existingClient,
        });
      }
    }

    // 3. Validate Contract: must have a signed contract
    const contract = await db.getContractByProspect(prospect_id);
    if (!contract || contract.status !== "signed") {
      return NextResponse.json(
        {
          success: false,
          error:
            "A ativação do cliente exige um contrato com status assinado (signed).",
        },
        { status: 400 }
      );
    }

    // 4. Check if client with this email already exists or create new
    let client = await db.getClientByEmail(prospect.email);
    if (!client) {
      client = await db.createClient({
        prospect_id: prospect.id,
        name: prospect.name,
        email: prospect.email,
        whatsapp: prospect.whatsapp,
        company_name: company_name || null,
        status: "ativo",
        portal_enabled: true,
        notes: notes || null,
      });
    } else {
      client = await db.updateClient(client.id, {
        portal_enabled: true,
        status: "ativo",
        prospect_id: prospect.id,
      });
    }

    // 5. Create / Upsert Profile with role = 'client'
    const authUserId = `auth-user-${client.id.toLowerCase()}`;
    await db.upsertProfile({
      auth_user_id: authUserId,
      role: "client",
      display_name: client.name,
      email: client.email,
    });

    await db.updateClient(client.id, {
      auth_user_id: authUserId,
    });

    // 6. Update prospect stage to convertido
    await db.updateProspectStage(prospect.id, "convertido", client.id);

    // 7. Register in Activity Log
    await db.createActivityLog({
      actor_type: "admin",
      entity_type: "client",
      entity_id: client.id,
      event: "client.activated",
      metadata: {
        prospect_id: prospect.id,
        client_name: client.name,
        email: client.email,
      },
    });

    // 8. Send Invitation Email via Resend
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const loginUrl = `${appUrl}/login?email=${encodeURIComponent(client.email)}`;

    const emailHtml = clientInviteTemplate({
      clientName: client.name,
      loginUrl,
    });

    await emailProvider.sendEmail({
      to: client.email,
      subject: "Seu acesso ao Portal do Cliente IBD foi ativado",
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Cliente ativado com sucesso.",
      client,
    });
  } catch (error) {
    console.error("Error activating client:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao ativar cliente." },
      { status: 500 }
    );
  }
}
