# Vybe VR — Quest Device QA Test Plan

Manual checklist for Meta Quest builds (OpenXR, Unity 6000.3, XRI 3.x). Run on-device after each VR comfort/locomotion change.

**Unified matrix (all phases):** [VYBE_VR_QA_MATRIX.md](VYBE_VR_QA_MATRIX.md)  
**Sign-off form:** [VYBE_QA_SIGNOFF_TEMPLATE.md](VYBE_QA_SIGNOFF_TEMPLATE.md)  
**Editor validation:** `Tools → Vybe → Run Full QA Report`

## Prerequisites

- Quest 2/3/Pro with developer mode enabled
- APK built with Android + OpenXR loader active
- Fresh install or cleared app data for first-run defaults test

## 1. Boot & XR

| # | Test | Pass criteria |
|---|------|----------------|
| 1.1 | Cold launch → VR Main Menu | Head tracking works; no flat desktop camera stuck on screen |
| 1.2 | Enter Vybe City VR | Scene builds; XR Origin present; no duplicate Main Camera |
| 1.3 | `[VybeQuestLaunch]` logs | No critical errors in logcat for XR init |

## 2. Controller / Hand Interaction

| # | Test | Pass criteria |
|---|------|----------------|
| 2.1 | Right ray on world UI | Ray visible; trigger selects buttons on wrist menu / panels |
| 2.2 | Direct interact (close objects) | Direct interactor grabs nearby interactables when applicable |
| 2.3 | Left Y button | Wrist menu toggles (Quest controller) |
| 2.4 | Hand pinch (if hand tracking) | Wrist menu toggles via pinch |

## 3. Locomotion

| # | Test | Pass criteria |
|---|------|----------------|
| 3.1 | Default (first launch) | Teleport mode (left stick forward aims); snap turn on right stick |
| 3.2 | Teleport | Aim arc on ground → release trigger teleports within TeleportArea |
| 3.3 | Toggle Smooth Move (Settings) | Continuous move on left stick; teleport disabled |
| 3.4 | Snap turn | Right stick left/right rotates in ~45° steps (default turn speed) |
| 3.5 | Toggle Smooth Turn | Smooth turn replaces snap (when smooth move off) |

## 4. Comfort Settings

| # | Test | Pass criteria |
|---|------|----------------|
| 4.1 | Comfort vignette | Darkened edges while moving (smooth mode); off when toggled |
| 4.2 | Seated / Standing | Seated lowers eye height; standing restores |
| 4.3 | Height +/- | Small incremental height change persists after restart |
| 4.4 | Recenter | View resets forward / tracking recenters without crash |

## 5. Pause & Menus

| # | Test | Pass criteria |
|---|------|----------------|
| 5.1 | Left or right **Menu** button | Pause panel opens; gameplay frozen (`timeScale = 0`) |
| 5.2 | Resume | Pause closes; time resumes |
| 5.3 | Exit to Menu / Quit | Returns to menu or exits app |

## 6. VR Keyboard (Android)

| # | Test | Pass criteria |
|---|------|----------------|
| 6.1 | Login email/password fields | OS keyboard opens on focus (VR Main Menu) |
| 6.2 | Player name field | Keyboard opens; text saved on Done |
| 6.3 | RPM URL field (Settings) | Keyboard opens; URL persists |

## 7. UI / Progression Smoke

| # | Test | Pass criteria |
|---|------|----------------|
| 7.1 | Wrist → Quests / Map / Settings | Panels open; Close returns to HUD |
| 7.2 | District teleport (Map) | Player moves to selected district |
| 7.3 | Volume sliders | Audio changes audibly |

## 8. Performance Spot Check

| # | Test | Pass criteria |
|---|------|----------------|
| 8.1 | City framerate | Subjective: no sustained stutter in hub (target 72 Hz) |
| 8.2 | Thermal (10 min) | No unexpected shutdown; acceptable fan/throttle |

## 9. Social Hub (Phase 5)

| # | Test | Pass criteria |
|---|------|----------------|
| 9.1 | Hub at plaza | `VybeSocialHub` at center; automated: `[Vybe QA] Social hub: OK` after build |
| 9.2 | Feed wall | Loading overlay → live posts or honest empty (no fabricated posts) |
| 9.3 | Stories / messaging | Honest offline/empty when API unavailable |
| 9.4 | Profile kiosk | Local name or API profile |
| 9.5 | Hub visit quest | First hub entry progresses daily quest |

## 10. Gameplay & Badges (Phase 6)

| # | Test | Pass criteria |
|---|------|----------------|
| 10.1 | 8 districts | All district triggers present; runtime checklist ≥ 8 |
| 10.2 | Badges | Local badges only; count in `[Vybe QA] Badges earned` |
| 10.3 | Daily quests | 9 daily + 1 one-time in log |
| 10.4 | Vybe Rush | Portal → play → return to city |

## 11. UI Loading States (Phase 7)

| # | Test | Pass criteria |
|---|------|----------------|
| 11.1 | Async boards | Feed/marketplace show loading before data or empty state |
| 11.2 | Login | Progress text during sign-in; clear error on failure |
| 11.3 | Toasts | Readable on Quest (larger font, panel background) |

## 12. Visual Yellow-Check & Perf Logs (Phases 8–9)

| # | Test | Pass criteria |
|---|------|----------------|
| 12.1 | Morning TOD | `[Vybe QA] City time-of-day: Morning` on Quest |
| 12.2 | Fog tune | Fog density/color logged; no sickly yellow wash (subjective) |
| 12.3 | Staggered build | `[Vybe Perf] City build 0%` … `100%` sequential logs |
| 12.4 | FPS monitor | `[Vybe Perf]` every ~30s on Android in city |

**logcat:** `adb logcat -s Unity | findstr "Vybe QA"` and `findstr "Vybe Perf"`

## Sign-off

| Field | Value |
|-------|-------|
| Build version | |
| Device | |
| Tester | |
| Date | |
| Result | PASS / FAIL |
| Notes | |
