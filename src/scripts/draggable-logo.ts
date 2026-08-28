/**
 * Draggable header logo with a spring return, reimplemented once from the
 * legacy inline IIFE (which was duplicated into all 8 pages and broken:
 * it mixed three spellings of its pointer-id variable, so pointer capture
 * threw a ReferenceError).
 *
 * Behavior contract:
 * - Position changes only via transform: no layout shift.
 * - A plain click (movement under the drag threshold) navigates Home.
 * - One pointer at a time, tracked by pointer id, with pointer capture.
 * - Release springs the logo back; with reduced motion it snaps back instantly.
 * - Init is idempotent and returns a cleanup function.
 */

const DRAG_THRESHOLD = 4; // px of movement before a press becomes a drag

export function initDraggableLogo(icon: HTMLAnchorElement): () => void {
  if (icon.dataset.draggableLogo === "on") return () => {};
  icon.dataset.draggableLogo = "on";

  let pointerId: number | null = null;
  let dragging = false;
  let dragged = false; // did the current press ever cross the threshold?
  let tx = 0;
  let ty = 0; // current translation
  let startX = 0;
  let startY = 0; // pointer-down position minus current translation
  let lastPx = 0;
  let lastPy = 0;
  let returnAnimation: Animation | undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setTransform = () => {
    icon.style.transform =
      tx === 0 && ty === 0 ? "" : `translate(${tx}px, ${ty}px)`;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (pointerId !== null) return; // already tracking another pointer
    if (returnAnimation) {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(icon).transform);
      tx = matrix.m41;
      ty = matrix.m42;
      returnAnimation.cancel();
      returnAnimation = undefined;
      setTransform();
    }
    pointerId = e.pointerId;
    dragged = false;
    startX = e.clientX - tx;
    startY = e.clientY - ty;
    lastPx = e.clientX;
    lastPy = e.clientY;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;

    if (!dragging) {
      const moved = Math.hypot(e.clientX - lastPx, e.clientY - lastPy);
      if (moved < DRAG_THRESHOLD) return;
      dragging = true;
      dragged = true;
      icon.classList.add("dragging");
      icon.setPointerCapture(e.pointerId);
    }

    tx = e.clientX - startX;
    ty = e.clientY - startY;
    lastPx = e.clientX;
    lastPy = e.clientY;

    setTransform();
  };

  const onPointerEnd = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    if (!dragging) return;
    dragging = false;
    icon.classList.remove("dragging");
    if (icon.hasPointerCapture(e.pointerId)) {
      icon.releasePointerCapture(e.pointerId);
    }

    if (reducedMotion.matches) {
      tx = ty = 0;
      setTransform();
    } else {
      const from = icon.style.transform;
      tx = ty = 0;
      icon.style.transform = "";
      returnAnimation = icon.animate(
        [{ transform: from }, { transform: "none" }],
        { duration: 500, easing: "cubic-bezier(.2,1.35,.4,1)" },
      );
      returnAnimation.addEventListener(
        "finish",
        () => {
          returnAnimation = undefined;
        },
        { once: true },
      );
    }
  };

  // A drag must not end in navigation; a plain click must. The click event
  // fires after pointerup, so the `dragged` flag decides.
  const onClick = (e: MouseEvent) => {
    if (dragged) {
      e.preventDefault();
      dragged = false;
    }
  };

  const onDragStart = (e: DragEvent) => e.preventDefault(); // no native image drag

  icon.addEventListener("pointerdown", onPointerDown);
  icon.addEventListener("pointermove", onPointerMove);
  icon.addEventListener("pointerup", onPointerEnd);
  icon.addEventListener("pointercancel", onPointerEnd);
  icon.addEventListener("click", onClick);
  icon.addEventListener("dragstart", onDragStart);

  return () => {
    returnAnimation?.cancel();
    icon.removeEventListener("pointerdown", onPointerDown);
    icon.removeEventListener("pointermove", onPointerMove);
    icon.removeEventListener("pointerup", onPointerEnd);
    icon.removeEventListener("pointercancel", onPointerEnd);
    icon.removeEventListener("click", onClick);
    icon.removeEventListener("dragstart", onDragStart);
    icon.style.transform = "";
    delete icon.dataset.draggableLogo;
  };
}
