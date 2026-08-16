import { NextRequest, NextResponse } from "next/server";
import { DateTime } from "luxon";
import { getCalendarProvider } from "@/lib/services/calendar";
import { getSchedulingConfig } from "@/lib/config";
import { filterFreeSlots, generateCandidateSlots } from "@/lib/scheduling";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Data inválida. Use YYYY-MM-DD." }, { status: 400 });
  }

  try {
    const config = getSchedulingConfig();
    const parsed = DateTime.fromISO(date, { zone: config.timezone });
    if (!parsed.isValid) {
      return NextResponse.json({ error: "Data inválida." }, { status: 400 });
    }

    const candidates = generateCandidateSlots(date, config);
    if (!candidates.length) return NextResponse.json({ date, slots: [] });

    const busy = await getCalendarProvider().getBusyIntervals(date);
    const slots = filterFreeSlots(candidates, busy, config);
    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error("availability_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível consultar a agenda agora." },
      { status: 500 },
    );
  }
}
