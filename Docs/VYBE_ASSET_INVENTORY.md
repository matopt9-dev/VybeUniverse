# Vybe Asset Inventory

**World ID:** `1192248460643536`  
**Audit:** 2026-07-19

## On-disk world package

Horizon stores scene binary data outside a readable Unity-style Assets tree. LocalLow world folder contains **only** scripting packages:

- `scripts/` — runtime TypeScript + generated `types/`
- `editor_scripts/` — editor TypeScript + generated `types/`

**No** meshes, textures, audio clips, or prefabs are enumerable as files in this folder.

## Repo-staged assets (`horizon-assets/`)

| Path | Type | Count | License note | Editor import |
|------|------|-------|--------------|---------------|
| `source/kenney/city-kit-commercial/*.obj` | Mesh | 5 | Kenney CC0 | **PENDING** |
| `source/kenney/city-kit-industrial/chimney-small.obj` | Mesh | 1 | Kenney CC0 | **PENDING** |
| Accompanying `.md` / `.txt` | Docs | 4 | — | N/A |

### Kenney files present

- `detail-awning.obj`
- `detail-overhang.obj`
- `detail-parasol-a.obj`
- `low-detail-building-a.obj`
- `low-detail-building-wide-a.obj`
- `chimney-small.obj`

## Unity project assets (`Assets/`)

Large Unity/OpenXR Quest project (FBX, URP, XRI, etc.). **Do not treat as Horizon-importable wholesale.** Use as visual/reference only; re-author inside Horizon with supported import formats and performance budgets.

## Expected in-editor assets after graybox (not verified live)

Created by `VybeArrivalPlazaGraybox` when run:

| Name | Kind |
|------|------|
| `VybePlazaFloor` | Trimesh |
| `VybeWelcomeLandmark` | Trimesh |
| `VybeWelcomeSign` | Text |
| Triggers / SpawnPoints | Gizmos |
| Optional StaticLight | Light |

**Status:** Creation **not observed** by Cursor. Owner must confirm hierarchy after running the editor script.

## Missing for release identity

- Coherent architectural meshes for 10 zones  
- Brand materials / skybox  
- Copyright-safe ambience + SFX AudioGizmos  
- Signage TextGizmos per zone  
- Pathway floors between zones  
- Imported Kenney (or generated) hero props  

## Classification

| Asset class | Action |
|-------------|--------|
| 9 runtime Components | KEEP / wire |
| Editor graybox script | KEEP (correct folder) |
| Kenney OBJs in repo | IMPORT then PLACE intentionally |
| Unity Assets binaries | REFERENCE ONLY — do not dump into Horizon |
| Fake social-network UI art | DO NOT CREATE |
