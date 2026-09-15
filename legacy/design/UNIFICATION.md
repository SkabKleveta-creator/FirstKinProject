# Unification Plan

Goal: fold TEACH, THREE NIGHTS, and GREAT KILL into **one game** where
planning a day at camp can send people into the field, and the field writes
its results back to camp. Work out each mechanic first (done, in the three
prototypes), then merge along clean seams.

## The mental model: one state, three scenes

```
                 ┌──────────────────────────────────────┐
                 │            SHARED STATE                │
                 │  tribe (needs, inv, memory, people)    │
                 │  world (day/season, weather)           │
                 └──────────────────────────────────────┘
                     ▲            ▲              ▲
        writes back  │            │              │  writes back
                     │            │              │
        ┌────────────┴──┐  ┌──────┴───────┐  ┌───┴─────────────┐
        │ SCENE: CAMP   │  │ SCENE: FIELD │  │ SCENE: HUNT     │
        │  (TEACH)      │  │ (THREE NIGHTS)│ │ (GREAT KILL)    │
        │  plan the day │  │ solo journey  │  │ party kill      │
        └───────────────┘  └───────────────┘  └─────────────────┘
```

TEACH's `state` is the seed of SHARED STATE — it already holds needs,
inventory, tribe memory, and per-person head/hand. The field scenes become
things a camp action can *launch*, returning a result object.

## The seams (where they already almost connect)

1. **TEACH already models both field activities as instant actions.**
   - `hunt_small` / `fish` → the natural hook for a THREE NIGHTS journey.
   - `hunt_big` with `resolveBigHunt()` (2 hunters, 2 spears, combined power)
     → the natural hook for a GREAT KILL party.
   Replacing "resolve instantly" with "optionally play out the scene" is the
   whole merge, mechanically.

2. **THREE NIGHTS and GREAT KILL already share an engine and tile scheme.**
   Same tile codes (0..6), concealment model, camp fire, win dance, BFS
   carve. GREAT KILL's file explicitly says it carried the engine over.
   That shared engine is the basis for a common `engine/` module.

3. **All three speak cave tongue and use the same emoji lexicon.** The
   writing layer is already unified in spirit; just needs one shared string
   table.

## Contracts between camp and field

Define a tiny handoff so scenes don't need to know each other's internals.

### Launching a field scene (camp → field)
```js
// camp asks the field to run
launchField({
  scene: 'three_nights' | 'great_kill',
  actors: [personId, ...],     // who goes (cast into roles for great_kill)
  loadout: { tool_spear, tool_bow, ... }, // what they carry from inventory
  goal: { meatQuota: n },      // pulled from tribe.needs
  world: { season, weather }   // so the field looks/behaves right
})
```

### Returning a result (field → camp)
```js
// field hands back a plain object; camp applies it
{
  meat: n, hide: n, bone: n,        // add to tribe needs/inv
  bellySpent: n,                     // per-actor (three_nights)
  skillGains: { personId: { hunt:+1, fish:+1 } }, // persist head/hand
  injuries:  { personId: { tired:+x, sick:bool } },// persist harm
  losses:    [personId, ...],        // someone didn't come back
  memoryLine: "MEAT FALL. HOME."     // one-voice line for dinner
}
```

Camp already knows how to `modNeed`, `modInv`, `learn`, and speak a dinner
voice — so applying a result reuses existing TEACH functions.

## Phased plan

### Phase 0 — align vocabulary (cheap, do first)
- Pull roster, recipes, resources, skills out of each HTML into the shared
  `data/*.json`. Each prototype imports the same tables.
- Adopt one clock. **The atom is the `sun`.** A sun at camp is one turn; a
  field journey spans several suns that also advance camp time. (THREE
  NIGHTS's "day/night" and GREAT KILL's "call" both fold into suns.)

### Phase 1 — extract the engine
- Lift the shared iso/tile/concealment/BFS/depth-sort code from THREE NIGHTS
  + GREAT KILL into `engine/` (rendering, pathing, concealment, sim step).
- Both field scenes rebuild on top of it. TEACH stays top-down for now
  (it's a different camera by design; that's fine).

### Phase 2 — the handoff
- Implement `launchField()` / result-apply in a tiny host shell.
- Wire TEACH's `hunt_small`/`fish` → THREE NIGHTS, `hunt_big` → GREAT KILL,
  behind a flag so instant-resolve still works as fallback.

### Phase 3 — persistence both ways
- Field scenes read real tribe state (who sent you, real quota, real tools).
- Field results persist skill/injury/loss back to camp people.
- Dinner voice can now speak lines earned in the field.

### Phase 4 — one shell
- A single host: camp is the hub; field scenes are launched from it; time,
  weather/season, and tribe state flow through all of them continuously.

## Risks / watch-items
- **Don't let the merge flatten the one-voice discipline.** More systems
  means more temptation to over-narrate. Guard `dinnerVoice()`.
- **Two cameras (top-down camp, iso field) is okay** — resist forcing TEACH
  into iso just for consistency; the camera shift signals "you left camp."
- **Determinism.** GREAT KILL's headless-verifiable sim is a feature; keep
  field results reproducible enough that "commit then watch" feels fair.
- **Scope.** Each phase should leave a playable build. No big-bang merge.
