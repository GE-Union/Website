import { formatEventTiming } from "./calendar-date";
import { renderCalendarDescription } from "./calendar-description";

const CLOSE_FALLBACK_MS = 300;
const CLOSE_ANIMATION_NAME = "event-dialog-card-out";

export interface CalendarDialogEvent {
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  location: string;
  description: string;
}

export interface CalendarDialogController {
  open(
    event: CalendarDialogEvent,
    trigger: HTMLElement,
    locale: string,
    cutoffHour: number,
  ): void;
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

function setDescription(
  description: HTMLElement,
  rule: HTMLElement | null,
  value: string,
): void {
  const safeContent = renderCalendarDescription(value);
  const hidden = value.length === 0 || !safeContent.hasChildNodes();
  description.replaceChildren(safeContent);
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

export function createCalendarDialog(
  root: HTMLElement,
): CalendarDialogController | null {
  const dialog = root.querySelector<HTMLDialogElement>("[data-event-dialog]");
  const card = root.querySelector<HTMLElement>(".event-dialog-card");
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

  if (!dialog || !card || !closeButton || !title || !date || !description) {
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
    closeTimer = window.setTimeout(finishClose, CLOSE_FALLBACK_MS);
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
  card.addEventListener("animationend", (event) => {
    if (
      dialog.dataset.closing === "true" &&
      event.animationName === CLOSE_ANIMATION_NAME
    ) {
      finishClose();
    }
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
    open(event, eventTrigger, locale, cutoffHour) {
      const formatted = formatEventTiming(event, locale, cutoffHour);

      title.textContent = event.title || "Untitled event";
      date.textContent = formatted.date;
      setOptionalField(timeRow, time, formatted.time);
      setOptionalField(locationRow, location, event.location);
      setDescription(description, descriptionRule, event.description);
      trigger = eventTrigger;

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
