const PDF_BLOB_LIFETIME_MS = 60_000;
const DOWNLOAD_BLOB_LIFETIME_MS = 10_000;

type ReportError = (message: string, error: unknown) => void;

async function fetchFileBlob(link: HTMLAnchorElement): Promise<Blob> {
  const response = await fetch(link.href);
  if (!response.ok) throw new Error(`File request failed (${response.status})`);
  return new Blob([await response.arrayBuffer()], {
    type: link.dataset.courseFileMediaType || "application/octet-stream",
  });
}

function openPdf(
  link: HTMLAnchorElement,
  reportError: ReportError,
): Window | null {
  const popup = window.open("about:blank", "_blank");
  if (!popup) return null;
  void (async () => {
    try {
      const objectUrl = URL.createObjectURL(await fetchFileBlob(link));
      popup.location.replace(objectUrl);
      popup.opener = null;
      window.setTimeout(
        () => URL.revokeObjectURL(objectUrl),
        PDF_BLOB_LIFETIME_MS,
      );
    } catch (error) {
      popup.close();
      reportError("Could not open this PDF. Please try the link again.", error);
    }
  })();
  return popup;
}

async function downloadNotebook(
  link: HTMLAnchorElement,
  reportError: ReportError,
): Promise<void> {
  try {
    const objectUrl = URL.createObjectURL(await fetchFileBlob(link));
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
    reportError("Could not download this notebook. Please try again.", error);
  }
}

export function initCourseFileActions(
  root: HTMLElement,
  reportError: ReportError,
): void {
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
      if (openPdf(link, reportError)) event.preventDefault();
    } else if (link.dataset.courseFileAction === "download") {
      event.preventDefault();
      void downloadNotebook(link, reportError);
    }
  });
}
