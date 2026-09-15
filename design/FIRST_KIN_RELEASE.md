# FIRST KIN — Family · Tribe · Village

**Playable rebuild · 14 September 2026**

The strongest idea in the supplied work was knowledge that survives through
people. FIRST KIN makes that the center of a settlement and regional
simulation: feeding people frees time to teach; teaching creates builders
and providers; a working settlement can welcome families and explore.

The new identity is **FIRST KIN**. The presentation uses illustrated human
characters and portraits, a warm earth palette, an isometric settlement,
and direct planning controls. No emoji characters appear in the live game.

## What was reviewed

All 28 uploads were ingested. They contain 24 unique files. The four
`(1).json` uploads are exact duplicates of `characters.json`, `skills.json`,
`recipes.json` and `resources.json`. The two TEACH HTML builds are distinct
versions and are both preserved. Checksums are in
`legacy/design/INGEST_MANIFEST.json`.

The documents already proposed one shared community, but the uploaded
prototypes operated separately. The earlier P0-E build improved TEACH's
camp rules. This rebuild supplies the shared campaign, live field return,
spatial settlement construction and regional progression.

## The combined design

| Influence | FIRST KIN implementation |
|---|---|
| TEACH | Named people, AM/PM plans, understanding versus practical skill, teaching, dinner, rest and the consequences of losing knowledge holders |
| THREE NIGHTS | A playable provider, movement and pursuit, rod-timing fishing, food for the provider versus food carried home |
| GREAT KILL | Pre-positioned hunters, Tracker/Longarm/Spearwall/Breaker/Keeper roles, committed autonomous resolution and shared results |
| SimCity-style settlement management | Place buildings on open ground, pay materials, assign builders, connect services with paths, balance food and housing against population |
| Civilization-style regional development | Reveal nearby places, choose linked discoveries, meet trading communities, establish productive outposts and grow through settlement milestones |

These are inspirations adapted to this game's scale. FIRST KIN is an
original fictional world rather than a recreation of either commercial game.

## What now works

**Human community.** Orr, Ma, Grok, Nana, Lug and Eeka begin the game. Three
pairs of new kin can join when housing, food, trust and timing allow.
Each person has a portrait, known skills, practical ability, health, fatigue
and two assignments per sun. The current population ceiling is twelve.

**Teaching that matters.** Observation grants understanding without a free
practical level. Demonstrators must be living practitioners performing a
relevant action in the same half-day. A provider away from camp cannot be
watched remotely. Practice and successful work develop ability. Tribe
formation requires three practiced firekeepers.

**Settlement services.** Eight placeable types cover paths, family shelters,
storehouses, water places, smoke racks, growing plots, workshops and a
gathering circle. Pay once at placement; workers complete the site. Finished
services must connect to the hearth's path network. Shelters expand capacity,
storage limits spoilage, water places supply dawn water, and smoke racks
preserve food. Plots use seeds and water, grow over time, and return seeds
with their harvest.

**One field outcome.** Fishing and hunting reserve the appropriate shared
tools. Fishing skill and hooks widen the timing window. Hunters pursue
quarry, and group members execute their assigned roles. Starting health
carries into the scene; only new field injuries are applied on return.
Each encounter has an identity, and the campaign accepts its payout once.
Resource depletion limits what can come home. Automatic provider resolution
is available when the player wants to focus on settlement planning.

**Development beyond camp.** Five linked discoveries unlock tools, crops,
bows, a gathering circle and exchange. Scouting reveals nine named places.
Amber Hearth exchanges fiber for preserved food; South Ford exchanges stone
for fiber. Suitable places can become outposts that produce a resource each
dawn. Family, tribe and village conditions are visible in Council.

**Continuity.** Four seasons cycle every 24 suns. Food and water demand
follow the population; field stocks recover seasonally; fresh food spoils;
fire and shelter affect cold exposure. Dinner records discoveries, completed
buildings, harvests and lessons involving named people. Local saves and JSON
export/import retain the campaign.

## Verification and limits

- 29 simulation and progression checks passed, including observation,
  practice, shared tools, construction, path activation, crops, winter,
  exactly-once field results, save validation, and all three field scenes.
- The controller integration harness exercised starting, map placement,
  assignments, daily resolution, dinner, sleep, every panel, zoom, field
  return, saving/loading and malformed-import rejection.
- A normal 30-sun campaign reached tribe on sun 5 and village on sun 9,
  retained all twelve people through winter, completed all discoveries,
  harvested crops, traded, and established an outpost. No resources or
  unlocks were injected into that progression run.
- Desktop and mobile canvas renders and all twelve portraits were inspected.
  Full browser interaction, touch behavior, focus handling and responsive
  page layout have not been verified in an actual browser. The environment
  lacked a working browser executable; the controller harness is not a
  substitute for that final check.

The game remains a **playable vertical slice**. It does not yet simulate
births, aging, a family tree, independent rival decisions, war, traffic,
procedural regions or multiple managed villages. The complete original
multi-night THREE NIGHTS scenario remains archived; its provider mechanics
are integrated here. Outposts currently produce resources without separate
staffing. Six founder bodies are shared as map variants for arriving kin;
all twelve portraits are distinct. Saves from earlier TEACH builds cannot
be imported into this state model.

## Lore direction

The current people, communities and event prose are fictional. Family,
tribe and village are game milestones, not claims about a universal path
for real cultures. No specific Indigenous nation has been assigned to this
prehistoric setting.

The next content chapter should specify its people, place, period and
knowledge holders. Place knowledge, seasonal observations, teaching
relationships and community memory are the natural connections to gameplay.
`data/lore.json` preserves fields for attribution, source, usage terms and
mechanic connections. It contains no added cultural stories and is not yet
a live import feature.

## Next development priorities

1. Browser and touch playtesting, followed by interface and balance fixes
   based on actual play sessions.
2. Dedicated body animations for all people; clearer worksite movement,
   seasonal ground detail and richer settlement sound.
3. Kinship, aging and knowledge succession, giving the family-to-village
   journey consequences across generations.
4. Neighbor needs, negotiated exchange, outpost workers and a second
   settlement managed through the same regional simulation.
5. A distinct, attributed lore chapter shaped around the chosen community
   and setting.

## Files

Open `first-kin.html` to play. `first-kin-project.zip` contains the complete
source, artwork, tests, build script, rendered QA evidence and preserved
prototypes. Its README includes controls and a starting route. The optional
`qa/campaign-save.json` can be imported to inspect the developed test village.
