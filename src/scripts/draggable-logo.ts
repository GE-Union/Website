/**
 * Draggable header logo with a spring return, reimplemented once from the
 * legacy inline IIFE (which was duplicated into all 8 pages and broken:
 * it mixed three spellings of its pointer-id variable, so pointer capture
 * threw a ReferenceError — see docs/migration-audit.md, finding 5).
 *
 * Behavior contract:
 * - Position changes only via transform: no layout shift.
 * - A plain click (movement under the drag threshold) navigates Home.
 * - One pointer at a time, tracked by pointer id, with pointer capture.
 * - Release springs the logo back (Hooke's law, legacy constants); with
 *   prefers-reduced-motion it snaps back instantly.
 * - Init is idempotent and returns a cleanup function.
 */

const STIFFNESS = 300; // spring constant (higher = snappier)
const DAMPING = 15; // damping (lower = bouncier)
const EPS_POS = 0.5; // rest threshold, px
const EPS_VEL = 0.5; // rest threshold, px/s
const DRAG_THRESHOLD = 4; // px of movement before a press becomes a drag

export function initDraggableLogo(icon: HTMLAnchorElement): () => void {
  if (icon.dataset.draggableLogo === "on") return () => {};
  icon.dataset.draggableLogo = "on";

  let pointerId: number | null = null;
  let dragging = false;
  let dragged = false; // did the current press ever cross the threshold?
  let tx = 0;
  let ty = 0; // current translation
  let vx = 0;
  let vy = 0; // velocity estimate, px/s
  let startX = 0;
  let startY = 0; // pointer-down position minus current translation
  let lastPx = 0;
  let lastPy = 0;
  let lastT = 0;
  let rafId = 0;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setTransform = () => {
    icon.style.transform =
      tx === 0 && ty === 0 ? "" : `translate(${tx}px, ${ty}px)`;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (pointerId !== null) return; // already tracking another pointer
    pointerId = e.pointerId;
    dragged = false;
    startX = e.clientX - tx;
    startY = e.clientY - ty;
    lastPx = e.clientX;
    lastPy = e.clientY;
    lastT = performance.now();
    vx = 0;
    vy = 0;
    cancelAnimationFrame(rafId);
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

    const now = performance.now();
    const dt = (now - lastT) / 1000;
    tx = e.clientX - startX;
    ty = e.clientY - startY;

    // Low-pass-filtered velocity estimate feeds the spring on release.
    if (dt > 0) {
      vx = 0.8 * vx + 0.2 * ((e.clientX - lastPx) / dt);
      vy = 0.8 * vy + 0.2 * ((e.clientY - lastPy) / dt);
    }
    lastPx = e.clientX;
    lastPy = e.clientY;
    lastT = now;

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
      tx = ty = vx = vy = 0;
      setTransform();
    } else {
      animateBack();
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

  function animateBack() {
    let prev = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.032); // clamp for stability
      prev = now;

      // Hooke's law: F = -k*x - c*v (mass = 1)
      vx += (-STIFFNESS * tx - DAMPING * vx) * dt;
      vy += (-STIFFNESS * ty - DAMPING * vy) * dt;
      tx += vx * dt;
      ty += vy * dt;
      setTransform();

      if (dragging) return; // grabbed again mid-spring
      if (Math.hypot(tx, ty) < EPS_POS && Math.hypot(vx, vy) < EPS_VEL) {
        tx = ty = vx = vy = 0;
        setTransform(); // snap exactly home, no subpixel fuzz
        return;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  }

  icon.addEventListener("pointerdown", onPointerDown);
  icon.addEventListener("pointermove", onPointerMove);
  icon.addEventListener("pointerup", onPointerEnd);
  icon.addEventListener("pointercancel", onPointerEnd);
  icon.addEventListener("click", onClick);
  icon.addEventListener("dragstart", onDragStart);

  return () => {
    cancelAnimationFrame(rafId);
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
