# Horizon Architecture — Vybe Social Horizon Edition

**World ID:** `1192248460643536`  
**Runtime SoT:** THIS world's `scripts/types` → `horizon/core` + ambient `HorizonGlobal` only.  
**Phase:** 3 (architecture) — code compile independent of owner Preview.

## Design rules

1. **One concern per script** — no giant Unity-port megafile.
2. **Explicit entity props** — triggers/spawns/gizmos wired in Desktop Editor; null-guard everything.
3. **Join / leave / late join** — every multiplayer system documents how players enter mid-session.
4. **Authority** — world/server component on the owning entity owns mutable activity state; `NetworkEvent` broadcasts serializable payloads for observers.
5. **Reset** — every activity defines a reset path (trigger, empty world, or timeout).
6. **No guessed modules** — never import `horizon/ui`, `social`, `2p`, UnityEngine, Node, or browser APIs unless generated in THIS world.
7. **Debug** — each system exposes `debugLogs: boolean` (default false).

## System map

| Script | Role | Depends on (editor entities) |
|--------|------|------------------------------|
| `VybeBootstrapSmoke` | Join smoke + popup | (self entity) |
| `VybeSpawnRecovery` | Arrival teleport + fall recovery | SpawnPoint, recovery Trigger |
| `VybePlayerLifecycle` | Join/leave broadcast + welcome | (self entity) |
| `VybeWorldDirectory` | Directory text / popup | directory Trigger, optional TextGizmo |
| `VybePortalPad` | Same-world teleport | pad Trigger, destination SpawnPoint |
| `VybeSocialCheckIn` | Real-player check-in | check-in Trigger, optional Text/Audio |
| `VybePulseChallenge` | Cooperative multiplayer pulse | start/leave/reset + 3 pad Triggers |
| `VybeAudioEnvironment` | Optional plaza ambience | AudioGizmo (proven API) |
| `VybeDebug.ts` | Log helper contract (not attachable) | — |

## Contracts

### Bootstrap / player lifecycle
- `OnPlayerEnterWorld` / `OnPlayerExitWorld` on `this.entity`.
- Welcome popup is optional UX; spawn teleport stays in `VybeSpawnRecovery`.

### Spawn / recovery
- Preserved Phase 2 behavior. Do not merge into activity scripts.

### World directory / navigation
- One trigger → `World.ui.showPopupForPlayer` (+ optional `TextGizmo.text`).
- Destinations are **named zones in the plaza**, not other worlds (until portal network exists).

### Portal management
- Same-world only: `SpawnPointGizmo.teleportPlayer`.
- Cooldown per player; missing destination → error popup, no crash.

### Interaction / events
- Prefer `CodeBlockEvents.OnPlayerEnterTrigger` for VR/mobile-compatible volume interaction.
- `NetworkEvent` for cross-player awareness (serializable primitives only).

### Multiplayer activity state
- States: idle → active → success → reset.
- Late join: start or pad entry while `active`.
- Authority: owning component. Score increments on success; reset clears pads/participants.

### Audio / environment
- Only `AudioGizmo.play/pause/stop` and `ParticleGizmo.play/stop` — verified in THIS typings.
- No streaming music claims.

### Debug
- Prefix `[VybeSystemName]`; gated by `debugLogs`.

## Compile / sync

```text
horizon-scripts/tsconfig.smoke.json  →  local tsc 4.7.4
Copy systems/*.ts → world scripts/ (same names)
```

Each script must compile independently before sync. Editor Preview / multiplayer remains **owner-gated**.

## What this architecture deliberately excludes

- Fake social feed, marketplace, purchases, rewards
- DJ / Rush / Horror parity
- District expansion as visible interactive areas
- Cross-world portals until vertical slice Preview passes
