import { Calendar, type EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {
  isDateOnlyInput,
  normalizeEventEnd,
  parseCalendarDate,
  type CalendarDateInput,
} from "./calendar-date";
import { createCalendarDialog } from "./calendar-dialog";

type CalendarState = "loading" | "ready" | "empty" | "error" | "missing-key";

const ORIGINAL_END_PROPERTY = "geuOriginalEnd";

function getEventDate(value: unknown): Date | null {
  if (
    value instanceof Date ||
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return parseCalendarDate(value as CalendarDateInput);
  }
  return null;
}

function setState(
  root: HTMLElement,
  state: CalendarState,
  message: string,
): void {
  const notice = root.querySelector<HTMLElement>("[data-calendar-notice]");
  const noticeText = root.querySelector<HTMLElement>(
    "[data-calendar-notice-text]",
  );
  const live = root.querySelector<HTMLElement>("[data-calendar-live]");
  const retry = root.querySelector<HTMLButtonElement>("[data-calendar-retry]");
  const grid = root.querySelector<HTMLElement>("[data-calendar-grid]");
  if (!notice || !noticeText || !live || !retry || !grid) return;

  root.dataset.calendarState = state;
  grid.setAttribute("aria-busy", String(state === "loading"));
  noticeText.textContent = message;
  live.textContent = message;
  notice.hidden = state !== "error" && state !== "missing-key";
  retry.hidden = state !== "error";
}

function transformEvent(event: EventInput, cutoffHour: number): EventInput {
  const start = getEventDate(event.start);
  const end = getEventDate(event.end);
  if (!start || !end) return event;

  const allDay = event.allDay === true || isDateOnlyInput(event.start);
  const normalized = normalizeEventEnd(start, end, allDay, cutoffHour);
  return {
    ...event,
    allDay,
    end: normalized.displayEnd,
    extendedProps: {
      ...event.extendedProps,
      [ORIGINAL_END_PROPERTY]: normalized.actualEnd.toISOString(),
    },
  };
}

function enhanceCalendarAccessibility(grid: HTMLElement): void {
  grid.querySelectorAll<HTMLElement>(".fc-icon[role=img]").forEach((icon) => {
    icon.removeAttribute("role");
    icon.setAttribute("aria-hidden", "true");
  });

  const scrollRegion = grid.closest<HTMLElement>(
    "[data-calendar-scroll-region]",
  );
  if (!scrollRegion) return;

  const isScrollable = window.matchMedia("(max-width: 767px)").matches;
  if (isScrollable) {
    scrollRegion.tabIndex = 0;
    scrollRegion.setAttribute("role", "region");
    scrollRegion.setAttribute(
      "aria-label",
      "Calendar month grid. Scroll horizontally to see all weekdays.",
    );
  } else {
    scrollRegion.removeAttribute("tabindex");
    scrollRegion.removeAttribute("role");
    scrollRegion.removeAttribute("aria-label");
  }
}

export function initEventCalendar(root: HTMLElement): void {
  if (root.dataset.calendarInitialized === "true") return;

  const grid = root.querySelector<HTMLElement>("[data-calendar-grid]");
  const retry = root.querySelector<HTMLButtonElement>("[data-calendar-retry]");
  const apiKey = root.dataset.apiKey?.trim() ?? "";
  const calendarId = root.dataset.calendarId?.trim() ?? "";
  const locale = root.dataset.locale || "en-GB";
  const timeZone = root.dataset.timeZone || "Europe/Copenhagen";
  const cutoffHour = Number(root.dataset.cutoffHour) || 5;
  if (!grid || !retry || !calendarId) return;

  root.dataset.calendarInitialized = "true";
  const dialog = createCalendarDialog(root);
  let eventCount = 0;
  let sourceFailed = false;

  const calendar = new Calendar(grid, {
    plugins: [dayGridPlugin, googleCalendarPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "",
    },
    dayMaxEvents: 3,
    firstDay: 1,
    contentHeight: "auto",
    timeZone,
    googleCalendarApiKey: apiKey || undefined,
    events: apiKey ? { googleCalendarId: calendarId } : [],
    eventContent(info) {
      const eventTitle = document.createElement("div");
      eventTitle.className = "fc-event-title";
      eventTitle.textContent = info.event.title || "Untitled event";
      return { domNodes: [eventTitle] };
    },
    eventDataTransform: (event) => transformEvent(event, cutoffHour),
    eventDidMount(info) {
      info.el.title = info.event.title || "Untitled event";
      info.el.setAttribute("aria-haspopup", "dialog");
    },
    eventClick(info) {
      info.jsEvent.preventDefault();
      if (!info.event.start) return;

      const location = info.event.extendedProps.location;
      const description = info.event.extendedProps.description;
      dialog?.open(
        {
          title: info.event.title,
          start: info.event.start,
          end:
            getEventDate(info.event.extendedProps[ORIGINAL_END_PROPERTY]) ??
            info.event.end,
          allDay: info.event.allDay,
          location: typeof location === "string" ? location : "",
          description: typeof description === "string" ? description : "",
        },
        info.el,
        locale,
        cutoffHour,
      );
    },
    moreLinkDidMount(info) {
      info.el.setAttribute("role", "button");
      if (!info.el.getAttribute("aria-controls")) {
        info.el.removeAttribute("aria-controls");
      }
      info.el.addEventListener("keydown", (event) => {
        if (event.key !== " ") return;
        event.preventDefault();
        info.el.click();
      });
    },
    datesSet() {
      enhanceCalendarAccessibility(grid);
    },
    windowResize() {
      enhanceCalendarAccessibility(grid);
    },
    eventSourceSuccess(events) {
      eventCount = events.length;
      return events;
    },
    eventSourceFailure(error) {
      sourceFailed = true;
      console.error("Unable to load Google Calendar events.", error);
    },
    loading(isLoading) {
      if (isLoading) {
        sourceFailed = false;
        setState(root, "loading", "Loading calendar events…");
      } else if (sourceFailed) {
        setState(
          root,
          "error",
          "Unable to load calendar events. Please try again.",
        );
      } else if (eventCount === 0) {
        setState(root, "empty", "No events are scheduled in this period.");
      } else {
        setState(root, "ready", "Calendar events loaded.");
      }
    },
  });

  retry.addEventListener("click", () => {
    sourceFailed = false;
    setState(root, "loading", "Loading calendar events…");
    calendar.refetchEvents();
  });

  calendar.render();
  enhanceCalendarAccessibility(grid);
  if (!apiKey) {
    setState(
      root,
      "missing-key",
      "Calendar events are temporarily unavailable because the service is not configured.",
    );
  }
}

export function initEventCalendars(): void {
  document
    .querySelectorAll<HTMLElement>("[data-event-calendar]")
    .forEach(initEventCalendar);
}
