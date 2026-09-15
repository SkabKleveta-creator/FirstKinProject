/* ============================================================================
   engine/flat.js — flat square projection (THREE NIGHTS camera)
   ----------------------------------------------------------------------------
   Extracted from three_nights.html (TILE=48 square grid). Straightforward
   cell-to-pixel with a camera offset the scene controls.
   ========================================================================== */

export const FLAT = { TILE: 48 };
export const HALF  = FLAT.TILE / 2;
export const QUART = FLAT.TILE / 4;

// grid cell -> pixel top-left, given a camera offset (camX,camY) in pixels.
export function flatPos(gx, gy, camX = 0, camY = 0, tile = FLAT.TILE) {
  return { x: gx * tile - camX, y: gy * tile - camY };
}

// pixel -> grid cell.
export function screenToGridFlat(sx, sy, camX = 0, camY = 0, tile = FLAT.TILE) {
  return { gx: Math.floor((sx + camX) / tile), gy: Math.floor((sy + camY) / tile) };
}

// center camera on an actor, clamped to grid bounds within the viewport.
export function centerCam(actor, W, H, gw, gh, tile = FLAT.TILE) {
  let camX = actor.x * tile - W / 2 + tile / 2;
  let camY = actor.y * tile - H / 2 + tile / 2;
  camX = Math.max(0, Math.min(camX, gw * tile - W));
  camY = Math.max(0, Math.min(camY, gh * tile - H));
  return { camX, camY };
}
