# LEGAL ASSET REGISTER — Phase 1

**Reconstruction:** NOT STARTED · **Unity Assets modified:** NO  
**Rule:** No asset ships to Horizon without a clear license row. Mark UNKNOWN honestly.

---

## Cleared / evidenced

| Asset set | Location | License | Horizon use |
|-----------|----------|---------|-------------|
| Kenney city / commercial-style OBJs | `Assets/StreamingAssets/Kenney/` (41 OBJ) | **CC0** — `Assets/Art/_downloads/kenney_extract/License.txt` | Candidate (still validate import) |
| Kenney Industrial OBJs | `Assets/Art/Imported/Kenney/Industrial/` (25 OBJ) | **CC0** — `Assets/Art/_downloads/kenney_industrial_extract/License.txt` | Candidate |

---

## Unknown / incomplete

| Asset set | Finding | Action |
|-----------|---------|--------|
| Poly Haven materials/HDR/etc. | **No clear Poly Haven license file found in-repo** | Treat as **UNKNOWN** — do not ship until license evidence added |
| FBX/GLB/PNG/WAV/EXR meta orphans | Binaries mostly missing | Cannot clear what is not present; restore + license or delete metas |
| Procedural null-mesh landmarks | First-party shells, not third-party packs | Rebuild; no third-party license issue, but **not exportable art** |
| Unity package sample content (XR Hands sample) | Package license via Unity | Do not assume Meta Horizon redistribution rights for samples |

---

## Absent (no register entry needed beyond note)

| Item | Status |
|------|--------|
| Unity Asset Store packs | **Absent** from project inventory |
| Custom Plugins binaries | **Absent** (`Assets/Plugins/` missing) |

---

## First-party code / brand

| Item | Notes |
|------|-------|
| VybeUniverse C# / scenes | First-party — **do not copy C# into Horizon**; redesign |
| “Vybe Social” / “Vybe Universe” branding | Owner must confirm trademark/store naming for Horizon Edition separately — **UNKNOWN** legal store checklist here |

---

## Horizon Edition gate

Before any Horizon public world:

1. Kenney CC0 — OK to use with attribution practices as desired (CC0).  
2. Poly Haven — **blocked until license evidence**.  
3. Missing binaries — restore or purge.  
4. No invented clearances.
