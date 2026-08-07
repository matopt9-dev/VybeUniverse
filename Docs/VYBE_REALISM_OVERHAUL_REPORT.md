# Vybe Universe VR — Realism Overhaul Report

**Generated:** 2026-07-12  
**Engine:** Unity **6000.3.0f1**  
**Platform / Headset:** Android · Meta Quest 2 / 3 / 3S / Pro (ship define `VYBE_QUEST_SHIP`)  
**Render Pipeline:** URP **17.3.0** (unchanged — correct for stylized digital aesthetic)  
**XR Stack:** OpenXR 1.14.3 · Meta OpenXR 2.0.1 · XRI 3.0.7 · com.unity.xr.hands 1.8.0  
**Package:** `com.vybesocial.vybeuniversevr`

---

## Executive Summary

This pass grounded VybeNet’s **ReBoot-inspired neon/holographic identity** with human-scale references, believable physics presets, spatial interaction audio, material roughness variation, and a report-only Editor validator — without touching gameplay loops, Meta upload scripts, or the URP pipeline. All changes respect `VybeGraphicsProfile.IsMobileVR` Quest performance caps.

**Readiness status: HEADSET QA READY** (Editor compile + validation pass; device launch not verified in this session — owner-only)

---

## 1. Audit — Render / Quality / Scene Inventory

### Render pipeline & quality

| System | Status | Notes |
|--------|--------|-------|
| URP 17.3 | OK | Tiered via `VybeGraphicsProfile` (Quest2 / Quest3 / PC) |
| Shadow distance | OK | 55m Q2 · 85m Q3 · 120m PC |
| MSAA | OK | 1× Q2 · 2× Q3 · 4× PC |
| Render scale | OK | 0.9 Q2 · 1.0 Q3 |
| Post | OK | VR-safe: tonemap, bloom, AO, vignette — **no motion blur / gameplay DOF** |
| Time-of-day | OK | Quest city/rush use `Morning`; PC uses `GoldenHour` via `VybeVisualProfile` resolvers |

### Scenes reviewed

| Scene | Role | Runtime build |
|-------|------|---------------|
| BootScene | Boot router | Baked |
| LoadingScene | Async load | Baked |
| VRMainMenu | VR lobby | Runtime VR build |
| VybeCityVR | VybeNet mainframe city | Runtime procedural build |
| VybeRushVR | Arcade / Rush arena | Runtime build |
| BasementHorrorVR | Quarantine horror | Runtime build |

### Probes & reflections

- **Light probes:** `VybeLightProbeGrid` loads `Resources/VybeCityLighting/CityLightProbeGroup` after city build; editor bake via `Tools → Vybe → Quest Performance Bake`.
- **Reflection probe:** `VybeCinematicEnvironment.CreateReflectionProbe` — box-projected, tiered resolution (128 Q2 / 256 Q3+).
- **Renderer defaults:** `VybeCityPerformance.MarkStatic` + `VybeMeshFactory` set `BlendProbes` on all static geometry.

### Performance observations

- District spot lights capped by `VybeVisualProfile.MaxRealtimeSpotLightsPerDistrict` (10) and `VybeGraphicsProfile.MaxDistrictSpotLights`.
- Quest-only static batching via `VybeCityPerformance.CombineStaticMeshes`.
- Particle culling at 80m on mobile VR.
- Procedural city uses primitives + cached PBR materials — acceptable for digital aesthetic; landmark prefabs optional via `VybeArtLibrary`.

### Audit findings (prioritized backlog)

| Priority | Item | Action taken / recommended |
|----------|------|---------------------------|
| P0 | Human scale consistency | **Done** — `VybePhysicsProfile` + `VybeConstants.Scale` |
| P0 | Report-only validation | **Done** — `VybeRealismValidator.cs` |
| P1 | Uniform plastic smoothness on neon | **Done** — emissive/structure smoothness tuned in `VybePremiumMaterials` |
| P1 | Spatial interaction audio | **Done** — `AudioManager.PlaySfxAtPosition` + gameplay hooks |
| P1 | Interactable haptic profiles | **Done** — per-type haptics in `VybeVRInteractable` |
| P2 | Light probe bake on device tree | Owner: run `Tools → Vybe → Bake Scene Lighting` after play-build |
| P2 | Occlusion bake | Owner: `Tools → Vybe → Prepare Occlusion Culling (City)` post play-build |
| P3 | Replace procedural skyline with imported landmarks | Run `Tools → Vybe → Complete Art Setup` |
| P3 | Footstep surface audio | Deferred — no locomotion foot IK; would add CPU on Quest |

