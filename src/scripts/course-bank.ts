import { courseBankFileIcon, dataEndpoints } from "../data/external-assets";
import {
  buildCourseFileUrl,
  getCourseFileType,
  getFolderFiles,
  loadCourseBankStructure,
  parseCourseFile,
  type CourseBankDirectory,
  type StorageLike,
} from "./course-bank-utils";

const PDF_BLOB_LIFETIME_MS = 60_000;
const DOWNLOAD_BLOB_LIFETIME_MS = 10_000;
const DISCLOSURE_ANIMATION_MS = 280;
const DISCLOSURE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

interface DisclosureState {
  animation?: Animation;
  targetOpen: boolean;
}

function initTabs(tabList: HTMLElement): void {
  const root = tabList.closest<HTMLElement>("[data-course-bank]");
  if (!root) return;

  const tabs = [...tabList.querySelectorAll<HTMLButtonElement>("[role=tab]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[role=tabpanel]")];
  if (!tabs.length || tabs.length !== panels.length) return;

  const narrow = window.matchMedia("(max-width: 479px)");
  const updateOrientation = (): void => {
    tabList.setAttribute(
      "aria-orientation",
      narrow.matches ? "vertical" : "horizontal",
    );
  };

  const select = (tab: HTMLButtonElement, moveFocus = false): void => {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
      const panel = panels.find(
        ({ id }) => id === candidate.getAttribute("aria-controls"),
      );
      if (panel) panel.hidden = !selected;
    });
    if (moveFocus) {
      tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => select(tab, false)),
  );

  tabList.addEventListener("keydown", (event) => {
    const current = document.activeElement;
    if (!(current instanceof HTMLButtonElement)) return;
    const index = tabs.indexOf(current);
    if (index < 0) return;

    let nextIndex: number | undefined;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else if (event.key === "ArrowLeft") nextIndex = index - 1;
    else if (event.key === "ArrowRight") nextIndex = index + 1;
    else if (narrow.matches && event.key === "ArrowUp") nextIndex = index - 1;
    else if (narrow.matches && event.key === "ArrowDown") nextIndex = index + 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const wrapped = (nextIndex + tabs.length) % tabs.length;
    select(tabs[wrapped], true);
  });

  updateOrientation();
  narrow.addEventListener("change", updateOrientation);
}

function initDisclosures(root: HTMLElement): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  root
    .querySelectorAll<HTMLDetailsElement>("details.course")
    .forEach((details) => {
      const summary = details.querySelector<HTMLElement>("summary");
      const reveal = details.querySelector<HTMLElement>(".course-reveal");
      if (!summary || !reveal) return;

      const state: DisclosureState = { targetOpen: details.open };
      details.dataset.courseExpanded = String(details.open);

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        const targetOpen = !state.targetOpen;
        state.targetOpen = targetOpen;

        if (reduceMotion.matches) {
          state.animation?.cancel();
          state.animation = undefined;
          details.open = targetOpen;
          details.dataset.courseExpanded = String(targetOpen);
          reveal.style.removeProperty("height");
          reveal.style.removeProperty("overflow");
          return;
        }

        const startHeight = details.open
          ? reveal.getBoundingClientRect().height
          : 0;
        state.animation?.cancel();
        reveal.style.height = `${startHeight}px`;
        reveal.style.overflow = "hidden";

        if (targetOpen && !details.open) {
          details.open = true;
          // Let the newly revealed body start from its closed visual state.
          void details.offsetHeight;
        }
        details.dataset.courseExpanded = String(targetOpen);

        const endHeight = targetOpen ? reveal.scrollHeight : 0;
        const animation = reveal.animate(
          {
            height: [`${startHeight}px`, `${endHeight}px`],
          },
          {
            duration: DISCLOSURE_ANIMATION_MS,
            easing: DISCLOSURE_EASING,
          },
        );
        state.animation = animation;

        animation.addEventListener("finish", () => {
          if (state.animation !== animation) return;
          details.open = targetOpen;
          reveal.style.removeProperty("height");
          reveal.style.removeProperty("overflow");
          state.animation = undefined;
        });
      });
    });
}

