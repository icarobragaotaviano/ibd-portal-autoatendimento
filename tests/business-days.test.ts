import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import {
  isBusinessDay,
  addBusinessDays,
  getBusinessDaysDifference,
  checkReturnThresholds,
  TIMEZONE,
} from "@/lib/domain/business-days";

describe("Business Days Calculation (America/Fortaleza)", () => {
  it("identifies business days vs weekends correctly", () => {
    // 2026-08-17 is Monday
    const monday = DateTime.fromISO("2026-08-17T10:00:00", { zone: TIMEZONE });
    // 2026-08-22 is Saturday
    const saturday = DateTime.fromISO("2026-08-22T10:00:00", { zone: TIMEZONE });
    // 2026-08-23 is Sunday
    const sunday = DateTime.fromISO("2026-08-23T10:00:00", { zone: TIMEZONE });

    expect(isBusinessDay(monday)).toBe(true);
    expect(isBusinessDay(saturday)).toBe(false);
    expect(isBusinessDay(sunday)).toBe(false);
  });

  it("calculates difference skipping weekends", () => {
    // Friday 2026-08-14 to Tuesday 2026-08-18 (Friday -> Mon -> Tue = 2 days difference across weekend)
    const diff = getBusinessDaysDifference("2026-08-14T10:00:00", "2026-08-18T10:00:00");
    expect(diff).toBe(2);
  });

  it("adds business days correctly across weekend", () => {
    // Friday 2026-08-14 + 1 business day should be Monday 2026-08-17
    const result = addBusinessDays("2026-08-14T10:00:00", 1);
    expect(result.toISODate()).toBe("2026-08-17");
  });

  it("evaluates Day 3 and Day 6 return thresholds correctly", () => {
    // Sent on Monday 2026-08-17
    const sentAt = "2026-08-17T09:00:00";

    // After 2 business days (Wednesday 2026-08-19) -> not yet day 3
    const day2 = checkReturnThresholds(sentAt, "2026-08-19T09:00:00");
    expect(day2.businessDaysPassed).toBe(2);
    expect(day2.isDay3Due).toBe(false);
    expect(day2.isDay6Due).toBe(false);

    // After 3 business days (Thursday 2026-08-20) -> Day 3 follow-up is due
    const day3 = checkReturnThresholds(sentAt, "2026-08-20T09:00:00");
    expect(day3.businessDaysPassed).toBe(3);
    expect(day3.isDay3Due).toBe(true);
    expect(day3.isDay6Due).toBe(false);

    // After 6 business days (Tuesday 2026-08-25, skipping weekend) -> Day 6 pause is due
    const day6 = checkReturnThresholds(sentAt, "2026-08-25T09:00:00");
    expect(day6.businessDaysPassed).toBe(6);
    expect(day6.isDay3Due).toBe(false);
    expect(day6.isDay6Due).toBe(true);
  });
});
