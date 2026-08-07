# ONE PASTE — Futuristic world rebuild (no screenshots needed)

**Mode:** Code and act · Include world scripts: ON  
**World:** Vybe Social `1192248460643536`  
**You (Meta Gen AI) must self-inspect and self-report. Do not ask the human for screenshots.**

```
Work inside the open Vybe Social world. You will rebuild the VISIBLE futuristic Arrival Plaza and Hub without asking for screenshots. Inspect the hierarchy yourself first, then act.

SELF-AUDIT FIRST
1) List entities named Cube, Object, Copy, Untitled, or meshless Trimeshes.
2) List unfinished zone shells visible near spawn (zones 03–10 if they look empty/generic).
3) Confirm VybeSpawnPoint exists; if missing create at (0, 0.15, 5).
4) Do not delete working Vybe* scripts, triggers, or spawn systems. Quarantine junk only.

PHASE A — QUARANTINE
Create or reuse parent _VYBE_LEGACY_QUARANTINE. Move meshless Trimeshes, generic Cubes/Objects/Copies, and unfinished empty district shells under it. Set those objects invisible and non-collidable. Keep Vybe spawn, recovery, directory, check-in, pulse, portal, and district triggers intact if present.

PHASE B — FUTURISTIC ARRIVAL PLAZA (origin)
Under parent 01_ARRIVAL_PLAZA create REAL VISIBLE geometry using built-in shapes or imported Asset Library meshes (not empty Trimesh containers):
- Continuous floor ~40x40 at Y=0, pale stone/concrete, collidable, name Arrival_Floor
- Gold landmark monolith south of spawn ~ (0, 3, -8), name Arrival_Landmark
- Cyan canopy above landmark area, name Arrival_Canopy
- Soft white edge walls with openings north toward Hub (+Z), name Arrival_Wall_*
- Four thin white pylons at corners, name Arrival_Pylon_*
- Four conversation seating clusters left/right of spawn, grounded, name Arrival_Seat_*
- Two cyan parasols near seating, name Arrival_Parasol_*
- Six palm/planter accents along edges, name Arrival_Planter_*
- Slim central fountain or water ribbon, name Arrival_Fountain
- Soft key StaticLight above plaza + amber path lamps along walkways
- Text "VYBE" readable from spawn, name Arrival_BrandSign
- Clear 6m-wide path stub north toward Hub, name Arrival_Path_ToHub
Palette: floors light warm, architecture soft white, accents cyan #2EC4D6 and gold #E8A838 only. No purple. No flashing. No oversized floating text. No cyberpunk black maze.

PHASE C — FUTURISTIC SOCIAL HUB (~0,0,55)
Under 02_SOCIAL_PULSE_HUB:
- Continuous Hub_Floor
- Cyan landmark ring Hub_Landmark
- Three seating circles Hub_SeatRing_A/B/C
- Palms/planters
- Soft lights
- Clear return path to Arrival Plaza
Hide or quarantine any incomplete other zones so spawn camera mainly sees Plaza + Hub.

PHASE D — DEPTH WITHOUT COST
Add distant NON-COLLIDABLE simplified skyline silhouettes beyond playable bounds (white/cyan), names Skyline_Silhouette_*. Do not fill playable area with dense skyscrapers.

PHASE E — SELF-VALIDATE (no human screenshots)
From spawn transform (0, 1.6, 5) facing +Z, mentally verify:
- Continuous floor under player
- Landmark and canopy visible
- Seating present and not blocking path
- Hub path open
- No Cube/Object/Copy visible in first view
- No unfinished district shells in first view
If any fail, FIX before finishing.

PRESERVE
All Vybe* gameplay script hosts and required prop wiring. Recompile if scripts touched. Do not invent unsupported APIs. Do not fake feed/shop/UI.

COMPLETION REPORT (required)
Return:
1) Objects created (exact names)
2) Objects quarantined (exact names)
3) Exact transforms of Arrival_Floor, Arrival_Landmark, VybeSpawnPoint
4) Self-validate Pass/Fail checklist above
5) Remaining issue if any
6) Next safe job (Hub polish or Kenney import)
Stop.
```

## Manual only if Gen AI cannot import meshes

Import Kenney OBJs from:
`C:\Users\djtwi\VybeUniverse\horizon-assets\source\kenney\city-kit-commercial\`
Place 3 buildings + parasols on Plaza; rename `VybeArt_*`.
