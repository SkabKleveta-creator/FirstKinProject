# Mechanics Matrix

Fast reference: what each prototype does with the same underlying idea.
Use this to spot where they agree (reuse) and where they diverge (decide).

| Idea | TEACH | THREE NIGHTS | GREAT KILL |
|---|---|---|---|
| **Scope** | Whole tribe, camp | One hunter, journey | Hunt party (5 roles) |
| **Camera** | Top-down grid 4:3 | Real-time portrait 3/4 | Isometric portrait |
| **Loop** | Plan→Run→Dinner→Sleep ×10 | Walk→Hunt→Fish→Walk ×4 days | Plan→Run→Count |
| **Control** | Commit am/pm, watch | Real-time joystick+2 buttons | Place, commit, watch |
| **Time unit** | "sun" (day) | "day/night" | "call" (per hunt) |
| **Food: tribe** | `meat/green/root` needs | meat quota to carry home | `meat` = kill score |
| **Food: self** | (tribe-level only) | `fish` = your belly | (n/a) |
| **Combat** | Abstract hunt rolls | Real-time bow/club | Autonomous role sim |
| **Terrain** | Tile types, weather | Concealment, LOS, biome | Iso concealment, fire field |
| **Skill growth** | head/hand, teach/watch/try | (not tied back) | (per-hunt only) |
| **Crafting** | 4 real recipes | (weapon *choice*, not craft) | (n/a) |
| **Loss** | Old can die, knowledge lost | Fail a leg / go hungry | Hunter HP (per-hunt) |
| **Writing** | One-voice dinner | Gate/level flavor | Role one-liners, count |
| **Tribe identity** | Named (ORR..EEKA) | "the tribe" (fiction) | Roles (BIRDDOG..KEEPER) |
| **Determinism** | Scripted arc | Authored levels | Headless-verifiable sim |
| **Shared engine** | own (top-down) | iso/tile/conceal base | carried from THREE NIGHTS |

## Agreements to lock in (reuse these)
- Tile codes `0..6` (THREE NIGHTS + GREAT KILL already match).
- Emoji lexicon + cave-tongue voice (all three).
- Concealment model: grass hides body, head shows (both field scenes).
- Plan-then-watch commitment (TEACH + GREAT KILL; THREE NIGHTS at gates).

## Divergences to decide (pick one during unification)
1. **Clock:** sun vs day/night vs call → **`sun` is the atom** (see UNIFICATION Phase 0). Field journeys span multiple suns.
2. **Meat semantics:** need-level vs quota vs score → unify as `tribe.needs.meat`, with `actor.belly` for self.
3. **Tribe casting:** named people vs roles → cast named people into roles (map in `characters.json`).
4. **Skill persistence:** only TEACH grows skill; field must write it back.
5. **Fire scope:** camp-only (TEACH) vs per-camp in field (THREE NIGHTS) → decide if field camps share the hearth meter.