function getStorage(): StorageLike | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function setStatus(root: HTMLElement, message: string): void {
  const status = root.querySelector<HTMLElement>("[data-course-bank-status]");
  if (status) status.textContent = message;
}

function setNotice(
  root: HTMLElement,
  message?: string,
  retryable = false,
): void {
  const notice = root.querySelector<HTMLElement>("[data-course-bank-notice]");
  const text = root.querySelector<HTMLElement>(
    "[data-course-bank-notice-text]",
  );
  const retry = root.querySelector<HTMLButtonElement>(
    "[data-course-bank-retry]",
  );
  if (!notice || !text || !retry) return;

  if (!message) {
    notice.hidden = true;
    return;
  }

  text.textContent = message;
  retry.hidden = !retryable;
  notice.hidden = false;
}

function makeState(message: string): HTMLParagraphElement {
  const state = document.createElement("p");
  state.className = "file-state";
  state.textContent = message;
  return state;
}

function makeFileRow(folder: string, file: string): HTMLDivElement {
  const parsed = parseCourseFile(file);
  const type = getCourseFileType(parsed.extension);
  const url = buildCourseFileUrl(dataEndpoints.courseBankRawBase, folder, file);

  const row = document.createElement("div");
  row.className = "course-file-row";

  const link = document.createElement("a");
  link.className = "course-file-link";
  link.href = url;
  link.setAttribute(
    "aria-label",
    `${parsed.displayName} by ${parsed.author}${parsed.extension ? `, ${parsed.extension}` : ""}`,
  );

  if (parsed.extension === "PDF") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.courseFileAction = "pdf";
  } else if (parsed.extension === "IPYNB") {
    link.dataset.courseFileAction = "download";
  }
  link.dataset.courseFileName = file;
  link.dataset.courseFileExtension = parsed.extension;

  const icon = document.createElement("span");
  icon.className = "course-file-icon";
  const image = document.createElement("img");
  image.src = courseBankFileIcon;
  image.alt = "";
  image.width = 36;
  image.height = 36;
  image.loading = "lazy";
  icon.append(image);

  if (parsed.extension) {
    const badge = document.createElement("span");
    badge.className = "course-file-badge";
    badge.textContent = parsed.extension;
    badge.style.backgroundColor = type.color;
    icon.append(badge);
  }

  const details = document.createElement("span");
  details.className = "course-file-details";
  const name = document.createElement("strong");
  name.className = "course-file-name";
  name.textContent = parsed.displayName;
  const author = document.createElement("span");
  author.className = "course-file-author";
  author.textContent = parsed.author;
  details.append(name, author);

  link.append(icon, details);
  row.append(link);
  return row;
}

function renderStructure(
  root: HTMLElement,
  structure: CourseBankDirectory,
): void {
  root
    .querySelectorAll<HTMLElement>("[data-course-files]")
    .forEach((holder) => {
      const folder = holder.dataset.folder;
      holder.replaceChildren();
      holder.setAttribute("aria-busy", "false");
      if (!folder) {
        holder.append(makeState("No notes found"));
        return;
      }

      const files = getFolderFiles(structure, folder);
      if (!files?.length) {
        holder.append(makeState("No notes found"));
        return;
      }

      holder.append(...files.map((file) => makeFileRow(folder, file)));
    });
}

function renderLoadError(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLElement>("[data-course-files]")
    .forEach((holder) => {
      holder.setAttribute("aria-busy", "false");
      holder.replaceChildren(makeState("Unable to load notes."));
    });
}

async function fetchFileBlob(url: string, extension: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`File request failed (${response.status})`);
  const buffer = await response.arrayBuffer();
  return new Blob([buffer], { type: getCourseFileType(extension).mime });
}

