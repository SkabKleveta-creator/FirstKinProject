# engine/ — the shared field engine (extracted)

This is the **actually-extracted** common code from the two field
prototypes, pulled into dependency-free ES modules and covered by a headless
test (`node engine/_test.mjs` → 10/10). It is the foundation the unified
game's field scenes build on.

## What got extracted (genuinely shared)

Both `three_nights.html` and `great_kill.html` independently converged on the
same primitives. Those are now here, once:

| Module | Contents | Source |
|---|---|---|
| `tiles.js` | The 0..6 tile vocabulary, `BLOCK`, `HIDE`, metadata | both files matched already |
| `grid.js` | `passable`, `conceals`, `bfs`, `reachable`, `carveOpen`, `mulberry` RNG, `dist` | great_kill (better BFS/carve), rules match three_nights |
| `canvas.js` | The DPR-clamp + resize + setTransform pattern | both had near-identical copies |

`grid.js` is the important one. The originals operated on a module-global
`map`; here every function takes an explicit `Grid` object, so the same code
runs in a live scene **and** in headless verification (GREAT KILL's
"headless-verifiable sim" idea, now enforceable engine-wide).

## What stayed per-scene (genuinely different)

The two field games are **not the same camera**, so projection can't be one
module. It's split cleanly instead:

| Module | Camera | Source |
|---|---|---|
| `iso.js` | Isometric diamond + painter depth sort | great_kill |
| `flat.js` | Flat square grid + follow-camera | three_nights |

Both consume the same `Grid` from `grid.js`. That's the point: shared logic,
swappable projection.

## What is NOT merged yet (be honest about scope)

This extraction is the **substrate**, not the whole merge. Still living
inside the individual HTML files, still to be lifted:

- **Rendering of actual sprites/props** (`drawGrass`, `drawTree`, hunters,
  the deer, the fire, the win dance). These are drawing code, per-scene for
  now; a shared `render.js` is a later step.
- **`stepSim()`** — GREAT KILL's autonomous hunt sim. It's the crown jewel
  but it's tightly bound to the 5 roles + deer. It should become
  `scenes/great_kill/sim.js` on top of this engine, not part of the engine.
- **THREE NIGHTS combat/fishing/level authoring** — scene logic, belongs in
  `scenes/three_nights/`.
- **The camp↔field handoff** (`launchField()` / result object) — see
  `design/UNIFICATION.md`. Not built; this engine is a prerequisite for it.

So: the shared *foundation* is merged and tested. The scenes are not yet
rebuilt on top of it, and TEACH (camp) hasn't been wired to launch them.
That's the next block of work, and the roadmap order in
`design/UNIFICATION.md` still holds.

## How to use it

```js
import { TILE } from './engine/tiles.js';
import { makeGrid, set, bfs, carveOpen, mulberry, passable, conceals } from './engine/grid.js';
import { isoPos, screenToGrid, isoOrigin } from './engine/iso.js';   // GREAT KILL-style scene
import { flatPos, centerCam } from './engine/flat.js';               // THREE NIGHTS-style scene
import { setupCanvas } from './engine/canvas.js';

// build + guarantee-solvable a map
const rnd = mulberry(seed);
const g = makeGrid(13, 13);
// ...fill g.cells from rnd()...
carveOpen(g, { x: 3, y: 8 });   // no stranded tiles, ever
```

## Next concrete steps

1. Rebuild ONE field scene (suggest THREE NIGHTS, simpler camera) on these
   modules to prove the substrate end-to-end in a browser, not just headless.
2. Lift `stepSim()` into `scenes/great_kill/sim.js` importing this engine.
3. Then, and only then, build the camp↔field handoff from UNIFICATION.md.
