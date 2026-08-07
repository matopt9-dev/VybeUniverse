# Prompt 03 — Spawn + recovery attach (manual)

**World:** `1192248460643536`  
**Use:** Meta AI / Desktop Editor assistant — short, one shot  
**Do not:** invent plaza, DJ booth, social feed, or scripts beyond attaching existing TS

Script already in world folder: `VybeSpawnRecovery.ts` (compiled locally PASS 2026-07-17).

---

## Prompt

```
In this Horizon world (keep everything else unchanged):

1. Ensure there is a Spawn Point gizmo named VybeSpawnPoint on a simple floor pad.
2. Add one Trigger volume named VybeRecoveryVolume below or around a fall-out area
   (large enough that a player walking/falling in will enter it). Do not add scripts to the trigger.
3. Create one empty entity named VybeSpawnSystem near VybeBootstrap.
4. Do NOT generate new TypeScript. I will attach the existing component VybeSpawnRecovery myself.
5. Do not build plazas, UI panels, portals, or extra venues.
```

---

## After running (owner checklist)

1. Attach script component **`VybeSpawnRecovery`** to entity **`VybeSpawnSystem`**.  
2. Set props:
   - `spawnPoint` → `VybeSpawnPoint` (must be a Spawn Point gizmo)
   - `recoveryTrigger` → `VybeRecoveryVolume` (Trigger)
   - `teleportOnJoin` = true  
   - `enableRecovery` = true  
   - `debugLogs` = true for first Preview, then false  
3. Keep **`VybeBootstrapSmoke`** on **`VybeBootstrap`** (separate smoke).  
4. Preview:
   - Join → player at spawn  
   - Enter recovery volume → teleport back to spawn  
5. If teleport fails: confirm prop wiring and that `spawnPoint` is a real Spawn Point gizmo (`Entity.as(SpawnPointGizmo)`).
