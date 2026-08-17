import { NextRequest, NextResponse } from "next/server";
import { calendarService } from "@/lib/services/calendar";
import { DateTime } from "luxon";
import { TIMEZONE } from "@/lib/domain/business-days";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || DateTime.now().setZone(TIMEZONE).toISODate();
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Data inválida. Use YYYY-MM-DD." }, { status: 400 });
  }

  try {
    const slots = await calendarService.getAvailableSlots(date);
    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error("availability_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível consultar a agenda agora." },
      { status: 500 }
    );
  }
}
