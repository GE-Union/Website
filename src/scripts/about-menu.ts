/**
 * Disclosure behavior for the About navigation menu.
 *
 * The legacy site rendered these links inside a hover-only Radix tooltip
 * that existed only after hydration, leaving three routes unreachable
 * without JavaScript (docs/migration-audit.md, finding 11). Here the links
 * are real anchors that are always in the DOM; this script only toggles
 * their visibility:
 * - click / Enter / Space on the trigger button toggles the menu,
 * - hovering the group opens it (parity with the zero-delay tooltip),
 * - Escape closes it and returns focus to the trigger,
 * - moving focus or pointer outside the group closes it.
 */

export function initAboutMenu(group: HTMLElement): () => void {
  const trigger = group.querySelector<HTMLButtonElement>("button");
  const list = group.querySelector<HTMLElement>("ul");
  if (!trigger || !list || group.dataset.aboutMenu === "on") return () => {};
  group.dataset.aboutMenu = "on";

  const setOpen = (open: boolean) => {
    trigger.setAttribute("aria-expanded", String(open));
    group.dataset.open = String(open);
  };

  const isOpen = () => trigger.getAttribute("aria-expanded") === "true";

  // Keyboard activation (Enter/Space) fires click with detail 0 → toggle.
  // Pointer clicks always follow a pointerenter that already opened the
  // menu, so toggling here would close it again instantly; keep it open
  // instead (Escape, outside taps, and pointerleave all close it).
  const onTriggerClick = (e: MouseEvent) => {
    if (e.detail === 0) setOpen(!isOpen());
    else setOpen(true);
  };

  // Hover parity with the legacy tooltip; harmless on touch devices,
  // where the click handler drives the menu.
  const onPointerEnter = () => setOpen(true);
  const onPointerLeave = () => setOpen(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      trigger.focus();
    }
  };

  const onFocusOut = (e: FocusEvent) => {
    // A window blur also fires focusout (relatedTarget null) while the
    // trigger keeps document focus; the menu should survive that and only
    // close when focus really moves elsewhere in the page.
    if (group.contains(document.activeElement)) return;
    if (!group.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  const onOutsidePointerDown = (e: PointerEvent) => {
    if (isOpen() && !group.contains(e.target as Node | null)) setOpen(false);
  };

  setOpen(false);
  trigger.addEventListener("click", onTriggerClick);
  group.addEventListener("pointerenter", onPointerEnter);
  group.addEventListener("pointerleave", onPointerLeave);
  group.addEventListener("keydown", onKeyDown);
  group.addEventListener("focusout", onFocusOut);
  document.addEventListener("pointerdown", onOutsidePointerDown);

  return () => {
    trigger.removeEventListener("click", onTriggerClick);
    group.removeEventListener("pointerenter", onPointerEnter);
    group.removeEventListener("pointerleave", onPointerLeave);
    group.removeEventListener("keydown", onKeyDown);
    group.removeEventListener("focusout", onFocusOut);
    document.removeEventListener("pointerdown", onOutsidePointerDown);
    delete group.dataset.aboutMenu;
    delete group.dataset.open;
  };
}
