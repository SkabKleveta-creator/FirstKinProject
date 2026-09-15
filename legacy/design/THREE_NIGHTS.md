# Prototype Dossier — THREE NIGHTS (solo provider)

**File:** `three_nights.html` · **Role:** the solo-hunter branch.

## What it is

One hunter, sent out by the tribe, on a multi-day journey: **walk out →
hunt → walk back**, camping and fishing between legs. Real-time,
portrait, joystick + two action buttons (ranged / close). Terrain and
concealment are the puzzle: tall grass hides your body so only your head
shows; beasts that see you run or charge.

## The journey structure

```
DAY 1  WALK OUT  → 3 hand-planned levels → CAMP → POND (fish)
DAY 2  THE HUNT  → pick plains|forest → 2 hand-planned levels → POND (fish)
DAY 3  (hunt continues / camp)
DAY 4  WALK BACK → 3 hand-planned levels → HOME (win dance)
```

Gates between legs let you choose:
- **Weapon:** club|bow on walk nights, spear|bow on the hunt night. Choice persists, switchable at any gate.
- **Biome (hunt night only):** plains (open, see far, grass hides head) vs forest (tight, trees block, beast close).

## What it proves

1. **Meat vs belly.** The core distinction: **meat is for the tribe, fish
   is for you.** You hunt to bring a quota home *and* fish to keep your own
   belly full enough to keep going. This is the survival hook TEACH doesn't have.
2. **Terrain reading as the skill.** Concealment (grass hides body, head
   still visible), line-of-sight, and beast reactions (flee vs charge) make
   position the real decision.
3. **Hand-planned levels, not random.** Each leg is authored (see
   `planWalkLevels()`), so difficulty and story beats are intentional.
4. **The fishing minigame.** Watch the rod; when it bends, tap to pull;
   pull too early and the line comes up empty. A small timing loop that
   gives "your own food" real texture.
5. **Journey framing.** Leaving and returning is a *thing that takes days*,
   with camps in between — the spatial/temporal counterpart to TEACH's
   instant hunts.

## What's real vs stubbed

| System | State |
|---|---|
| Real-time move + ranged + close combat | **Real** |
| Concealment / tall-grass hiding | **Real** |
| Authored levels per leg | **Real** |
| Weapon + biome gates | **Real** |
| Fishing timing minigame | **Real** |
| Camp fire / night / win dance | **Real** (visual beats) |
| Tribe state (who sent you, what they need) | **Stub** — the tribe is fiction here, not live data |
| Skill progression tie-back | **Stub** — hunting here doesn't grow TEACH's `hand.hunt` |
| Carrying weight / meat affecting movement | **Partial** — day 4 is framed as "heavier step" |

## Key code landmarks

- Journey comment block near the top (`THE JOURNEY STRUCTURE`) — the spine.
- `planWalkLevels(returning)` — authored level defs. The template for content.
- Tile codes `0..6` — ground/grass/tree/bush/water/rock/gate. Shared with GREAT KILL.
- Fishing veil (`vFish`) + rod logic — the timing minigame.
- Weapon/biome veils (`vWeapon`, `vBiome`) — the gate pattern.

## What it contributes to the merge

This is the **"a strong tribe member leaves to provide"** scene. In the
unified game, when TEACH schedules a multi-day hunt for GROK, control drops
into a THREE NIGHTS journey. The meat he brings back and the belly he
spends map onto the shared model (`tribe.needs.meat`, `actor.belly`). His
`hand.hunt` and `hand.fish` should grow from what happens here and persist
back to camp.

## Nearest next steps

- Make "who sent you / what they need" read from real tribe state.
- Persist skill gains (hunt, fish) back to the actor.
- Tie the meat quota to TEACH's actual `meat` need, not a fixed number.
- Share the tile/concealment code with GREAT KILL (see `engine/` notes in UNIFICATION).
