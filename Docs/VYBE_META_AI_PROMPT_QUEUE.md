# Vybe Meta AI Prompt Queue

**World:** `1192248460643536` — Vybe Social VR / Horizon Edition  
**Rule:** One job → apply → compile → Preview → repair → next.  
**Cursor cannot run these.** Owner pastes into Desktop Editor Gen AI / runs Editor Scripts.

---

## Why the world looks empty

Scripts are complete. **Geometry is not.** The live scene stays sparse until you run:

1. Editor Script **`VybeArrivalPlazaGraybox`**
2. Editor Script **`VybeWorldShellZones`**

See `meta-ai-prompts/13-fill-empty-world-run-scripts.md`.

---

## Queue order

| Job ID | Mode | Objective | Depends on |
|--------|------|-----------|------------|
| **VYBE-RUN-001** | Editor Scripts | Run `VybeArrivalPlazaGraybox` | World open |
| **VYBE-RUN-002** | Editor Scripts | Run `VybeWorldShellZones` | RUN-001 |
| VYBE-META-001 | Inspect only | Optional read-only audit | Optional |
| VYBE-ENV-010 | Code and Act | Hub furniture polish | RUN-002 + Preview spawn OK |
| VYBE-ENV-011 | Code and Act | Safety center polish | ENV-010 |
| VYBE-ENV-012 | Code and Act | Game Lounge visual stations | ENV-011 |
| VYBE-ENV-013 | Code and Act | Live Venue stage polish | ENV-012 |
| VYBE-ENV-014 | Owner + Act | Kenney OBJ import + place | ENV-013 |
| VYBE-SYS-* | Code and Act | Extra interactions | matching ENV |
| VYBE-REL-001 | Inspect | Publication preflight | blockers closed |

---

## VYBE-RUN-001 / 002 — fill the world (do this first)

**Do not ask Meta AI to invent the whole map.** Run the authored editor scripts:

1. Editor Scripts → **`VybeArrivalPlazaGraybox`** → Run  
2. Editor Scripts → **`VybeWorldShellZones`** → Run  
3. Preview: join at plaza; walk to Hub (north), Safety (south)  
4. Register Persistent Variable `vybe_checkin_count` if missing  

Expected hierarchy roots: `VYBE_WORLD_ROOT`, `01_ARRIVAL_PLAZA`, `02_SOCIAL_PULSE_HUB` … `10_EVENT_PORTAL_CONCOURSE`, `11_PATHWAYS`.

---

## FIRST Meta AI polish prompt (after RUN-001/002)

See `meta-ai-prompts/14-vybe-env-010-hub-polish.md` (VYBE-ENV-010).

---

## Optional audit prompt (if hierarchy is confusing)

### Job ID: VYBE-META-001

```
You are working inside the currently open Vybe Social Horizon world (Vybe Social VR, world id 1192248460643536 if shown).

READ-ONLY audit. Do not delete, generate, move, or rewrite anything.

Report: hierarchy roots; whether VYBE_WORLD_ROOT / 01_ARRIVAL_PLAZA / Hub_Floor exist; compile errors; null Vybe* script props; Persistent Variable vybe_checkin_count; world display name; occupied AABB.

Sections: KEEP / REPAIR / MOVE / QUARANTINE / COMPILE STATUS / SMALLEST SAFE NEXT STEP.

Use only installed Horizon APIs. No Unity/Node/Firebase.
```

---

## Completion report template (every job)

- Files / objects created or modified  
- Properties connected  
- Compile result  
- Preview result  
- Console issues  
- Remaining issue  
- Next safe job ID  
