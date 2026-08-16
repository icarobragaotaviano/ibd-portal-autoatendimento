import { NextRequest, NextResponse } from "next/server";
import { getRequestRepository } from "@/lib/services/database";
import { ClientRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ClientRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revise os campos da solicitação.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const record = await getRequestRepository().create(parsed.data);
    return NextResponse.json(
      {
        ok: true,
        request: {
          id: record.id,
          status: record.status,
          createdAt: record.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("request_create_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível registrar a solicitação." },
      { status: 500 },
    );
  }
}
