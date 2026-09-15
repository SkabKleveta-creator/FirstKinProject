# CAVE TEACH — Ingest, review and first improvement release

**Release:** P0-E, The First Settlement  
**Reviewed:** 14 September 2026  
**Direction supplied by Ken:** a prehistoric community simulation built around teaching, learning, hunting, fishing and the emergence of an early civilization, with a deliberate path for expanding Indigenous lore.

## 1. What arrived

28 uploaded files contain **24 unique byte sequences**. Four pairs are exact duplicates:

| Canonical file | Exact duplicate |
|---|---|
| `characters.json` | `characters(1).json` |
| `skills.json` | `skills(1).json` |
| `recipes.json` | `recipes(1).json` |
| `resources.json` | `resources(1).json` |

The two TEACH HTML files are **different versions**, not duplicates. P0-D adds the harsher food/health rules, young-person prompt, inventory drawer and expanded coordinated hunt over P0-C. Both are preserved. Nothing was deleted from the uploaded set.

`INGEST_MANIFEST.json` records every original filename, byte count and SHA-256 digest. The consolidated project uses one canonical copy of each shared JSON file.

## 2. What the existing game actually is

TEACH is the core game. THREE NIGHTS is a separate real-time provider journey; GREAT KILL is a separate placement-and-resolution hunt. The supplied documents already identify this relationship clearly. The three builds do not yet share a live camp state.

The strongest existing idea is **knowledge carried by people**: observation, practice, teaching and the consequences of losing someone. That gives the project its own identity. A lasting settlement should grow out of that system: food security frees time for teaching; better knowledge enables useful tools and buildings; a stronger camp creates room for exploration and collective memory.

The original ten-day trial proves a survival loop. It does not yet prove an early-civilization loop. P0-E adds the first material step toward that: work that changes what remains in the camp tomorrow.

## 3. Source problems found and handled

| Finding in supplied source | P0-E behavior |
|---|---|
| `learn()` increases `hand`, so watching grants practical skill despite the head/hand pillar. | Watching adds understanding only. Practice and skilled work develop practical ability, capped at five. |
| `teach()` checks both AM and PM watcher assignments at once. | Observation resolves only against the current half-day's active demonstration. |
| Both `teach()` and `doWatch()` can grant learning for the same event. | One observation path awards understanding; repeated watching does not stack free skill. |
| Teachers can select skills they do not know; a dead or inactive mentor can still be targeted. | A demonstration needs a living, knowledgeable practitioner and a successful action. |
| The roster labels the number of `hand` keys as HEAD, including zero-valued entries. | Character details show understanding and practical levels separately. |
| `fiber` exists as an action but is absent from the action menu. | Fiber gathering is available and draws from a recovering node. |
| Dinner always charges six food despite calculating the living population. | Food demand follows the number of living people. |
| Dinner voice infers hunger from remaining inventory after consumption. | The voice uses the actual meal shortfall. An empty bowl after a full meal is not a famine. |
| `dinner()` clears cold before checking cold-related voice lines. | The day's exposure is retained in the daily outcome record. |
| A woodless hearth gains heat; several workers can effectively share one tool simultaneously. | Heat requires fuel. Digging tools, spears, baskets, hooks and axes have half-day availability. |
| Fish/gathering stocks are unlimited; survival ends after ten suns. | Stocks deplete and recover; four seasons cycle, and play continues beyond the first year. |
| Elder illness depends on a generic root-as-medicine loop and an accumulating fatigue floor. | Food, water, warmth and rest affect recovery. Illness and death remain possible; an arbitrary root does not function as a guaranteed cure. |
| The field helper claims every legal tile becomes reachable, but carving stops after eight passes. | A complete connector search joins stranded components; a 30-cell barrier regression and 60 seeded maps now pass. |

Crafting now requires understanding and practical crafting experience. This makes the teaching cycle matter for development, rather than allowing an untrained character to manufacture every tool immediately.

The supplied roster sometimes has practical ability without the matching `know` entry, and contains an undefined `carry` skill. P0-E normalizes initial understanding to include existing positive practical skills, excludes undefined `carry`, and otherwise keeps the six original people and their abilities.

## 4. The improved playable loop

1. **Read the camp and land.** Check food, weather, fatigue, available tools and remaining local resources.
2. **Plan two actions per person.** Pair watchers with practitioners. Reserve work for food and warmth, learning, materials or a building project.
3. **Commit the sun.** Morning and afternoon resolve. Pause controls playback; it does not change the committed assignments.
4. **Share dinner.** See who ate, what was learned, what was built and what was lost. One short fictional voice line records the day.
5. **Rest.** Fire falls, people recover, resources regrow and watered plants develop.
6. **Continue.** Skills, supplies, camp structures and memory remain. The next season changes the available options.

The first day's plan is an example, with observation followed by practice. Later days begin at rest. The player can explicitly repeat the previous plan to reduce repetitive selections without silently handing planning authority to an advisor.

### New camp development

| Project | Material cost | Work slots | Effect |
|---|---|---:|---|
| Shelter | 5 wood, 3 fiber | 3 | Helps protect from cold and improves nightly rest. |
| Storehouse | 4 wood, 2 stone, 2 fiber | 3 | Changes nightly fresh-food spoilage from 25% to 8%, rounded down. |
| Drying rack | 3 wood, 2 fiber | 2 | Enables converting 3 meat to 3 preserved food using 1 wood and an active hearth. |
| Garden | 3 wood, 2 stone | 3 | Opens three plots. The builder discovers the experimental growing method. |

