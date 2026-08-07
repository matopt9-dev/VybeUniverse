# VISUAL RESCUE — Why it looks bad, what we do instead

**World:** Vybe Social `1192248460643536`  
**Verdict:** Current look fails because the scene is mostly placeholders, meshless Trimeshes, or unfinished Gen AI sprawl — not because Meta “can’t look good.”

## Why it looks horrible (root causes)

1. **Meshless Trimesh builders** — `spawnEntityByType(Trimesh)` never assigned a mesh asset → empty or broken geometry.
2. **Graybox sprawl** — too many districts with identical tinted boxes.
3. **No imported hero art** — 66 Kenney OBJs sit on disk; not in the Asset Library until you Import.
4. **Weak lighting hierarchy** — flat lights, no landmark focus, no atmosphere.
5. **Generic naming / random props** — Cube/Object clutter, no composition.
6. **Too many half-features** — scavenger, jump pads, bots before the space feels premium.

## What Cursor can do (done in this package)

- Honest diagnosis and stop-expanding rule  
- Art direction for a **single hero Arrival Plaza + Hub**  
- Exact Meta Gen AI Code-and-act prompts (short, executable)  
- Kenney import placement map  
- Lighting / atmosphere wiring checklist for existing `DayNightCycle` + `NightLight`

## What only you can do in Desktop Editor

- Paste Code and act prompts  
- Import Kenney OBJs  
- Delete/quarantine junk  
- Preview and save  

## Success bar (one hour of focused Meta work)

Player joins and sees:
- One coherent Arrival Plaza (not empty void, not box pile)
- Warm landmark + canopy + seating that touch the floor
- Readable VYBE signage
- Soft lighting with clear path to Hub
- No floating Cubes, no meshless pink errors, no fake unfinished districts in view

Only after that Pass do we polish Hub. Everything else stays locked/hidden.
