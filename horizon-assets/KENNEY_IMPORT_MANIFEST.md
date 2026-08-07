# Kenney CC0 — Curated import manifest (Horizon)

**World:** `1192248460643536` (Arrival Plaza only)  
**Rule:** Import curated modules only. Do **not** export Unity scenes wholesale.  
**Horizon Desktop Editor import:** **PENDING OWNER** — staging only; no claim of editor import success.

## Staging location (repo)

`horizon-assets/source/kenney/`

| Path | Contents |
|------|----------|
| `city-kit-commercial/` | 5 curated OBJs from Kenney City Kit Commercial |
| `city-kit-industrial/` | 1 curated OBJ from Kenney City Kit Industrial |
| `licenses/` | CC0 License.txt copies (evidence) |

**Unity `Assets/` was not modified.** Sources were copied from existing on-disk Kenney OBJs.

## Approved curated set (Arrival Plaza)

| Asset file | Source pack | License | Plaza role | Triangle faces (`f` lines) | Scale | Pivot | Collider | Manual verify |
|------------|-------------|---------|------------|----------------------------|-------|-------|----------|---------------|
| `low-detail-building-a.obj` | City Kit Commercial | CC0 | Welcome landmark silhouette | 376 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |
| `low-detail-building-wide-a.obj` | City Kit Commercial | CC0 | Directory / scoreboard backdrop | 312 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |
| `detail-parasol-a.obj` | City Kit Commercial | CC0 | Social gathering canopy | 192 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |
| `detail-awning.obj` | City Kit Commercial | CC0 | Check-in shade / sign stand | 80 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |
| `detail-overhang.obj` | City Kit Commercial | CC0 | Portal pad frame | 128 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |
| `chimney-small.obj` | City Kit Industrial | CC0 | Pulse pad vertical markers (×3 instances OK) | 248 | PENDING EDITOR | PENDING EDITOR | PENDING EDITOR | PENDING OWNER |

**Unique mesh face budget (approx):** 376+312+192+80+128+248 = **1336** faces (before instance duplicates).

## Priority modules (plaza) — still recommended later

| Module | Use | Notes |
|--------|-----|-------|
| Floor / tile kits | Plaza ground | Prefer Horizon primitives if Kenney floor pack not staged |
| Barrier / railing | Edge safety | Add only after landmark/props pass readable |
| Nature / trees (sparse) | Soft perimeter | Avoid dense forests |

## Exclude for now

- Full city blocks / roads as interactive districts  
- Vehicle packs  
- Interior dungeon kits  
- Audio packs not cleared in LEGAL register  
- Wholesale Unity scene export  

## Workflow (owner)

1. Confirm license evidence under `horizon-assets/source/kenney/licenses/`.  
2. In Horizon Desktop Editor, import the **six** staged OBJs only (Meta asset import flow).  
3. Place instances under plaza roots in `Docs/ARRIVAL_PLAZA_BUILD_MANIFEST.md`.  
4. Fill Scale / Pivot / Collider / Manual verify columns after editor checks.  
5. Record Horizon asset names below when import actually lands:

| Date | Pack | Horizon asset name | Zone | Status |
|------|------|--------------------|------|--------|
| 2026-07-17 | Staging copy | (repo paths above) | Arrival Plaza | **STAGED — import PENDING OWNER** |

## License

Kenney CC0 — attribution retained in `Docs/LEGAL_ASSET_REGISTER.md` and staged `licenses/`. No claim of exclusive ownership. No claim that Horizon import succeeded until owner/editor evidence exists.
