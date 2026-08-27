export const googleCalendarApiPattern =
  "https://www.googleapis.com/calendar/v3/calendars/**";

export const unsafeCalendarTitle = "Safety <img onerror=window.injected=true>";
export const unsafeCalendarDescription =
  '<p>Welcome to <strong onclick="window.injected=true">GE Union</strong>.</p><p><a href="https://example.com" target="_blank">Event details</a> <a href="javascript:window.injected=true">Unsafe link</a></p><img src=x onerror=window.injected=true>';

export const calendarEventsFixture = {
  kind: "calendar#events",
  items: [
    {
      id: "safety",
      summary: unsafeCalendarTitle,
      description: unsafeCalendarDescription,
      location: "DTU Building 101",
      start: { dateTime: "2026-08-27T09:00:00+02:00" },
      end: { dateTime: "2026-08-27T11:30:00+02:00" },
      htmlLink: "https://calendar.google.com/event?eid=safety",
    },
    {
      id: "workshop",
      summary: "Exam workshop",
      start: { dateTime: "2026-08-27T12:00:00+02:00" },
      end: { dateTime: "2026-08-27T13:00:00+02:00" },
    },
    {
      id: "meeting",
      summary: "GE Union meeting",
      start: { dateTime: "2026-08-27T14:00:00+02:00" },
      end: { dateTime: "2026-08-27T15:00:00+02:00" },
    },
    {
      id: "social",
      summary: "Pizza social",
      start: { dateTime: "2026-08-27T18:00:00+02:00" },
      end: { dateTime: "2026-08-27T20:00:00+02:00" },
    },
    {
      id: "study-day",
      summary: "Study day",
      start: { date: "2026-08-28" },
      end: { date: "2026-08-29" },
    },
    {
      id: "late-party",
      summary: "Late party",
      location: "S-Huset",
      start: { dateTime: "2026-08-29T22:00:00+02:00" },
      end: { dateTime: "2026-08-30T02:00:00+02:00" },
    },
    {
      id: "intro-week",
      summary: "Introduction days",
      start: { date: "2026-08-30" },
      end: { date: "2026-09-03" },
    },
  ],
};

export const emptyCalendarFixture = {
  kind: "calendar#events",
  items: [],
};
