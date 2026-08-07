# Prompt 02 — Spawn point placeholder (manual)

**World:** `1192248460643536`  
**Use:** Meta AI / Desktop Editor assistant — short, one shot  
**Do not:** invent recovery scripts or city layout (use prompt 03 for attach wiring)

---

## Prompt

```
Add a single Spawn Point gizmo in this Horizon world:
- Prefer a real Horizon Spawn Point object (not only a decorative mesh)
- Name the entity VybeSpawnPoint
- Place it on a simple low floor pad near VybeBootstrap if that entity exists
- No custom scripts on the spawn point, no portals, no extra props, no lighting overhaul
Leave space clear so a player can stand on the pad.
```

---

## After running

1. Confirm entity `VybeSpawnPoint` is a **Spawn Point** gizmo.  
2. Do not attach smoke or spawn scripts to the pad — scripts go on `VybeSpawnSystem` (see `03-spawn-recovery-attach.md`).  
3. Engineering script: `VybeSpawnRecovery` uses `SpawnPointGizmo.teleportPlayer` from this world's `horizon/core` typings.
