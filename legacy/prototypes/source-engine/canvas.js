/* ============================================================================
   engine/canvas.js — the DPR/resize pattern shared by both field prototypes.
   ----------------------------------------------------------------------------
   great_kill.html and three_nights.html each wrote their own near-identical
   resize(): read bounding rect, clamp devicePixelRatio to 2, size the canvas
   backing store, and setTransform. This is that, once.
   ========================================================================== */

// attaches a resize handler; returns a live view object {W,H,DPR} kept current.
export function setupCanvas(canvas, container, onResize) {
  const ctx = canvas.getContext('2d');
  const view = { W: 0, H: 0, DPR: 1, ctx };

  function resize() {
    const r = (container || canvas).getBoundingClientRect();
    view.DPR = Math.min(window.devicePixelRatio || 1, 2);
    view.W = r.width; view.H = r.height;
    canvas.width  = Math.round(view.W * view.DPR);
    canvas.height = Math.round(view.H * view.DPR);
    ctx.setTransform(view.DPR, 0, 0, view.DPR, 0, 0);
    if (onResize) onResize(view);
  }

  window.addEventListener('resize', resize);
  resize();
  return view;
}
