# Vybe VR — Quest QA Checklist (Phase 10)

**Date:** 2026-07-16  
**APK under test:** `Builds\VybeUniverseVR_v1.0.0_dev.apk` (73,422,018 bytes · 2026-07-16 07:16)  
**Package:** `com.vybesocial.vybeuniversevr`  
**API:** `https://vybesocial.net`  
**adb:** Unity 6000.3 SDK  
`C:\Program Files\Unity\Hub\Editor\6000.3.0f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK\platform-tools\adb.exe`  
**Device session:** **BLOCKED** — `adb devices -l` → empty (no serial). Quest 3 PnP entries present with Reality Labs Composite ADB Interface **Status Unknown**; no Meta/Oculus/adb processes running.  
**Release gate:** **NOT MET**

Status legend: **PASS** | **FAIL** | **BLOCKED(no device)** | **BLOCKED(backend)** | **N/A (editor only)**

---

## Summary counts (this run)

| Result | Count |
|--------|------:|
| PASS | 0 |
| FAIL | 0 |
| BLOCKED(no device) | 18 |
| BLOCKED(backend) | 1 |
| N/A (editor / probe only) | 2 |
| **Total checklist rows** | **21** |

No headset PASS marks — install/launch never executed.

---

## Device + install

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| D-01 | Quest connected (`adb devices`) | **BLOCKED(no device)** | Empty device list after `adb kill-server` / `start-server` via Unity 6000.3 `adb.exe`. PnP shows Quest 3 + Composite ADB Interface (Unknown). |
| D-02 | Install APK (`adb install -r`) | **BLOCKED(no device)** | Skipped — no authorized device. Preferred APK present on disk. |
| D-03 | Cold launch + logcat crash scan | **BLOCKED(no device)** | Skipped — no install/launch/logcat. |

**Owner unblock:** Enable Developer Mode on Quest → USB debugging authorize → cable/Link so `adb devices` shows `device` (not `unauthorized` / empty). Then:

```bat
set ADB="C:\Program Files\Unity\Hub\Editor\6000.3.0f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK\platform-tools\adb.exe"
%ADB% devices -l
%ADB% install -r "C:\Users\djtwi\VybeUniverse\Builds\VybeUniverseVR_v1.0.0_dev.apk"
%ADB% shell monkey -p com.vybesocial.vybeuniversevr -c android.intent.category.LAUNCHER 1
%ADB% logcat -d -t 300 | findstr /i "Unity AndroidRuntime FATAL CRASH vybe"
```

---

## Quest QA matrix (execute on device)

| # | Check | Result | Evidence / how to verify |
|---|-------|--------|---------------------------|
| Q-01 | App launches on Quest | **BLOCKED(no device)** | Boot → VR Main Menu; head tracking; no black screen / immediate crash |
| Q-02 | XR tracking / controllers | **BLOCKED(no device)** | 6DoF head + controllers; rays / grip visible |
| Q-03 | Sign-in / session restore | **BLOCKED(no device)** | Login with `cursor.unity.test@vybesocial.net` (password via env/prompt — **not in repo**); kill app → relaunch restores session or honest re-auth |
| Q-04 | Hub welcome | **BLOCKED(no device)** | Signed-in greeting from real profile (or clear sign-in CTA if logged out) |
| Q-05 | Hub feed | **BLOCKED(no device)** | Live `/api/feed` posts or honest empty — **no** sample/fake posts in Path B |
| Q-06 | Hub following | **BLOCKED(no device)** | Real followers/following (empty `[]` OK) — **no** fake online users |
| Q-07 | Hub messages | **BLOCKED(no device)** | Real threads (empty OK) — **no** mock DMs |
| Q-08 | Hub notifications | **BLOCKED(no device)** | Unread via list fallback and/or realtime — honest zero OK |
| Q-09 | Portal: City (you-are-here) | **BLOCKED(no device)** | City labeled present; no dead “enter City” inventing a missing scene |
| Q-10 | Portal: Rush — launch + return | **BLOCKED(no device)** | Loads `VybeRushVR`; return to hub/city without hang |
| Q-11 | Portal: Horror — launch + return | **BLOCKED(no device)** | Loads `BasementHorrorVR`; return clean |
| Q-12 | Portal: DJ Studio — launch + return | **BLOCKED(no device)** | Loads `DjCreatorStudio`; return clean |
| Q-13 | Portal: Nightclub — launch + return | **BLOCKED(no device)** | Loads `UndergroundNightclub`; return clean |
| Q-14 | Portal: Menu — launch + return | **BLOCKED(no device)** | Loads `VRMainMenu`; can re-enter hub/city |
| Q-15 | Locomotion comfort | **BLOCKED(no device)** | Teleport/snap defaults; vignette/settings reachable; no sustained nausea-inducing defaults |
| Q-16 | No fake social visible | **BLOCKED(no device)** | Holo crowd labeled art; no invented friends/posts/DMs/online; Offline Explorer labeled if Path A |
| Q-17 | Suspend / resume | **BLOCKED(no device)** | Quest home → resume; tracking + session intact or honest re-auth |
| Q-18 | Network loss recovery | **BLOCKED(no device)** | Airplane / Wi‑Fi off → honest error; restore → recover without fake data |
| Q-19 | `/api/v1` features blocked honestly | **BLOCKED(backend)** *(also no device)* | Server achievements / invitations / identity link show “Coming after server deploy” (or equivalent) — **not** fake trophies. Prod probe 2026-07-16: `/api/v1/*` still SPA HTML |

---

## Non-device checks (this run)

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| P-01 | Production `/api/health` | **PASS** (probe) | JSON 200 — database ok (`2026-07-16T11:21Z`) |
| P-02 | Production `/api/v1/health` | **BLOCKED(backend)** | HTTP 200 **text/html** SPA (`<!DOCTYPE html>…`) — Deploy not landed. Same for `/api/v1/version`, `/api/v1/game-invitations` |
| E-01 | Editor Play Mode hub/social | **N/A** | Not executed this session (Phase 10 target = Quest). Optional: Editor Play Mode can smoke UI wiring only — **does not** count as Quest PASS |

---

## Also on disk (not used this run)

| APK | Size | Date |
|-----|------|------|
| `Builds\VybeUniverseVR_v1.0.0_release.apk` | 61,451,769 | 2026-07-15 |
| `Builds\VybeUniverseVR_v0.1.1_release.apk` | 54,538,036 | 2026-07-11 |
| `Builds\VybeUniverseVR_v0.1.0_release.apk` | 54,527,666 | 2026-07-04 |

Prefer **v1.0.0_dev** for Phase 10 until a newer shipping APK is built after device QA.

---

## Sign-off

| Field | Value |
|-------|-------|
| Tester | Cursor agent (Phase 10) |
| Quest device | **Not attached** (adb empty) |
| Overall Phase 10 | **FAIL / incomplete** — blocked on device |
| Release gate | **NOT MET** |

**Do not mark PASS without headset evidence.**
