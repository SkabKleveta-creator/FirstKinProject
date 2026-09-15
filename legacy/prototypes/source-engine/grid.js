/* ============================================================================
   engine/grid.js — the shared grid: bounds, passability, concealment,
   BFS pathfinding, and the "no map can wall itself off" carve guarantee.
   ----------------------------------------------------------------------------
   Extracted and generalized from great_kill.html (the BFS carve + pathing)
   and three_nights.html (same tile rules). The originals read a module-global
   `map`; here every function takes an explicit Grid so both field scenes and
   headless verification can share one implementation.

   A Grid is:  { w, h, cells: number[h][w] }   (cells hold TILE codes)
   ========================================================================== */

import { TILE, BLOCK, HIDE } from './tiles.js';

export function makeGrid(w, h, fill = TILE.GROUND) {
  const cells = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) row.push(fill);
    cells.push(row);
  }
  return { w, h, cells };
}

export function inb(g, x, y) { return x >= 0 && y >= 0 && x < g.w && y < g.h; }
export function at(g, x, y)  { return inb(g, x, y) ? g.cells[y][x] : TILE.ROCK; }
export function set(g, x, y, t) { if (inb(g, x, y)) g.cells[y][x] = t; }

export function passable(g, x, y) {
  return inb(g, x, y) && !BLOCK[g.cells[y][x]];
}
export function conceals(g, x, y) {
  return inb(g, x, y) && !!HIDE[g.cells[y][x]];
}

/* Manhattan-ish helpers */
export function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

/* ── seeded RNG (mulberry32) — verbatim from great_kill.html ──
   Same seed → same map → deterministic, verifiable runs. */
export function mulberry(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── BFS pathfinding (4-connected) ──
   Extracted from great_kill.html bfs(). Returns an array of [x,y] steps
   from source to target inclusive, or null if unreachable. */
export function bfs(g, sx, sy, tx, ty) {
  if (!passable(g, sx, sy) || !passable(g, tx, ty)) return null;
  const q = [[sx, sy]], seen = {}, prev = {};
  seen[sx + ',' + sy] = 1;
  const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length) {
    const c = q.shift();
    if (c[0] === tx && c[1] === ty) {
      const path = []; let k = tx + ',' + ty;
      while (k) { const p = k.split(','); path.unshift([+p[0], +p[1]]); k = prev[k]; }
      return path;
    }
    for (let i = 0; i < 4; i++) {
      const nx = c[0] + d[i][0], ny = c[1] + d[i][1], key = nx + ',' + ny;
      if (seen[key] || !passable(g, nx, ny)) continue;
      seen[key] = 1; prev[key] = c[0] + ',' + c[1]; q.push([nx, ny]);
    }
  }
  return null;
}

/* ── reachability flood from a source ── */
export function reachable(g, sx, sy) {
  const seen = {};
  if (!passable(g, sx, sy)) return seen;
  const q = [[sx, sy]]; seen[sx + ',' + sy] = 1;
  const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length) {
    const c = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = c[0] + d[i][0], ny = c[1] + d[i][1], k = nx + ',' + ny;
      if (seen[k] || !passable(g, nx, ny)) continue;
      seen[k] = 1; q.push([nx, ny]);
    }
  }
  return seen;
}

/* ── carveOpen: guarantee no legal tile is stranded ──
   Generalized from great_kill.html carveOpen(). Floods from `source`; any
   passable tile it can't reach gets connected by punching out the nearest
   blocker. A map that can wall itself off is a shipped bug. ── */
export function carveOpen(g, source = { x: 3, y: 2 }, passes = 8) {
  for (let pass = 0; pass < passes; pass++) {
    if (!passable(g, source.x, source.y)) set(g, source.x, source.y, TILE.GROUND);
    const seen = reachable(g, source.x, source.y);

    // find a stranded passable tile
    let stranded = null;
    for (let y = 0; y < g.h && !stranded; y++)
      for (let x = 0; x < g.w; x++) {
        if (passable(g, x, y) && !seen[x + ',' + y]) { stranded = [x, y]; break; }
      }
    if (!stranded) return g; // all good

    // punch the nearest blocker toward the reachable field
    const [bx, by] = stranded;
    let best = null, bd = Infinity;
    for (let yy = 0; yy < g.h; yy++)
      for (let xx = 0; xx < g.w; xx++) {
        if (!BLOCK[g.cells[yy][xx]]) continue;
        const dd = Math.abs(xx - bx) + Math.abs(yy - by);
        if (dd > 0 && dd < bd) { bd = dd; best = [xx, yy]; }
      }
    if (best) set(g, best[0], best[1], TILE.GROUND); else return g;
  }
  return g;
}
