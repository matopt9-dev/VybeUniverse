# Vybe Universe VR — Build & Delivery Report (Phase 11)

_Last updated: Phase 11 — production delivery pipeline_

## Product identity

| Field | Value |
|-------|-------|
| Display name | **Vybe Universe VR** |
| Package ID | `com.vybesocial.vybeuniversevr` |
| Target store price | **USD $9.99** (Meta Dashboard only — see `VybeStoreConfig.cs`) |
| Unity | 6000.3.0f1 |
| XR | OpenXR (Meta Quest) |
| Scripting | IL2CPP |
| Architecture | ARM64 |
| Graphics API | Vulkan (Android) |

## Boot scene order (enabled in build)

1. `BootScene`
2. `LoadingScene`
3. `VRMainMenu`
4. `VybeCityVR`
5. `VybeRushVR`

Desktop scenes (`MainMenu`, `VybeCity`, `VybeRushMiniGame`) are disabled in Quest builds.

---

## Build menus (Unity Editor)

### Recommended workflow

1. **Tools → Vybe → One-Click Setup** (or Build Complete Vybe Universe VR) — scenes + art
2. **Tools → Vybe → Run Full QA Report** — validator + doc links
3. **Tools → Vybe → Quest Performance Bake** + **Bake Scene Lighting** (optional, on `VybeCityVR`)
4. **Tools → Vybe → Production Preflight Check**
5. Build APK (see below)
6. Device QA — `Docs/VYBE_VR_QA_MATRIX.md` + `Docs/VYBE_QA_SIGNOFF_TEMPLATE.md`

### APK builds

| Menu | Purpose |
|------|---------|
| **Tools → Vybe → Build Development Quest APK (QA)** | `DEVELOPMENT_BUILD` — `[Vybe QA]` / `[Vybe Perf]` logs, profiler connect |
| **Tools → Vybe → Build Production Quest APK (Release)** | Release APK — diagnostics disabled, preflight blocks validator **issues** |
| **Tools → Vybe → Dual Target → Build Quest APK (Ship)** | Legacy path (same ship config, no preflight gate) |

Each production/dev build writes a `*_manifest.txt` next to the APK with version, type, and QA commands.

### Keystore (store release)

1. **Edit → Project Settings → Player → Android → Publishing Settings**
2. Create or assign keystore + key alias
3. **Never commit** keystore passwords or `.keystore` files to git
4. Preflight logs whether a keystore path is set

---

## Development vs production runtime

| | Development APK | Production APK |
|---|-----------------|----------------|
| Scripting define | `VYBE_QUEST_SHIP` + `DEVELOPMENT_BUILD` | `VYBE_QUEST_SHIP` only |
| `[Vybe QA]` smoke logs | Yes | **No** |
| `[Vybe Perf]` FPS logs | Yes | **No** |
| `VybePerformanceMonitor` | Yes | **No** |
| City build toasts (Quest) | Yes | Yes (user feedback) |
| Gameplay / social / hub | Same | Same |

Controlled by `VybeBuildDiagnostics.Enabled` (`UNITY_EDITOR` or `DEVELOPMENT_BUILD` only).

---

## Install on Quest

```bat
adb devices
adb install -r "Builds\VybeUniverseVR_v1.0_release.apk"
```

Or use **Meta Quest Developer Hub → Install APK**.

Enable **Unknown Sources** / developer mode on the headset.

---

## Post-build QA (required before distribution)

1. Cold launch → VR Main Menu — head tracking, no yellow wash
2. Enter city — staggered build, hub at plaza `(0,0,10)`
3. Controller rays — menu, wrist (Y), settings, social boards
4. Locomotion — teleport default, smooth toggle, pause (Menu button)
5. **Development APK only:** confirm `[Vybe QA] Smoke result: PASS` in logcat
6. Complete `Docs/VYBE_QA_SIGNOFF_TEMPLATE.md`

---

## Known delivery gaps (honest)

- **Not store-ready** until manual Quest sign-off + backend staging API (if live social required)
- **No CI APK gate** in repo — builds are local via Unity menus
- **APK artifacts** are not stored in git — output to `Builds/` locally
- **App name** is “Vybe Universe VR” (package branding); full Vybe Social parity still requires backend + device QA

---

## Related docs

- `Docs/VYBE_VR_QA_MATRIX.md` — full test matrix
- `Docs/VYBE_QUEST_PERFORMANCE_REPORT.md` — perf targets + bake
- `Docs/VYBE_BACKEND_INTEGRATION_REPORT.md` — API for live social
- `KNOWN_LIMITATIONS.md` — Phase 11 section
