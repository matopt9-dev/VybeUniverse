# Vybe VR Current Architecture

_Updated 2026-07-15 — Phase 2 realtime + feed_

## Contract authority

**Real Social SoT is now on disk** at `contracts/vybe-api/` (copied from `vybe-cursor-handoff.zip`). Previous DRAFT `/api/v1` stubs are replaced.

## Unity integration layer

| Component | Path | Role |
|-----------|------|------|
| Config | `Assets/VybeIntegration/Runtime/VybeIntegrationConfig.cs` | `apiBaseUrl`, `websocketUrl`, prefix `/api` |
| HTTP | `VybeApiClient.cs` | HttpClient + Bearer header + 401 clear |
| Auth | `VybeAuthClient.cs` | login, logout, session validation |
| Session | `VybeSessionService.cs` | profile load, expiry checks |
| Tokens | `PlayerPrefsTokenStore.cs` + `SecureTokenCodec.cs` | obfuscated persistence |
| Profile | `VybeProfileClient.cs` | `GET /api/me` |
| Feed | `VybeFeedClient.cs` | `GET /api/feed?type=for-you` (offset pagination) |
| Notifications | `VybeNotificationClient.cs` | `GET /api/notifications/unread-count` |
| Realtime | `Realtime/VybeRealtimeClient.cs` | Socket.io v4 WebSocket, events from `events.json` |
| Realtime pump | `Assets/Scripts/Services/VybeRealtimePump.cs` | main-thread dispatch |
| Identity | `VybeIdentityClient.cs` | unity-link / meta-link (backend gap) |
| Bridge | `VybeIntegrationRuntime.cs` + `VybeIntegrationBridge.cs` | singleton wiring + realtime lifecycle |
| Legacy | `Assets/Scripts/Services/VybeAuthService.cs` | delegates to Integration |

## VR UI wiring (Phase 2)

| Surface | Script | Live data |
|---------|--------|-----------|
| Profile kiosk | `VybeProfileKiosk.cs` | `GET /api/me` via `VybeProfileClient` |
| Feed wall | `SocialFeedWall.cs` | `GET /api/feed?type=for-you`, offset pagination, honest empty states |

## Real-time behavior

- Connect: `wss://vybesocial.net` (configurable via `websocketUrl`)
- Auth: Socket.io handshake `{ token: session UUID }`
- Reconnect: exponential backoff, max 10 attempts (per `events.json`)
- Dedupe: notification/message ids
- Online friends: **only** from `friend_online` / `friend_offline` events — no seed list
- New feed hint: `notification` events with post-related types; `feed_new_content` **not implemented** on server
- Missed events: fetch via REST on reconnect (per handoff)

## Backend (documented, not cloned)

- Express.js + Bun, PostgreSQL, Drizzle ORM
- All routes in `server/routes.ts` (~10,864 lines) — **do not modify from Unity**
- Production: `https://vybesocial.net`

## Handoff location

`C:\Users\djtwi\vybe-cursor-handoff\` — includes `CURSOR_START_HERE.md`, auth docs, contracts.

**Missing from zip:** `UNITY_INTEGRATION_PROMPT_FOR_CURSOR.md`

## Legacy client note

`VybeSocialApiClient` still exists for backward compatibility; new work uses `VybeIntegration` under `/api` prefix.
