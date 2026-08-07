# 13 — Fill the empty world (owner run order)

**Why the world looks empty:** Runtime scripts exist, but geometry only appears after you run Editor Scripts. Cursor cannot press Run in Desktop Editor.

## Do this now (exact order)

1. Open world **1192248460643536** in Desktop Editor.
2. Confirm **Editor Scripts** lists:
   - `VybeArrivalPlazaGraybox`
   - `VybeWorldShellZones`
3. Confirm those files are **not** under runtime Scripts.
4. Create → Systems → Persistent Variables → add **`vybe_checkin_count`** (if missing).
5. **Run** Editor Script **`VybeArrivalPlazaGraybox`** once.
6. **Run** Editor Script **`VybeWorldShellZones`** once.
7. Hierarchy should show `VYBE_WORLD_ROOT`, `01_ARRIVAL_PLAZA`, zones `02`–`10`, `11_PATHWAYS`.
8. Enter **Preview**: spawn at plaza; walk toward Hub (+Z), Safety (−Z), Games (−X/−Z).
9. Paste any console/compile errors back to Cursor.

## What you should see after both scripts

| Area | Visible content |
|------|-----------------|
| Arrival Plaza | 40×40 floor, columns, walls, canopy, seats, VYBE landmark, directory/check-in/pulse/portal |
| Social Pulse Hub | Large floor @ Z≈55, cyan landmark, conversation pads |
| Creator / Venue / Games / Discovery / Expression / Calm / Safety / Portals | Floors + pillars + title signs + recovery spawns |
| Pathways | Walkable strips connecting districts |

## Meta Gen AI (optional polish after scripts)

Use `Docs/VYBE_META_AI_PROMPT_QUEUE.md` jobs **VYBE-ENV-010+** for materials/furniture polish **one zone at a time**. Do not ask Gen AI to rebuild the whole world from scratch.
