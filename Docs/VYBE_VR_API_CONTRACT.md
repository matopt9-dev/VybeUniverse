# Vybe VR API Contract (Social SoT)

> **Source of truth:** `contracts/vybe-api/openapi.yaml` from `vybe-cursor-handoff.zip` (July 15, 2026).  
> Handoff extracted at `C:\Users\djtwi\vybe-cursor-handoff\`. See `CURSOR_START_HERE.md` in that folder.

## Base

- **Production URL:** `https://vybesocial.net`
- **Local dev:** `http://localhost:5000`
- **API prefix:** `/api/` — there is **no** `/api/v1/` prefix
- **Auth:** `Authorization: Bearer <token>` where token comes from `POST /api/auth/login` response field `token`
- **Content-Type:** `application/json`
- **Client stack:** Unity `HttpClient` + DTOs compatible with `JsonUtility`

## Authentication (Phase 1 — implemented)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/login` | Email/password → `{ user, token }` |
| POST | `/api/auth/logout` | Invalidate session |
| GET | `/api/me` | Validate session + load profile |

**No refresh endpoint.** Session token is long-lived (30 days). On `401 Session expired`, Unity clears token and re-prompts login.

## Unity-needed endpoints (priority)

| Method | Path | Purpose | Status |
|--------|------|---------|--------|
| POST | `/api/auth/login` | Sign in | Implemented |
| POST | `/api/auth/logout` | Sign out | Implemented |
| GET | `/api/me` | Current profile | Implemented |
| GET | `/api/feed?type=for-you` | Home feed | Implemented |
| GET | `/api/notifications/unread-count` | Notification badge | Implemented (Phase 2) |
| POST | `/api/posts/{id}/like` | Like post | Implemented |
| POST | `/api/auth/unity-link` | Link Unity account | **NOT IMPLEMENTED** (backend gap) |
| POST | `/api/auth/meta-link` | Link Meta Quest | **NOT IMPLEMENTED** (backend gap) |
| GET | `/api/achievements` | Achievements | **NOT IMPLEMENTED** |
| POST | `/api/games/invitations` | Game invitations | **NOT IMPLEMENTED** |

## Login shapes (verified in handoff)

Request:
```json
{ "email": "user@example.com", "password": "securepassword123" }
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "handle": "username",
    "displayName": "Display Name",
    "email": "user@example.com",
    "role": "user",
    "isVerified": false
  },
  "token": "SESSION_REFRESH_TOKEN"
}
```

## Profile

`GET /api/me` returns the `User` object directly (not wrapped).

## Feed

`GET /api/feed?type=for-you` → `{ "posts": [...], "total": N }`

Post fields: `id`, `authorId`, `content`, `likes`, `comments`, `author`, `createdAt`.

Pagination: **offset-based** — `offset` + `limit` query params (not cursor). See `CURSOR_HANDOFF_FEED.md`.

## Real-time (Phase 2 — implemented)

- **WebSocket:** `wss://vybesocial.net` (configurable via `VybeIntegrationConfig.websocketUrl`)
- **Provider:** Socket.io v4, WebSocket transport only
- **Auth:** handshake `{ "token": "<session UUID>" }`
- **Unity client:** `Assets/VybeIntegration/Runtime/Realtime/VybeRealtimeClient.cs`
- **Events:** see `contracts/vybe-api/events.json`
- **Not implemented server-side:** `feed_new_content`, `game_invitation`, `achievement_unlocked`

## Errors

`{ "error": "message" }` with non-2xx status. Rate limit: 429 on auth routes (10 attempts / 15 min per IP).

## Owner-supplied credentials still required

- `META_APP_ID` / `META_APP_SECRET` — Quest linking (endpoint not yet on backend)
- `UNITY_PROJECT_ID` — Unity Gaming Services linking (endpoint not yet on backend)
- Test user credentials for live Quest QA against production
