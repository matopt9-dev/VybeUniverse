# Editor scripts policy

**World typings include:** `horizon/editor` + `CreateClasses` under `editor_scripts`.

## Allowed

| Script | Purpose |
|--------|---------|
| `VybeArrivalPlazaGraybox.ts` | Dense Arrival Plaza + attach/wire runtime Components |
| `VybeWorldShellZones.ts` | Hierarchy, pathways, zone floors/landmarks 02–10 |
| `VybeSocialDistrictWire.ts` | Create Social District entities + wire all `VybeSocialDistrict` props |

Rules for any editor helper:

1. Live under world `editor_scripts/` only (repo mirror under `horizon-scripts/editor/` OK)  
2. Use **only** APIs in THIS world's `horizon_editor.d.ts`  
3. Never imported by runtime gameplay scripts  
4. Idempotent by exact entity name when possible  
5. No hardcoded mystery `spawnAsset(BigInt)` unless the asset ID is verified in **this** world  
6. No Persistent Variable registration (UI-only — not in editor API)

## Run order

1. `VybeArrivalPlazaGraybox`  
2. `VybeWorldShellZones`  
3. Preview before Meta AI polish  

## Not allowed

- Editor scripts that invent APIs or copy Primal Waters asset IDs  
- Non-Component helpers in world `scripts/`  
- Claiming scene complete without Preview verification  

## Manual validation

`Docs/ARRIVAL_PLAZA_BUILD_MANIFEST.md` + `Docs/NEXT_ACTIONS.md` + Preview.
