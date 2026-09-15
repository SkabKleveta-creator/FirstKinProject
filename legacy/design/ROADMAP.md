# Roadmap — Teach-driven future ideations

Future features grow out of **TEACH**, the base. The pattern is always the
same: a new thing to *know*, a new thing to *make*, a new thing to *do* —
each one another rung of the tribe climbing from bare hands toward mastery.
Everything here should obey the Pillars (knowledge is scarce, everything
costs, plan-then-watch, loss is permanent, the tribe is a system, one
voice, thumb-first).

Each ideation below has: **the hook**, **new model pieces**, **how it plugs
into TEACH**, and a rough **sequencing** note.

---

## A. Building tools (deepen crafting)

**Hook:** TEACH already has 4 tools. Turn crafting from a flat list into a
**tech ladder** where better tools need earlier tools + more skill.

**New model:**
- Tool tiers. e.g. sharp stone → hand axe → hafted axe. Later tools require
  a workbench/anvil-stone and higher `hand.craft`.
- Tool wear/durability (optional): tools degrade, giving crafting an
  ongoing purpose instead of one-and-done.
- Staged recipes already stubbed in `data/recipes.json` (`futureRecipes`).

**Plugs into TEACH via:** `RECIPES` table + `craft()`. Add a `requires`
field (prior tool / skill / station). The whole system already exists;
this is depth, not new plumbing.

**Sequencing:** first, because it's the lowest-risk extension of an
existing, proven system and it feeds every other ideation (planting needs a
hoe, better hunting needs a bow).

---

## B. Building weapons (deepen hunting)

**Hook:** Right now `tool_spear` is binary — have it or don't. Make weapons
a real progression that changes *how* hunts play out, and connect directly
to GREAT KILL / THREE NIGHTS combat.

**New model:**
- Weapon types beyond the spear: club (close, walk-night default in THREE
  NIGHTS), bow (ranged, `futureRecipes.craft_bow`), later thrown/atlatl.
- Weapon determines field role: a bow-carrier is a natural LONGARM, a
  club/blade a BREAKER. This is the bridge to GREAT KILL's role system.
- Ammo as a resource (arrows) — THREE NIGHTS already tracks a ranged count.

**Plugs into TEACH via:** crafting (make the weapon) + the field handoff
(loadout in `launchField()`). Weapon choice at camp becomes role capability
in the hunt.

**Sequencing:** second, alongside the field unification — weapons are the
most natural thing to carry across the camp↔field seam.

---

## C. Planting (old-school FarmVille ideation)

**Hook:** The tribe stops only *taking* food and starts *growing* it. A
slow, tended food source that trades time and attention for reliability —
the opposite of the hunt's high-variance payoff.

**New model:**
- A plot on the camp grid (there's already `green`/`root`/`mud` tile art).
- Seed → plant → tend (water) → wait (grows over suns) → harvest.
- Weather matters: rain helps, cold kills, drought needs watering. This
  reuses TEACH's existing weather arc as a real input.
- Needs a hoe (`futureRecipes.craft_hoe`) to open ground — ties back to (A).
- A new skill: `farm` (head/hand like the rest).

**Plugs into TEACH via:** new tile state on the grid + new actions
(`plant`, `tend`, `harvest`) in the `doAction()` switch + a growth tick in
`applyDayStart()` / sleep. Fits the plan-then-watch loop perfectly: you
plant in the morning and watch it grow across suns.

**Sequencing:** third. It's a genuinely new subsystem (growth over time),
but it lands cleanly on TEACH's existing grid + weather + sun clock. High
value: it's the mechanic that turns "survive 10 suns" into "build something
that lasts."

**FarmVille discipline note:** keep it cave-tongue and stakes-real. No
timers-as-nag, no infinite plots. Growth is measured in suns and gated by
weather and hands, so it stays part of the survival puzzle, not a chore
meta bolted on.

---

## D. Gathering (deepen foraging)

**Hook:** TEACH's gathering is thin (green, root, wood, stone, fiber). Make
the land worth *reading* — different spots, seasons, and depletion.

**New model:**
- Resource nodes deplete and regrow (don't over-pick the green patch).
- Seasonal availability (berries in one season, roots in another) — reuses
  the season clock from unification Phase 0.
- Foraging finds: rare fiber, medicine plant (cures `sick`?), flint (better
  tools) — small discoveries that reward exploring.
- A `forage` skill; baskets (`tool_basket`) already boost yield.

**Plugs into TEACH via:** node state on tiles + tuning existing gather
actions (`green`, `root`, `wood`, `stone`, `fiber`) to draw from nodes with
regrowth. Mostly a data/tuning layer over existing verbs.

**Sequencing:** fourth, or folded into (C) since planting and gathering
share the "land as a living system" model. Lower urgency because the verbs
already exist; this is enrichment.

---

## E. Things not yet named (parking lot)

Candidates that fit the world, to consider once A–D are in:

- **Shelter/expansion** — improve the cave, add sleeping room, storage that
  protects food from spoiling. (Storage interacts with everything.)
- **Fire mastery** — cooking (raw vs cooked meat value), smoking meat to
  preserve it, firing clay for pots/storage. Extends the existing `fire`.
- **Water/health** — dirty vs clean water, the medicine plant from (D),
  sickness spreading. Deepens the `sick`/`tired` model already present.
- **Trade / other tribes** — a second group to meet: exchange, tension, or
  learning new skills from them. (Big scope; late.)
- **Story of the young growing up** — the youngs (LUG, EEKA) becoming the
  strong, then the old. A generational long game — the ultimate payoff of
  the head/hand/teach system. TEACH's ending already gestures at "who young
  become."
- **Ritual / spirit** — the `spirit` tribe-memory meter wants a system:
  burial, storytelling by the fire, marks on the cave wall (the "cave log"
  already exists as a diegetic artifact).

---

## Suggested overall order

1. **Tools ladder (A)** — safest, feeds everything.
2. **Field unification + weapons (B)** — makes the branches part of the base.
3. **Planting (C)** — the big new subsystem; turns survival into building.
4. **Gathering depth (D)** — enrich the land the tribe now lives off of.
5. **Parking lot (E)** — pick what the game is asking for by then.

Each step should ship as a playable TEACH build before the next begins.
