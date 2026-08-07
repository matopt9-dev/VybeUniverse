# Vybe Social VR Hub — Phase 6 / 8 Report

_Last updated: Phase 8 polish — hub cohesion + comfort + feedback_

## Hub Location

**Vybe Social Hub** at central plaza `(0, 0, 10)` under `VybeSocialHub`.

| Surface | Component | Real data? |
|---------|-----------|------------|
| Welcome desk | `VybeHubWelcomePanel` | Signed-in profile greeting or sign-in CTA |
| Feed Wall | `SocialFeedWall` | Live `/api/feed` when signed in |
| Stories Rail | `VybeStoriesRail` | API or honest empty |
| Messaging Pod | `VybeMessagingPod` | Live threads |
| Following | `VybeFriendsPanel` | Live following — online only from realtime |
| Profile Kiosk | `VybeProfileKiosk` | Live `/api/me` |
| Notifications | `VybeHubNotificationsPanel` | Unread via list fallback / realtime |
| Achievements | `VybeHubAchievementGallery` | Local badges + honest `/api/v1` blocked |
| Help / Comfort | static panel | Real controls → wrist Settings (teleport/snap/vignette/seated) |
| Portal Hall | `ScenePortal` × catalog | Rush, Horror, DJ Studio, Nightclub, Main Menu |
| Cosmetic Shop | `VybeCosmeticTerminal` | Local coins / cosmetics |
| Zone cues | 3D labels | Feed / Portal Hall / Messages / Profile — not portals |

Built by `VybeSocialHubBuilder.Build()` from `VybePremiumCityBuilder.BuildCity()`.

## Phase 8 hub polish

- Shared dark glass + cyan outline on all hub canvases
- Title glow via `VybeUITheme.StyleText(title: true)`
- Hover/select haptics on portals + hub UI buttons
- Comfort copy points at Settings toggles with live state labels
- No Marketplace / Creator Theater / Worlds 3–7 shells

## Portal Hall (real scenes only)

- **City** — you-are-here label (current world)
- **Vybe Rush** → `VybeRushVR`
- **Quarantine Horror** → `BasementHorrorVR`
- **DJ Creator Studio** → `DjCreatorStudio`
- **Underground Nightclub** → `UndergroundNightclub`
- **Main Menu** → `VRMainMenu`

District portals (Music → Studio/Nightclub, Game Cube Rush, Quarantine) remain as wayfinding — not hub duplicates of empty rooms.

## Honesty rules (enforced)

- No fake online users (Following panel + holo crowd labeled art)
- No fake trophies for server achievements while `/api/v1` is SPA
- Empty Following / Messages = empty, not broken
- Path A offline catalog is labeled Offline Explorer only

## Feature gate

`VybeFeatureGate.ApplyToScene()` gates Feed / Stories / Messaging / Following / Notifications when unsigned. Welcome / Achievements / Help remain readable. Hub panels share Phase 8 glass styling when gated overlays appear.

## QA (Quest — pending)

1. Sign in → Welcome shows handle/name
2. Feed renders live posts with readable contrast
3. Following / Messages show honest empty
4. Notifications count matches list (or 0)
5. Portal Hall each portal loads correct scene
6. Achievements show local progress + “after server deploy” for `/api/v1`
7. Holo crowd label visible — not presented as online users
8. Settings comfort labels update; seated/standing height works
9. Loading screen status matches destination (real async bar only)
