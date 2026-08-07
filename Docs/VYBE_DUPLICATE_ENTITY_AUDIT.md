# Vybe Duplicate Entity Audit — Pulse

## Active set (KEEP) — wired to `VybePulseChallenge`

| Entity | Disposition | Reason |
|--------|-------------|--------|
| `VybePulseChallenge` | KEEP | Script host |
| `VybePulseStart` | KEEP | `startTrigger` |
| `VybePulseLeave` | KEEP | `leaveTrigger` |
| `VybePulseReset` | KEEP | `resetTrigger` |
| `VybePulsePadA` / `B` / `C` | KEEP | Pad triggers |
| `VybePulseScoreboard` | KEEP | `scoreboardText` |
| Pulse pad meshes from graybox | KEEP | `padAMesh` / `B` / `C` if wired |

## Legacy / orphan candidates

| Entity | Disposition | Action |
|--------|-------------|--------|
| `PulseStartTrigger` | ARCHIVE then DELETE | Not in props map; move under `_VYBE_LEGACY_QUARANTINE`, disable, Preview once, then delete |
| `PulseLeaveTrigger` | ARCHIVE then DELETE | Same |
| `PulseScoreboard` | ARCHIVE then DELETE | Prefer `VybePulseScoreboard` |
| Other bare `Pulse...` without `Vybe` prefix | AUDIT | If unreferenced → ARCHIVE |

## Procedure (safe)

1. Select candidate → note transform, components, children.  
2. Confirm **not** listed in any script property on `VybePulseChallenge`.  
3. Parent under `_VYBE_LEGACY_QUARANTINE`, set invisible / disable collision.  
4. Preview Pulse start/leave/score.  
5. If Pass → delete quarantined orphans.  

## Do not

- Delete `VybePulse*` active set  
- Merge by renaming into active set without rewiring props  