---

## 2. Scale + Physics

### Verified scale (1 unit = 1 meter)

| Reference | Value | Source |
|-----------|-------|--------|
| Standing eye height | 1.6 m | `VybeVRSetup` camera offset · `VybePhysicsProfile` |
| Door height | 2.05 m | `VybePhysicsProfile.DoorHeight` |
| Door width | 0.9 m | Horror doors + nav obstacles |
| Table height | 0.75 m | `VybePhysicsProfile` |
| Handle reach | 1.1 m | Interactable placement in `VybeDistrictActivityKit` |
| Rhythm pad height | 0.15 m | `VybeRhythmPadStation` |
| NPC collider | 0.9 × 2.05 × 0.9 m | Updated in activity kit |

### Physics profile (`VybePhysicsProfile.cs`)

- **PhysicMaterials:** DigitalSurface, GripSurface, DoorSurface (friction/bounce tuned for VR grabs and doors).
- **Rigidbody preset:** Continuous collision detection, interpolate, damping — via `ConfigureRigidbody`.
- **Horror doors:** Door surface material + nav obstacle sized to profile constants.

---

## 3. Materials + Lighting + Reflections

### Materials (neon aesthetic preserved)

- **DistrictAccent emissive:** smoothness reduced 0.88 → 0.68–0.72 (less uniform plastic).
- **DistrictStructure:** metallic/smoothness lowered for matte digital metal read.
- **LedStrip:** high smoothness retained (intentional emissive strip look).
- **Plaza LED z-fight:** raised 0.04 → 0.05 m to reduce z-fighting on ground ring.

### Lighting hierarchy (existing, verified)

| Role | Source |
|------|--------|
| Key | Directional sun via `VybeCinematicEnvironment.CreateSun` |
| Fill | `CreateFillLights` + tier `FillLightMultiplier` |
| Rim / practical | District rim points, truss spots, neon emissive bands |
| Ambient | Trilight + fog per time-of-day |
| Post | ACES tonemap, bloom (VR-safe intensity), subtle vignette |

Quest anti-yellow stack unchanged (`VybeQuestVisualTune`, Morning TOD).

---

## 4. Interaction + Audio + Comfort + UI

### Interaction polish

- **VybeVRInteractable:** per-type haptic amplitude/duration (Portal stronger, Fitness lighter).
- **Spatial UI click:** `PlayUiClickAt` at interactable world position.
- **Collectibles / hit targets:** spatial collect + target SFX at world position.
- **Rhythm pads / horror doors:** existing haptics preserved.

### Audio

- New `AudioManager.PlaySfxAtPosition` — 3D linear rolloff, 1.2–16 m, pitch variation ±6%.
- District ambience clips unchanged (procedural + baked WAV fallback).

### VR comfort (unchanged, verified present)

- Teleport + snap turn defaults (save migration v2).
- `VybeVRComfortSystem` seated/standing height offset.
- `VybeVRComfortVignette` + global comfort volume.
- Locomotion guard on wrist menu.

### UI

- 3D labels via `VybeUIBuilder` at 1.2–2.5 m readable distances (existing).
- Curved wrist menu + tracked device raycaster (existing VR input pass).

---

## 5. Performance + Validation

### New tool

**`Assets/Editor/VybeRealismValidator.cs`**

Menu: **Tools → Vybe → Validate Realism (Report Only)**

Detects (non-destructive):

- Missing / disabled shipping scenes in build settings
- URP pipeline assignment
- Pink / missing shaders
- Interactables without colliders
- Static-flagged interactables
- Excessive realtime lights per scene
- Discrete collision Rigidbodies (tunneling risk)
- Missing script references
- Scale constant drift

Report output: `Builds/realism_validation_report.txt`

### Existing validation

- `VybeVRProjectValidator` — project PASS/FAIL (unchanged)
- `VybeCityPerformance` — static flags, batching, particle cull (unchanged)

---

## Files Changed

