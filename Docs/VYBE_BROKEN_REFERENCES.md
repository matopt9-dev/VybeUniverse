# Vybe Broken References

**Audit:** 2026-07-19

## Confirmed (repo / on-disk)

| ID | Severity | Issue | Evidence | Repair |
|----|----------|-------|----------|--------|
| BR-001 | **Critical** | Editor construction scripts lived in runtime `scripts/` | `VybeArrivalPlazaGraybox` / `VybeWorldShellZones` imported `horizon/editor` under `scripts/` | **FIXED** twice (2026-07-19) — keep only in `editor_scripts/`; do not copy into runtime Scripts |
| BR-002 | High | Scene entities for script props likely unwired / missing | World folder has no scene assets; owner reported empty geometry | Run `VybeArrivalPlazaGraybox` + Preview |
| BR-003 | High | Persistent key may be unregistered | Scripts use `vybe_checkin_count`; Systems UI is owner-only | Register in Create → Systems |
| BR-004 | Medium | Kenney OBJs not in editor | Repo has 6 OBJs; no import evidence | Owner import + place |
| BR-005 | Medium | World title may still be “New world” | Prior docs / owner reports | Rename in editor |
| BR-006 | Low | Docs historically claimed `horizon/ui` unavailable | Typings now include `horizon_ui.d.ts` | Update jobs to allow scoped UI later; do not rush |

## Suspected (requires Desktop Editor to confirm)

| ID | Issue | How to confirm |
|----|-------|----------------|
| BR-S1 | Null script props on system empties | Select each `Vybe*` system entity → inspect props |
| BR-S2 | Spawn inside geometry / void | Preview join |
| BR-S3 | Portal destination missing | Walk portal pad |
| BR-S4 | Compile errors from leftover non-Component files | Scripts panel compile |
| BR-S5 | Deleted wiring editor script backups only | `editor_scripts/.backups/` exists; active graybox restored |

## Not broken (by design)

- Scripts that idle when props are null (guard clauses) — safe, but **not** a finished feature.
- Absence of Firebase/REST/npm — correct for Horizon.

## Fake / unsupported features to avoid

| Temptation | Honest replacement |
|------------|-------------------|
| External social feed | In-world check-in + NetworkEvent |
| Global “trending” people | Session-local activity state only |
| Private messaging clone | Native Meta social tools + in-world gather |
| Unity NPC cast | Player avatars + stages + Text landmarks |
| Commerce checkout | Hide until Horizon-native commerce is scoped |
