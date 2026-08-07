# Vybe World Audit — Repair Package

**World:** Vybe Social · ID `1192248460643536` · Unpublished  
**Audit date:** 2026-07-19  
**Cursor access:** LocalLow scripts + repo. Live hierarchy / Preview / Meta Gen AI **not** controlled by Cursor.

---

## 1. Files inspected

| Location | Contents |
|----------|----------|
| World `scripts/` | 9 runtime Components (no `horizon/editor`) |
| World `editor_scripts/` | `VybeArrivalPlazaGraybox.ts`, `VybeWorldShellZones.ts`, `VybeSocialDistrictWire.ts` |
| Repo `horizon-scripts/systems/` | Mirror of runtime |
| Repo `horizon-scripts/editor/` | Mirror of editor construction |
| Docs PHASE_8, coordinate manifest, prior VYBE_* audits | |

---

## 2. Current confirmed errors

| Error | Root cause | Disk status now |
|-------|------------|-----------------|
| `Cannot find module 'horizon/editor'` on `VybeArrivalPlazaGraybox` / `VybeWorldShellZones` | Those files were (or still are) in the **Scripts** panel / runtime compile set | **Runtime folder clean.** Files restored under **Editor Scripts only**. If Meta Gen AI still reports the error, delete them from **Scripts** (not Editor Scripts) inside Desktop Editor. |
| `VybeSocialDistrict` props empty | Graybox never created district entities / never wired props | **Repair:** run `VybeSocialDistrictWire` or Meta Gen AI Prompt 4 |
| Legacy `PulseStartTrigger` / `PulseLeaveTrigger` / `PulseScoreboard` | Orphans vs active `VybePulse*` | Disposition in `VYBE_DUPLICATE_ENTITY_AUDIT.md` |

**Local smoke compile (runtime systems):** PASS (`tsc` exit 0).  
**Editor panel compile / Preview:** Awaiting owner verification.

---

## 3. Exact repairs required

1. Ensure `VybeArrivalPlazaGraybox` + `VybeWorldShellZones` exist **only** under Editor Scripts — never under Scripts.  
2. Detach those scripts from any entity if attached as Components.  
3. Recompile Scripts panel → zero `horizon/editor` errors.  
4. Run Editor Script `VybeSocialDistrictWire` (or Prompt 4) to create + wire district entities.  
5. Quarantine/delete confirmed Pulse orphans.  
6. Preview T01–T25 matrix.  
7. Register Persistent Variable `vybe_checkin_count`.  
8. Set `VybeBootstrapSmoke.debugLogs=false` or detach for publication.  

---

## 4. Files changed this package

| File | Change |
|------|--------|
| `scripts/VybeSocialDistrict.ts` | Required-prop `console.warn` diagnostics |
| `editor_scripts/VybeSocialDistrictWire.ts` | **New** — create + wire Social District |
| `editor_scripts/VybeArrivalPlazaGraybox.ts` | Restored to editor folder only |
| `editor_scripts/VybeWorldShellZones.ts` | Restored to editor folder only |
| Docs listed in Phase 10 deliverables | Created/updated |

---

## 5. Classification of the two editor scripts (chosen solution)

**Solution C + A:** Keep as **Editor Scripts** (not runtime). Extract build specs for Meta Gen AI. Do **not** convert to `horizon/core` runtime spawners (unsupported pattern / wrong layer).

---

## Acceptance (honest)

| Gate | Status |
|------|--------|
| Zero runtime `horizon/editor` imports on disk | **Verified complete** |
| Zero editor compile errors in Desktop Editor | **Implemented, awaiting editor validation** |
| Social District props wired | **Implemented, awaiting editor validation** (run wire script) |
| Preview / multiplayer / publish | **Blocked by missing project access** / **Not started** |
