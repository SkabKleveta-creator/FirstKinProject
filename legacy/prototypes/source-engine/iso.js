/* ============================================================================
   engine/iso.js — isometric projection (GREAT KILL camera)
   ----------------------------------------------------------------------------
   Extracted from great_kill.html isoPos()/screenToGrid(). Diamond tiles,
   painter's-order depth sort (draw back-to-front by gx+gy).
   ========================================================================== */

// iso half-metrics from great_kill.html: TW=46 (tile width/2 basis), TH=23
export const ISO = { TW: 46, TH: 23 };

// origin (OX,OY) is set by the scene at resize time and passed in.
export function isoPos(gx, gy, ox, oy, tw = ISO.TW, th = ISO.TH) {
  return { x: ox + (gx - gy) * (tw / 2), y: oy + (gx + gy) * (th / 2) };
}

export function screenToGrid(sx, sy, ox, oy, tw = ISO.TW, th = ISO.TH) {
  const dx = sx - ox, dy = sy - oy;
  const gx = (dx / (tw / 2) + dy / (th / 2)) / 2;
  const gy = (dy / (th / 2) - dx / (tw / 2)) / 2;
  return { gx: Math.round(gx), gy: Math.round(gy) };
}

// compute the origin that centers a gw×gh grid in a W×H viewport.
export function isoOrigin(W, H, gh, th = ISO.TH) {
  return { ox: W / 2, oy: H / 2 - (gh * th) / 2 - 6 };
}

// depth key for painter's algorithm — sort ascending before drawing.
export function depthKey(gx, gy) { return gx + gy; }