Projects pay materials when work begins; later work slots advance the same project without charging the materials again. Completed structures appear at fixed camp locations. These are gameplay abstractions, not a reconstruction of a particular archaeological society.

Planting spends one seed. Watered plots gain one growth step per nonfreezing night; four steps produce a harvest. Each mature plot yields five roots and returns two seeds. This is an intentionally small plant–tend–harvest system. Species, soil types, pests, domestication and regional crop histories are not modeled yet.

### Learning and memory

The knowledge view shows who understands each method and who has practiced it. Important methods with only one holder are visible. Completing a skill-transmission goal requires three living people with practiced firecraft.

Every dinner adds an event to the camp chronicle. Retelling a recorded memory costs a work slot and increases trust; it does not manufacture technical skill. The story reflects a game event rather than inventing a real-world tradition.

### Persistence

Local saves retain the roster, inventory, development, plots, seasonal clock, random-number state and history. Save export/import supports moving the camp between devices. Reloading during a running sun returns to the last stable saved phase. Invalid save files are rejected before assigning their state.

## 5. Indigenous lore: implementation direction

The current playable camp is fictional and prehistoric. **No specific living Indigenous people have been designated as the game's prehistoric population.** The next content layer should name the people, place, time and knowledge source for each entry, rather than treating unrelated traditions as one interchangeable culture.

This approach is informed by the National Museum of the American Indian's emphasis on the diversity, histories and contemporary lives of Native peoples in [Native Knowledge 360°](https://americanindian.si.edu/nk360/about/essential-understandings). A useful game-development reference is [Never Alone](https://www.neveralonegame.com/never-alone), whose cultural insights feature elders, storytellers and other Alaska Native community members. These are design references, not permissions to reproduce their stories or media.

The new `lore.json` structure reserves:

- The people or nation, place and relevant period.
- The knowledge holder or author, source link and usage terms.
- A distinction between public knowledge, an attributed story and original fiction.
- The connection to gameplay and the entry's review status.

The first useful lore connections are **place knowledge, seasonal observation, teaching relationships and retelling**. Each can inform an action already present in the game. A lore entry should change what the player notices or understands, rather than serving as a generic bonus attached to a culture.

No culture-specific story was added in this release. The important unresolved content choice is which particular people, place and period Ken wants the first collection to address. That choice can now be made without rebuilding the camp simulation.

The existing terse “cave tongue” is retained for the fictional prototype's dinner lines. A future attributed tradition should use its own appropriate narration and language guidance; it should not inherit that invented speech style automatically.

## 6. What still separates the three prototypes

P0-E improves the camp foundation. It does **not** claim that field unification is complete.

| Area | Current status |
|---|---|
| Camp fishing and hunting | Resolve through the camp simulation. |
| THREE NIGHTS real-time movement and rod-timing fishing | Preserved as a separate playable HTML prototype. |
| GREAT KILL five-role tactical hunt | Preserved as a separate playable HTML prototype. |
| Camp → field → camp state transfer | Still to implement. |
| Field skill and injury persistence into camp | Still to implement. |
| Shared field helper code | Available and tested; not yet wired into the original field HTML builds. |
| Camp construction | Fixed locations; no free-placement building system. |
| Generations, new population, other settlements and trade | Not implemented. |

There is additional documentation drift to resolve before merging: the shared-engine README describes THREE NIGHTS as a flat camera, but the supplied live HTML uses a diamond/isometric `isoPos()`. Its bush passability and concealment rules also differ from the proposed shared rules. The original HTML branches were preserved rather than silently changing those field mechanics during a camp release.

GREAT KILL expects five simultaneous roles. The shared roster provides six people of different ages and capabilities, and its proposed casting can assign GROK to two roles. A proper handoff needs a unique actor per role, appropriate equipment and a camp staffing decision; a character should not silently be in two places at once.

## 7. Next integration scope

The next playable release should connect **one river outing** to camp, using an actual named provider, reserved equipment and a defined time cost. It should return fish, fatigue and skill results exactly once. A cancelled or failed outing must also return a valid result. Test that camp time advances once and the provider cannot also perform a second camp job during that outing.

Then connect the coordinated hunt through the same result contract. Only after those links are reliable should the game expand to regional camps, population growth and generational knowledge transfer.

For a longer-term early-civilization model, development should be expressed through practical capabilities: reliable food, care, shelter, storage, shared knowledge, specialization and relationships between communities. A single mandatory conquest or technology ladder would erase much of the distinct simulation already present here.

## 8. Verification and limits

- All 22 simulation regression checks passed.
- All 10 supplied engine checks passed.
- The added wide-barrier test and 60 seeded disconnected-map cases passed.
- All four preserved prototype scripts and the new build passed JavaScript syntax checks.
- The new page has no duplicate IDs, missing static element references or missing inline event functions.
- One deterministic progression from the actual fresh-camp state retained all six people through 24 suns, completed all four projects and harvested two plots. It finished with all four milestones. This checks that the development path is achievable; wider difficulty tuning remains future work.
- **Visual browser, touch and accessibility behavior remain unverified.** The browser executable was unavailable and the installation attempt timed out. No screenshots were rendered and no browser interaction tests passed. The responsive styles and controls have been authored and structurally checked, but need a real phone/browser pass.

The delivered HTML is a self-contained playable build intended for that next hands-on review. It is not a public deployment or a claim that the entire civilization game is complete.
