# Vybe Social VR — Phase 6 Gameplay Layer Report

**Date:** 2026-06-26  
**Scope:** Badges, quests, perks, login streaks, Vybe Rush polish, creator publish hook

---

## Summary

Phase 6 adds an honest local gameplay layer: achievements unlock only from real actions, creator publish completes only on API success, and all progression remains device-local (no fake verified badges or global leaderboards).

---

## 1. Badge / Achievement System

**File:** `Assets/Scripts/Systems/VybeBadgeSystem.cs`

| Badge ID | Title | Trigger |
|----------|-------|---------|
| `hub_explorer` | Hub Explorer | Enter Social Hub trigger (`VybeHubVisitTracker`) |
| `district_tourist` | District Tourist | Visit all 8 districts (`DistrictVisitService`) |
| `rush_rookie` | Rush Rookie | Vybe Rush score ≥ 50 |
| `rush_ace` | Rush Ace | Vybe Rush score ≥ 200 |
| `quest_streak_3` | Quest Streak | 3 consecutive UTC login days |
| `fitness_streak_3` | Fitness Streak | `fitnessStreak` ≥ 3 |
| `creator_published` | Creator Published | `POST /creator/publish` succeeds |

- Persisted in `SaveData.earnedBadgeIds`
- New badges show `VybeToast.Show("Badge earned: …")`
- Listed in Rewards panel via `VybeRewardsCatalog.BuildRewardsText()`
- Profile panel shows badge count

**Local-only:** Badges are not synced to Vybe Social API and are not “verified” credentials.

---

## 2. Reward Perks — Lv15 Legend Glow

**Files:** `VybeRewardPerks.cs`, `VybeAvatarLegendGlow.cs`, `AvatarManager.cs`

- `HasLegendGlow => Level >= 15`
- Subtle gold emissive ring + point light on avatar body
- Refreshes on `XPManager.OnLevelUp` and `SaveManager.OnSaveChanged`

---

## 3. Quest Expansion

**File:** `Assets/Scripts/Systems/QuestManager.cs`

### Daily quests (9 total — reset UTC)

| ID | Title |
|----|-------|
| `visit_hub` | Visit Vybe Social Hub |
| `hub_feed` | Browse the Feed Wall |
| *(existing 7)* | Creator, Music, Marketplace, Event, Vybe Rush, Fitness, Social |

### One-time quest

| ID | Title | Complete when |
|----|-------|---------------|
| `creator_publish` | Creator Publish | API publish succeeds |

**Hub integration:**
- `VybeSocialHubBuilder` adds `HubEntryTrigger` box collider → `VybeHubVisitTracker`
- `SocialFeedWall.LoadAndRefresh()` completes `hub_feed` when feed wall loads in hub

**All daily claimed bonus:** +50 XP once per UTC day (`SaveManager.TryGrantAllDailyQuestsBonus`)

---

## 4. Creator Publish — Real API Hook

**Files:** `VybeSocialApiClient.cs`, `VybeCreatorService.cs`, `CreatorPublishBoard.cs`

- `POST /creator/publish` with `{ title, description }`
- On **success:** badge `creator_published`, quest `creator_publish` complete, +15 Creator rep
- On **failure:** honest error toast + status text; **no** quest/badge/XP

Requires auth + configured `VybeSocialConfig`.

---

## 5. Login Streak Bonus

**File:** `SaveManager.cs` — `SaveData.loginStreakDays`

- Increment on consecutive UTC days; reset on gap
- Bonus XP: **75** at day 3, **150** at day 7
- Badge `quest_streak_3` at 3-day streak
- HUD shows streak via `VybeUIManager.RefreshHud` (`Streak: Nd`)

---

## 6. Vybe Rush Polish

**File:** `VybeRushGame.cs`

- Results panel shows **local top 5** from `SaveData.leaderboard`
- Rush badges at score thresholds in `EndGame`
- `VybeRewardPerks.GamingXpMultiplier` (+5% XP at Lv7+) applied to run XP
- Leaderboard trimmed to top 20 entries per device

---

## 7. UI — Achievements

- **Rewards panel:** level perks + earned badges section
- **Profile panel:** badge count
- **HUD:** login streak days

---

## 8. Integration

| Component | Role |
|-----------|------|
| `VybeGameBootstrap` | `VybeBadgeSystem.Initialize()` at startup |
| `VybeServiceLocator` | Registers `VybeCreatorService` |
| `VybeDeviceQA` | Logs daily/one-time quest counts + badge count |

---

## What Is Local-Only

| System | Synced to API? |
|--------|----------------|
| XP / levels | No |
| Daily & one-time quests | No |
| Badges | No |
| Login / fitness streaks | No |
| Vybe Rush leaderboard | No (per device) |
| Creator publish | **Yes** — only when API configured and call succeeds |

---

## QA Checklist

1. **Hub entry** — Walk into plaza `(0,0,10)` trigger → `visit_hub` complete, `hub_explorer` badge (first time), welcome toast once per session.
2. **Feed wall** — Hub feed loads → `hub_feed` complete.
3. **District tourist** — Visit all 8 districts (map or triggers) → `district_tourist` badge.
4. **Vybe Rush** — Finish run with score 50+ / 200+ → `rush_rookie` / `rush_ace`; results show local top 5.
5. **Fitness** — Complete 3 fitness challenges (across days) → `fitness_streak_3`.
6. **Login streak** — Change device date or wait UTC days → streak in HUD; day 3 bonus XP + badge.
7. **Creator publish** — With staging API: success → quest + badge; disconnect API → honest failure, no quest.
8. **Legend glow** — Level to 15 → gold ring on avatar.
9. **Rewards panel** — Shows earned badges with descriptions.
10. **Console** — `[Vybe QA]` logs quest counts and badge count on city load.

---

## Files Changed (Phase 6)

**New:** `VybeBadgeSystem.cs`, `VybeHubVisitTracker.cs`, `VybeAvatarLegendGlow.cs`, `VybeCreatorService.cs`

**Modified:** `SaveData.cs`, `SaveManager.cs`, `QuestManager.cs`, `VybeRewardPerks.cs`, `DistrictVisitService.cs`, `VybeSocialHubBuilder.cs`, `VybeSocialApiClient.cs`, `VybeServiceLocator.cs`, `CreatorPublishBoard.cs`, `SocialFeedWall.cs`, `FitnessChallengeBoard.cs`, `VybeRushGame.cs`, `AvatarManager.cs`, `VybeGameBootstrap.cs`, `VybeUIManager.cs`, `VybeRewardsCatalog.cs`, `VybeDeviceQA.cs`
