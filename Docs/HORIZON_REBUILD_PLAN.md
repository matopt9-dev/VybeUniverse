# HORIZON REBUILD PLAN — Vybe Social Horizon Edition

**Product name (target):** Vybe Social Horizon Edition  
**Source of truth (reference only):** this Unity repo — see `unity-reference/`  
**Reconstruction status:** **PHASE 2 IN PROGRESS** (world bound; smoke + spawn/recovery local compile PASS)  
**Unity Assets modified:** **NO**  
**Bound world ID:** `1192248460643536` — see `HORIZON_WORLD_BINDING.md`  
**Editor title:** still **New world** — owner rename required

---

## Binding gate (cleared for smoke + spawn compile)

```
✅ Dedicated world folder exists: 1192248460643536
✅ Runtime typings present: horizon/core + HorizonGlobal
✅ World ID recorded in PROJECT_STATUS / HORIZON_WORLD_BINDING
✅ Local smoke tsc PASS (TypeScript 4.7.4)
✅ Local spawn/recovery tsc PASS (VybeSpawnRecovery; SpawnPointGizmo.teleportPlayer proven)

⏳ Owner: rename off "New world"
⏳ Owner: attach smoke + spawn/recovery → Preview PASS
⛔ Do NOT invent modules absent from this world's scripts/types
⛔ Do NOT copy Unity C#
⛔ Do NOT use Primal Waters 1184324168102632 typings
```

Full city / Path B / multi-venue work remains blocked until Phase 3 slice criteria.

---

## Principles

1. Evidence over optimism — mark UNKNOWN.  
2. Vertical slice before city-scale content.  
3. Unity remains reference; Horizon is a rebuild.  
4. Tool boundaries (below) are mandatory.  
5. Proven modules only — today: **`horizon/core`** for runtime.

---

## Tool boundaries

| Tool | Allowed | Forbidden |
|------|---------|-----------|
| **GitHub** | Repo, issues, PRs, docs, CI for docs/tools | Shipping secrets; inventing Horizon APIs |
| **Cursor** | Docs, smoke, spawn/recovery after Preview, code review | Unity Asset edits unless explicitly requested; inventing modules |
| **Replit** | Backend/API contracts, staging helpers per `REPLIT_BOUNDARIES.md` | Horizon world scripts; claiming `/api/v1` works on prod SPA |
| **Meta AI / prompts** | Short manual prompts in `meta-ai-prompts/` (spawn/bootstrap) | Unreviewed bulk generation dumped into production world |
| **Worlds Desktop Editor** | Rename world, attach scripts, art import spikes | Treating Unity scenes as importable Horizon scenes |

---

## Phased plan

### Phase 0 — Done

- Forensic docs in `Docs/`  
- Pipeline folders created  
- Unity untouched  

### Phase 1 — Complete (documentation gate)

- Deliverables: this plan + inventories + matrices + status  

### Phase 2 — World bootstrap (**IN PROGRESS**)

1. ~~Create Vybe world~~ — folder `1192248460643536` (title still New world).  
2. ~~Record world ID~~ — `HORIZON_WORLD_BINDING.md`.  
3. ~~Export typings~~ — mirrored to `horizon-scripts/types/`.  
4. ~~Smoke local compile~~ — **PASS**.  
5. ~~Spawn + recovery local compile~~ — **PASS** (`VybeSpawnRecovery.ts`); Preview pending.  
6. **Owner Preview attach** — smoke + spawn/recovery pending.  
7. **Art plan** — `ASSET_EXTRACTION_PLAN.md` (Kenney CC0; no Unity dump).  

### Phase 3 — Vertical slice (next after Preview)

Minimum slice:

1. One small place (not full VybeCity).  
2. Player **spawn + recovery** — script ready; needs Preview PASS + graybox place.  
3. One portal/teleport **or** one local mini-activity.  
4. Optional: read-only backend ping if policy allows — else stub.  

**Do not** rebuild Rush + Horror + DJ + Club + City in this phase.

### Phase 4 — Social Path B (honest)

- Rebuild feed/friends/messages against real contracts.  
- Invitations/achievements/identity only if `/api/v1` is actually deployed — else cut.  

### Phase 5 — Content expansion

- Kenney CC0 import spike results (`ASSET_EXTRACTION_PLAN.md`).  
- Additional venues as separate places.  
- Performance budgets + headset QA in `test-reports/`.  

### Phase 6 — Legal / release gate

- `LEGAL_ASSET_REGISTER.md` all green or removed.  
- `release-checklists/` completed.  

### Phase 7+ — UNKNOWN

Depends on modules that appear in **this** world’s regenerated typings.

---

## Vertical slice success criteria

| Criterion | Pass bar |
|-----------|----------|
| World ID documented | `1192248460643536` |
| Typings | Generated for **that** world (`horizon/core`) |
| Smoke | Local tsc PASS + Preview PASS |
| Playable | Spawn/recovery loop — exact multiplayer APIs per typings only |
| No Unity C# | Zero ports |
| Docs updated | `PROJECT_STATUS.md`, binding doc, `CHANGELOG.md` |

---

## Folder ownership (pipeline)

| Folder | Owner use |
|--------|-----------|
| `horizon-assets/` | Imported/cleared art only |
| `horizon-scripts/` | Horizon TS against bound-world typings |
| `replit-tools/` | Backend/dev utilities |
| `test-reports/` | QA evidence |
| `release-checklists/` | Ship gates |
| `meta-ai-prompts/` | Prompt library (spawn/bootstrap first) |
| `unity-reference/` | Pointer to Unity — reference only |

---

## Explicit non-goals (now)

- Porting `VybeWorldFactory`  
- Claiming multiplayer world replication parity  
- Full vertical-slice venues before spawn/recovery  
- Uncontrolled Unity asset export into Horizon  
