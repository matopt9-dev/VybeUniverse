# Meta AI / Owner — This session: Arrival Plaza graybox

World ID: **1192248460643536**. Scripts already exist. Goal: **real space + wiring**, not new scripts.

## Preferred path (already prepared)

1. In Desktop Editor → **Editor Scripts**, open/run **`VybeArrivalPlazaGraybox`**.
2. Script is idempotent (reuses entities by exact name).
3. It places:
   - Walkable graybox floor + welcome landmark + pulse/portal/check-in meshes
   - `VybeSpawnPoint` + `VybeRecoveryVolume`
   - Directory / check-in / portal / pulse triggers + Text signs
   - System empties with scripts attached and props wired
   - Hidden locked-district stub roots
4. Enter **Preview** and verify join → spawn, then each trigger loop.

## If Meta AI is used instead of the editor script

Build only Arrival Plaza. Exact names from `Docs/ARRIVAL_PLAZA_BUILD_MANIFEST.md`. Attach scripts per `04-vertical-slice-wiring.md`. Do not invent UI feeds, shops, or NPCs. Do not dump a full city.

## After graybox PASS

1. Import six Kenney OBJs (`06-kenney-art-import.md`).  
2. Register Persistent Variable `vybe_checkin_count`.  
3. Rename world to **Vybe Social Horizon Edition**.  
4. Lighting/collision prompts `07`–`09`.  
5. Social District only after plaza Preview PASS (`10`).
