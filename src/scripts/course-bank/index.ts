import { dataEndpoints } from "../../data/external-assets";
import { loadCourseBankCatalog, type StorageLike } from "./cache";
import { initCourseFileActions } from "./file-actions";
import { renderCourseBank } from "./view";

function storage(): StorageLike | undefined {
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

function reportFileError(
  root: HTMLElement,
  message: string,
  error: unknown,
): void {
  console.error(error);
  setStatus(root, message);
  setNotice(root, message);
}

function initCourseBank(root: HTMLElement): void {
  if (root.dataset.courseBankInitialized === "true") return;
  root.dataset.courseBankInitialized = "true";
  let disposeView = (): void => undefined;

  const load = async (forceRefresh = false): Promise<void> => {
    const retry = root.querySelector<HTMLButtonElement>(
      "[data-course-bank-retry]",
    );
    if (retry) retry.disabled = true;
    root.dataset.courseBankState = "loading";
    setStatus(root, "Loading course notes…");
    setNotice(root);
    try {
      const loaded = await loadCourseBankCatalog({
        url: dataEndpoints.courseBankCatalog,
        storage: storage(),
        forceRefresh,
      });
      disposeView();
      disposeView = renderCourseBank(root, loaded.data);
      if (loaded.source === "stale") {
        const message =
          "Showing saved course notes because the latest catalog could not be loaded.";
        root.dataset.courseBankState = "stale";
        setStatus(root, message);
        setNotice(root, message, true);
      } else {
        root.dataset.courseBankState = "ready";
        setStatus(root, "Course notes loaded.");
      }
    } catch (error) {
      const message = "Unable to load course notes.";
      root.dataset.courseBankState = "error";
      console.error(error);
      setStatus(root, message);
      setNotice(root, message, true);
    } finally {
      if (retry) retry.disabled = false;
    }
  };

  initCourseFileActions(root, (message, error) =>
    reportFileError(root, message, error),
  );
  root
    .querySelector<HTMLButtonElement>("[data-course-bank-retry]")
    ?.addEventListener("click", () => void load(true));
  void load();
}

export function initCourseBanks(): void {
  document
    .querySelectorAll<HTMLElement>("[data-course-bank]")
    .forEach(initCourseBank);
}
