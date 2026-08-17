import { NextRequest, NextResponse } from "next/server";
import { calendarService } from "@/lib/services/calendar";
import { DateTime } from "luxon";
import { TIMEZONE } from "@/lib/domain/business-days";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || DateTime.now().setZone(TIMEZONE).toISODate();

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Parâmetro date é obrigatório (YYYY-MM-DD)." },
        { status: 400 }
      );
    }

    const slots = await calendarService.getAvailableSlots(date);
    return NextResponse.json({ success: true, date, slots });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao consultar disponibilidade." },
      { status: 500 }
    );
  }
}
