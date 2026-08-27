import { Calendar, type EventApi, type EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {
  formatEventTiming,
  isDateOnlyInput,
  normalizeEventEnd,
  parseCalendarDate,
  type CalendarDateInput,
} from "./calendar-date";

type CalendarState = "loading" | "ready" | "empty" | "error" | "missing-key";

const ORIGINAL_END_PROPERTY = "geuOriginalEnd";
const DIALOG_CLOSE_FALLBACK_MS = 300;
const DESCRIPTION_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "q",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "ul",
]);
const DROPPED_DESCRIPTION_TAGS = new Set([
  "audio",
  "base",
  "button",
  "canvas",
  "embed",
  "form",
  "iframe",
  "img",
  "input",
  "link",
  "math",
  "meta",
  "noscript",
  "object",
  "picture",
  "script",
  "style",
  "svg",
  "template",
  "video",
]);

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

function setOptionalField(
  row: HTMLElement | null,
  field: HTMLElement | null,
  value: string,
): void {
  if (!row || !field) return;
  field.textContent = value;
  row.hidden = value.length === 0;
}

function isAllowedDescriptionLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function copyDescriptionNode(source: Node, destination: Node): void {
  if (source.nodeType === Node.TEXT_NODE) {
    destination.appendChild(document.createTextNode(source.textContent ?? ""));
    return;
  }
  if (!(source instanceof Element)) return;

  const tagName = source.tagName.toLowerCase();
  if (DROPPED_DESCRIPTION_TAGS.has(tagName)) return;
  if (!DESCRIPTION_TAGS.has(tagName)) {
    [...source.childNodes].forEach((child) =>
      copyDescriptionNode(child, destination),
    );
    return;
  }

  const element = document.createElement(tagName);
  const title = source.getAttribute("title");
  if (title) element.title = title;

  if (element instanceof HTMLAnchorElement) {
    const href = source.getAttribute("href");
    if (href && isAllowedDescriptionLink(href)) element.href = href;
    if (source.getAttribute("target") === "_blank") {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  }

  destination.appendChild(element);
  [...source.childNodes].forEach((child) =>
    copyDescriptionNode(child, element),
  );
}

function renderDescription(value: string): DocumentFragment {
  const source = new DOMParser().parseFromString(value, "text/html");
  const fragment = document.createDocumentFragment();
  [...source.body.childNodes].forEach((child) =>
    copyDescriptionNode(child, fragment),
  );
  return fragment;
}

function setDescription(
  description: HTMLElement,
  rule: HTMLElement | null,
  value: string,
): void {
  const safeContent = renderDescription(value);
  const hasContent = safeContent.hasChildNodes();
  description.replaceChildren(safeContent);

  const hidden = value.length === 0 || !hasContent;
  description.hidden = hidden;
  if (rule) rule.hidden = hidden;
}

function lockPageScroll(): () => void {
  const rootStyle = document.documentElement.style;
  const bodyStyle = document.body.style;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const scrollbarWidth = Math.max(
    0,
    window.innerWidth - document.documentElement.clientWidth,
  );
  const previous = {
    rootOverflow: rootStyle.overflow,
    rootScrollBehavior: rootStyle.scrollBehavior,
    bodyPosition: bodyStyle.position,
    bodyTop: bodyStyle.top,
    bodyLeft: bodyStyle.left,
    bodyWidth: bodyStyle.width,
    bodyOverflow: bodyStyle.overflow,
    bodyPaddingRight: bodyStyle.paddingRight,
  };

  rootStyle.overflow = "hidden";
  bodyStyle.position = "fixed";
  bodyStyle.top = `-${scrollY}px`;
  bodyStyle.left = `-${scrollX}px`;
  bodyStyle.width = "100%";
  bodyStyle.overflow = "hidden";
  if (scrollbarWidth > 0) {
    const paddingRight = Number.parseFloat(
      window.getComputedStyle(document.body).paddingRight,
    );
    bodyStyle.paddingRight = `${
      (Number.isFinite(paddingRight) ? paddingRight : 0) + scrollbarWidth
    }px`;
  }

  let locked = true;
  return () => {
    if (!locked) return;
    locked = false;

    rootStyle.overflow = previous.rootOverflow;
    bodyStyle.position = previous.bodyPosition;
    bodyStyle.top = previous.bodyTop;
    bodyStyle.left = previous.bodyLeft;
    bodyStyle.width = previous.bodyWidth;
    bodyStyle.overflow = previous.bodyOverflow;
    bodyStyle.paddingRight = previous.bodyPaddingRight;

    rootStyle.scrollBehavior = "auto";
    window.scrollTo(scrollX, scrollY);
    rootStyle.scrollBehavior = previous.rootScrollBehavior;
  };
}

function makeCalendarControlsAccessible(grid: HTMLElement): void {
  grid.querySelectorAll<HTMLElement>(".fc-icon[role=img]").forEach((icon) => {
    icon.removeAttribute("role");
    icon.setAttribute("aria-hidden", "true");
  });
}

function makeDialogController(root: HTMLElement) {
  const dialog = root.querySelector<HTMLDialogElement>("[data-event-dialog]");
  const closeButton = root.querySelector<HTMLButtonElement>(
    "[data-event-dialog-close]",
  );
  const title = root.querySelector<HTMLElement>("[data-event-title]");
  const date = root.querySelector<HTMLElement>("[data-event-date]");
  const time = root.querySelector<HTMLElement>("[data-event-time]");
  const timeRow = root.querySelector<HTMLElement>("[data-event-time-row]");
  const location = root.querySelector<HTMLElement>("[data-event-location]");
  const locationRow = root.querySelector<HTMLElement>(
    "[data-event-location-row]",
  );
  const description = root.querySelector<HTMLElement>(
    "[data-event-description]",
  );
  const descriptionRule = root.querySelector<HTMLElement>(
    "[data-event-description-rule]",
  );

  if (!dialog || !closeButton || !title || !date || !description) {
    return null;
  }

  let trigger: HTMLElement | null = null;
  let fallbackBackground: HTMLElement[] = [];
  let closeTimer: number | null = null;
  let unlockPageScroll: (() => void) | null = null;
  const supportsModal = typeof dialog.showModal === "function";

  const restoreBackground = (): void => {
    fallbackBackground.forEach((element) => element.removeAttribute("inert"));
    fallbackBackground = [];
  };

  const finishClose = (): void => {
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    closeTimer = null;
    if (!dialog.open) return;
    if (typeof dialog.close === "function") dialog.close();
    else {
      dialog.removeAttribute("open");
      dialog.dispatchEvent(new Event("close"));
    }
  };

  const close = (): void => {
    if (!dialog.open || dialog.dataset.closing === "true") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }

    dialog.dataset.closing = "true";
    closeTimer = window.setTimeout(finishClose, DIALOG_CLOSE_FALLBACK_MS);
  };

  const openFallback = (): void => {
    document.body.append(dialog);
    fallbackBackground = [...document.body.children].filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== dialog &&
        !element.hasAttribute("inert"),
    );
    fallbackBackground.forEach((element) => element.setAttribute("inert", ""));
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("open", "");
  };

  const keepFallbackFocusInside = (event: KeyboardEvent): void => {
    if (supportsModal || !dialog.open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const controls = [
      ...dialog.querySelectorAll<HTMLElement>("button, [href]"),
    ];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls.at(-1)!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  closeButton.addEventListener("click", close);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("animationend", (event) => {
    if (event.animationName === "event-dialog-card-out") finishClose();
  });
  dialog.addEventListener("close", () => {
    delete dialog.dataset.closing;
    restoreBackground();
    unlockPageScroll?.();
    unlockPageScroll = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("keydown", keepFallbackFocusInside);

  return {
    open(
      event: EventApi,
      eventElement: HTMLElement,
      locale: string,
      cutoffHour: number,
    ) {
      if (!event.start) return;

      const originalEnd = getEventDate(
        event.extendedProps[ORIGINAL_END_PROPERTY],
      );
      const formatted = formatEventTiming(
        {
          start: event.start,
          end: originalEnd ?? event.end,
          allDay: event.allDay,
        },
        locale,
        cutoffHour,
      );

      const eventLocation =
        typeof event.extendedProps.location === "string"
          ? event.extendedProps.location
          : "";
      const eventDescription =
        typeof event.extendedProps.description === "string"
          ? event.extendedProps.description
          : "";

      title.textContent = event.title || "Untitled event";
      date.textContent = formatted.date;
      setOptionalField(timeRow, time, formatted.time);
      setOptionalField(locationRow, location, eventLocation);
      setDescription(description, descriptionRule, eventDescription);
      trigger = eventElement;

      unlockPageScroll?.();
      unlockPageScroll = lockPageScroll();
      try {
        if (supportsModal) dialog.showModal();
        else openFallback();
      } catch (error) {
        unlockPageScroll();
        unlockPageScroll = null;
        throw error;
      }
      closeButton.focus();
    },
  };
}

export function initEventCalendar(root: HTMLElement): void {
  if (root.dataset.calendarInitialized === "true") return;

  const grid = root.querySelector<HTMLElement>("[data-calendar-grid]");
  const retry = root.querySelector<HTMLButtonElement>("[data-calendar-retry]");
  const apiKey = root.dataset.apiKey?.trim() ?? "";
  const calendarId = root.dataset.calendarId?.trim() ?? "";
  const locale = root.dataset.locale || "en-GB";
  const cutoffHour = Number(root.dataset.cutoffHour) || 5;
  if (!grid || !retry || !calendarId) return;

  root.dataset.calendarInitialized = "true";
  const dialog = makeDialogController(root);
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
      dialog?.open(info.event, info.el, locale, cutoffHour);
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
      makeCalendarControlsAccessible(grid);
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
  makeCalendarControlsAccessible(grid);
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
