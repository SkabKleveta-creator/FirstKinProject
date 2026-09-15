/* ============================================================================
   engine/tiles.js — the shared tile vocabulary
   ----------------------------------------------------------------------------
   Extracted from great_kill.html + three_nights.html, which independently
   converged on the SAME 0..6 tile codes. This is the single source of truth.

   Projection-independent: works for the flat grid (THREE NIGHTS) and the
   isometric grid (GREAT KILL) alike. Projection math lives elsewhere
   (engine/iso.js, engine/flat.js) — tiles only describe what a cell IS.
   ========================================================================== */

export const TILE = {
  GROUND: 0,
  GRASS:  1,  // conceals the body, does not block
  TREE:   2,  // blocks
  BUSH:   3,  // conceals, does not block
  WATER:  4,  // blocks movement (drink/fish edge only)
  ROCK:   5,  // blocks
  GATE:   6,  // goal marker (walk levels)
};

// Which tiles block movement.
export const BLOCK = { [TILE.TREE]: 1, [TILE.ROCK]: 1, [TILE.WATER]: 1 };

// Which tiles conceal a standing body (only the head shows).
export const HIDE = { [TILE.GRASS]: 1, [TILE.BUSH]: 1 };

// Display metadata — keep emoji/labels aligned with data/resources.json + world bible.
export const TILE_META = {
  [TILE.GROUND]: { key: 'ground', label: 'GROUND' },
  [TILE.GRASS]:  { key: 'grass',  label: 'GRASS',  note: 'hide body' },
  [TILE.TREE]:   { key: 'tree',   label: 'TREE',   note: 'block' },
  [TILE.BUSH]:   { key: 'bush',   label: 'BUSH',   note: 'hide body' },
  [TILE.WATER]:  { key: 'water',  label: 'WATER',  note: 'drink / fish edge' },
  [TILE.ROCK]:   { key: 'rock',   label: 'ROCK',   note: 'block' },
  [TILE.GATE]:   { key: 'gate',   label: 'GATE',   note: 'goal' },
};

export function isBlock(t)   { return !!BLOCK[t]; }
export function isHide(t)    { return !!HIDE[t]; }
