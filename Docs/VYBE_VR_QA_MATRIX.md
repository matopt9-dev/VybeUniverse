# Vybe Social VR — Unified QA Matrix (Quest Sign-off)

Single sign-off matrix covering Phases 3–10. **Automated** checks verify wiring/presence only — they do **not** prove gameplay feel, API success, or store readiness.

**Related docs:** [VYBE_VR_QA_TEST_PLAN.md](VYBE_VR_QA_TEST_PLAN.md) · [QA_CHECKLIST.md](../QA_CHECKLIST.md) · [VYBE_QA_SIGNOFF_TEMPLATE.md](VYBE_QA_SIGNOFF_TEMPLATE.md) · [**META_QUEST_SUBMISSION_READINESS_REPORT.md**](META_QUEST_SUBMISSION_READINESS_REPORT.md) · [VR_RECOVERY_AUDIT.md](VR_RECOVERY_AUDIT.md)

**Latest editor validation (2026-06-26):** `Builds/validation_report.txt` → **PASS** (0 errors, 0 warnings). Quest device matrix below remains **unsigned**.

---

## How to run QA

| Layer | Command / action | Output |
|-------|------------------|--------|
| **Editor** | `Tools → Vybe → Run Full QA Report` | Console: validator errors/warnings + doc paths |
| **Editor** | `Tools → Vybe → Validate VR Project` | Scene/build/resource validation |
| **Device** | Install APK, launch scenes | `adb logcat -s Unity \| findstr "Vybe QA"` |
| **Device perf** | Play city 10+ min | `adb logcat -s Unity \| findstr "Vybe Perf"` |

Runtime smoke (`VybeDeviceQA` + `VybeRuntimeQAChecklist`) logs on every non-boot scene. City scenes wait for async build (`VybeCityBuildScheduler`) or 5s Android fallback.

---

## 1. Boot & XR (Phase 3)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| B-01 | Cold launch | Fresh install → Boot → VR Main Menu | Head tracking; no flat desktop camera stuck | N |
| B-02 | XR init logs | Launch on Quest | No critical `[VybeQuestLaunch]` / XR errors | N |
| B-03 | Service bootstrap | Any gameplay scene | Log: `VybeServiceLocator.Auth: OK` | Y |
| B-04 | Managers present | City or menu after bootstrap | Save/XP/Quest managers OK in `[Vybe QA]` | Y |
| B-05 | Build scene order | Editor validator | Boot → Loading → VRMainMenu → VybeCityVR → VybeRushVR | Y |

---

## 2. Interaction (Phase 3)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| I-01 | Teleport layer | Validator + runtime | Layer 31 named `Teleport`; mask ≠ 0 | Y |
| I-02 | Ray on world UI | Point at wrist menu / board | Ray visible; trigger selects | N |
| I-03 | Direct interact | Grab nearby interactable | Direct interactor responds | N |
| I-04 | Wrist menu | Y button or hand pinch | Menu toggles | N |
| I-05 | XRI input actions | Validator | `Resources/XRI Default Input Actions` exists | Y |
| I-06 | VybeXROrigin prefab | Validator | `Resources/VybeXROrigin` exists | Y |

---

## 3. Locomotion (Phase 3)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| L-01 | Default teleport | First launch city | Teleport aim on left stick; snap turn right | N |
| L-02 | Teleport execution | Aim arc → release | Moves within TeleportArea | N |
| L-03 | Smooth move toggle | Settings → smooth | Continuous move; teleport off | N |
| L-04 | Snap / smooth turn | Right stick | 45° snap or smooth per setting | N |
| L-05 | Player + XROrigin | Enter VybeCityVR | `[Vybe QA]` Player tag + XROrigin OK | Y |

---

## 4. Comfort (Phase 3)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| C-01 | Comfort vignette | Move in smooth mode | Edge darkening; off when disabled | N |
| C-02 | Seated / standing | Settings toggle | Eye height changes | N |
| C-03 | Height +/- | Settings buttons | Increment persists after restart | N |
| C-04 | Recenter | Recenter button | View resets without crash | N |
| C-05 | Pause | Menu button | Pause panel; `timeScale = 0` | N |

---

