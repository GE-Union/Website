/**
 * Mobile navigation drawer, driven by a native <dialog>.
 *
 * showModal() gives label announcement, Escape handling, focus entry and
 * return, and background interaction blocking for free (the legacy Radix
 * dialog existed only after hydration). This script wires the burger and
 * close buttons and closes the drawer when a navigation link is chosen.
 */

export function initMobileMenu(
  burger: HTMLButtonElement,
  dialog: HTMLDialogElement,
): () => void {
  if (burger.dataset.mobileMenu === "on") return () => {};
  burger.dataset.mobileMenu = "on";

  const open = () => {
    dialog.showModal();
    burger.setAttribute("aria-expanded", "true");
  };

  const onClose = () => burger.setAttribute("aria-expanded", "false");

  // Close when a link inside the drawer is activated (same-page links
  // would otherwise leave the modal open) and on backdrop clicks.
  const onDialogClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      dialog.close();
      return;
    }
    if (target === dialog) dialog.close(); // clicks on ::backdrop hit <dialog>
  };

  const closeButton =
    dialog.querySelector<HTMLButtonElement>("[data-menu-close]");
  const onCloseClick = () => dialog.close();

  burger.addEventListener("click", open);
  dialog.addEventListener("close", onClose);
  dialog.addEventListener("click", onDialogClick);
  closeButton?.addEventListener("click", onCloseClick);

  return () => {
    burger.removeEventListener("click", open);
    dialog.removeEventListener("close", onClose);
    dialog.removeEventListener("click", onDialogClick);
    closeButton?.removeEventListener("click", onCloseClick);
    delete burger.dataset.mobileMenu;
  };
}