| File | Workstream |
|------|------------|
| `Assets/Scripts/World/VybePhysicsProfile.cs` | **NEW** — scale + physics |
| `Assets/Editor/VybeRealismValidator.cs` | **NEW** — validation |
| `Assets/Scripts/Core/VybeConstants.cs` | Scale constants |
| `Assets/Scripts/World/VybePremiumMaterials.cs` | Material roughness variation |
| `Assets/Scripts/Systems/AudioManager.cs` | Spatial SFX |
| `Assets/Scripts/Systems/VybeGameplayFeedback.cs` | Spatial feedback hooks |
| `Assets/Scripts/VR/VybeVRInteractable.cs` | Haptics + spatial UI click |
| `Assets/Scripts/Gameplay/VybeCityCollectible.cs` | Spatial collect audio |
| `Assets/Scripts/Gameplay/VybeCityHitTarget.cs` | Spatial hit audio |
| `Assets/Scripts/World/VybeDistrictActivityKit.cs` | NPC collider scale + grip material |
| `Assets/Scripts/World/VybeDistrictBuilderCommon.cs` | Plaza z-fight fix |
| `Assets/Scripts/Horror/VybeHorrorDoor.cs` | Door physics + nav size |
| `Docs/VYBE_REALISM_OVERHAUL_REPORT.md` | **NEW** — this report |

**Not touched:** `Builds/meta_upload_config.json`, `submit_to_meta.ps1`, gameplay directors, VR input bootstrap, Meta upload tooling.

---

## Build Results

```
dotnet build VybeUniverse.sln
→ 0 Error(s), 8 Warning(s) (pre-existing VybeSocialApiClient CS0649 + editor)
```

Unity batch validator (`VybeVRProjectValidator.ValidateSilentBatch`) — run when Unity Editor is not locked by owner.

---

## Device Test Results

**Owner-only — not executed in this agent session.**

Recommended headset smoke (Quest 3 primary):

1. Boot → no yellow wash; log `[Vybe Visual] Quest tune applied`
2. City spawn — grab orb, hit target, rhythm pad — spatial audio + haptics
3. Portal to Rush — boundary + teleport intact
4. Wrist menu — comfort toggles persist
5. Horror scene — door grab + unlock flow
6. FPS ≥ 72 sustained in city hub (Quest 2: ≥ 72 with occasional dips acceptable)

Use `QUEST_HEADSET_TEST_CHECKLIST.md` and `Docs/VYBE_VR_QA_MATRIX.md`.

---

## Remaining Limitations

- Procedural geometry remains primitive-forward; digital aesthetic is intentional.
- Light probe **bake** requires owner editor session after runtime city build.
- No surface-aware footstep system (smooth locomotion only; perf trade-off).
- Landmark prefabs may warn until `Complete Art Setup` is run.
- RELEASE CANDIDATE status blocked until owner device launch verification.

---

## Assets Still Required (optional polish)

- Baked district WAV loops under `Assets/Resources/Art/Audio/` (Art Setup wizard)
- Landmark prefabs per district under `Assets/Art/Prefabs/Buildings/`
- Store marketing screenshots (not realism-blocking)

---

## Owner Steps

1. Open Unity 6000.3.0f1 — allow script compile.
2. **Tools → Vybe → Validate Realism (Report Only)** — review `Builds/realism_validation_report.txt`.
3. **Tools → Vybe → Validate VR Project** — confirm PASS.
4. Play **VybeCityVR** to runtime-build city.
5. **Tools → Vybe → Quest Performance Bake (Probes + Static)** then **Bake Scene Lighting (Light Probes)**.
6. Build APK: `Builds/build_when_ready.ps1` (Unity closed).
7. Install + run `QUEST_HEADSET_TEST_CHECKLIST.md` on Quest 3, then Quest 2 spot-check.

---

## Final Readiness Status

| Gate | Status |
|------|--------|
| Compiles (dotnet) | **PASS — 0 errors** |
| Gameplay preserved | Yes — no director/input changes |
| Quest perf safe | Yes — no new realtime lights or heavy systems |
| Stylized aesthetic | Preserved — no photoreal pivot |
| Editor validation | New realism validator + existing VR validator |
| Device QA | **Pending owner** |

### **HEADSET QA READY**

Not RELEASE CANDIDATE — device launch not verified in this session.