## 5. Social Hub (Phase 5)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| H-01 | Hub present | Walk to plaza center | `VybeSocialHub` visible at ~(0,0,10) | Y |
| H-02 | Feed wall | Approach feed wall | Loading state → posts or honest empty (no fake data) | N |
| H-03 | Stories rail | Look at stories | Stories or honest offline message | N |
| H-04 | Messaging pod | Open pod | Conversations or honest empty | N |
| H-05 | Profile kiosk | Interact kiosk | Profile name or API profile | N |
| H-06 | Hub visit XP | Enter hub trigger | Quest progress / toast (first visit) | N |
| H-07 | Auth gate | Logged out + API on | Feature gate on feed; kiosk exempt | N |

---

## 6. Gameplay & Badges (Phase 6)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| G-01 | District count | City loaded | ≥ 8 `DistrictTrigger` in runtime checklist | Y |
| G-02 | District visit XP | Enter district | First visit today awards XP; repeat does not farm | N |
| G-03 | Map teleport parity | Map → district | Same once-per-day rules as walk-in | N |
| G-04 | Daily quests | Wrist → Quests | 9 daily + 1 one-time listed | Y |
| G-05 | Quest claim | Complete + claim | XP granted; shows Claimed | N |
| G-06 | Badges | Earn action | Badge toast; count in `[Vybe QA]` log | Y |
| G-07 | Vybe Rush | Gaming portal | Timer, coins, results, return to city | N |
| G-08 | Login streak | Multi-day launch | Streak in save; bonus at 3/7 days | N |

---

## 7. UI / UX (Phase 7)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| U-01 | Wrist panels | Quests / Map / Settings | Open + close return to HUD | N |
| U-02 | Loading overlays | Open feed / marketplace | `VybeUILoadingState` visible during fetch | N |
| U-03 | Sign-in feedback | Login with API | Progress text; honest error on failure | N |
| U-04 | Toast readability | Trigger toast on Quest | Large font, readable duration | N |
| U-05 | VR keyboard | Focus TMP field (menu) | OS keyboard opens on Android | N |
| U-06 | No fake checkout | Browse marketplace | Favorite/view only; no purchase flow | Y |

---

## 8. Visual Quality (Phase 8)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| V-01 | Morning TOD on Quest | Launch city | `[Vybe QA] City time-of-day: Morning` | Y |
| V-02 | No yellow wash | 2 min in hub | Sky/fog not sickly yellow (subjective) | N |
| V-03 | Fog tune | Check logcat | Fog density/color logged after tune | Y |
| V-04 | District landmarks | Fly/walk districts | 8 districts visually distinct | N |
| V-05 | Hub rim light | Night-ish hub | Cyan rim above hub label | N |

---

## 9. Performance (Phase 9)

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| P-01 | Staggered build | Cold city launch | `[Vybe Perf] City build 0%` … `100%` in order | Y |
| P-02 | Build complete stats | After 100% | `[Vybe Perf]` scene stats log | Y |
| P-03 | Perf monitor | City 30+ s | `[Vybe Perf]` FPS log every ~30s | Y |
| P-04 | Low FPS warning | Heavy scene | Warning if avg < 60 for 2 intervals | Y |
| P-05 | Subjective framerate | 10 min hub | No sustained stutter (72 Hz target) | N |
| P-06 | Thermal | 10 min session | No unexpected shutdown | N |

---

## 10. Regression

| ID | Test | Steps | Pass criteria | Auto |
|----|------|-------|---------------|------|
| R-01 | No blank scenes | Validator | All required scenes non-empty | Y |
| R-02 | Back / exit | Pause → menu / quit | No hang or crash | N |
| R-03 | Save persist | Earn XP → restart | Progress retained | N |

---

## Sign-off

| Field | Value |
|-------|-------|
| Build version / git SHA | |
| APK build date | |
| Device (Quest 2 / 3 / Pro) | |
| Tester | |
| Date | |
| Editor validator | PASS / FAIL (__ errors, __ warnings) |
| Runtime smoke (logcat) | PASS / FAIL |
| Manual matrix (sections 1–9) | PASS / FAIL |
| **Overall result** | **PASS / FAIL** |
| Notes / blockers | |

---

## adb logcat quick reference

```bat
adb logcat -s Unity | findstr "Vybe QA"
adb logcat -s Unity | findstr "Vybe Perf"
adb logcat -s Unity | findstr "Vybe Quest"
```

**PASS log example:** `[Vybe QA] Smoke result: PASS (12 checks)`  
**FAIL log example:** `[Vybe QA] Smoke result: FAIL (2 failed: Social hub in city, District triggers (>=8))`
