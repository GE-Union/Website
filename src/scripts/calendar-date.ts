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

function calendarDayNumber(date: Date): number {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
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
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  );
}

function previousCalendarDay(date: Date): Date {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
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
    const parsed = new Date(0);
    parsed.setHours(0, 0, 0, 0);
    parsed.setFullYear(year, month - 1, day);
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null;
    }
    return parsed;
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
    end.getHours() < cutoffHour
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
  displayEnd.setHours(23, 59, 59, 999);
  return { actualEnd, displayEnd, shortened: true };
}

function formatDay(date: Date, locale: string, withWeekday: boolean): string {
  const day = `${date.getDate()}${getOrdinalSuffix(date.getDate())}`;
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);

  if (!withWeekday) return `${day} ${month}`;

  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    date,
  );
  return `${weekday} · ${day} ${month}`;
}

function formatTime(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
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
