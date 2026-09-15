# Shared Model

The single source of truth for resources, skills, and people. All three
prototypes should converge on these names so state can pass between camp
and field without translation. Machine-readable versions live in
`data/` (`resources.json`, `skills.json`, `recipes.json`, `characters.json`).

## Why this matters now

Today each prototype invents its own vocabulary. TEACH tracks `meat` as a
tribe need; THREE NIGHTS splits **meat** (for tribe) from **fish** (for
you). GREAT KILL counts `meat` as a single kill score. If we don't pin the
model down, unification becomes a rename nightmare. Pin it now, refactor
each prototype toward it as we go.

## Resources

Two buckets: **needs** (consumed daily, tracked as levels) and **stuff**
(inventory items, tracked as counts).

### Needs (deplete over time)
- `meat` — tribe food from hunting/fishing.
- `green` — tribe food from gathering.
- `root` — tribe food from digging (needs 🪏).
- `water` — from the river.
- `fire` — the hearth level; drops each night, feeds on wood.

### Stuff (inventory counts)
- Raw: `wood`, `stone`, `bone`, `fiber`, `hide`.
- Tools: `tool_dig` (🪏), `tool_spear` (🏹), `tool_basket` (🧺),
  `tool_warm` (🧥), `tool_fire` (firestarter).

### Personal vs tribe food (from THREE NIGHTS)
Important design nuance to preserve: **meat is for the tribe, fish is for
you.** When a hunter is in the field, their own belly (fish) is separate
from the meat quota they owe camp. This is the hook that makes solo
survival distinct from provisioning. In the unified model, carry both:
- `tribe.needs.meat` — what you bring home.
- `actor.belly` — the individual's own sustenance while away.

## Skills (the head/hand split)

Every skill has a **head** value (do you know it) and a **hand** value (how
good the body is at it). Canonical skill keys:

`fire`, `root`, `green`, `fish`, `hunt`, `craft`, `warm`

- **Head** grows by `watch` (see someone do it) and `teach` (someone shows you).
- **Hand** grows by `try` and `do` (actually performing the action).
- Actions gate on hand + tool. Example: TRY ROOT only yields food if
  `hand.root > 0` AND `tool_dig > 0`. Otherwise "DIRT LAUGH."

### Tribe memory (aggregate)
TEACH rolls skill up into three tribe-level meters. Keep these as the
"how is the culture doing" readout:
- `trust` — grows when people learn from each other.
- `skill` — grows on any successful craft/try/teach.
- `spirit` — the tribe's morale/cohesion.

## Recipes (crafting)

From TEACH's `RECIPES`. Each craft eats a **whole action slot** plus
materials. Canonical set:

| Make | Costs | Alt | Yields |
|---|---|---|---|
| 🪏 dig tool | 1🪵 + 1🪨 | 1🪵 + 1🦴 | `tool_dig` |
| 🏹 spear | 1🪵 + 1🪨 + 1🧵 | — | `tool_spear` |
| 🧺 basket | 2🧵 | — | `tool_basket` |
| 🧥 warm | 1🦌 + 1🧵 | — | `tool_warm` |

Tool effects (keep consistent):
- 🪏 → digging root actually yields.
- 🏹 → hunt can succeed / big hunt possible; missing it, the beast bites.
- 🧺 → +1 to gather (green) and fish hauls.
- 🧥 → cold nights bite less.

## People

See `data/characters.json` for the full roster. Each person object:

```
{
  id, icon, name,
  know:   [skill,...],          // head
  hand:   { skill: level, ... },// hand
  care:   [priority,...],       // what they optimize for
  tired:  0-100,
  sick:   bool,
  alive:  bool
}
```

## The action set (verbs)

The union of what a person can be told to do. Camp actions and field
actions will merge into one verb set in the unified game.

**Camp (TEACH):** rest, keep_fire, get_water, fish, hunt_small, hunt_big,
green, root, wood, stone, fiber, craft_*, teach_*, try_*, watch_*.

**Field (THREE NIGHTS):** move (joystick), ranged (bow), close (club/blade),
fish (timing minigame), take a gate (weapon/biome choice).

**Hunt (GREAT KILL):** place hunter, commit, then autonomous roles fire.

## Open questions to resolve during unification
1. Is `fire` (hearth) a field concept too, or camp-only? (Currently camp-only in TEACH, per-camp in THREE NIGHTS.)
2. Do field hunts consume the same `hand.hunt` skill that TEACH grows? (They should.)
3. Single time unit: TEACH counts "suns," THREE NIGHTS "days/nights," GREAT KILL "calls." Pick one clock.
