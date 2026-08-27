import { describe, expect, test } from "vitest";
import {
  formatEventTiming,
  getOrdinalSuffix,
  isDateOnlyInput,
  isLateNightContinuation,
  normalizeEventEnd,
  parseCalendarDate,
} from "../../src/scripts/calendar-date";

const localDate = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
) => new Date(year, month - 1, day, hour, minute);

describe("calendar date formatting", () => {
  test("parses date-only values locally and rejects invalid values", () => {
    const parsed = parseCalendarDate("2028-02-29");
    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2028);
    expect(parsed?.getMonth()).toBe(1);
    expect(parsed?.getDate()).toBe(29);
    expect(parsed?.getHours()).toBe(0);
    expect(parseCalendarDate("2027-02-29")).toBeNull();
    expect(parseCalendarDate("not-a-date")).toBeNull();
    expect(parseCalendarDate(undefined)).toBeNull();
    expect(isDateOnlyInput("2026-08-28")).toBe(true);
    expect(isDateOnlyInput("2026-08-28T00:00:00Z")).toBe(false);
  });

  test("clones Date inputs and respects offsets in timed strings", () => {
    const source = localDate(2026, 8, 28, 16);
    const clone = parseCalendarDate(source);
    expect(clone).toEqual(source);
    expect(clone).not.toBe(source);
    expect(parseCalendarDate("2026-08-28T16:00:00+02:00")?.getTime()).toBe(
      Date.parse("2026-08-28T14:00:00Z"),
    );
  });

  test.each([
    [1, "st"],
    [2, "nd"],
    [3, "rd"],
    [4, "th"],
    [11, "th"],
    [12, "th"],
    [13, "th"],
    [21, "st"],
    [22, "nd"],
    [23, "rd"],
    [31, "st"],
  ])("uses the correct suffix for %i", (day, suffix) => {
    expect(getOrdinalSuffix(day)).toBe(suffix);
  });

  test("formats a single-day all-day event without a time", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28),
        end: localDate(2026, 8, 29),
        allDay: true,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "" });
  });

  test("formats an all-day event without an explicit end", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28),
        allDay: true,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "" });
  });

  test("treats a multi-day all-day end as exclusive", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 29),
        end: localDate(2026, 9, 4),
        allDay: true,
      }),
    ).toEqual({
      date: "29th August - 3rd September",
      time: "6 days",
    });
  });

  test("counts all-day spans by date across DST seasons", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 3, 28),
        end: localDate(2026, 3, 31),
        allDay: true,
      }).time,
    ).toBe("3 days");
    expect(
      formatEventTiming({
        start: localDate(2026, 10, 24),
        end: localDate(2026, 10, 27),
        allDay: true,
      }).time,
    ).toBe("3 days");
  });

  test("formats a same-day time range", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 16),
        end: localDate(2026, 8, 28, 20, 30),
        allDay: false,
      }),
    ).toEqual({
      date: "Friday  ·  28th August",
      time: "16:00 - 20:30",
    });
  });

  test("shows one time when the formatted start and end match", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 16),
        end: localDate(2026, 8, 28, 16),
        allDay: false,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "16:00" });
  });

  test("formats an event without an end time", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 16),
        allDay: false,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "16:00" });
  });

  test("does not infer all-day from a midnight timed event", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28),
        allDay: false,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "00:00" });
  });

  test("treats a malformed end as unavailable", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 16),
        end: localDate(2026, 8, 28, 15),
        allDay: false,
      }),
    ).toEqual({ date: "Friday  ·  28th August", time: "16:00" });
  });

  test("keeps an event ending before 05:00 on its starting day", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 22),
        end: localDate(2026, 8, 29, 2),
        allDay: false,
      }),
    ).toEqual({
      date: "Friday  ·  28th August",
      time: "22:00 - 02:00 🌙",
    });
  });

  test("treats exactly 05:00 as a multi-day event", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 28, 22),
        end: localDate(2026, 8, 29, 5),
        allDay: false,
      }),
    ).toEqual({ date: "28th August - 29th August", time: "2 days" });
  });

  test("formats an ordinary timed multi-day event", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 29, 16),
        end: localDate(2026, 9, 3, 18),
        allDay: false,
      }),
    ).toEqual({
      date: "29th August - 3rd September",
      time: "6 days",
    });
  });

  test("treats midnight as an exclusive final day", () => {
    expect(
      formatEventTiming({
        start: localDate(2026, 8, 29, 16),
        end: localDate(2026, 9, 3),
        allDay: false,
      }),
    ).toEqual({
      date: "29th August - 2nd September",
      time: "5 days",
    });
  });
});

describe("late-night calendar display", () => {
  test("works across month and year boundaries", () => {
    expect(
      isLateNightContinuation(
        localDate(2026, 12, 31, 22),
        localDate(2027, 1, 1, 2),
      ),
    ).toBe(true);
    expect(
      isLateNightContinuation(
        localDate(2026, 1, 31, 22),
        localDate(2026, 2, 1, 2),
      ),
    ).toBe(true);
  });

  test("does not shorten all-day, 05:00, or longer events", () => {
    const start = localDate(2026, 8, 28, 22);
    const atCutoff = localDate(2026, 8, 29, 5);
    const twoDaysLater = localDate(2026, 8, 30, 2);

    expect(normalizeEventEnd(start, atCutoff, false).shortened).toBe(false);
    expect(normalizeEventEnd(start, twoDaysLater, false).shortened).toBe(false);
    expect(
      normalizeEventEnd(start, localDate(2026, 8, 29, 2), true).shortened,
    ).toBe(false);
  });

  test("preserves the actual end while shortening the month-grid end", () => {
    const start = localDate(2026, 8, 28, 22);
    const end = localDate(2026, 8, 29, 2, 30);
    const result = normalizeEventEnd(start, end, false);

    expect(result.shortened).toBe(true);
    expect(result.actualEnd).toEqual(end);
    expect(result.displayEnd.getFullYear()).toBe(2026);
    expect(result.displayEnd.getMonth()).toBe(7);
    expect(result.displayEnd.getDate()).toBe(28);
    expect(result.displayEnd.getHours()).toBe(23);
    expect(result.displayEnd.getMinutes()).toBe(59);
    expect(result.displayEnd.getSeconds()).toBe(59);
    expect(result.displayEnd.getMilliseconds()).toBe(999);
  });
});
