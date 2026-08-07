# Vybe Social VR — Current State (Phase 0 Forensic)

**Audit date:** 2026-07-19  
**World ID:** `1192248460643536`  
**Local world path:** `%LocalAppData%Low\Meta\Horizon Worlds\1192248460643536`  
**Repo:** `C:\Users\djtwi\VybeUniverse`  
**Branch:** `repair/vybe-social-horizon-production` (created; repo has **no commits yet** on any branch)

## What was inspected (accessible)

| Surface | Result |
|---------|--------|
| World on-disk folders | Only `scripts/` + `editor_scripts/` — **no mesh/texture/audio asset dump** on disk |
| Runtime scripts | 9 `Vybe*.ts` Components in world `scripts/` |
| Editor scripts | `VybeArrivalPlazaGraybox.ts` now in `editor_scripts/` |
| Installed typings | World `scripts/types/*` incl. `horizon/core` ApiVersion **2.0.0**, plus ui/camera/navmesh/performance/analytics/unity_asset_bundles |
| Repo `horizon-scripts/` | Mirror of systems + editor graybox + types |
| Repo `horizon-assets/` | **6 Kenney CC0 OBJ** staged (not imported into editor) |
| Repo `meta-ai-prompts/` | Prompts `01`–`11` present |
| Unity `Assets/` | Separate Quest/OpenXR product — **reference only**, not Horizon runtime |
| Desktop Editor viewport / hierarchy | **Not accessible from Cursor** |
| Meta Gen AI Code and Act | **Not operable from Cursor** |
| Preview / Quest session | **Not run in this audit** |

## Product reality (honest)

| Layer | Status |
|-------|--------|
| Horizon TypeScript systems | Present; local `tsc` smoke **PASS** (2026-07-19) |
| Scene geometry / architecture | **Missing / unconfirmed** until owner runs graybox + Preview |
| Characters / NPC cast | **Not present**; Horizon avatars only (no Unity NPC port) |
| Imported art | Kenney staged in repo; **editor import pending** |
| Persistent Variables | `vybe_checkin_count` must be registered in Systems UI |
| World display name | Historically “New world” — rename pending owner |
| Release-ready destination | **No** — scripts without a finished environment |

## Critical repair performed this audit

**Misfiled editor script:** `VybeArrivalPlazaGraybox.ts` was found under world **`scripts/`** (runtime) while importing `horizon/editor`. That is invalid for runtime compile.

- **Action:** Moved to `editor_scripts/VybeArrivalPlazaGraybox.ts` (correct location).
- **Verification:** World `scripts/` no longer contains graybox; `editor_scripts/` contains it. Repo already had mirror under `horizon-scripts/editor/`.

## Working systems (preserve — do not rewrite blindly)

See `VYBE_SCRIPT_INVENTORY.md`. Preserve and **wire** these; do not replace with a 30-script monolith.

## Biggest release blockers (ordered)

1. **Owner has not run Editor Scripts** — world looks empty until `VybeArrivalPlazaGraybox` + `VybeWorldShellZones` execute in Desktop Editor.  
2. **Preview not confirmed** after those Runs.  
3. **Persistent Variable** `vybe_checkin_count` not confirmed registered.  
4. **Kenney art not imported**.  
5. Zone polish / furniture still Meta AI follow-ups after shell exists.  
6. Cursor **cannot** press Run / Preview — owner must execute.

## Status legend for this audit

| Claim | Value |
|-------|-------|
| Local typecheck of mirrored systems | Verified complete (`tsc` exit 0) |
| Editor compile of world scripts | **Blocked by missing project access** (owner Desktop Editor) |
| Preview / multiplayer | **Blocked by missing project access** |
| Environment construction | **Not started** (or unconfirmed) in live world |
| Publication | **Not started** |
