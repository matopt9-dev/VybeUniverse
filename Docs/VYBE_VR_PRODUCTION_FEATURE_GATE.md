# Vybe VR — Production Feature Gate

**Audit date:** 2026-07-16 (Phase 7 — Games)  
**Path B:** `apiBaseUrl = https://vybesocial.net`  
**Rule:** Never show fake friends / posts / DMs / online users as live social.  
**`/api/v1` Deploy:** **NOT landed** — `/api/v1/health` still SPA HTML (re-probed Phase 7). No fake unlock success.

Disposition: **REAL** | **HIDDEN** | **REMOVE** | **BLOCKED_BACKEND**

---

## Counts

| Disposition | Count |
|-------------|------:|
| REAL | 24 |
| HIDDEN | 8 |
| REMOVE | 2 |
| BLOCKED_BACKEND | 6 |
| **Total gated surfaces** | **40** |

---

## Hub / plaza (Vybe Social Hub)

| Feature | Disposition | Evidence |
|---------|-------------|----------|
| Feed wall (signed in) | **REAL** | `SocialFeedWall` → `VybeFeedClient`; prod root-array feed verified 2026-07-16 |
| Feed wall (not signed in, Path B) | **REAL** | Honest empty / auth gate — no sample posts |
| Feed status / unread hint | **REAL** | Realtime + `/api/notifications` list fallback (unread-count route still SPA) |
| Stories rail | **REAL** | API fetch or honest empty/error — never invent stories |
| Messaging pod | **REAL** | `VybeMessagingClient` `/api/threads` — empty `[]` is valid |
| Profile kiosk | **REAL** | `GET /api/me` when authed; local XP when offline |
| Friends panel | **REAL** | `VybeFriendClient` following + realtime online ids only |
| Hub “Live network” title | **REMOVE** | Replaced with Path A/B honest subtitle |
| Offline catalog posts/DMs/stories | **HIDDEN** | Only Path A (`!IsConfigured`); labeled Offline Explorer |
| Holo crowd silhouettes | **HIDDEN** | Decorative art — not online presence |
| User search UI | **HIDDEN** | Client `SearchUsersAsync` exists; **no hub UI** (skipped) |

## Portal Hall / games (Phase 7)

| Feature | Disposition | Evidence |
|---------|-------------|----------|
| Portal → Vybe Rush | **REAL** | `VybeRushVR` enabled; catalog plaque + Game Cube art |
| Portal → Quarantine Horror | **REAL** | `BasementHorrorVR`; abort EXIT → CITY near spawn |
| Portal → DJ Creator Studio | **REAL** | Booth + `DjAudioEngine`; exit city/menu |
| Portal → Underground Nightclub | **REAL** | Booth + dance floor; exit city/menu |
| Portal → Main Menu | **REAL** | `VRMainMenu` |
| City you-are-here label | **REAL** | Not a launch portal |
| Music district venue portals | **REAL** | Same shipping DJ scenes; gated by build list |
| Fitness / Business / DJ station micro-games | **REAL** | In-city local only |
| Desktop city / flat MainMenu / legacy Rush | **HIDDEN** | Disabled in `EditorBuildSettings` |
| DJ Worlds 3–7 venue shells | **HIDDEN** | Not scaffolded |
| Multiplayer live parties | **HIDDEN** | Not implemented |
| Game invitations UI | **BLOCKED_BACKEND** | `/api/v1/game-invitations` SPA |
| Server achievement unlock UX | **BLOCKED_BACKEND** | No fake unlock; local badges only |

## Main menu / navigation

| Feature | Disposition | Evidence |
|---------|-------------|----------|
| Sign in | **REAL** | Integration auth — prod login PASS |
| Continue Offline | **REAL** | Explicit Path A / unauthenticated explore; no fake login success |
| Enter Vybe City VR | **REAL** | Scene load |
| DJ Creator Studio | **REAL** | Shipping build scene enabled |
| Underground Nightclub | **REAL** | Shipping build scene enabled |
| Bonus Basement Horror | **REAL** | Shipping scene |
| Unity / Meta identity link UI | **BLOCKED_BACKEND** | `/api/v1/auth/*-link` not on prod |
| Checkout / real-money cart | **HIDDEN** | Correctly absent |

## City boards / gameplay

| Feature | Disposition | Evidence |
|---------|-------------|----------|
| District social board (Path B + auth) | **REAL** | Prefers Integration feed; empty/error honest |
| Marketplace browse (Path A catalog) | **HIDDEN** | Local curated listings — Offline Explorer labeled |
| Marketplace live API | **BLOCKED_BACKEND** / weak | Prefer honest empty when endpoint fails |
| Events board offline catalog | **HIDDEN** | Path A only + label |
| Creator publish API | **PARTIAL→REAL fail** | Honest failure if endpoint missing |
| Local badges / quests / Rush | **REAL** | Local gameplay — labeled local in Rewards |
| Server unlock achievements | **BLOCKED_BACKEND** | Until Deploy |
| Fake verified badges | **REMOVE** | Forbidden — `VybeBadgeSystem` local only |
| Wallet / crypto earnings | **HIDDEN** | Not implemented |

## Integration clients (code exists)

| Client | Disposition on production today |
|--------|----------------------------------|
| Auth / Profile / Feed / Notifications / Realtime | **REAL** (`/api/*`) — feed array + like `/posts/{id}/like` verified |
| Messaging / Friends | **REAL** (`/api/threads`, `/api/users/...`) |
| Health root `/health` | **REAL** |
| `VybeGameClient` invitations/achievements | **BLOCKED_BACKEND** |
| `VybeIdentityClient` unity/meta link | **BLOCKED_BACKEND** |
| `GET /api/v1/health` preferred | **BLOCKED_BACKEND** (SPA; falls back to `/health`) |
| Session across scene loads | **REAL** | `VybeIntegrationBridge.EnsureSessionAcrossScenesAsync` |

---

## Path A vs Path B

| Mode | When | Social content policy |
|------|------|------------------------|
| **Path A — Offline Explorer** | `apiBaseUrl` empty **or** explicit offline explore without claiming live social | Curated city catalog allowed **only** with visible Offline Explorer labeling |
| **Path B — Social Connected** | `apiBaseUrl` set (current Resources assets) | **No** `VybeOfflineCityData` friends/posts/DMs; empty/error/auth only |

---

## Gate copy (required)

- Offline catalog: `Offline Explorer · local catalog (not live social)`
- `/api/v1` features: `Coming after server deploy`
- Never: fake “online now”, invented followers, or mock feed success
- Portal unavailable: toast `World unavailable: …` — never silent empty scene

## Release gate

**NOT MET** — Deploy (`/api/v1`) + Meta App ID + headset QA still required. Phase 10 Quest run **blocked** (`adb devices` empty); checklist has **0** device PASS marks. Phase 7 games **PARTIAL** until headset portal QA.
