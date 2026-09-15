# Prototype Dossier — TEACH (the base)

**File:** `cave_teach_p0d.html` · **Codename:** P0-D · **Role:** the trunk.

## What it is

The home-camp survival sim. Six people, one cave, ten suns. Each sun you
plan a **morning** and **afternoon** action for everyone, hit RUN, and
watch life walk. Then dinner, then sleep, then the next sun. It ends after
sun 10 with a "cave log" you can copy out.

## The loop

```
PLAN (pick am+pm for all 6) → RUN (life walks, log fills) → DINNER (one voice) → SLEEP (fire drops, tired heals) → NEXT SUN
```

## What it proves (why it's the base)

1. **The head/hand teaching model.** Watch fills head, try fills hand,
   teach transfers head. The "young try" prompt catches the full-head /
   empty-hand trap and forces a choice: TRY, HELP, or WATCH.
2. **Permanent loss with meaning.** ORR is old and sick from sun 1. If you
   never get his fire/root knowledge into a young hand before he goes, it's
   gone — and dinner says so.
3. **Crafting as a real cost.** Each tool eats a whole slot and real
   materials (see `data/recipes.json`). No free tools.
4. **The one-voice dinner.** Stat row tallies; `dinnerVoice()` speaks the
   single line that mattered. This is the emotional engine.
5. **Scheduled weather pressure.** The 10-sun arc bakes in rain, tracks,
   cold, low water, and the "old bones heavy" teach-window.

## What's real vs stubbed

| System | State |
|---|---|
| Plan/run/dinner/sleep loop | **Real**, complete for 10 suns |
| Head/hand + teach/watch/try | **Real** |
| Crafting (4 tools) | **Real** |
| Hunt (small + big/coordinated) | **Real** |
| Weather arc | **Real** but hard-scripted to specific suns |
| Death (old can die) | **Real** (flags: `oldDied`, `maDied`) |
| Field trips (leaving camp) | **Stub** — hunting/fishing resolve instantly in-camp. This is exactly where THREE NIGHTS and GREAT KILL plug in. |
| Planting / farming | **Not present** — future (see ROADMAP) |
| Gathering beyond green/root/wood/stone | **Partial** — the verb set exists, depth is thin |

## Key code landmarks (for whoever refactors)

- `newState()` — the canonical state shape. Start here.
- `meta` / `order` — the roster. Matches `data/characters.json`.
- `RECIPES` — crafting. Matches `data/recipes.json`.
- `doAction()` — the giant verb switch. The unified action set grows from here.
- `teach()` / `doWatch()` / `trySkill()` / `learn()` — the whole head/hand system.
- `dinnerVoice()` / `afterLine()` — the one-voice writing engine. Guard this carefully.
- `applyDayStart()` / `showPlan()` weather flags — the scripted pressure arc.

## What it contributes to the merge

TEACH's `state` object **is** the unified game's home state. The field
prototypes should read from and write back to a state shaped like this one.
When GROK leaves to hunt, he leaves *this* camp; when he returns with meat
and hide, he writes back into *these* needs and inventory.

## Nearest next steps for TEACH itself

- Un-hardcode the weather arc into a small data table (so seasons can vary).
- Replace the instant `hunt_small` / `fish` resolution with a hook that can
  optionally hand off to a field scene (the unification seam).
- Pull `RECIPES` and roster out of the HTML into the shared `data/` JSON.
