# VYBE-META-001 — Read-only world audit

**Job ID:** VYBE-META-001  
**Mode:** Inspect only (no mutations)  
**Depends on:** Desktop Editor open on world `1192248460643536`  
**Full queue:** `Docs/VYBE_META_AI_PROMPT_QUEUE.md`

## Paste into Meta Gen AI

```
You are working inside the currently open Vybe Social Horizon world (target product name: Vybe Social VR / Vybe Social Horizon Edition, world id 1192248460643536 if shown).

Begin with a READ-ONLY audit. Do not delete, generate, move, rewrite, reparent, or create anything during this job.

Inspect and report:
1) Complete scene hierarchy (names, parents, counts).
2) All scripts in the Scripts panel and Editor Scripts panel; note any file that imports horizon/editor living under runtime Scripts (that is illegal).
3) Compile state and any TypeScript errors/warnings (paste exact messages).
4) Console errors/warnings on load.
5) Player SpawnPointGizmo entities: names, positions, whether above solid floor.
6) Existing floors, triggers, portals, TextGizmos, AudioGizmos, lights.
7) Any entity named Vybe* — list props that are null/unwired.
8) Occupied world-space AABB (min/max X Z, floor Y).
9) Objects that look duplicated, unnamed (Cube/Object/Copy), floating, underground, or placeholder.
10) Whether _VYBE_LEGACY_QUARANTINE already exists.
11) Whether Persistent Variable vybe_checkin_count exists in Systems.
12) World display name.

Return a structured report with sections:
- KEEP
- REPAIR
- MOVE
- REPLACE
- QUARANTINE (do not move yet)
- DELETE ONLY AFTER BACKUP
- COMPILE STATUS
- SMALLEST SAFE FIRST REPAIR
- SMALLEST SAFE CONSTRUCTION AREA (coordinates)

Use only the current Horizon Worlds Desktop Editor project state and installed Horizon APIs.
Do not reference Unity, browser DOM, Node.js, React, Firebase, npm, or external REST backends.
Do not build the full environment in this job.
```

## After Meta AI returns

1. Save the report as `test-reports/vybe-meta-001-audit.md`.  
2. Register Persistent Variable `vybe_checkin_count` if missing.  
3. Confirm Editor Script `VybeArrivalPlazaGraybox` is listed (not under runtime Scripts).  
4. Proceed to **VYBE-ENV-002** (validation pad) in `Docs/VYBE_META_AI_PROMPT_QUEUE.md`.
