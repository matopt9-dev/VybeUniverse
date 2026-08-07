# Vybe VR Target Architecture

_Updated 2026-07-15_

```
┌─────────────────────────────────────────────────────────────┐
│  VybeUniverse (Unity VR / Quest)                            │
│    VybeIntegrationRuntime                                   │
│    VybeApiClient → HTTPS https://vybesocial.net/api/*       │
│    VybeAuthClient / VybeSessionService / VybeProfileClient  │
│    PlayerPrefsTokenStore + SecureTokenCodec                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ Bearer session token (30d UUID)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Vybe Social Backend (Express.js + PostgreSQL)              │
│    Production: https://vybesocial.net                         │
│    Socket.io: wss://vybesocial.net                          │
│    Auth: requireAuth middleware (cookie or Bearer)          │
└─────────────────────────────────────────────────────────────┘
```

## API contract

- Source: `contracts/vybe-api/openapi.yaml` (from handoff)
- Prefix: `/api/` — **not** `/api/v1/`
- Auth: `Authorization: Bearer <token>` from login response

## Phase 1 (complete)

Login → store session → attach Bearer header → validate via `GET /api/me` → logout clears server + local.

## Phase 2 (complete)

- Socket.io connection for real-time events (see `events.json`) — `VybeRealtimeClient`
- Profile kiosk live via `GET /api/me`
- Feed wall via `GET /api/feed?type=for-you` (offset pagination)
- Profile kiosk UI wired to live `GET /api/me`
- Feed wall wired to `GET /api/feed?type=for-you`

## Identity linking (future)

Requires new backend endpoints + owner credentials. See `VYBE_VR_IDENTITY_LINKING.md`.
