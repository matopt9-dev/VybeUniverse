# Vybe VR — Quest Performance Budget & Checklist

**Date:** 2026-07-16 (Phase 9)  
**Target devices:** Meta Quest 2 / Quest 3 / 3S  
**Related:** [VYBE_QUEST_PERFORMANCE_REPORT.md](VYBE_QUEST_PERFORMANCE_REPORT.md) · [VYBE_VR_MASTER_PRODUCTION_STATUS.md](VYBE_VR_MASTER_PRODUCTION_STATUS.md)

Status: **code-side PASS / device profiling PARTIAL** — do **not** cite FPS from this doc until OVR Metrics / headset capture exists.

---

## Frame budget (targets only)

| Metric | Quest 2 | Quest 3 family | Notes |
|--------|---------|----------------|-------|
| Sustained FPS | **72** | **72** | Drop to 60 only if device forces it |
| Main-thread CPU | &lt; 11 ms | &lt; 10 ms | Hub + DJ booth |
| GPU | &lt; 12 ms | &lt; 11 ms | URP mobile |
| Draw calls (hub view) | &lt; 120 | &lt; 140 | Static batch via `VybeCityPerformance` |
| Non-dir realtime lights (city) | ≤ **16** | ≤ **22** | `CapSceneRealtimeLights` after build |
| Per-district spots | ≤ **6** (Q2) / ≤ **11** (Q3) | `MaxDistrictSpotLights` |
| Feed page size | **20** posts | **50** desktop | `SocialFeedWall` |
| DJ spectrum bands | **8** @ FFT/3 frames | **16** every frame | `DjSpectrumVisualizer` |

---

## Phase 9 optimizations landed (this slice)

### CPU
- DJ FFT throttled on mobile VR (every 3rd frame, 8 bands, 128-bin buffer)
- Holo / light / beat pulse scripts update every 2nd frame on Quest
- Friends presence rebinds from cache instead of refetch storms
- Notifications / feed refresh throttled; in-flight loads cancelled on panel destroy

### Memory / GC
- `VybeUiRowPool` reuses feed / following / messaging list rows
- Like toggles update labels in-place (no full list rebuild)
- Portal leave → `StopMusic` + DJ shutdown + deferred `Resources.UnloadUnusedAssets`

### GPU / draw
- Hub: single fill light on Quest (was 3); opaque panel glass (α 0.96); skip UI Outline
- Point/spot shadows forced off when capping district/scene lights
- Quest 2: tighter shadow distance, 1 cascade, lower shadowmap, soft particles off

### Network
- Hub session / feed / friends / notifications remain **async** (no sync waits)
- Feed page size reduced on Quest; stale responses ignored after panel close

### Addressables
- **Not in project** (`Packages/manifest.json`) — no migration forced

---

## Pre-device checklist (developer)

1. Close Unity Editor → rebuild `VybeUniverseVR_v*_dev.apk` (Phase 9 code needs compile)
2. `adb devices -l` shows authorized Quest
3. Install APK → open hub + feed + DJ booth + portal leave/return
4. Capture OVR Metrics / Meta Quest Developer Hub FPS (do not invent numbers)
5. Filter logcat: `[Vybe Perf]` for 30s snapshots
6. Confirm no sustained &lt;60 avg warnings for two consecutive intervals in hub

---

## Known gaps (honest)

- Device FPS / thermal soak **not signed off** in this phase
- Auto-generated city still benefits from manual lightmap + occlusion bake (see Quest performance report menus)
- Rush coin/obstacle Instantiate pooling deferred (lower priority vs hub/DJ)
- Addressables not adopted

---

## Next

1. **Re-run Phase 10** — Quest 3 briefly appeared on adb during Phase 9; end recheck empty. Stabilize USB + rebuild APK first.  
2. Phase 11 delivery only after headset QA + Meta App ID
