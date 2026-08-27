import { dataEndpoints } from "../data/external-assets";
import {
  buildCourseFileUrl,
  getCourseFileType,
  loadCourseBankCatalog,
  type CourseBankCatalog,
  type CourseBankCourse,
  type CourseBankFile,
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

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function arrowIcon(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 25 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("arrow-icon");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "m17.56 9.525-3.585-3.586a1.5 1.5 0 0 0-2.121 2.122l2.439 2.439H5.5a1.5 1.5 0 1 0 0 3h8.793l-2.44 2.439a1.5 1.5 0 1 0 2.122 2.122l3.586-3.586a3.505 3.505 0 0 0 0-4.95Z",
  );
  path.setAttribute("fill", "currentColor");
  svg.append(path);
  return svg;
}

function chevronIcon(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "m4 6 4 4 4-4");
  svg.append(path);
  return svg;
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
    select(tabs[(nextIndex + tabs.length) % tabs.length], true);
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
      const state: DisclosureState = { targetOpen: false };
      details.open = false;
      details.dataset.courseExpanded = "false";

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
          void details.offsetHeight;
        }
        details.dataset.courseExpanded = String(targetOpen);
        const endHeight = targetOpen ? reveal.scrollHeight : 0;
        const animation = reveal.animate(
          { height: [`${startHeight}px`, `${endHeight}px`] },
          {
            duration: DISCLOSURE_ANIMATION_MS,
            easing: DISCLOSURE_EASING,
          },
        );
        state.animation = animation;
        animation.addEventListener("finish", () => {
          if (state.animation !== animation) return;
          if (!targetOpen) details.open = false;
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

function rawUrl(catalog: CourseBankCatalog, path: string): string {
  return buildCourseFileUrl(
    catalog.repository.rawBase,
    catalog.sourceRevision,
    path,
  );
}

function makeFileRow(
  catalog: CourseBankCatalog,
  file: CourseBankFile,
  iconUrl: string,
): HTMLDivElement {
  const type = getCourseFileType(file.extension);
  const row = element("div", "course-file-row");
  const link = element("a", "course-file-link");
  link.href = rawUrl(catalog, file.path);
  link.setAttribute(
    "aria-label",
    `${file.title} by ${file.author}, ${file.extension}`,
  );
  if (file.extension === "PDF") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.courseFileAction = "pdf";
  } else if (file.extension === "IPYNB") {
    link.dataset.courseFileAction = "download";
  }
  link.dataset.courseFileName = file.filename;
  link.dataset.courseFileExtension = file.extension;

  const icon = element("span", "course-file-icon");
  const image = element("img");
  image.src = iconUrl;
  image.alt = "";
  image.width = 36;
  image.height = 36;
  image.loading = "lazy";
  const badge = element("span", "course-file-badge", file.extension);
  badge.style.backgroundColor = type.color;
  icon.append(image, badge);

  const details = element("span", "course-file-details");
  details.append(
    element("strong", "course-file-name", file.title),
    element("span", "course-file-author", file.author),
  );
  link.append(icon, details);
  row.append(link);
  return row;
}

function makeCourse(
  catalog: CourseBankCatalog,
  course: CourseBankCourse,
  iconUrl: string,
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  if (course.separated) fragment.append(element("hr", "course-separator"));
  const details = element("details", "course");
  details.dataset.courseExpanded = "false";
  const summary = element("summary");
  const title = element("span", "course-title");
  title.append(
    element("span", "course-name", course.name),
    element("span", "course-code", course.code),
  );
  summary.append(title, chevronIcon());

  const reveal = element("div", "course-reveal");
  const body = element("div", "course-body");
  if (course.description)
    body.append(element("p", undefined, course.description));
  body.append(element("p", "notes-heading", "Notes"));
  const files = element("div", "file-list");
  if (course.files.length) {
    files.append(
      ...course.files.map((file) => makeFileRow(catalog, file, iconUrl)),
    );
  } else {
    files.append(element("p", "file-state", "No notes found"));
  }
  body.append(files);
  reveal.append(body);
  details.append(summary, reveal);
  fragment.append(details);
  return fragment;
}

function appendEmphasizedText(
  paragraph: HTMLParagraphElement,
  description: string,
  emphasis: string,
): void {
  const index = emphasis ? description.indexOf(emphasis) : -1;
  if (index < 0) {
    paragraph.textContent = description;
    return;
  }
  paragraph.append(
    document.createTextNode(description.slice(0, index)),
    element("strong", undefined, emphasis),
    document.createTextNode(description.slice(index + emphasis.length)),
  );
}

function renderCatalog(root: HTMLElement, catalog: CourseBankCatalog): void {
  const mount = root.querySelector<HTMLElement>("[data-course-bank-content]");
  if (!mount) return;
  const iconUrl = rawUrl(catalog, catalog.assets.fileIcon);
  const tabList = element("div", "tab-list");
  tabList.dataset.courseTabs = "";
  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", "Course categories");
  tabList.setAttribute("aria-orientation", "horizontal");

  const panels: HTMLElement[] = [];
  catalog.categories.forEach((category, index) => {
    const tab = element("button");
    tab.type = "button";
    tab.id = `course-tab-${category.id}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", `course-panel-${category.id}`);
    tab.setAttribute("aria-selected", String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.append(
      element("span", "full-tab-label", category.name),
      element("span", "short-tab-label", category.shortName),
    );
    tabList.append(tab);

    const panel = element("section", "tab-panel");
    panel.id = `course-panel-${category.id}`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    panel.hidden = index !== 0;
    const intro = element("p", "category-intro");
    appendEmphasizedText(intro, category.description, category.emphasis);
    const courses = element("div", "course-list");
    category.courses.forEach((course) =>
      courses.append(makeCourse(catalog, course, iconUrl)),
    );
    panel.append(intro, courses);
    panels.push(panel);
  });

  const actions = element("div", "course-actions");
  catalog.site.links.forEach((item) => {
    const card = element("div", "action-card");
    const link = element("a", `action-link ${item.id}`);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode(item.label), arrowIcon());
    card.append(element("h2", undefined, item.heading), link);
    actions.append(card);
  });
  mount.replaceChildren(tabList, ...panels, actions);
  initTabs(tabList);
  initDisclosures(mount);
}

async function fetchFileBlob(url: string, extension: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`File request failed (${response.status})`);
  return new Blob([await response.arrayBuffer()], {
    type: getCourseFileType(extension).mime,
  });
}

function openPdf(root: HTMLElement, link: HTMLAnchorElement): Window | null {
  const popup = window.open("about:blank", "_blank");
  if (!popup) return null;
  void (async () => {
    try {
      const objectUrl = URL.createObjectURL(
        await fetchFileBlob(link.href, "PDF"),
      );
      popup.location.replace(objectUrl);
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
    const objectUrl = URL.createObjectURL(
      await fetchFileBlob(link.href, "IPYNB"),
    );
    const download = element("a");
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
    )
      return;
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

async function loadCatalog(
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
    const loaded = await loadCourseBankCatalog({
      url: dataEndpoints.courseBankCatalog,
      storage: getStorage(),
      forceRefresh,
    });
    renderCatalog(root, loaded.data);
    if (loaded.source === "stale") {
      const message =
        "Showing saved course notes because the latest catalog could not be loaded.";
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
  initFileActions(root);
  root
    .querySelector<HTMLButtonElement>("[data-course-bank-retry]")
    ?.addEventListener("click", () => void loadCatalog(root, true));
  void loadCatalog(root);
}

export function initCourseBanks(): void {
  document
    .querySelectorAll<HTMLElement>("[data-course-bank]")
    .forEach(initCourseBank);
}