function openPdf(root: HTMLElement, link: HTMLAnchorElement): Window | null {
  const popup = window.open("about:blank", "_blank");
  if (!popup) return null;

  void (async () => {
    try {
      const blob = await fetchFileBlob(link.href, "PDF");
      const objectUrl = URL.createObjectURL(blob);
      popup.location.replace(objectUrl);
      // Keep the empty placeholder in the opener's browsing context group so
      // it can resolve the blob URL, then sever access before PDF content loads.
      popup.opener = null;
      window.setTimeout(
        () => URL.revokeObjectURL(objectUrl),
        PDF_BLOB_LIFETIME_MS,
      );
    } catch (error) {
      popup.close();
      console.error(error);
      const message = "Could not open this PDF. Please try the link again.";
      setStatus(root, message);
      setNotice(root, message);
    }
  })();
  return popup;
}

async function downloadNotebook(
  root: HTMLElement,
  link: HTMLAnchorElement,
): Promise<void> {
  try {
    const blob = await fetchFileBlob(link.href, "IPYNB");
    const objectUrl = URL.createObjectURL(blob);
    const download = document.createElement("a");
    download.href = objectUrl;
    download.download = link.dataset.courseFileName || "notebook.ipynb";
    document.body.append(download);
    download.click();
    download.remove();
    window.setTimeout(
      () => URL.revokeObjectURL(objectUrl),
      DOWNLOAD_BLOB_LIFETIME_MS,
    );
  } catch (error) {
    console.error(error);
    const message = "Could not download this notebook. Please try again.";
    setStatus(root, message);
    setNotice(root, message);
  }
}

function initFileActions(root: HTMLElement): void {
  root.addEventListener("click", (event) => {
    if (
      !(event instanceof MouseEvent) ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>("[data-course-file-action]");
    if (!link || !root.contains(link)) return;

    if (link.dataset.courseFileAction === "pdf") {
      if (openPdf(root, link)) event.preventDefault();
    } else if (link.dataset.courseFileAction === "download") {
      event.preventDefault();
      void downloadNotebook(root, link);
    }
  });
}

async function loadFiles(
  root: HTMLElement,
  forceRefresh = false,
): Promise<void> {
  const retry = root.querySelector<HTMLButtonElement>(
    "[data-course-bank-retry]",
  );
  if (retry) retry.disabled = true;
  root.dataset.courseBankState = "loading";
  setStatus(root, "Loading course notes…");
  if (!forceRefresh) setNotice(root);

  try {
    const loaded = await loadCourseBankStructure({
      url: dataEndpoints.courseBankStructure,
      storage: getStorage(),
      forceRefresh,
    });
    renderStructure(root, loaded.data);

    if (loaded.source === "stale") {
      const message =
        "Showing saved course notes because the latest list could not be loaded.";
      root.dataset.courseBankState = "stale";
      setStatus(root, message);
      setNotice(root, message, true);
    } else {
      root.dataset.courseBankState = "ready";
      setStatus(
        root,
        loaded.source === "cache"
          ? "Course notes loaded from saved data."
          : "Course notes loaded.",
      );
      setNotice(root);
    }
  } catch (error) {
    console.error(error);
    renderLoadError(root);
    const message = "Unable to load course notes.";
    root.dataset.courseBankState = "error";
    setStatus(root, message);
    setNotice(root, message, true);
  } finally {
    if (retry) retry.disabled = false;
  }
}

function initCourseBank(root: HTMLElement): void {
  if (root.dataset.courseBankInitialized === "true") return;
  root.dataset.courseBankInitialized = "true";

  const tabs = root.querySelector<HTMLElement>("[data-course-tabs]");
  if (tabs) initTabs(tabs);
  initDisclosures(root);
  initFileActions(root);

  root
    .querySelector<HTMLButtonElement>("[data-course-bank-retry]")
    ?.addEventListener("click", () => void loadFiles(root, true));
  void loadFiles(root);
}

export function initCourseBanks(): void {
  document
    .querySelectorAll<HTMLElement>("[data-course-bank]")
    .forEach(initCourseBank);
}
