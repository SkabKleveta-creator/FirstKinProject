# Prototype Dossier — GREAT KILL (tribe hunt party)

**File:** `great_kill.html` · **Codename:** RUNG 1 (DEER) · **Role:** the coordinated-hunt branch.

## What it is

A tribe of five hunters goes for one big kill. You **place** your hunters on
an isometric field, **commit**, then the kill **runs on its own** — each
hunter autonomously does their job — and you watch it resolve into a
**count**. It's the coordinated-combat counterpart to THREE NIGHTS's solo
provider.

## The loop

```
INTRO → PLAN (place 5 hunters) → RUN (autonomous kill, you watch) → COUNT (meat + share)
```

## What it proves

1. **Nobody wins alone.** Five roles, each solving a different problem:
   - 🎯 **BIRDDOG** — marks the beast from cover so the others can commit.
   - 🏹 **LONGARM** — softens from range; safe but slow.
   - 🔱 **SPEARWALL** — high HP, holds the line, takes the charge.
   - 🪃 **BREAKER** — the finisher; ends it once it's slowed.
   - 🔥 **KEEPER** — no damage, steers the beast with a fire pressure field.
   This is Pillar 5 made literal.
2. **Placement as the whole decision.** All the strategy is in *where* you
   put people before commit. After commit you're a spectator of your own plan.
3. **Position + concealment + pressure.** Grass conceals, fire repels, range
   vs melee tradeoffs — a richer version of THREE NIGHTS's terrain reading,
   now across a team.
4. **Deterministic, verifiable sim.** `stepSim()` is written to run both
   live and headless — you can verify a plan resolves fairly. Important for
   a "commit then watch" game to feel fair, not random.
5. **Iso engine reuse.** Explicitly carries THREE NIGHTS's engine (painter
   depth sort, tall grass, camp fire, win dance, BFS gate carve) into iso.

## What's real vs stubbed

| System | State |
|---|---|
| Place → commit → autonomous run → count | **Real** |
| 5 distinct hunter roles/AI | **Real** |
| Deer AI (flee, charge, drink, marked, slowed) | **Real** |
| Iso projection + depth sort | **Real** |
| Concealment + fire pressure field | **Real** |
| BFS map carve (no self-walling maps) | **Real** |
| Headless-verifiable sim | **Real** |
| "Rungs" (harder beasts beyond the deer) | **Stub** — named RUNG 1, ladder not built |
| Named tribe (uses roles, not ORR/GROK/etc.) | **Stub** — see mapping in `data/characters.json` |
| Hunter injury/death persisting to camp | **Stub** — HP is per-hunt only |
| Loot beyond meat count (hide, bone) | **Partial** — meat is the headline; raw drops not modeled |

## Key code landmarks

- `TYPES` / `COLORS` / `ORDER` — the five roles. Map to tribe in unification.
- `stepSim(st, dt, onLog)` — the shared sim core (live + headless). The crown jewel.
- `genMap()` / `carveOpen()` — procedural map + BFS guarantee of solvability.
- `isoPos()` / `screenToGrid()` — iso projection math.
- `newDeer()` — the quarry model; the template for future "rungs."
- Tile constants `GROUND..GATE` — same 0..6 scheme as THREE NIGHTS.

## What it contributes to the merge

This is the **"the tribe forms a party for a big kill"** scene. In the
unified game, when TEACH triggers a big hunt (it already has `hunt_big`
and coordinated resolution!), instead of resolving instantly it can drop
into GREAT KILL with the actual tribe members cast into roles. The meat,
hide, and bone come back into camp state; a hunter hurt badly could carry
that injury home.

## Nearest next steps

- Cast real tribe members into the five roles (use the mapping table).
- Return hide/bone alongside meat into shared inventory.
- Let hunter HP loss persist as `tired`/`sick`/injury back at camp.
- Build the "rung" ladder: deer → boar → something with teeth, reusing `newDeer()`'s shape.
