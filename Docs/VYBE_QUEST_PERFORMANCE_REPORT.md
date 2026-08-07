# Vybe Quest — Performance Targets & Bake Tools

## Targets (Meta Quest 2/3)

| Metric | Target | Notes |
|--------|--------|-------|
| Frame rate | **72 FPS** sustained in Vybe City VR hub | Drop to 60 only if device forces it |
| CPU main thread | < 10 ms avg in hub | Profile with OVR Metrics or Unity Profiler (development build) |
| GPU frame | < 11 ms @ 72 Hz | URP mobile + reduced realtime lights |
| Draw calls | < 120 in hub view | Static batching via `VybeCityPerformance.MarkStatic` |
| Realtime lights (per district) | ≤ 4 (non-directional) | `VybeGraphicsProfile.MaxDistrictSpotLights` |
| Triangles (on-screen) | < 750k hub | Replace procedural art for production |

## Runtime Optimizations (already applied)

- `VybeCityBuildScheduler` — **staggered city build** across ~20 steps (1–2 frames between each) to avoid first-frame hitch on Quest
- `VybePerformanceMonitor` — rolling 60-frame FPS average; logs every 30s on Android (`[Vybe Perf] FPS avg=…`)
- `VybeCityPerformance.LogSceneStats` — renderer/light counts after city build completes
- `VybeCityPerformance.ApplyRuntimeCulling` — stops distant particle systems (>80 m) on mobile VR
- `VybeCityPerformance.MarkStatic` — static flags + light/reflection probes on district geometry
- `VybeCityPerformance.CapDistrictLights` — disables excess point/spot lights on Quest
- `VybeGraphicsProfile.Apply()` — mobile VR URP settings, fog, MSAA tier
- `VybeCinematicEnvironment` — single global URP volume (controlled vignette for comfort)
- `VybeCityLifeSystem` — Quest 2 skips elevated train + digital birds; mobile VR particle rates −25%

## Phase 9 — Staggered Build & On-Device Monitoring

### Staggered build flow

On Quest (`VybeQuestLaunch` → `VybeSceneBuildRunner.BuildNowAsync`):

1. Environment + skybox
2. Ground, plaza, skyline backdrop
3. Eight districts — **one district per yield** (Creator → Music → Business → Marketplace → Gaming → Social → Event → Fitness)
4. Sky bridges, waterfall, social hub, gameplay placements
5. Street lamps, light probes, neon pass
6. Static batch combine, city life, visual tune
7. `LogSceneStats("CityBuildComplete")` + particle culling pass

Progress logs: `[Vybe Perf] City build 45%` (also brief `VybeToast` at 50% / 100% on Quest).

### Performance monitor log format (Android, every 30s)

```
[Vybe Perf] FPS avg=68.2 min=61.0 drawCalls=94 batches=88 tris≈412000 lights=12
```

- Uses `UnityStats` when available; otherwise counts enabled `Renderer` / `Light` in scene
- **Warning** if rolling average FPS &lt; 60 for two consecutive 30s intervals on city scenes

### Editor tools (Phase 9)

| Menu | Purpose |
|------|---------|
| `Tools → Vybe → Prepare Occlusion Culling (City)` | Mark city static + start occlusion bake or prompt manual bake |
| `Tools → Vybe → Log Open Scene Performance Stats` | Editor log of renderer/light counts |

## Editor Bake Workflow

Run in Unity Editor with **VybeCityVR** scene open (or Play Mode city build active):

### 1. Quest Performance Bake (probes + static)

**Menu:** `Tools → Vybe → Quest Performance Bake (Probes + Static)`

- Generates `Assets/Resources/VybeCityLighting/CityLightProbeGroup.prefab`
- Marks city roots static with probe usage
- Prompts to open Lighting window

### 2. Bake Scene Lighting

**Menu:** `Tools → Vybe → Bake Scene Lighting (Light Probes)`

- Runs `Lightmapping.BakeAsync()` for current scene
- Wait for Lighting window to finish

### 3. Apply Quest Graphics Profile

**Menu:** `Tools → Vybe → Apply Quest Graphics Profile`

- Applies `VybeGraphicsProfile` tuning for active platform

### 4. Generate Probe Grid Only

**Menu:** `Tools → Vybe → Generate City Light Probe Grid`

- Probe prefab only (no static pass)

### 5. Occlusion culling (Phase 9)

**Menu:** `Tools → Vybe → Prepare Occlusion Culling (City)`

- Requires VybeCityVR root (Play Mode build or saved scene)
- Marks static renderers; attempts automated bake or prompts manual **Window → Rendering → Occlusion Culling**

### 6. Log scene stats (editor)

**Menu:** `Tools → Vybe → Log Open Scene Performance Stats`

### 7. Complete Art Setup (optional quality pass)

**Menu:** `Tools → Vybe → Complete Art Setup (Free CC0 Stack)`

- Kenney buildings, skybox, district audio, RPM SDK hook

## Recommended Pre-Store Checklist

1. Run **Quest Performance Bake** on built city scene
2. Bake light probes and verify indirect lighting in headset
3. Enable **occlusion culling** on large static meshes (manual pass)
4. Replace procedural placeholders in `Assets/Art/Prefabs/`
5. Build **Development** APK → Unity Profiler / OVR Metrics validation
6. Build **Release** APK → 10-minute soak test for thermal throttling

## Measuring On Device

1. Install **development** APK with **Autoconnect Profiler** or use `adb logcat -s Unity`
2. Filter logs: `[Vybe Perf]` for build progress + 30s FPS snapshots
3. Meta Quest Developer Hub → Metrics overlay (FPS, GPU, CPU) — **authoritative** for frame rate
4. Note district with worst FPS (Event/Festival zones with extra lights)
5. Do **not** cite FPS numbers from docs — targets only until you capture device metrics

## Known Gaps

- Auto-generated scenes ship **without baked lightmaps** until bake tools are run
- No automated FPS gate in CI — manual Quest pass required
- `VybePerformanceMonitor` logs on-device stats but **does not replace** OVR Metrics / Profiler for certification
- Hands rig prefab (`VybeXROrigin`) may differ from controller-only rigs; validate locomotion on hardware

## Phase 9 companion doc

See **[VYBE_VR_PERFORMANCE.md](VYBE_VR_PERFORMANCE.md)** for the Quest frame budget, Phase 9 code changes (UI pooling, FFT throttle, hub light/glass caps, leave unload), and honest non-claims.
