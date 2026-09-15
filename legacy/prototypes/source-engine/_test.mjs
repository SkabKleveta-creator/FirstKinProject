/* engine/_test.mjs — headless proof the extracted engine actually runs.
   Run: node engine/_test.mjs   (Node 14+ for ES modules via .mjs) */

import { TILE } from './tiles.js';
import { makeGrid, set, passable, conceals, bfs, carveOpen, mulberry, reachable } from './grid.js';
import { isoPos, screenToGrid, isoOrigin } from './iso.js';
import { flatPos, screenToGridFlat } from './flat.js';

let pass = 0, fail = 0;
function ok(name, cond) { (cond ? pass++ : fail++); console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`); }

/* 1. seeded RNG is deterministic */
{
  const a = mulberry(42), b = mulberry(42);
  ok('mulberry deterministic', a() === b() && a() === b());
}

/* 2. build a random-ish map the way great_kill does, then carve it open */
{
  const rnd = mulberry(7);
  const g = makeGrid(13, 13);
  for (let y = 0; y < 13; y++) for (let x = 0; x < 13; x++) {
    const v = rnd();
    let t = TILE.GROUND;
    if (v < 0.30) t = TILE.GRASS;
    else if (v < 0.36) t = TILE.BUSH;
    else if (v < 0.42) t = TILE.TREE;
    else if (v < 0.46) t = TILE.ROCK;
    set(g, x, y, t);
  }
  // deliberately wall off a corner to test carve
  for (let y = 0; y < 4; y++) for (let x = 9; x < 13; x++) set(g, x, y, TILE.ROCK);
  set(g, 11, 1, TILE.GROUND); // a stranded ground tile inside the wall

  const source = { x: 3, y: 8 };
  set(g, source.x, source.y, TILE.GROUND);

  const beforeSeen = reachable(g, source.x, source.y);
  const strandedBefore = passable(g, 11, 1) && !beforeSeen['11,1'];
  ok('stranded tile exists before carve', strandedBefore);

  carveOpen(g, source);
  const afterSeen = reachable(g, source.x, source.y);
  // every passable tile is now reachable
  let allReach = true;
  for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++)
    if (passable(g, x, y) && !afterSeen[x + ',' + y]) allReach = false;
  ok('carveOpen connects all passable tiles', allReach);
}

/* 3. bfs finds a path on an open grid and respects blocks */
{
  const g = makeGrid(5, 1);
  const p = bfs(g, 0, 0, 4, 0);
  ok('bfs open path length 5', p && p.length === 5);

  const g2 = makeGrid(5, 1);
  set(g2, 2, 0, TILE.ROCK); // wall the corridor
  ok('bfs blocked returns null', bfs(g2, 0, 0, 4, 0) === null);
}

/* 4. tile rules */
{
  const g = makeGrid(3, 3);
  set(g, 1, 1, TILE.GRASS);
  set(g, 2, 2, TILE.TREE);
  ok('grass conceals', conceals(g, 1, 1) === true);
  ok('grass passable', passable(g, 1, 1) === true);
  ok('tree blocks', passable(g, 2, 2) === false);
}

/* 5. iso projection round-trips */
{
  const { ox, oy } = isoOrigin(400, 600, 13);
  const p = isoPos(5, 3, ox, oy);
  const back = screenToGrid(p.x, p.y, ox, oy);
  ok('iso round-trip', back.gx === 5 && back.gy === 3);
}

/* 6. flat projection round-trips */
{
  const p = flatPos(6, 4, 100, 50);
  const back = screenToGridFlat(p.x + 1, p.y + 1, 100, 50); // +1 to land inside the cell
  ok('flat round-trip', back.gx === 6 && back.gy === 4);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
