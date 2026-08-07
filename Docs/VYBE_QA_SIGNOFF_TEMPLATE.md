# Vybe Social VR — QA Sign-off Form

Use after completing [VYBE_VR_QA_MATRIX.md](VYBE_VR_QA_MATRIX.md) on a Quest hardware build. **Do not sign off from Editor validation alone.**

---

## Build information

| Field | Value |
|-------|-------|
| Product | Vybe Universe VR (Vybe Social VR) |
| Unity version | 6000.3.0f1 |
| Git branch / commit | _not in git workspace / fill after commit_ |
| APK file name | VybeUniverseVR_v0.1.1_release.apk |
| APK SHA256 | 2608A01035FC01E3E066DFE4BF653176A3AD6883B80A3C285C5E58A4B866A017 |
| APK size | 54,156,144 bytes (~51.7 MB) |
| Package / version | com.vybesocial.vybeuniversevr — 0.1.1 (build 2) |
| Build date | 2026-07-10 08:25 (local) |
| Build machine / builder | THEPIONEER — _fill tester name at sign-off_ |

---

## Test environment

| Field | Value |
|-------|-------|
| Device model | Quest 2 / Quest 3 / Quest Pro — _fill on test_ |
| OS version | _fill from Quest Settings → System_ |
| Fresh install? | Yes / No — _recommend Yes for sign-off_ |
| API configured? | No (Path A Offline Explorer) / Yes / Staging URL: |
| Tester name | _blank — sign below_ |
| Test date | _blank — sign below_ |

---

## Automated results (attach logcat excerpt)

| Check | Result | Notes |
|-------|--------|-------|
| `Tools → Vybe → Run Full QA Report` | PASS | Errors: 0 Warnings: 0 (validation_report.txt 2026-07-06) |
| Runtime `[Vybe QA] Smoke result` | PASS / FAIL | _run on Quest — not automated_ |
| `[Vybe Perf]` city build 0–100% | PASS / FAIL / N/A | _run on Quest_ |
| `[Vybe Perf]` 30s FPS logs | PASS / FAIL / N/A | _run on Quest_ |

**Logcat commands used:**

```
adb logcat -s Unity | findstr "Vybe QA"
adb logcat -s Unity | findstr "Vybe Perf"
```

---

## Manual matrix sections

| Section | Result | Blocker notes |
|---------|--------|---------------|
| 1. Boot & XR | PASS / FAIL / SKIP | |
| 2. Interaction | PASS / FAIL / SKIP | |
| 3. Locomotion | PASS / FAIL / SKIP | |
| 4. Comfort | PASS / FAIL / SKIP | |
| 5. Social Hub | PASS / FAIL / SKIP | |
| 6. Gameplay & Badges | PASS / FAIL / SKIP | |
| 7. UI / UX | PASS / FAIL / SKIP | |
| 8. Visual Quality | PASS / FAIL / SKIP | |
| 9. Performance | PASS / FAIL / SKIP | |
| 10. Regression | PASS / FAIL / SKIP | |

---

## Known limitations acknowledged

- [ ] Reviewed [KNOWN_LIMITATIONS.md](../KNOWN_LIMITATIONS.md)
- [ ] No fake API/social success claimed in this sign-off
- [ ] Yellow-wash / hand-tracking / UI-click issues retested if previously failed

---

## Path A — Offline Explorer (apiBaseUrl empty)

| Check | PASS / FAIL | Notes |
|-------|-------------|-------|
| Enter city without login | | |
| Onboarding 4 steps | | |
| Vybe Pulse + session orbs | | |
| Cosmetic terminal (hub) | | |
| Daily quests + Rush round-trip | | |

## Path B — Social Connected (staging API)

| Check | PASS / FAIL | Notes |
|-------|-------------|-------|
| Login on staging | | |
| Feed / stories / messaging | | |
| Marketplace + events | | |

Config: `Docs/PATH_B_STAGING_SETUP.md`

---

## Final decision

| Field | Value |
|-------|-------|
| **Overall result** | **PASS / FAIL / CONDITIONAL PASS** |
| Ship recommendation | Internal QA only / Beta / Store candidate |
| Sign-off approver | |
| Signature / date | |

### Blockers (if FAIL)

1. 
2. 
3. 

### Follow-up actions

1. 
2. 
