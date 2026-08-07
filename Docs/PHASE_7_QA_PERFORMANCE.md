# Phase 7 — Multiplayer QA + performance hardening

**Date:** 2026-07-17  
**World:** `1192248460643536`

## Phase 4 Preview / multiplayer (prior vertical slice)

| Evidence type | Status | Date |
|---------------|--------|------|
| **OWNER-REPORTED PASS** | User reported “everything is green” for prior phases | **2026-07-17** |
| Agent-observed Preview / multiplayer | **Not observed** — do not invent headset logs | — |
| Local TypeScript compile (this phase) | See test-reports | 2026-07-17 |

Record as **OWNER-REPORTED PASS** only. Keep formal matrix rows open until owner marks them after Phase 7 hardening retest.

## Formal test matrix (owner Preview)

| ID | Scenario | Expected | Owner result | Date |
|----|----------|----------|--------------|------|
| MP-01 | First player join | Spawn + systems arm | OWNER-REPORTED prior PASS; retest after harden | |
| MP-02 | Second player join | Both present; Pulse late-join works | | |
| MP-03 | Late join mid-Pulse | Sees active state / can light remaining pads | | |
| MP-04 | Disconnect / leave world | Participant removed; empty race resets | | |
| MP-05 | Authority departure / ownership transfer | State recovers via `transferOwnership` / `receiveOwnership` | | |
| MP-06 | Activity reset trigger | Pads clear; scoreboard ready | | |
| MP-07 | Rapid pad triggers | Dedupe cooldown; no double success | | |
| MP-08 | Portal repeat | Cooldown prevents teleport spam | | |
| MP-09 | Recovery volume | Fall → spawn teleport | | |
| MP-10 | Mobile / VR input | Triggers fire on locomotion enter | | |
| MP-11 | Audio overlap | Zone ambience + success SFX tolerable | | |
| MP-12 | Missing refs | Null props skip safely; popups for offline portal | | |

Full printable matrix: `test-reports/phase7-qa-matrix-2026-07-17.md`.

## Pulse Challenge hardening (code)

Proven APIs only (`horizon/core`):

- Authority: `world.getServerPlayer()` + `entity.owner` / `getLocalPlayer` comparison  
- Mutations + broadcasts only on authority; remotes apply NetworkEvent visuals  
- `transferOwnership` / `receiveOwnership` serializable pad/score/generation state  
- Pad cooldown (`padCooldownSeconds`), success latch, participant cap (`maxParticipants` ≤ 64)  
- Bounded cooldown map prune; timeout capped at 60s  
- Leave / world-exit / empty-race reset retained  
- `debugLogs` toggle retained  

**No fake automated multiplayer claims.** Owner must re-run matrix after sync.

## Performance budget / checklist (local design — no invented FPS)

| Budget item | Target (design) | Measure how |
|-------------|-----------------|-------------|
| Curated unique plaza meshes | ≤ ~2k faces staged set | Count OBJ `f` lines (done: ~1336 unique) |
| Interactive trigger count (plaza) | Prefer ≤ 20 wired triggers | Count entities in editor |
| Concurrent AudioGizmo plays | Prefer ≤ 3 overlapping | Preview listen test |
| Active ParticleGizmo | Prefer ≤ 2 simultaneous | Preview |
| Script maps | Bounded (≤ 64 cooldown entries; ≤ 32–64 participants) | Code enforced |
| TextGizmo updates | On state change only | Code review |
| Quest/mobile readability | Landmark readable @ ~20–30m | Owner headset |

Checklist: `Docs/PHASE_7_QA_PERFORMANCE.md` § below + release gate.

### Owner performance checklist

- [ ] Plaza loads without editor script errors  
- [ ] No dense duplicated city blocks in Arrival Plaza  
- [ ] Pulse success FX/audio not looping forever  
- [ ] Audio zone stops when empty (if `stopOnEmptyZone`)  
- [ ] Mobile/VR: directory text readable; pads reachable  

## Compile / sync

| Item | Status |
|------|--------|
| Local `tsc` 4.7.4 | **PASS** (see `test-reports/phase6-8-compile-2026-07-17.md`) |
| Sync to world scripts | **PASS** |
| Owner Preview after harden | **PENDING OWNER RETEST** |

## Honesty

Do not claim agent multiplayer PASS. Owner-reported green for prior slice is recorded separately from Phase 7 retest.
