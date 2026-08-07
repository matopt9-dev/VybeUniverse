# ART DIRECTION — Hero Plaza Visual Rescue

**Look:** Bright Miami × Singapore waterfront futurism — premium, open, warm, social.  
**Not:** Cyberpunk maze, purple glow spam, random cubes, dark void, newspaper UI.

## Palette (use consistently)

| Role | Color intent |
|------|----------------|
| Floor | Warm light stone / soft sand `#E8E2D6` |
| Path | Cool pale concrete `#C9D4DC` |
| Architecture | Soft white / pearl `#F4F7FA` |
| Accent | Cyan water `#2EC4D6` |
| Landmark | Warm gold `#E8A838` |
| Night lamps | Soft amber `#FFB86B` |
| Foliage | Soft palm green `#5FA777` |

## Composition rules (first viewport)

1. Brand landmark dominant — VYBE readable from spawn.
2. One continuous floor — no holes, no floating pads.
3. Open sightline to Hub (+Z) — not blocked by walls.
4. Seating clusters left and right — invite social, not obstacle course.
5. Soft canopy or parasols — shade without darkness.
6. Water or fountain as secondary focal — calm sparkle, not particle spam.
7. Edge treatment — low walls/planters frame plaza; openings for paths.
8. No cards, no pill badges, no floating debug text.

## Density budget (Arrival Plaza only)

| Category | Max |
|----------|-----|
| Hero landmark | 1 |
| Seating units | 4–6 |
| Palm / planter accents | 6–8 |
| Path lights | 6–10 |
| Dynamic lights | ≤ 4 in plaza |
| Particle systems | ≤ 2 (fountain mist only) |
| Text signs | ≤ 4 readable |

## Materials

Prefer imported Kenney / Gen AI meshes with simple materials over endless tinted boxes.  
Colliders: box/sphere primitives, not dense mesh collision.

## Quarantine immediately

Move under `_VYBE_LEGACY_QUARANTINE` (invisible):
- Meshless Trimeshes
- Generic Cube / Object / Copy names
- Duplicate Pulse* without Vybe prefix
- Empty unfinished districts in camera view from spawn
- Oversized floating text
