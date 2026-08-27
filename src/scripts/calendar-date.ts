export interface EventTiming {
  start: Date;
  end?: Date | null;
  allDay: boolean;
}

export interface FormattedEventTiming {
  date: string;
  time: string;
}

export interface NormalizedEventEnd {
  actualEnd: Date;
  displayEnd: Date;
  shortened: boolean;
}

export type CalendarDateInput = Date | string | number;

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const ISO_DATE_TIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(?:Z|[+-]\d{2}:?\d{2})?$/;

// FullCalendar v6 represents named-timezone wall times in UTC-backed Dates.
// Keeping that contract here prevents event times from changing with the
// visitor's device timezone without adding a timezone library to the bundle.
function utcCalendarDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
): Date | null {
  const parsed = new Date(0);
  parsed.setUTCFullYear(year, month - 1, day);
  parsed.setUTCHours(hour, minute, second, millisecond);

  return parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day &&
    parsed.getUTCHours() === hour &&
    parsed.getUTCMinutes() === minute &&
    parsed.getUTCSeconds() === second &&
    parsed.getUTCMilliseconds() === millisecond
    ? parsed
    : null;
}

function calendarDayNumber(date: Date): number {
  return (
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) /
    MILLISECONDS_PER_DAY
  );
}

function calendarDayDifference(start: Date, end: Date): number {
  return calendarDayNumber(end) - calendarDayNumber(start);
}

function isSameCalendarDay(left: Date, right: Date): boolean {
  return calendarDayDifference(left, right) === 0;
}

function isMidnight(date: Date): boolean {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

function previousCalendarDay(date: Date): Date {
  const previous = new Date(date);
  previous.setUTCDate(previous.getUTCDate() - 1);
  return previous;
}

export function isDateOnlyInput(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function parseCalendarDate(
  value: CalendarDateInput | null | undefined,
): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value);
  }

  if (isDateOnlyInput(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return utcCalendarDate(year, month, day);
  }

  if (typeof value === "string") {
    const match = ISO_DATE_TIME_PATTERN.exec(value);
    if (!match) return null;

    const [, year, month, day, hour, minute, second = "0", fraction = ""] =
      match;
    return utcCalendarDate(
      Number(year),
      Number(month),
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
      Number(fraction.padEnd(3, "0").slice(0, 3)),
    );
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function isLateNightContinuation(
  start: Date,
  end: Date,
  cutoffHour = 5,
): boolean {
  return (
    end.getTime() > start.getTime() &&
    calendarDayDifference(start, end) === 1 &&
    end.getUTCHours() < cutoffHour
  );
}

export function normalizeEventEnd(
  start: Date,
  end: Date,
  allDay: boolean,
  cutoffHour = 5,
): NormalizedEventEnd {
  const actualEnd = new Date(end);

  if (allDay || !isLateNightContinuation(start, actualEnd, cutoffHour)) {
    return {
      actualEnd,
      displayEnd: new Date(actualEnd),
      shortened: false,
    };
  }

  const displayEnd = new Date(start);
  displayEnd.setUTCHours(23, 59, 59, 999);
  return { actualEnd, displayEnd, shortened: true };
}

function formatDay(date: Date, locale: string, withWeekday: boolean): string {
  const dateNumber = date.getUTCDate();
  const day = `${dateNumber}${getOrdinalSuffix(dateNumber)}`;
  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
  }).format(date);

  if (!withWeekday) return `${day} ${month}`;

  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone: "UTC",
  }).format(date);
  return `${weekday}  ·  ${day} ${month}`;
}

function formatTime(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

function finalOccupiedDay(end: Date): Date {
  return isMidnight(end) ? previousCalendarDay(end) : end;
}

function formatDaySpan(
  start: Date,
  end: Date,
  locale: string,
): FormattedEventTiming {
  const finalDay = finalOccupiedDay(end);
  const dayCount = Math.max(1, calendarDayDifference(start, finalDay) + 1);

  return {
    date: `${formatDay(start, locale, false)} - ${formatDay(finalDay, locale, false)}`,
    time: `${dayCount} ${dayCount === 1 ? "day" : "days"}`,
  };
}

export function formatEventTiming(
  timing: EventTiming,
  locale = "en-GB",
  cutoffHour = 5,
): FormattedEventTiming {
  const { start, end, allDay } = timing;
  const usableEnd = end && end.getTime() > start.getTime() ? end : null;

  if (allDay) {
    if (!usableEnd || calendarDayDifference(start, usableEnd) <= 1) {
      return { date: formatDay(start, locale, true), time: "" };
    }
    return formatDaySpan(start, usableEnd, locale);
  }

  if (!usableEnd) {
    return {
      date: formatDay(start, locale, true),
      time: formatTime(start, locale),
    };
  }

  const lateNight = isLateNightContinuation(start, usableEnd, cutoffHour);
  if (!isSameCalendarDay(start, usableEnd) && !lateNight) {
    return formatDaySpan(start, usableEnd, locale);
  }

  const startTime = formatTime(start, locale);
  const endTime = formatTime(usableEnd, locale);
  return {
    date: formatDay(start, locale, true),
    time:
      startTime === endTime
        ? startTime
        : `${startTime} - ${endTime}${lateNight ? " 🌙" : ""}`,
  };
}
